<template>
  <div class="fixed top-0 left-0 w-full bg-white h-[101px] border-b border-b-gray-600 flex items-center">
    <div class="main-container w-full">
      <div class="flex items-center justify-between font-black">
        <router-link to="/" class="text-primary text-lg">Каталог</router-link>
        <div class="flex items-center gap-x-12 text-gray-800 text-sm">
          <router-link to="/" class="uppercase">Сравнение</router-link>
          <router-link to="/">
            <div class="flex items-center gap-x-5">
              <div>Личный кабинет</div>
              <div class="h-5 w-5">
                <img src="/src/assets/icons/user.svg" class="h-full w-full object-contain">
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>