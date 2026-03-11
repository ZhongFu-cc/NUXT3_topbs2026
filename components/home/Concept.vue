<!--  -->
<template>

    <section class="concept-section">
        <div class="concept-box">
            <div class="concept-container">
                <div class="concept-title-box">
                    <h2 class="concept-title">核心理念</h2>
                    <div class="concept-border"></div>
                </div>
                <div class="concept-content">
                    <ul class="concept-list">
                        <li v-for="(value, index) in coreValues" :key="index">{{ value }}</li>
                    </ul>

                    <div class="decorate-img-box">
                        <img src="@/assets/img/blue-polka-dot.png">
                    </div>

                </div>
            </div>

            <div class="concept-image">
                <img src="@/assets/img/home-art-1.jpg">
            </div>


        </div>

    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'
const coreValues = reactive([
    '以患者為中心',
    '專業與卓越',
    '團隊合作',
    '高標準安全措施',
    '道德與誠信'
]);

</script>


<style scoped lang="scss">
.concept-section {
    width: 90%;
    margin: 5% auto;

    .concept-box {
        display: flex;
        justify-content: space-between;

        .concept-container {
            width: 60%;

            .concept-title-box {
                display: flex;
                margin-right: 1rem;

                .concept-title {
                    color: #727171;
                    font-size: 2.5rem;
                    font-weight: 500;
                    letter-spacing: 0.9rem;

                    @media screen and (max-width:850px) {
                        font-size: 2rem;
                    }

                }

                .concept-border {
                    margin-left: 1rem;
                    flex: 1;
                    border-bottom: 1px solid black;
                }

            }

        }

        .concept-content {
            display: flex;
            margin-top: 1.5rem;
            margin-right: 1rem;

            .concept-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
                margin-left: 4rem;

                li {
                    color: #727171;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    font-size: 1.1rem;
                    letter-spacing: 0.3rem;

                    &::before {
                        content: '•';
                        color: #727171;
                        font-size: 1.5rem;
                        margin-right: 0.9rem;
                    }
                }
            }

            .decorate-img-box {
                margin-left: 4rem;
                max-width: 10rem;

                @media screen and (max-width:850px) {
                    margin-left: 2rem;
                    max-width: 6rem;

                }

                img {
                    width: 100%;
                }
            }

        }

        .concept-image {
            max-width: 28rem;

            @media screen and (max-width:850px) {
                max-width: 17rem;
            }

            img {
                position: relative;
                top: 4rem;
                width: 100%;
            }
        }


    }
}
</style>
