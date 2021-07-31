import { FilesCreatePayload, FormValues } from '../../typings/model';

export function convertFilesFormValuesToCreationPayload(
  values: FormValues
): FilesCreatePayload {
  return {
    file: values.file?.file.id ?? '',
  };
}
