<template>
    <main class="common-section">
        <Banner></Banner>
        <table class="file-list-table">
            <thead>
                <tr>
                    <th>{{ $t('fileName') }}</th>
                    <th class="type">{{ $t('fileType') }}</th>
                    <th>{{ $t('operate') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(file, index) in fileList" :key="index"
                    :class="[index === fileList.length - 1 ? 'last-row' : '', isEvenOrOdd(Number(index))]">
                    <td class="first-col">{{ file.fileName }}</td>
                    <td class="type">{{ file.type }}</td>
                    <td class="last-col">
                        <a class="preview-link" :href="envMinio + file.path" target="_blank">{{ $t('download') }}</a>
                        <el-button link @click="openUploadDialog(file.paperFileUploadId)">{{ $t('update') }}</el-button>
                        <el-button link @click="deleteFile(file.paperId, file.paperFileUploadId)">{{ $t('delete')
                            }}</el-button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div>

            <el-upload v-if="!isUploadDialogVisiabled" ref="upload" class="upload" drag :limit="1"
                :on-change="handleUpload" :auto-upload="false" :on-exceed="handleExceed">
                <el-icon class="el-icon--upload"><ElIcon-upload-filled /></el-icon>
                <div class="el-upload__text">
                    {{ $t('dropFile') }} <em>{{ $t('clickToUpload') }}</em>
                </div>
            </el-upload>

            <el-progress v-if="!isUploadDialogVisiabled" class="progress" color="#E8979E" :percentage="percentage"
                :stroke-width="15" striped striped-flow />

        </div>

        <el-dialog v-model="isUploadDialogVisiabled" title="Update File" width="30%">
            <el-upload ref="upload" class="upload" drag :limit="1" :on-change="handleUpdateUpload" :auto-upload="false"
                :on-exceed="handleExceed">
                <el-icon class="el-icon--upload"><ElIcon-upload-filled /></el-icon>
                <div class="el-upload__text">
                    {{ $t('dropFile') }} <em>{{ $t('clickToUpload') }}</em>
                </div>
            </el-upload>

            <el-progress class="progress" color="#E8979E" :percentage="percentage" :stroke-width="15" striped
                striped-flow />

        </el-dialog>
    </main>
</template>
<script setup lang="ts">
import Banner from '@/components/layout/Banner.vue';
import { genFileId, type UploadInstance, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus';
import { hashFile, slideCheck, slideTestUpload, slideUpdateUpload, slideUpload } from '@/utils/sha256';

const paperId = useRoute().params.paperId as string

const fileList = reactive<any>([])

const getPaperFileList = async () => {
    fileList.length = 0; // Clear the existing file list
    try {
        let res = await CSRrequest.get(`/paper/owner/second-stage/${paperId}`)
        console.log(res)
        Object.assign(fileList, res.data)
    } catch (error) {
        console.error('Error fetching paper file list:', error);
    }
}
/**----------------------------------------------------------------------- */
const upload = ref<UploadInstance>()

/**-------------------------------------------------------------- */
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

/**-------------------------------------------------------------- */
const hashCode = ref<string>('')
const totalChunks = ref<number>(0)
const percentage = ref<number>(0)

const isProgressShowing = ref<boolean>(false)




const handleUpload: UploadProps['onChange'] = async (file: UploadUserFile, uploadFiles) => {
    console.log('file', file);
    if (file.size == 0) {
        ElMessage.error('File is empty');
        return false;
    }

    if (file.size && file.size > 5 * 1024 * 1024 * 1024) {
        ElMessage.error('File size exceeds 5GB limit');
        return false;
    }


    if (file.status === 'ready' && file.size && file.raw) {
        percentage.value = 0;
        percentage.value += 1;
        let res = await hashFile(file.raw)
        hashCode.value = res.hash;
        totalChunks.value = res.chunks.length;
        percentage.value += 9;
        let checkResult = await slideCheck(hashCode.value)
        console.log('checkResult', checkResult);

        if (checkResult.data.exist) {
            console.log('File already exists, skipping upload');
        }

        if (res.file.type == '') {
            ElMessage.error('File type is not supported');
            percentage.value = 0;
            upload.value!.clearFiles()
            return false;

        }

        await slideUpload(paperId, checkResult, res.file, res.hash, res.chunks, percentage)
        ElMessage.success('Upload completed');
        upload.value!.clearFiles()
        getPaperFileList();
    }

}


const isUploadDialogVisiabled = ref<boolean>(false)

const openUploadDialog = (id: any) => {
    isUploadDialogVisiabled.value = true;
    console.log('Opening upload dialog for paperFileUploadId:', paperFileUploadId);
    percentage.value = 0;
    paperFileUploadId.value = id;
}
const paperFileUploadId = ref<any>()
const handleUpdateUpload: UploadProps['onChange'] = async (file: UploadUserFile, uploadFiles) => {
    console.log('file', file);
    if (file.size == 0) {
        ElMessage.error('File is empty');
        return false;
    }

    if (file.size && file.size > 5 * 1024 * 1024 * 1024) {
        ElMessage.error('File size exceeds 5GB limit');
        return false;
    }


    if (file.status === 'ready' && file.size && file.raw) {
        percentage.value = 0;
        percentage.value += 1;
        let res = await hashFile(file.raw)
        hashCode.value = res.hash;
        totalChunks.value = res.chunks.length;
        percentage.value += 9;
        let checkResult = await slideCheck(hashCode.value)

        if (checkResult.data.exist) {
            console.log('File already exists, skipping upload', checkResult.data);
            console.log('File already exists, skipping upload');
        }

        if (res.file.type == '') {
            ElMessage.error('File type is not supported');
            percentage.value = 0;
            upload.value!.clearFiles()
            return false;

        }

        await slideUpdateUpload(paperId, paperFileUploadId.value, checkResult, res.file, res.hash, res.chunks, percentage)
        console.log('Upload completed');
        ElMessage.success('Upload completed');
        upload.value!.clearFiles()
        getPaperFileList();
        isUploadDialogVisiabled.value = false;
        percentage.value = 0;
    }

}

const envMinio = useRuntimeConfig().public.minio

const isEvenOrOdd = (index: number) => {
    return index % 2 === 0 ? 'even' : 'odd'
}

const deleteFile = async (paperId: any, fileId: any) => {
    console.log('Deleting file with ID:', fileId);
    try {
        ElMessageBox.confirm('Are you sure you want to delete this file?', 'Warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async () => {
            await CSRrequest.delete(`/paper/owner/second-stage/${paperId}`, {
                params: {
                    paperFileUploadId: fileId
                }
            })
            ElMessage.success('File deleted successfully')
            getPaperFileList()
        }).catch(() => {
            ElMessage.info('Delete cancelled')
        });
    } catch (error) {
        ElMessage.error('Failed to delete file')
        console.error('Error deleting file:', error)
    }
}



onMounted(() => {
    getPaperFileList();
});




</script>
<style scoped lang="scss">
.common-section {
    font-family: $common-section-font-family;

    .file-list-table {
        width: 90%;
        border-collapse: collapse;
        margin: 20px auto;

        tr {

            th {
                padding: 1rem;
                text-align: left;
                font-size: 1.3rem;

            }

            td {
                padding: 1rem;
                text-align: left;

                .el-button {
                    color: #666;
                    font-weight: bold;
                }
            }


        }

        .first-col {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            width: 50%;

            @media screen and (max-width: 1024px) {
                width: 30%;
            }

        }

        .type {
            width: 20%;

            @media screen and (max-width: 1024px) {
                display: none;
            }
        }

        .last-col {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            width: 50%;

            @media screen and (max-width:1024px) {
                width: 50%;
            }

            a,
            .el-button {
                padding: 0.2rem;
                margin: 0;

                &:hover {
                    color: black;
                    cursor: pointer;
                    transform: scale(1.05);
                    transition: all 0.3s ease-in-out;
                }
            }
        }

        .even {
            td {
                background-color: #E8979E;
                color: white;
                font-weight: bold;
            }



        }

        .odd {
            td {
                background-color: white;
                color: #E8979E;
                font-weight: bold;
            }

        }

    }

    .upload {
        width: 90%;
        margin: 20px auto;
        border: #E8979E;

        :deep(.el-upload-dragger) {
            border: 2px dashed #E8979E;
        }
    }

    .progress {
        width: 90%;
        margin: 20px auto;
    }

}
</style>