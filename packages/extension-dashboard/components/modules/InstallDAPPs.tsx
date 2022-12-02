import { RemoveCircleOutline } from '@mui/icons-material';
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
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Modal,
  Navbar,
  Text,
  Tooltip,
} from '@nextui-org/react';
import {
  dapps,
  user_dapps,
  user_dapps_catogories,
} from 'extension-common/src/apis';
import { getViewLogs } from 'extension-common/src/apis/dapps_api';
import { fetchWrapped } from 'extension-common/src/apis/fetch';
import { getUserDapps } from 'extension-common/src/apis/nft_api';
import { getLang } from 'extension-common/src/lang';
import {
  getListConfig,
  setListConfig,
} from 'extension-common/src/localStore/store';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import config from '../../config';
import { UserContext } from '../../context/useUser';
import CardModule from '../CardModule';
import DappCard from '../cards/DappCard';
import AddDappModal from '../functions/AddDappModal';
import NoLogin from './common/NoLogin';

type UserDapp = user_dapps & {
  dapp: dapps;
};

export default function InstallDAPPs() {
  const { token } = useContext(UserContext);
  const [dapps, setDapps] = useState<dapps[]>([]);
  const [showAddCategory, setshowAddCategory] = useState(false);
  const [addCategoryTitle, setaddCategoryTitle] = useState('');
  const [addCategoryDesc, setaddCategoryDesc] = useState('');
  const [allDapps, setAllDapps] = useState<UserDapp[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('recent');
  const refreshDappsList = async () => {
    if (activeCategoryId == 'recent') {
      const visitlog = getViewLogs();
      console.log('visitlog', visitlog);
      setDapps(visitlog);
    } else if (activeCategoryId == 'ungrouped') {
      const _list = allDapps.filter((_dapp) => {
        return !_dapp.user_dapps_catogories_id;
      });
      setDapps(_list.map((d) => d.dapp));
    } else {
      const _list = allDapps.filter((_dapp) => {
        return activeCategoryId == _dapp.user_dapps_catogories_id;
      });
      setDapps(_list.map((d) => d.dapp));
    }
  };
  const loadUserDapps = async () => {
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
      loadUserDapps();
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
      await loadUserDapps();
    } catch (e) {
      toast.error('uninstall failed');
    }
    toast.dismiss(loading);
  }
  useEffect(() => {
    loadUserDapps();
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

  async function removeCategory(id: string) {
    const loading = toast.loading('removing...');

    try {
      const res = await fetchWrapped(
        `${config.baseURL}/dapps/user_dapp_categories/${id}`,
        {
          method: 'DELETE',
        },
      );
      toast.success('removed');
      await loadUserDapps();
      await loadUsersCategories();
    } catch (e) {
      toast.error('remove failed');
    }
    toast.dismiss(loading);
  }
  async function loadUsersCategories() {
    const cache = getListConfig('user_dapps_catogories', []);
    if (cache && cache.length) {
      setuser_categories(cache);
    }
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
      setListConfig('user_dapps_catogories', res.data);
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

  useEffect(() => {
    const lastActiveTab = localStorage.getItem('installdapp_lastActiveTab');
    if (lastActiveTab) {
      setActiveCategoryId(lastActiveTab);
    }
  }, [user_categories]);
  useEffect(() => {
    refreshDappsList();
  }, [activeCategoryId, allDapps]);
  useEffect(() => {
    if (activeCategoryId != 'recent') {
      localStorage.setItem('installdapp_lastActiveTab', activeCategoryId);
    }
  }, [activeCategoryId]);
  return (
    <Box
      mt={1}
      style={{
        width: '100%',
      }}
    >
      {token ? (
        <>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '5px 5px',
                flexWrap: 'wrap',
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
                    background:
                      activeCategoryId === cat.id ? '#9f50ff' : '#fff',
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
                  background:
                    activeCategoryId == 'ungrouped' ? '#9f50ff' : '#fff',
                  color: activeCategoryId == 'ungrouped' ? '#fff' : '#444',
                }}
              >
                {getLang('ungrouped')}
              </div>
              <Box
                sx={{
                  lineHeight: '26px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 6px',
                }}
              >
                <Tooltip
                  content={getLang('add_your_own_dapp_group')}
                  rounded
                  color="secondary"
                >
                  <AddCircleOutlineIcon
                    onClick={() => {
                      showModal();
                    }}
                    style={{ fontSize: '18px', color: '#9f50ff' }}
                  />
                </Tooltip>
                <Dropdown>
                  <Dropdown.Trigger>
                    <RemoveCircleOutline
                      style={{
                        fontSize: '18px',
                        color: '#999',
                        marginLeft: '5px',
                      }}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    color="secondary"
                    aria-label="Actions"
                    css={{ $$dropdownMenuWidth: '280px' }}
                  >
                    {user_categories.map((a) => {
                      return (
                        <Dropdown.Item key={a.id}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>{a.title}</span>
                            <Tooltip content="Delete">
                              <RemoveCircleOutline
                                onClick={() => {
                                  removeCategory(a.id);
                                }}
                                style={{
                                  fontSize: '18px',
                                  color: '#9f50ff',
                                  marginLeft: '10px',
                                }}
                              />
                            </Tooltip>
                          </div>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
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
                {getLang('no_dapps')}
              </div>
            )}
            {dapps.map((dapp) => {
              return (
                <Grid item xs={2}>
                  <Box
                    sx={{
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
                  >
                    <DappCard dapp={dapp} />
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
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <NoLogin />
      )}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showAddCategory}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {getLang('add_your_own_dapp_group')}
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
      <AddDappModal
        onSuccess={(dapp_id, selectedCatId) => {
          loadUserDapps();
          if (selectedCatId) {
            activeCategory(selectedCatId);
          }
        }}
      />
    </Box>
  );
}
