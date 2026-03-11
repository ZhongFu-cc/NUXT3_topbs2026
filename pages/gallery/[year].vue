<template>
    <div class="common-section">
        <!-- <img src="../assets/img/sponsor_list.png" alt=""> -->
         <Title :title="title"></Title>
        <!-- <div class="title">{{ title }}</div>/ -->

        <div class="2023-gallery" v-if="year === '2023'">
                <div class="gallery">
                    <div v-for="(group, groupIndex) in grouped2023Day1List" :key="groupIndex" class="image-group">
                        <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                            <img :src="image" alt="Sponsor Image" />
                        </span>
                    </div>
                </div>
        
                <div class="gallery">
                    <div v-for="(group, groupIndex) in grouped2023Day2List" :key="groupIndex" class="image-group">
                        <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                            <img :src="image" alt="Sponsor Image" />
                        </span>
                    </div>
                </div>
        </div>
       
        <div class="2023-gallery" v-if="year === '2024'">
                <div class="gallery">
                    <div v-for="(group, groupIndex) in grouped2024Day1List" :key="groupIndex" class="image-group">
                        <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                            <img :src="image" alt="Sponsor Image" />
                        </span>
                    </div>
                </div>
        
                <div class="gallery">
                    <div v-for="(group, groupIndex) in grouped2024Day2List" :key="groupIndex" class="image-group">
                        <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                            <img :src="image" alt="Sponsor Image" />
                        </span>
                    </div>
                </div>
        </div>




        <div class="2025-gallery" v-if="year === '2025'">
            <div class="gallery">
                <div v-for="(group, groupIndex) in grouped2025Day1List" :key="groupIndex" class="image-group">
                    <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                        <img :src="image" alt="Sponsor Image" />
                    </span>
                </div>
            </div>
            <div class="gallery">
                <div v-for="(group, groupIndex) in grouped2025Day2List" :key="groupIndex" class="image-group">
                    <span v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
                        <img :src="image" alt="Sponsor Image" />
                    </span>
                </div>
            </div>
        </div>




    </div>
</template>
<script lang="ts" setup>
import Title from '@/components/layout/Title.vue';

const year = useRoute().params.year as string;
console.log('year',typeof year);
onMounted(() => {
    // document.title = `Gallery - ${year}`;
    console.log('Gallery page mounted for year:', year);
});

const title = ref(`Gallery - ${year}`);


const cols = ref(6);


const handleResize = () => {
    console.log('handleResize', window.innerWidth);
    if (window.innerWidth < 768) {
        cols.value = 2;
    } else if (window.innerWidth < 1024) {
        cols.value = 3;
    } else {
        cols.value = 6;
    }

    switch (year) {
        case '2025':
            grouped2025Day1();
            grouped2025Day2();
            break;
        case '2024':
            // groupImages2();
            grouped2024Day1();
            grouped2024Day2();
            break;
        case '2023':
            group2023Day1();
            group2023Day2();
            break;
        default:
            console.warn('Unsupported year:', year);
    }

    // group2023Day1();
    // groupImages2();
};

const grouped2025Day1List = ref<string[][]>([]);
const grouped2025Day1 = () => {
    grouped2025Day1List.value = []; // 清空之前的分組
    let modules = import.meta.glob('@/assets/img/gallery2025/day1/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

    const galleryImages = ref<string[]>(Object.values(modules) as string[]);
    galleryImages.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / cols.value);
        if (!grouped2025Day1List.value[groupIndex]) {
            grouped2025Day1List.value[groupIndex] = [];
        }
        grouped2025Day1List.value[groupIndex].push(image);
    });
}

