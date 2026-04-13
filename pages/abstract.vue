<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs firstRoute="Member" secoundRoute="Abstract" />
        <Title title="Abstract" />

        <div class="paper-section">
            <div class="paper-table-box">
                <table class="paper-table">
                    <thead>
                        <tr class="table-header">
                            <th v-if="isShowAll">{{ $t('type') }}</th>
                            <th>{{ $t('abstractTitle') }}</th>
                            <th v-if="isShowAll">{{ $t('firstAuthor') }}</th>
                            <th>{{ $t('status') }}</th>
                            <th>{{ $t('action') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(paper, index) in paperList" :key="index"
                            :class="[index === paperList.length - 1 ? 'last-row' : '', isEvenOrOdd(Number(index))]">
                            <td v-if="isShowAll" :class="isShowAll ? 'first-col' : ''">{{ paper.absType }}</td>
                            <td class="paper-title" :class="!isShowAll ? 'first-col' : ''">{{ paper.absTitle }}</td>
                            <td v-if="isShowAll">{{ paper.firstAuthor }}</td>
                            <td>
                                <span v-if="paper.status === 1" class="status-accepted">{{ $t('accepted') }}</span>
                                <span v-else-if="paper.status === 2" class="status-rejected">{{ $t('rejected') }}</span>
                            </td>
                            <td class="last-col">
                                <el-button v-if="!isDisabled" link class="edit-btn" @click='headToEditPaper(paper)'>{{
                                    $t('edit') }}</el-button>
                                <el-button link class="see-more-btn" @click='toggleSeeMore(paper)'>{{ $t('view')
                                }}</el-button>
                                <el-button v-if="!isDisabled" link class="see-more-btn" @click='deletePaper(paper)'>{{
                                    $t('delete') }}</el-button>
                                <!-- <el-button v-if="isDisabled" link class="see-more-btn" @click='isClosed'>{{ $t('delete') }}</el-button> -->
                                <el-button v-if="paper.status === 1" link class="see-more-btn"
                                    :disabled="isUploadDisabled" @click="headToUploadFile(paper)">{{ $t('upload')
                                    }}</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <el-button class="go-submit-btn" :disabled="isDisabled" @click="headToSubmit">
                {{ $t('abstractSubmission') }}
            </el-button>
        </div>


        <el-dialog class="paper-info" v-model="isOpen" :width="dialogWidth">
            <table class="paper-info-table">
                <thead>
                    <tr>
                        <td colspan="2" class="column-name title">{{ $t('abstract') }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paperInfo.publicationNumber">
                        <td class="column-name">{{ $t('abstractNumber') }}</td>
                        <td>{{ paperInfo.publicationNumber }}</td>
                    </tr>
                </tbody>
                <!-- 發表方式 -->
                <tbody>
                    <tr v-if="paperInfo.presentationType">
                        <td class="column-name">Presentation Type</td>
                        <td>{{ paperInfo.presentationType }}</td>
                    </tr>
                </tbody>
                <!-- 發表時間 -->
                <tbody>
                    <tr v-if="paperInfo.reportTime">
                        <td class="column-name">Report Time</td>
                        <td>{{ paperInfo.reportTime }}</td>
                    </tr>
                </tbody>
                <!-- 發表地點 -->
                <tbody>
                    <tr v-if="paperInfo.reportLocation">
                        <td class="column-name">Report Location</td>
                        <td>{{ paperInfo.reportLocation }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('abstractType') }}</td>
                        <td>{{ paperInfo.absType }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('abstractTitle') }}</td>
                        <td>{{ paperInfo.absTitle }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('firstAuthor') }}</td>
                        <td>{{ paperInfo.firstAuthor }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-if="paperInfo.absType === 'Young Investigator'">
                        <td class="column-name">{{ $t('firstAuthorBirthday') }}</td>
                        <td>{{ paperInfo.firstAuthorBirthday }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('speaker') }}</td>
                        <td>{{ paperInfo.speaker }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('speakerAffiliation') }}</td>
                        <td>{{ paperInfo.speakerAffiliation }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('correspondingAuthor') }}</td>
                        <td>{{ paperInfo.correspondingAuthor }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('correspondingAuthorMail') }}</td>
                        <td>{{ paperInfo.correspondingAuthorEmail }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('correspondingAuthorPhone') }}</td>
                        <td>{{ paperInfo.correspondingAuthorPhone }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('allAuthors') }}</td>
                        <td>{{ paperInfo.allAuthor }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('allAuthorsAffiliation') }}</td>
                        <td>{{ paperInfo.allAuthorAffiliation }}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('abstractFile') }}</td>
                        <td v-if="envMinio + paperInfo.FileUpload">
                            <a class="preview-link" :href="envMinio + paperInfo.paperFileUpload[0].path"
                                target="_blank">Preview</a>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td class="column-name">{{ $t('abstractStatus') }}</td>
                        <td v-if="paperInfo.status">
                            <span v-if="paperInfo.status === 1" class="status-accepted">{{ $t('accepted') }}</span>
                            <span v-else-if="paperInfo.status === 2" class="stat s-rejected">{{ $t('rejected') }}</span>
                        </td>
                    </tr>
                </tbody>

            </table>
        </el-dialog>
    </main>
