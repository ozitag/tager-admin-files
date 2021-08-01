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
      <template v-slot:cell(url)="{ row }">
        <div class="url-cell">
          <span>{{ cutUrlOrigin(row.url) }}</span>
          <base-button
            variant="icon"
            class="copy-button"
            @click="handleCopy(row.url)"
          >
            <svg-icon v-if="!isCopied" name="contentCopy" class="icon-size" />
            <svg-icon v-else name="done" class="icon-size icon-color-green" />
          </base-button>
        </div>
      </template>

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
import filesize from 'filesize';

import {
  ColumnDefinition,
  useCopyToClipboard,
  useDataTable,
  useTranslation,
} from '@tager/admin-ui';
import { useResourceDelete } from '@tager/admin-services';
import { cutUrlOrigin } from '@tager/admin-ui/src/utils/common';

import { deleteFile, getFilesList } from '../../services/requests';
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
        getFilesList({
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
        name: '#',
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

    const [isCopied, handleCopy] = useCopyToClipboard(500);

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
      isCopied,
      handleCopy,
      cutUrlOrigin,
    };
  },
});
</script>

<style lang="scss" scoped>
.url-cell {
  display: flex;
  align-items: center;

  .copy-button {
    margin-left: 5px;

    .icon-size {
      width: 14px;
      height: 14px;
    }

    .icon-color-green {
      color: #22863a;
    }
  }
}
</style>
