<template>
    <div class="breadcrumbs">
        <div class="temp-box"></div>
        <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">{{ $t('home') }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.firstRoute">{{ props.firstRoute }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.secoundRoute">{{ props.secoundRoute }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps<{
    firstRoute: string | undefined,
    secoundRoute: string | undefined
}>();


</script>
<style lang="scss" scoped>
.breadcrumbs {
    padding: 20px 0;
    max-width: 100vw;
    max-width: 100vw;
    display: flex;

    .breadcrumb {
        display: flex;
        line-height: 100%;
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 0.1rem;
        color: #D5C1C5;
        margin-left: 9.5%;

        :deep(.is-link) {
            &:hover {
                color: #DFB4BD;
            }
        }

        :deep(.el-breadcrumb__inner) {

            color: #DFB4BD;
        }

        img {
            width: 1.4rem;
        }
    }
}
</style>