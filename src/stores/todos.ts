import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface ToDoEntry {
  completed: boolean;
  title: string;
  userId: number
  id: number
}
/*
The store for the To-Do-List entries

@returns the To-Do-List entries and the given crud operations (create, update, delete)
 */
export const useToDosStore = defineStore('to-do-list', (userID = 1) => {

  const toDos = ref<Array<ToDoEntry>>()

  async function initialize() {
    fetch(`https://jsonplaceholder.typicode.com/users/${userID}/todos`)
        .then((response) => response.json())
        .then((json) => toDos.value = json);
  }

  function createToDo(entry: ToDoEntry) {
    // const uuid = uuidv4()
    fetch(`https://jsonplaceholder.typicode.com/todos/${entry.id}`, {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then((entry: ToDoEntry) => {
          toDos.value?.push(entry)
        });
  }

  function deleteToDo(id: number) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      //either we update the toDos or invalidate the data to reload the all toDos
      toDos.value = toDos.value?.filter((toDo) => toDo.id !== id)
    });
  }

  function updateToDo(entry: ToDoEntry) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${entry.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...entry,
        title: 'name change'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then((updatedEntry: ToDoEntry) => {
          //either we update the toDos or invalidate the data to reload the all toDos
          toDos.value = toDos.value?.map((toDo) => {
            if(toDo.id === updatedEntry.id){
              return updatedEntry
            } else {
              return toDo
            }
          })
        });

  }

  return {initialize, todos: toDos, createToDo, deleteToDo, updateToDo }
})
