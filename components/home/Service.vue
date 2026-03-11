<!--  -->
<template>

    <section>
        <div class="serviceBox">

            <!-- 文字盒子 -->
            <div class="serviceTextBox">
                <p>You will get the</p>
                <p>perfect <span class="specialFont">resolutions</span> with</p>
                <p>our proficient services.</p>
            </div>

            <!-- 服務項目外部盒子 -->
            <div class="serviceItemOuterBox">
                <!-- 服務項目內部盒子 -->
                <div class="serviceItemInnerBox">
                    <!-- 單個服務項目,總共有四個,內容不同,Icon不同, CSS只有寫在itemIconBox 內有個內聯樣式不同 -->
                    <div class="serviceItem">
                        <div class="itemIconBox" style="background: #f2e9ac;">
                            <ElIconSearch class="icon" />
                        </div>
                        <div class="itemTitle">Market Research</div>
                        <div class="itemDepiction">
                            We can help you to understand your target market and
                            identify new opportunities for growth. We offer a
                            variety of market research services, interviews, and focus groups.
                        </div>
                        <div class="itemLearnMore">
                            <a href="#" >Learn More -></a>
                        </div>
                    </div>

                    <div class="serviceItem">
                        <div class="itemIconBox" style="background-color: #CAF0C7;">
                            <ElIconMonitor class="icon" />
                        </div>
                        <div class="itemTitle">Web Design</div>
                        <div class="itemDepiction">
                            We can help you to create a visually appealing and user-friendly
                            website. We take into account your brand identity and target
                            audience when designing your website.
                        </div>
                        <div class="itemLearnMore">
                            <a href="#">Learn More -></a>
                        </div>
                    </div>

                    <div class="serviceItem">
                        <div class="itemIconBox" style="background-color: #FFE9F3;">
                            <ElIconNotebook class="icon" />
                        </div>
                        <div class="itemTitle">SEO Services</div>
                        <div class="itemDepiction">
                            We can help you to improve your website's visibility in search engine
                            results pages (SERPs). This can lead to more traffic to your website and more conversions.
                        </div>
                        <div class="itemLearnMore">
                            <a href="#" >Learn More -></a>
                        </div>
                    </div>

                    <div class="serviceItem">
                        <div class="itemIconBox" style="background-color: #CDF7F6;">
                            <ElIconStar class="icon" />
                        </div>
                        <div class="itemTitle">Content Marketing</div>
                        <div class="itemDepiction">
                            We can help you to promote your business online through a variety
                            of digital marketing channels, including SEO, PPC, social media
                            marketing, and email marketing.
                        </div>
                        <div class="itemLearnMore">
                            <a href="#">Learn More -></a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>

</template>


<script setup lang='ts'>

//import { Search,Document } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
section {
    width: 100%;

    .serviceBox {
        width: 90%;
        margin: 0 auto;

        .serviceTextBox {
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
                padding:0.1875em
            }
        }

        .serviceItemOuterBox {
            width: 100%;
            margin-bottom: 8%;

            .serviceItemInnerBox {
                display: flex;
                justify-content: space-between;
                

                .serviceItem {
                    width: 20%;

                    .itemIconBox {
                        display: inline-block;

                        .icon {
                            color: #2F3F9F;
                            padding: 0.35em 0.65em;
                            width: 26px;
                            height: 26px;
                        }

                    }

                    .itemTitle {
                        padding: 1rem 0;
                        font-size: 1.2rem;
                        font-weight: 600;
                    }

                    .itemDepiction {
                        color: #6C757D;
                    }

                    .itemLearnMore {
                        margin-top: 1rem;

                        a {
                            font-size: 1rem;
                            font-weight: 700;
                            color: #2F3F9F;
                        }

                    }
                }
            }
        }
    }
}
</style>
