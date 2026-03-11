<!--  -->
<template>
    <footer>
        <div class="footerInfoBox">
            <!-- 網站信息 -->
            <div class="footerInfo">
                <!-- Logo -->

                <!-- <div class="footerItem footerImgItem">
                    <img src="/img/logo02.png" >
                </div> -->

                <!-- 地點及聯絡方式 -->
                <div class="footerItem">
                    <div class="title">
                        Get in Touch
                    </div>
                    <div class="description">
                        8014 Edith Blvd NE, Albuquerque, New York, United States
                    </div>
                    <div class="contact">
                        (505) 792-2430<br>
                        demo@yourdomain.com
                    </div>
                </div>
                <!-- 查詢更多 -->
                <div class="footerItem">
                    <div class="title">
                        Learn More
                    </div>
                    <!-- 快速導覽連結 -->
                    <div class="RouteBox">
                        <NuxtLink to="/">
                            <div class="routeItem">首頁</div>
                        </NuxtLink>

                        <NuxtLink to="/introduce">
                            <div class="routeItem">團隊介紹</div>
                        </NuxtLink>

                        <!-- <NuxtLink to="/clinicHours">
                            <div class="routeItem">就診資訊</div>
                        </NuxtLink> -->

                        <NuxtLink to="/education">
                            <div class="routeItem">公眾衛生資訊</div>
                        </NuxtLink>

                        <NuxtLink to="/professional">
                            <div class="routeItem">醫學專業資訊</div>
                        </NuxtLink>

                        <NuxtLink to="/contact">
                            <div class="routeItem">聯絡我們</div>
                        </NuxtLink>
                    </div>
                </div>
                <!-- 訂閱信件 -->
                <div class="footerItem footerItemLetter">
                    <div class="title">
                        Our Newsletter
                    </div>
                    <div class="description">
                        Subscribe to our newsletter to get our news & discounts delivered to you.
                    </div>
                </div>
            </div>
        </div>


    </footer>
</template>

<script setup lang='ts'>


import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
/**底部區塊 */
footer {
    width: 90%;
    background-color: #fff;
    margin: 3% auto;

    /**底部資訊欄盒子 */
    .footerInfoBox {
        border-bottom: 1px solid #dee2e6;
    }

    /**底部資訊欄 */
    .footerInfo {
        width: 85%;
        margin: 0 auto;
        padding: 4% 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        @media screen and (max-width:481px) {
            flex-direction: column;
        }

        /**底部項目 */

        .footerImgItem {
            img {
                width: 100%;
                @media screen and (max-width:481px) {
                    width: 20%;
                }
            }
        }


        .footerItem {
            width: 16%;
            @media screen and (max-width:481px) {
                width: 100% !important;
            }

            /**小標題 */
            .title {
                margin-bottom: 4% ;
                font-size: 1.2rem;
                font-weight: 600;
                color:#727171;
                @media screen and (max-width:481px) {
                    margin: 4% 0;
                }

            }

            /**描述 */
            .description {
                font-size: 0.9rem;
                line-height: 24px;
                color: #727171;
                ;
            }

            /**聯繫方式 */
            .contact {
                margin: 6% 0;
                color: #727171;
            }

            /**路由導覽 */
            .RouteBox {
                /**單個路由 */
                .routeItem {
                    font-size: 0.9rem;
                    line-height: 28px;
                    color: #727171;

                    &:hover {
                        color: #565E64;
                    }
                }
            }
        }

        /**最右邊的訂閱信件盒子最寬 */
        .footerItemLetter {
            width: 30%;
        }
    }

}
</style>
