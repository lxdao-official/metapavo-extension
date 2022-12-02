import { RemoveCircleOutline } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@mui/material';
import {
  Button,
  Dropdown,
  Input,
  Loading,
  Modal,
  Popover,
  Text,
  Tooltip,
} from '@nextui-org/react';
import { RSS3Feed, getFeeds } from 'extension-common/src/apis/rss3_api';
import { getLang } from 'extension-common/src/lang';
import { linkImages } from 'extension-common/src/linkImages';
import {
  getListConfig,
  setListConfig,
} from 'extension-common/src/localStore/store';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getFeedTitle } from '../../common/theme/RSS3';
import { UserContext } from '../../context/useUser';
import CardModule from '../CardModule';

export default function RSS3Feeds(props: {
  id?: string;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}) {
  const [feeds, setFeeds] = useState<RSS3Feed[]>([]);
  const [loading, setLoading] = useState(true);

  const { loginedAddress } = useContext(UserContext);
  const [activeAddress, setActiveAddress] = useState<string>();
  const [addressList, setAddressList] = useState<string[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  async function loadFeeds(
    address: string,
    cursor: string | null,
    reload = false,
  ) {
    setLoading(true);
    const result = await getFeeds(address, cursor);
    setCursor(result.cursor);
    if (reload) {
      setFeeds(
        result?.result
          .map((r) => {
            // @ts-ignore
            return r.actions.map((a) => {
              return {
                ...a,
                parent: r,
                timestamp: r.timestamp,
              };
            });
          })
          .flat() || [],
      );
    } else {
      setFeeds(
        feeds.concat(
          result?.result
            .map((r) => {
              // @ts-ignore
              return r.actions.map((a) => {
                return {
                  ...a,
                  parent: r,
                  timestamp: r.timestamp,
                };
              });
            })
            .flat() || [],
        ),
      );
    }

    setLoading(false);
  }
  useEffect(() => {
    if (loginedAddress) {
      setActiveAddress(loginedAddress);
    }
  }, [loginedAddress]);
  useEffect(() => {
    if (activeAddress) {
      setCursor(null);
      setFeeds([]);
      loadFeeds(activeAddress, null, true);
    } else {
      setFeeds([]);
      setCursor(null);
    }
  }, [activeAddress]);

  const [showAddCategory, setshowAddCategory] = useState(false);
  const [addCategoryTitle, setaddCategoryTitle] = useState('');
  function closeModalHandler() {
    setshowAddCategory(false);
  }
  function showModal() {
    setshowAddCategory(true);
  }
  async function submitUserCategory() {
    if (addCategoryTitle.length > 0) {
      try {
        const newList = [...addressList, addCategoryTitle];
        setAddressList(newList);
        setListConfig('rss3_address_list', newList);
        toast.success('saved');
      } catch (e) {
        toast.error('save failed');
      }
    } else {
      toast.error('title is required');
    }
  }
  async function removeCategory(address: string) {
    const newList = addressList.filter((a) => a !== address);
    setAddressList(newList);
    setListConfig('rss3_address_list', newList);
    toast.success('removed');
    if (activeAddress == address) {
      setActiveAddress(undefined);
    }
  }
  useEffect(() => {
    const list = getListConfig('rss3_address_list', []);
    if (list.length) {
      setAddressList(list);
    }
  }, []);
  return (
    <CardModule
      title={getLang('RSS3_Feeds')}
      id={props.id}
      index={props.index}
      moveCard={props.moveCard}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '5px 5px',
          margin: '10px 0px',
          flexWrap: 'wrap',
        }}
      >
        {loginedAddress && (
          <div
            onClick={() => {
              setActiveAddress(loginedAddress);
            }}
            style={{
              fontSize: '12px',
              padding: '0px 10px',
              lineHeight: '26px',
              borderRadius: '13px',
              cursor: 'pointer',
              background: activeAddress == loginedAddress ? '#9f50ff' : '#fff',
              color: activeAddress == loginedAddress ? '#fff' : '#444',
            }}
          >
            {loginedAddress.substring(0, 12)}...
          </div>
        )}
        {addressList.map((a) => {
          return (
            <div
              onClick={() => {
                setActiveAddress(a);
              }}
              style={{
                fontSize: '12px',
                padding: '0px 10px',
                lineHeight: '26px',
                borderRadius: '13px',
                cursor: 'pointer',
                background: activeAddress == a ? '#9f50ff' : '#fff',
                color: activeAddress == a ? '#fff' : '#444',
              }}
            >
              {a.substring(0, 12)}...
            </div>
          );
        })}
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
            content={getLang('add_new_address')}
            rounded
            color="secondary"
          >
            <AddCircleOutlineIcon
              style={{ fontSize: '18px', color: '#9f50ff' }}
              onClick={() => {
                showModal();
              }}
            />
          </Tooltip>
          <Dropdown>
            <Dropdown.Trigger>
              <RemoveCircleOutline
                style={{ fontSize: '18px', color: '#999', marginLeft: '5px' }}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              color="secondary"
              aria-label="Actions"
              css={{ $$dropdownMenuWidth: '280px' }}
            >
              {addressList.map((a) => {
                return (
                  <Dropdown.Item key={a}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{a}</span>
                      <Tooltip content="Delete">
                        <RemoveCircleOutline
                          onClick={() => {
                            removeCategory(a);
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
      <Box
        sx={{
          height: '519px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {!activeAddress && (
          <div
            style={{
              textAlign: 'left',
              width: '100%',
              fontSize: '14px',
              lineHeight: '50px',
              paddingLeft: '5px',
              color: '#666',
            }}
          >
            {getLang('please_select_address')}
            <a
              target="_blank"
              style={{
                marginLeft: '10px',
              }}
            >
              {getLang('add_new_address')}
            </a>
          </div>
        )}
        {feeds.map((feed) => {
          return (
            <div
              style={{
                padding: '10px 0px',
                width: '100%',
                textAlign: 'left',
                borderBottom: '1px dashed #eee',
              }}
            >
              <div
                style={{
                  lineHeight: '20px',
                  color: '#444',
                  fontSize: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    fontWeight: 500,
                    lineHeight: '20px',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    {getFeedTitle(feed)}
                    {feed.related_urls &&
                      feed.related_urls[0]?.indexOf('etherscan.io') != -1 && (
                        <a href={feed.related_urls[0]} target={'_blank'}>
                          <img
                            src={linkImages.etherscan}
                            style={{
                              width: '12px',
                              height: '12px',
                              marginLeft: '5px',
                              verticalAlign: '-2px',
                            }}
                          />
                        </a>
                      )}
                  </div>
                  <span
                    style={{
                      paddingLeft: '10px',
                      opacity: 0.7,
                    }}
                  >
                    {moment(feed.timestamp).fromNow()}
                  </span>
                </div>
                <div
                  style={{
                    opacity: 0.7,
                    lineHeight: '20px',
                  }}
                >
                  {feed.address_from && (
                    <span>
                      from:{' '}
                      <a
                        href={`https://etherscan.io/address/${feed.address_from}`}
                        target={'_blank'}
                      >
                        {feed.address_from.substring(0, 20)}...
                      </a>{' '}
                    </span>
                  )}
                  {feed.address_to && (
                    <span>
                      to:{' '}
                      <a
                        href={`https://etherscan.io/address/${feed.address_to}`}
                        target={'_blank'}
                      >
                        {feed.address_to.substring(0, 20)}...
                      </a>
                    </span>
                  )}
                </div>
              </div>
              {/* <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <a href={'https://etherscan.io/tx/' + feed.hash}>
                  <img
                    src={linkImages.etherscan}
                    style={{
                      width: '14px',
                      height: '14px',
                    }}
                  />
                </a>
              </div> */}
            </div>
          );
        })}
        {activeAddress && loading ? <Loading size="xs" /> : null}
        {cursor && activeAddress && (
          <Box
            sx={{
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
            }}
          >
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                loadFeeds(activeAddress, cursor);
              }}
            >
              Load More
            </a>
          </Box>
        )}
      </Box>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showAddCategory}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {getLang('add_new_address')}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="address or ens"
            onChange={(e) => {
              setaddCategoryTitle(e.target.value);
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
    </CardModule>
  );
}
