<template>
    <div class="title-section">
        <p class="title">
            {{ props.title }}
            <!-- Coming Soon -->
        </p>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()
</script>
<style lang="scss" scoped>
.title-section {
    margin: 2rem 0;
    text-align: center;
    position: relative;

    .title {
        font-size: 2.5rem;
        font-weight: bold;
        color: $main-color;
    }

}
</style>