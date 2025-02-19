import { Models } from '@rematch/core';
import authModel from './auth';
import loadingModel from './loading';
import toastModel from './toast';

export interface RootModel extends Models<RootModel> {
  auth: typeof authModel;
  loading: typeof loadingModel;
  toast: typeof toastModel;
}

export const models: RootModel = {
  auth: authModel,
  loading: loadingModel,
  toast: toastModel,
};
