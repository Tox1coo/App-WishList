<script setup lang="ts">
    const {
        modelValue,
        format,
        maxLoadFiles = 3
    } = defineProps<{
        format: "small" | "huge" | "medium",
        modelValue: FilesLoadInterface,
        maxLoadFiles?: number
    }>();

    const getSelectedImages = computed(() => {
        return modelValue.selected.map(image => ({...image, path: image.path }));
    });

    const deleteImage = (image, index) => {
        modelValue.deleted.push(image);
        modelValue.selected.splice(index, 1);
    };

    const uploadImageHandler = (event: Event) => {
        const imagesClone: FilesLoadInterface = JSON.parse(JSON.stringify(modelValue)) as FilesLoadInterface;
        const files = Array.from((event.target as HTMLInputElement).files);
        if (files.length > 0) {

            imagesClone.new = [...modelValue.new, ...(event.target as HTMLInputElement).files];

            files.forEach((file, i) => {
                if (file.type.includes("image")) {
                    if (i < maxLoadFiles) {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            const imgSrc = event.target.result;
                            imagesClone.selected.push({
                                path: imgSrc,
                                name: file.name,
                            });
                        };
                        reader.readAsDataURL(file);
                    }
                }
            });
            this.imagesClone.selected = this.imagesClone.selected.map((img, index) => {
                img.order = index + 1;
                return img;
            });
    }
</script>

<template>
    <div class="image-load">
        <div class="image-load__wrapper">
            <div :class="`image-load__list ${format}`">
    <div
        v-for="(image, index) in getSelectedImages"
        :key="image.id"
        class="image-load__block image-load__block--draggable"
    >
        <div class="image-load__block-preview">
            <img :src="image.path" alt="camera" />
        </div>
        <div class="delete">
            <div class="delete__wrapper" @click="deleteImage(image, index)">
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.91615 4.99996L9.80995 1.10605C10.0634 0.852768 10.0634 0.443245 9.80995 0.189962C9.55667 -0.0633207 9.14714 -0.0633207 8.89386 0.189962L4.99994 4.08387L1.10614 0.189962C0.85274 -0.0633207 0.443335 -0.0633207 0.190051 0.189962C-0.0633505 0.443245 -0.0633505 0.852768 0.190051 1.10605L4.08385 4.99996L0.190051 8.89388C-0.0633505 9.14716 -0.0633505 9.55668 0.190051 9.80997C0.316278 9.93631 0.482246 9.99978 0.648097 9.99978C0.813947 9.99978 0.979797 9.93631 1.10614 9.80997L4.99994 5.91605L8.89386 9.80997C9.0202 9.93631 9.18605 9.99978 9.3519 9.99978C9.51775 9.99978 9.6836 9.93631 9.80995 9.80997C10.0634 9.55668 10.0634 9.14716 9.80995 8.89388L5.91615 4.99996Z" />
                </svg>
            </div>
        </div>
        </div>

                <div
                    v-if="
                        modelValue.selected.length === 0
                    "
                    data-type="empty"
                    class="image-load__block image-load__block--placeholder">
                    <Icon name="material-symbols:camera-enhance-rounded" />
                    <input type="file" multiple @change="uploadImageHandler($event)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-load {
    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        &.small {
            gap: 7px;
            .image-load__draggable {
                gap: 7px;
            }
            .delete {
                top: -5px;
                right: -5px;
                &__wrapper {
                    width: 14px;
                    height: 14px;
                    svg {
                        height: 6px;
                        width: 6px;
                    }
                }
            }
            #cameraPlaceholder {
                width: 12px;
                height: 12px;
                object-fit: fill;
            }
            .image-load__block {
                width: 50px;
                height: 50px;
            }
        }
    }
    &__draggable {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    &__block {
        display: grid;
        place-items: center;
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        &-preview {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: inherit;
            &.more {
                position: relative;
                * {
                    cursor: pointer;
                }
                &:after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    display: block;
                    z-index: 2;
                    background-color: rgb(255 255 255 / 50%);
                }
                #moreCountImages {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #393939;
                    font-weight: 600;
                    font-size: 1rem;
                    z-index: 3;
                }
            }
            & > img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                // object-fit: cover;
            }
        }

        .delete {
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
            &__wrapper {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: grid;
                place-items: center;
                background-color: $c-text;
                svg {
                    height: 8px;
                    width: 8px;
                    fill: $white;
                }
            }
        }
        &--placeholder {
            background-color: $c-gray-1;
            input {
                opacity: 0;
                cursor: pointer;
                height: 100%;
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
            img#cameraPlaceholder {
                cursor: pointer;
                width: auto;
                height: auto;
                object-fit: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
}
</style>