const grouped2025Day2List = ref<string[][]>([]);
const grouped2025Day2 = () => {
    grouped2025Day2List.value = []; // 清空之前的分組
    let modules = import.meta.glob('@/assets/img/gallery2025/day2/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

    const galleryImages = ref<string[]>(Object.values(modules) as string[]);
    galleryImages.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / cols.value);
        if (!grouped2025Day2List.value[groupIndex]) {
            grouped2025Day2List.value[groupIndex] = [];
        }
        grouped2025Day2List.value[groupIndex].push(image);
    });
}
const grouped2024Day1List = ref<string[][]>([]);
const grouped2024Day1 = () => {
    grouped2024Day1List.value = []; // 清空之前的分組
    let modules = import.meta.glob('@/assets/img/gallery2024/day1/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

    const galleryImages = ref<string[]>(Object.values(modules) as string[]);
    galleryImages.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / cols.value);
        if (!grouped2024Day1List.value[groupIndex]) {
            grouped2024Day1List.value[groupIndex] = [];
        }
        grouped2024Day1List.value[groupIndex].push(image);
    });
}

const grouped2024Day2List = ref<string[][]>([]);
const grouped2024Day2 = () => {
    grouped2024Day2List.value = []; // 清空之前的分組
    let modules = import.meta.glob('@/assets/img/gallery2024/day2/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

    const galleryImages = ref<string[]>(Object.values(modules) as string[]);
    galleryImages.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / cols.value);
        if (!grouped2024Day2List.value[groupIndex]) {
            grouped2024Day2List.value[groupIndex] = [];
        }
        grouped2024Day2List.value[groupIndex].push(image);
    });
}



const grouped2023Day1List = ref<string[][]>([]);


const group2023Day1 = () => {
    grouped2023Day1List.value = []; // 清空之前的分組
    const modules1 = import.meta.glob('@/assets/img/ticbcs_gallery/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

    const galleryImages1 = ref<string[]>(Object.values(modules1) as string[]);
    galleryImages1.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / cols.value);
        if (!grouped2023Day1List.value[groupIndex]) {
            grouped2023Day1List.value[groupIndex] = [];
        }
        grouped2023Day1List.value[groupIndex].push(image);
    });
};

const grouped2023Day2List = ref<string[][]>([]);
const group2023Day2 = () => {
    grouped2023Day2List.value = []; // 清空之前的分組
    const modules1 = import.meta.glob('@/assets/img/ticbcs_gallery2/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

    const galleryImages1 = ref<string[]>(Object.values(modules1) as string[]);
    galleryImages1.value.forEach((image, index) => {
        const groupIndex = Math.floor(index / cols.value);
        if (!grouped2023Day2List.value[groupIndex]) {
            grouped2023Day2List.value[groupIndex] = [];
        }
        grouped2023Day2List.value[groupIndex].push(image);
    });
};







// const modules2 = import.meta.glob('@/assets/img/ticbcs_gallery2/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });

// const galleryImages2 = ref<string[]>(Object.values(modules2) as string[]);

// const groupedImages2 = ref<string[][]>([]);


// const groupImages2 = () => {
//     groupedImages2.value = []; // 清空之前的分組
//     galleryImages2.value.forEach((image, index) => {
//         const groupIndex = Math.floor(index / cols.value);
//         if (!groupedImages2.value[groupIndex]) {
//             groupedImages2.value[groupIndex] = [];
//         }
//         groupedImages2.value[groupIndex].push(image);
//     });
// };


onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始調用以設置列數
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});



</script>
<style lang="scss" scoped>
.common-section {
    margin: $common-section-margin;
    width: $common-section-width;
    font-family: $common-section-font-family;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0rem 0 1rem 0;
    }

    .gallery {
        margin-top: 1rem;
        border-width: 0px 0 1px 0;
        border-style: solid;
        border-color: #D3D3D3;


        .image-group {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 2rem;
            margin-bottom: 1rem;
            width: 100%;
            min-width: 100%;

            .image-item {
                width: calc(100% / 6 - 2rem);

                img {
                    width: 100%;
                    height: auto;
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: cover;
                }

                
                
            }
            @media screen and (max-width: 768px) {
                // width: calc(100% / 2 - 2rem);
                justify-content: center ;
                .image-item {
                    // width: calc(100% / 2 );
                    flex: 1;
                }
            }

            @media screen and (max-width: 1024px) {
                // width: calc(100% / 3 - 2rem);
                justify-content: center;

                .image-item {
                    width: calc(100% / 3 - 2rem);
                }
            }
        }
    }

}
</style>