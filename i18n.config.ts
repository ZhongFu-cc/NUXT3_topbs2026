// i18n.config.ts
export default defineI18nConfig(() => ({
    legacy: false, // 確保為 false，這樣才會使用 Composition API 的型別
    locale: 'en',
    // ...
}))