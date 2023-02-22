const tokenPrices: any = {};
export async function getTokenPrice(symbol: string) {
  const r3 = await fetch(
    `https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const json3 = await r3.json();
  if (json3.price) {
    tokenPrices[symbol] = json3.price;
    return json3.price;
  }
  return 0;
}
