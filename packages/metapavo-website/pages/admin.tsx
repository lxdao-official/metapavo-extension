import {
  Box,
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useConfirmDialog } from 'react-mui-confirm';
import { useAccount } from 'wagmi';
import { fetchWrapped } from '../common/fetch';
import { WalletContext } from '../common/useWallet';
import Layout from '../components/Layout';
import LayoutAdmin from '../components/LayoutAdmin';
import { dapps, dapp_categories } from '../types';

export default function Admin() {
  const [cats, setCats] = useState<dapp_categories[]>([]);
  const [addDappOpen, setAddDappOpen] = useState(false);
  const [selectTab, setSelectTab] = useState('');
  const { user } = useContext(WalletContext);
  const confirm = useConfirmDialog();
  const loadCats = async () => {
    const res = await fetchWrapped(
      `${process.env.NEXT_PUBLIC_APIBASE}/dapp-categories`,
    );
    setCats(res.data.sort((a: any, b: any) => a.sort > b.sort));
  };
  const delCat = async (id: string) => {
    try {
      await fetchWrapped(
        `${process.env.NEXT_PUBLIC_APIBASE}/dapp-categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      loadCats();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
  };
  const addCat = async (title: string) => {
    try {
      const res = await fetchWrapped(
        `${process.env.NEXT_PUBLIC_APIBASE}/dapp-categories`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        },
      );
      if (!res.success) {
        throw new Error(res.message);
      }
      loadCats();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
  };
  const [dappsList, setDappsList] = useState<dapps[]>([]);
  const [dappsListLoading, setDappsListLoading] = useState(false);
  async function loadDapps(categoryId?: string) {
    setDappsListLoading(true);
    const res = await fetchWrapped(
      `${process.env.NEXT_PUBLIC_APIBASE}/dapps/findAllByCategory?categoryId=${categoryId}`,
    );
    setDappsList(res.data);
    setDappsListLoading(false);
  }
  useEffect(() => {
    loadCats();
    loadDapps();
  }, []);
  return (
    <LayoutAdmin title="admin" description={'admin'}>
      {user && user.role.indexOf('ADMIN') > -1 ? (
        <Box padding={4}>
          <h2>Categories</h2>
          <Box display="flex" gap="10px 10px" flexWrap={'wrap'}>
            {cats.map((cat) => (
              <Chip
                label={cat.title}
                variant="outlined"
                onDelete={() => {
                  confirm({
                    title: 'Delete category',
                    description: `Are you sure you want to delete ${cat.title}?`,
                    onConfirm: () => delCat(cat.id),
                  });
                }}
              />
            ))}
          </Box>
          <Box mt={2}>
            <Button
              variant="outlined"
              onClick={() => {
                const name = window.prompt('input categories name');
                if (name) {
                  addCat(name);
                }
              }}
            >
              add categories
            </Button>
          </Box>
        </Box>
      ) : (
        <div>You are not admin</div>
      )}
      <Box padding={4}>
        <Button
          variant="outlined"
          onClick={() => {
            setAddDappOpen(true);
          }}
        >
          add dapp
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectTab}
          onChange={(e, newValue) => {
            setSelectTab(newValue);
            loadDapps(newValue);
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {cats.map((cat) => (
            <Tab label={cat.title} value={cat.id} />
          ))}
        </Tabs>
      </Box>
      <Box padding={4}>
        {dappsListLoading ? (
          <>
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={'50px'}
              style={{ marginTop: '10px' }}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={'50px'}
              style={{ marginTop: '10px' }}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={'50px'}
              style={{ marginTop: '10px' }}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={'50px'}
              style={{ marginTop: '10px' }}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={'50px'}
              style={{ marginTop: '10px' }}
            />
            <Skeleton
              variant="rounded"
              width={'100%'}
              height={'50px'}
              style={{ marginTop: '10px' }}
            />
          </>
        ) : (
          <List>
            {dappsList.map((dapp) => (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img src={dapp.logo || ''} style={{ height: '40px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        {dapp.title}{' '}
                        <span style={{ paddingLeft: '10px', color: '#999' }}>
                          install count: {dapp.install_count}
                        </span>
                        <span style={{ paddingLeft: '10px', color: '#999' }}>
                          visit count: {dapp.visit_count}
                        </span>
                      </>
                    }
                    secondary={
                      <>
                        <div>
                          {dapp.desc}
                          {(dapp as any).dapp_categories &&
                            (dapp as any).dapp_categories.map((cat: any) => (
                              <Chip
                                label={cat.title}
                                size="small"
                                variant="outlined"
                                style={{ marginLeft: '8px' }}
                                onDelete={() => {
                                  confirm({
                                    title: 'remove from category',
                                    description: `Are you sure you want to remove ${dapp.title} from ${cat.title}?`,
                                    onConfirm: async () => {
                                      try {
                                        const res = await fetchWrapped(
                                          `${process.env.NEXT_PUBLIC_APIBASE}/dapps/${dapp.id}/removetag/${cat.id}`,
                                          {
                                            method: 'POST',
                                            headers: {
                                              'Content-Type':
                                                'application/json',
                                            },
                                          },
                                        );
                                        if (!res.success) {
                                          throw new Error(res.message);
                                        }
                                        loadDapps(selectTab);
                                      } catch (e: any) {
                                        console.error(e);
                                        toast.error(e.message);
                                      }
                                    },
                                  });
                                }}
                              />
                            ))}
                        </div>
                      </>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <AddDappModal
        open={addDappOpen}
        onClose={() => {
          setAddDappOpen(false);
          loadDapps(selectTab);
        }}
        categories={cats}
      />
    </LayoutAdmin>
  );
}

type dapps_with_categories = {
  title?: string;
  url?: string;
  logo?: string;
  desc?: string;
  categories: string[];
};
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export function AddDappModal(props: {
  open: boolean;
  onClose: () => void;
  categories: dapp_categories[];
}) {
  //@ts-ignore
  const [dapp, setDapp] = useState<dapps_with_categories>({
    categories: [],
  });

  const [loading, setLoading] = useState(false);
  function setdapp(key: string, value: any) {
    setDapp((dapp) => ({ ...dapp, [key]: value }));
  }

  async function adddapps() {
    setLoading(true);
    try {
      const res = await fetchWrapped(
        `${process.env.NEXT_PUBLIC_APIBASE}/dapps`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dapp),
        },
      );
      if (!res.success) {
        throw new Error(res.message);
      }
      setDapp({
        categories: [],
      });
      props.onClose();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
    setLoading(false);
  }
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        props.onClose();
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Dapp
        </Typography>
        <form>
          <FormControl style={{ marginTop: '10px', width: '100%' }}>
            <InputLabel htmlFor="my-input">title</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              placeholder="input dapp title"
              value={dapp.title}
              onChange={(e) => {
                setdapp('title', e.target.value);
              }}
            />
          </FormControl>
          <br />
          <FormControl style={{ marginTop: '10px', width: '100%' }}>
            <InputLabel htmlFor="my-input">url</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              placeholder="input dapp url"
              value={dapp.url}
              onChange={(e) => {
                setdapp('url', e.target.value);
              }}
            />
          </FormControl>
          <br />
          <FormControl style={{ marginTop: '10px', width: '100%' }}>
            <InputLabel htmlFor="my-input">desc</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              placeholder="input dapp desc"
              value={dapp.desc}
              onChange={(e) => {
                setdapp('desc', e.target.value);
              }}
            />
          </FormControl>
          <br />
          <FormControl style={{ marginTop: '10px', width: '100%' }}>
            <InputLabel htmlFor="my-input">logo</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              placeholder="input dapp logo"
              value={dapp.logo}
              onChange={(e) => {
                setdapp('logo', e.target.value);
              }}
            />
          </FormControl>
          <br />
          <FormControl style={{ marginTop: '10px', width: '100%' }}>
            <InputLabel htmlFor="my-input">categories</InputLabel>
            <Select
              multiple
              placeholder="select dapp categories"
              value={(dapp as any).categories}
              onChange={(e) => {
                setdapp('categories', e.target.value);
              }}
              style={{ width: '100%' }}
            >
              {props.categories.map((cat) => (
                <MenuItem value={cat.id}>{cat.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ marginTop: '10px' }}>
            <Button
              type="button"
              variant="contained"
              onClick={async () => {
                await adddapps();
              }}
            >
              保存
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}
