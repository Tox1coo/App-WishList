<script setup lang="ts">

    import type {Ref} from "vue";

    const sortedItems: SelectedItem[] = [
        {
            id: "priority",
            name: "По приоритету"
        },
        {
            id: "date",
            name:"По дате создания"
        },
        {
            id: "price-min",
            name: "От мин до макс"
        },
        {
            id: "price-max",
            name: "От макс до мин"
        }
    ];

    const activeSort: Ref<SelectedItem> = ref(sortedItems[0]);

    const handleSortChange = (key: string) => {}

    const groupItems: SelectedItem[] = [
        {
            id: "ungroup",
            name: "Не группировать"
        },
        {
            id: "priority",
            name: "По приоритету"
        },
        {
            id: "price",
            name: "По стоимости"
        }
    ]

    const activeGroup: Ref<SelectedItem> = ref(groupItems[0]);
</script>

<template>
    <div class="w-full min-w-full h-auto filter-block flex justify-end items-center gap-5">
        <BaseDropDown :selected="activeSort" :options="sortedItems" />
        <BaseDropDown :selected="activeGroup" :options="groupItems" />
    </div>
</template>

<style scoped>

</style>
