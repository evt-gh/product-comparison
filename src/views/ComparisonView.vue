<template>
  <div class="bg-blue-200 pb-24">
    <div class="bg-white pt-[60px]">
      <div class="main-container flex justify-between items-center">
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
    </div>

    <div>
      <div class="bg-white pt-5">
        <div class="flex border-b border-b-gray-300 main-container items-end pb-16">
          <div class="w-[285px] shrink-0">
            <div class="flex items-center">
              <input type="checkbox" v-model="showDifference" id="showDifference" class="h-6 w-6">
              <label class="text-lg text-primary font-normal pl-3" for="showDifference">Показать различия</label>
            </div>
          </div>
          <div class="w-full">
            <div class="grid" :style="{'grid-template-columns': 'repeat(' + itemsCount + ', minmax(0, 1fr))'}">
              <div
                v-for="(item, index) in items.slice(0, itemsCount)"
                :key="index"
              >
                <div class="flex gap-2 justify-center items-center text-center h-30">
                  <img class="h-30" :src="item.image" />
                  <div
                    v-if="itemsCount < items.length"
                    class="h-6 w-6 relative"
                  >
                    <div @click="togglePopup(index)" class="h-6 w-6 shrink-0 cursor-pointer mt-5">
                      <img src="/src/assets/icons/chevron-down.svg" class="h-full w-full object-contain">
                    </div>
                    <div
                      v-if="openIndex === index"
                      v-click-outside="closePopup"
                      class="absolute bg-white rounded border border-gray-200 w-[421px] max-h-[336px] min-h-max right-0 p-4 overflow-y-auto drop-shadow-xl"
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
                          <img class="w-full h-full object-contain" src="/src/assets/icons/replace.svg">
                        </div>
                        <div class="h-[50px] w-8 shrink-0">
                          <img :src="innerItem.image" class="w-full h-full object-contain">
                        </div>
                        <div class="text-start text-lg font-normal">{{ innerItem.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center text-gray-800 text-lg font-medium mt-2">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-container">
        <div
          v-for="key in tableRows"
          :key="key"
          class="border-b border-b-gray-300 text-lg font-medium flex items-center"
        >
          <div class="w-[285px] uppercase text-gray-500 py-8 pr-8 shrink-0">
            {{ parametersNames[key] || key }}
          </div>
          <div class="w-full">
            <div class="grid" :style="{'grid-template-columns': 'repeat(' + itemsCount + ', minmax(0, 1fr))'}">
              <div
                v-for="(item, index) in items.slice(0, itemsCount)"
                :key="index"
                class="text-gray-800 py-8"
              >
                <div v-if="key === 'screenDiagonal'">
                  {{ item[key].toLocaleString('ru-RU') }}
                </div>
                <div v-else-if="key === 'memory'">
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
                    :src="item[key] ? '/src/assets/icons/check-mark.svg' : '/src/assets/icons/cross.svg'"
                  />
                </div>
                <div v-else>
                  {{ item[key] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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