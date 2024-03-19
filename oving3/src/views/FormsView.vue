<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-div">
      <label for="name">First name:</label>
      <input type="text" id="name" name="name" v-model="formData.name"><br>
      <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
    </div>
    <div class="input-div">
      <label for="mail">Mail:</label>
      <input type="text" id="mail" name="mail" v-model="formData.mail"><br>
      <span class="error-text" v-if="errors.mail">{{ errors.mail }}</span>
    </div>
    <div class="input-div">
      <label for="message">Message:</label>
      <input type="text" id="message" name="message" v-model="formData.message"><br>
      <span class="error-text" v-if="errors.message">{{ errors.message }}</span>
    </div>
    <input :disabled="Object.keys(errors).length !== 0" type="submit" id="submit" value="Submit">
  </form>
  <p>{{ responseText }}</p>
</template>

<style scoped>
  .input-div {
    margin: 30px 0;
  }
  .error-text {
    color: red;
  }
</style>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const formData = computed({
  get: () => store.state.formData,
  set: value => store.commit('updateFormData', value)
})

const responseText = computed(() => store.state.responseText)

const errors = computed(() => {
  const errors = {};
  if (!formData.value.name) {
    errors.name = 'Name is required';
  }
  if (!formData.value.mail) {
    errors.mail = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.value.mail)) {
    errors.mail = 'Email is invalid';
  }
  if (!formData.value.message) {
    errors.message = 'Message is required';
  }
  return errors;
});

function handleSubmit() {
  if (Object.keys(errors.value).length === 0) {
    store.dispatch(('submitForm'))
  }
}
</script>