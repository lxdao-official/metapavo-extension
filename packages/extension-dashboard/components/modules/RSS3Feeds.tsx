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
          <a href={feed.related_urls[0]!}> {metadata.proposal.title}</a>
        </>
      );
    }
  }

  return '';
}
type IFeed = {
  title: string;
  description: string;
  pubDate: string;
  auther: string;
  link: string;
};
export default function RSS3Feeds(props: {
  id?: string;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}) {
  const [feeds, setFeeds] = useState<RSS3Feed[]>([]);
  const [loading, setLoading] = useState(true);

  const { loginedAddress } = useContext(UserContext);
  const [activeAddress, setActiveAddress] = useState('');
  const [addressList, setAddressList] = useState<string[]>([]);
  async function loadFeeds(address: string) {
    setLoading(true);
    const result = await getFeeds(address);
    console.log('notes', result?.result);
    setFeeds(
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
      loadFeeds(activeAddress);
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
          <Tooltip content={'add new watch address'} rounded color="secondary">
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
        {loading ? <Loading size="xs" /> : null}
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
                        {feed.address_from.substring(0, 10)}...
                      </a>{' '}
                    </span>
                  )}
                  {feed.address_to && (
                    <span>
                      to:{' '}
                      <a
                        href={`https://etherscan.io/address/${feed.address_to}`}
                      >
                        {feed.address_to.substring(0, 10)}...
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
      </Box>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showAddCategory}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add address
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
