<!--  -->
<template>

    <section class="news-section">

        <div class="news-container">
            <div class="news-title-box">
                <h2 class="news-title">最新消息</h2>
                <div class="news-border"></div>
            </div>
            <div class="news-content">
                <ul class="news-list">
                    <NuxtLink v-for="(item, index) in coreValues" :key="index"
                        :to="{ name: 'news-id', params: { id: item.articleId } }">
                        <li>{{ item.title }}</li>

                    </NuxtLink>
                </ul>

                <div class="news-more">
                    <div class="decorate-img-box">
                        <img src="@/assets/img/blue-polka-dot.png">
                    </div>
                    <div class="more-news-box">
                        <!-- <button class="more-news-btn"  to="news" >MORE NEWS</button> -->
                        <NuxtLink class="more-news-btn" to="news">MORE NEWS></NuxtLink>
                    </div>
                </div>
            </div>

        </div>

    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'
let coreValues = reactive<Record<string, any>>([
    {
        title: "待更新",
        articleId: 123
    },
    {
        title: "待更新",
        articleId: 123
    },
    {
        title: "待更新",
        articleId: 123
    },
    {
        title: "待更新",
        articleId: 123
    },
    {
        title: "待更新",
        articleId: 123
    },
]);

//獲取最新消息的列表,最新的五個
const getNewsLimit = async (page: number, size: number) => {
    let { data: response } = await SSRrequest.get("article/news/pagination", {
        params: {
            page,
            size
        }
    })

    console.log('獲得響應值',response.value)

    // 直接更新 articleList 的值
    if (response.value?.data) {
        coreValues.length = 0
        Object.assign(coreValues, response.value.data.records)
    }

    console.log(coreValues)

}

await getNewsLimit(1, 5)



</script>


<style scoped lang="scss">
.news-section {
    width: 90%;
    margin: 5% auto;


    .news-container {
        width: 100%;

        .news-title-box {
            display: flex;
            justify-content: space-between;
            margin-right: 1rem;

            .news-title {
                color: #727171;
                font-size: 2.5rem;
                font-weight: 500;
                letter-spacing: 0.9rem;

                @media screen and (max-width:850px) {
                    font-size: 2rem;
                }

            }

            .news-border {
                margin-left: 1rem;
                flex: 1;
                border-bottom: 1px solid black;
            }

        }

    }

    .news-content {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
        margin-right: 1rem;


        .news-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            margin-left: 4rem;

            li {
                color: #666666;
                margin-top: 1.5rem;
                display: flex;
                align-items: center;
                font-size: 1rem;
                letter-spacing: 0.3rem;
                //line-height: 2rem;

                &:hover {
                    cursor: pointer;
                    color: #647DBD;
                }

            }

        }

        .news-more {

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .decorate-img-box {
                margin-right: 10rem;
                max-width: 10rem;

                @media screen and (max-width:850px) {
                    margin-left: 2rem;
                    max-width: 6rem;

                }

                img {
                    width: 100%;
                }
            }


            .more-news-box {
                align-self: self-end;

                .more-news-btn {
                    display: inline-block;
                    text-wrap: nowrap;
                    margin-top: 2%;
                    background-color: #C3E2EA;
                    color: #005B7E;
                    border: none;
                    border-radius: 0.7rem;
                    padding: 10%;
                    cursor: pointer;
                    transition: background-color 0.2s;

                    &:hover {
                        background: #C3E2EA;
                        color: #ffffff;
                    }
                }
            }

        }

    }
}
</style>
