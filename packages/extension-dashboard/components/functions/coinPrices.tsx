import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Grid } from '@mui/material';
import { Avatar, Badge, Button, Input, Modal, Text } from '@nextui-org/react';
import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getLang } from '../../utils/lang';
import CardModule from '../CardModule';
import CoinPriceCard from '../cards/CoinPriceCard';

const STORE_KEY = 'coinPrices_2';
export default function CoinPrices(props: {
  id?: string;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}) {
  const [symbols, setsymbols] = useState<string[]>([]);

  async function loadConfig() {
    const config = localStorage.getItem(STORE_KEY);
    if (config) {
      setsymbols(JSON.parse(config));
    } else {
      setsymbols(['BTC', 'ETH']);
    }
  }

  useEffect(() => {
    loadConfig();
  }, []);

  const [showModalState, setshowModalState] = useState(false);
  const [addSymbol, setaddSymbol] = useState('');
  async function hideModal() {
    setshowModalState(false);
    setaddSymbol('');
  }
  return (
    <CardModule
      title={getLang('Token_Price')}
      extra={
        <a
          href="#"
          onClick={() => {
            setshowModalState(true);
          }}
        >
          Add
        </a>
      }
      id={props.id}
      index={props.index}
      moveCard={props.moveCard}
    >
      <Box
        mt={2}
        style={{
          width: '100%',
        }}
      >
        <Grid container spacing={1}>
          {symbols.map((symbol) => {
            return (
              <Grid item xs={6}>
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
                  <CoinPriceCard symbol={symbol + 'USDT'}></CoinPriceCard>
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const newSymbols = symbols.filter((s) => s !== symbol);
                      setsymbols(newSymbols);
                      localStorage.setItem(
                        STORE_KEY,
                        JSON.stringify(newSymbols),
                      );
                      toast.success('Removed');
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
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={showModalState}
          onClose={hideModal}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Add token to watch
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="input token's symbol"
              onChange={(e) => {
                e.target.value && setaddSymbol(e.target.value.toUpperCase());
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={hideModal}>
              Cancel
            </Button>
            <Button
              auto
              onClick={async () => {
                if (addSymbol) {
                  symbols.push(addSymbol);
                  localStorage.setItem(STORE_KEY, JSON.stringify(symbols));
                  setsymbols(symbols);
                  hideModal();
                  toast.success('Add token success');
                }
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </CardModule>
  );
}
