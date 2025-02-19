import { createModel } from '@rematch/core';

interface LoadingState {
  isLoading: boolean;
}

const loading = createModel()({
  state: {
    isLoading: false,
  } as LoadingState,
  reducers: {
    show(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    hide(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export default loading;
