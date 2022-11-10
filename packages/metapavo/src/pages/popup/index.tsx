import AddIcon from '@mui/icons-material/Add';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Button, Spacer } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import Footer from './Footer';

export default function Index() {
  const [url, setUrl] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs?.[0].url || '');
      setLogo(tabs?.[0].favIconUrl || '');
      setTitle(tabs?.[0].title || '');
    });
  }, []);
  return (
    <div>
      <div>
        <div
          style={{
            padding: '20px 20px',
          }}
        >
          <ListItem
            disablePadding
            style={{
              background: '#fff',
              borderRadius: '5px',
              border: '1px solid #efefef',
              boxShadow: '0 4px 14px 0 #dcdee1',
            }}
          >
            <ListItemButton style={{ padding: '5px 12px' }}>
              <ListItemIcon
                style={{
                  minWidth: '20px',
                  width: '20px',
                  marginRight: '12px',
                }}
              >
                <img
                  src={logo}
                  style={{ height: '20px', borderRadius: '8px' }}
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
                      color: '#444',
                    }}
                  >
                    {title || ''}
                  </div>
                }
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
            padding: '0px 20px',
          }}
        >
          <Button
            auto
            size={'sm'}
            style={{
              width: '45%',
            }}
            color={'gradient'}
          >
            Read Later
          </Button>
        </div>
      </div>

      <div style={{}}>
        <div
          style={{
            padding: '20px 20px',
          }}
        >
          <ListItem
            disablePadding
            style={{
              background: '#fff',
              borderRadius: '5px',
              border: '1px solid #efefef',
              boxShadow: '0 4px 14px 0 #dcdee1',
            }}
          >
            <ListItemButton style={{ padding: '5px 12px' }}>
              <ListItemIcon
                style={{
                  minWidth: '20px',
                  width: '20px',
                  marginRight: '12px',
                }}
              >
                <img
                  src={logo}
                  style={{ height: '20px', borderRadius: '8px' }}
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
                      color: '#444',
                    }}
                  >
                    {title || ''}
                  </div>
                }
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
            padding: '0px 20px',
          }}
        >
          <Button
            auto
            size={'sm'}
            style={{
              width: '45%',
            }}
            color={'gradient'}
          >
            Install DAPP
          </Button>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}
