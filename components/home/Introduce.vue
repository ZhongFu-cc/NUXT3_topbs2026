<!--  -->
<template>
    <section>
        <!-- 介紹外部盒子 -->
        <div class="introduceOuterBox">

            <!-- 介紹文字盒子 -->
            <div class="introduceTextBox">

                <!-- 重點文字 -->
                <p class="pointText">
                    Slogan 重點敘述
                </p>
                <!-- 其他文字 -->
                <p class="otherText">
                    補充敘述
                </p>

                <!-- <p class="pointText">以專業技術改善泌尿健康</p> -->
                
                <!-- <p class="otherText">改善患者生活質量，關愛每一位病患</p> -->

                <!-- 按鈕盒子 -->
                <div class="buttonBox">
                    <!-- 實心按鈕 -->
                    
                    <button class="filledBtn" @click="goToPath('/introduce')" >團隊介紹</button>
                    <!-- 空心按鈕 -->
                    <button class="hollowBtn" @click="goToPath('/education')" >衛教資訊</button>
                </div>

            </div>

            <!-- 介紹圖片盒子 -->
            <div class="introduceImgBox">
                <img src="/img/HsuImg.jpg">
            </div>

        </div>
    </section>


</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

const router = useRouter();

const goToPath = (targetPath:string)=>{
    router.push(targetPath)
}

</script>

<style scoped lang="scss">
section {
    width: 100%;
    background-color: $main-color;

    .introduceOuterBox {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 1rem 0;

        @media screen and (max-width:481px) {
            flex-direction: column;

        }

        .introduceTextBox {
            width: 55%;

            @media screen and (max-width:481px) {
                order: 2;
                width: 100%;
            }

            .pointText {
                font-weight: 700;
                font-size: 3.0rem;

                @media screen and (max-width:769px) {
                    font-size: 2.8rem;
                }

                @media screen and (max-width:481px) {}

                @media screen and (max-width:400px) {}

                .specialFont {
                    font-family: Satisfy, cursive !important;
                    font-style: italic;
                    background: linear-gradient(120deg, #e4a0a1, #e4a0a1);
                    background-position: 0 80%;
                    background-repeat: no-repeat;
                    background-size: 100% 25%;
                    padding: 0.1875em
                }
            }

            .otherText {
                font-size: 1.2rem;
                line-height: 2.5rem;
            }

            .buttonBox {
                margin-top: 2rem;

                .filledBtn {
                    background-color: #2F3F9F;
                    border-color: #2F3F9F;
                    color: #fff;
                    border-radius: 50rem;
                    font-size: 1.2rem;
                    padding: 0.8rem 1rem;
                    cursor: pointer;

                    &:hover {
                        background-color: #283687;
                        border-color: #26327f;
                    }


                }

                .hollowBtn {
                    background-color: transparent;
                    border-color: #2F3F9F;
                    color: #26327f;
                    border-radius: 50rem;
                    font-size: 1.2rem;
                    padding: 0.8rem 1rem;
                    margin-left: 0.5rem;
                    cursor: pointer;

                    &:hover {
                        background-color: #283687;
                        border-color: #26327f;
                        color: #fff;
                    }
                }
            }

        }

        .introduceImgBox {
            width: 40%;
            position: relative;

            /* 確保容器相對定位 */
            @media screen and (max-width:481px) {
                order: 1;
                width: 100%;
            }

            img {
                max-width: 100%;
                position: relative;
                mask-image: url('/assets/img/hero-blob-1.svg');
                mask-repeat: no-repeat;
                mask-position: 0% 70%;
                /* 調整這裡的數值來控制遮罩圖片的位置 */
                //object-position: 0px 0px;
            }
        }

    }
}
</style>
