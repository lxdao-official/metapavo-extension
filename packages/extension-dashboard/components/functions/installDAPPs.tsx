import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Avatar, Button, Input, Modal, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import config from '../../config';
import { dapps, user_dapps, user_dapps_catogories } from '../../utils/apis';
import { fetchWrapped } from '../../utils/apis/fetch';
import { getUserDapps } from '../../utils/apis/nft_api';

type UserDapp = user_dapps & {
  dapp: dapps;
};

export default function InstallDAPPs() {
  const [userdapps, setuserdapps] = useState<UserDapp[]>([]);
  const [showAddCategory, setshowAddCategory] = useState(false);
  const [addCategoryTitle, setaddCategoryTitle] = useState('');
  const [addCategoryDesc, setaddCategoryDesc] = useState('');
  const [allDapps, setAllDapps] = useState<UserDapp[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>();
  const refreshDappsList = async () => {
    if (activeCategoryId) {
      const _list = allDapps.filter((_dapp) => {
        return activeCategoryId == _dapp.user_dapps_catogories_id;
      });
      setuserdapps(_list);
    } else {
      setuserdapps(allDapps);
    }
  };
  const loadFavs = async () => {
    try {
      const cache = localStorage.getItem('userdapps');
      if (cache) {
        const cacheJson = JSON.parse(cache);
        if (cacheJson.length) {
          setAllDapps(cacheJson);
        }
      }
    } catch (e) {}

    const res = await getUserDapps();
    if (res && res.data) {
      setAllDapps(res.data as UserDapp[]);
      localStorage.setItem('userdapps', JSON.stringify(res.data));
    }
  };

  async function addUserDappCategory(title: string, desc: string) {
    const res = await fetchWrapped(
      `${config.baseURL}/dapps/user_dapp_categories`,
      {
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
        }),
      },
    );
    if (res && res.data) {
      loadFavs();
      loadUsersCategories();
    }
  }

  async function uninstallDapp(dapp_id: string) {
    const loading = toast.loading('Uninstalling...');
    try {
      const res = await fetchWrapped(
        `${config.baseURL}/dapps/${dapp_id}/uninstall`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      toast.success('uninstalled');
      await loadFavs();
    } catch (e) {
      toast.error('uninstall failed');
    }
    toast.dismiss(loading);
  }
  useEffect(() => {
    loadFavs();
    loadUsersCategories();
  }, []);

  const [user_categories, setuser_categories] = useState<
    user_dapps_catogories[]
  >([]);

  async function submitUserCategory() {
    const loading = toast.loading('saveing...');

    if (addCategoryTitle.length > 0) {
      try {
        await addUserDappCategory(addCategoryTitle, addCategoryDesc);
        setshowAddCategory(false);
        setaddCategoryTitle('');
        setaddCategoryDesc('');
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
    const res = await fetchWrapped(
      `${config.baseURL}/dapps/user_dapp_categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (res && res.data) {
      setuser_categories(res.data as user_dapps_catogories[]);
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
    refreshDappsList();
  }
  return (
    <Box
      mt={1}
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <Button.Group size="xs" color="secondary" style={{ margin: '0' }}>
          {user_categories.map((cat) => (
            <Button
              onClick={() => {
                activeCategory(cat.id);
              }}
            >
              {cat.title}
            </Button>
          ))}
          <Button
            onClick={() => {
              showModal();
            }}
            style={{
              width: '50px',
            }}
            icon={
              <AddCircleOutlineIcon
                style={{ fontSize: '16px', color: '#fff' }}
              />
            }
          />
        </Button.Group>
      </div>
      <Grid container spacing={1}>
        {userdapps.map((u) => {
          const dapp = u.dapp;
          return (
            <Grid item xs={2}>
              <ListItem
                disablePadding
                sx={{
                  background: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #efefef',
                  position: 'relative',
                  '& .icon': {
                    display: 'none',
                  },
                  '&:hover': {
                    '& .icon': {
                      display: 'block',
                    },
                  },
                }}
                onClick={() => {
                  window.location.href = `${process.env.NEXT_PUBLIC_APIBASE}/dapps/jump/${dapp.id}`;
                }}
              >
                <ListItemButton style={{ padding: '5px 10px' }}>
                  <ListItemIcon
                    style={{
                      minWidth: '20px',
                      width: '20px',
                      marginRight: '8px',
                    }}
                  >
                    <img
                      src={dapp.logo || ''}
                      style={{ height: '20px', borderRadius: '5px' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '20px',
                          height: '20px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {dapp.title}{' '}
                      </div>
                    }
                  ></ListItemText>
                </ListItemButton>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    uninstallDapp(dapp.id);
                  }}
                  style={{
                    position: 'absolute',
                    right: '-10px',
                    top: '-10px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                  className="icon"
                >
                  <HighlightOffIcon
                    style={{
                      width: '20px',
                      fontSize: '20px',
                      color: '#5B28EB',
                    }}
                  />
                </a>
              </ListItem>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showAddCategory}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add your self own dapps category
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
            Cancel
          </Button>
          <Button
            auto
            onClick={async () => {
              await submitUserCategory();
              closeModalHandler();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}
