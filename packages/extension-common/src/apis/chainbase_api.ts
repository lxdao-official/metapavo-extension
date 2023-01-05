export async function getTokenList(address: string) {
  const res = await fetch(
    'https://api.chainbase.online/v1/account/tokens?chain_id=1&address=' +
      address,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '<API_KEY>',
      },
    },
  );
}
