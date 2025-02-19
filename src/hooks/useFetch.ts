import React from 'react';
import { useFreshCallback } from '@/hooks/utils';

interface Metadata {
  page?: number;
  perPage?: number;
  totalPages?: number;
  totalRows?: number;
}

interface State {
  isFetched: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  data: any;
  metadata: Metadata | undefined;
  isError: boolean;
}

interface UseFetch<R = undefined> {
  onFetch: (api: () => Promise<Response<R>>) => Promise<Response<R>>;
  onFetchRefresh: (api: () => Promise<Response<R>>) => Promise<Response<R>>;
  reset: () => void;
  data: R;
  isFetched: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  isError: boolean;
  metadata?: Metadata | undefined;
  onSetData: (data: R) => void;
}

interface Response<R> {
  data: R;
  metadata?: Metadata | undefined;
}

interface UseFetchProps {
  initialLoading?: boolean;
}

const useFetch = <R>({ initialLoading = false }: UseFetchProps = {}): UseFetch<R> => {
  const [state, setState] = React.useState<State>({
    isFetched: false,
    isRefreshing: false,
    isLoading: initialLoading,
    data: undefined,
    metadata: undefined,
    isError: false,
  });

  const handleFetch = useFreshCallback(
    async (api: () => Promise<Response<R>>) => {
      setState((prevState) => ({
        ...prevState,
        isError: false,
        isLoading: true,
      }));
      try {
        const res = await api();
        setState((prevState) => ({
          ...prevState,
          isFetched: true,
          isLoading: false,
          data: res?.data,
          metadata: res?.metadata,
        }));
        return await Promise.resolve(res);
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
          data: undefined,
          metadata: undefined,
        }));
        return Promise.reject(error);
      }
    },
  );

  const handleRefresh = useFreshCallback(
    async (api: () => Promise<Response<R>>) => {
      setState((prevState) => ({
        ...prevState,
        isRefreshing: true,
        isError: false,
      }));
      try {
        const res = await api();
        setState((prevState) => ({
          ...prevState,
          isRefreshing: false,
          data: res?.data,
          metadata: res?.metadata,
        }));
        return await Promise.resolve(res);
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isRefreshing: false,
          isLoading: false,
          isError: true,
        }));
        return Promise.reject(error);
      }
    },
  );

  const handleSetData = useFreshCallback((val: State['data']) => {
    setState({
      ...state,
      data: val,
    });
  });

  const handleReset = useFreshCallback(() => {
    setState({
      isFetched: false,
      isRefreshing: false,
      isLoading: false,
      data: undefined,
      metadata: undefined,
      isError: false,
    });
  });

  return {
    onFetch: handleFetch,
    onFetchRefresh: handleRefresh,
    reset: handleReset,
    data: state.data,
    metadata: state.metadata,
    isFetched: state.isFetched,
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    isError: state.isError,
    onSetData: handleSetData,
  };
};

export default useFetch;
