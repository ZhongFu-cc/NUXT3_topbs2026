<template>
    <div class="common-section">
        <Banner />
        <div class="main-section">
            <Breadcrumbs :first-route="$t('conferenceInformation')" secound-route=""></Breadcrumbs>
            <div class="meeting-info">
                <Title :title="$t('conferenceInformation')"></Title>
                <div class="meeting-info-box">
                    <div class="info-item">
                        <p class="info-title">{{ $t('conferenceDate') }}:
                        </p>
                        <p class="info-content">
                            <span>2026-11-14（{{ $t('saturday') }}），{{ $t('a.m') }}08:00 - {{ $t('p.m') }}17:50</span>
                            <br>
                            <span>2026-11-15（{{ $t('sunday') }}），{{ $t('a.m') }}08:00 - {{ $t('p.m') }}17:10</span>
                        </p>
                    </div>
                    <div class="info-item">
                        <p class="info-title">{{ $t('conferenceLocation') }}:</p>
                        <p class="info-content">{{ $t('ticc') }}</p>
                    </div>
                </div>
            </div>

            <div class="agenda-info">
                <!-- <h1 class="title">Agenda</h1> -->
                <div class="agenda-info-box">
                    <!-- <img src="../assets/img/2024-TICBCS-agenda.png" alt=""> -->
                    <!-- <div class="download"> -->
                    <!-- <a href="/files/TICBCS-Agenda.pdf" target="_blank" download class="agenda-download">
                        TICBCS 議程下載
                    </a>
                    <a href="https://lihi2.com/StUJt" target="_blank" download class="agenda-download">
                        TICBCS 手冊下載
                    </a> -->
                    <!-- </div> -->
                </div>
            </div>

            <!-- <el-divider /> -->
            <div class="location">
                <h1 class="title">{{ $t('conferenceLocation') }}: <span class="location-info">{{ $t('ticc') }}</span>
                </h1>
                <div class="location-info-box">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0165568738175!2d121.55831637537649!3d25.033512177816775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb61ab3d33f%3A0xab0d0f7ac395bff4!2z5Y-w5YyX5ZyL6Zqb5pyD6K2w5Lit5b-DKFRJQ0Mp!5e0!3m2!1szh-TW!2stw!4v1773211259473!5m2!1szh-TW!2stw"
                        width="600" height="450" style="border:0;" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
        <!-- <h1 class="temp">議程確認中</h1> -->

    </div>
</template>
<script setup lang="ts">
import Title from '@/components/layout/Title.vue';
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '~/components/layout/Breadcrumbs.vue';

useSeoMeta({
    title: 'Conference Information - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Explore the conference information for the TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society. This page is currently under construction, but stay tuned for updates on the event details, schedule, and more.',
    keywords: 'Conference Information,TOPBS,TOPBS 2026,2026 TOPBS'
})

</script>
<style lang="scss" scoped>
.common-section {
    // margin: $common-section-margin;
    // width: $common-section-width;
    font-family: $common-section-font-family;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    color: $main-color;

    .temp {
        font-size: 2.5rem;
    }

    .main-section {
        width: 60%;
        margin-inline: auto;

        @media screen and (max-width: 1024px) {
            width: 80%;
        }
    }

    .meeting-info {
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;
        width: 100%;
        margin: 0 auto;
        padding: 1.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .meeting-info-box {
            
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 1.5rem;
            line-height: 2rem;
            gap: 2rem;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }

            .info-item {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .info-title {
                font-weight: bold;
                font-size: 2rem;

                @media screen and (max-width: 768px) {
                    font-size: 1.2rem;
                }
            }

            .info-content {
                color: $main-text-color;
                font-weight: normal;
                font-size: 1.5rem;
                gap: 1rem;

                @media screen and (max-width: 768px) {
                    font-size: 1.2rem;
                }
            }
        }
    }

    .agenda-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 auto;


        img {
            width: 100%;
        }

        .agenda-download {
            background-color: #D27DA6;
            display: block;
            margin: 2rem auto 0 auto;
            padding: 0.5rem 0;
            color: white;
            border: 1px solid black;
            border-radius: 0.3rem;
            text-align: center;
            width: 70%;
            font-size: 1.5rem;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }

            &:hover {
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
            }
        }
    }

    .registration {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 2.5rem 0;
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;

        .download {
            width: 80%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .location {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 2.5rem 0;
        border-width: 0px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;
        width: 100%;
        margin: 0 auto;

        .title {
            font-weight: bold;
            font-size: 1.5rem;
            margin-right: 1rem;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;
            }
        }

        .location-info {
            font-size: 1.5rem;
            font-weight: normal;

            @media screen and (max-width: 768px) {
                font-size: 1.2rem;

            }

        }

        .location-info-box {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            iframe {
                width: 100%;
                height: 30rem;
                border-radius: 0.5rem;
            }
        }
    }

}
</style>