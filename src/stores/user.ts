import { ref } from "vue";
import { defineStore } from "pinia";
import type { user } from "@/components/UserMenu/types";

/*
The store for the Current User

@returns currentUser, loadUser
 */
export const useUserStore = defineStore("user", () => {
  const user = ref<user>();

  /**
   * load the current user
   */
  async function loadUser() {
    /*
      in a real word example we could call something like users/me
      to get the current user in an sso context
     */

    fetch(`https://jsonplaceholder.typicode.com/users/${1}`)
      .then((response) => response.json())
      .then((json) => (user.value = json));
  }

  return { user, loadUser };
});
