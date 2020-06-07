const api = (url, method, body) => fetch(`${process.env.VUE_APP_BASE_URL}/${url}`, {
  method: method || 'GET',
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
  },
  body: JSON.stringify(body),
});

export default api;
