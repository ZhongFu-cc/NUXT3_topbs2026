// import request from "@/utils/request";
// import fileRequest from "@/utils/largeFileRequest";

import { Body } from "#build/components";

export async function hashFile(file: File) {
    let startTime = new Date().getTime();
    const chuckSize = 10 * 1024 * 1024; // 10 MB

    // 初始化 chunk array 用於存放分割的文件
    const chunks: Blob[] = [];

    for (let start = 0; start < file.size; start += chuckSize) {
        const chunk = file.slice(start, start + chuckSize);

        // 將 chunk 的 name 設置為文件名加上當前的起始位置
        Object.defineProperty(chunk, "name", {
            value: `${file.name}.${start}`,
            writable: false,
        });

        // 將 chunk 添加到 chunks 陣列中
        chunks.push(chunk);
    }

    /**
     * 使用 SubtleCrypto API 進行 SHA-256 哈希計算
     */
    const hashPromises = chunks.map(async (chunk) => {
        // 將 chunks 陣列中的每個 chunk 轉換為 ArrayBuffer
        const buffer = await readBinaryFile(chunk);
        // 使用 SubtleCrypto API 進行 SHA-256 哈希計算
        return window.crypto.subtle.digest("SHA-256", buffer as ArrayBuffer);
    });

    // 等待所有的哈希計算完成
    // hashBuffers 是一個 ArrayBuffer 陣列，包含了每個 chunk 的哈希值
    const hashBuffers = await Promise.all(hashPromises);

    // 初始化 finalHashBuffer 將所有的 ArrayBuffer 連接在一起
    let finalHashBuffer = new ArrayBuffer(0);
    for (const hashBuffer of hashBuffers) {
        finalHashBuffer = concatenateBuffers(finalHashBuffer, hashBuffer);
    }

    // 將連接完成後的 ArrayBuffer 進行 SHA-256 哈希計算
    const finalHash = await window.crypto.subtle.digest(
        "SHA-256",
        finalHashBuffer
    );
    // 將最終的哈希值轉換為 Uint8Array
    // 並轉換為十六進制字符串
    const hashArray = new Uint8Array(finalHash);
    const hash = arrayBufferToHex(hashArray);

    console.log("hash", hash);
    console.log(chunks.length, "chunks");

    // 帶著 hash 去後端查詢是否存在該文件, 回傳 true 或 false
    // let res = await slideCheck(hash);
    // console.log("res", res);

    let res = {
        hash: hash,
        chunks: chunks,
        file: file,
    };

    return res;

    // if (!res.data.exist) {
    //   console.log("文件不存在, 開始上傳");

    //   const MAX_CONCURRENT = 5; // 設置最大併發數量
    //   const uploadChunk = async (chunk: Blob, index: number) => {
    //     // 設置要回傳的 chunk info
    //     const data = {
    //       fileName: file.name,
    //       fileType: file.type,
    //       fileSha256: hash,
    //       chunkIndex: index,
    //       totalChunks: chunks.length,
    //     };

    //     const formData = new FormData();
    //     formData.append("file", chunk);
    //     formData.append("data", JSON.stringify(data));
    //     await slideUpload(formData);
    //   };

    //   // 將 chunks 陣列中的每個 chunk 轉換為 Promise
    //   const uploadTasks = chunks.map(
    //     (chunk, index) => () => uploadChunk(chunk, index)
    //   );
    //   await limitConcurrency(uploadTasks, MAX_CONCURRENT);
    // } else {
    //   console.log("文件已存在");
    //   let baseUrl = import.meta.env.VITE_MINIO_API_URL;
    //   console.log("baseUrl", baseUrl);
    //   let url = `${baseUrl}/topbs2025/${res.data.path}`;
    //   window.open(url, "_blank");
    // }

    // return hash;
}

/**
 * 將 Blob 轉換為 ArrayBuffer
 * @param blob 傳入 Blob 對象 (chunks)
 * @returns
 */
async function readBinaryFile(blob: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // reader 執行後掛載的結果在 result 屬性上
            resolve(new Uint8Array(reader.result as ArrayBuffer));
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(blob);
    });
}

/**
 * 將兩個 ArrayBuffer 連接在一起
 * @param buffer1 第一個 ArrayBuffer
 * @param buffer2 第二個 ArrayBuffer
 * @returns 連接後的 ArrayBuffer
 */
function concatenateBuffers(
    buffer1: ArrayBuffer,
    buffer2: ArrayBuffer
): ArrayBuffer {
    let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
}

