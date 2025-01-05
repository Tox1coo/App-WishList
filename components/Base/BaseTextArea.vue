<script setup lang="ts">
    const {
        modelValue,
        key,
        classesArea = "",
        classesLabel = "",
        classesText = "",
        text = "",
        label = ""
    } = defineProps<{
        modelValue: string;
        key: string;
        classesArea?: string;
        classesLabel?: string;
        classesText?: string;
        text?: string;
        label?: string;
    }>()
</script>

<template>
    <label v-if="label" :for="key" class="block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    <div class="mt-2">
        <textarea :name="key" :id="key" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6" />
    </div>
    <p v-if="text" class="mt-3 text-sm/6 text-gray-600">{{text}}</p>
</template>

<style scoped>

</style>
