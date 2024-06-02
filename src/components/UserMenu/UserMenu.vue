<script lang="ts" setup>
import { OnyxUserMenu, type SelectOption } from "sit-onyx";
import { useUserStore } from "@/stores/user";
import logout from "@sit-onyx/icons/tool-table.svg";
import settings from "@sit-onyx/icons/settings.svg";

/**
 * wrapper to abstract the user
 */
const userStore = useUserStore();
//load the current user
userStore.loadUser();

const userMenuOptions = [
  { value: "/settings", label: "Settings", icon: settings },
  { value: "logout", label: "Logout", icon: logout, color: "danger" },
] satisfies SelectOption[];

//more user specific functions could be added here
//if we would load a real user we could also improve the store with a loading ref to show a busy indicator
</script>

<template>
  <OnyxUserMenu
    :username="userStore?.user?.name ?? 'could not find user name'"
    :options="userMenuOptions"
  />
</template>