/**
 * 轉換為十六進制字符串
 * @param buffer Uint8Array (連接後的 ArrayBuffer)
 * @returns
 */
function arrayBufferToHex(buffer: Uint8Array): string {
    return Array.from(buffer)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

export async function slideCheck(data: string) {
    console.log("slideUpload", data);
    let res = CSRrequest.get("/paper/owner/second-stage/check", {
        params: {
            sha256: data,
        },
    })
    //   let res = await request({
    //     url: "/paper/slide-check",
    //     method: "get",
    //     params: {
    //       sha256: data,
    //     },
    //   });
    return res;
}

export async function slideUpload(
    paperId: any,
    checkResult: any,
    file: File,
    hash: string,
    chunks: Blob[],
    percentage: Ref<number>
) {
    console.error("123")
    // ElMessage.success("開始上傳");
    if (!checkResult.data.exist) {
        console.log("文件不存在, 開始上傳");

        const MAX_CONCURRENT = 5; // 設置最大併發數量
        const uploadChunk = async (chunk: Blob, index: number) => {
            // 設置要回傳的 chunk info
            const data = {
                paperId: paperId,
                chunkUploadDTO: {
                    fileName: file.name,
                    fileType: file.type,
                    fileSha256: hash,
                    chunkIndex: index,
                    totalChunks: chunks.length,
                }
            };

            const formData = new FormData();
            formData.append("file", chunk);
            formData.append("data", JSON.stringify(data));
            if (data == null) {
                console.log(console.log(index));
                console.log("data is null");
            }
            console.log("formData", formData.get("data"));

            await slideUploadApi(formData);
        };

        // 將 chunks 陣列中的每個 chunk 轉換為 Promise
        const uploadTasks = chunks.map(
            (chunk, index) => () => uploadChunk(chunk, index)
        );
        await limitConcurrency(uploadTasks, MAX_CONCURRENT, percentage);
        // await limitConcurrencyAlternative(uploadTasks, MAX_CONCURRENT, percentage);
        console.log("上傳完成");
        percentage.value = 100; // 上傳完成後設置為 100%
        console.log(percentage.value);
    } else {
        console.log("文件已存在");
        percentage.value = 100;
        let baseUrl = useRuntimeConfig().public.minio;
        console.log("baseUrl", baseUrl);
        // let url = `${baseUrl}/topbs2025/${checkResult.data.path}`;
        // window.open(url, "_blank");
    }
}

export async function slideUpdateUpload(
    paperId: any,
    paperFileUploadId: any,
    checkResult: any,
    file: File,
    hash: string,
    chunks: Blob[],
    percentage: Ref<number>
) {
    console.error("123")
    // ElMessage.success("開始上傳");
    if (!checkResult.data.exist) {
        console.log("文件不存在, 開始上傳");

        const MAX_CONCURRENT = 5; // 設置最大併發數量
        const uploadChunk = async (chunk: Blob, index: number) => {
            // 設置要回傳的 chunk info
            const data = {
                paperId: paperId,
                paperFileUploadId: paperFileUploadId,
                chunkUploadDTO: {
                    fileName: file.name,
                    fileType: file.type,
                    fileSha256: hash,
                    chunkIndex: index,
                    totalChunks: chunks.length,
                }
            };

            const formData = new FormData();
            formData.append("file", chunk);
            formData.append("data", JSON.stringify(data));
            if (data == null) {
                console.log(console.log(index));
                console.log("data is null");
            }
            console.log("formData", formData.get("data"));
            //TODO 更新成正式API，目前為測試
            // await slideUploadTestApi(formData);
            await slideUpdateUploadApi(formData);

        };

        // 將 chunks 陣列中的每個 chunk 轉換為 Promise
        const uploadTasks = chunks.map(
            (chunk, index) => () => uploadChunk(chunk, index)
        );
        await limitConcurrency(uploadTasks, MAX_CONCURRENT, percentage);
        // await limitConcurrencyAlternative(uploadTasks, MAX_CONCURRENT, percentage);
        console.log("上傳完成");
        percentage.value = 100; // 上傳完成後設置為 100%
        console.log(percentage.value);
    } else {
        console.log("文件已存在");
        percentage.value = 100;
        let baseUrl = useRuntimeConfig().public.minio;
        console.log("baseUrl", baseUrl);
        // let url = `${baseUrl}/topbs2025/${checkResult.data.path}`;
        // window.open(url, "_blank");
    }
}

function slideUploadApi(data: any) {
    return CSRrequest.post("/paper/owner/second-stage", {
        body: data,
    });
}

function slideUploadTestApi(data: any) {
    return CSRrequest.post("/ck/test/slideUpload", {
        body: data,
    });
}

function slideUpdateUploadApi(data: any) {
    return CSRrequest.put("/paper/owner/second-stage", {
        body: data,
    });
}

/**
 *
 * @param tasks 要執行的 Promise 陣列
 * @param maxConcurrent  最大併發數量
 */
function limitConcurrency(
    tasks: (() => Promise<void>)[],
    maxConcurrent: number,
    percentage: Ref<number>
) {
    const results: Promise<void>[] = []; // 用於存儲所有的 Promise
    let index = 0; // 當前執行的任務索引
    let completedTasks = 0;

    // 在完成一個任務後，開始下一個任務
    const next = async () => {
        while (index < tasks.length) {
            const taskIndex = index++;
            // await tasks[taskIndex]();
            // completedTasks++;
            // percentage.value = Math.floor((completedTasks / tasks.length) * 89) + 10; // 加上初始的 10%
            try {
                console.log(`开始执行任务 ${taskIndex + 1}/${tasks.length}`);
                await tasks[taskIndex]();
                completedTasks++;

                // 更新进度
                const progress = Math.floor((completedTasks / tasks.length) * 89) + 10;
                percentage.value = progress;
                console.log(`任务 ${taskIndex + 1} 完成，进度：${progress}%`);
            } catch (error) {
                console.error(`任务 ${taskIndex + 1} 失败:`, error);
                throw error; // 重新抛出错误
            }
        }
    };

    for (let i = 0; i < Math.min(maxConcurrent, tasks.length); i++) {
        results.push(next());
    }
    return Promise.all(results);
}

// 更安全的替代方案：使用 p-limit 库的简化版本
async function limitConcurrencyAlternative(
    tasks: (() => Promise<void>)[],
    maxConcurrent: number,
    percentage: Ref<number>
): Promise<void> {
    console.log(`使用替代方案执行 ${tasks.length} 个任务`);

    let completedTasks = 0;
    const updateProgress = () => {
        completedTasks++;
        const progress = Math.floor((completedTasks / tasks.length) * 89) + 10;
        percentage.value = progress;
        console.log(`完成 ${completedTasks}/${tasks.length}，进度：${progress}%`);
    };

    // 分批执行任务
    for (let i = 0; i < tasks.length; i += maxConcurrent) {
        const batch = tasks.slice(i, i + maxConcurrent);
        console.log(`执行第 ${Math.floor(i / maxConcurrent) + 1} 批任务，包含 ${batch.length} 个任务`);

        try {
            await Promise.all(
                batch.map(async (task) => {
                    await task();
                    updateProgress();
                })
            );
        } catch (error) {
            console.error(`第 ${Math.floor(i / maxConcurrent) + 1} 批任务执行失败:`, error);
            throw error;
        }
    }

    console.log("所有批次完成");
}




// 測試用
export async function slideTestUpload(
    checkResult: any,
    file: File,
    hash: string,
    chunks: Blob[],
    percentage: Ref<number>
) {
    // ElMessage.success("開始上傳");
    if (!checkResult.data.exist) {
        console.log("文件不存在, 開始上傳");

        const MAX_CONCURRENT = 5; // 設置最大併發數量
        const uploadChunk = async (chunk: Blob, index: number) => {
            // 設置要回傳的 chunk info
            const data = {
                fileName: file.name,
                fileType: file.type,
                fileSha256: hash,
                chunkIndex: index,
                totalChunks: chunks.length,
            };

            const formData = new FormData();
            formData.append("file", chunk);
            formData.append("data", JSON.stringify(data));
            if (data == null) {
                console.log(console.log(index));
                console.log("data is null");
            }
            console.log("formData", formData.get("data"));
            await slideUploadTestApi(formData);
        };

        // 將 chunks 陣列中的每個 chunk 轉換為 Promise
        const uploadTasks = chunks.map(
            (chunk, index) => () => uploadChunk(chunk, index)
        );
        await limitConcurrency(uploadTasks, MAX_CONCURRENT, percentage);
        // await limitConcurrencyAlternative(uploadTasks, MAX_CONCURRENT, percentage);
        console.log("上傳完成");
        percentage.value = 100; // 上傳完成後設置為 100%
        console.log(percentage.value);
    } else {
        console.log("文件已存在");
        percentage.value = 100;
        let baseUrl = useRuntimeConfig().public.minio;
        console.log("baseUrl", baseUrl);
        // let url = `${baseUrl}/topbs2025/${checkResult.data.path}`;
        // window.open(url, "_blank");
    }
}
