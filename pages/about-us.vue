<template>
    <section class="about-us-section">
        <Banner />
        <div class="main-section">
            <h1 class="title">Welcome Message</h1>
            <div class="welcome-box">
                <div class="image-box">
                    <img src="../assets/img/YeHsiangTang.jpg" alt="">
                </div>
                <div class="welcome-content">
                    <p>各位會員與醫界先進您好：&nbsp;:</p>
                    <p>歡迎蒞臨台灣乳房腫瘤手術暨重建醫學會年會。整形乳房外科的發展，一直致力於在腫瘤治療安全與術後外觀重建之間取得平衡，使患者在抗癌過程中，不僅能獲得有效的治療，也能維持自信與良好的生活品質。隨著醫療科技進步與跨專科合作日益成熟，透過持續的學術交流與臨床經驗分享，已成為推動醫療品質精進的重要力量。&nbsp;
                    </p>
                    <p>本次年會以 “Escalation With Wellness; De-Escalation In Precision”
                        為核心主題，象徵當代乳癌治療策略的重要轉變。在需要積極治療的領域，我們透過整合醫療與重建技術的進步，強化患者的身心健康與整體照護品質；同時，在精準醫療與臨床證據的支持下，逐步發展更精準且適度的治療策略，以避免過度治療，讓醫療決策更貼近個別患者的需求&nbsp;。
                    </p>
                    <p>本次年會將透過專題演講、臨床案例討論與實務經驗分享，聚焦乳癌治療、腫瘤整形手術技術、重建策略及多專科整合照護，期望提供一個深度交流與學術激盪的平台，促進國內乳房外科領域持續精進與發展。</p>
                    <p>誠摯期待與各位齊聚交流，共同為提升乳癌患者的照護品質與未來發展努力。</p>
                    <p>台灣乳房腫瘤手術暨重建醫學會敬上</p>
                </div>
            </div>

            <!-- <h1 class="title">主辦單位</h1>

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

            <h1 class="title">協辦單位</h1> -->

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
        margin: 3.5rem 0;

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }

        .image-box {
            flex: 0.5;
            height: 80%;
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