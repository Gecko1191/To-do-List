<script setup lang="ts">
import ToDoList from "../components/ToDoList/ToDoList.vue";
import { useToDosArchiveStore } from "@/stores/toDosArchive";
import ToDoListItem from "@/components/ToDoListItem/ToDoListItem.vue";

const archiveStore = useToDosArchiveStore();
</script>

<template>
  <ToDoList :to-dos="archiveStore.toDos">
    <template #listItem="{ search, toDo }">
      <ToDoListItem
        :key="toDo.id"
        :disableCompletedAndImportant="true"
        :onMarkUnMarkImportant="true"
        :onMarkUnMarkCompleted="true"
        :onDeleteToDo="archiveStore.deleteToDo"
        :onMoveOutOfArchive="archiveStore.moveOutOfArchive"
        :search="search"
        :toDo="toDo"
      />
    </template>
  </ToDoList>
</template>