</template>
<script lang="ts" setup>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Title from '@/components/layout/Title.vue';
import Banner from '@/components/layout/Banner.vue';




const router = useRouter();
/**----------------------------------------- */
const memberInfo = reactive<any>({});
const getMemberInfo = async () => {
    let res = await CSRrequest.get('/member/getMemberInfo');
    if (res.code === 200) {
        Object.assign(memberInfo, res.data);
    } else {
        localStorage.removeItem('Authorization-member');
        router.push('/login');
    }
}
/**------------------------------------------ */
const paperList = reactive<any>([]);
const getPapperList = async () => {
    let res = await CSRrequest.get('/paper/owner');
    Object.assign(paperList, res.data);
}
/**------------------------------------------ */


const headToEditPaper = (paper: any) => {
    router.push(`/abstract-item/${paper.paperId}`)
}

const headToUploadFile = (paper: any) => {
    router.push(`/abstract-file/${paper.paperId}`)
}

const isOpen = ref(false);
const paperInfo = ref<any>({});
const toggleSeeMore = (paper: any) => {
    isOpen.value = true;
    Object.assign(paperInfo.value, paper);
}

const envMinio = useRuntimeConfig().public.minio

const isEvenOrOdd = (index: number) => {
    return index % 2 === 0 ? 'even' : 'odd'
}

const dialogWidth = ref('65%')
const isShowAll = ref(true);
const setShowAll = () => {
    if (window.innerWidth < 1200) {
        isShowAll.value = false; // 當視窗寬度小於 1024px 時，設置為 'top'
        dialogWidth.value = '90%'
    } else {
        isShowAll.value = true; // 否則設置為 'left'
        dialogWidth.value = '65%'
    }
}

const deletePaper = async (paper: any) => {
    ElMessageBox.confirm('Are you sure you want to delete this paper?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
    }).then(async () => {
        let res = await CSRrequest.delete(`/paper/owner/${paper.paperId}`,);
        console.log(res);
        if (res.code === 200) {
            ElMessage.success('Deleted successfully');
            paperList.length = 0;
            getPapperList();
        } else {
            ElMessage.error('Deleted failed');
        }
    }).catch(() => {
        ElMessage.info('Deletion cancelled');
    });
}

const isDisabled = ref(false);


const isClosed = () => {
    ElMessage.error('The submission period has ended, can not be deleted');
}

const headToSubmit = () => {
    if (isDisabled.value) {
        ElMessage.error('The submission period has ended, can not be submitted');
    } else {
        router.push('/abstract-submission');
    }
}

const validateDateTime = async () => {
    isDisabled.value = !(await useSetting().validateDateTime('abstractSubmissionEndTime'));

}

// 2026/04/07 新增

// 默認關閉二階段上傳按鈕，只有在審核通過且在上傳時間內才會開啟
const isUploadDisabled = ref(true);
const validateUploadDateTime = async () => {
    isUploadDisabled.value = !(await useSetting().isWithinSlideUploadPeriod());
}



/**------------------------------------------ */
onMounted(async () => {
    getMemberInfo();
    getPapperList();
    window.addEventListener('resize', setShowAll);

    nextTick(() => {
        validateDateTime();
        validateUploadDateTime();
    })
})


