<script setup lang="ts">
    import type {Tables} from "~/types/database.types";
    import type {WishListItem} from "~/types";

    const {
        wishItem
    } = defineProps<
        {
            wishItem: WishListItem
        }
    >()

    const isPriority = computed(() => {
        return !!wishItem.is_priority
    })

    const getTitle = computed(() => {
      return wishItem.name;
    });


    // Default image for when no images are provided
    const defaultImage = 'https://via.placeholder.com/300x300?text=No+Image';

    // Reactive state for the current image index
    const currentImageIndex = ref(0);

    // Computed property to get the current image
    const currentImage = computed(() => {
        return wishItem.images.length > 0 ? wishItem.images[currentImageIndex.value] : defaultImage;
    });

    // Handlers for navigating the slider
    const nextImage = () => {
        if (wishItem.images.length > 0) {
            currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
        }
    };

    const prevImage = () => {
        if (wishItem.images.length > 0) {
            currentImageIndex.value =
                (currentImageIndex.value - 1 + wishItem.images.length) % wishItem.images.length;
        }
    };

    const getPrice = computed(() => {
        return wishItem.price?.toFixed(2);
    })
</script>

<template>
    <div class="p-4 bg-white shadow-lg rounded-lg max-w-sm w-full md:w-96 flex flex-col">
        <!-- Priority Star -->
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-800 truncate">{{ getTitle }}</h3>
            <div v-if="isPriority" class="text-yellow-500 text-xl" title="Priority">
                ★
            </div>
        </div>

        <!-- Image Slider -->
        <div class="relative mt-4 w-full h-56 overflow-hidden rounded-lg">
            <img
                :src="currentImage"
                alt="Image preview"
                class="w-full h-full object-cover"
            />
            <!-- Slider controls -->
            <button
                @click="prevImage"
                class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
            >
                &lt;
            </button>
            <button
                @click="nextImage"
                class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
            >
                &gt;
            </button>
        </div>

        <!-- Price -->
        <div class="mt-4 text-lg font-bold text-gray-900">{{ getPrice }}</div>
    </div>
</template>

<style scoped>

</style>
