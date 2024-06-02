<script setup lang="ts">
import ToDoList from "../components/ToDoList/ToDoList.vue";
import { useToDosStore } from "@/stores/todos";
import AddTaskInput from "@/components/AddToDoInput/AddToDoInput.vue";
import ToDoListItem from "@/components/ToDoListItem/ToDoListItem.vue";
import type { ToDoEntry } from "@/components/ToDoListItem/types";

const toDosStore = useToDosStore();
</script>

<template>
  <ToDoList :toDos="toDosStore.importantToDos">
    <template #secondHeader>
      <AddTaskInput flagAsImportant />
    </template>
    <template #listItem="{ search, toDo }: { search: string; toDo: ToDoEntry }">
      <ToDoListItem
        :key="toDo.id"
        :onMarkUnMarkImportant="toDosStore.markUnMarkImportant"
        :onMoveToArchive="toDosStore.moveToArchive"
        :onMarkUnMarkCompleted="toDosStore.markUnMarkCompleted"
        :onDeleteToDo="toDosStore.deleteToDo"
        :search="search"
        :toDo="toDo"
      />
    </template>
  </ToDoList>
</template>
