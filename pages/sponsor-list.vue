<template>
    <div class="common-section">
        <Banner></Banner>
        <!-- <Title title="贊助廠商"></Title> -->
        <!-- <h1 class="title">感謝下列廠商熱情贊助!!</h1> -->
        <!-- <img src="../assets/img/sponsor_list.png" alt=""> -->
        <!-- <div class="image-section">
            <div v-for="(group, groupIndex) in groupedImages" :key="groupIndex" class="image-group">
                <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                    <img :src="image" alt="Sponsor Image" />
                </span>
            </div>
        </div> -->



    </div>
</template>
<script lang="ts" setup>
import Title from '@/components/layout/Title.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Banner from '@/components/layout/Banner.vue';

useSeoMeta({
    title: 'Sponsors - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Explore the list of sponsors for the TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society. This page is currently under construction, but stay tuned for updates showcasing the esteemed sponsors who support and contribute to the success of the conference.',
    keywords: 'Sponsors,TOPBS Sponsors,TOPBS,TOPBS 2026,2026 TOPBS '
})

const modules = import.meta.glob('../assets/img/ticbcs_sponsor_logo/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });
const sponsorImages = ref<string[]>(Object.values(modules));
const groupedImages = ref<string[][]>([]);

watch(sponsorImages, (newValue) => {
    sponsorImages.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!groupedImages.value[groupIndex]) {
            groupedImages.value[groupIndex] = [];
        }
        groupedImages.value[groupIndex].push(image);
    });
}, { immediate: true });




</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .title {
        font-size: 2.5rem;
        font-weight: 700;
        color: $main-color;
        margin: 0rem 0 1rem 0;
    }

    .image-section {
        width: 60%;
    }

    .image-group {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        .image-item {
            width: 30%;

            img {
                width: 100%;
                height: auto;
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>