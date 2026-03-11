<template>
    <main class="common-section">
        <Banner></Banner>

        <div class="main-section">
            <div class="content">

            </div>
        </div>

    </main>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Title from '~/components/layout/Title.vue';

const carousel = ref();

const prev = () => {
    carousel.value.prev();
};
const next = () => {
    carousel.value.next();
};




onMounted(() => {
    console.log(carousel.value);
});

</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;
    min-height: 60vw;

    .main-section {
        width: 60%;
        margin-inline: auto;

        @media screen and (max-width: 1024px) {
            width: 80%;
        }
    }

    .content {

        display: flex;

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }

        .content-image-box {
            flex: 1;

            img {
                width: 80%;

                @media screen and (max-width: 1024px) {
                    width: 100%;
                }
            }
        }

        .content-message-box {
            flex: 1;
            font-size: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 3rem;
            color: $main-color;

            // @media screen and (max-width: 1920px) {
            //     font-size: 1.2rem;
            //     gap: 3rem;

            // }

            @media screen and (max-width: 1920px) {
                font-size: 1.5rem;
            }

            @media screen and (max-width: 1440px) {
                font-size: 1rem;
                gap: 2rem;
            }


            @media screen and (max-width: 768px) {
                font-size: 1.5rem;
                gap: 1rem;

            }
        }

    }

    .news-section {
        min-height: 15rem;
        background-color: #D9D5E4;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        color: #424384;
    }

    .carousel-section {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 5rem;


        .left-btn {
            position: absolute;
            top: 45%;
            left: 10%;
        }

        .right-btn {
            position: absolute;
            top: 45%;
            right: 10%;
        }

        .el-button {
            // border: #424384 1px solid;
            box-shadow: none;
            border: none;
            font-size: 1.5rem;
            color: #D27DA6;

            &:hover {
                transform: scale(1.2);
                transition: all 0.3s ease-in-out;
            }

            @media screen and (max-width: 768px) {
                display: none;
            }
        }
    }

    .carousel-box {
        width: 100%;
        // height: 20rem;
        margin-inline: auto;

        @media screen and (max-width: 768px) {
            width: 100%;

        }



        img {
            width: 100%;
            height: 100%;
            object-fit: cover;

            @media screen and (max-width: 768px) {
                width: 100%;
                height: 13rem;

            }
        }

    }
}
</style>