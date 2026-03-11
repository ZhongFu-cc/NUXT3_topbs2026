
export function useIsMobile() {
    const isMobile = useState('isMobile', () => false)

    if (process.server) {
        const event = useRequestEvent()
        // 在 SSR 階段設置 isMobile 狀態
        isMobile.value = event!.context.isMobile
    }

    // 在 CSR 階段根據視窗寬度設置 isMobile 狀態
    onMounted(() => {
        isMobile.value = window.innerWidth < 481
    })

    return isMobile
}