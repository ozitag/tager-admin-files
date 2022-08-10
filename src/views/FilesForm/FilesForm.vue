<template>
  <Page :title="$i18n.t('files:fileCreation')">
    <form novalidate @submit.prevent>
      <FormFieldFileInput
        v-model:value="values.file"
        :error="errors.file"
        :label="$i18n.t('files:file')"
        name="file"
      />
    </form>

    <template #footer>
      <FormFooter
        :back-href="getFilesListUrl()"
        :is-submitting="isSubmitting"
        :is-creation="true"
        submit-label="Добавить"
        @submit="submitForm"
      />
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  TagerFormSubmitEvent,
  FormFooter,
  FormField,
  FormFieldFileInput,
} from '@tager/admin-ui';
import {
  convertRequestErrorToMap,
  navigateBack,
  useI18n,
  useResource,
  useToast,
} from '@tager/admin-services';
import { Page } from '@tager/admin-layout';

import { addFile } from '../../services/requests';
import { getFilesListUrl } from '../../utils/paths';
import { FormValues } from '../../typings/model';

import { convertFilesFormValuesToCreationPayload } from './FilesForm.helpers';

export default defineComponent({
  name: 'FilesForm',
  components: { Page, FormFieldFileInput, FormFooter },
  setup() {
    const { t } = useI18n();
    const toast = useToast();
    const router = useRouter();

    /** Form state */

    const errors = ref<Record<string, string>>({});
    const values = ref<FormValues>({ file: null });
    const isSubmitting = ref<boolean>(false);

    function submitForm(event: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      const creationPayload = convertFilesFormValuesToCreationPayload(
        values.value
      );

      addFile(creationPayload)
        .then(() => {
          errors.value = {};

          if (
            event.type === 'create' ||
            event.type === 'save' ||
            event.type === 'create_exit' ||
            event.type === 'save_exit'
          ) {
            navigateBack(router, getFilesListUrl());
          }

          toast.show({
            variant: 'success',
            title: t('files:success'),
            body: t('files:createdSuccessMessage'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
            variant: 'danger',
            title: t('files:error'),
            body: t('files:createdErrorMessage'),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    return {
      values,
      errors,
      isSubmitting,
      submitForm,
      getFilesListUrl,
    };
  },
});
</script>

<style lang="scss" scoped></style>
