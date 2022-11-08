import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Index from '.';

const rootElement = document.createElement('div');
rootElement.id = 'metapavo-popup';

document.body.appendChild(rootElement);
document.body.style.margin = '0';

const style = document.createElement('style');
style.innerText = `
@import url('https://rsms.me/inter/inter.css');
#metapavo-login *{
  font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}
`;
document.body.appendChild(style);
const RootElement = styled.div`
  width: 250px;
`;

ReactDOM.render(
  <React.StrictMode>
    <RootElement>
      <Index />
    </RootElement>
  </React.StrictMode>,
  rootElement,
);
