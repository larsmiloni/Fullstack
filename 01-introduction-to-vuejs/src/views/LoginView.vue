<template>
  <div id="loginContainer">
    <div id="loginTitle">
      <label>Please login!</label>
    </div>
    <div id="username">
      <label id="usernameLabel">Username:</label>
      <textarea v-model="username"></textarea>
    </div>
    <div id="password">
      <label id="passwordLabel">Password: </label>
      <textarea v-model="password" id="password"></textarea>
      <button v-on:click="handleLoginClick" id="signinbutton">Sign in</button>
      <label id="loginstatusLabel">{{ loginStatus }}</label>
    </div>
  </div>
  <SyncAsyncExample></SyncAsyncExample>
</template>

<script lang="ts">
import router from '@/router';
import axios from 'axios'
import SyncAsyncExample from "@/components/SyncAsyncExample.vue";

//in LoginView.vue file
import {isLoginSuccessful} from "../utils/loginutils"
import {loginRequest} from "../utils/httputils.js"


export default {
  name: "LoginView",
  components: { SyncAsyncExample },
  methods: {
    // in LoginView.vue file
    async handleLoginClick() {
      let response = await loginRequest({})
      if(isLoginSuccessful(response)){
        router.push("/home");
      }
    }
    ,
  },
  data() {
    return {
      username: "",
      password: "",
      loginStatus: "",
    };
  },
};
</script>

<style scoped>
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}

#loginTitle {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
}

#username,
#password {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
}

#usernameLabel,
#passwordLabel {
  width: 100px;
}
</style>
