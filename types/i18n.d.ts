// types/i18n.d.ts
import { Composer } from 'vue-i18n'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: Composer['t']
        $i18n: Composer
    }
}

// 必須匯出一個空物件，TypeScript 才會將此檔案視為模組擴充
export { }