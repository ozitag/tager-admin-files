import { CustomRouteConfig } from '@tager/admin-layout';

import FilesList from '../views/FilesList';
import FilesForm from '../views/FilesForm';

import { FILES_ROUTE_PATHS } from './paths';

export const FILES_LIST_ROUTE: CustomRouteConfig = {
  path: FILES_ROUTE_PATHS.FILES_LIST,
  component: FilesList,
  name: 'Files List',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('files:home') },
      { url: route.path, text: t('files:filesList') },
    ],
  },
};

export const FILES_FORM_ROUTE: CustomRouteConfig = {
  path: FILES_ROUTE_PATHS.FILES_FORM,
  component: FilesForm,
  name: 'Files Form',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('files:home') },
      { url: FILES_LIST_ROUTE.path, text: t('files:filesList') },
      { url: route.path, text: t('files:filesForm') },
    ],
  },
};
