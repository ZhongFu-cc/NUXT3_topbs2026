<template>
    <div>
        <main class="common-section">
            <Banner />
            <Breadcrumbs firstRoute="Abstracts" secoundRoute="Presentation Guidelines" />
            <Title title="Presentation Guidelines"></Title>

            <div class="content">
                <!-- <h1 class="sub-title">
                    Presentation Guidelines -->
                <!-- </h1> -->
                <div class="poster">
                    <h1 class="submission-title">[E-Poster Submission]</h1>

                    <p class="list-text">For accepted abstracts, authors must submit an e-poster via the official
                        website of the TOPBS 2026. E-posters will be displayed at the event venue. </p>
                    <ul class="disc-list">
                        <li class="note-text">E-poster Submission Deadline: Friday, September 21, 2026, 23:59 (local
                            time)
                        </li>
                        <li><b>Submission Method:</b> Please <nuxt-link class="link" to="/login">log in</nuxt-link> to
                            the official website of the
                            TOPBS 2026 to upload your e-poster. </li>
                    </ul>
                    <p class="list-text"><b>E-Poster Preparation Guidelines:</b> </p>
                    <ul class="disc-list">
                        <li>All e-posters must be written in English. </li>
                        <li>The topic and first author must be consistent with the accepted abstract. </li>
                        <li>Please download and use the official e-poster template, and upload the PPT file. </li>
                    </ul>

                    <p class="list-text"><b>E-Poster Format Requirements: </b> </p>
                    <ul class="disc-list">
                        <li>Portrait orientation, width must not exceed 1920 pixels. </li>
                        <li>Single-page only. </li>
                        <li>File size is recommended to be under 5MB. </li>
                        <li>File naming format: Abstract Number + First Author’s Name
                            <ul>
                                <li>Example: 001-Da-Ming Lee </li>
                            </ul>
                        </li>
                    </ul>

                </div>

                <div class="video">
                    <h1 class="submission-title">[Video Submission]</h1>
                    <p class="list-text"><b>For accepted abstracts, authors must submit a video file via the official
                            website of the TOPBS 2026. Videos will be displayed at the event venue. </b>
                    </p>
                    <ul class="disc-list">
                        <li class="note-text"><b>Video Submission Deadline:</b> Monday, September 21, 2026, 23:59 (local
                            time) </li>
                        <li><b>Submission Method: </b>Please log in to the official website of the TOPBS 2026 to upload
                            the video. </li>
                    </ul>
                    <p class="list-text"><b>Video Format Requirements: </b> </p>
                    <ul class="disc-list">
                        <li>The topic and first author must be consistent with the accepted abstract.</li>
                        <li>Language: English narration </li>
                        <li>Duration: No more than 7 minutes </li>
                        <li>File size: Not exceeding 500MB </li>
                        <li>Format: MP4 </li>
                        <li>Resolution: 1920x1080</li>
                        <li>Aspect Ratio: Landscape 16:9 </li>
                        <li>File naming format: Abstract Number + First Author’s Name
                            <ul>
                                <li>Example: 001-Da-Ming Lee </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="oral">
                    <h1 class="submission-title">[Oral Presentation for Award Winners]</h1>
                    <p class="list-text">Authors of awarded posters and videos are required to give an oral presentation
                        at the TOPBS 2026. </p>
                    <ul>
                        <li class="note-text"><b>Date:</b> Saturday, November 14, 2026 </li>
                        <li><b>Time:</b>Specific presentation times will be announced along with the list of awardees.
                        </li>
                        <li><b>Venue:</b>1st Floor, Taipei International Convention Center
                            <ul>
                                <li>Address: 1st Floor, No. 1, Section 5, Xinyi Road, Xinyi District, Taipei City 110,
                                    Taiwan </li>
                            </ul>
                        </li>
                        <li><b>Language:</b>English</li>
                        <li><b>Presentation Duration:</b>8 minutes</li>
                        <li><b>Presentation Order:</b> To be announced to selected presenters</li>
                    </ul>
                </div>
            </div>

        </main>
    </div>
</template>
<script lang="ts" setup>
import Title from '@/components/layout/Title.vue';
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';

useSeoMeta({
    title: 'Presentation Guidelines - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Learn about the presentation guidelines for the TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society. Understand the requirements for oral presentations, posters, and videos.',
    keywords: 'Presentation Guidelines,TOPBS,TOPBS 2026,2026 TOPBS'
})

</script>
<style lang="scss" scoped>
.common-section {
    margin: $common-section-margin;
    font-family: $common-section-font-family;

    .content {
        width: 60%;
        margin-inline: auto;
        font-size: 1.5rem;
        line-height: 2.5rem;





        .reminder {
            margin: 1rem 0;
            font-size: 1rem;
            line-height: normal;
        }

        .submission-title {
            margin-top: 4rem;
            text-align: center;
        }


        h2 {
            font-size: 2rem;
        }



        .disc-list {
            list-style-type: disc;
        }

        .no-type-list {
            list-style: none;
        }

        .decimal-list {
            list-style-type: decimal;
        }

        .square-list {
            list-style: square;
        }


        .list-text {
            padding: 1rem 0 0 1rem;
            font-size: 1.3rem;
            line-height: normal;
        }

        .main-list {
            list-style-type: decimal-leading-zero;
        }



        .note-text {
            color: #DE6A75;
        }

        .sub-title {
            margin-top: 4rem;
            font-size: 1.5rem;
            font-weight: bold;
            color: $accent-hover-bg;
        }

        .submission-title {
            font-weight: bold;
            color: $accent-hover-bg;
        }

        .review-process-table {
            width: 100%;
            border-collapse: collapse;
            // margin: 2rem 0;

            td {
                padding: 1rem;
                border: 1px solid black;
                text-align: center;
                font-size: 1.2rem;
                line-height: normal;
            }
        }

        .link {
            color: #2667B9;
            text-decoration: underline;
        }



        @media screen and (max-width: 486px) {
            width: 90%;
        }
    }

}
</style>