<template>
    <div class="common-section">
        <Banner></Banner>
        <div class="buttle-tea-info">
            <div class="chinese">
                <p>
                    “珍奶“不只是台灣代表性的的小吃之一，其發源地更是在台中地區，而”珍奶“取其諧音的就是珍視乳房的意思！！</p>
                <p>TICBCS致力集結世界各地的乳癌專家與學者，共同探討乳癌防治的最新研究成果
                    與臨床應用，另外也期許TICBCS能夠耕耘台中在地區域，日後並成為台灣代表性的乳癌相關研討會之一。</p>
            </div>
            <div class="english">
                <p>
                    "Bubble tea" is not just one of Taiwan's iconic snacks, its place of origin is in the Taichung
                    area. The name "bubble tea" also phonetically implies cherishing the breasts!</p>
                <p> TICBCS is dedicated to bringing together breast cancer experts and scholars from around
                    the world to discuss the latest research findings and clinical applications in breast cancer
                    prevention and treatment.</p>
                <p> Additionally, TICBCS aims to cultivate the local region of Taichung and eventually become
                    one of Taiwan's representative breast cancer-related conferences.
                </p>
            </div>



            <div class="image-section">
                <img src="../assets/img/bubble_tea_hello.png" alt="Bubble Tea" />
                <img src="../assets/img/bubble_tea_lay.png" alt="Bubble Tea" />

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    img {
        width: 100%;
        height: auto;
        max-width: 800px; // Adjust the max-width as needed
        border-radius: 10px; // Optional: add some border radius for aesthetics
    }

    .buttle-tea-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 55%;
        gap: 4rem;
        font-size: 1.5rem;
        line-height: 1.5rem;
        color: $main-color;

        @media screen and (max-width: 768px) {
            font-size: 1.2rem;
            line-height: 1.2rem;
        }

        .chinese {
            font-weight: bold;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .english {
            font-weight: normal;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .image-section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            width: 100%;

            img {
                width: 50%;
                height: auto;
                max-width: 100%;
                border-radius: 10px; // Optional: add some border radius for aesthetics
            }
        }
    }
}
</style>