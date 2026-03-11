<template>
    <section class="education-section">
        <div class="education-box">
            <div class="education-container">
                <div class="education-title-box">
                    <h2 class="education-title">疾病與治療介紹</h2>
                    <div class="education-border"></div>
                </div>
                <div class="education-content">
                    <div class="medical-list">
                        <div v-for="condition in medicalConditions" :key="condition" class="medical-list__item">
                            <span>{{ condition }}</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="education-image">
                <img src="@/assets/img/home-art-2.jpg">
            </div>


        </div>

    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'
const medicalConditions = [
    '泌尿系統感染及炎症',
    '泌尿系統感染及炎症',
    '尿路結石及相關疾病',
    '尿路結石及相關疾病',
    '排尿異常及膀胱疾病',
    '排尿異常及膀胱疾病',
    '男性生殖系統疾病',
    '男性生殖系統疾病',
    '尿道相關疾病',
    '尿道相關疾病'
];

</script>


<style scoped lang="scss">
.education-section {
    width: 90%;
    margin: 5% auto;

    .education-box {
        display: flex;
        margin-left: 5%;
        justify-content: space-between;

        .education-container {
            width: 50%;

            .education-title-box {
                display: flex;
                margin-right: 1rem;

                .education-title {
                    color: #727171;
                    font-size: 2rem;
                    font-weight: 520;
                    letter-spacing: 0.5rem;

                    @media screen and (max-width:850px) {
                        font-size: 2rem;
                    }

                }

                .education-border {
                    margin-left: 1rem;
                    flex: 1;
                    border-bottom: 1px solid black;
                }

            }

        }

        .education-content {
            display: flex;
            margin-top: 1.5rem;
            margin-right: 1rem;


            .medical-list {
                display: flex;
                flex-wrap: wrap;

                &__item {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    margin: 3% 0;
                    letter-spacing: 0.3rem;



                    &::before {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background-color: #666666;
                        border-radius: 50%;
                        margin-right: 0.5rem;
                    }

                    span {
                        font-size: 1.125rem;
                        color: #666666;

                        &:hover {
                            cursor: pointer;
                            color: #647DBD;
                        }

                        @media screen and (max-width:850px) {
                            font-size: 0.9rem;
                        }

                    }
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

    .education-image {
        max-width: 30rem;
        // display: flex;
        // justify-content: flex-end; /* 將子元素移動到父容器的底部 */

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
</style>
