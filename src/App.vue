<script setup lang="ts">
import { RouterView } from "vue-router";
import { computed, ref, watch } from "vue";
import {
  OnyxAppLayout,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxNavBar,
} from "sit-onyx";

import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { useDark } from "@vueuse/core";
import UserMenu from "@/components/UserMenu/UserMenu.vue";
import { useToDosStore } from "@/stores/todos";
import { useUserStore } from "@/stores/user";
import menu from "@sit-onyx/icons/menu.svg?raw";
import clipboard from "@sit-onyx/icons/clipboard.svg?raw";

const isDark = useDark();
const isSidebarOpen = ref(true);

/**
 * initialize the toDos after the user is loaded.
 */
const toDosStore = useToDosStore();
const userStore = useUserStore();
const userId = computed(() => userStore.user?.id);
watch(userId, toDosStore?.initialize);
</script>

<template>
  <OnyxAppLayout :model-value="isDark">
    <template #navBar>
      <OnyxNavBar app-name="">
        <template #appArea>
          <OnyxIcon :icon="clipboard"></OnyxIcon>
          <OnyxHeadline class="appHeader" is="h2"
            >My To Do List App
          </OnyxHeadline>
        </template>
        <template #contextArea>
          <UserMenu />
          <OnyxIcon
            class="menuIconBtn"
            :icon="menu"
            @click="isSidebarOpen = !isSidebarOpen"
          />
        </template>
      </OnyxNavBar>
    </template>
    <template v-slot:default>
      <div class="defaultContent">
        <Sidebar v-if="isSidebarOpen" v-model="isSidebarOpen"> </Sidebar>
        <RouterView />
      </div>
    </template>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.defaultContent {
  height: 100%;
  display: flex;
  overflow: hidden;
}

.menuIconBtn {
  display: none;

  @include breakpoints.screen(max, md) {
    display: flex;
  }
}

.appHeader {
  display: flex;

  @include breakpoints.screen(max, md) {
    display: none;
  }
}
</style>
