<!-- 團隊介紹section -->
<template>

    <section class="team-introduction-section">

        <div class="team-introduction-box">

            <div class="team-title-box">
                <h2 class="team-title">醫療團隊</h2>
                <div class="team-border"></div>
            </div>


            <!-- 團隊成員圖片 -->
            <div class="teamImgOuterBox">

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=0">
                            <img src="/img/team-img-01.png">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">許毓昭<span class="jobTitle">副院長</span></div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=1">
                            <img src="/img/team-img-02.png">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">張慧朗<span class="jobTitle">教授</span></div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=2">
                            <img src="/img/team-img-03.png">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">朱聖賢<span class="jobTitle">副教授</span></div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=3">
                            <img src="/img/team-img-04.png">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">曲元正<span class="jobTitle">主任</span></div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=4">
                            <img src="/img/team-img-05.png">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">朱信誠<span class="jobTitle">醫師</span></div>
                    </div>
                </div>

                <!-- <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=1">
                            <img src="/img/team-img-2.jpg">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">朱信誠<span class="jobTitle">醫師</span></div>
                    </div>
                </div> -->



            </div>

        </div>

    </section>

</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'


</script>

<style scoped lang="scss">
.team-introduction-section {
    width: 90%;
    margin: 5% auto;



    .team-introduction-box {
        // width: 90%;
        // margin: 0 auto;



        .team-title-box {
            display: flex;
            margin-right: 1rem;

            .team-title {
                color: #727171;
                font-size: 2.5rem;
                font-weight: 500;
                letter-spacing: 0.9rem;

                @media screen and (max-width:850px) {
                    font-size: 2rem;
                }

            }

            .team-border {
                margin-left: 1rem;
                // width: 79%;
                flex: 1;
                border-bottom: 1px solid black;
            }

        }



        /**文字敘述盒子 */
        .teamTextBox {
            text-align: center;
            margin: 10% auto;
            font-weight: 700;
            font-size: 3.5rem;

            .specialFont {
                font-family: Satisfy, cursive !important;
                font-style: italic;
                background: linear-gradient(120deg, #FFF3CD, #FFF3CD);
                background-position: 0 80%;
                background-repeat: no-repeat;
                background-size: 100% 25%;
                padding: 0.1875em
            }
        }

        /**團隊成員頭像介紹盒子 */
        .teamImgOuterBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            margin: 4% 0;
            // margin-left: 5%;

            .teamItem {
                margin: 2% 0;
                // margin-right: 5%;

                .imgBox {
                    max-width: 200px;
                    width: 100%;
                    overflow: hidden;
                    box-shadow: 0.5rem 0.5rem 0.25rem rgba(0, 0, 0, .075);

                    img {
                        aspect-ratio: 1 / 1;
                        width: 100%;
                        /* 也可以換成任何你想要的寬度 */
                        display: block;
                        /* 新增這行 */
                        object-fit: cover;
                        object-position: top center;
                        transition: 0.5s;

                        &:hover {
                            cursor: pointer;
                            scale: 1.1;
                        }
                    }
                }

                /**團隊成員文字介紹 */
                .textBox {
                    margin-top: 0.9rem;

                    .name {
                        color: #585657;
                        font-weight: 600;
                        font-size: 1.2rem;
                        margin-bottom: 0.25rem;
                        letter-spacing: 0.4rem;

                        @media screen and (max-width:481px) {
                            font-size: 0.9rem;
                        }
                    }

                    .jobTitle {
                        color: #6C757D;
                        font-size: 0.8rem;
                    }
                }


            }
        }

    }
}
</style>
