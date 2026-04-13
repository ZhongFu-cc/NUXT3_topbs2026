export const useAuth = () => {
    const isLogin = useState('isLogin', () => false)
    const memberInfo = useState('memberInfo', () => null) as Ref<any>

    const checkLoginState = async () => {
        const token = localStorage.getItem('Authorization-member')

        if (token) {
            const res = await CSRrequest.get('/member/getMemberInfo')

            if (res.code === 200) {
                isLogin.value = true
                memberInfo.value = res.data
            } else {
                localStorage.removeItem('Authorization-member')
                isLogin.value = false
                memberInfo.value = null
                useRouter().push('/login')
            }
        } else {
            isLogin.value = false
        }

    }

    const logout = () => {
        localStorage.removeItem('Authorization-member')
        isLogin.value = false
        useRouter().push('/')
    }

    return { isLogin, checkLoginState, logout, memberInfo }
}