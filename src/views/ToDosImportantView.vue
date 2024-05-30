<script setup lang="ts">
import ToDoList from "../components/ToDoList/ToDoList.vue";
import { useToDosArchiveStore } from "@/stores/toDosArchive";
import { useToDosStore } from "@/stores/todos";
import AddTaskInput from "@/components/AddToDoInput/AddToDoInput.vue";
import ToDoListItem from "@/components/ToDoListItem/ToDoListItem.vue";

const toDosStore = useToDosStore();
</script>

<template>
  <ToDoList :toDos="toDosStore.importantToDos">
    <template #underHeader>
      <AddTaskInput flagAsImportant />
    </template>
    <template #listItem="{ search, toDo }">
      <ToDoListItem
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
