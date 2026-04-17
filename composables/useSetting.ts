export const useSetting = () => {
    const setting = useState<any>('globalSetting', () => null)



    const fetchSetting = async () => {
        if (setting.value) return;
        try {
            const res = await CSRrequest.get('/setting/front')
            setting.value = res.data
        } catch (error) {
            console.error('Failed to fetch setting:', error)
        }
    }


    return { setting, fetchSetting }
}