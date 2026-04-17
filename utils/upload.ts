/**
 * @description: 處理文件上傳的工具函數，包含文件類型、大小和數量的驗證，以及文件添加和移除的處理邏輯。
 */

import type { UploadUserFile } from "element-plus"

// 上傳選項接口，包含文件類型、最大文件大小和文件數量限制
export interface UploadOptions {
    fileType?: string[];
    fileMaxSize?: number;
    fileLimit?: number
}

// 驗證文件大小是否在限制範圍內
const validateFileMaxSize = (fileSize: number, fileMaxSize: number) => {
    if (fileSize > fileMaxSize) {
        return false;
    }
    return true;
}

/**
 * 處理文件上傳的函數，包含文件類型、大小和數量的驗證
 * @param options 選項接口
 * @param fileList 要回傳後端的檔案列表
 * @returns 
 */
export const handleFileUpload = (options: UploadOptions = {}, fileList: UploadUserFile[] = []) => {
    return (file: UploadUserFile, files: UploadUserFile[]) => {
        if (file.size == 0 || !file.size) {
            ElNotification.error({
                title: 'Failed',
                message: 'File is empty',
                type: 'error',
                duration: 3000,
            });
            return;
        }

        if (file.status === 'ready') {
            const { fileType, fileMaxSize, fileLimit } = options;

            if (fileMaxSize && !validateFileMaxSize(file.size, fileMaxSize)) {
                ElNotification.error({
                    title: 'Failed',
                    message: 'File size exceeds the maximum limit',
                    type: 'error',
                    duration: 3000,
                });
                files.pop();
                return;
            }

            if (fileType && !fileType.includes(file.name.split('.').pop() || '')) {
                ElNotification.error({
                    title: 'Failed',
                    message: 'File type not allowed',
                    type: 'error',
                    duration: 3000,
                });
                files.pop();
                return;
            }

            if (fileLimit && files.length > fileLimit) {
                ElNotification.error({
                    title: 'Failed',
                    message: `You can only upload up to ${fileLimit} files. Please upload again.`,
                    type: 'error',
                    duration: 3000,
                });

                files.pop();
                return;
            }

            fileList.push(file);
            return file.raw;
        }
    }
}

export const handleFileRemove = (fileList: UploadUserFile[]) => {
    return (file: UploadUserFile, files: UploadUserFile[]) => {
        const index = fileList.indexOf(file);
        if (index !== -1) {
            fileList.splice(index, 1);
            ElNotification.success({
                title: 'Success',
                message: `File: ${file.name} is removed`,
                type: 'success',
                duration: 3000,
            });
        }
    }
}

export const handleFileExceed = (options: UploadOptions = {}, customFileList: UploadUserFile[] = []) => {
    return (files: UploadUserFile[], fileList: UploadUserFile[]) => {
        const { fileLimit } = options;
        ElNotification.warning({
            title: 'Failed',
            message: `You can only upload up to ${fileLimit} files. Please upload again.`,
            type: 'warning',
            duration: 3000,
        });
        if (files.length > 0) {
            files.splice(0, files.length);
            fileList.splice(0, fileList.length);
            customFileList = [];
        }
    }
}