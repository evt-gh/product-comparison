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
                <div @click="togglePopup(index)" class="h-5 w-5 cursor-pointer">V</div>
                <div
                  v-if="openIndex === index"
                  v-click-outside="closePopup"
                  class="absolute bg-white rounded border w-64 h-48 right-0 p-4 overflow-y-auto"
                >
                  <input
                    v-if="items.length - itemsCount > 3"
                    v-model="query"
                    class="w-full"
                    placeholder="Поиск"
                  >
                  <div
                    v-for="(innerItem, innerIndex) in hiddenFilteredItems"
                    class="flex gap-2 mt-2"
                  >
                    <div @click="replaceItem(index, itemsCount + innerIndex)">+</div>
                    <div class="h-6 w-6 shrink-0">
                      <img :src="innerItem.image" class="w-full h-full object-contain" />
                    </div>
                    <div>{{ innerItem.name }}</div>
                  </div>
                </div>
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
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useComparisonStore } from '@/stores/comparison';

const comparisonStore = useComparisonStore();
const { products, parametersNames } = storeToRefs(comparisonStore);

const items = ref(products.value);
const itemsCount = ref(items.value.length < 3 ? items.value.length : 3);

const showDifference = ref(false);
const tableRows = (Object.keys(items.value[0])).filter((key) => key !== 'name' && key !== 'image');

const openIndex = ref<number | null>(null)
const query = ref('')
const togglePopup = (index: number) => {
  query.value = ''
  openIndex.value = openIndex.value === index ? null : index
}
const closePopup = () => {
  openIndex.value = null
  query.value = ''
}
const replaceItem = (index: number, replaceIndex: number) => {
  const temp = items.value[index];
  items.value[index] = items.value[replaceIndex];
  items.value[replaceIndex] = temp;
  closePopup()
}
const hiddenFilteredItems = computed(() => {
  const hiddenItems = items.value.slice(itemsCount.value);
  if (!query.value.trim()) return hiddenItems;
  const lowerQuery = query.value.toLowerCase();
  return hiddenItems.filter(item => {
    return Object.values(item).some(val => String(val).toLowerCase().includes(lowerQuery))
  });
})
</script>