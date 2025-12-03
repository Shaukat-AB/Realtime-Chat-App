import { apiClient, apiPath } from '.';

export const getVerifyAuth = async () => {
  return await apiClient.get(apiPath.API_VERIFY);
};

export const postSignup = async (data) => {
  return await apiClient.post(apiPath.API_SIGN_UP, data);
};

export const postSignin = async (data) => {
  return await apiClient.post(apiPath.API_SIGN_IN, data);
};

export const postSignout = async () => {
  return await apiClient.post(apiPath.API_SIGN_OUT);
};

export const putUpdateProfile = async (data) => {
  return await apiClient.put(apiPath.API_UPDATE_PROFILE, data);
};
