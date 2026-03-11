<template>
    <el-sub-menu v-if="item.children && item.children.length" :index="'/' + props.routePath + '/' + item.articleCategoryId">
        <template #title>
            <span>{{ item.name }}</span>
        </template>
        <template v-for="child in item.children" :key="child.articleCategoryId">
            <!-- 這裡調用自身組件進行遞歸 -->
            <RecursiveMenu :item="child" :routePath="props.routePath" />
        </template>
    </el-sub-menu>

    <nuxt-link v-else  :to="`/${props.routePath}/${item.articleCategoryId}`">

        <el-menu-item :index="'/' + routePath + '/' + item.articleCategoryId" >{{ item.name }}</el-menu-item>
        
    </nuxt-link>


</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 定義接收的 props
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    routePath: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped >


</style>