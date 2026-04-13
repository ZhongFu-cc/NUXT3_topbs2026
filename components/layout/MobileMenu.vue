<template>
    <div class="mobile-section">
        <div class="mobile-menu">
            <ol>
                <div v-for="item in menu">
                    <li v-if="!item.submenu" @click="handleClick(item.path)" :class="activeClass(item.path)">
                        {{ item.title }}
                    </li>
                    <li v-if="item.submenu" @click="setActiveItem(item)" :class="{ 'active': item.isActive }">
                        {{ item.title }}
                        <el-icon class="arrow" :class="{ 'is-active': item.isActive }">
                            <ElIconArrowDown />
                        </el-icon>
                        <ul v-if="item.isActive" class="submenu" :class="{ 'is-open': item.isActive }">
                            <li v-for="subItem in item.submenu" :key="subItem.path">
                                <nuxt-link class="sub-menu-item" :to="subItem.path" @click="handleClick(subItem.path)"
                                    :class="activeClass(subItem.path)">{{ subItem.title }}</nuxt-link>
                            </li>
                        </ul>
                    </li>
                </div>
                <div class="auth-box">
                    <nuxt-link v-if="!isLogin" class="menu-item" @click="mobileLogin()" :class="activeClass('login')">{{
                        $t('login') }}</nuxt-link>
                    <nuxt-link v-if="isLogin" class="menu-item" @click="mobileLogout()"
                        :class="activeClass('registrationFee')">{{ $t('logout') }}</nuxt-link>
                </div>
            </ol>
        </div>
        <div class="gray-section" @click="closeMenu"></div>

    </div>
</template>
<script lang="ts" setup>

const { isLogin, checkLoginState, logout } = useAuth();
const { t } = useI18n();

const emits = defineEmits(['closeMenu']);

const closeMenu = () => {
    emits('closeMenu');
}

const menu = reactive([
    { title: t('home'), path: '/', isActive: false },
    { title: t('aboutUs'), path: '/about-us', isActive: false },
    { title: t('conferenceInformation'), path: '/conference-information', isActive: false },
    { title: t('registration'), path: '/seminar-registration', isActive: false },
    {
        title: t('abstract'), path: '/', isActive: false, submenu: [
            { title: t('submissionGuidelines'), path: '/submission-guidelines' },
            { title: t('abstractSubmission'), path: '/abstract-submission' },
            { title: t('award'), path: '/award' },
            { title: t('presentationGuidelines'), path: '/presentation-guidelines' },
        ]
    },
    { title: t('transportation'), path: '/transportation', isActive: false },
    // { title: t('travel'), path: '/travel',isActive: false },
    { title: t('sponsorList'), path: '/sponsor-list', isActive: false },
    // { title: t('mascot'), path: '/mascot',isActive: false },
    {
        title: 'Gallery', path: '/gallery', isActive: false, submenu: [
            { title: '2023 Gallery', path: '/gallery/2023' },
            { title: '2024 Gallery', path: '/gallery/2024' },
            { title: '2025 Gallery', path: '/gallery/2025' },
        ]
    }
])


const activeItem = ref('')
const setActiveItem = (item: any) => {
    item.isActive = !item.isActive
    activeItem.value = item.title
    console.log('activeItem', activeItem.value);
}

const activeClass = (item: string) => {
    return router.currentRoute.value.path === item ? 'active' : ''
}

const router = useRouter()
console.log('router', router.currentRoute.value.path);

const handleClick = (path: string) => {
    router.push(path)
    closeMenu()
}

router.beforeEach(async (to, from, next) => {
    next();
});

const mobileLogin = () => {
    router.push('/login')
    closeMenu()
}

const mobileLogout = () => {
    logout();
    closeMenu();
}

onMounted(() => {
    checkLoginState();
})



</script>
<style lang="scss" scoped>
.mobile-menu {
    background-color: black;
    height: 100vh;
    width: 80%;
    position: fixed;
    top: 0rem;
    left: 0rem;
    z-index: 10;
    transition: 0.5s;


    ol {
        list-style: none;
        padding: 2rem 2rem;

        li {
            padding: 1rem;
            font-size: 1.3rem;
            font-weight: bold;
            color: white;

            img {
                width: 1.5rem;
                margin-right: 0.5rem;
                position: relative;
                top: 3px;
            }

            .arrow {
                width: 1rem;
                margin-left: 1rem;
                transform: rotateZ(-90deg);
                position: relative;
                top: 1px;
            }

            .is-active {
                transform: rotateZ(0deg);
            }

            &:hover {
                cursor: pointer;
            }

            &.active {
                color: $main-color;
                border-radius: 10px;
            }
        }

        .submenu {
            padding-left: 1rem;

            li {
                list-style: none;

                .sub-menu-item {
                    color: white;
                }
            }


        }
    }

    .auth-box {
        margin-top: 1rem;
    }

    .menu-item {
        color: white;
        font-size: 1.3rem;
        font-weight: bold;
        padding: 1rem;
        margin-top: 1rem;
    }
}

.gray-section {
    background-color: #F0F0F0;
    opacity: 0.5;
    height: 100vh;
    width: 20%;
    position: fixed;
    top: 0rem;
    right: 0rem;
    z-index: 10;
}
</style>