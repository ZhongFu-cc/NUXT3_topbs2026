<template>
    <div>
        <main class="common-section">
            <Banner></Banner>
            <Breadcrumbs firstRoute="About" secoundRoute="List of Sponsors"></Breadcrumbs>
            <Title title="List of Sponsors"></Title>

            <div class="content">
                <div class="level-box" v-if="diamondSponsors">
                    <div class="level-svg-box">
                        <img :src="diamondSponsors.imgSrc" alt="level">
                    </div>
                    <div v-for="sponsorLogoList in diamondSponsors.sponsorLogos" class="diamond-sponsor-logo-box">
                        <div v-for="logo in sponsorLogoList" class="sponsor-logo-item">
                            <img :src="logo" alt="logo">
                        </div>
                        <div v-for="sponsorLogoList in diamondSponsors.sponsorLogos" class="diamond-sponsor-logo-box">
                            <div v-for="logo in sponsorLogoList" class="sponsor2-logo-item">
                                <img src="../assets/img/sponsors/diamond2/1_Sankyo.png" alt="logo">
                                <img src="../assets/img/sponsors/diamond2/2_AZ.png" alt="logo">
                            </div>
                        </div>
                    </div>
                    <el-divider></el-divider>
                </div>



                <div v-if="sponsorsList && sponsorsList.length > 0" v-for="(sponsor, index) in sponsorsList" class="level-box">
                    <div class="level-svg-box">
                        <img v-if="sponsor.imgSrc" :src="sponsor.imgSrc" alt="level">
                    </div>
                    <div v-for="(sponsorLogoList, index) in sponsor.sponsorLogos" class="sponsor-logo-box">
                        <div v-for="logo in sponsorLogoList" class="sponsor-logo-item"
                            :class="sponsor.level === 'None Level Sponsor' ? 'none-level-sponsor-logo-item' : ''">
                            <img :src="logo" alt="logo">
                        </div>
                    </div>
                    <el-divider v-if="index < sponsorsList.length - 1"></el-divider>
                </div>
            </div>
        </main>

    </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Banner from '@/components/layout/Banner.vue'
import Title from '@/components/layout/Title.vue'

import DiamondLogo from '../assets/img/sponsors/level-svg/TOPBS&IOPBS_diamond.png'
import PlatinumLogo from '../assets/img/sponsors/level-svg/TOPBS&IOPBS_platinum.png'
import GoldLogo from '../assets/img/sponsors/level-svg/TOPBS&IOPBS_gold.png'
import SilverLogo from '../assets/img/sponsors/level-svg/TOPBS&IOPBS_silver.png'
import BronzeLogo from '../assets/img/sponsors/level-svg/TOPBS&IOPBS_bronze.png'

useSeoMeta({
    title: 'List of Sponsors - 9th IOPBS & TOPBS 2025 International Conference on Oncoplastic Breast Surgery',
    description: 'Explore the list of sponsors for the 9th IOPBS & TOPBS 2025 International Conference on Oncoplastic Breast Surgery. This page is currently under construction, but stay tuned for updates showcasing the esteemed sponsors who support and contribute to the success of the conference.',
    keywords: 'List Of Sponsors, Sponsors, 9th IOPBS, IOPBS 2025, TOPBS 2025, 2025 IOPBS, 2025 TOPBS '
})

const sponsorConfig = [
    { key: 'diamond Sponsor', path: '@/assets/img/sponsors/diamond/*.{png,jpg,svg,jpeg}' },
    { key: 'platinum Sponsor', path: '@/assets/img/sponsors/platinum/*.{png,jpg,svg,jpeg}' },
    { key: 'gold Sponsor', path: '@/assets/img/sponsors/gold/*.{png,jpg,svg,jpeg}' },
    { key: 'silver Sponsor', path: '@/assets/img/sponsors/silver/*.{png,jpg,svg,jpeg}' },
    { key: 'bronze Sponsor', path: '@/assets/img/sponsors/bronze/*.{png,jpg,svg,jpeg}' },
    { key: 'none level Sponsor', path: '@/assets/img/sponsors/none-level/*.{png,jpg,svg,jpeg}' }
]

const cols = ref(4);

const screenWidth = ref(0);

onMounted(() => {
    generateSponsorlogoList()
    screenWidth.value = window.innerWidth;
    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;

        if (screenWidth.value <= 425) {
            cols.value = 1;
        } else if (screenWidth.value <= 810) {
            cols.value = 2;
        } else if (screenWidth.value <= 1024) {
            cols.value = 3;
        } else {
            cols.value = 4;
        }
        generateSponsorlogoList()
    });

});

const allGroupedSponsors = ref<any[]>([]);
const diamondSponsors = ref<any>({});
const sponsorsList = ref<any[]>([]);

