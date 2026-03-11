<!--  -->
<template>

    <!-- <h1>我是單篇新聞文章路由</h1>
    <p>{{ route.params.id }}</p> -->

    <section class="article-section">

        <el-breadcrumb :separator-icon="ArrowRight" class="article-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/education-surgery' }">手術衛教</el-breadcrumb-item>
            <el-breadcrumb-item>{{ article.type }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="type-title-box">
            <p>{{ article.type }}</p>
        </div>

        <div class="title-box">
            <div class="title">{{ article.title }}</div>
            <div class="announcementDate">{{ article.announcementDate }}</div>
        </div>

        <div class="article-content ck-content" v-html="htmlContent">

        </div>
    </section>

</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'
import 'ckeditor5/ckeditor5.css';
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute();

//預設假資料
const article = reactive({
    type: '一般公告',
    title: '靜態展示-113年中秋休診公告',
    announcementDate: '2024-10-08'
})
const htmlContent = ref('')

const getArticle = async () => {
    let { data: response } = await SSRrequest.get(`article/show/${route.params.id}`)

    // 直接更新 articleList 的值
    if (response.value?.data) {
        Object.assign(article, response.value.data)
        htmlContent.value = response.value.data.content
    }

}

await getArticle()

</script>

<style scoped lang="scss">
.article-section {
    margin: 3% auto;
    font-family: initial;

    .article-breadcrumb {
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
        color: #1C2B6D;
        letter-spacing: 0.2rem;
        padding: 1% 0;

        p {
            margin-left: 8%;
            font-weight: 550;
        }
    }

    .title-box {
        margin: 0 8%;
        margin-bottom: 2%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1%;
        border-bottom: 1px #686A69 solid;
        font-size: 1.2rem;
        color: #242B64;


        .title {
            letter-spacing: 0.2rem;

        }

    }

    .article-content {
        margin: 0 8%;
    }

}
</style>
