<template>
  <div class="main-container pb-24">
    <div class="flex justify-between items-center">
      <div class="font-bold text-5xl text-gray-700 tracking-wide">
        Смартфоны
      </div>
      <div class="flex gap-2 text-lg text-primary">
        <div>Отобразить товары:</div>
        <div
          v-for="number in items.length"
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

    <table class="w-full mt-5">
      <thead class="border-b border-b-gray-300">
        <tr>
          <th class="text-start w-[285px] align-bottom pb-[64px]">
            <div class="flex items-center gap-3">
              <input type="checkbox" v-model="showDifference" id="showDifference" class="h-6 w-6">
              <label class="text-lg text-primary font-normal" for="showDifference">Показать различия</label>
            </div>
          </th>
          <th
            v-for="(item, index) in items.slice(0, itemsCount)"
            :key="index"
            class="pb-[64px]"
          >
            <div class="flex gap-2 justify-center items-center text-center h-30">
              <img class="h-30" :src="item.image" />
              <div
                v-if="itemsCount < items.length"
                class="h-5 w-5 relative"
              >
                <div @click="togglePopup(index)" class="h-[27px] w-[30px] shrink-0 cursor-pointer mt-5">
                  <img src="/src/assets/icons/chevron-down.png" class="h-full w-full object-contain">
                </div>
                <div
                  v-if="openIndex === index"
                  v-click-outside="closePopup"
                  class="absolute bg-white rounded border border-gray-200 w-[421px] h-[336px] right-0 p-4 overflow-y-auto"
                >
                  <input
                    v-if="items.length - itemsCount > 3"
                    v-model="query"
                    class="w-full border border-gray-400 text-xl px-4 py-2 font-normal rounded mb-5 mt-4"
                    placeholder="Поиск"
                  >
                  <div
                    v-for="(innerItem, innerIndex) in hiddenFilteredItems"
                    class="flex items-center gap-4 mb-8 last:mb-0"
                  >
                    <div
                      @click="replaceItem(index, itemsCount + innerIndex)"
                      class="h-5 w-5 cursor-pointer"
                    >
                      <img class="w-full h-full object-contain" src="/src/assets/icons/replace.png">
                    </div>
                    <div class="h-[50px] w-8 shrink-0">
                      <img :src="innerItem.image" class="w-full h-full object-contain">
                    </div>
                    <div class="text-start text-lg font-normal">{{ innerItem.name }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-gray-800 text-lg font-medium mt-2">{{ item.name }}</div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-blue-200">
        <tr v-for="key in tableRows" :key="key" class="border-b border-b-gray-300 text-lg font-medium">
          <td class="text-start w-[285px] uppercase text-gray-500 py-8 pr-8">
            {{ parametersNames[key] || key }}
          </td>
          <td
            v-for="(item, index) in items.slice(0, itemsCount)"
            :key="index"
            class="text-start text-gray-800 py-8"
          >
            <div v-if="key === 'memory'">
              {{ item[key] }} Гб
            </div>
            <div v-else-if="key === 'screenRefreshRate'">
              {{ item[key] }} Гц
            </div>
            <div v-else-if="key === 'cost'">
              {{ item[key] }}
            </div>
            <div v-else-if="typeof item[key] === 'boolean'" class="h-[22px] w-[22px]">
              <img
                class="h-full w-full object-contain"
                :src="item[key] ? '/src/assets/icons/check-mark.png' : '/src/assets/icons/cross.png'"
              />
            </div>
            <div v-else>
              {{ item[key] }}
            </div>
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

const tableRows = computed(() => {
  const allRows = (Object.keys(items.value[0])).filter((key) => key !== 'name' && key !== 'image');
  if (!showDifference.value) return allRows;
  const visibleItems = items.value.slice(0, itemsCount.value);
  return allRows.filter(key => {
    const firstVal = visibleItems[0][key];
    return !visibleItems.every(item => item[key] === firstVal);
  });
});

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