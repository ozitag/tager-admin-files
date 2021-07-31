<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { useTranslation } from '@tager/admin-ui';
import { MenuItemType } from '@tager/admin-layout';

import { getFilesListUrl } from '../utils/paths';

export default defineComponent({
  name: 'App',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: 'files',
        text: t('files:files'),
        icon: 'viewList',
        children: [{ text: t('files:filesList'), url: getFilesListUrl() }],
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
