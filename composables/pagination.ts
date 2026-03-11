/**
 * 更新分頁參數到 URL
 */
export const useUpdatePaginationParams = () => {
  const router = useRouter()

  return (page: number, size: number) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        page: page.toString(),
        size: size.toString()
      }
    })
  }
}

/**
 * 從 URL 獲取分頁參數
 */
export const useGetPaginationParams = (defaultSize: number = 10) => {
  const route = useRoute()

  return {
    page: parseInt(route.query.page as string) || 1,
    size: defaultSize || parseInt(route.query.size as string) || 10
  }
}