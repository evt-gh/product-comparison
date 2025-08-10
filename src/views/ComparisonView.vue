<template>
  <div class="container mx-auto">
    <div class="flex justify-between">
      <div>
        Смартфоны
      </div>
      <div class="flex gap-2">
        <div>Отобразить товары:</div>
        <div
          v-for="number in products.length"
          :key="number"
          class="cursor-pointer"
          @click="itemsCount = number"
        >
          <span
            v-if="number > 1 && number <= 6"
            :class="number === itemsCount ? 'underline' : ''"
          >
            {{ number }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useComparisonStore } from '@/stores/comparison';

const comparisonStore = useComparisonStore();
const { products } = storeToRefs(comparisonStore);

const itemsCount = ref(products.value.length < 3 ? products.value.length : 3);
</script>