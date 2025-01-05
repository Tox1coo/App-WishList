import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref, computed} from "vue";

export const useStoreSwitcherData = defineStore("switcherDataStore", () => {
    const switcherData: Ref<boolean> = ref(false);

    const initializeFromLocalStorage = () => {
        if(localStorage.getItem("switcherData")) {
            switcherData.value = JSON.parse(localStorage.getItem("switcherData")) as boolean;
        }
    }

    const getSwitcherData = computed({
        get() {
            return switcherData.value;
        },
        set(data: boolean) {
            updateSwitcherData(data);
        }
    })

    const updateSwitcherData = (data: boolean) =>{
        localStorage.setItem("switcherData", JSON.stringify(data));
        switcherData.value = data;
    }

    return {initializeFromLocalStorage, getSwitcherData, updateSwitcherData}
})
