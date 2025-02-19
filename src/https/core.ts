import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RematchDispatch } from '@rematch/core';
import { has } from 'lodash';

let dispatch: RematchDispatch<any>;

export const setStoreDispatch = (d: RematchDispatch<any>) => {
  dispatch = d;
};

export const defaultHeaders = {};

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
};

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface Metadata {
  page?: number;
  perPage?: number;
  totalPages?: number;
  totalRows?: number;
}

export interface CoreHttpResponse<D> {
  status: number;
  message: string;
  data: D;
  metadata?: {
    page?: number;
    perPage?: number;
    totalPages?: number;
    totalRows?: number;
  };
}

export interface BlobResponse {
  status: number;
  success?: boolean;
  message?: string;
  data: Blob;
  metadata?: Metadata;
}

// interface FetchTokenResponse {
//   token: string;
// }

// interface QueueItem {
//   resolve: (value?: string | PromiseLike<string> | undefined) => void;
//   reject: (reason?: any) => void;
// }

// let isRefreshing = false;

// Store requests that waiting for refresh token
// let queue: QueueItem[] = [];

// function handleQueue(err: Error | null, token = '') {
//   queue.forEach(prom => {
//     if (err) {
//       prom.reject(err);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   queue = [];
// }

// interface CustomOriginalRequest extends AxiosRequestConfig {
//   _retry?: boolean;
// }

const responseInterceptor = async (response: AxiosResponse): Promise<any> => {
  // const { data: responseData, status: responseStatus, config } = response;
  // const { message, data, status, code, error } = responseData;

  // const okStatus = getCoreApiResponseOk(responseStatus);
  // const originalRequest: CustomOriginalRequest = config;

  // if (responseStatus === 401 && !originalRequest._retry) {
  //   console.log('core 401');
  //   originalRequest._retry = true;
  //   // const currentUserToken = await get(STORAGE_KEYS.userToken);
  //   removeAccessTokenHeader();
  //   removeAuthorizationHeader();
  //   // const res = await requestAccessToken();
  //   // const accessToken = res?.token_access;
  //   // setAccessTokenHeader(accessToken);
  //   // set(STORAGE_KEYS.accessToken, accessToken);
  //   originalRequest.headers = {
  //     ...originalRequest.headers,
  //     // 'Access-Token': accessToken,
  //   };
  //   return instance(originalRequest);
  // }

  // if (okStatus) {
  //   return {
  //     data,
  //     message,
  //   };
  // }
  if (response.data instanceof Blob) {
    return response.data;
  }

  if (response.status >= 200 && response.status < 300) {
    return {
      status: response.status,
      success: true,
      message: response.data?.message,
      data: has(response, 'data.data') ? response.data?.data : response.data,
      metadata: response.data?.metadata ? {
        page: response.data?.metadata?.page,
        perPage: response.data?.metadata?.per_page,
        totalPages: response.data?.metadata?.total_pages,
        totalRows: response.data?.metadata?.total_rows,
      } : undefined,
    };
  }

  return Promise.reject(response?.data);
};

const errorInterceptor = (error: any) => {
  // console.log(error)
  // const originalRequest = error.config;

  // If error from refresh token api we immediately return error
  // if (originalRequest.url === refreshTokenUrl) {
  //   return Promise.reject(error);
  // }

  if (error?.response?.status < 200 && error?.response?.status >= 300) {
    // If response status 403 no permission for the request we can force user logout
    // Ex: store.dispatch(usersActions.logout());
    return Promise.reject(error?.response?.data);
  }

  if (error?.response?.status === 403) {
    // If response status 403 no permission for the request we can force user logout
    // Ex: store.dispatch(usersActions.logout());
    return Promise.reject(error?.response?.data);
  }

  if (error?.response?.status === 401) {
    console.log('core 401');
    dispatch({ type: 'auth/logout' });
    return Promise.reject(error?.response?.data);
  }

  if (error?.response?.status !== 401) {
    // Other error not 401 we can safely return error
    return Promise.reject(error?.response?.data);
  }

  // There are no request trying to get the refresh token
  // if (!isRefreshing && !originalRequest._retry) {
  //   originalRequest._retry = true;
  //
  //   isRefreshing = true;
  //
  //   // If your refresh token api require refresh token.
  //   // You need to get current user refresh token.
  //   // Either in local storage example like window.localStorage.getItem('refreshToken');
  //   // Or redux example like store.getState().user.information.refreshToken.
  //   // That depend in your setup, your code base, your method.
  //   // The example here assume refresh token api require no refresh token
  //
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get<FetchTokenResponse>(refreshTokenUrl)
  //       .then((res) => {
  //
  //         // For demo purpose, using query token. If your request require Bearer in the header
  //         // you can check the line below
  //         // originalRequest.headers.Authorization = 'Bearer ' + res.data.token;
  //
  //         // If you are using default header. Make sure set default token again
  //         // or every next request have to call refresh token
  //         // axios.defaults.headers.common.Authorization = res.data.token;
  //
  //         originalRequest.url =
  //           originalRequest.url + '&token=' + res.data.token;
  //         resolve(axios(originalRequest));
  //
  //         handleQueue(null, res.data.token);
  //       })
  //       .catch((err) => {
  //         // If can't get new token when we might need force user logout
  //         // Ex: store.dispatch(usersActions.logout());
  //         handleQueue(err);
  //         // Handle your logic when get token failed
  //         reject(err);
  //       })
  //       .then(() => {
  //         isRefreshing = false;
  //       });
  //   });
  // }

  // // There are a request trying to get the refresh token
  // if (isRefreshing) {
  //   return new Promise<string>((resolve, reject) => {
  //     queue.push({ resolve, reject });
  //   })
  //     .then((token) => {
  //       // For demo purpose, using query token. If your request require Bearer in the header
  //       // you can check the line below
  //       // originalRequest.headers.Authorization = 'Bearer ' + res.data.token;
  //
  //       originalRequest.url = originalRequest.url + '&token=' + token;
  //       return axios(originalRequest);
  //     })
  //     .catch(err => {
  //       return err;
  //     });
  // }
  return Promise.reject(error?.response?.data);
};

const instance: AxiosInstance = axios.create(options);

instance.defaults.headers.common = defaultHeaders;
instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instance;
