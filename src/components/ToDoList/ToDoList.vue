<script setup lang="ts">
import { computed, ref, type VueElement } from "vue";
import { OnyxInput, OnyxSelect, type SelectOption } from "sit-onyx";
import type { ToDoEntry } from "@/components/ToDoListItem/types";

const orderSelectOptions = [
  { value: "Default", label: "Default" },
  { value: "Alphabetical", label: "Alphabetical" },
  { value: "Important", label: "Important" },
  { value: "Completed", label: "Completed" },
] as SelectOption[];

const props = defineProps<{
  toDos?: Array<ToDoEntry>;
}>();

const search = ref<string>("");
const orderBy =
  ref<SelectOption<"Default" | "Alphabetical" | "Completed" | "Important">>();

/**
 * filters and sorts all toDos
 */
const filteredToDos = computed(() => {
  const filteredToDos = props.toDos?.filter((toDo) =>
    toDo.title.includes(search.value),
  );

  switch (orderBy.value?.value) {
    case "Default":
      return filteredToDos;
    case "Alphabetical":
      return filteredToDos?.sort((a, b) => a.title.localeCompare(b.title));
    case "Completed":
      return filteredToDos?.sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? -1 : 1,
      );
    case "Important":
      return filteredToDos?.sort((a, b) =>
        a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1,
      );
    default:
      return filteredToDos;
  }
});

const slots = defineSlots<{
  /** area between the list and the header components */
  underHeader?(): unknown;
  /** the item template that should be rendered */
  listItem?(): unknown;
}>();
</script>

<template>
  <div class="toDosContainer padding">
    <div class="header">
      <div class="header__upperContainer">
        <div>
          <OnyxSelect
            data-test="orderSelect"
            label="Select"
            listLabel="Order by"
            hideLabel
            v-model="orderBy"
            :options="orderSelectOptions"
            placeholder="Order by..."
          />
        </div>
        <OnyxInput
          data-test="searchInput"
          class="search"
          v-model="search"
          placeholder="Search for a task..."
          type="search"
        />
      </div>
      <div v-if="slots.underHeader" class="header__lowerContainer">
        <slot name="underHeader"></slot>
      </div>
    </div>
    <div data-test="toDoItemContainer" class="toDoItemContainer">
      <template v-for="toDo in filteredToDos">
        <slot name="listItem" :search="search" :toDo="toDo"></slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toDoItemContainer {
  height: calc(100% - 122px);
  overflow: scroll;
  scrollbar-width: none;
}
.toDosContainer {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.padding {
  padding: var(--onyx-spacing-md);
}
.header {
  width: 100%;
  &__upperContainer {
    padding-bottom: var(--onyx-spacing-md);
    justify-content: space-between;
    display: flex;
  }
  &__lowerContainer {
    padding-bottom: var(--onyx-spacing-md);
  }
}

.search {
  padding-left: var(--onyx-spacing-xl);
  width: 100%;
  max-width: 500px;
}
</style>
