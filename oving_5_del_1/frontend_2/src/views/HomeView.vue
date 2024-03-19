<template>
  <div class="main-calc">
    <div class="calculator">
      <div class="display" :style="{ 'grid-area': 'display' }">
        <p class="display-text">{{ calcText }}</p>
        <p class="error-text">{{ errorMsg }}</p>
      </div>
      <button v-for="(button, index) in buttons" :key="index" :style="{ 'grid-area': 'area' + index }" @click="calcBtnClicked(button)" :class="'area' + index">{{ button }}</button>
      <div class="logg" :style="{ 'grid-area': 'logg' }">
        <h2>Logg:</h2>
        <p v-for="(equation, index) in loggText" :key="index" class="equation">{{ equation }}</p>
      </div>
    </div>
    <div class="history">
      <h1>{{ username }} history:</h1>
      <div v-for="(equation, id) of history" :key="id">{{ id + 1 }}. {{ equation['equation'] }} = {{ equation['answer'] }}</div>
    </div>
    <button class="logout" @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import router from '@/router/index.js'
const buttons = ref(['AC', 'ANS', 'DEL', '+', '1', '2', '3', '-', '4', '5', '6', '*', '7', '8', '9', '/', '0', '.', '=', "^"])
const calcText = ref("")
const errorMsg = ref("")
const loggText = ref([])
const history = ref([])
const username = ref(localStorage.getItem("username"))
let ans = "";

onMounted(() => {
  getUsersEquations()
})

onUnmounted(() => {
  logoutUser()
})

const calcBtnClicked = (btnText) => {
  if (btnText === "=") {
    calculate()
    return
  }
  else if (btnText === "AC") {
    calcText.value = ""
  }
  else if (btnText === "ANS") {
    if (ans !== "") {
      calcText.value += ans
    }
  }
  else if (btnText === "DEL") {
    calcText.value = calcText.value.slice(0, -1)
  }
  else {
    calcText.value += btnText;
  }
  errorMsg.value = ""
}

const calculate = async () => {
  const formData = new URLSearchParams();
  formData.append('username', localStorage.getItem("username"));
  formData.append('equation', calcText.value);

  if (calcText.value.includes("/0")) {
    errorMsg.value = "Error: Invalid expression"
    return;
  }
  try {
    const response = await fetch('http://localhost:8080/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Calculation successful", result);
      loggText.value.push(calcText.value + "=" + result + "\n");
      calcText.value = result;
      ans = result;
      await getUsersEquations()
    } else {
      console.error("Calculation failed with status", response.status);
      errorMsg.value = `Error: Failed with status ${response.status}`;
    }
  } catch (error) {
    console.error("Calculation error:", error);
    errorMsg.value = "Error: " + error.message;
  }
};

const getUsersEquations = async () => {
  const formData = new URLSearchParams();
  formData.append('username', localStorage.getItem("username"));

  try {
    const response = await fetch('http://localhost:8080/getUsersEquations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      history.value = result
    } else {
      console.error("Calculation failed with status", response.status);
      errorMsg.value = `Error: Failed with status ${response.status}`;
    }
  } catch (error) {
    console.error("Calculation error:", error);
    errorMsg.value = "Error: " + error.message;
  }
};

const logoutUser = async () => {
  try {
    const response = await fetch('http://localhost:8080/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (response.ok) {
      console.log("Logout successful");
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("username", "");
      await router.push("/")
    } else {
      console.error("Logout failed with status", response.status);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};

</script>

<style>
.main-calc {
  display: flex;
}
.history {
  margin-left: 20px;
}
.calculator {
  display: grid;
  grid-template-areas:
    "display display display display"
    "area0 area1 area2 area3"
    "area4 area5 area6 area7"
    "area8 area9 area10 area11"
    "area12 area13 area14 area15"
    "area16 area17 area18 area19"
    "logg logg logg logg";

  max-width: 500px;
  width: 480px;
}
.calculator > * {
  text-align: center;
  padding: 20px;
  font-size: 30px;
  border: none;
  margin: 5px;
  border-radius: 5px;
}
.area4, .area5, .area6, .area8, .area9, .area10, .area12, .area13, .area14, .area16, .area17 {
  background-color: gray;
}
.area18 {
  background-color: orange;
}
.display {
  background-color: gray;
  height: 100px;
  padding: 0;
}
.display-text {
  height: 50px;
  width: 100%;
  resize: none;
  background-color: gray;
  font-size: 35px;
  padding: 0;
  margin: 20px 0 0;
}
.error-text {
  font-size: 20px;
  color: #a20000;
  padding: 0;
  margin: 0;
}
.logg {
  height: 200px;
  border: 1px solid #ccc;
  overflow: auto;
}
.equation {
  padding: 0;
}

.logout {
  height: 50px;
  margin: 20px;
}
</style>