const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (resource, data, method = 'GET') => {
  const url = `${baseUrl}/${resource}`;

  console.log(url);

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchWithoutToken };
