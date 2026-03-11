// composables/useViewport.ts
import { ref, onMounted, onUnmounted } from 'vue'

export const useWindowSize = () => {
  const width = useState('viewport-width', () => 0)
  const height = useState('viewport-height', () => 0)

  // 直接使用 computed 來計算斷點
  const isMobile = computed(() => width.value < 481)
  const isTablet = computed(() => width.value >= 768 && width.value < 1024)
  const isDesktop = computed(() => width.value >= 1024)



  // 只在客戶端執行
  if (process.client) {
    onMounted(() => {
      width.value = window.innerWidth
      height.value = window.innerHeight

      window.addEventListener('resize', () => {
        width.value = window.innerWidth
        height.value = window.innerHeight
      })
    })
  }

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  }
}