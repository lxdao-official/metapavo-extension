import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Button, Input, Modal, Text, Tooltip } from '@nextui-org/react';
import { links, linktags, userlinks } from 'extension-common/src/apis';
import {
  createUserTag,
  fetchUsersTags,
  getUserLinks,
} from 'extension-common/src/apis/links_api';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LinkLater, getList } from '../../stores/read-later';

type UserLink = userlinks & {
  link: links;
};
export default function ReadLaters() {
  const [websiteURL, setWebsiteURL] = useState<string>('');
  const [groupedLaters, setGroupedLaters] = useState<LinkLater[][]>([]);

  const [showAddCategory, setshowAddCategory] = useState(false);
  const [addCategoryTitle, setaddCategoryTitle] = useState('');
  const [addCategoryDesc, setaddCategoryDesc] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('recent');
  const [user_categories, setuser_categories] = useState<linktags[]>([]);
  const [dapps, setDapps] = useState<links[]>([]);
  const [allDapps, setAllDapps] = useState<UserLink[]>([]);
  async function submitUserCategory() {
    const loading = toast.loading('saveing...');

    if (addCategoryTitle.length > 0) {
      try {
        await createUserTag(addCategoryTitle, addCategoryDesc);
        setshowAddCategory(false);
        setaddCategoryTitle('');
        setaddCategoryDesc('');
        await loadUsersCategories();
        await loadUserDapps();
        toast.success('saved');
      } catch (e) {
        toast.error('save failed');
      }
    } else {
      toast.error('title is required');
    }
    toast.dismiss(loading);
  }
  async function loadUsersCategories() {
    const res = await fetchUsersTags();
    if (res && res.length > 0) {
      setuser_categories(res as linktags[]);
    }
  }
  function closeModalHandler() {
    setshowAddCategory(false);
  }
  function showModal() {
    setshowAddCategory(true);
  }
  function activeCategory(cat_id: string) {
    setActiveCategoryId(cat_id);
  }
  const refreshDappsList = async () => {
    if (activeCategoryId == 'ungrouped') {
      const _list = allDapps.filter((_dapp) => {
        return !_dapp.tag_id;
      });
      setDapps(_list.map((d) => d.link));
    } else {
      const _list = allDapps.filter((_dapp) => {
        return activeCategoryId == _dapp.tag_id;
      });
      setDapps(_list.map((d) => d.link));
    }
  };
  const loadUserDapps = async () => {
    try {
      const cache = localStorage.getItem('userlinks');
      if (cache) {
        const cacheJson = JSON.parse(cache);
        if (cacheJson.length) {
          setAllDapps(cacheJson);
        }
      }
    } catch (e) {}

    const res = await getUserLinks();
    if (res && res.length > 0) {
      setAllDapps(res as UserLink[]);
      localStorage.setItem('userlinks', JSON.stringify(res));
    }
  };
  useEffect(() => {
    refreshDappsList();
  }, [activeCategoryId]);
  const pageEle = useRef(null);
  // const loadList = async () => {
  //   try {
  //     const result = await getList();
  //     if (result.length) {
  //       const _group = [];
  //       for (let i = 0; i < result.length; i += 12) {
  //         _group.push(result.slice(i, i + 12));
  //       }
  //       setGroupedLaters(_group);
  //     }
  //   } catch (e) {}
  // };
  useEffect(() => {
    loadUsersCategories();
    loadUserDapps();
  }, []);
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '0 5px',
          }}
        >
          <div
            onClick={() => {
              activeCategory('recent');
            }}
            style={{
              fontSize: '12px',
              padding: '0px 10px',
              lineHeight: '26px',
              borderRadius: '13px',
              cursor: 'pointer',
              background: activeCategoryId == 'recent' ? '#9f50ff' : '#fff',
              color: activeCategoryId == 'recent' ? '#fff' : '#444',
            }}
          >
            {getLang('recently_visited')}
          </div>

          {user_categories.map((cat) => (
            <div
              onClick={() => {
                activeCategory(cat.id);
              }}
              style={{
                fontSize: '12px',
                padding: '0px 10px',
                lineHeight: '26px',
                borderRadius: '13px',
                cursor: 'pointer',
                background: activeCategoryId === cat.id ? '#9f50ff' : '#fff',
                color: activeCategoryId == cat.id ? '#fff' : '#444',
              }}
            >
              {cat.title}
            </div>
          ))}
          <div
            onClick={() => {
              activeCategory('ungrouped');
            }}
            style={{
              fontSize: '12px',
              padding: '0px 10px',
              lineHeight: '26px',
              borderRadius: '13px',
              cursor: 'pointer',
              background: activeCategoryId == 'ungrouped' ? '#9f50ff' : '#fff',
              color: activeCategoryId == 'ungrouped' ? '#fff' : '#444',
            }}
          >
            {getLang('ungrouped')}
          </div>
          <Box
            onClick={() => {
              showModal();
            }}
            sx={{
              lineHeight: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0 6px',
              '&:hover': {
                background: '#f5f5f5',
              },
              borderRadius: '5px',
            }}
          >
            <Tooltip
              content={getLang('add_your_own_dapp_group')}
              rounded
              color="secondary"
            >
              <AddCircleOutlineIcon
                style={{ fontSize: '18px', color: '#9f50ff' }}
              />
            </Tooltip>
          </Box>
        </div>
      </div>
      <Grid container spacing={1}>
        {dapps.length == 0 && (
          <div
            style={{
              textAlign: 'left',
              width: '100%',
              fontSize: '14px',
              lineHeight: '50px',
              paddingLeft: '10px',
            }}
          >
            {getLang('no_links')}
          </div>
        )}
        {dapps.map((u) => {
          return (
            <Grid item xs={3}>
              <ListItem
                disablePadding
                style={{
                  background: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #efefef',
                  marginBottom: '0',
                }}
                onClick={() => {
                  window.location.href = `${u.url}`;
                }}
                title={u.title}
              >
                <ListItemButton style={{ padding: '3px 8px' }}>
                  <ListItemIcon
                    style={{
                      minWidth: '16px',
                      width: '16px',
                      marginRight: '8px',
                    }}
                  >
                    <img
                      src={u.icon || websiteURL}
                      style={{ height: '16px', borderRadius: '5px' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 300,
                          lineHeight: '20px',
                          height: '20px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {u.title}
                      </div>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </Grid>
          );
        })}
      </Grid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: '25px',
        }}
      >
        <div
          ref={pageEle}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showAddCategory}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {getLang('add_your_own_links_group')}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="title"
            onChange={(e) => {
              setaddCategoryTitle(e.target.value);
            }}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="description"
            onChange={(e) => {
              setaddCategoryDesc(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeModalHandler}>
            {getLang('Cancel')}
          </Button>
          <Button
            auto
            onClick={async () => {
              await submitUserCategory();
              closeModalHandler();
            }}
          >
            {getLang('Submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}
