<template>
    <div>
        <main class="common-section">
            <Banner></Banner>
            <Breadcrumbs firstRoute="Abstract" secoundRoute="Submission Guidelines"></Breadcrumbs>
            <Title title="Submission Guidelines"></Title>

            <div class="content">
                <h1 class="">Important Dates</h1>

                <div class="important-date-info">
                    <ul class="disc-list">
                        <li class="note-text">Abstract Submission Deadline: August 21, 2026 (Friday)</li>
                        <li>Abstract Acceptance Notification: September 7, 2026 (Monday)</li>
                        <li>Electronic Poster and Video Upload Deadline: September 21, 2026 (Monday)</li>
                    </ul>
                </div>

                <div class="review-process">
                    <!-- <h1>Review Process</h1> -->
                    <br>
                    <table class="review-process-table">
                        <tbody>
                            <tr>
                                <td rowspan="2">Initial Review </td>
                                <td>April 17 - August 21 </td>
                                <td>Submit abstracts online after complete registration on the official website </td>
                            </tr>

                            <tr>
                                <td>August 22 - September 6 </td>
                                <td>Abstracts will be reviewed by the committee </td>
                            </tr>
                        </tbody>


                        <tbody>
                            <tr>
                                <td rowspan="4">
                                    Final Review </td>
                                <td>September 7 </td>
                                <td>Notification of accepted abstracts</td>
                            </tr>

                            <tr>
                                <td>September 7 - September 21</td>
                                <td>E-poster & video upload to the official website. </td>
                            </tr>

                            <tr>
                                <td>September 22 - October 6 </td>
                                <td>Committee reviews accepted e-posters and videos to select award winners </td>
                            </tr>
                            <tr>
                                <td>October 8 </td>
                                <td>Announcement of award winners</td>
                            </tr>

                        </tbody>


                        <tbody>
                            <tr>
                                <td>Oral Presentation and Award Ceremony </td>
                                <td>November 14 </td>
                                <td>Award winners will give oral presentations and receive awards on the event day</td>
                            </tr>
                            <tr>
                                <td>Exhibition of Selected Abstract </td>
                                <td>November 14 - November 15 </td>
                                <td>All selected e-posters and videos will be displayed at the event venue. </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div class="abstract-submission-box">
                    <h1 class="submission-title">[Abstract Submission]</h1>

                    <div class="submission-guidelines-box">
                        <h2>01. Abstract Submission Process </h2>
                        <ul class="secondstep-list">
                            <li><b>Step 1：</b>Register and <nuxt-link class="link" to="/login">Login</nuxt-link>.
                            </li>

                            <li><b>Step 2：</b> Complete online registration before submitting an abstract.
                            </li>
                            <li><b>Step 3：</b> Click on "Abstract" → "Abstract Submission" on the website, fill in the
                                required information, and upload your abstract. </li>
                            <li><b>Step 4：</b> Confirm the submission success notification via email. </li>
                        </ul>
                    </div>

                    <div class="submission-guidelines-box">
                        <h2>02. Abstract Format </h2>
                        <p class="list-text">Only PDF files submitted via the official website are accepted. Submissions
                            via email, mail, or fax will not be accepted. </p>

                        <ul class="disc-list">
                            <li>Title: Tahoma font, 14pt size; only the first word, proper nouns, and abbreviations are
                                capitalized; do not use abbreviations.
                            </li>
                            <li>Body: Purpose, Methods, Results, Conclusion; Tahoma font, 11pt size; line spacing 18pt;
                                margins 1.5 cm; no figures, tables, references, or keywords. </li>
                            <li>Up to 30 authors; list institutions starting with hospitals, followed by universities.
                            </li>
                            <li>If an author is affiliated with both a hospital and a university, please enter the name
                                of the hospital they serve. </li>
                        </ul>
                    </div>

                    <div class="submission-guidelines-box">
                        <h2>03. Submission Notes </h2>
                        <ul class="disc-list">
                            <li>The presenter must be the first author, and each abstract is limited to one presenter.
                            </li>
                            <li>All fields in the online submission form must be completed. </li>
                            <li>The abstract title should reflect the research topic and must not include results or
                                conclusions. </li>
                            <li>Commercial names may be used in the abstract body, but must include the ® symbol. </li>
                            <li>If abbreviations are used in the abstract title or body, they must be defined. </li>
                            <li>Authors must select the award category they wish to apply for, but the final decision
                                will be made by the TOPBS 2026 committee. </li>
                        </ul>
                    </div>

                    <div class="submission-guidelines-box">
                        <h2>04. Conflict of Interest Disclosure </h2>
                        <ul class="disc-list">
                            <li>All authors must disclose any potential conflicts of interest at the time of submission
                            </li>
                            <li>The presenting author is responsible for collecting and submitting information for all
                                co-authors
                            </li>
                        </ul>
                    </div>

                    <div class="submission-guidelines-box">
                        <h2>05. Notifications of acceptance will be sent via email and announced on the website member
                            page </h2>
                        <ul class="disc-list">
                            <li>Acceptance notifications will be sent via email. </li>
                            <li>All abstracts will be reviewed by the committee according to the standard review
                                process. </li>
                            <li>The committee reserves the final decision on abstract acceptance
                                .
                            </li>
                        </ul>
                    </div>


                    <div class="submission-guidelines-box">
                        <h2>06. Abstract Modification or Withdrawal </h2>
                        <ul class="disc-list">
                            <li>Abstracts will be withdrawn if registration is not completed. </li>
                            <li>Abstracts can be modified online before the submission deadline. </li>
                            <li>To modify an accepted abstract, please contact the TOPBS 2026 Secretariat via email
                                within 36 hours of receiving the acceptance notification. </li>
                        </ul>
                    </div>

                    <div class="submission-guidelines-box">
                        <h2>07. Other Submission Policies </h2>
                        <ul class="disc-list">
                            <li>Abstracts submitted to TOPBS 2026 must not have been previously published in
                                peer-reviewed journals or presented at other conferences.</li>
                            <li>Submission of encore abstract is not allowed; for follow-up studies, new data must be
                                included. </li>
                            <li>Abstracts submitted in violation of the rules or after the deadline will be rejected and
                                returned.
                            </li>
                            <li>Submission implies that the first and co-authors agree to grant usage rights, ensure
                                data accuracy, and take responsibility for communication. </li>

                        </ul>
                    </div>
                </div>

                <p class="reminder note-text">TOPBS 2026 reserves the right to modify the event rules and program
                    content. In case of any dispute, TOPBS 2026 holds the final decision. </p>
            </div>
        </main>

    </div>
