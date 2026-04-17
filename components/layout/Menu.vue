<template>
    <section class="top-section">
        <div class="menu-container" :class="[{ 'menu-section-scroll': isScroll }, { 'is-active': isActive }]">
            <div class="mobile-menu">
                <div class="hamburger-icon">
                    <div class="container">
                        <div class="hamburger" :class="{ 'is-active': isActive }" id="hamburger-1" @click="openMenu">
                            <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                            <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                            <span class="line" :class="{ 'is-scroll': isScroll }"></span>
                        </div>
                    </div>
                </div>

                <div class="mobile-member-center">
                    <nuxt-link v-if="!isLogin" class="menu-item" to="/login" :class="activeClass('login')">
                        <img src="/img/user.svg" alt="">
                    </nuxt-link>
                    <nuxt-link v-if="isLogin" class="menu-item" to="/member-center"
                        :class="activeClass('registrationFee')">
                        <img src="/img/user.svg" alt="">
                    </nuxt-link>
                </div>
            </div>


            <div class="logo-container" v-if="!isActive">
                <nuxt-link class="logo-link" to="/" @click="setActiveItem('')">
                    <div class="logo-image-box">
                        <img class="logo" src="/img/logo.png" alt="TOPBS Logo" />
                    </div>
                </nuxt-link>
            </div>

            <div class="menu-box">
                <nuxt-link class="menu-item" to="/about-us" @click="setActiveItem('aboutUs')"
                    :class="activeClass('aboutUs')">{{ $t('aboutUs') }}</nuxt-link>

                <nuxt-link class="menu-item" to="/conference-information"
                    @click="setActiveItem('conferenceInformation')" :class="activeClass('conferenceInformation')">{{
                        $t('conferenceInformation') }}</nuxt-link>

                <!-- <nuxt-link class="menu-item" to="/" @click="setActiveItem('invitedSpeaker')"
                    :class="activeClass('invitedSpeaker')">受邀講者</nuxt-link> -->



                <div class="submenu-box menu-item" @click="openSubMenuFunc('registration')">
                    {{ $t('registration') }}
                    <el-icon>
                        <ElIconArrowDown />
                    </el-icon>
                    <div class="gallery-sub-menu" :class="openedSubMenu == 'registration' ? 'is-open' : ''"
                        v-if="openedSubMenu == 'registration'">
                        <nuxt-link class="sub-menu-item" to="/registration-fee"
                            @click="setActiveItem('registrationFee')" :class="activeClass('registrationFee')">{{
                                $t('registrationFee') }}</nuxt-link>
                        <nuxt-link class="sub-menu-item" to="/seminar-registration"
                            @click="setActiveItem('seminarRegistration')" :class="activeClass('seminarRegistration')">{{
                                $t('onlineRegistration') }}</nuxt-link>
                    </div>
                </div>

                <div class="submenu-box menu-item" @click="openSubMenuFunc('abstract')">
                    {{ $t('abstract') }}
                    <el-icon>
                        <ElIconArrowDown />
                    </el-icon>
                    <div class="gallery-sub-menu" :class="openedSubMenu == 'abstract' ? 'is-open' : ''"
                        v-if="openedSubMenu == 'abstract'">
                        <nuxt-link class="sub-menu-item" to="/submission-guidelines"
                            @click="setActiveItem('abstractGuideline')" :class="activeClass('abstractGuideline')">{{
                                $t('submissionGuidelines') }}</nuxt-link>
                        <nuxt-link class="sub-menu-item" to="/abstract-submission"
                            @click="setActiveItem('abstractSubmission')" :class="activeClass('abstractSubmission')">{{
                                $t('abstractSubmission') }}</nuxt-link>
                        <nuxt-link class="sub-menu-item" to="/award" @click="setActiveItem('abstractAwards')"
                            :class="activeClass('abstractAwards')">{{ $t('award') }}</nuxt-link>
                        <nuxt-link class="sub-menu-item" to="/presentation-guidelines"
                            @click="setActiveItem('abstractPresentation')"
                            :class="activeClass('abstractPresentation')">{{ $t('presentationGuidelines') }}</nuxt-link>
                    </div>
                </div>




                <div class="item-box">
                    <nuxt-link class="menu-item" to="/transportation" @click="setActiveItem('transportation')"
                        :class="activeClass('transportation')">{{ $t('transportation') }}</nuxt-link>
                    <nuxt-link class="menu-item" to="/sponsor-list" @click="setActiveItem('sponsorList')"
                        :class="activeClass('sponsorList')">{{ $t('sponsorList') }}</nuxt-link>
                    <div class="gallery-box menu-item" @click="openSubMenuFunc('gallery')">
                        Gallery
                        <el-icon>
                            <ElIconArrowDown />
                        </el-icon>
                        <div class="gallery-sub-menu" v-if="openedSubMenu == 'gallery'">
                            <nuxt-link class="sub-menu-item" to="/gallery/2023" @click="setActiveItem('gallery')"
                                :class="activeClass('gallery')">Gallery 2023</nuxt-link>
                            <nuxt-link class="sub-menu-item" to="/gallery/2024" @click="setActiveItem('gallery2024')"
                                :class="activeClass('gallery2024')">Gallery 2024</nuxt-link>
                            <nuxt-link class="sub-menu-item" to="/gallery/2025" @click="setActiveItem('gallery2025')"
                                :class="activeClass('gallery2025')">Gallery 2025</nuxt-link>
                        </div>
                    </div>

                </div>

                <div class="sub-menu-box">
                    <div class="sub-menu-title" @click="toggleMenu">{{ $t('seeMore') }}<el-icon>
                            <ElIconArrowDown />
                        </el-icon></div>
                    <div class="sub-menu-item-box" v-if="isOpen">
                        <nuxt-link class="sub-menu-item" to="/transportation" @click="setActiveItem('transportation')"
                            :class="activeClass('transportation')">{{ $t('transportation') }}</nuxt-link>
                        <nuxt-link class="sub-menu-item" to="/sponsor-list" @click="setActiveItem('sponsorList')"
                            :class="activeClass('sponsorList')">{{ $t('sponsorList') }}</nuxt-link>
                        <div class="gallery-box sub-menu-item" @click="openSubMenuFunc('gallery')"
                            :class="activeClass('gallery')">
                            Gallery
                            <el-icon>
                                <ElIconArrowDown />
                            </el-icon>
                            <div class="gallery-sub-menu" v-if="openedSubMenu == 'gallery'">
                                <nuxt-link class="sub-menu-item" to="/gallery/2023" @click="setActiveItem('gallery')"
                                    :class="activeClass('gallery')">Gallery 2023</nuxt-link>
                                <nuxt-link class="sub-menu-item" to="/gallery/2024"
                                    @click="setActiveItem('gallery2024')" :class="activeClass('gallery2024')">Gallery
                                    2024</nuxt-link>
                                <nuxt-link class="sub-menu-item" to="/gallery/2025"
                                    @click="setActiveItem('gallery2025')" :class="activeClass('gallery2025')">Gallery
                                    2025</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="submenu-box menu-item" v-if="isLogin" @click="openSubMenuFunc('member')">
                    {{ $t('member') }}
                    <el-icon>
                        <ElIconArrowDown />
                    </el-icon>
                    <div class="gallery-sub-menu" :class="openedSubMenu == 'member' ? 'is-open' : ''"
                        v-if="openedSubMenu == 'member'">
                        <nuxt-link class="sub-menu-item" to="/member-center" @click="setActiveItem('memberCenter')">{{
                            $t('memberCenter') }}</nuxt-link>
                        <nuxt-link class="sub-menu-item" @click="logout">{{ $t('logout') }}</nuxt-link>

                    </div>
                </div>
                <nuxt-link v-if="!isLogin" class="menu-item" to="/login" :class="activeClass('login')">{{ $t('login')
                }}</nuxt-link>

            </div>


        </div>
    </section>
