<script lang="ts" setup>
import { OnyxButton, OnyxHeadline, OnyxIcon, OnyxNavItem } from "sit-onyx";
import clipboard from "@sit-onyx/icons/clipboard.svg?raw";
import archive from "@sit-onyx/icons/archive.svg?raw";
import flag from "@sit-onyx/icons/flag-1.svg?raw";
import { useRouter } from "vue-router";
import { useToDosStore } from "@/stores/todos";
import { useToDosArchiveStore } from "@/stores/toDosArchive";

defineProps<{ transparent?: boolean }>();

const router = useRouter();
const isOpen = defineModel<boolean>();

const toDosStore = useToDosStore();
const toDosArchiveStore = useToDosArchiveStore();

function countLabel(count: number) {
  return count > 0 ? `( ${count} )` : "";
}
</script>

<template>
  <div class="sidebar-overlay">
    <div class="sidebar-overlay__content">
      <section>
        <OnyxHeadline class="sidebar-overlay__header" is="h2"
          >My To Do List App
        </OnyxHeadline>

        <OnyxNavItem @click="(href) => router.push(href)" href="/">
          My Tasks {{ countLabel(toDosStore.toDosCount) }}
          <OnyxIcon :icon="clipboard" />
        </OnyxNavItem>
        <OnyxNavItem @click="(href) => router.push(href)" href="/important">
          Important Tasks {{ countLabel(toDosStore.importantToDosCount) }}
          <OnyxIcon :icon="flag" />
        </OnyxNavItem>
        <OnyxNavItem @click="(href) => router.push(href)" href="/archive">
          Archive {{ countLabel(toDosArchiveStore.toDosCount) }}
          <OnyxIcon :icon="archive" />
        </OnyxNavItem>
      </section>

      <OnyxButton
        class="sidebar-overlay__close"
        label="Close"
        @click="isOpen = false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.sidebar-overlay {
  height: 100%;
  z-index: var(--onyx-z-index-page-overlay);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  &__content {
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background-color: var(--onyx-color-base-background-blank);

    width: 15.625rem;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--onyx-spacing-md);
    box-sizing: border-box;
  }
  &__close {
    justify-self: flex-end;
  }
  &__header {
    padding: var(--onyx-spacing-md);
  }
  @include breakpoints.screen(max, md) {
    position: absolute;
  }
}
</style>
