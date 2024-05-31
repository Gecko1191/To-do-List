<script setup lang="ts">
import { useToDosStore } from "@/stores/todos";
import { OnyxCheckbox, OnyxIconButton } from "sit-onyx";
import type { ToDoEntry } from "@/components/ToDoListItem/types";
import flag from "@sit-onyx/icons/flag-1.svg?raw";
import archive from "@sit-onyx/icons/archive.svg?raw";
import archiveUndo from "@sit-onyx/icons/archive-undo.svg?raw";
import trash from "@sit-onyx/icons/trash.svg?raw";
import { computed } from "vue";

const props = defineProps<{
  toDo: ToDoEntry;
  search: string;
  onMarkUnMarkCompleted?: (toDo: ToDoEntry) => void;
  onMarkUnMarkImportant?: (toDo: ToDoEntry) => void;
  onMoveToArchive?: (toDo: ToDoEntry) => void;
  onMoveOutOfArchive?: (toDo: ToDoEntry) => void;
  onDeleteToDo?: (toDo: ToDoEntry) => void;
  disableCompletedAndImportant?: boolean;
}>();
const toDo = computed(() => props.toDo);

/**
 * typeof props?.onMarkUnMarkCompleted === 'function' is needed,
 * checkbox is not really disabled, only the input not the container
 */
</script>

<template>
  <div
    :data-test="`toDo-${toDo.id}`"
    v-if="toDo.title.includes(props.search ?? '')"
    class="toDoItem"
  >
    <OnyxCheckbox
      :data-test="`completedCheckbox-${toDo.id}`"
      v-if="props.onMarkUnMarkCompleted"
      :disabled="props.disableCompletedAndImportant"
      @click="
        typeof props?.onMarkUnMarkCompleted === 'function' &&
          props?.onMarkUnMarkCompleted(toDo)
      "
      :modelValue="toDo.completed"
      :value="toDo.id"
      :label="toDo.title"
      hideLabel
    />
    <OnyxIconButton
      :data-test="`importantIconBtn-${toDo.id}`"
      v-if="props.onMarkUnMarkImportant"
      :disabled="props.disableCompletedAndImportant"
      @click="props?.onMarkUnMarkImportant(toDo)"
      :color="toDo.isImportant ? 'danger' : 'neutral'"
      :icon="flag"
    />
    <div
      :title="toDo.title"
      :class="{
        'toDoItem__text-line-through': toDo.completed,
        toItemTitle: true,
      }"
    >
      {{ toDo.title }}
    </div>
    <div class="actions">
      <OnyxIconButton
        :data-test="`moveToArchiveBtn-${toDo.id}`"
        v-if="props.onMoveToArchive"
        @click="props.onMoveToArchive(toDo)"
        :icon="archive"
      />
      <OnyxIconButton
        :data-test="`moveOutOfArchiveBtn-${toDo.id}`"
        v-if="props.onMoveOutOfArchive"
        @click="props.onMoveOutOfArchive(toDo)"
        :icon="archiveUndo"
      />
      <OnyxIconButton
        :data-test="`deleteBtn-${toDo.id}`"
        v-if="props.onDeleteToDo"
        @click="props.onDeleteToDo(toDo)"
        :icon="trash"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  min-width: fit-content;
  margin-left: auto;
  margin-right: var(--onyx-spacing-xs);
}
.toItemTitle {
  margin-left: var(--onyx-spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toDoItem {
  align-items: center;
  display: flex;
  margin-bottom: var(--onyx-spacing-md);

  height: 3em;
  border: 1px solid;
  border-color: var(--onyx-color-base-neutral-300);
  border-radius: var(--onyx-radius-sm);
  &:hover {
    border-color: var(--onyx-color-base-primary-400);
  }
  &__text-line-through {
    text-decoration: line-through;
  }
}
</style>