</template>

<script lang="ts" setup>

import { useI18n } from 'vue-i18n'



// 偵測滾輪位置，更換 menu 背景色
const isScroll = ref(false)
const { locale, setLocale } = useI18n()

function handleScroll() {
    let scrollPositionY = window.scrollY
    if (scrollPositionY > 0) {
        isScroll.value = true
    } else {
        isScroll.value = false
    }
}


const isOpen = ref(false)
const toggleMenu = () => {
    isOpen.value = !isOpen.value
    openedSubMenu.value = ""
}

const openedSubMenu = ref("")
const openSubMenuFunc = (subMenuItem: string) => {
    openedSubMenu.value = subMenuItem === openedSubMenu.value ? "" : subMenuItem;
    if (openedSubMenu.value !== 'gallery') {
        isOpen.value = false
    }
    // gallerySubMenuIsOpen.value = !gallerySubMenuIsOpen.value
}

const activeItem = ref('')
const setActiveItem = (item: string) => {
    activeItem.value = item
    isOpen.value = false
    console.log('activeItem', activeItem.value)
}

const activeClass = (item: string) => {

    return activeItem.value === item ? 'active' : ''
}

/**================================================================ */

const isActive = ref(false);
const props = defineProps<{
    isActive: boolean;
}>();

watch(() => props.isActive, (value) => {
    isActive.value = value;
});


