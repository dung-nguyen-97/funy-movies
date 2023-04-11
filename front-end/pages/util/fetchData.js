function fetchApi(url, opts) {
  // eslint-disable-next-line no-undef
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...opts
  })
    .then((response) => {
      // Shorthand to check for an HTTP 2xx response status.
      if (response.ok) {
        return response;
      }
      throw response;
    })
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      if (error.json) {
        // a response throwed above
        return error.json().then((json) => {
          const err = Object.assign({}, json, {
            status: error.status,
            statusText: error.statusText
          });
          return Promise.reject(err);
        });
      }
      console.error(error);
      return Promise.reject(error);
    });
}

export { fetchApi };
