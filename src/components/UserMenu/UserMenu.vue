<script lang="ts" setup>
import { OnyxUserMenu, type SelectOption } from "sit-onyx";
import { useUserStore } from "@/stores/user";
import logout from "@sit-onyx/icons/tool-table.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";

const userStore = useUserStore();
userStore.getUser();

const userMenuOptions = [
  { value: "/settings", label: "Settings", icon: settings },
  { value: "logout", label: "Logout", icon: logout, color: "danger" },
] satisfies SelectOption[];

//TODO: more user specific functions could be added here
</script>

<template>
  <OnyxUserMenu
    :username="userStore?.user?.name ?? 'could not find user name'"
    :options="userMenuOptions"
  />
</template>

<style lang="scss" scoped></style>
