<template>
    <main class="common-section" v-loading="loading">
        <Banner></Banner>
        <Breadcrumbs firstRoute="Abstract" secoundRoute="Abstract Submission"></Breadcrumbs>
        <Title title="Abstract Submission"></Title>

        <el-form class="form" ref="formRef" :model="data" :rules="formRules" labelPosition="top">
            <ClientOnly>
                <div class="main-form">
                    <div class="left-seciton">
                        <el-form-item :label="$t('abstractType')" prop="absType">
                            <el-select v-model="data.absType" placeholder="Type">
                                <el-option v-for="item in abstractTypes" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('abstractTitle')" prop="absTitle">
                            <el-input v-model="data.absTitle" :placeholder="$t('abstractTitle')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('firstAuthor')" prop="firstAuthor">
                            <el-input v-model="data.firstAuthor" :placeholder="$t('firstAuthor')"></el-input>
                        </el-form-item>

                        <el-form-item v-if="data.absType === 'Young Investigator'" :label="$t('firstAuthorBirthday')"
                            prop="firstAuthorBirthday">
                            <el-date-picker v-model="data.firstAuthorBirthday" :placeholder="$t('firstAuthorBirthday')"
                                value-format="YYYY-MM-DD"></el-date-picker>
                        </el-form-item>

                        <el-form-item :label="$t('speaker')" prop="speaker">
                            <el-input v-model="data.speaker" :placeholder="$t('speaker')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('speakerEmail')" prop="speakerEmail">
                            <el-input v-model="data.speakerEmail" :placeholder="$t('speakerEmail')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('speakerAffiliation')" prop="speakerAffiliation">
                            <el-input v-model="data.speakerAffiliation"
                                :placeholder="$t('speakerAffiliation')"></el-input>
                        </el-form-item>
                    </div>
                    <div class="right-section">
                        <el-form-item :label="$t('correspondingAuthor')" prop="correspondingAuthor">
                            <el-input v-model="data.correspondingAuthor"
                                :placeholder="$t('correspondingAuthor')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('correspondingAuthorMail')" prop="correspondingAuthorEmail">
                            <el-input v-model="data.correspondingAuthorEmail"
                                :placeholder="$t('correspondingAuthorMail')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('correspondingAuthorPhone')" prop="correspondingAuthorPhone">
                            <el-input v-model="data.correspondingAuthorPhone"
                                :placeholder="$t('correspondingAuthorPhone')"></el-input>
                        </el-form-item>
                        <el-form-item class="allAuthors" :label="$t('allAuthors1')" prop="allAuthor">
                            <el-input type="textarea" v-model="data.allAuthor"
                                :placeholder="$t('allAuthors')"></el-input>
                        </el-form-item>
                        <el-form-item class="allAuthors" :label="$t('allAuthorsAffiliation1')"
                            prop="allAuthorAffiliation">
                            <el-input type="textarea" v-model="data.allAuthorAffiliation"
                                :placeholder="$t('allAuthorsAffiliation')"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div class="file-upload">
                    <el-form-item label="Pdf File" prop="fileList">
                        <el-upload ref="uploadRef" class="upload-demo" :limit="1" :on-change="handlePdfUpload"
                            :auto-upload="false" :on-remove="handleRemove" :on-exceed="handleExceed">
                            <el-button size="small" type="primary">{{ $t('upload') }}</el-button>
                            <div slot="tip" class="el-upload__tip">{{ $t('uploadLimit') }}</div>
                        </el-upload>
                    </el-form-item>
                </div>

                <el-form-item label="" prop="submit">
                    <el-button class="submit-btn" type="primary" @click="submit(formRef)">{{ $t('submit') }}</el-button>
                </el-form-item>
            </ClientOnly>
        </el-form>
    </main>
</template>

<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus';
import { handleFileExceed, handleFileRemove, handleFileUpload, type UploadOptions } from '@/utils/upload';
import { formRulesEN } from '@/utils/formRules';

const { t } = useI18n();
const { isLogin, checkLoginState, memberInfo } = useAuth();

useSeoMeta({
    title: 'Abstract Submission - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Welcome to the abstract submission page for the TOPBS (Taiwan Oncoplastic Breast Surgery Society) Conference 2026. Submit your abstracts for poster, video, or young investigator presentations and be part of this prestigious event in Taipei.',
    keywords: 'Abstract Submission,TOPBS,TOPBS 2026,2026 TOPBS'
})

interface AbstractInterface {
    memberId?: number;
    absType: string;
    absTitle: string;
    firstAuthor: string;
    firstAuthorBirthday: string;
    speaker: string;
    speakerEmail: string;
    speakerAffiliation: string;
    correspondingAuthor: string;
    correspondingAuthorEmail: string;
    correspondingAuthorPhone: string;
    allAuthor: string;
    allAuthorAffiliation: string;
    fileList: UploadUserFile[];
}

