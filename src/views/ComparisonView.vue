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

    <table class="w-full">
      <thead class="border-b">
        <tr>
          <th class="text-start px-2 py-1 w-64">
            <input type="checkbox" v-model="showDifference">
            Показать различия
          </th>
          <th
            v-for="(item, index) in items.slice(0, itemsCount)"
            :key="index"
            class="px-2 py-1"
          >
            <div class="flex gap-2 justify-center items-center text-center h-16">
              <img class="h-16" :src="item.image" />
              <div
                v-if="itemsCount < items.length"
                class="h-5 w-5 relative"
              >

              </div>
            </div>
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in tableRows" :key="key" class="border-b">
          <td class="text-start px-2 py-1 w-64">{{ parametersNames[key] || key }}</td>
          <td
            v-for="(item, index) in items.slice(0, itemsCount)"
            :key="index"
            class="text-start px-2 py-1"
          >
            {{ item[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useComparisonStore } from '@/stores/comparison';

const comparisonStore = useComparisonStore();
const { products, parametersNames } = storeToRefs(comparisonStore);

const items = ref(products.value);

const itemsCount = ref(items.value.length < 3 ? items.value.length : 3);

const showDifference = ref(false);

const tableRows = (Object.keys(items.value[0])).filter((key) => key !== 'name' && key !== 'image');
</script>