<template>
    <div>
        <main class="common-section">
            <Banner></Banner>
            <div class="title-section">
                <nuxt-link class="back-btn" @click="router.go(-1)"><el-icon>
                        <ElIconArrowLeft />
                    </el-icon>Back</nuxt-link>
                <p class="title">
                    Accommodation
                </p>
            </div>

            <div class="main-section">
                <div class="img-box">
                    <div v-if="currentIndex" class="image-item" border>
                        <img v-if="currentIndex === 1" src="@/assets/img/hotel-img/pacific-business.jpg" alt="">
                        <img v-if="currentIndex === 2" src="@/assets/img/hotel-img/pacific-business2.jpg" alt="">
                        <img v-if="currentIndex === 3" src="@/assets/img/hotel-img/pacific-business3.jpg" alt="">
                        <div class="carousel-indicator">
                            <div v-for="(index, item) in 3" class="indicator"
                                :class="{ 'active': currentIndex === index }" :key="index" @click="toggleImage(index)"
                                @mouseover="setHoveredIndex(index)"></div>
                        </div>
                    </div>
                </div>
                <div class="info-box">
                    <p class="title"> PACIFIC BUSINESS HOTEL</p>
                    <div class="star-section">
                        <img v-for="item in 4" class="star" src="@/assets/img/Star12Filled.svg" alt="">
                    </div>
                    <div class="info-section">
                        <div class="info-item"><img src="@/assets/img/walk.svg" alt="">
                            <p>5 min by walk (350M)</p>
                        </div>
                        <div class="info-item"><img src="@/assets/img/PlaceRound.svg" alt="">
                            <p>11F, NO.495, Guangfu South Road, Taipei, 11074, Taiwan</p>
                        </div>
                        <div class="info-item"><img src="@/assets/img/phone-round.svg" alt="">
                            <p>+886 2 8780 8000</p>
                        </div>
                        <div class="info-item"><img src="@/assets/img/EmailOutlined.svg" alt="">
                            <p class="email">pbc.corp@msa.hinet.net</p>
                        </div>
                    </div>
                    <div class="reserver-section">
                        <div class="price">
                            <img src="@/assets/img/money.svg" alt="">
                            <p>TWD $3800 up / Night</p>
                        </div>
                        <a v-if="isDisabled" class="reservation-btn" @click="warning">Reservation</a>
                        <a v-if="!isDisabled" href="https://reurl.cc/YDWZxa" target="_blank"
                            class="reservation-btn">Reservation</a>
                    </div>
                    <ul>
                        <!-- <p class="last-date">This booking offer is valid for reservations made until <span
                                class="date">October 21, 2026</span>.</p> -->
                        <li class="reminder">
                            In our commitment to environmental sustainability, starting July 1, 2024, single-use
                            amenities will no longer be provided proactively in guestrooms.
                        </li>
                        <li class="reminder">
                            Additional breakfast is available at a special rate of NT$400 per guest (regular price:
                            NT$460 + 10% service charge).
                        </li>
                        <li class="reminder">
                            An extra bed can be provided for NT$1,200 per night, which includes one breakfast.
                        </li>
                        <li class="reminder">
                            Boutique Room: One Queen bed with one breakfast included.
                        </li>
                        <li class="reminder">
                            Business Room: One Queen bed or two Twin beds with one to two breakfasts included.

                        </li>
                    </ul>
                </div>
            </div>



            <!-- <div class="demo-img">
                <img src="@/assets/img/demo-img/accommodation3.png" alt="" style="width: 100%;">
                <div class="demo-link-section">
                    <nuxt-link @click="router.go(-1)"></nuxt-link>
                </div>
            </div> -->
        </main>

    </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Banner from '@/components/layout/Banner.vue';
const router = useRouter()

const isDisabled = ref(false)
const checkDate = () => {
    const currentDate = new Date()
    const lastDate = new Date("2026-10-21")
    if (currentDate > lastDate) {
        isDisabled.value = true
    } else {
        isDisabled.value = false
    }
}

const warning = () => {
    ElMessageBox.confirm('This room booking offer has ended.', 'Warning', {
        confirmButtonText: 'OK',
        // cancelButtonText: 'Cancel',
        showCancelButton: false,
        type: 'warning',
    }).then(() => {
    }).catch(() => {
    });
}


const currentIndex = ref(1)
const toggleImage = (index: number) => {
    currentIndex.value = index
}
const setHoveredIndex = (index: number) => {
    currentIndex.value = index
}
const memberInfo = reactive<any>({})
const getMemberInfo = async () => {
    let res = await CSRrequest.get("/member/getMemberInfo")
    console.log(res)
    if (res.code === 200) {
        Object.assign(memberInfo, res.data)
        getOrderStatus()
    } else {
        ElNotification.error({
            title: 'Failed',
            message: 'Please login first',
            type: 'error',
            duration: 3000,
        });
        router.push("/login")
    }
}

