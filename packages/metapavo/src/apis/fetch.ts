export const fetchWrapped: (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) => Promise<any> = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  return new Promise((resolve, reject) => {
    if (!chrome?.storage?.local) {
      reject("access_token is not found");
      return;
    }
    chrome.storage.local.get(["access_token"], function (data) {
      const access_token = data.access_token;
      
      if (access_token) {
        if (init && init?.headers) {
          init.headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
            ...init.headers,
          };
        } else if (init) {
          init.headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
          };
        } else {
          init = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + access_token,
            },
          };
        }
      } else {
        throw new Error("access_token is not found");
      }

      return fetch(input, init)
        .then((data) => data.json())
        .then(resolve)
        .catch(reject);
    });
  });
};
