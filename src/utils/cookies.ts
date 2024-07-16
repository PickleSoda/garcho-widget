import Cookies from 'js-cookie';

const USER_COOKIE_NAME = 'garcho_user';

export const getUserFromCookies = () => {
  const user = Cookies.get(USER_COOKIE_NAME);
  return user ? JSON.parse(user) : null;
};

export const setUserToCookies = (user: any) => {
  Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), { expires: 7 });
};

export const removeUserFromCookies = () => {
  Cookies.remove(USER_COOKIE_NAME);
};
