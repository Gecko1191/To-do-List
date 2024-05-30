<script setup lang="ts">
import plus from "@sit-onyx/icons/plus.svg?raw";
import { nextTick, ref } from "vue";
import { OnyxInput, OnyxButton } from "sit-onyx";
import { useToDosStore } from "@/stores/todos";
import { useUserStore } from "@/stores/user";

const showInput = ref(false);
const value = ref();
const toDosStore = useToDosStore();
const userStore = useUserStore();

/**
 * sets the focus in the input after its shown
 */
function setFocus() {
  nextTick(() => {
    //@ts-expect-error kinda hacky but found not other way to access input component
    document?.querySelector(`[placeholder='Add a task']`)?.focus();
  });
}

/**
 * swap states between Button and Input component
 */
function onShowHideInput() {
  showInput.value = !showInput.value;
  if (showInput.value) {
    setFocus();
  }
}

/**
 * create a to new ToDo and reset the input value
 */
function onSubmit() {
  const userId = userStore.user?.id;
  if (value.value && userId) {
    toDosStore.createToDo(value.value);
  }
  value.value = "";
}
</script>

<template>
  <div class="addToDo">
    <OnyxButton
      v-show="!showInput"
      @click="onShowHideInput"
      class="addToDo__btn"
      color="neutral"
      :icon="plus"
      label="add Task"
    ></OnyxButton>
    <OnyxInput
      key="input"
      v-show="showInput"
      @focusout="onShowHideInput"
      @keydown.enter="onSubmit"
      class="addToDo__input"
      v-model="value"
      placeholder="Add a task"
      type="text"
    />
  </div>
</template>

<style scoped lang="scss">
.addToDo {
  width: 100%;
  height: 2rem;
  &__btn {
    width: 100%;
    justify-content: start;
  }
  &__input {
    width: 100%;
  }
}
</style>