</template>
<script setup lang="ts">
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'

useSeoMeta({
    title: 'Submission Guidelines - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Explore the submission guidelines for the TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society. This page provides detailed information on abstract submission, important dates, review process, and more.',
    keywords: 'Submission Guideline,TOPBS,TOPBS 2026,2026 TOPBS'
})

</script>
<style lang="scss" scoped>
.common-section {
    margin: $common-section-margin;
    font-family: $common-section-font-family;

    .content {
        width: 65%;
        margin-inline: auto;
        font-size: 1.5rem;
        line-height: 2.5rem;

        .title {
            padding: 2rem 4rem 2rem 0;
            font-size: 2.5rem;
        }

        .important-date-info {
            border: $accent-color 1px solid;
            padding: 2rem;

            ul {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                font-size: 1.5rem;
            }
        }

        .reminder {
            margin: 1rem 0;
            font-size: 1rem;
            line-height: normal;
        }

        .submission-title {
            margin-top: 4rem;
            text-align: center;
        }

        .step-box-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem 2rem 2rem;
            border-radius: 1rem;
            gap: 2rem;
            width: 100%;

            .step-box {
                display: flex;
                border: 1px solid #DE6A75;
                border-radius: 10px;
                padding: 1rem;
                min-width: 30%;
                justify-content: center;

                .step {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    h3 {
                        background-color: #DE6A75;
                        padding: 0.3rem 0.5rem;
                        border-radius: 5px;
                        font-weight: normal;
                        color: white;
                    }

                    p {
                        position: relative;

                    }
                }
            }
        }

        h2 {
            font-size: 2rem;
        }

        .step-list {
            list-style-type: decimal;

            .step-list-item {
                white-space: pre-wrap;
            }
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

        .shadow-divider {
            // width: 85%;
            height: 2px;
            margin: 1rem auto;
            background-image: repeating-linear-gradient(to right,
                    #CDCBCB,
                    #CDCBCB 30px,
                    transparent 5px,
                    transparent 50px);
        }


        .submission-guidelines-box {
            margin-top: 4rem;
        }

        .list-text {
            padding: 1rem 0 0 1rem;
            font-size: 1.3rem;
            line-height: normal;
        }

        .main-list {
            list-style-type: decimal-leading-zero;
        }



        .third-list {
            padding-left: 4rem;
            font-size: 1.2rem;
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