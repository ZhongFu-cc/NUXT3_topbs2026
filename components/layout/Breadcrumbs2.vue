<template>
    <div class="breadcrumbs">
        <div class="temp-box"></div>
        <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item class="go-back-router" @click="goBack">{{ props.firstRoute }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ props.secoundRoute }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script lang="ts" setup>
    import { ArrowRight } from '@element-plus/icons-vue'

    const router = useRouter();

    const goBack = () => {
        router.go(-1);
    }

    const props = defineProps<{
        firstRoute: string,
        secoundRoute: string
    }>();


</script>
<style lang="scss" scoped>
.breadcrumbs {
    padding: 20px 0;
    max-width: 100vw;
    max-width: 100vw;
    background-color: #EAEAE9;
    display: flex;
    .breadcrumb {
        display: flex;
        line-height: 100%;
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 0.1rem;
        color: $main-content-color;
        width: 1047.6px;
        @media screen and (max-width: 1100px) {
            width: 682.8px;
            
        }
        @media screen and (max-width: 850px) {
            width: 70%;
            margin-left: 13%;
            
        }
        margin: 0 auto;
       :deep(.is-link) {
            &:hover {
                color: $main-color;
            }
       }
       .go-back-router {
           :deep(.el-breadcrumb__inner){
            cursor: pointer;
            &:hover {
                color: $main-color;
            }
        }
       }
    }
}
</style>