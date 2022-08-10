import type { RouteRecordRaw } from 'vue-router';

import FilesList from '../views/FilesList';
import FilesForm from '../views/FilesForm';

import { FILES_ROUTE_PATHS } from './paths';

export const FILES_LIST_ROUTE: RouteRecordRaw = {
  path: FILES_ROUTE_PATHS.FILES_LIST,
  component: FilesList,
  name: 'Files List',
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: '/', text: i18n.t('files:home') },
      { url: route.path, text: i18n.t('files:filesList') },
    ],
  },
};

export const FILES_FORM_ROUTE: RouteRecordRaw = {
  path: FILES_ROUTE_PATHS.FILES_FORM,
  component: FilesForm,
  name: 'Files Form',
  meta: {
    getBreadcrumbs: (route, i18n) => [
      { url: '/', text: i18n.t('files:home') },
      { url: FILES_LIST_ROUTE.path, text: i18n.t('files:filesList') },
      { url: route.path, text: i18n.t('files:filesForm') },
    ],
  },
};
