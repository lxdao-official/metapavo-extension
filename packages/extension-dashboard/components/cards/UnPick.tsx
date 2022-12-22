import CancelIcon from '@mui/icons-material/Cancel';
import { Tooltip } from '@nextui-org/react';
import { CSSProperties } from 'react';

import { PickBtn } from '../styles';

export default function UnPick(props: {
  style: CSSProperties;
  onPick: (value: string) => void;
}) {
  const id = Math.random();
  return (
    <PickBtn style={{ ...props.style }}>
      <Tooltip content="Remove from dashboard" placement="top">
        <CancelIcon
          style={{
            color: '#999',
            fontSize: '18px',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onPick('pick');
          }}
        />
      </Tooltip>
    </PickBtn>
  );
}
