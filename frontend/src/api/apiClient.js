export const apiClient = {
  get: async (url) => {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    const parsed = await res.json();
    if (!res.ok && !parsed?.message) throw newRequestError('GET', url);

    return parsed;
  },

  post: async (url, data = null) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    const parsed = await res.json();
    if (!res.ok && !parsed?.message) throw newRequestError('POST', url);

    return parsed;
  },

  put: async (url, data) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    const parsed = await res.json();
    if (!res.ok && !parsed?.message) throw newRequestError('PUT', url);

    return parsed;
  },

  delete: async (url, data = null) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    const parsed = res.json();
    if (!res.ok && !parsed?.message) throw newRequestError('DELETE', url);

    return parsed;
  },

  patch: async (url, data = null) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      credentials: 'include',
    });

    const parsed = res.json();
    if (!res.ok && !parsed?.message) throw newRequestError('PATCH', url);

    return parsed;
  },
};

const newRequestError = (method = 'GET', url = '') =>
  new Error(`Error: ${method} request to ${url} failed.`);
