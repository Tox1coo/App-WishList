<script setup lang="ts">
    import {useStoreSwitcherData} from "~/store/SwitcherStoreData";

    const useSwitcherDataStore = useStoreSwitcherData()
    onMounted(() =>{
        useSwitcherDataStore.initializeFromLocalStorage();
    })
</script>

<template>
    <div class="home">
        <Hero />
        <FilterBlock/>
    </div>
</template>

<style scoped>

</style>
