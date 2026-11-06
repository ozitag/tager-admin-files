import { type SingleFileInputValueType } from '@tager/admin-ui';

export type FileModel = {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface FormValues {
  file: SingleFileInputValueType | null;
}

export interface FilesCreatePayload {
  file: string;
}
