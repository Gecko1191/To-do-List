<script setup lang="ts">
import { RouterView } from "vue-router";
import { computed, ref, watch } from "vue";
import { OnyxAppLayout, OnyxButton, OnyxNavBar } from "sit-onyx";

import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { useDark } from "@vueuse/core";
import UserMenu from "@/components/UserMenu/UserMenu.vue";
import { useToDosStore } from "@/stores/todos";
import { useUserStore } from "@/stores/user";

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
      <OnyxNavBar app-name="My To Do List App" icon>
        <template #contextArea>
          <UserMenu />
        </template>
      </OnyxNavBar>
    </template>
    <template v-slot:default>
      <div class="default-content">
        <Sidebar v-if="isSidebarOpen" v-model="isSidebarOpen"> </Sidebar>
        <RouterView />
      </div>
      <OnyxButton
        v-if="!isSidebarOpen"
        label="Open Sidebar"
        class="floating-button"
        @click="isSidebarOpen = !isSidebarOpen"
      />
    </template>
  </OnyxAppLayout>
</template>

<style>
.floating-button {
  position: sticky;
  bottom: var(--onyx-spacing-md);
  left: var(--onyx-spacing-md);
  z-index: var(--onyx-z-index-notification);
}
.default-content {
  height: 100%;
  display: flex;
  overflow: hidden;
}
</style>
