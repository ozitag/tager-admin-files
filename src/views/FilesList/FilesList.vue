<template>
  <Page
    :title="$i18n.t('files:filesList')"
    :header-buttons="[
      {
        text: $i18n.t('files:createFile'),
        href: getFilesFormUrl({ fileId: 'create' }),
      },
    ]"
  >
    <DataTable
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
      <template #cell(delete)="{ row }">
        <BaseButton
          variant="icon"
          :title="$i18n.t('files:delete')"
          :disabled="isDeleting(row.id)"
          @click="handleResourceDelete(row.id)"
        >
          <DeleteIcon />
        </BaseButton>
      </template>
    </DataTable>
  </Page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import filesize from 'filesize';

import {
  ColumnDefinition,
  useDataTable,
  DataTable,
  BaseButton,
  DeleteIcon,
  cutUrlOrigin,
} from '@tager/admin-ui';
import { useI18n, useResourceDelete } from '@tager/admin-services';
import { Page } from '@tager/admin-layout';

import { deleteFile, getFilesList } from '../../services/requests';
import { FileModel } from '../../typings/model';
import { getFilesFormUrl } from '../../utils/paths';

export default defineComponent({
  name: 'FilesList',
  components: { DataTable, BaseButton, DeleteIcon, Page },
  setup() {
    const { t } = useI18n();

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
        getFilesList({
          query: params.searchQuery,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
        }),
      initialValue: [],
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
        format: ({ row }) => filesize(row.size),
        style: { whiteSpace: 'nowrap' },
        headStyle: { whiteSpace: 'nowrap' },
      },
      {
        id: 5,
        name: 'URL',
        type: 'link',
        field: 'url',
        format: ({ row }) => ({
          url: row.url,
          text: cutUrlOrigin(row.url),
        }),
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
