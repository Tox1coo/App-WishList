
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
}
export  default {};
