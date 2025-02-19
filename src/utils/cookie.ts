import { NextPageContext } from 'next';
import nookies, { parseCookies } from 'nookies';

export interface CookieKeysKey {
  accessToken: 'accessToken';
  refreshToken: 'refreshToken';
}
export const cookieKeys: CookieKeysKey = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export const setCookie = (
  context: NextPageContext | null,
  name: string,
  value: string,
  path = '/',
): void => {
  nookies.set(context, name, value, {
    path,
  });
};

export const destroyCookie = (
  context: NextPageContext | null,
  name: string,
  path = '/',
): void => {
  nookies.destroy(context, name, { path });
};

export const checkToken = (ctx: NextPageContext | null, name: string): string | undefined | null => {
  const cookies = parseCookies(ctx);
  return cookies[name];
};
