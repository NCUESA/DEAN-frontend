<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="container-fluid" style="background-color: wheat; min-height: 100vh;">
    <header>
      <h1 class="text-center">DEAN</h1>
    </header>
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>
