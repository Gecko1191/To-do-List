import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { user } from "@/components/UserMenu/types";

/*
The store for the Current User

@returns the current user and getUser function
 */
export const useUserStore = defineStore("user", () => {
  const user = ref<user>();

  async function getUser() {
    /*
      in a real word example we could call something like users/me
      to get the current user in an sso context
     */

    fetch(`https://jsonplaceholder.typicode.com/users/${1}`)
      .then((response) => response.json())
      .then((json) => (user.value = json));
  }

  return { user, getUser };
});
