import { useContext } from '@nuxtjs/composition-api';
import cookieNames from '~/enums/cookieNameEnum';

export const useCookie = () => {
  const { app } = useContext();

  const getCookie = (cookieName: string) => app.$cookies.get(cookieName);
  const setCookie = (cookieName: string, value: string) => app.$cookies.set(cookieName, value);

  const getStore = () => getCookie(cookieNames.storeCookieName);
  const setStore = (newStore: string) => setCookie(cookieNames.storeCookieName, newStore);

  const getCurrency = () => getCookie(cookieNames.currencyCookieName);
  const setCurrency = (newCurrency: string) => setCookie(cookieNames.currencyCookieName, newCurrency);

  const getLocale = () => getCookie(cookieNames.localeCookieName);
  const setLocale = (newLocale: string) => setCookie(cookieNames.localeCookieName, newLocale);

  return {
    getCookie,
    setCookie,
    getStore,
    setStore,
    getCurrency,
    setCurrency,
    getLocale,
    setLocale,
  };
};

export default useCookie;
