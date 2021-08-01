import { request, ResponseBody } from '@tager/admin-services';

import { FileModel } from '../typings/model';

export function getFilesList(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<FileModel>>> {
  return request.get({ path: '/admin/userfiles', params });
}

export function getFilesCount(): Promise<ResponseBody<{ count: number }>> {
  return request.get({ path: '/admin/userfiles/count' });
}

export function deleteFile(
  fileId: number | string
): Promise<{ success: boolean }> {
  return request.delete({ path: `/admin/userfiles/${fileId}` });
}

export function addFile(payload: { file: string }) {
  return request.post({ path: '/admin/userfiles', body: payload });
}
