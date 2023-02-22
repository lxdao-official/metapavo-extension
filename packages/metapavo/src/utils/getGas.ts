export async function getNowGas() {
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
