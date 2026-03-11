<!--  -->
<template>
    <section class="introduce-section">
        <div class="introduce-img-box">
            <div class="text-box">
                <div class="keyword">HEALTH</div>
                <div class="keyword">PROFESSIONALS</div>

                <div class="sub-keyword">Your health is important</div>
                <div class="content">Lorem ipsu, dolor sit amet,consectetuer adipiscing elit, seddiam nonummy nibh
                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam dolor
                    sitamet, consectetuer adipiscing elit</div>
                <button class="more-info-btn">MORE INFO</button>
            </div>
            <img src="@/assets/img/home-2560-update04.png" alt="">
        </div>


    </section>


</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

const router = useRouter();

const goToPath = (targetPath: string) => {
    router.push(targetPath)
}

</script>

<style scoped lang="scss">
.introduce-section {
    width: 100%;
    background-color: #C0DEE6;

    .introduce-img-box {
        width: 100%;
        background-color: #C0DEE6;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative; // 保持相對定位以便於使用絕對定位


        .text-box {
            max-width: 40%;
            position: absolute;
            left: 5%;
            top: 25%;

            .keyword {
                color: #FFFEFE;
                font-size: 4rem;
                font-weight: 400;

                @media screen and (max-width:850px) {
                    font-size: 2rem;
                }
            }

            .sub-keyword {
                color: #005378;
                font-size: 1.3rem;

                @media screen and (max-width:1150px) {
                    display: none;
                }
            }

            .content {
                color: #004E75;
                max-width: 88%;
                font-size: 1rem;
                line-height: 1.8rem;

                @media screen and (max-width:1150px) {
                    display: none;
                }
            }

            .more-info-btn {
                margin-top: 2%;
                color: #005B7E;
                background-color: #ffffff;
                border: none;
                border-radius: 0.7rem;
                padding: 2%;
                cursor: pointer;
                transition: background-color 0.2s;

                &:hover {
                    color: #647DBD;
                    background-color: #f5f5f5;
                }

            }

        }

        img {
            background-color: #C0DEE6;
            display: block;
            width: 100%;
        }
    }

}
</style>