const getOrderStatus = async () => {
    let res = await CSRrequest.get(`/orders/owner`)
    if (res.code === 200) {
        res.data.forEach((item: any) => {
            console.log(item)

            if ((item.itemsSummary === 'Group Registration Fee' || item.itemsSummary === 'Registration Fee') && item.status === 2) {
                console.log('paid')
            } else {
                ElNotification.error({
                    title: 'Failed',
                    message: 'Please pay the registration fee first',
                    type: 'error',
                    duration: 3000,
                });
                router.push("/member-center")
            }
        })
    } else {
        ElNotification.error({
            title: 'Failed',
            message: 'Please login first',
            type: 'error',
            duration: 3000,
        });
        router.push("/login")
    }



}

onMounted(() => {
    getMemberInfo()
    checkDate()
    // router.push("/accommodation")
})
</script>
<style lang="scss" scoped>
.common-section {
    // width: $common-section-width;
    // margin: $common-section-margin;
    // font-family: $common-section-font-family;
    font-family: "思源黑體", "Arial", sans-serif;
    margin-top: 6rem;



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
        position: relative;

        .back-btn {
            margin: 0 5%;
            width: 6%;
            font-size: 1.5rem;
            color: #EEAFB8;
            display: flex;
            align-items: center;
            position: relative;
            top: 2.5rem;
            left: 0;
            cursor: pointer;
        }

        .title {
            font-size: 2.7rem;
            font-weight: 600;
        }

    }

    .main-section {
        display: flex;
        margin: 2rem 0 0 5rem;
        gap: 1.5rem;

        @media screen and (max-width: 1024px) {
            flex-direction: column;
            margin: 0;
            padding: 0 1rem;

        }

        .img-box {
            flex: 1;
            position: relative;
            // margin-left: 1.5rem;
            padding-bottom: 5rem;
            display: flex;
            flex-direction: column;

            .image-item {
                margin-top: 1.5rem;
                position: relative;


                &::after {
                    content: '';
                    position: absolute;
                    width: 5rem;
                    height: 5rem;
                    background-color: #DD6777;
                    left: -6px;
                    top: -6px;
                    z-index: -1;
                }

                img {
                    width: 100%;
                    max-width: 95%;
                    box-shadow: 7px 6px 4px 0px rgba(0, 0, 0, 0.3);

                }

                .carousel-indicator {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    width: 100%;
                    padding: 0.5rem 0;
                    font-size: 1.5rem;
                    font-weight: 600;

                    .indicator {
                        width: 0.7rem;
                        height: 0.7rem;
                        background-color: #E5E7E9;
                        border-radius: 50%;
                    }

                    .active {
                        background-color: #B9B4AD;
                    }
                }
            }



        }

        .info-box {
            flex: 1.3;
            text-align: center;
            padding-bottom: 5rem;
            display: flex;
            flex-direction: column;

            .title {
                font-size: 2.5rem;
                color: #DD6777
            }


            .star-section {
                display: flex;
                justify-content: center;
                margin: 2rem auto;
                width: 50%;
                gap: 1rem;

                .star {
                    width: 1.8rem;

                }
            }

            .info-section {
                box-shadow: 5px 7px 5px 0px rgba(245, 239, 239, 0.9);
                position: relative;
                display: flex;
                background-color: #FDF0F4;
                flex-direction: column;
                justify-content: space-around;
                flex: 2;
                padding: 1.5rem 0;
                max-width: 95%;

                &::after {
                    content: '';
                    position: absolute;
                    width: 2px;
                    height: 90%;
                    background-color: #DD6777;
                    left: 0;
                    top: 5%;
                }

                .info-item {
                    display: flex;
                    padding: 0.5rem;
                    align-items: center;
                    margin-left: 2rem;

                    img {
                        width: 2.5rem;
                    }

                    p {
                        font-size: 1.3rem;
                        margin-left: 0.5rem;
                        white-space: wrap;
                        text-wrap: wrap;
                    }

                    .email {
                        color: #DD6777;
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            width: 100%;
                            height: 2px;
                            background-color: #F1BFC2;
                            top: 2rem;
                            left: 0;
                        }
                    }
                }

            }

            .reserver-section {
                margin: 1.5rem 0 0 3rem;
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 3rem;

                .price {
                    display: flex;
                    align-items: center;
                    text-wrap: nowrap;
                    margin-right: 2rem;
                }

                img {
                    width: 2rem;
                }

                .reservation-btn {
                    padding: 0.5rem 4rem;
                    background-color: #DD6777;
                    color: white;
                    border-radius: 25px;
                    cursor: pointer;

                    &.disabled {
                        background-color: #E5E7E9;
                        color: #B9B4AD;
                        cursor: not-allowed;
                    }
                }
            }
        }

        .last-date {
            text-align: start;
            margin: 1rem 0 0 0rem;

            .date {
                color: red;
            }
        }

        .reminder {
            text-align: start;
            margin: 1rem 0 0 0rem;
            color: #DD6777;

        }
    }


    .content {
        margin: 1rem auto;
        text-align: center;

        h1 {
            font-size: 2rem;
        }
    }

    .demo-img {
        position: relative;
        margin-top: 2%;

        img {
            width: 100%;
        }

        .demo-link-section {
            a {
                position: absolute;
                left: 0;
                top: 37%;
                width: 20%;
                height: 5%;
            }
        }
    }

}
</style>