<script lang="ts" setup>
import { OnyxHeadline, OnyxIcon, OnyxNavItem } from "sit-onyx";
import clipboard from "@sit-onyx/icons/clipboard.svg?raw";
import archive from "@sit-onyx/icons/archive.svg?raw";
import flag from "@sit-onyx/icons/flag-1.svg?raw";
import { useRouter } from "vue-router";
import { useToDosStore } from "@/stores/todos";
import { useToDosArchiveStore } from "@/stores/toDosArchive";

const router = useRouter();

const toDosStore = useToDosStore();
const toDosArchiveStore = useToDosArchiveStore();

/**
 * create the label for a given count
 * @param count
 */
function countLabel(count: number) {
  return count > 0 ? `( ${count} )` : "";
}
</script>

<template>
  <Transition appear>
    <div class="sidebar-overlay">
      <div class="sidebar-overlay__content">
        <section>
          <OnyxHeadline class="sidebar-overlay__header" is="h2"
            >My To-Dos
          </OnyxHeadline>
          <OnyxNavItem
            class="activeItem"
            @click="(href) => router.push(href)"
            href="/"
          >
            <text :class="{ active: router.currentRoute.value.name === 'home' }"
              >My Tasks {{ countLabel(toDosStore.toDosCount) }}</text
            >
            <OnyxIcon :icon="clipboard" />
          </OnyxNavItem>
          <OnyxNavItem @click="(href) => router.push(href)" href="/important">
            <text
              :class="{
                active: router.currentRoute.value.name === 'important',
              }"
              >Important Tasks
              {{ countLabel(toDosStore.importantToDosCount) }}</text
            >
            <OnyxIcon :icon="flag" />
          </OnyxNavItem>
          <OnyxNavItem @click="(href) => router.push(href)" href="/archive">
            <text
              :class="{ active: router.currentRoute.value.name === 'archive' }"
              >Archive {{ countLabel(toDosArchiveStore.toDosCount) }}</text
            >
            <OnyxIcon :icon="archive" />
          </OnyxNavItem>
        </section>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";
.active {
  color: var(--onyx-color-text-icons-secondary-intense);
  font-weight: bold;
}
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
//transition styles
.v-enter-active,
.v-leave-active {
  transition: left 0.75s;
  left: 0;
}
.v-enter-from {
  left: -250px;
}
</style>
