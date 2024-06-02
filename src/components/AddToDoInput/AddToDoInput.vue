<script setup lang="ts">
import plus from "@sit-onyx/icons/plus.svg?raw";
import { nextTick, ref } from "vue";
import { OnyxInput, OnyxButton, OnyxIconButton } from "sit-onyx";
import { useToDosStore } from "@/stores/todos";
import { useUserStore } from "@/stores/user";

const props = defineProps<{
  flagAsImportant?: boolean;
}>();

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
function onShowHideInput(e: any) {
  if (e?.relatedTarget?.name !== "addToDoInputBtn") {
    showInput.value = !showInput.value;
    if (showInput.value) {
      setFocus();
    }
  }
}

/**
 * create a to new ToDo and reset the input value
 */
function onSubmit() {
  const userId = userStore.user?.id;
  if (value.value && userId) {
    toDosStore.createToDo(value.value, props?.flagAsImportant);
  }
  //reset input after add in a toDo
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
    />
    <div class="addToDo__inputContainer">
      <OnyxInput
        data-test="addToDoInput"
        v-show="showInput"
        @focusout="onShowHideInput"
        @keydown.enter="onSubmit"
        class="addToDo__input"
        v-model="value"
        placeholder="Add a task"
        type="text"
      />
      <OnyxIconButton
        name="addToDoInputBtn"
        @focusout="onShowHideInput"
        v-show="showInput"
        @click="onSubmit"
        class="addToDo__inputBtn"
        :icon="plus"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sit-onyx/breakpoints.scss";

.addToDo {
  width: 100%;
  &__btn {
    width: 100%;
    justify-content: start;
  }
  &__inputContainer {
    display: flex;
    align-items: center;
  }
  &__inputBtn {
    display: none;
    margin-left: var(--onyx-spacing-xs);

    @include breakpoints.screen(max, md) {
      display: flex;
    }
  }
  &__input {
    width: 100%;
  }
}
</style>
