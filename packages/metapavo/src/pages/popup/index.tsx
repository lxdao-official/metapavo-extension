import AddIcon from '@mui/icons-material/Add';
import { Button, Spacer } from '@nextui-org/react';

import Footer from './Footer';

export default function Index() {
  return (
    <div>
      <div
        style={{
          padding: '40px 30px',
        }}
      >
        <div
          style={{
            margin: '10px 0',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '10px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: '1px solid #efefef',
              color: '#666',
            }}
          >
            <AddIcon />
            <div style={{ lineHeight: '18px' }}>read later</div>
          </div>

          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '10px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: '1px solid #efefef',
              color: '#666',
            }}
          >
            <AddIcon />
            <div style={{ lineHeight: '18px' }}>dapp</div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
