import type {FilterTypes, EnumFilterTypes} from "~/types/enums";
import type {Tables} from "~/types/database.types";

declare global {
   interface FilesLoadInterface {
        selected: {id?: string; path: string | ArrayBuffer; name: string;}[];
        new: File[];
        deleted: {id?: string; path: string | ArrayBuffer; name: string;}[];
   }

   interface SelectedItem {
       id: string;
       name: string;
   }

   interface FilterItemBase {
       id: string;
       name: string;
       type: FilterTypes;
   }

   interface FilterItemDropdown extends FilterItemBase{
       type: EnumFilterTypes.DROPDOWN;
       value: SelectedItem;
       options: SelectedItem[]
   }

   interface FilterItemRange extends FilterItemBase{
       type: EnumFilterTypes.RANGE;
       min: number;
       max: number;
       step?: number;
       value: [number, number]
   }

    interface FilterItemCheckbox extends FilterItemBase {
        type: EnumFilterTypes.CHECKBOX;
        options: { value: string; label: string; checked: boolean }[];
    }

    interface ActiveFilterItem {
       id: string;
       value: number | string;
    }

   type FilterItem =  FilterItemDropdown | FilterItemRange | FilterItemCheckbox;

   type WishListItem = Tables<'wishList'> & {price_formatted: string; images: any}
}
export  default {};
