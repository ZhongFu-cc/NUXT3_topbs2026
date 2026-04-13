<template>
    <div class="news-item-section">
        <Banner />
        <div v-if="isActive" class="main-box">
            <Breadcrumbs :title="'News Item'" first-route="News" :secound-route="newsItem.title" />

            <div class="news-item-box">
                <h1 class="title">{{ newsItem.title }}</h1>
                <p class="date">{{ newsItem.announcementDate }}</p>
                <div v-html="newsItem.content" class="content-box ck-content"></div>
                <div class="file-download-box">
                    <a v-for="item in articleFileList" class="download-link" :href="envMinio + item.path"
                        target="_blank">
                        <!-- <i class="el-icon-document"></i> -->
                        <!-- <el-icon><ElIconDownload /></el-icon> -->
                        {{ item.name + getFileExtension(item.path) }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'

import 'ckeditor5/ckeditor5.css';

const router = useRouter()
const articleId = useRoute().params.id

const isActive = ref(false)

const  getFileExtension = (path:string) => {
    let extension = path.split('.').pop();
    return extension ? `.${extension}` : '';
  }

watch(() => articleId, (newVal) => {
    console.log(newVal)
    getNewsItem()
})

const newsItem = reactive<any>({});
watch(() => newsItem, (newVal) => {
    isActive.value = true
    console.log(newVal)
}, {
    deep: true
})


const getNewsItem = async () => {
    let res = await CSRrequest.get(`/article/group/${articleId}`, {
        params: {
            articleId: articleId
        }
    })
    Object.assign(newsItem, res.data)
    console.log(res.data)
}

const envMinio = useRuntimeConfig().public.minio


const articleFileList = reactive<any[]>([])
const getArticleFile = async () => {
    console.log(articleId)
    let res = await CSRrequest.get(`/article-attachment/${articleId}`)
    console.log(res)
    Object.assign(articleFileList, res.data)
}

onMounted(() => {
    getNewsItem()
    getArticleFile()
})
</script>
<style lang="scss" scoped>
.news-item-section {
    .main-box {
        width: 90%;
        margin: 0 auto;

        .title {
            display: flex;
            justify-content: center;
            font-size: 2rem;

        }

        .date {
            display: flex;
            justify-content: flex-end;
            color: #CC8761;

        }

        .content-box {
            margin-top: 2rem;
            width: 80%;
            margin-inline: auto;
            // justify-content: center;
        }
    }

    .file-download-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 2rem;
        width: 80%;
        margin-inline: auto;

    }

    .download-link {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-decoration: none;
        margin: 1rem;
        max-width: fit-content;
        // width: 80%;

        &:hover {
            // color: #000;
            // scale: 1.1 ;
            // transform: scaleY(1.05);
            transform: translateY(-10px);
            transition: all 0.3s ease-in-out;
        }

        i {
            margin-right: 0.5rem;
        }
    }
}
</style>