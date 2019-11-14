<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>

  
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="email"
                    name="email"
                    type="email"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click.prevent="performLogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
// import axios from "axios";
// import router from '../../router'

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      isLoading: false
    };
  },
  methods: {
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginAction", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.isLoading = false;
          this.$router.push("/profile");
          // eslint-disable-next-line no-console
          console.log(res);
        })
        .catch(err => {
          this.isLoading = false;
          this.error = " There was error during login process";
        // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  }
};
</script>
