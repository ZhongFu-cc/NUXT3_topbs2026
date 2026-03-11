<!-- 文章組件 -->
<template>

    <section>

        <!-- 文章盒子  -->
        <div class="articleBox">

            <!-- 遍歷文章數組 -->
            <div class="articleItem" v-for="(item, index) in articleList" :key="item.id">
                <a href="" title="" class="">
                    <div class="itemImgBox">
                        <img src="/img/cta-img-1.jpg" class="">
                    </div>
                    <div class="itemInfo">
                        <div>
                            <span class="tag">{{ item.tag }}</span>
                            <span class="date">{{ item.date }} </span>
                        </div>
                        <div class="title">{{ item.title }}</div>
                        <p class="introduction">
                            {{ item.introduction }}
                        </p>
                    </div>
                </a>
            </div>

        </div>

        <!-- 
            分頁插件 total為總資料數(這邊設置20筆),  default-page-size代表每頁顯示資料(預設為10筆,這邊設置為5筆) 
            current-page當前頁數,官方建議使用v-model與current-page去與自己設定的變量做綁定,
        -->
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="15" :default-page-size="5"
                v-model:current-page="currentPage" />
        </div>

    </section>

</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

//設定currentPage當前頁數
let currentPage = ref(1)


let articleList = reactive([{
    id: 1,
    tag: '活動消息',
    date: '2024/05/07',
    img: '/img/article1.jpg',
    title: '衛教文章標題1',
    introduction: '這是第一篇衛教文章的描述。'
},
{
    id: 2,
    tag: '健康資訊',
    date: '2024/05/06',
    img: '/img/article2.jpg',
    title: '衛教文章標題2',
    introduction: '這是第二篇衛教文章的描述。'
},
{
    id: 3,
    tag: '營養資訊',
    date: '2024/05/05',
    img: '/img/article3.jpg',
    title: '衛教文章標題3',
    introduction: '這是第三篇衛教文章的描述。'
},
{
    id: 4,
    tag: '活動消息',
    date: '2024/05/04',
    img: '/img/article4.jpg',
    title: '衛教文章標題4',
    introduction: '這是第四篇衛教文章的描述。'
},
{
    id: 5,
    tag: '健康資訊',
    date: '2024/05/03',
    img: '/img/article5.jpg',
    title: '衛教文章標題5',
    introduction: '這是第五篇衛教文章的描述。'
},])

