import { SingleFileInputValueType } from '@tager/admin-ui';

export interface FileModel {
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