const openMenu = () => {
    isActive.value = !isActive.value;
    emits('openMenu', isActive.value);
}

const closeMenu = () => {
    isActive.value = false;
    emits('openMenu', isActive.value);
}

const emits = defineEmits(['openMenu']);

/**================================================================ */
const { isLogin, checkLoginState, logout } = useAuth();

onMounted(() => {
    handleScroll() // 初始化時檢查滾輪位置
    window.addEventListener('scroll', handleScroll)
    checkLoginState();
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>
<style lang="scss" scoped>
.top-section {

    .menu-container {
        display: flex;
        position: fixed;
        text-align: center;
        align-items: center;
        justify-content: space-around;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 6.5rem;
        padding: 0.5rem 0;
        // FIXME
        border-bottom: 8px solid #e8d0dd;


        @media screen and (max-width: 1920px) {
            height: 4.5rem;
        }

        @media screen and (max-width: 1536px) {
            gap: 2rem;
            // justify-content: center;
        }

        @media screen and (max-width: 469px) {
            padding-left: 2rem;
            justify-content: flex-start;
        }

        // Logo區域
        .logo-container {
            width: 10%;
            height: 100%;

            .logo-link {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;

                .logo-image-box {
                    width: 40%;
                    height: 100%;

                    .logo {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        object-position: center center;
                    }

                    @media screen and (max-width: 1536px) {
                        width: 80%;
                    }

                    @media screen and (max-width: 1024px) {
                        width: 70%;
                    }

                    @media screen and (max-width: 768px) {
                        display: none;
                    }
                }


                .logo-title {
                    font-size: 1.5rem;
                    color: #59413C;
                }
            }
        }

        // Right nav bar
        .menu-box {
            display: flex;
            font-size: 1.2rem;
            gap: 1.5rem;

            @media screen and (max-width: 1024px) {
                gap: 0.5rem;
            }

            @media screen and (max-width: 768px) {
                display: none;
            }

            // when viewport is scrolled down
            .active {
                color: black;
            }

            .item-box {
                display: flex;
                gap: 1.5rem;

                @media screen and (max-width: 1024px) {
                    gap: 0.5rem;
                }

                @media screen and (max-width: 800px) {
                    display: none;
                }

            }

            .menu-item {
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: #59413C;
                height: 4.5rem;
                padding: 1rem;

                @media screen and (max-width: 1920px) {
                    height: 2.5rem;
                    padding: 0.1rem;
                }

                @media screen and (max-width: 1560px) {
                    font-size: 1rem;
                }

                @media screen and (max-width: 1024px) {
                    // justify-items: flex-end;
                    padding: 0;
                    gap: 0.2rem;
                }

                @media screen and (max-width: 870px) {
                    font-size: 0.9rem;
                }

                &:hover {
                    cursor: pointer;
                    color: white;
                    background-color: $main-color;
                }
            }

            .sub-menu-box {
                display: none;
                color: #59413C;
                text-decoration: none;
                position: relative;

                @media screen and (max-width: 800px) {
                    display: flex;
                }

                .sub-menu-title {
                    display: flex;
                    align-items: center;
                    gap: 0.1rem;

                    @media screen and (max-width: 1024px) {
                        font-size: 1rem;
                    }
                }

                .sub-menu-item-box {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    gap: 1rem;
                    top: 3rem;
                    right: -0.5rem;
                    background-color: black;
                    width: 10rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 1000;

                    .active {
                        color: $main-color;
                    }

                    .sub-menu-item {
                        color: white;

                        &:active {
                            color: $main-color;
                        }
                    }
                }
            }

            .submenu-box {
                color: #59413C;
                text-decoration: none;
                position: relative;

                .gallery-sub-menu {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    gap: 1rem;
                    top: 3rem;
                    right: -0.5rem;
                    background-color: black;
                    width: 10rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 1000;

                    @media screen and (max-width: 800px) {
                        width: 8rem;


                        &:hover {
                            cursor: pointer;
                            color: white;
                            background-color: black !important;
                        }

                    }


                    .active {
                        color: $main-color;
                    }

                    .sub-menu-item {
                        color: white;

                        &:active {
                            color: $main-color;
                        }

                        &:hover {
                            color: $main-color;
                        }
                    }
                }
            }

            .gallery-box {
                color: #59413C;
                text-decoration: none;
                position: relative;

                @media screen and (max-width: 800px) {
                    color: white;
                    display: flex;
                    font-size: 1.2rem;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                }


                .gallery-sub-menu {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    gap: 1rem;
                    top: 3rem;
                    right: -0.5rem;
                    background-color: black;
                    width: 10rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 1000;

                    @media screen and (max-width: 800px) {
                        width: 8rem;
                        left: -12rem;
                        top: 0;


                        &:hover {
                            cursor: pointer;
                            color: white;
                            background-color: black !important;
                        }

                    }


                    .active {
                        color: $main-color;
                    }

                    .sub-menu-item {
                        color: white;

                        &:active {
                            color: $main-color;
                        }

                        &:hover {
                            color: $main-color;
                        }
                    }
                }
            }
        }
    }

    .menu-section-scroll {
        background-color: black;
        transition: background-color 0.3s ease-in-out;


        .logo-container {

            .logo-link {

                .logo-title {
                    color: white;
                }
            }
        }

        .menu-box {
            .menu-item {
                color: white;

                &:hover {
                    cursor: pointer;
                    color: $main-color;
                    background-color: black
                }
            }

            .active {
                color: $main-color;
            }

            .sub-menu-box {
                font-size: 1rem;
                color: white;
                text-decoration: none;

                .sub-menu-item-box {
                    .active {
                        color: $main-color !important;
                    }
                }

            }
        }
    }


    // 測試
    .hamburger-icon {
        display: none;

        .hamburger .line {
            width: 1.5rem;
            height: 3px;
            background-color: #000;
            margin-top: 5px;
            display: block;
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;



            &:hover {
                cursor: pointer;
            }

            &.is-scroll {
                background-color: white !important;
            }
        }

        #hamburger-1.is-active .line:nth-child(2) {
            background-color: white;
            opacity: 0;
        }

        #hamburger-1.is-active .line:nth-child(1) {
            background-color: white;
            transform: 0.5s;

            rotate: 360deg;
            -webkit-transform: translateY(7.9px) rotate(47deg);
            -ms-transform: translateY(7.9px) rotate(47deg);
            -o-transform: translateY(7.9px) rotate(47deg);
            transform: translateY(7.9px) rotate(47deg);
            border-radius: 3px;
        }

        #hamburger-1.is-active .line:nth-child(3) {
            background-color: white;
            transform: 0.5s;
            rotate: 360deg;


            -webkit-transform: translateY(-8.4px) rotate(-47deg);
            -ms-transform: translateY(-8.4px) rotate(-47deg);
            -o-transform: translateY(-8.4px) rotate(-47deg);
            transform: translateY(-8.4px) rotate(-47deg);
            border-radius: 3px;
        }

        @media screen and (max-width: 768px) {
            display: block;
        }

    }
}

.mobile-menu {

    width: 100%;
    display: none;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    @media screen and (max-width: 768px) {
        display: flex;
        gap: 1rem;
        // margin-left: auto;
    }
}

.mobile-member-center {
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        gap: 1rem;
        // margin-left: auto;
    }

    .menu-item {
        color: white;
        margin-top: 5px;

        img {
            width: 1.5rem;
        }

        &:hover {
            color: $main-color;
        }
    }
}
</style>