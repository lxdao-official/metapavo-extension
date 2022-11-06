import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { fetchWrapped } from '../common/fetch';
import DebouncedInput from '../components/DebouncedInput';
import LayoutDapps from '../components/LayoutDapps';

const menu = (item: any, active: boolean) => (
  <Box
    sx={{
      padding: '12px 16px',
      background: active ? 'rgba(65, 106, 252, 0.1)' : '#FFFFFF',
      color: active ? '#416AFC' : '#101828',
      border: active
        ? '0.5px solid rgba(65, 106, 252, 0.1)'
        : '0.5px solid #D0D5DD',
      borderRadius: '6px',
    }}
    height="48px"
  >
    {item}
  </Box>
);
const DappCard = (item: any) => (
  <Box
    padding={3}
    maxWidth="320px"
    height="248px"
    sx={{
      background: '#FFFFFF',
      border: '0.5px solid #D0D5DD',
      borderRadius: '6px',
    }}
  >
    <Box marginBottom={3} display="flex">
      <Box
        width="80px"
        height="80px"
        marginRight={2}
        sx={{
          border: '0.5px solid #D0D5DD',
          borderRadius: '18px',
        }}
      ></Box>
      <Box>
        <Typography
          color="#101828"
          fontWeight="600"
          fontSize="20px"
          lineHeight="24px"
          marginBottom={1}
        >
          {item.title}
        </Typography>
        <Box
          sx={{
            width: '55px',
            height: '24px',
            background: 'rgba(77, 204, 158, 0.1)',
            borderRadius: '2px',
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '24px',
            color: '#4DCC9E',
            textTransform: 'capitalize',
          }}
        >
          wallet
        </Box>
      </Box>
    </Box>
    <Box marginBottom={3}>
      <Typography>{item.desc}</Typography>
    </Box>
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <Box width={24} height={24} marginRight={1} sx={{ cursor: 'pointer' }}>
          <img src="/icons/twitterblue.svg" />
        </Box>
        <Box width={24} height={24} sx={{ cursor: 'pointer' }}>
          <img src="/icons/weblink.svg" />
        </Box>
      </Box>
      <Box width={24} height={24} sx={{ cursor: 'pointer' }}>
        <img src="/icons/star.svg" />
      </Box>
    </Box>
  </Box>
);
const appCard = (item: any) => (
  <Box
    height="80px"
    width="100%"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box display="flex" alignItems="center">
      <Box
        width="80px"
        height="80px"
        marginRight={3}
        sx={{
          border: '0.5px solid #D0D5DD',
          borderRadius: '18px',
        }}
      ></Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100%"
      >
        <Typography
          marginBottom={1}
          fontSize="20px"
          lineHeight="24px"
          color="#101828"
          fontWeight="600"
        >
          OpenSea
        </Typography>
        <Typography fontSize="14px" lineHeight="24px" color="#666F85">
          The largest and most used NFT trading platform.
        </Typography>
      </Box>
    </Box>
    <Box width={25} height={25}>
      <img src="/icons/star.svg" />
    </Box>
  </Box>
);
const storyCard = (item: any) => (
  <Box
    sx={{
      padding: '24px 24px 30px',
      maxWidth: '652px',
      background:
        'linear-gradient(95.56deg, rgba(255, 255, 255, 0.5) 10.06%, rgba(255, 255, 255, 0.5) 95.26%)',
      border: '0.5px solid #D0D5DD',
      borderRadius: '6px',
    }}
  >
    <Box
      height="300px"
      width="100%"
      marginBottom={3}
      borderRadius="6px"
      sx={{
        background: 'linear-gradient(90.5deg, #E7F0F8 0.41%, #FFFFFF 85.77%)',
      }}
    ></Box>
    <Typography
      marginBottom={1}
      sx={{
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: '40px',
        color: '#101828',
      }}
    >
      Essential tools for NFT trading
    </Typography>
    <Typography
      sx={{
        fontSize: '16px',
        lineHeight: '26px',
        color: '#666F85',
      }}
    >
      A crypto swap from the wallet & gateway to blockchain apps. Trusted by
      over 5 million users worldwide.
    </Typography>
    <Box
      sx={{
        border: '0.5px solid #D0D5DD',
        width: '100%',
        margin: '24px 0',
      }}
    ></Box>
    <Box>
      <Box>{appCard({ a: 1 })}</Box>
      <Box marginTop={3} display="flex">
        <img src="/icons/down.svg" style={{width:'21px'}}/>
        <Typography fontSize="16px" color="#666F85">more</Typography>
      </Box>
      </Box>
  </Box>
);
const menulist = ['Trending', 'NFTs', 'trading tools'];
const NFTList = ['NFTs', 'trading tools', 'wallet'];
const DappCardList = [
  {
    title: 'MetaMask Swap',
    url: '',
    logo: '',
    desc: 'A crypto swap from the wallet & gateway to blockchain apps...',
  },
];
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function Dappstore() {
  const theme = useTheme();
  const [activeMenu, setActiveMenu] = useState('Trending');
  const [page, setPage] = useState(1);
  const [storyTab, setStoryTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setStoryTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setStoryTab(index);
  };

  const getDappsCategories=async ()=>{
    const data = await fetchWrapped(`${process.env.NEXT_PUBLIC_APIBASE}/dapp-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({}),
    });
    console.log(data)
  }
  
  useEffect(() => {
    getDappsCategories();
  }, []);
  return (
    <LayoutDapps title="admin" description={'admin'}>
      <Box
        height="220px"
        width="100%"
        sx={{
          background: '#F9F9F9',
          padding: '55.5px 0',
        }}
      >
        <Box display="flex" justifyContent="center" marginBottom="32px">
          <Typography
            sx={{
              background:
                'linear-gradient(89.77deg, #6EDFA3 3.4%, #2292F9 54.78%, #7F56D9 100.87%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
            textTransform="capitalize"
            marginRight="0.32rem"
          >
            MetaPavo
          </Typography>
          <Typography> all the web3 you want is here</Typography>
        </Box>
        <Box maxWidth="1328px" margin="auto">
          <DebouncedInput
            placeholder="Search collection/address/.."
            sx={{ background: '#fff', minHeight: '48px' }}
          />
        </Box>
      </Box>
      <Box maxWidth="1328px" margin="auto">
        <Typography
          fontWeight={600}
          fontSize="32px"
          lineHeight="30px"
          color="#101828"
          marginBottom={3}
          marginTop={3}
        >
          Dapps
        </Typography>
        <Box display="flex" gap={1} marginBottom={1}>
          {menulist.map((item) => (
            <Box onClick={(item) => setActiveMenu(item)} width="auto">
              {menu(item, activeMenu == item)}
            </Box>
          ))}
        </Box>
        <Box display="flex" gap={1} marginBottom={3}>
          {NFTList.map((item) => (
            <Box onClick={(item) => setActiveMenu(item)} width="auto">
              {menu(item, activeMenu == item)}
            </Box>
          ))}
        </Box>
        <Box display="flex" gap={2}>
          {DappCardList.map((card) => DappCard(card))}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="31px"
          marginBottom="36px"
        >
          <Box
            sx={{
              width: '16px',
              height: '16px',
              background: page == 1 ? '#6047FC' : '#D0D5DD',
              borderRadius: '50%',
            }}
          ></Box>
        </Box>
        <Typography
          fontWeight={600}
          fontSize="32px"
          lineHeight="30px"
          color="#101828"
          marginBottom={3}
          marginTop={3}
        >
          Story
        </Typography>
        <Tabs value={storyTab} onChange={handleChange}>
          <Tab label="popular" />
          <Tab label="new" />
        </Tabs>
        <Box>
          <TabPanel value={storyTab} index={0} dir={theme.direction}>
            <Box>
              <Box>{storyCard({ a: 1 })}</Box>
              <Box display="flex" justifyContent="center" marginTop="94px">
                <Box
                  width="144px"
                  height="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    background: '#fff',
                    border: '0.5px solid #D0D5DD',
                    borderRadius: '6px',
                  }}
                >
                  <Typography
                    textTransform="capitalize"
                    sx={{
                      background:
                        'linear-gradient(89.77deg, #6EDFA3 3.4%, #2292F9 54.78%, #7F56D9 100.87%)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                    }}
                  >
                    view more
                  </Typography>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={storyTab} index={1} dir={theme.direction}>
            <Box>{storyCard({ a: 1 })}</Box>
          </TabPanel>
        </Box>
      </Box>
    </LayoutDapps>
  );
}
