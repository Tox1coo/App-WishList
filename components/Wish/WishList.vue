<script setup lang="ts">
    import type {WishListItem} from "~/types";

    const {
        title,
        wishItems
    } = defineProps<{
        title: string;
        wishItems: WishListItem[];
    }>()
</script>

<template>
    <div class="wrapper px-28">
        <h2 class="">{{ title }}</h2>
        <div class="wish-items flex gap-2.5">
            <WishItem v-for="wishItem in wishItems" :key="wishItem.id" :wish-item="wishItem"/>
        </div>
    </div>
</template>

<style scoped>

</style>