const generateSponsorlogoList = () => {

    allGroupedSponsors.value = sponsorConfig.map(config => {
        const results: Record<string, string[][]> = {};

        sponsorConfig.forEach(config => {


            let modules: Record<string, string>;

            switch (config.key) {
                case 'diamond Sponsor':
                    modules = import.meta.glob('@/assets/img/sponsors/diamond/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
                    break;
                case 'platinum Sponsor':
                    modules = import.meta.glob('@/assets/img/sponsors/platinum/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
                    break;
                case 'gold Sponsor':
                    modules = import.meta.glob('@/assets/img/sponsors/gold/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
                    break;
                case 'silver Sponsor':
                    modules = import.meta.glob('@/assets/img/sponsors/silver/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
                    break;
                case 'bronze Sponsor':
                    modules = import.meta.glob('@/assets/img/sponsors/bronze/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
                    break;
                case 'none level Sponsor':
                    modules = import.meta.glob('@/assets/img/sponsors/none-level/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
                    cols.value = 7;
                    break;
                default:
                    modules = {};
                    break;
            }

            const galleryImages: string[] = Object.values(modules);
            const groupedList: string[][] = [];

            galleryImages.forEach((image, index) => {
                const groupIndex = Math.floor(index / cols.value);
                if (!groupedList[groupIndex]) {
                    groupedList[groupIndex] = [];
                }
                groupedList[groupIndex].push(image);
            });

            results[config.key] = groupedList;
        });
        return results;
    })

    diamondSponsors.value = {
        level: 'Diamond Sponsor',
        imgSrc: DiamondLogo,
        sponsorLogos: allGroupedSponsors.value[0]['diamond Sponsor']
    }

    sponsorsList.value = [

        {
            level: 'Platinum Sponsor',
            imgSrc: PlatinumLogo,
            sponsorLogos: allGroupedSponsors.value[1]['platinum Sponsor']
        },
        {
            level: 'Gold Sponsor',
            imgSrc: GoldLogo,
            sponsorLogos: allGroupedSponsors.value[2]['gold Sponsor']
        },
        {
            level: 'Silver Sponsor',
            imgSrc: SilverLogo,
            sponsorLogos: allGroupedSponsors.value[3]['silver Sponsor']
        },
        {
            level: 'Bronze Sponsor',
            imgSrc: BronzeLogo,
            sponsorLogos: allGroupedSponsors.value[4]['bronze Sponsor']
        },
        {
            level: 'None Level Sponsor',
            imgSrc: '',
            sponsorLogos: allGroupedSponsors.value[5]['none level Sponsor']
        }
    ]

}


</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;


    .content {
        margin: 1rem auto;
        text-align: center;
        width: 90%;

        .level-box {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 2rem;

            .level-svg-box {
                width: 10rem;
                height: auto;

                img {
                    width: 100%;
                    height: auto;
                }

                @media screen and (max-width: 810px) {
                    width: 8rem;
                }
            }

            .sponsor-logo-box {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                flex-wrap: wrap;
                margin-top: 1rem;

                .sponsor-logo-item {
                    width: calc(100% / 4 - 2rem);
                    height: auto;

                    img {
                        width: 90%;
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: cover;

                    }

                    @media screen and (max-width:1024px) {
                        width: calc(100% / 3 - 2rem);
                    }

                    @media screen and (max-width:810px) {
                        width: calc(100% / 2 - 2rem);
                    }

                    @media screen and (max-width:425px) {
                        width: calc(100% - 2rem);
                    }
                }

                .none-level-sponsor-logo-item {
                    // margin-top: 7rem;
                    width: calc(100% / 8 - 1rem) !important;
                    
                    @media screen and (max-width: 1024px) {
                        width: calc(100% / 8 - 1rem) !important;
                    }

                    @media screen and (max-width: 810px) {
                        width: calc(100% / 5 - 1rem) !important;
                    }

                    @media screen and (max-width: 425px) {
                        width: calc(100% / 3 - 1rem) !important;
                    }
                }


            }

            .diamond-sponsor-logo-box {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                flex-wrap: wrap;
                margin-top: 1rem;



                .sponsor-logo-item {
                    width: calc(100% / 1.7 - 1rem);
                    height: auto;



                    img {
                        width: 90%;
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: cover;

                    }

                    @media screen and (max-width:1024px) {
                        width: 100%;
                    }

                    @media screen and (max-width: 425px) {
                        display: none;
                        width: calc(100%);

                    }


                }




                .sponsor2-logo-item {
                    width: calc(100% / 1.5 - 1rem);
                    height: auto;
                    display: none;

                    img {
                        width: 90%;
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: cover;

                    }

                    // @media screen and (max-width: 1024px) {
                    //     display: flex;
                    //     justify-content: center;
                    //     width: calc(100% / 2 - 2rem);

                    // }

                    // @media screen and (max-width: 810px) {
                    //     display: flex;
                    //     justify-content: center;
                    //     width: calc(100% / 2 - 1rem);

                    // }

                    @media screen and (max-width: 425px) {
                        display: block;
                        width: calc(100% - 1rem);

                    }


                }


            }
        }

    }
}

.el-divider {
    border-width: 10px;
}
</style>