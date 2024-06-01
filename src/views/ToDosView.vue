<script setup lang="ts">
import ToDoList from "../components/ToDoList/ToDoList.vue";
import { useToDosStore } from "@/stores/todos";
import AddTaskInput from "@/components/AddToDoInput/AddToDoInput.vue";
import ToDoListItem from "@/components/ToDoListItem/ToDoListItem.vue";

const toDosStore = useToDosStore();
</script>

<template>
  <ToDoList :toDos="toDosStore.toDos">
    <template #secondHeader>
      <AddTaskInput />
    </template>
    <template #listItem="{ search, toDo }">
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
