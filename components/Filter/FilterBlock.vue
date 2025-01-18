<script setup lang="ts">

    import type {Ref} from "vue";
    import {EnumFilterTypes, type FilterTypes} from "~/types/enums";
    import {BaseDropDown} from "#components";

    const emit = defineEmits(["updateFilter"])

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

    const activeSort: SelectedItem = sortedItems[0];

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

    const activeGroup: SelectedItem = groupItems[0];

    const filters: Ref<FilterItem[]> = ref([
        {
            id: "sort",
            name: "Сортировка",
            type: EnumFilterTypes.DROPDOWN,
            options: sortedItems,
            value: activeSort
        },
        {
            id: "group",
            name: "Группировка",
            type: EnumFilterTypes.DROPDOWN,
            options: groupItems,
            value: activeGroup
        },
    ])

    const updateFilter = (options: {newValue: [number, number] | SelectedItem | {id: "string", checked: boolean}, filterId: string}) => {
        filters.value = filters.value.map((filterItem) => {
            if (filterItem.id === options.filterId) {
                switch (filterItem.type) {
                    case EnumFilterTypes.DROPDOWN:
                        return {...filterItem, value: options.newValue as SelectedItem}
                    case EnumFilterTypes.CHECKBOX:
                        return filterItem
                    default:
                        break;
                }
            }
            return filterItem;
        })

        const activeFilters = getActiveFilters();

        emit("updateFilter", {newFilters: activeFilters})
    }

    const getActiveFilters = (): ActiveFilterItem[] => {
        return filters.value.filter((filterItem) => {
            switch (filterItem.type) {
                case EnumFilterTypes.DROPDOWN:
                    return (filterItem as FilterItemDropdown).value.id !== 'auto'
                case EnumFilterTypes.CHECKBOX:
                    return (filterItem as FilterItemCheckbox).options.find((option) => option.checked)
                case EnumFilterTypes.RANGE:
                    const isMinActive = (filterItem as FilterItemRange).value[0] > 0 && (filterItem as FilterItemRange).value[0] > (filterItem as FilterItemRange).min;
                    const isMaxActive = (filterItem as FilterItemRange).value[1] > 0 && (filterItem as FilterItemRange).value[1] < (filterItem as FilterItemRange).max;
                    return isMinActive || isMaxActive
                default:
                    return false
            }
        }).map((filterItem) => {
            let value: number | string = "";
            switch (filterItem.type) {
                case EnumFilterTypes.DROPDOWN:
                    value = (filterItem as FilterItemDropdown).value.id;
                    break;
                case EnumFilterTypes.CHECKBOX:
                    value = 1;
                    break;
                case EnumFilterTypes.RANGE:
                    value = (filterItem as FilterItemRange).value.join(",");
                    break;
                default:
                    break;
            }
            return {
                id: filterItem.id,
                name: filterItem.name,
                value: value,
            }
        })
    }

    const getFilters = computed(() => {
        return filters.value;
    });

    const getComponentByType = (type: FilterTypes) => {
        switch (type) {
            case EnumFilterTypes.DROPDOWN:
                return BaseDropDown;
            case EnumFilterTypes.CHECKBOX:
                return "";
            default:
                return "";
        }
    }

    const getBindByType = (options:{type: FilterTypes, filterItem: FilterItem}) => {
        const {type, filterItem} = options;
        switch (type) {
            case EnumFilterTypes.DROPDOWN:
                const filter = filterItem as FilterItemDropdown;
                return {
                    id: filter.id,
                    selectedItem: filter.value,
                    options: filter.options,
                }
            case EnumFilterTypes.CHECKBOX:
                return {}
            default:
                return {}
        }
    }
</script>

<template>
    <div class="w-full min-w-full h-auto filter-block flex justify-end items-center gap-5">
        <template v-for="filter in getFilters" :key="filter.id">
            <component :is="getComponentByType(filter.type)" v-bind="getBindByType({type: filter.type, filterItem: filter})" @update-filter="updateFilter"/>
        </template>
<!--        <BaseDropDown @update-filter="updateFilter" :selected-item="activeSort" :options="sortedItems" />-->
<!--        <BaseDropDown @update-filter="updateFilter" :selected-item="activeGroup" :options="groupItems" />-->
    </div>
</template>

<style scoped>

</style>
