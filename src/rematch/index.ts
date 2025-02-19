import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { setStoreDispatch } from '@/https/core';
import { models, RootModel } from './models';

const store = init({
  models,
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

setStoreDispatch(store.dispatch as RematchDispatch<RootModel>);

export default store;
