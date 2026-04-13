<template>
    <section class="about-us-section">
        <Banner />
        <div class="main-section">
            <Breadcrumbs first-route="About Us" secound-route=""></Breadcrumbs>
            <Title title="Welcome Message"></Title>
            <div class="welcome-box">
                <div class="image-box">
                    <img src="@/assets/img/YeHsiangTang.jpg" alt="">

                    <div class="people-infomation-box">
                        <p class="name">Dr. Ye Hsiang Tang</p>
                        <p class="title">President of TOPBS</p>
                    </div>
                </div>
                <div class="welcome-content">
                    <p class="title">Dear members and distinguished colleagues</p>
                    <p> <span class="first-word">Welcome</span> to the Annual Meeting of the Taiwan Oncoplastic Breast
                        Surgery Society. The
                        development
                        of plastic breast surgery has always been committed to balancing tumor treatment safety and
                        postoperative appearance reconstruction, allowing patients to receive effective treatment while
                        maintaining confidence and quality of life throughout their cancer treatment journey. With the
                        advancement of medical technology and the increasing maturity of interdisciplinary
                        collaboration, continuous academic exchange and clinical experience sharing have become
                        important forces in promoting the improvement of medical quality. &nbsp;
                    </p>
                    <p> <span class="first-word">This</span> year's annual meeting, with the theme "Escalation
                        With Wellness; De-Escalation In
                        Precision," symbolizes an important shift in contemporary breast cancer treatment strategies. In
                        areas requiring aggressive treatment, we strengthen patients' physical and mental health and
                        overall care quality through the integration of medical and reconstruction technology
                        advancements; at the same time, under the support of precision medicine and clinical evidence,
                        we gradually develop more precise and appropriate treatment strategies to avoid overtreatment,
                        making medical decisions more aligned with individual patient needs .&nbsp;
                    </p>
                    <p> <span class="first-word">This</span> annual meeting will feature keynote lectures, clinical case
                        discussions, and practical
                        experience sharing, focusing on breast cancer treatment, oncoplastic surgical techniques,
                        reconstruction strategies, and multidisciplinary integrated care. We hope to provide a platform
                        for in-depth exchange and academic inspiration, promoting the continuous advancement and
                        development of breast surgery in Taiwan.
                    </p>
                    <p> <span class="first-word">We</span> sincerely look forward to gathering with all of you to
                        exchange ideas and work together
                        toward improving the quality of care and future development of breast cancer treatment.</p>
                    <p class="association-name">Taiwan Oncoplastic Breast Surgery Society</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Title from '@/components/layout/Title.vue';

useSeoMeta({
    title: 'President\'s Message - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Read the messages from the presidents of the Taiwan Oncoplastic Breast Surgery Society , welcoming attendees to the TOPBS 2026 conference.',
    keywords: 'President\'s Message,TOPBS,TOPBS 2026,2026 TOPBS,'
})

</script>
<style lang="scss" scoped>
.about-us-section {
    .main-section {
        width: 100%;
        margin: 0 auto;
        color: $main-color;

        @media screen and (max-width: 1024px) {
            width: 80%;
        }
    }


    .welcome-box {
        display: flex;
        gap: 1rem;
        margin: 3.5rem 0;

        @media screen and (max-width: 1024px) {
            flex-direction: column;
        }

        .image-box {
            flex: 1;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;

            img {
                border-radius: 10px;
                overflow: hidden;
                object-fit: contain;
                height: 80%;
                width: 70%;
            }

            .people-infomation-box {
                display: flex;
                flex-direction: column;
                text-align: start;
                background-color: $main-color;
                padding: 1rem;
                border-radius: 10px;
                gap: 1rem;
                width: 65%;

                .name {
                    font-size: 1.2rem;
                    color: white;
                }

                .title {
                    font-size: 1rem;
                    color: white;
                }
            }

        }

        .welcome-content {
            color: $main-text-color;
            flex: 0.8;
            padding: 0 1.5rem;
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            .title {
                font-size: 1.5rem;
                color: $main-color;
            }

            .first-word {
                font-weight: bold;
                font-size: 1.2rem;
            }

            .association-name {
                font-size: 1.2rem;
                color: $main-color;
                font-weight: bold;
            }


            @media screen and (max-width: 1024px) {
                font-size: 1rem;

            }
        }
    }

    .image-box {
        display: flex;
        justify-content: center;
        gap: 2rem;

        @media screen and (max-width: 426px) {
            flex-direction: column;
        }

        .logo-box {
            width: calc(100%/3 - 2rem);
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 426px) {
                width: 100%;
            }

            .logo-name {
                color: $main-color;
                font-size: 1rem;
                text-align: center;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

        .logo-box2 {
            display: flex;
            flex-direction: column;
            width: calc(100%/3 - 2rem);

            @media screen and (max-width: 426px) {
                width: 100%;
            }

            .logo-name {
                color: $main-color;
                font-size: 1.2rem;
                text-align: center;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

    }

}
</style>