<template>
    <div>
        <main class="common-section">
            <Banner/>
            <Breadcrumbs :first-route="'Accommodation'" :secound-route="'Recommended Hotels'"/>
            <Title :title="'Recommended Hotels'"/>
            <!-- <div class="banner-box">
                <img src="../assets//img/banner.png" alt="">
            </div>
            <div class="title-section">
                <p class="title">
                    Accommodation
                </p>

                <p class="hint">
                    If you want to make a reservation for recommended hotels, please click on the hotel links below to
                    book your own room.
                </p>
            </div>

            <div class="recommended-section">
                <p class="title">
                    Recommended Hotels
                </p>
            </div>

            <div class="hotel-cards">
                <el-card class="hotel-card">
                    <img src="../assets//img/hotel-img/grand-hyatt-taipei.jpg"></img>
                    <div class="hotel-card-body">
                        <h3 class="title">Grand HYATT TAIPEI</h3>
                        <div class="star-section">
                            <img v-for="item in 5" class="star" src="../assets/img/Star12Filled.svg" alt="">

                        </div>
                        <div class="hotel-info">
                            <p><img src="../assets/img/walk.svg" alt="">5 min by walk (350M)</p>
                            <p><img src="../assets/img/money.svg" alt="">TWD $7500 up / Night</p>

                        </div>
                        <nuxt-link to="/hotel1" class="view-more-btn">View more</nuxt-link>

                    </div>
                </el-card>
                <el-card class="hotel-card">
                    <img src="../assets//img/hotel-img/pacific-business.jpg"></img>
                    <div class="hotel-card-body">
                        <h3 class="title">PACIFIC BUSSINESS HOTEL</h3>
                        <div class="star-section">
                            <img v-for="item in 4" class="star" src="../assets/img/Star12Filled.svg" alt="">

                        </div>
                        <div class="hotel-info">
                            <p><img src="../assets/img/walk.svg" alt="">5 min by walk (350M)</p>
                            <p><img src="../assets/img/money.svg" alt="">TWD $3800 up / Night</p>
                        </div>
                        <nuxt-link to="/hotel2" class="view-more-btn">View more</nuxt-link>
                    </div>
                </el-card>
                <el-card class="hotel-card">
                    <img src="../assets//img/hotel-img/check-inn.jpg"></img>
                    <div class="hotel-card-body">
                        <h3 class="title">CHECK INN</h3>
                        <div class="star-section">
                            <img v-for="item in 3" class="star" src="../assets/img/Star12Filled.svg" alt="">

                        </div>
                        <div class="hotel-info">
                            <p><img src="../assets/img/walk.svg" alt="">3 min by walk (160M)</p>
                            <p><img src="../assets/img/money.svg" alt="">TWD $2500 up / Night</p>

                        </div>
                        <nuxt-link to="/hotel3" class="view-more-btn">View more</nuxt-link>

                    </div>
                </el-card>
            </div> -->

        </main>

    </div>
</template>
<script setup lang="ts">
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
</script>
<style lang="scss" scoped>
.common-section {
    // width: $common-section-width;
    // margin: $common-section-margin;
    font-family: $common-section-font-family;

    .banner-box {
        margin-top: 1rem;
        
        img {
            width: 100%;
            box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.5);
        }
    }

    .title-section {
        margin-top: 1rem;
        text-align: center;


        .title {
            font-size: 2.7rem;
            font-weight: 600;
        }

        .hint {
            font-size: 1.3rem;
            margin-top: 1rem;
            word-spacing: 0.3rem;
        }
    }

    .recommended-section {
        margin: 3rem auto;
        padding: 0.5rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        // background-color: #DD6777;
        border-radius: 20px 20px 0 0;
        // width: 35%;
        height: 4rem;
        text-wrap: nowrap;

        

        .title {
            color: white;
            background-color: #DD6777;
            padding: 0.5rem;
            display: flex;
            position: relative;
            border-radius: 20px 20px 0 0;
            font-size: 2.2rem;
            letter-spacing: 0.1rem;
            align-items: center;
            justify-content: center;

            &::after {
            content: '';
            position: absolute;
            width: 63vw;
            height: 2px;
            background-color: #DD6777;
            right: 0;
            bottom: 0;
        }

        &::before {
            content: '';
            position: absolute;
            width: 63vw;
            height: 2px;
            background-color: #DD6777;
            left: 0;
            bottom: 0;
        }
            
        }
    }

    .content {
        margin: 1rem auto;
        text-align: center;

        h1 {
            font-size: 2rem;
        }
    }

    .hotel-cards {
        display: flex;
        justify-content: space-between;
        width: 90%;

        margin: 2% auto;

        .hotel-card {
            width: 32%;
            border-radius: 1.5rem;
            border-color: #DD6777;
            border-width: 0 1px 1px 1px;
            box-shadow: 8px 8px 4px 0px rgba(0, 0, 0, 0.5);

            img {
                width: 100%;
            }

            .hotel-card-body {
                display: flex;
                flex-direction: column;
                .title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1rem;
                    text-align: center;
                    text-wrap: nowrap;
                    color: #DD6777;
                }

                .star-section {
                    display: flex;
                    justify-content: center;
                    margin: 1rem auto;
                    width: 50%;
                    gap: 1rem;

                    .star {
                        width: 1.8rem;

                    }
                }

                .hotel-info {
                    p {
                        font-size: 1.3rem;
                        margin-top: 1rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 0.5rem;
                    }

                    img {
                        width: 3rem;
                    }
                }

                .view-more-btn {
                    width: 45%;
                    height: 3rem;
                    margin: 2.5rem auto;
                    background-color: #DD6777;
                    color: white;
                    border-radius: 25px;
                    font-size: 1.5rem;
                    text-align: center;
                    line-height: 3rem;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }


        }
    }

    :deep(.el-card__body) {
        padding: 0;
    }

}
</style>