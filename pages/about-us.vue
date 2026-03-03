<template>
    <section class="about-us-section">
        <Banner />
        <div class="main-section">
            <h1 class="title">Welcome Message</h1>
            <div class="welcome-box">
                <div class="image-box">
                    <img src="../assets/img/president3.jpg" alt="">
                </div>
                <div class="welcome-content">
                    <p>各位嘉賓、學界專家及同仁&nbsp;:</p>
                    <p>歡迎您蒞臨台中國際乳癌研討會。本研討會源自中華民國乳癌教育暨防治學會所辦之國際研討會，並在歷任理事長不懈努力下逐步奠定基礎。近年來，藉由中國醫藥大學附設醫院以及中國醫藥大學洪明奇校長的鼎力支持，本會已躋身為中部地區具代表性的重要國際乳癌研討會&nbsp;!
                    </p>
                    <p>台中國際乳癌研討會著重於基礎醫學研究與臨床治療新知，邀請國內外重量級學者分享頂尖研究與實務經驗，並針對真實世界的醫療運作議題展開深入討論。同時，今年度另設護理師與個管師工作坊，旨在提升醫療團隊之合作運作效率，促進跨領域交流與學習&nbsp;。
                    </p>
                    <p>我們期盼藉由此次盛會，能夠架構研究與臨床間之溝通橋樑，共同引領未來研發與創新，進一步提升乳癌患者之福祉。謹此誠摯歡迎各位嘉賓共襄盛舉，攜手創造更光明的明天。</p>
                    <p>台中國際乳癌研討會&nbsp;&nbsp; 敬上</p>
                </div>
            </div>

            <h1 class="title">主辦單位</h1>

            <div class="image-box">
                <div class="logo-box">
                    <img src="../assets/img/Organizer/LOGO-03_1.png" alt="">
                    <el-text class="logo-name">China Medical University Hospital</el-text>
                    <el-text class="logo-name">中國醫藥大學附設醫院</el-text>
                </div>
                <div class="logo-box">
                    <img src="../assets/img/Organizer/LOGO-04_1.png" alt="">
                    <el-text class="logo-name">China Medical University</el-text>
                    <el-text class="logo-name">中國醫藥大學</el-text>
                </div>
                <div class="logo-box">
                    <img src="../assets/img/Organizer/LOGO-05_1.png" alt="">
                    <el-text class="logo-name">The Breast Cancer Education and Prevention Association</el-text>
                    <el-text class="logo-name">中華民國乳癌教育暨防治學會</el-text>
                </div>
            </div>


            <h1 class="title">指導單位</h1>

            <div class="image-box">
                <div class="logo-box2">
                    <img src="../assets/img/Organizer/LOGO-06_1.png" alt="">
                    <el-text class="logo-name">Taiwan Breast Cancer Society</el-text>
                    <el-text class="logo-name">台灣乳房醫學會</el-text>
                </div>
                <div class="logo-box2">
                    <img src="../assets/img/Organizer/LOGO-07_1.png" alt="">
                    <el-text class="logo-name">Taiwan Surgical Association</el-text>
                    <el-text class="logo-name">中華民國外科醫學會</el-text>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
</script>
<style lang="scss" scoped>
.about-us-section {
    .main-section {
        width: 60%;
        margin: 0 auto;
        color: $main-color;

        @media screen and (max-width: 1024px) {
            width: 80%;
        }
    }

    .title {
        font-size: 2.5rem;
        display: flex;
        justify-content: center;
        margin-top: 5rem;
    }

    .welcome-box {
        display: flex;
        gap: 2rem;
        margin-top: 3.5rem;

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }

        .image-box {
            flex: 1;
            border-radius: 10px;

            img {
                border-radius: 10px;
                overflow: hidden;
                object-fit: cover;
                width: 100%;
            }

        }

        .welcome-content {
            color: $main-color;
            flex: 1;
            padding: 0 20px;
            font-size: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            @media screen and (max-width: 1920px) {
                font-size: 1.5rem;
            }

            @media screen and (max-width: 1440px) {
                font-size: 1rem;
            }

            @media screen and (max-width: 768px) {
                font-size: 1.5rem;

            }
        }
    }

    .image-box {
        display: flex;
        justify-content: center;
        gap: 2rem;

        @media screen and (max-width: 426px) {
            flex-direction: column;
        }

        .logo-box {
            width: calc(100%/3 - 2rem);
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 426px) {
                width: 100%;
            }

            .logo-name {
                color: $main-color;
                font-size: 1rem;
                text-align: center;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

        .logo-box2 {
            display: flex;
            flex-direction: column;
            width: calc(100%/3 - 2rem);

            @media screen and (max-width: 426px) {
                width: 100%;
            }

            .logo-name {
                color: $main-color;
                font-size: 1.2rem;
                text-align: center;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

    }

}
</style>