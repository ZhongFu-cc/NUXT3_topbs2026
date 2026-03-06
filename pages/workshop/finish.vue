<template>
    <div class="form-finish-box">
        <Banner></Banner>

        <div class="success-page">

            <div class="success-container">
                <div class="icon-wrapper">
                    <!-- 可以使用 icon 或 emoji，這裡用 SVG 做一個勾勾 -->
                    <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>

                <h1>報名成功！</h1>
                <p class="subtitle">
                    感謝您的填寫，我們已經收到您的資料。<br />
                </p>

                <div class="actions">
                    <NuxtLink to="/" class="btn btn-primary">
                        回到首頁
                    </NuxtLink>

                    <!-- 如果你有其他常見操作，也可以加在這裡 -->
                    <!-- <button class="btn btn-outline" @click="goBack">返回上一頁</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import Banner from '@/components/layout/Banner.vue';
// 可選：如果想從上一頁帶一些狀態過來顯示客製化訊息
// const route = useRoute()
// const message = route.query.message as string || '我們已收到您的表單！'
const router = useRouter()
const returnEcPay = async () => {
    let res = await CSRrequest.post(`/temp-workspace/payment`)
}

onMounted(() => {
    returnEcPay()
})

</script>

<style scoped lang="scss">
.success-page {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background: var(--background-color, #f8f9fa);
}

.success-container {
    text-align: center;
    max-width: 480px;
    width: 100%;
    padding: 3rem 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.icon-wrapper {
    margin-bottom: 2rem;
}

.success-icon {
    width: 80px;
    height: 80px;
    color: #28a745;
    /* 綠色成功色 */
    margin: 0 auto;
    animation: checkmark 0.8s ease-out forwards;
}

@keyframes checkmark {
    0% {
        stroke-dashoffset: 50;
    }

    100% {
        stroke-dashoffset: 0;
    }
}

h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
}

.subtitle {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
    margin-bottom: 2.5rem;
}

.actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;

    @media (min-width: 480px) {
        flex-direction: row;
    }
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 2rem;
    font-size: 1.05rem;
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
}

.btn-primary {
    background: #0066cc;
    color: white;
    border: none;

    &:hover {
        background: #0055b3;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 102, 204, 0.2);
    }
}

.btn-outline {
    background: transparent;
    border: 2px solid #0066cc;
    color: #0066cc;

    &:hover {
        background: #0066cc;
        color: white;
    }
}
</style>