<script setup lang="ts">
import ToDoList from "../components/ToDoList/ToDoList.vue";
import { useToDosArchiveStore } from "@/stores/toDosArchive";
import ToDoListItem from "@/components/ToDoListItem/ToDoListItem.vue";
import type { ToDoEntry } from "@/components/ToDoListItem/types";

const archiveStore = useToDosArchiveStore();
</script>

<template>
  <ToDoList :to-dos="archiveStore.toDos">
    <template #listItem="{ search, toDo }: { search: string; toDo: ToDoEntry }">
      <ToDoListItem
        :key="toDo.id"
        :disableCompletedAndImportant="true"
        :onMarkUnMarkImportant="() => {}"
        :onMarkUnMarkCompleted="() => {}"
        :onDeleteToDo="archiveStore.deleteToDo"
        :onMoveOutOfArchive="archiveStore.moveOutOfArchive"
        :search="search"
        :toDo="toDo"
      />
    </template>
  </ToDoList>
</template>
