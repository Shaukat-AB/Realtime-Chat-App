export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiPath = {
    //Auth
    API_VERIFY: `${BASE_URL}/api/auth/profile/verify`,
    API_UPDATE_PROFILE: `${BASE_URL}/api/auth/profile/update`,
    API_SIGN_UP: `${BASE_URL}/api/auth/signup`,
    API_SIGN_IN: `${BASE_URL}/api/auth/signin`,
    API_SIGN_OUT: `${BASE_URL}/api/auth/signout`,

    //Message
    API_CONTACTS: `${BASE_URL}/api/message/user-contacts`,
    API_MESSAGES_BY_ID: `${BASE_URL}/api/message/`, //add userId
    API_SEND_MESSAGE_BY_ID: `${BASE_URL}/api/message/send/`, //add userId
};
