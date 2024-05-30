import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ToDoEntry } from "@/components/ToDoListItem/types";
import { useToDosStore } from "@/stores/todos";

/*
The store for the To-Do-List archive entries

@returns toDos, toDosCount, addToArchive, deleteToDo, moveOutOfArchive
 */
export const useToDosArchiveStore = defineStore("toDosArchive", () => {
  const toDosStore = useToDosStore();
  const toDos = ref<Array<ToDoEntry>>([]);

  /**
   * calc the current count
   */
  const toDosCount = computed(() => toDos?.value?.length ?? 0);

  /**
   * add a toDo in the the archive
   * @param toDo
   */
  function addToArchive(toDo: ToDoEntry) {
    //normally we would call some sort of api to add it to the archive
    toDos.value?.push(toDo);
  }

  /**
   * move toDo back to the active toDos
   * @param toDoToMoveOut
   */
  function moveOutOfArchive(toDoToMoveOut: ToDoEntry) {
    //normally we would call some sort of api to remove it from the archive
    toDos.value = toDos.value?.filter((toDo) => toDo.id !== toDoToMoveOut.id);
    toDosStore.addToDo(toDoToMoveOut);
  }
  /**
   * delete the given ToDo entry from the archive
   * @param toDoToDelete
   */
  function deleteToDo(toDoToDelete: ToDoEntry) {
    //this would normally be in some sort of service file and could be reused
    fetch(`https://jsonplaceholder.typicode.com/todos/${toDoToDelete.id}`, {
      method: "DELETE",
    }).then(() => {
      //either we update the toDos or invalidate the data to reload the all toDos
      toDos.value = toDos.value?.filter((toDo) => toDo.id !== toDoToDelete.id);
    });
  }

  return { toDos, toDosCount, addToArchive, deleteToDo, moveOutOfArchive };
});
