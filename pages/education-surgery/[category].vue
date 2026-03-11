<!--  -->
<template>
    <!-- 文章盒子  -->
    <div class="articleBox">


        <!-- 如果article.records裡面超過一篇文章 , 遍歷文章數組 -->
        <template v-if="articleList.records.length > 0">
            <div class="articleItem" v-for="(item, index) in articleList.records" :key="item.articleId">
                <nuxt-link :to="{ name: 'education-surgery-article-id', params: { id: item.articleId } }">
                    <div class="itemImgBox">
                        <img :src="'/minio' + item.coverThumbnailUrl" class="">
                    </div>
                    <div class="itemInfo">
                        <!-- <div>
                        <span class="tag">{{ item.tag }}</span>
                        <span class="date">{{ item.date }} </span>
                    </div> -->
                        <div class="title">{{ item.title }}</div>
                        <p class="introduction">
                            {{ item.introduction }}
                        </p>
                    </div>
                </nuxt-link>
            </div>
        </template>

        <!-- 如果沒有顯示為空 -->
        <el-empty class="empty-status" v-else description="目前沒有文章" />


        <!-- 
            分頁插件 total為總資料數(這邊設置20筆),  default-page-size代表每頁顯示資料(預設為10筆,這邊設置為5筆) 
            current-page當前頁數,官方建議使用v-model與current-page去與自己設定的變量做綁定,
        -->
        <div class="article-list-pagination">
            <el-pagination layout="prev, pager, next" :page-count="Number(articleList.pages)"
                :default-page-size="Number(articleList.size)" v-model:current-page="currentPage"
                :hide-on-single-page="true" />
        </div>

    </div>

</template>

<script setup lang='ts'>

import { ref } from 'vue'


const route = useRoute()
const group = 'educationSurgery'
let currentPage = ref(1)

// 初始化 articleList 為正確的結構
let articleList = reactive<Record<string, any>>({
})


const getArticleList = async (page: number, size: number) => {
    let { data: response } = await SSRrequest.get(`article/${group}/${route.params.category}/pagination`, {
        params: {
            page,
            size
        }
    })

    console.log('獲取文章列表', response.value)

    // 直接更新 articleList 的值
    if (response.value?.data) {
        Object.assign(articleList, response.value.data)
    }
}

// 初始化時立即獲取數據
await getArticleList(currentPage.value, 6)

// 監聽分頁變化
watch(currentPage, (value, oldValue) => {
    console.log('監聽中新值', value)
    getArticleList(currentPage.value, 6)
})



</script>

<style scoped lang="scss">
//衛教文章外部盒子
.articleBox {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    //空狀態下,顯示沒文章
    .empty-status {
        width: 100%;

    }

    //所有a連結沒有下底線
    a {
        text-decoration: none;
    }

    //每篇文章
    .articleItem {
        border: 2px solid #C3E1EA;
        width: 27%;
        max-width: 400px;
        min-height: 250px;
        margin: 0 0 2% 5%;

        @media screen and (max-width:850px) {
            max-width: none;
            max-height: none;
            width: 42%;

            // min-width: 200px;
            // min-height: 100px;
        }

        @media screen and (max-width:450px) {
            margin: 5% 0;
        }


        //手機視口RWD響應
        @media screen and (max-width:481px) {
            width: 100%;
        }

        //當滑鼠碰到這篇文章時,改變字體顏色+圖片放大
        &:hover {
            .itemInfo {
                color: #49BADE;
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
            width: 100%;
            aspect-ratio: 3 / 2;
            transition: 0.5s;
            object-position: top center;

        }
    }

    //文章內容
    .itemInfo {
        padding: 10px;
        line-height: 22px;

        .title {
            color: #1C2B6E;
            text-align: left;
            font-weight: 550;
            font-size: 1rem;

            @media screen and (max-width:850px) {
                font-size: 1.3rem;
            }
        }

        .introduction {
            //多行文字超出3行時隱藏,這是一整套的不能拆開使用
            //除非必要效果不然建議少用,避免移動端或者特殊瀏覽器無法正常顯示
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 3;
        }

        //類型與日期, 日期將自身往右推5px
        .date {
            margin-left: 5px;
        }

    }

    /**分頁組件引入盒子 */
    .article-list-pagination {
        width: 100%;

        /**
        使用Vue3 element plus 專屬的改變UI組件CSS 寫法 '深層覆蓋'
        分頁組件引入盒子,重置分頁組件CSS 
        */
        :deep(.el-pagination) {

            justify-content: center;

            //重製將分頁組件背景色調為 '無'
            .el-pager li {
                background: none !important;
            }

            //按鈕背景色改成 '無'
            button {
                background: none !important;
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
</style>
