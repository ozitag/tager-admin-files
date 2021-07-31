<template>
  <page :title="$t('files:fileCreation')">
    <form novalidate @submit.prevent>
      <template>
        <form-field-file-input
          v-model="values.file"
          :error="errors.file"
          :label="$t('files:file')"
          name="file"
        />
      </template>
    </form>

    <template v-slot:footer>
      <FormFooter
        :back-href="getFilesListUrl()"
        :on-submit="submitForm"
        :is-submitting="isSubmitting"
        :is-creation="true"
        submit-label="Добавить"
      />
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { ref } from '@vue/composition-api';

import { convertRequestErrorToMap } from '@tager/admin-services';
import {
  TagerFormSubmitEvent,
  FormFooter,
  useTranslation,
} from '@tager/admin-ui';

import { addFile } from '../../services/requests';
import { getFilesListUrl } from '../../utils/paths';
import { FormValues } from '../../typings/model';

import { convertFilesFormValuesToCreationPayload } from './FilesForm.helpers';

export default defineComponent({
  name: 'FilesForm',
  components: { FormFooter },
  setup(props, context) {
    const { t } = useTranslation(context);

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
            context.root.$router.push(getFilesListUrl());
          }

          context.root.$toast({
            variant: 'success',
            title: t('files:success'),
            body: t('files:createdSuccessMessage'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
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
