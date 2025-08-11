<template>
  <div class="font-display">
    <the-header></the-header>
    <div class="mt-[101px]">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import TheHeader from '@/components/TheHeader.vue';
</script>
