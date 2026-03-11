<!--  -->
<template>
    <section class="article-list-section">

        <el-breadcrumb :separator-icon="ArrowRight" class="article-list-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/medical-knowledge' }">醫學新知</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="type-title-box">
            <p>醫學新知</p>
        </div>

        <!-- 文章盒子  -->
        <div class="articleBox">

            <!-- 遍歷文章數組 -->
            <div class="articleItem" v-for="(item, index) in articleList.records" :key="item.articleId">
                <nuxt-link :to="{ name: 'medical-knowledge-id', params: { id: item.articleId } }">
                    <div class="itemImgBox">
                        <img :src="'/minio/' + item.coverThumbnailUrl" class="">
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

        </div>


        <!-- 
        分頁插件 total為總資料數(這邊設置20筆),  default-page-size代表每頁顯示資料(預設為10筆,這邊設置為5筆) 
        current-page當前頁數,官方建議使用v-model與current-page去與自己設定的變量做綁定,
        -->
        <div class="example-pagination-block news-pagination">
            <el-pagination layout="prev, pager, next" :page-count="Number(articleList.pages)"
                :default-page-size="Number(articleList.size)" v-model:current-page="currentPage"
                :hide-on-single-page="true" />
        </div>



    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

//設定分頁組件,currentPage當前頁數
let currentPage = ref(1)

//當前文章資料
let articleList = reactive({
    pages: '1',
    size: '10',
    records: [
        {
            articleId: '1',
            coverThumbnailUrl: '/scuro/default-image/cta-img-1.jpg',
            tag: '這是醫療新知tag',
            date: '2024/10/14',
            title: '淺談雷射包皮雕塑手術',
            introduction: ''
        }

    ]
})

//獲取所有醫療新知的資料
const getArticleList = async (page: number, size: number) => {
    let { data: response } = await SSRrequest.get('article/medicalKnowledge/pagination', {
        params: {
            page,
            size
        }
    })

    // 直接更新 articleList 的值
    if (response.value?.data) {
        Object.assign(articleList, response.value.data)
    }

}

await getArticleList(currentPage.value,6)

//監聽當前頁數的變化,如果有更動就call API 獲取數組數據
watch(currentPage, (value, oldValue) => {
    getArticleList(value, 6)
})





</script>


<style scoped lang="scss">
.article-list-section {
    margin: 3% auto;
    font-family: initial;

    .article-list-breadcrumb {
        margin: 0 8%;
    }

    /** 重寫麵包屑導航樣式 */

    :deep(.el-breadcrumb) {
        font-size: 1rem;
        letter-spacing: 0.1rem;
    }

    :deep(.el-breadcrumb__inner.is-link:hover) {
        color: var(--el-text-color-regular);
    }

    :deep(.el-breadcrumb__inner.is-link) {
        color: #242B64;
    }

    :deep(.el-breadcrumb__separator) {
        color: #242B64;
    }

    .type-title-box {
        margin: 1% 0 2% 0;
        font-size: 2rem;
        background: #F2F2F2;
        color: #1C2B6E;
        letter-spacing: 0.2rem;
        padding: 1% 0;

        p {
            margin-left: 8%;
            font-weight: 550;
        }
    }

    //衛教文章外部盒子
    .articleBox {
        margin: 2% auto;
        width: 88%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        //所有a連結沒有下底線
        a {
            text-decoration: none;
        }

        //每篇文章
        .articleItem {
            border: 2px solid #C3E1EA;
            margin: 2% 1%;
            width: 30%;
            max-width: 400px;


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
