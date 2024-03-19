<template>
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
</template>

<script setup>
import {ref} from "vue";
const buttons = ref(['AC', 'ANS', 'DEL', '+', '1', '2', '3', '-', '4', '5', '6', '*', '7', '8', '9', '/', '0', '.', '=', "**"])
const calcText = ref("")
const errorMsg = ref("")
const loggText = ref([])
let ans = "";

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

const calculate = () => {
  if (calcText.value.includes("/0")) {
    errorMsg.value = "Error: Invalid expression"
    return
  }
  if (calcText.value.includes("//")) {
    errorMsg.value = "Error: Invalid expression"
    return
  }
  try {
    let result = eval(calcText.value).toString()
    loggText.value.push(calcText.value + "=" + result + "\n")
    calcText.value = result
    ans = result
  } catch (error) {
    console.log(error)
    errorMsg.value = "Error: Invalid expression"
  }
}
</script>

<style>
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
</style>