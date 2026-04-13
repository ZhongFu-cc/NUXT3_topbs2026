<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member'" :secound-route="$t('memberCenter')" />
        <div class="title-section">
            <h1 class="title">{{ $t('memberCenter') }}</h1>
        </div>

        <div class="select-section">
            <nuxt-link class="select-box" to="/abstract">
                <img src="@/assets/img/abstract-icon.png" alt="">
                <div class="label-box">
                    <span>{{ $t('abstract') }}</span>
                </div>
            </nuxt-link>
            <nuxt-link class="select-box" :to="'/payment'">
                <img src="@/assets/img/payment-icon.png" alt="">
                <div class="label-box">
                    <span>{{ $t('payment') }}</span>
                </div>
            </nuxt-link>
            <nuxt-link class="select-box" :to="'/accommodation'">
                <img src="@/assets/img/accommodation-icon.png" alt="">
                <div class="label-box">
                    <p>{{ $t('accommodation') }}</p>
                </div>
            </nuxt-link>
        </div>
    </main>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Accommodation from './accommodation.vue';

const router = useRouter();
const vueApp = useNuxtApp();

const memberInfo = reactive({});
const getMemberInfo = async () => {
    let res = await CSRrequest.get('/member/getMemberInfo')
    if (res.code !== 200) {
        router.push('/login');
        localStorage.removeItem('Authorization-member');
        return;
    }
    Object.assign(memberInfo, res.data);
}

onMounted(() => {
    getMemberInfo();
    if (vueApp.$root) { // vueApp.$root 只存在於客戶端。
        // const memberInfo = localStorage.getItem('Authorization-member');
        // if (!memberInfo) {
        //     router.push('/login');
        // }
    }
});


</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .title-section {
        margin-top: 1rem;
        text-align: center;
        position: relative;

        .title {
            font-size: 2.7rem;
            font-weight: 600;
        }

    }

    .select-section {
        background: url('assets/img/topbs_background-image.jpg') no-repeat center center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 6rem;
        gap: 5rem;

        @media screen and (max-width: 920px) {
            gap: 1rem;
            padding: 1rem;

        }

        .select-box {
            width: 20rem;
            aspect-ratio: 1/1;
            border: 2px solid #ccc;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            font-weight: 600;

            @media screen and (max-width: 920px) {
                font-size: 1rem;
            }

            &:hover {
                border: #D8A6AF 2px solid;
                transform: scale(1.05);
                transition: all 0.3s ease-in-out;
            }

            img {
                margin-bottom: 5%;
                width: 60%;
            }

            .label-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                // margin-bottom: 5%;

                p {
                    text-wrap: wrap;
                }
            }
        }
    }
}
</style>