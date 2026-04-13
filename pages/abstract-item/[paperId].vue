<template>
    <main class="common-section">
        <Banner></Banner>
        <Breadcrumbs firstRoute="Abstracts" secoundRoute="Abstract Submission"></Breadcrumbs>
        <Title title="Abstract Submission"></Title>

        <el-form class="form" ref="formRef" :model="data" :rules="formRules" labelPosition="top">

            <div class="main-form">
                <div class="left-seciton">
                    <el-form-item :label="$t('type')" prop="absType">
                        <el-select disabled v-model="data.absType" placeholder="Type"></el-select>
                    </el-form-item>
                    <el-form-item :label="$t('abstractTitle')" prop="absTitle">
                        <el-input v-model="data.absTitle" placeholder="Titile"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('firstAuthor')" prop="firstAuthor">
                        <el-input v-model="data.firstAuthor" placeholder="First Author"></el-input>
                    </el-form-item>

                    <el-form-item v-if="data.absType === 'Young Investigator'" :label="$t('firstAuthorBirthday')"
                        prop="firstAuthorBirthday">
                        <el-date-picker v-model="data.firstAuthorBirthday" placeholder="First Author Affiliation"
                            value-format="YYYY-MM-DD"></el-date-picker>
                    </el-form-item>

                    <el-form-item :label="$t('speaker')" prop="speaker">
                        <el-input v-model="data.speaker" placeholder="Speaker"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('speakerEmail')" prop="speakerEmail">
                        <el-input v-model="data.speakerEmail" placeholder="Speaker Email"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('speakerAffiliation')" prop="speakerAffiliation">
                        <el-input v-model="data.speakerAffiliation" placeholder="Speaker Affiliation"></el-input>
                    </el-form-item>
                </div>
                <div class="right-section">
                    <el-form-item :label="$t('correspondingAuthor')" prop="correspondingAuthor">
                        <el-input v-model="data.correspondingAuthor" placeholder="Corresponding Author"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('correspondingAuthorMail')" prop="correspondingAuthorEmail">
                        <el-input v-model="data.correspondingAuthorEmail"
                            placeholder="Corresponding Author Email"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('correspondingAuthorPhone')" prop="correspondingAuthorPhone">
                        <el-input v-model="data.correspondingAuthorPhone"
                            placeholder="Corresponding Author Phone"></el-input>
                    </el-form-item>
                    <el-form-item class="allAuthors" :label="$t('allAuthors1')" prop="allAuthor">
                        <el-input type="textarea" v-model="data.allAuthor" :placeholder="$t('allAuthors')"></el-input>
                    </el-form-item>
                    <el-form-item class="allAuthors" :label="$t('allAuthorsAffiliation1')" prop="allAuthorAffiliation">
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
                        <div slot="tip" class="el-upload__tip">
                            <span>{{ $t('onlyPdf') }}</span>
                            <span class="warning">{{ $t('fileSizeLimit') }}</span>
                        </div>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="File2" prop="file2">
                    <el-upload ref="uploadRef1" class="upload-demo" :limit="1" :on-change="handleDocxUpload"
                        :auto-upload="false" action="">
                        <el-button size="small" type="primary">Upload</el-button>
                        <div slot="tip" class="el-upload__tip">only upload word file with size less than 20mb</div>
                    </el-upload>
                </el-form-item> -->
            </div>

            <el-form-item label="" prop="submit">
                <el-button class="submit-btn" type="primary" @click="submit(formRef)">{{ $t('submit') }}</el-button>
            </el-form-item>
        </el-form>
    </main>
</template>

<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';

import type { FormInstance, FormRules, UploadProps, UploadUserFile, UploadFile, UploadFiles, UploadInstance } from 'element-plus';


const router = useRouter();

const paperId = useRoute().params.paperId as string;
console.log(paperId);


/**-------------- Member info --------------- */
const memberInfo = ref<any>({});

const getMemberInfo = async () => {
    memberInfo.value = useAuth().memberInfo;
}

/**------------------------------------------ */
const checkFileSize = (size: number) => {
    return size < 1024 * 1024 * 20;
}




// (file: UploadUserFile, fileList: UploadUserFile[]) => {
//     console.log(data.fileList);
//     data.fileList = [];

//     if (formRef.value) {
//         formRef.value.validateField('fileList');
//     }
// }


