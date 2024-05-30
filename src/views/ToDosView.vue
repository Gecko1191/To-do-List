<script setup lang="ts">
import ToDoList from "../components/ToDoList/ToDoList.vue";
import { useToDosStore } from "@/stores/todos";
import { useUserStore } from "@/stores/user";
import { computed, watch } from "vue";
import AddTaskInput from "@/components/AddToDoInput/AddToDoInput.vue";
import ToDoListItem from "@/components/ToDoListItem/ToDoListItem.vue";

const toDosStore = useToDosStore();
const userStore = useUserStore();
const userId = computed(() => userStore.user?.id);
watch(userId, toDosStore?.initialize);
</script>

<template>
  <ToDoList :toDos="toDosStore.toDos">
    <template #underHeader>
      <AddTaskInput />
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
