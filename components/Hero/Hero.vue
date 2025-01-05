<script setup lang="ts">
    import {useStoreSwitcherData} from "~/store/SwitcherStoreData";

    const useSwitcherDataStore = useStoreSwitcherData()

</script>

<template>
    <div class="hero max-w-full w-full min-w-full mx-auto relative p-20 h-auto flex flex-col gap-y-5 justify-center items-center">
        <h1 class="text-6xl font-bold text-gray-700">Наш список желаемого</h1>
        <div class="switcher flex gap-5 items-center">
            <p class="text-4xl font-medium text-gray-500">Амогус</p>
            <BaseSwitcher key-field="typeWishList" v-model="useSwitcherDataStore.getSwitcherData"/>
            <p class="text-4xl font-medium text-gray-500">Ананасик</p>
        </div>
        <div class="flex sm:flex-row flex-col gap-4 lg:mt-4 mt-2">
            <button class="md:px-28 px-4 md:py-4 py-2 md:text-2xl text-lg font-bold rounded-xl gradiant cursor-pointer text-white transition-all duration-300 hover:scale-105">Добавить желаемое</button>
        </div>
    </div>
</template>

<style scoped>
.gradiant {
    background: linear-gradient(95deg, #059DFF 15%, #6549D5 45%, #E33FA1 75%, #FB5343 100%) 95%/200% 100%;
}
</style>
