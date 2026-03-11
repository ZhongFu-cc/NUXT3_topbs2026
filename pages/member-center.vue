<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member'" :secound-route="'Member Center'" />
        <div class="title-section">
            <h1 class="title">Member Center</h1>
        </div>

        <div class="select-section">
            <div class="select-box">
                <!-- <img src="../assets/img/abstract-icon.png" alt=""> -->
                <div class="label-box">
                    <span>Abstract</span>
                </div>
            </div>
            <nuxt-link class="select-box" :to="'/payment'">
                <!-- <img src="../assets/img/payment-icon.png" alt=""> -->
                <div class="label-box">
                    <span>Payment</span>
                </div>
            </nuxt-link>
            <div class="select-box">
                <!-- <img src="../assets/img/accommodation-icon.png" alt=""> -->
                <div class="label-box">
                    <p>Accommodation </p>
                    <p>Offers</p>
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
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
        // background: url('assets/img/topbs_background-image.jpg') no-repeat center center;
        // width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding: 1.5rem;

        .select-box {
            min-width: 18vw;
            min-height: 18vw;
            max-width: 18vw;
            max-height: 18vw;
            border: 2px solid #ccc;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 15px;
            margin: 1rem;
            padding: 1.5rem;
            font-weight: 600;
            font-size: 1.3rem;
            text-align: center;

            @media screen and (max-width: 920px) {
                font-size: 1rem;
            }

            &:hover {
                border: #D8A6AF 2px solid;
            }

            img {
                margin-top: 1rem;
                margin-bottom: 5%;
                width: 60%;
            }

            .label-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-direction: column;
                margin-bottom: 5%;

                p {
                    text-wrap: wrap;
                }
            }
        }
    }
}
</style>