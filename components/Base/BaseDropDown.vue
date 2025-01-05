<script setup lang="ts">
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import type {PropType} from "vue";

const {
    options,
    selected
} = defineProps<
    {
        options: PropType<SelectedItem[]>,
        selected: PropType<SelectedItem | null>,
    }
>();

const getNameSelected = computed(() => {
    return selected ? selected.name : "Выберите";
})

</script>

<template>
    <div class="">
        <Listbox >
            <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                    <span class="block truncate">{{ getNameSelected }}</span>
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                    <Icon
                        name="mingcute:selector-vertical-fill"
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
          </span>
                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="option in options"
                            :key="option.name"
                            :value="option"
                            as="template"
                        >
                            <li
                                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
                            >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ option.name }}</span
                >
                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                >
                 <Icon
                     name="mingcute:check-fill"
                     class="h-5 w-5 text-gray-400"
                     aria-hidden="true"
                 />
                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<style scoped>

</style>
