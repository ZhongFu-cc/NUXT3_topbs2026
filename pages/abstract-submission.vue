<template>
    <div>
        <main class="common-section">
            <Breadcrumbs firstRoute="Abstracts" secoundRoute="Abstracts submission"></Breadcrumbs>
            <Title :title="'1'"></Title>
        </main>

    </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Title from '@/components/layout/Title.vue';
</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .title {
        margin-left: 7.4%;
        font-size: 2.5rem;
        color: $main-color;
    }
    .content {
        margin: 1rem auto;
        text-align: center;
        h1 {
            font-size: 2rem;
        }
    }
}
</style>