//監聽當前頁數的變化,如果有更動就call API 獲取數組數據
//之後將資料更新到newsList 響應式的最新消息列表中
watch(currentPage, (value, oldValue) => {


    //先創建兩個假數據,用於展示效果
    let oldOneList = [{
        id: 1,
        tag: '活動消息',
        date: '2024/05/07',
        img: '/img/article1.jpg',
        title: '衛教文章標題1',
        introduction: '這是第一篇衛教文章的描述。'
    },
    {
        id: 2,
        tag: '健康資訊',
        date: '2024/05/06',
        img: '/img/article2.jpg',
        title: '衛教文章標題2',
        introduction: '這是第二篇衛教文章的描述。'
    },
    {
        id: 3,
        tag: '營養資訊',
        date: '2024/05/05',
        img: '/img/article3.jpg',
        title: '衛教文章標題3',
        introduction: '這是第三篇衛教文章的描述。'
    },
    {
        id: 4,
        tag: '活動消息',
        date: '2024/05/04',
        img: '/img/article4.jpg',
        title: '衛教文章標題4',
        introduction: '這是第四篇衛教文章的描述。'
    },
    {
        id: 5,
        tag: '健康資訊',
        date: '2024/05/03',
        img: '/img/article5.jpg',
        title: '衛教文章標題5',
        introduction: '這是第五篇衛教文章的描述。'
    },
    ]

    let updateList_page2 = [{
        id: 6,
        tag: '營養資訊',
        date: '2024/05/02',
        img: '/img/article6.jpg',
        title: '衛教文章標題6',
        introduction: '這是第六篇衛教文章的描述。'
    },
    {
        id: 7,
        tag: '活動消息',
        date: '2024/05/01',
        img: '/img/article7.jpg',
        title: '衛教文章標題7',
        introduction: '這是第七篇衛教文章的描述。'
    },
    {
        id: 8,
        tag: '健康資訊',
        date: '2024/04/30',
        img: '/img/article8.jpg',
        title: '衛教文章標題8',
        introduction: '這是第八篇衛教文章的描述。'
    },
    {
        id: 9,
        tag: '營養資訊',
        date: '2024/04/29',
        img: '/img/article9.jpg',
        title: '衛教文章標題9',
        introduction: '這是第九篇衛教文章的描述。'
    },
    {
        id: 10,
        tag: '活動消息',
        date: '2024/04/28',
        img: '/img/article10.jpg',
        title: '衛教文章標題10',
        introduction: '這是第十篇衛教文章的描述。'
    },]


    let updateList_page3 = [{
        id: 13,
        tag: '活動消息',
        date: '2024/04/25',
        img: '/img/article13.jpg',
        title: '衛教文章標題13',
        introduction: '這是第十三篇衛教文章的描述。'
    },
    {
        id: 14,
        tag: '健康資訊',
        date: '2024/04/24',
        img: '/img/article14.jpg',
        title: '衛教文章標題14',
        introduction: '這是第十四篇衛教文章的描述。'
    },
    {
        id: 15,
        tag: '營養資訊',
        date: '2024/04/23',
        img: '/img/article15.jpg',
        title: '衛教文章標題15',
        introduction: '這是第十五篇衛教文章的描述。'
    },
    {
        id: 16,
        tag: '活動消息',
        date: '2024/04/22',
        img: '/img/article16.jpg',
        title: '衛教文章標題16',
        introduction: '這是第十六篇衛教文章的描述。'
    },
    {
        id: 17,
        tag: '健康資訊',
        date: '2024/04/21',
        img: '/img/article17.jpg',
        title: '衛教文章標題17',
        introduction: '這是第十七篇衛教文章的描述。'
    },
    {
        id: 18,
        tag: '營養資訊',
        date: '2024/04/20',
        img: '/img/article18.jpg',
        title: '衛教文章標題18',
        introduction: '這是第十八篇衛教文章的描述。'
    }]



    //當點選到第二頁時才更換數據,非第二頁時更換回原數據
    if (value == 2) {

        //使用Object.assign直接替換newsList 保留響應式
        Object.assign(articleList, updateList_page2)

    } else {
        //使用Object.assign直接替換newsList 保留響應式
        Object.assign(articleList, oldOneList)
        console.log("新的newsList", updateList_page3)
    }



})



</script>

<style scoped lang="scss">
section {
    width: 80%;
    margin: 0 auto;

    //衛教文章外部盒子
    .articleBox {
        margin: 2% auto;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        //所有a連結沒有下底線
        a {
            text-decoration: none;
        }

        //每篇文章
        .articleItem {
            margin: 2% 1%;
            width: 30%;
            max-width: 400px;
            max-width: 400px;
            background-color: #F7F7F7;

            //手機視口RWD響應
            @media screen and (max-width:481px) {
                width: 100%;
            }

            //當滑鼠碰到這篇文章時,改變字體顏色+圖片放大
            &:hover {
                .itemInfo {
                    color: #af8a67;
                }

                .itemImgBox {
                    img {
                        scale: (1.1);
                    }
                }
            }
        }

        //文章圖片盒子
        .itemImgBox {
            width: 100%;
            //搭配hover後的scale使用
            overflow: hidden;

            //文章圖片
            img {
                max-width: 100%;
                width: 100%;
                transition: 0.5s;

            }
        }

        //文章內容
        .itemInfo {
            padding: 10px;
            line-height: 22px;

            .introduction {
                //多行文字超出3行時隱藏,這是一整套的不能拆開使用
                //除非必要效果不然建議少用,避免移動端或者特殊瀏覽器無法正常顯示
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 3;
                line-clamp: 3;
            }

            //類型與日期, 日期將自身往右推5px
            .date {
                margin-left: 5px;
            }

        }
    }

    /**分頁組件引入盒子 */
    .example-pagination-block {
        margin-bottom: 3%;

        /**重置分頁組件CSS,將分頁組件置中 */
        .el-pagination {
            justify-content: center;
        }

        /**這是 SCSS 中的一個特殊用法，代表選擇器的相鄰兄弟元素。
        具體來說，& 表示父選擇器（.example-pagination-block），而 &+& 表示兩個相鄰的.example-pagination-block 元素。
        在這個上下文中，它被用來為相鄰的 .example-pagination-block 元素設置額外的上邊距
        */
        // &+& {
        //      margin-top: 10px;
        // }

        .example-demonstration {
            margin-bottom: 16px;
        }
    }


}
</style>
