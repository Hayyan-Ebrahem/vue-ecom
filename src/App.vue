<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Vue Ecom</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <Login />
    </v-content>
  </v-app>
</template>

<script>
import Login from "./components/auth/Login";

export default {
  name: "App",
  components: {
    Login
  },
  data: () => ({
    //
  })
};
</script>
