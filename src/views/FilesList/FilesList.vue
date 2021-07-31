<template>
  <page
    :title="$t('files:filesList')"
    :header-buttons="[
      {
        text: $t('files:createFile'),
        href: getFilesFormUrl({ fileId: 'create' }),
      },
    ]"
  >
    <data-table
      :column-defs="columnDefs"
      :row-data="rowData"
      :loading="isRowDataLoading"
      :error-message="errorMessage"
      :search-query="searchQuery"
      :pagination="{
        pageSize,
        pageCount,
        pageNumber,
        disabled: isRowDataLoading,
      }"
      @change="handleChange"
    >
      <template v-slot:cell(delete)="{ row }">
        <base-button
          variant="icon"
          :title="$t('files:delete')"
          :disabled="isDeleting(row.id)"
          @click="handleResourceDelete(row.id)"
        >
          <svg-icon name="delete" />
        </base-button>
      </template>
    </data-table>
  </page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';

import {
  ColumnDefinition,
  useDataTable,
  useTranslation,
} from '@tager/admin-ui';
import { useResourceDelete } from '@tager/admin-services';

import { deleteFile, fetFilesList } from '../../services/requests';
import { FileModel } from '../../typings/model';
import { getFilesFormUrl } from '../../utils/paths';

export default defineComponent({
  name: 'FilesList',
  setup(props, context) {
    const { t } = useTranslation(context);

    const {
      fetchEntityList: fetchFilesList,
      isLoading: isFilesListLoading,
      rowData: filesList,
      errorMessage,
      searchQuery,
      handleChange,
      pageSize,
      pageCount,
      pageNumber,
    } = useDataTable<FileModel>({
      fetchEntityList: (params) =>
        fetFilesList({
          query: params.searchQuery,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
        }),
      initialValue: [],
      context,
      resourceName: 'Files list',
      pageSize: 100,
    });

    onMounted(() => {
      fetchFilesList();
    });

    const { handleResourceDelete, isDeleting } = useResourceDelete({
      deleteResource: deleteFile,
      resourceName: 'File',
      onSuccess: fetchFilesList,
      context,
    });

    const columnDefs: Array<ColumnDefinition<FileModel>> = [
      {
        id: 1,
        name: 'ID',
        field: 'id',
        style: { width: '50px', textAlign: 'center' },
        headStyle: { width: '50px', textAlign: 'center' },
      },
      {
        id: 2,
        name: t('files:fileName'),
        field: 'name',
      },
      {
        id: 3,
        name: t('files:fileType'),
        field: 'type',
      },
      {
        id: 4,
        name: t('files:fileSize'),
        field: 'size',
      },
      {
        id: 5,
        name: 'URL',
        field: 'url',
      },
      {
        id: 6,
        name: t('files:delete'),
        field: 'delete',
        style: { textAlign: 'center' },
        headStyle: { textAlign: 'center' },
      },
    ];

    return {
      columnDefs,
      getFilesFormUrl,
      rowData: filesList,
      isRowDataLoading: isFilesListLoading,
      errorMessage: errorMessage,
      searchQuery,
      handleChange,
      pageSize,
      pageCount,
      pageNumber,
      handleResourceDelete,
      isDeleting,
    };
  },
});
</script>