</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .paper-section {
        width: 100%;
        margin: 2rem auto;
        background: url('assets/img/topbs_background-image.jpg') center center;
        padding: 3rem 0;

    }

    .submit-btn {
        margin-left: 80%;
        margin-top: 20px;
    }

    .paper-table-box {
        width: 90%;
        background-color: white;
        margin: 0 auto;
        border-radius: 15px;
        padding: 1rem;

        .paper-table {
            width: 90%;
            margin: 0 auto;
            font-size: 1rem;
            // border-collapse: separate;
            border-spacing: 0;

            tr {

                th {
                    padding: 1rem;
                    text-align: left;
                    font-size: 1.3rem;
                    // border-bottom: 1px solid #ccc;
                }

                td {
                    padding: 1rem;
                    text-align: left;
                }

                .paper-title {
                    max-width: 20rem;
                    width: 20rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

            }

            .first-col {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            .last-col {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                display: flex;
            }

            .status-unreviewed {
                color: gray;
                border: 1px solid gainsboro;
                border-radius: 5px;
                padding: 0.2rem 0.5rem;
                font-weight: bold;
            }

            .status-accepted {
                color: rgb(77, 151, 77);
                border: 1px solid green;
                border-radius: 5px;
                padding: 0.2rem 0.5rem;
                font-weight: bold;
            }

            .status-rejected {
                color: red;
                border: 1px solid red;
                border-radius: 5px;
                padding: 0.2rem 0.5rem;
                font-weight: bold;
            }

            .even {
                td {
                    background-color: #E8979E;
                    color: white;
                    font-weight: bold;
                }

                .see-more-btn {
                    border: 1px solid white;
                    color: white;
                    padding: 0.3rem;
                    min-width: 3rem;

                    &:hover {
                        color: black;
                        transform: scale(1.05);
                        transition: all 0.3s ease-in-out;
                    }
                }

                .edit-btn {
                    border: 1px solid white;
                    color: white;
                    padding: 0.3rem;
                    min-width: 3rem;

                    &:hover {
                        color: black;
                        transform: scale(1.05);
                        transition: all 0.3s ease-in-out;
                    }
                }


            }

            .odd {
                td {
                    background-color: white;
                    color: #E8979E;
                    font-weight: bold;
                }



                .see-more-btn {
                    border: 1px solid #E8979E;
                    color: #E8979E;
                    padding: 0.3rem;
                    min-width: 3rem;

                    &:hover {
                        transform: scale(1.05);
                        transition: all 0.3s ease-in-out;
                        color: black;
                    }
                }

                .edit-btn {
                    border: 1px solid #E8979E;
                    color: #E8979E;
                    padding: 0.3rem;
                    min-width: 3rem;

                    &:hover {
                        color: black;
                        transform: scale(1.05);
                        transition: all 0.3s ease-in-out;
                    }
                }
            }

            // @media screen and (min-width: 1920px) {
            //     font-size: 1.5rem;
            // }




            @media screen and (max-width: 1023px) {
                font-size: 1rem;

                tr {

                    th {
                        font-size: 1.8rem;
                        padding: 0.5rem;
                        text-align: left;
                    }

                    td {
                        padding: 0.5rem;
                        text-align: left;

                        .status-unreviewed {
                            color: gray;
                            border: 1px solid gainsboro;
                            border-radius: 5px;
                            padding: 0.2rem 0.5rem;
                            font-weight: bold;
                        }

                        .status-accepted {
                            color: rgb(77, 151, 77);
                            border: 1px solid green;
                            border-radius: 5px;
                            padding: 0.2rem 0.5rem;
                            font-weight: bold;
                        }

                        .status-rejected {
                            color: red;
                            border: 1px solid red;
                            border-radius: 5px;
                            padding: 0.2rem 0.5rem;
                            font-weight: bold;
                        }
                    }

                    .paper-title {
                        max-width: 40rem !important;
                    }

                }



                .see-more-btn {
                    margin: 0;
                    min-width: 3rem;
                }

                .edit-btn {
                    margin: 0;
                    min-width: 3rem;
                }

                .last-col {
                    // flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
            }

            @media screen and (max-width: 767px) {
                tr {
                    .paper-title {
                        max-width: 18rem !important;
                    }
                }

            }
        }


    }

    .paper-info {
        .paper-info-table {
            width: 100%;
            border: 1px solid #ccc;
            border-collapse: collapse;
            margin: 0 auto;
            font-size: 1.3rem;

            @media screen and (max-width: 1048px) {
                font-size: 1rem;
            }

            @media screen and (max-width: 368px) {
                font-size: 0.8rem;

            }

            tr {
                border: 1px solid #ccc;

                td {
                    padding: 1rem;
                    text-align: left;
                    border: 1px solid #ccc;
                }

                .column-name {
                    font-weight: bold;
                    background-color: #f2f2f2;
                    width: 30%;

                    @media screen and (max-width: 1048px) {
                        width: 20%;
                    }


                }

                .status-unreviewed {
                    color: gray;
                    font-weight: bold;
                }

                .status-accepted {
                    color: rgb(77, 151, 77);
                    font-weight: bold;
                }

                .status-rejected {
                    color: red;
                    font-weight: bold;
                }

                .preview-link {
                    color: #007bff;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                .title {
                    font-size: 2rem;
                    font-weight: bold;
                    text-align: center;
                    background-color: #E8979E;
                    color: white;
                }
            }
        }

    }

    .go-submit-btn {
        width: 20%;
        margin: 2rem auto;
        display: block;
        background-color: #E8979E;
        color: white;
        border-radius: 5px;

        &:hover {
            color: white;
            transform: scale(1.05);
            transition: all 0.3s ease-in-out;
        }

        @media screen and (max-width: 767px) {
            width: 80%;
            font-size: 1.2rem;
        }
    }

}
</style>