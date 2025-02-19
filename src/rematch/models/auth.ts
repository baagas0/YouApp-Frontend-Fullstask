import 'moment/locale/id';
import authApi, { LoginPayload } from '@/apis/auth';
import { removeAuthorizationHeader, setAuthorizationHeader } from '@/https/headers';
import { createModel } from '@rematch/core';
import {
  checkToken, cookieKeys, destroyCookie, setCookie,
} from '@/utils/cookie';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

interface AuthState {
  isReady: boolean;
  isLoading: boolean;
  isLogin: boolean;
}

export interface SSOPayload {
  accessToken: string;
  refreshToken: string;
}

const auth = createModel()({
  state: {
    isReady: false,
    isLoading: false,
    isLogin: false,
  } as AuthState,
  reducers: {
    initAuth(state, isLogin: boolean) {
      return {
        ...state,
        isReady: true,
        isLoading: false,
        isLogin,
      };
    },
    setLoginRequest(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    setLoginSuccess(state) {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };
    },
    setLoginFailed(state) {
      return {
        ...state,
        isLogin: false,
        isLoading: false,
      };
    },
    setLogout(state) {
      return {
        ...state,
        isLogin: false,
      };
    },
    setLoading(state, loading: boolean) {
      return {
        ...state,
        isLoading: loading,
      };
    },
  },
  effects: (dispatch) => ({
    async init() {
      const accessToken = checkToken(null, cookieKeys.accessToken);
      const refreshToken = checkToken(null, cookieKeys.refreshToken);
      const isLogin = !isEmpty(accessToken) && accessToken !== 'undefined' && !isEmpty(refreshToken) && refreshToken !== 'undefined';
      if (isLogin) {
        setAuthorizationHeader(accessToken as string);
      }
      dispatch.auth.initAuth(isLogin);
    },
    async handleLogin(payload: LoginPayload): Promise<number> {
      try {
        dispatch.auth.setLoginRequest();
        const res = await authApi.login({
          username: payload.username,
          password: payload.password,
        });
        const { accessToken } = res.data;
        console.log('accessToken', accessToken);

        setAuthorizationHeader(accessToken);
        dispatch.auth.setLoading(false);

        dispatch.auth.setLoginSuccess();
        setCookie(null, cookieKeys.accessToken, accessToken, '/');
        setCookie(null, cookieKeys.refreshToken, accessToken, '/'); // Because youapp api don't have refresh token yet
        return 1;
      } catch (e) {
        dispatch.auth.setLoginFailed();
        throw e;
      }
    },
    async logout() {
      dispatch.auth.setLogout();
      destroyCookie(null, cookieKeys.accessToken, '/');
      destroyCookie(null, cookieKeys.accessToken, '/');
      removeAuthorizationHeader();
      window.location.href = '/login';
    },
  }),
});

export default auth;
