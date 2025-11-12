import { apiPath } from '.';

export const getVerifyAuth = async () => {
  const res = await fetch(apiPath.API_VERIFY, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error verifyAuth');
  const parsed = await res.json();

  return parsed;
};

export const postSignup = async (data) => {
  const res = await fetch(apiPath.API_SIGN_UP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error Signup');

  return parsed;
};

export const postSignin = async (data) => {
  const res = await fetch(apiPath.API_SIGN_IN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error Signin');

  return parsed;
};

export const postSignout = async () => {
  const res = await fetch(apiPath.API_SIGN_OUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error Signout');

  return true;
};

export const putUpdateProfile = async (data) => {
  const res = await fetch(apiPath.API_UPDATE_PROFILE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error Signin');

  return parsed;
};
