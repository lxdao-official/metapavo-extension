import React from 'react';

export default function Pavo({ style, gas }) {
  return (
    <div style={style}>
      <div className="website-pavo" style={{ display: 'block' }}>
        <div className="pavo-inner" style={{ userSelect: 'none' }}>
          <div
            style={{
              lineHeight: '13px',
              marginTop: '13px',
              color: '#fff !important',
            }}
          >
            {gas}
            <br />
            <span
              style={{
                fontSize: '12px',
                fontWeight: '400',
                opacity: '0.8',
                transform: 'scale(0.7)',
                display: 'block',
                marginTop: '4px',
              }}
            >
              GAS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
