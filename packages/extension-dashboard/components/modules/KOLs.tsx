import { RemoveCircleOutline } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Button,
  Dropdown,
  Input,
  Modal,
  Text,
  Tooltip,
} from '@nextui-org/react';
import { links, linktags, userlinks } from 'extension-common/src/apis';
import { fetchWrapped } from 'extension-common/src/apis/fetch';
import {
  createUserTag,
  fetchUsersTags,
  getUserLinks,
} from 'extension-common/src/apis/links_api';
import { getLang } from 'extension-common/src/lang';
import {
  getListConfig,
  setListConfig,
} from 'extension-common/src/localStore/store';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import config from '../../config';
import { LinkLater, getList } from '../../stores/read-later';
import { IKOL } from "extension-common/src/apis/kol_api";

export default function KOLs() {
  const [kols,setKols] = useState<IKOL[]>([])
  const [loading,setLoading] = useState(false)

  async function loadKols(){
    const res = await
  }
  useEffect(() => {

  }, []);
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <Grid container spacing={1}>
        {links.length == 0 && (
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
        {links.map((u) => {
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
