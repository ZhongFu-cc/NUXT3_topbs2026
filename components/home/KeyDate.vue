<template>
    <div class="key-date-section">
        <div class="title-box">
            <div class="title-text-box">
                <div class="title-image-box">
                    <img class="home-banner-bak" src="@/assets/img/CalendarHeatMap.svg">
                </div>
                <h1 class="title">{{ $t('keyDates') }}</h1>
            </div>
        </div>

        <ul class="key-date-item-box">
            <li class="key-date-item">
                <div class="key-date-info">
                    <p class="date-box"><span>17</span><span class="month">{{ $t('april') }}<span
                                class="year">2026</span></span>
                    </p>
                    <p class="info">Abstract Submission Opens</p>
                </div>
                <a class="key-date-link" href="https://evt.to/rr8dkv2td42c" target="_blank">
                    <img class="home-banner-bak" src="@/assets/img/save date-01.svg">
                </a>
            </li>

            <li class="key-date-item">
                <div class="key-date-info">
                    <p class="date-box"><span>21</span><span class="month">{{ $t('August') }}<span
                                class="year">2026</span></span></p>
                    <p class="info">Abstract Submission Deadline</p>
                </div>
                <a class="key-date-link" href="https://evt.to/yyhgk2t4qvtm" target="_blank">
                    <img class="home-banner-bak" src="@/assets/img/save date-01.svg">
                </a>
            </li>

            <!-- <li class="key-date-item">
                <div class="key-date-info">
                    <p class="date-box"><span>30</span><span class="month">Sep<span class="year">2025</span></span></p>
                    <p class="info">Early Bird Registration Deadline</p>
                </div>
                <a class="key-date-link" href="https://evt.to/eiiouhsaw" target="_blank">
                    <img class="home-banner-bak" src="../../assets/img/save date-01.svg">
                </a>
            </li> -->



            <li class="key-date-item">
                <div class="key-date-info">
                    <p class="date-box"><span>07</span><span class="month">{{ $t('september') }}<span
                                class="year">2026</span></span>
                    </p>
                    <p class="info">Notification of Acceptance</p>
                </div>
                <a class="key-date-link" href="https://evt.to/21c76xtmlswn" target="_blank">
                    <img class="home-banner-bak" src="../../assets/img/save date-01.svg">
                </a>
            </li>

            <!-- <li class="key-date-item">
                <div class="key-date-info">
                    <p class="date-box"><span>07</span><span class="month">Nov<span class="year">2025</span></span>
                    </p>
                    <p class="info">Online registration Deadline</p>
                </div>
                <a class="key-date-link" href="http://evt.to/eodeohauw" target="_blank">
                    <img class="home-banner-bak" src="../../assets/img/save date-01.svg">
                </a>
            </li> -->
            <li class="key-date-item">
                <div class="key-date-info">
                    <p class="date-box"><span>14~15</span><span class="month">{{ $t('november') }}<span
                                class="year">2026</span></span>
                    </p>
                    <p class="info">TOPBS 2026</p>
                </div>
                <a class="key-date-link" href="https://evt.to/z77j18jbb2pn" target="_blank">
                    <img class="home-banner-bak" src="@/assets/img/save date-01.svg">
                </a>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.key-date-section {
    .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        padding-bottom: 1rem;
        position: relative;

        &::after {
            position: absolute;
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #B62D66;
        }


        .title-text-box {
            display: flex;
            align-items: center;

            .title-image-box {
                justify-content: flex-start;
                align-items: center;
                text-align: center;

                img {
                    width: 2rem;
                }
            }

            .title {
                font-size: 2rem;
                font-weight: bold;
                color: #B62D66;
                text-align: start;
            }
        }

    }

    .key-date-item-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.5rem;
        padding: 0;

        .key-date-item {
            display: flex;
            gap: 0.5rem;
            width: 100%;

            .key-date-info {
                border-radius: 5px;
                background-color: #F5C0CB;
                padding: 0.3rem 1rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 0.3rem;
                flex: 2;
                width: 90%;
                // min-width: 90%;

                .date-box {
                    color: white;
                    display: flex;
                    flex-direction: column;
                    font-size: 1.3rem;
                    font-weight: bold;
                    position: relative;
                    padding: 0 0.3rem;

                    .month {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        flex-wrap: none;
                        width: 5rem;

                        .year {
                            font-size: 0.6rem;
                            font-weight: normal;
                        }
                    }

                    &::after {
                        position: absolute;
                        content: '';
                        display: block;
                        width: 1px;
                        height: 90%;
                        bottom: 0;
                        right: 0;
                        background-color: white;
                    }
                }

                .info {
                    color: #991D4F;
                    font-size: 1.3rem;
                    font-weight: bold;
                    min-width: 23rem;
                    padding: 0 1rem 0 0;
                    text-wrap: wrap;

                    @media screen and (max-width: 1024px) {
                        font-size: 1rem;
                        min-width: 13rem;

                    }

                    @media screen and (max-width: 768px) {
                        font-size: 1rem;
                        min-width: 80%;
                    }
                }
            }

            .key-date-link {
                background-color: #F5C0CB;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.3rem 0.1rem;
                border-radius: 5px;

                &:hover {
                    cursor: pointer;
                    scale: 1.05;
                    transition: all 0.3s ease-in-out;
                }

                img {
                    width: 2rem;
                }
            }
        }
    }
}
</style>