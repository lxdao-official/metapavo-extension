import React, { useEffect } from 'react';

import Layout from '../components/Layout';
import BuidlInLXDAO from '../sections/BuidlInLXDAO';
import CoreConcept from '../sections/CoreConcept';
import EarlyAccess from '../sections/EarlyAccess';
import Features from '../sections/Features';
import FirstSection from '../sections/FirstSection';
import Partners from '../sections/Partners';

export default function Home() {
  const [gas, setGas] = React.useState(0);
  async function getNowGas() {
    let _nowGas = 0;
    const r3 = await fetch(
      'https://app.defisaver.com/api/gas-price/1559/current',

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json3 = await r3.json();
    if (
      json3.blockPrices &&
      json3.blockPrices.length &&
      json3.blockPrices[0].baseFeePerGas
    ) {
      _nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
    }
    return _nowGas;
  }

  useEffect(() => {
    (async () => {
      const gas = await getNowGas();
      setGas(gas);
    })();
  }, []);
  return (
    <Layout>
      <FirstSection gas={gas} />
      <CoreConcept gas={gas} />
      {/* <Features /> */}
      <BuidlInLXDAO />
      <Partners />
      {/* <EarlyAccess /> */}
    </Layout>
  );
}
