import { createModel } from '@rematch/core';

type ToastVariant = 'success' | 'error';

interface ToastAction {
  text: string;
  onClick: () => void;
}
interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
  action?: ToastAction;
}

const toast = createModel()({
  state: [] as ToastState[],
  reducers: {
    addToast(state: ToastState[], payload: Omit<ToastState, 'id'>) {
      return [...state, { id: Date.now(), ...payload }];
    },
    removeToast(state: ToastState[], id: number) {
      return state.filter((currentToast) => currentToast.id !== id);
    },
  },
});

export default toast;
