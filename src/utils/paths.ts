import { compile } from 'path-to-regexp';

import { FILES_ROUTE_PATHS } from '../constants/paths';

export function getFilesListUrl(): string {
  return FILES_ROUTE_PATHS.FILES_LIST;
}

export function getFilesFormUrl(params: { fileId: string | number }): string {
  return compile(FILES_ROUTE_PATHS.FILES_FORM)(params);
}
