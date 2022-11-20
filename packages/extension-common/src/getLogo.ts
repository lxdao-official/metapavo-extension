export const getLogo = async (url: string) => {
  try {
    const host = url.replace(/^(http(s)?:\/\/(.*?))\/.*$/, '$1');
    const logo = localStorage.getItem('logo_' + host);
    if (logo !== null) {
      return logo;
    }
    const res = await fetch(
      'https://favicongrabber.com/api/grab/' +
        encodeURIComponent(host.replace(/http(s)?:\/\//, '')),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await res.json();
    if (json) {
      if (json.icons && json.icons.length > 0) {
        const img = json.icons[0].src;
        if (img) {
          localStorage.setItem('logo_' + host, img);
          return img;
        }
      }
    }
    localStorage.setItem('logo_' + host, '');
    return '';
  } catch (e) {
    return '';
  }
};
