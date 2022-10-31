class NoAuthError extends Error {
  code = 401;
  constructor(message: string) {
    super(message);
    this.name = 'NoAuthError';
  }
}
export const fetchWrapped: (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  needLogin?: boolean,
) => Promise<any> = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  needLogin = true,
) => {
  return new Promise((resolve, reject) => {
    const access_token = localStorage.getItem('access_token');

    if (init && init?.headers) {
      init.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + access_token,
        ...init.headers,
      };
    } else if (init) {
      init.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + access_token,
      };
    } else {
      init = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + access_token,
        },
      };
    }

    return fetch(input, init)
      .then((data) => data.json())
      .then(resolve)
      .catch(reject);
  });
};
