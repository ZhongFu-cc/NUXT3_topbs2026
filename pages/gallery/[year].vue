<template>
    <div class="common-section">
        <Banner></Banner>
        <Title :title="`Gallery ${year}`"></Title>

        <div class="gallary-box">
            <NuxtImg v-for="image in images" :key="image.id" :src="image.src" :alt="image.alt" densities="x1 x2"
                width="200" class="gallery-image" loading="lazy" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Title from '@/components/layout/Title.vue';
import Banner from '~/components/layout/Banner.vue';

useSeoMeta({
    title: 'Gallery - TOPBS Taiwan Oncoplastic Breast Surgery Society',
    description: 'Browse the gallery of images from the TOPBS Taiwan Oncoplastic Breast Surgery Society. Explore memories from the conference.',
    keywords: 'Gallery,TOPBS,TOPBS 2026,2026 TOPBS'
})

const route = useRoute();
const year = route.params.year as string;
const imageLength = 36;
const imageUrl = ref(`/img/${year}-WEBP`);

const images = computed(() => {
    return Array.from({ length: imageLength }, (_, i) => ({
        id: i + 1,
        src: `${imageUrl.value}/${year}-${i + 1}.webp`,
        alt: `圖片${i + 1}`
    }))
})


</script>
<style lang="scss" scoped>
.common-section {
    // padding: 2rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .gallary-box {
        width: 80%;
        display: grid;
        gap: 1rem;
        justify-content: center;
        margin: 1rem 0 3rem 0;

        grid-template-columns: repeat(1, 1fr);

        @media (min-width: 480px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 780px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media (min-width: 1080px) {
            grid-template-columns: repeat(6, 1fr);
        }

        img {
            width: 100%;
            max-width: 200px;
            justify-self: center;
            height: auto;
            border-radius: 8px;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
</style>