const handleDocxUpload: UploadProps['onChange'] = (file: UploadUserFile, uploadFiles) => {
    if (file.size == 0) {
        ElMessage.error('File is empty');
        return false;
    }


    if (file.status === 'ready' && file.size) {
        if (!checkFileSize(file.size)) {
            ElMessage.error('File size must be less than 20mb');
            uploadFiles.pop();
            return;
        }
        if (file.name.split('.').pop() !== 'docx') {
            ElMessage.error('File must be docx');
            uploadFiles.pop();
            return;
        }
        data.fileList.push(file);
    }

}

const checkAge = (rule: any, value: any, callback: any) => {
    if (value) {
        const now = new Date();
        const birthday = new Date(value);
        const age = now.getFullYear() - birthday.getFullYear();
        if (age > 45) {
            callback(new Error('Age must be less than 45'));
        } else {
            callback();
        }
    } else {
        callback(new Error('Please input your birthday'));
    }
}

const transformDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


const formRef = ref<FormInstance>();
const data = reactive<any>({
    absType: 'poster',
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

const uploadFileOptions = ref<UploadOptions>({
    fileLimit: 1,
    fileMaxSize: 1024 * 1024 * 20,
    fileType: ['pdf'],
})


const handleRemove = handleFileRemove(data.fileList);
const handleExceed: UploadProps['onExceed'] = handleFileExceed(uploadFileOptions.value, data.fileList);
const handlePdfUpload: UploadProps['onChange'] = handleFileUpload(uploadFileOptions.value, data.fileList);


const getPaperById = async () => {
    let res = await CSRrequest.get(`/paper/owner/${paperId}`);
    const { status, publicationNumber, publicationGroup, reportLocation, reportTime, paperFileUpload, availablePaperReviewers, assignedPaperReviewers, tagList, ...resdata } = res.data;

    if (res.code === 200) {
        Object.assign(data, resdata);
    } else {
        router.push('/member-center');
    }
}


const formRules = ref<FormRules>({
    absType: [{ required: true, message: 'Please select type', trigger: 'blur' }],
    absTitle: [{ required: true, message: 'Please input title', trigger: 'blur' }],
    firstAuthor: [{ required: true, message: 'Please input first author', trigger: 'blur' }],
    firstAuthorBirthday: [{ required: true, validator: checkAge, trigger: 'blur' }],
    speaker: [{ required: true, message: 'Please input speaker', trigger: 'blur' }],
    speakerEmail: [{ required: true, message: 'Please input speaker email', trigger: 'blur' }],
    speakerAffiliation: [{ required: true, message: 'Please input speaker affiliation', trigger: 'blur' }],
    correspondingAuthor: [{ required: false, message: 'Please input corresponding author', trigger: 'blur' }],
    correspondingAuthorEmail: [{ required: false, message: 'Please input corresponding author email', trigger: 'blur' }],
    correspondingAuthorPhone: [{ required: false, message: 'Please input corresponding author phone', trigger: 'blur' }],
    allAuthor: [{ required: false, message: 'Please input all authors', trigger: 'blur' }],
    allAuthorAffiliation: [{ required: false, message: 'Please input all authors affiliation', trigger: 'blur' }],
    fileList: [{ required: false, message: 'Please upload file', trigger: 'change' }],
})




const submitData = new FormData();
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    console.log(data);
    formEl.validate(async (valid) => {
        if (valid) {
            const { fileList, ...restData } = data;
            submitData.append('data', JSON.stringify(restData));
            data.fileList.forEach((file: any) => {
                console.log(file, "from data");
                submitData.append('files', file.raw);
            })
            console.log(submitData.get('file'));
            let res = await CSRrequest.put('/paper/owner', {
                body: submitData
            });
            console.log(res);
            if (res.code === 200) {
                ElMessage.success('Submit success!');
                router.push('/abstract');
            } else {
                ElMessage.error('Submit failed!');
            }

        } else {
            console.log('error submit!!');
            ElMessage.error('Please check the form');
            return false;
        }
    })
}


onMounted(() => {
    getMemberInfo();
    getPaperById();
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

                .el-upload__tip {
                    display: flex;
                    flex-direction: column;

                    .warning {
                        color: red;
                        font-size: 0.8rem;
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