const router = useRouter();

const abstractTypes = ref([
    { label: t('posterPresentation'), value: 'Poster Presentation' },
    { label: t('videoPresentation'), value: 'Video Presentation' },
    { label: t('youngInvestigator'), value: 'Young Investigator' },
])

const formRef = ref<FormInstance>();
const data = reactive<AbstractInterface>({
    absType: 'Poster Presentation',
    absTitle: '',
    firstAuthor: '',
    firstAuthorBirthday: '',
    speaker: '',
    speakerEmail: '',
    speakerAffiliation: '',
    correspondingAuthor: '',
    correspondingAuthorEmail: '',
    correspondingAuthorPhone: '',
    allAuthor: '',
    allAuthorAffiliation: '',
    fileList: [],
})

const uploadOptions = ref<UploadOptions>({
    fileType: ['pdf'],
    fileMaxSize: 1024 * 1024 * 20, // 20MB
    fileLimit: 1
})

const handleRemove = handleFileRemove(data.fileList);
const handleExceed: UploadProps['onExceed'] = handleFileExceed(uploadOptions.value, data.fileList);
const handlePdfUpload: UploadProps['onChange'] = handleFileUpload(uploadOptions.value, data.fileList);


const formRules = ref<FormRules>(formRulesEN)

const loading = ref(false);
const submitData = new FormData();

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    data.memberId = memberInfo.value.memberId;
    formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true;
            const { fileList, ...restData } = data;
            submitData.append('data', JSON.stringify(restData));
            data.fileList.forEach((file: any) => {
                submitData.append('files', file.raw);
            })
            let res = await CSRrequest.post('/paper', {
                body: submitData
            });
            if (res.code === 200) {
                ElNotification.success({
                    title: 'Submitted',
                    message: 'Your abstract has been submitted successfully!',
                    type: 'success',
                    duration: 3000,
                })
                loading.value = false;
                router.push('/member-center');
            } else if (res.code === 400 || res.code === 500) {
                ElNotification.error({
                    title: 'Failed',
                    message: `Your abstract submission failed! ${res.msg}`,
                    type: 'error',
                    duration: 3000,
                })
            } else {
                ElNotification.error({
                    title: 'Failed',
                    message: 'Unknown error!',
                    type: 'error',
                    duration: 3000,
                })
            }
            loading.value = false;
        } else {
            return false;
        }
    })
}

const { setting } = useSetting();
watch(() => setting.value, () => {
    if (setting.value && !setting.value.isAbstractSubmissionOpen) {
        router.push("/member-center");
        ElNotification.warning({
            title: 'Closed',
            message: 'Abstract submission is closed',
            type: 'warning',
            duration: 3000,
        })
    }
}, { immediate: true })


// console.log('setting', setting.value)

const listenKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        submit(formRef.value);
    }
}

const init = () => {
    if (isLogin.value && memberInfo.value) {
        data.speaker = memberInfo.value.firstName + ' ' + memberInfo.value.lastName;
        data.speakerAffiliation = memberInfo.value.affiliation;
        data.speakerEmail = memberInfo.value.email;
    }
}



onMounted(() => {
    init();
    if (!isLogin.value) {
        router.push("/login");
        ElMessage.error('Please log in first');
    }

    window.addEventListener('keydown', listenKeydown);
})

onUnmounted(() => {
    window.removeEventListener('keydown', listenKeydown);
})
</script>

<style lang="scss" scoped>
.form {
    width: 80%;
    margin: 1rem auto;
    font-weight: 600;

    .member-title {
        display: flex;
        align-items: center;

        :deep(.el-form-item__label) {
            margin: 0 1rem 0 0;
            text-align: center;
        }
    }

    .main-form {
        display: flex;
        gap: 5rem;
        text-wrap: nowrap;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 2rem;
        }

        .left-seciton {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .right-section {
            flex: 1;
            display: flex;
            flex-direction: column;

            .category {
                :deep(.el-radio-group) {
                    flex-direction: column;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                :deep(.el-form-item__error) {
                    position: absolute;
                    top: 0.5rem;
                    left: 10rem;

                    @media screen and (max-width: 768px) {
                        left: 13rem;
                    }
                }

                :deep(.el-select) {
                    width: 150px;
                }
            }
        }
    }

    .file-upload {
        :deep(.el-form-item__content) {
            .el-upload {
                display: flex;
                flex-direction: column;
                text-align: start;
                align-items: flex-start;

                .el-button {
                    &:hover {
                        transform: scale(1.05);
                        transition: all 0.3s ease-in-out;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .submit-btn {
        margin-inline: auto;

        &:hover {
            transform: scale(1.05);
            transition: all 0.3s ease-in-out;
            cursor: pointer;
        }
    }
}
</style>