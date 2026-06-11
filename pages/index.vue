<template>
    <main class="common-section">
        <Banner></Banner>

        <div class="main-section">
            <div class="content">
                <CountdownTimer :target-date="eventDate"></CountdownTimer>

                <div class="info-section">
                    <div class="link-section">
                        <QuickLinks></QuickLinks>
                    </div>
                    <div class="news-section">
                        <News></News>
                    </div>
                    <div class="date-section">
                        <KeyDate></KeyDate>
                    </div>
                </div>
            </div>
        </div>

        <div class="video-box">
            <iframe v-for="video in videos" :src="envMinio + video.path" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
        </div>
    </main>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';
import News from '@/components/home/News.vue';
import QuickLinks from '@/components/home/QuickLinks.vue';
import KeyDate from '@/components/home/KeyDate.vue';
import { useI18n } from 'vue-i18n';

useSeoMeta({
    title: 'TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Welcome to the TOPBS 2026 (Taiwan Oncoplastic Breast Surgery Society) Conference 2026, held in Taipei from November 14-15, 2026. Explore the latest advancements in sustainable perfect form and safety, bringing together global experts for exchange and collaboration.',
    keywords: 'Home,TOPBS,TOPBS 2026,2026 TOPBS'
})

const { locale, setLocale, t } = useI18n();

const eventDate = new Date('2026-11-14T00:00:00');

const carousel = ref();

const prev = () => {
    carousel.value.prev();
};
const next = () => {
    carousel.value.next();
};

const envMinio = useRuntimeConfig().public.minio


const videos = ref<any[]>([])
const fetchVideos = async () => {
    try {
        const res: any = await CSRrequest.get(`/publish-file/video`)
        console.log('Fetched videos:', res.data);
        videos.value = res.data
    } catch (error) {
        console.error('Error fetching videos file:', error);
    }
}

onMounted(() => {
    fetchVideos()
})




</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;
    min-height: 60vw;

    .main-section {
        width: 100%;
        margin-inline: auto;

        @media screen and (max-width: 1024px) {
            // width: 80%;
        }
    }

    .content {

        display: flex;
        flex-direction: column;

        @media screen and (max-width: 1024px) {
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

    .video-box {
        width: 80%;
        margin: 5rem auto;

        iframe {
            width: 100%;
            aspect-ratio: 16 / 9; // margin: 5rem auto;
        }

        @media screen and (max-width: 1024px) {
            width: 100%;
        }
    }

    // .news-section {
    //     min-height: 15rem;
    //     background-color: #D9D5E4;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     font-size: 2.5rem;
    //     color: #B62D66;
    // }

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

    .info-section {
        display: flex;
        width: 75%;
        gap: 3rem;
        margin: 2rem auto;

        .link-section {
            width: 25%;
        }

        .news-section {
            width: 35%;
        }

        .date-section {
            width: 40%;
        }

        @media screen and (max-width: 1024px) {
            flex-direction: column;
            align-items: center;
            width: 100%;

            .link-section {
                width: 80%;
            }

            .news-section {
                width: 80%;
            }

            .date-section {
                width: 80%;
            }


        }


    }
}
</style>