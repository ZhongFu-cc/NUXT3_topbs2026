<!-- 聯絡我們組件,無表單 -->
<template>
    <section>
        <div class="contactUsBox">

            <!-- 單個圖標連結 Location -->
            <!-- <div class="contactItem">
                <div class="contactInfo">
                    <img class="icon" src="/img/location-offical.svg">
                    <div class="contact">
                        <p>地址： <a href="#">台中市北屯區文心路1025號</a></p>
                    </div>
                </div>
            </div> -->

            <!-- 單個圖標連結 -->
            <div class="contactItem">
                <!-- Phone -->
                <div class="contactInfo">
                    <img class="icon" src="/img/phone-offical.svg">
                    <div class="contact">
                        <p>連絡信箱： <a href="#">shinchuanhealth@gmail.com</a></p>
                    </div>
                </div>
            </div>

            <!-- 單個圖標連結 -->
            <div class="contactItem">
                <!-- FB -->
                <div class="contactInfo">
                    <img class="icon" src="/img/facebook-offical.svg">
                    <div class="contact">

                        <p>FB官方連結： <a href="https://www.facebook.com/profile.php?id=61551638706477">點此前往</a></p>
                        <p>簡介：探索新川醫療診所的官方Facebook頁面！在這裡，您將獲得最新的健康資訊、
                            專業建議和診所活動。立即關注，與我們保持聯繫，讓健康更靠近您！</p>
                    </div>
                </div>
            </div>

            <div class="contactItem">
                <!-- Line -->
                <div class="contactInfo">
                    <img class="icon" src="/img/line-offical.svg">
                    <div class="contact">
                        <p>Line官方連結： <a href="https://lin.ee/6ENLmuA">點此前往</a></p>
                        <p>簡介：新川醫療診所的Line帳號現已開通！立即加入我們，接收專業的醫療建議、
                            預約掛號和線上咨詢服務。輕鬆便捷，隨時與我們溝通！</p>
                    </div>
                </div>
            </div>

            <div class="contactItem">
                <!-- Youtube -->
                <div class="contactInfo">
                    <img class="icon" src="/img/youtube-offical.svg">
                    <div class="contact">
                        <p>Youtube官方連結： <a href="https://www.youtube.com/channel/UCVRKZ8Sz4zpcaBdAYWuRGnQ">點此前往</a></p>
                        <p>簡介：探索新川醫療診所的官方YouTube頻道！通過影片，您將了解最新的醫療技術、
                            病例分享和專家講座。立即訂閱，與我們一同探索健康世界！</p>
                    </div>
                </div>
            </div>


        </div>
    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
.contactUsBox {
    width: 80%;
    margin: 0 auto;

    .contactItem {
        width: 100%;
        margin: 5% 0;
        font-size: 0.9rem;

        .contactInfo {
            display: flex;
            justify-content: center;
            align-items: center;

            @media screen and (max-width:481px) {
                justify-content: flex-start;
            }

            img {
                max-width: 45px;
                width: 100%;
                transition: 0.3s;
                cursor: pointer;
                &:hover {
                    scale: 1.1;
                }
            }

            .contact {
                line-height: 1.5rem;
                padding: 0 1.5rem;
                max-width: 550px;
                min-width: 550px;

                @media screen and (max-width:810px) {}

                @media screen and (max-width:481px) {
                    line-height: 1.7rem;
                    min-width: auto;
                }

                p {
                    /**text-indent引用父級元素文字大小em,使用使用負號達到凸排 */
                    text-indent: -3em;
                    /**上右下左 將文字推回去原本的位置 */
                    padding: 0 2em 0 2em;

                    a {
                        font-weight: 600;
                    }
                }
            }
        }



    }
}
</style>
