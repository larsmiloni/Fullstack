<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Calculator</RouterLink>
    <RouterLink to="/forms">Forms</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
nav * {
  font-weight: bold;
  margin: 20px;
  color: black;
}
</style>
