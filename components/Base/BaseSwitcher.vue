<script setup lang="ts">
    const {
        modelValue,
        keyField,
        text = "",
        classesLabel = "",
        classesInput = "",
        label = ""
    } = defineProps<{
        modelValue: boolean,
        keyField: string,
        text?: string,
        classesLabel?: string,
        classesInput?: string,
        label?: string
    }>();

    const emit = defineEmits(["update:modelValue"])

    const updateValue = () => {
        emit("update:modelValue",!modelValue);
    }
</script>

<template>
    <span v-if="label" class="block text-sm/6 font-medium text-gray-500">{{ label }}</span>
    <input type="checkbox" :checked="modelValue" class="peer sr-only opacity-0" :id="keyField" :name="keyField" />
    <label @click="updateValue" :for="keyField" class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500" >
        <span class="sr-only">Enabled</span>
    </label>
</template>

<style scoped>

</style>
