<template>
    <section class="travel-section">
        <Banner></Banner>
        <!-- <div v-for="item in travelItemList" class="travel-item-box">
            <div class="image-box">
                <img :src="item.imageUrl" alt="">
            </div>
            <div class="travel-info-box">
                <h1 class="title"><span class="type" :class="item.type === '鄰近景點' ? '' : 'first'">{{ item.type
                        }}</span>{{ item.title }}</h1>
                <p v-html="item.content"></p>
                <a class="link" :href="item.link" target="_blank">See More</a>
            </div>

        </div> -->
    </section>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Title from '~/components/layout/Title.vue';

// const travelItemList = [
//     {
//         type: '首選推薦',
//         title: '台中國際會展中心',
//         content: `臺中國際會展中心位於水湳智慧城北側入口門戶，發展目標為指標性及帶領經貿產業最重要之國際會展中心，<B>以「Tree Gate」作為設計理念與規劃整體建築設計</B>，會展中心位於植被成林的公園中，設施的整體印象有如<B>“大樹之門”</B>。中央的開放空間設計成充滿從樹隙間滲透出陽光樹影斑駁效果的廣場，開放式的市民廣場，形成連通南北公園的設施與市民休憩的空間。​`,
//         imageUrl: img01,
//         link: 'http://www.shuinanicec.com.tw/'
//     },
//     {
//         type: '首選推薦',
//         title: '台中綠美圖​',
//         content: `綠美圖做為公園綠意與城市景觀延伸，是<B>全國第一座美術館與圖書館共構的建築</B>，為中臺灣文化藝術場館揭開璀璨新篇章。  臺中綠美圖整體建築設計包含<B>「公園中的圖書館、森林中的美術館」</B>、「將地面層抬高與公園連結，開放為市民場域」等6大主要特色。綠美圖未來不僅是全臺首座且量體最大之圖書館與美術館「雙館共構」新建築，更是集城市美學與藝術文化亮點的世界級建築新地標。​`,
//         imageUrl: img02,
//         link: 'https://www.library.taichung.gov.tw/public/content/index-1.asp?Parser=1,20,600,45'
//     },
//     {
//         type: '首選推薦',
//         title: '台中國家歌劇院​',
//         content: `歌劇院除了提供大中小劇場的舞台給國內外表演藝術團隊進行經典演出或創新製作，更將以<B>數位／視覺／音景藝術</B>的常設展或主題展跟臺灣中部地區的<B>科技產業</B>連結，讓歌劇院存在於市民的日常之中，各種形式與主題的藝術活動：<B>親子互動劇場體驗</B>，從手作中認識劇場；大孩子可以參加劇場解密導覽，從舞台機關、燈光透視概念認識劇場；更有劇場建築空間、綠劇人植栽導覽。​`,
//         imageUrl: img03,
//         link: 'https://www.npac-ntt.org/index'
//     },
//     {
//         type: '鄰近景點',
//         title: '台中中央公園​',
//         content: `台中中央公園規劃以<B>寧適、生態、滯洪、減災、減碳及遊憩</B>等功能為主。配合水湳經貿園區再定位的三大發展主軸：<B>智慧、低碳、創新</B>，以創造世界級的智慧型生態公園為目標。​`,
//         imageUrl: img04,
//         link: 'https://cpark.taichung.gov.tw/'
//     },
//     {
//         type: '鄰近景點',
//         title: '水湳市場​',
//         content: `位於西屯區的水湳市場是規模龐大的傳統市場，採買人潮踴躍，好吃又好買，<B>早中晚皆有不同美食店家輪番開張營業</B>，還有許多在地老店隱身於其中，不容錯過。市場內主要販售<B>生活用品、生鮮蔬果、各式肉品海鮮、五穀雜糧</B>以及<B>少量乾貨</B>等。​`,
//         imageUrl: img05,
//         link: 'https://travel.taichung.gov.tw/zh-tw/attractions/intro/1817'
//     },
//     {
//         type: '鄰近景點',
//         title: '逢甲商圈',
//         content: `逢甲商圈鄰近逢甲大學、僑光技術學院等學區。因其有著位於學區和接近市區的地緣關係，逐漸成為臺中市夜市集團的龍頭。逢甲夜市與其它臺中市夜市最大不同之處，在於其<B>不單是以飲食著稱，也包含了各式各樣的商店</B>，流行服飾及飾品，唱片行、眼鏡行、手機及飾品配備、書籍文具、印刷裝訂等多樣化業種，兼具精品商店及夜市小攤，適合大眾化消費。​`,
//         imageUrl: img06,
//         link: 'https://travel.taichung.gov.tw/zh-tw/Attractions/Intro/39/'
//     },
// ]



</script>
<style lang="scss" scoped>
.travel-section {
    .travel-item-box {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 70%;
        margin: 5rem auto 3.5rem auto;
        gap: 2rem;

        @media screen and (max-width: 1440px) {
            width: 90%;

        }

        @media screen and (max-width: 1024px) {
            flex-direction: column;
            width: 70%;

        }

        .image-box {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;


            img {
                width: 80%;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

                @media (max-width: 1920px) {
                    width: 100%;
                }
            }
        }

        .travel-info-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            color: $main-color;
            font-size: 1.3rem;
            gap: 1rem;
            line-height: 2.5rem;
            padding-top: 1.5rem;


            .type {
                font-size: 1.2rem;
                background-color: #9AB3DC;
                color: white;
                font-weight: normal;
                letter-spacing: 0.2rem;
                padding: 0.2rem;
                margin-right: 1rem;

                &.first {
                    background-color: $main-color;
                }

            }

            .title {
                font-size: 1.5rem;
            }

            .link {
                align-self: flex-end;
                color: $main-color;
                position: relative;
                font-style: italic;
                font-weight: bold;

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0.5rem;
                    width: 100%;
                    height: 2px;
                    background-color: $main-color;
                }
            }
        }
    }

}
</style>