import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useToDosArchiveStore } from "@/stores/toDosArchive";
import { useUserStore } from "@/stores/user";
import type { ToDoEntry } from "@/components/ToDoListItem/types";

/*
The store for the To-Do-List entries

@returns initialize, toDos, importantToDos, createToDo, deleteToDo, moveToArchive, addToDo, markUnMarkCompleted, markUnMarkImportant, importantToDosCount, toDosCount,
 */
export const useToDosStore = defineStore("toDos", () => {
  const toDosArchiveStore = useToDosArchiveStore();
  const toDos = ref<Array<ToDoEntry>>();

  /**
   * filter the important todos
   */
  const importantToDos = computed(() =>
    toDos.value?.filter((toDo) => toDo.isImportant),
  );

  /**
   * calc count for the important toDos
   */
  const importantToDosCount = computed(
    () => importantToDos?.value?.length ?? 0,
  );

  /**
   * calc count for the toDos
   */
  const toDosCount = computed(() => toDos?.value?.length ?? 0);

  /**
   * load the toDos for the current user
   */
  async function initialize() {
    const userStore = useUserStore();

    fetch(
      `https://jsonplaceholder.typicode.com/users/${userStore.user?.id}/todos`,
    )
      .then((response) => response.json())
      .then((json) => (toDos.value = json));
  }
  /**
   * needed out of demo purposes to calc a new ToDo id
   */
  function calcId() {
    let id = 0;
    do {
      id++;
    } while (toDos.value?.find((toDo) => toDo.id === id));
    return id;
  }

  /**
   * create a to do with a given title and to option to add it as an important toDo
   * @param title
   * @param important
   */
  function createToDo(title: string, important?: boolean) {
    /**
     * normally we would call some sort of fetch 'post' to create a new toDo.
     * and the backend would add a uuid.
     */
    const userStore = useUserStore();
    if (userStore.user?.id) {
      /**
       * use unshift to add entry on top of the list
       */
      toDos.value?.unshift({
        title: title,
        userId: userStore.user?.id,
        isImportant: important ?? false,
        completed: false,
        id: calcId(),
      });
    }
  }

  /**
   * delete the given ToDo entry
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

  /**
   * Move the given ToDo to the archive store
   * @param toDoToMove
   */
  function moveToArchive(toDoToMove: ToDoEntry) {
    /**
     *  here we would also call some sort of api to move it to the archive
     *  addToArchive would then just reload the toDosArchiveStore to refresh the data.
     */

    toDos.value = toDos.value?.filter((toDo) => toDo.id !== toDoToMove.id);
    toDosArchiveStore.addToArchive(toDoToMove);
  }

  /**
   * add a toDo entry from outside
   * if we would call an api from the archive store to reload the data this function would not be needed
   * @param toDoToAdd
   */
  function addToDo(toDoToAdd: ToDoEntry) {
    toDos.value?.unshift(toDoToAdd);
  }

  /**
   * Mark the given ToDo as completed
   * @param toDoToUpdate
   */
  function markUnMarkCompleted(toDoToUpdate: ToDoEntry) {
    toDos.value = toDos.value?.map((toDo) => {
      if (toDo.id === toDoToUpdate.id) {
        return { ...toDoToUpdate, completed: !toDoToUpdate.completed };
      } else {
        return toDo;
      }
    });
  }
  /**
   * Mark the given ToDo as important
   * @param toDoToUpdate
   */
  function markUnMarkImportant(toDoToUpdate: ToDoEntry) {
    toDos.value = toDos.value?.map((toDo) => {
      if (toDo.id === toDoToUpdate.id) {
        return { ...toDoToUpdate, isImportant: !toDoToUpdate.isImportant };
      } else {
        return toDo;
      }
    });
  }

  return {
    initialize,
    toDos,
    importantToDos,
    createToDo,
    deleteToDo,
    moveToArchive,
    addToDo,
    markUnMarkCompleted,
    markUnMarkImportant,
    importantToDosCount,
    toDosCount,
  };
});
