<script setup lang="ts">
    import {useStoreSwitcherData} from "~/store/SwitcherStoreData";
    import WishList from "~/components/Wish/WishList.vue";

    const useSwitcherDataStore = useStoreSwitcherData()
    onMounted(() =>{
        useSwitcherDataStore.initializeFromLocalStorage();
    })
    const updateList = (filter: any) => {
        // обновление списка
        // useSwitcherDataStore.updateFilter(filter);
    }

    const items = [
        {
            title: "Приоритетные",
            id: 1,
            items: [
                {
                    id:1,
                    is_priority: true,
                    name: "Вибратор",
                    price: 100000,
                    price_formatted: "100 000",
                    images: []
                },
                {
                    id:2,
                    is_priority: true,
                    name: "Вибратор2",
                    price: 10_000_00,
                    price_formatted: "10 000 00",
                    images: []
                }
            ] as WishListItem[]
        }
    ]
</script>

<template>
    <div class="home">
        <Hero />
        <FilterBlock @update-filter="updateList"/>

        <WishList v-for="wishListItem in items" :key="wishListItem.id" :title="wishListItem.title" :wish-items="wishListItem.items"/>
    </div>
</template>

<style scoped>

</style>
