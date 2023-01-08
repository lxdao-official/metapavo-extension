export async function getTokenList(address: string): Promise<
  {
    contract_address: string;
    name: string;
    symbol: string;
    decimals: string;
    balance: string;
  }[]
> {
  const res = await fetch(
    'https://api.chainbase.online/v1/account/tokens?chain_id=1&address=' +
      address,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '2JwZhRt51s7jCimxu5lCcfkEjaK',
      },
    },
  );
  const res2 = await fetch(
    'https://api.chainbase.online/v1/account/balance?chain_id=1&address=' +
      address,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '2JwZhRt51s7jCimxu5lCcfkEjaK',
      },
    },
  );
  const json = await res.json();
  const json2 = await res2.json();

  const tokens = json.data || [];
  tokens.push({
    contract_address: '',
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
    balance: json2.data,
  });
  return tokens;
}
