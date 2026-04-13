import type { Locale } from "../utils/lang"

export const useLang = () => {
    // 使用 Nuxt 內建的 useState 同步全域語系狀態
    const locale = useState<Locale>('current-lang', () => 'zh')

    // 獲取當前語系的內容
    const t = ref(label[locale.value])

    const setLocale = (newLocale: Locale) => {
        locale.value = newLocale
        t.value = label[newLocale]
        // console.log(`語系已切換到: ${newLocale}`)
    }

    return {
        locale,
        t,
        setLocale
    }
}