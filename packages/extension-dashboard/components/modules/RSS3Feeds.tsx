import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@mui/material';
import {
  Button,
  Input,
  Loading,
  Modal,
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
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import parser from 'rss-parser-browser';
import Unidata, { Note, Notes } from 'unidata.js';

import { UserContext } from '../../context/useUser';
import CardModule from '../CardModule';

export function getFeedTitle(feed: RSS3Feed) {
  const tag = feed.tag;
  const type = feed.type;
  const metadata = feed.metadata;

  try {
    if (tag == 'transaction') {
      if (type == 'transfer') {
        if (feed.parent.tag == 'collectible') {
          return (
            <span>{`[${getLang('cost')}] ${metadata.value_display} ${
              metadata.symbol
            }`}</span>
          );
        }
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${metadata.value_display} ${metadata.symbol}`}
          </span>
        );
      }
    }
    if (tag == 'exchange') {
      if (type == 'swap') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${metadata.from.value_display} ${metadata.from.symbol} to ${metadata.to.value_display} ${metadata.to.symbol}`}
          </span>
        );
      } else if (type == 'liquidity') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${metadata.action} ${metadata.from.value_display} ${metadata.from.symbol} to ${metadata.to.value_display} ${metadata.to.symbol}`}
          </span>
        );
      } else if (type == 'bridge') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${metadata.token.value_display} ${metadata.token.symbol} to ${metadata.target_network.name}`}
          </span>
        );
      } else {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${metadata.value_display} ${metadata.symbol}`}
          </span>
        );
      }
    }

    if (tag == 'collectible') {
      if (type == 'transfer' || type == 'mint' || type == 'burn') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[1]!}>{` ${metadata.name}`}</a>
          </>
        );
      }
      if (type == 'trade') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[1]!}>{` ${metadata.name}`}</a>
            <span>
              Cost: {metadata.cost.value_display} {metadata.cost.symbol}
            </span>
          </>
        );
      } else if (type == 'poap') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[1]!}>{` ${metadata.name}`}</a>
          </>
        );
      }
    }

    if (tag == 'governance') {
      if (type == 'vote') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.proposal.title}</a>
          </>
        );
      }
      if (type == 'propose') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.title}</a>
          </>
        );
      }
    }

    if (tag == 'donation') {
      if (type == 'launch') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.title}</a>
          </>
        );
      } else if (type == 'donate') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.title}</a>
            <span>
              Donate: {metadata.token.value_display} {metadata.token.symbol}
            </span>
          </>
        );
      }
    }
  } catch (e) {}

  return getLang(tag + '_' + type);
}

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

  async function loadFeeds(address: string, cursor: string | null) {
    setLoading(true);
    const result = await getFeeds(address, cursor);
    setCursor(result.cursor);
    setFeeds(
      feeds.concat(
        result?.result
          .map((r) => {
            // @ts-ignore
            return r.actions.map((a) => {
              return {
                ...a,
                parent: r,
              };
            });
          })
          .flat() || [],
      ),
    );
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
      loadFeeds(activeAddress, null);
    }
  }, [activeAddress]);
  // useEffect(() => {
  //   if()
  // }, [addressList]);

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
          gap: '0 5px',
          margin: '10px 0px',
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
            content={getLang('add_new_address')}
            rounded
            color="secondary"
          >
            <AddCircleOutlineIcon
              style={{ fontSize: '18px', color: '#9f50ff' }}
            />
          </Tooltip>
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
                padding: '5px 0px',
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
                <div>
                  {getFeedTitle(feed)}
                  <a href={feed.related_urls[0]}>
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
                </div>
                <div>
                  {feed.address_from && (
                    <span>
                      from:{' '}
                      <a
                        href={`https://etherscan.io/address/${feed.address_from}`}
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
