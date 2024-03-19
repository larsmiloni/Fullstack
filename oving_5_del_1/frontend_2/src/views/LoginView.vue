<template>
  <div class="main">
    <div v-if="login" class="login-div">
      <h2>Login</h2>
      <div class="input">
        <input type="text" placeholder="username" v-model="loginUsername">
        <input type="password" placeholder="password" v-model="loginPassword">
        <button @click="loginUser">Login</button>
        <p class="error">{{ loginErr }}</p>
        <p class="isLogin" @click="login = false">Register</p>
      </div>
    </div>
    <div v-if="!login" class="register-div">
      <h2>Register</h2>
      <div class="input">
        <input type="text" placeholder="username" v-model="registerUsername">
        <input type="password" placeholder="password" v-model="registerPassword">
        <button @click="registerUser">Register</button>
        <p class="error">{{ registerErr }}</p>
        <p class="isLogin" @click="login = true">Login</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}
h2 {
  margin-bottom: 5px;
}
.input {
  display: flex;
  flex-direction: column;
  width: 500px;
}
.input input {
  height: 40px;
  margin-bottom: 5px;
  font-size: 20px;
}
.input button {
  height: 40px;
  box-sizing: border-box;
  font-size: 20px;
}
.isLogin {
  margin: 0;
  text-align: center;
  color: blue;
  text-decoration: underline;
}
.error {
  margin-top: 0;
  color: #b00000;
}
</style>

<script setup>
import {ref} from "vue";
import router from '@/router/index.js'

const login = ref(true);

const registerUsername = ref("");
const registerPassword = ref("");
const loginUsername = ref("")
const loginPassword = ref("")

const loginErr = ref("")
const registerErr = ref("")

const loginUser = async () => {
  const formData = new URLSearchParams();
  formData.append('username', loginUsername.value);
  formData.append('password', loginPassword.value);

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    if (response.ok) {
      console.log("Login successful");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", loginUsername.value);
      await router.push("/home")
    } else {
      const errorMsg = await response.text();
      console.error("Login failed with status", response.status, "Message:", errorMsg);
      loginErr.value = errorMsg;
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

const registerUser = async () => {
  const formData = new URLSearchParams();
  formData.append('username', registerUsername.value);
  formData.append('password', registerPassword.value);

  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    if (response.ok) {
      console.log("Registration successful");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", registerUsername.value);
      await router.push("/home");
    } else {
      const errorMsg = await response.text();
      console.error("Registration failed with status", response.status, "Message:", errorMsg);
      registerErr.value = errorMsg;
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};
</script>