<!--  -->
<template>

    <section>
        <div class="newsBox">

            <!-- 最新消息標題盒子 -->
            <div class="newsTitleBox">
                <p><span class="specialFont">最新消息</span></p>
            </div>

            <!-- 最新消息內容盒子  -->
            <!-- 以下為首頁頁面HTML  -->
            <div class="NewsOuterBox" style="position: relative;">

                <ul class="NewsInnerBox">

                    <!-- li有多個,所以使用v-for  -->
                    <li class="NewsItem" v-for="(item, index) in newsList" :key="item.newsURL">
                        <a :href="item.newsURL">
                            <p class="NewsItemDate">{{ item.newsDate }}</p>
                            <p class="NewsItemType">{{ item.newsType }}</p>

                            <p class="NewsItemTitle">{{ item.newTitle }}</p>

                        </a>
                    </li>


                </ul>

                <!-- 
                    分頁插件 total為總資料數(這邊設置20筆),  default-page-size代表每頁顯示資料(預設為10筆,這邊設置為5筆) 
                    current-page當前頁數,官方建議使用v-model與current-page去與自己設定的變量做綁定,
                -->
                <div class="example-pagination-block">
                    <el-pagination layout="prev, pager, next" :total="15" :default-page-size="5"
                        v-model:current-page="currentPage" />
                </div>


            </div>

        </div>
    </section>

</template>


<script setup lang='ts'>

//import { Search,Document } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

//測試數據'


let newsList = reactive([{
    newsURL: "component/news/news20240321.html",
    newsDate: "2024/03/22",
    newsType: "診所公告",
    newTitle: "查詢功能開放"
}, {
    newsURL: "component/news/news20240314.html",
    newsDate: "2024/03/14",
    newsType: "診所公告",
    newTitle: "後台功能新增"
}, {
    newsURL: "component/news/news20240305.html",
    newsDate: "2024/03/05",
    newsType: "診所公告",
    newTitle: "疫苗施打服務"
}, {
    newsURL: "component/news/news20240105.html",
    newsDate: "2024/01/05",
    newsType: "診所公告",
    newTitle: "休診公告"
}, {
    newsURL: "component/news/news20231115.html",
    newsDate: "2023/11/15",
    newsType: "診所公告",
    newTitle: "診所網站開始運行"
},
])


//設定currentPage當前頁數
let currentPage = ref(1)

//監聽當前頁數的變化,如果有更動就call API 獲取數組數據
//之後將資料更新到newsList 響應式的最新消息列表中
watch(currentPage, (value, oldValue) => {

    console.log("原本的newsList", newsList)

    //先創建兩個假數據,用於展示效果
    let oldOneList = [{
        newsURL: "component/news/news20240321.html",
        newsDate: "2024/03/22",
        newsType: "診所公告",
        newTitle: "查詢功能開放"
    }, {
        newsURL: "component/news/news20240314.html",
        newsDate: "2024/03/14",
        newsType: "診所公告",
        newTitle: "後台功能新增"
    }, {
        newsURL: "component/news/news20240305.html",
        newsDate: "2024/03/05",
        newsType: "診所公告",
        newTitle: "疫苗施打服務"
    }, {
        newsURL: "component/news/news20240105.html",
        newsDate: "2024/01/05",
        newsType: "診所公告",
        newTitle: "休診公告"
    }, {
        newsURL: "component/news/news20231115.html",
        newsDate: "2023/11/15",
        newsType: "診所公告",
        newTitle: "診所網站開始運行"
    },
    ]

    let updateList = [{
        newsURL: "component/news/news20240321.html",
        newsDate: "2024/55/55",
        newsType: "診所公告",
        newTitle: "查詢功能開放"
    }, {
        newsURL: "component/news/news20240314.html",
        newsDate: "2024/55/55",
        newsType: "診所公告",
        newTitle: "後台功能新增"
    }, {
        newsURL: "component/news/news20240305.html",
        newsDate: "2024/55/55",
        newsType: "診所公告",
        newTitle: "疫苗施打服務"
    }, {
        newsURL: "component/news/news20240105.html",
        newsDate: "2024/55/55",
        newsType: "診所公告",
        newTitle: "休診公告"
    }, {
        newsURL: "component/news/news20231115.html",
        newsDate: "2024/55/55",
        newsType: "診所公告",
        newTitle: "診所網站開始運行"
    },]

    //當點選到第二頁時才更換數據,非第二頁時更換回原數據
    if (value == 2) {

        //使用Object.assign直接替換newsList 保留響應式
        Object.assign(newsList, updateList)
        console.log("新的newsList", newsList)
    } else {
        //使用Object.assign直接替換newsList 保留響應式
        Object.assign(newsList, oldOneList)
        console.log("新的newsList", newsList)
    }


})


</script>

<style scoped lang="scss">
section {
    width: 100%;

    /**最新消息盒子 */
    .newsBox {
        width: 90%;
        margin: 0 auto;

        /**最新消息Title */
        .newsTitleBox {
            text-align: center;
            margin: 10% auto;
            font-weight: 700;
            font-size: 3.5rem;

            /**特殊字樣式 */
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

        /**最新消息內容盒子 */
        .NewsOuterBox {
            max-width: 1100px;
            margin: 0 auto;

            /**最新消息內容內部盒子 */
            .NewsInnerBox {
                @media screen and (max-width:481px) {
                    padding-left: 5%;
                }

                /**每個消息 */
                .NewsItem {
                    padding: 1%;
                    border-bottom: 1px #888 dashed;
                    transition: 0.2s;

                    &:hover {
                        border-color: #450C73;
                        border-width: 2px;
                        background-color: rgba(183, 183, 183, 0.1);
                    }

                    >a {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }

                    /**消息的日期 */
                    .NewsItemDate {
                        padding: 8px 12px;
                        background-color: #450C73;
                        color: #fff;
                    }

                    /**消息的類型 */
                    .NewsItemType {
                        padding: 8px 12px;
                        margin-left: 5%;
                    }

                    /**消息的標題 */
                    .NewsItemTitle {
                        padding: 8px 12px;
                        margin-left: 5%;

                        @media screen and (max-width:481px) {
                            width: 96px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                        }

                    }



                }
            }

            /**分頁組件引入盒子 */
            .example-pagination-block {

                /**重置分頁組件CSS,將分頁組件置中 */
                .el-pagination {
                    justify-content: center;
                }

                &+& {
                    margin-top: 10px;
                }

                .example-demonstration {
                    margin-bottom: 16px;
                }
            }


        }

    }
}
</style>
