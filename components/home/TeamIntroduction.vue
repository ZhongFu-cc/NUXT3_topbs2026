<!-- 團隊介紹section -->
<template>

    <section>
        <div class="teamBox">

            <!-- 文字盒子 -->
            <div class="teamTextBox">
                <p><span class="specialFont">團隊介紹</span></p>
            </div>

            <!-- 團隊成員圖片 -->
            <div class="teamImgOuterBox">

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=0">
                            <img src="/img/HsuImg.jpg">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">許毓昭</div>
                        <div class="jobTitle">副院長</div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=1">
                            <img src="/img/team-img-5.jpg">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">張慧朗</div>
                        <div class="jobTitle">教授</div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox" ref="imgBoxRef">
                        <NuxtLink to="/introduce?doctor=2">
                            <img src="/img/team-img-3.jpg">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">朱聖賢</div>
                        <div class="jobTitle">副教授</div>
                    </div>
                </div>

                <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=3">
                            <img src="/img/team-img-4.jpg">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">曲元正</div>
                        <div class="jobTitle">主任</div>
                    </div>
                </div>

                <!-- <div class="teamItem">
                    <div class="imgBox">
                        <NuxtLink to="/introduce?doctor=1">
                            <img src="/img/team-img-2.jpg">
                        </NuxtLink>
                    </div>

                    <div class="textBox">
                        <div class="name">朱信誠</div>
                        <div class="jobTitle">醫師</div>
                    </div>

                </div> -->

            </div>

        </div>
    </section>

</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

const imgBoxRef = ref()
console.log("這是imgBox", imgBoxRef)

onMounted(() => {

    const imgBoxDom = imgBoxRef.value;
    console.log("這是這是imgBox Dom元素", imgBoxDom)


    // console.log("這是imgBox Dom元素的Img",imgBoxDom.children[0])

    // console.log("這是這是imgBox Dom元素的width", imgBoxDom.offsetWidth)
    // console.log("這是這是imgBox Dom元素的height", imgBoxRef.value.clientHeight)





})



</script>

<style scoped lang="scss">
section {
    width: 100%;

    .teamBox {
        width: 90%;
        margin: 0 auto;

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
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 8%;

            .teamItem {
                width: 18%;
                box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .075);

                .imgBox {
                    width: 100%;
                    overflow: hidden;
                    border-radius: 10px;
                    height: 200px;


                    @media screen and (max-width:769px) {
                        max-height: 130px;
                    }

                    @media screen and (max-width:481px) {
                        max-height: 90px;
                    }

                    @media screen and (max-width:400px) {
                        max-height: 70px;
                    }

                    img {
                        max-width: 100%;
                        //width: 100%;
                        transition: 0.5s;

                        &:hover {
                            cursor: pointer;
                            scale: 1.1;
                        }
                    }
                }

                /**團隊成員文字介紹 */
                .textBox {
                    padding: 1.3rem;

                    .name {
                        font-weight: 600;
                        font-size: 1.2rem;
                        margin-bottom: 0.25rem;

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
