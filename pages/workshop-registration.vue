<template>
    <div>
        <main class="common-section">
            <Banner />
            <div class="main-section">
                <Title title="乳癌遺傳性基因檢測工作坊"></Title>
                <Title title="Hereditary Breast Cancer Genetic Testing Workshop"></Title>
                <p class="reminder">請填寫以下資訊完成註冊</p>

                <el-form :model="formData" class="form" ref="form" :rules="formRules" labelPosition="top"
                    require-asterisk-position="right" :show-message="true" :scroll-to-error="true">

                    <div class="main-form">
                        <div class="left-section">
                            <el-form-item class="required" :label="formLabel.chineseName" prop="chineseName">
                                <el-input v-model="formData.chineseName"
                                    :placeholder="formLabel.chineseName"></el-input>
                            </el-form-item>

                            <div class="member-name">
                                <el-form-item class="first-name required" :label="formLabel.firstName" prop="firstName">
                                    <el-input v-model="formData.firstName"
                                        :placeholder="formLabel.firstName"></el-input>
                                </el-form-item>
                                <el-form-item class="last-name required" :label="formLabel.lastName" prop="lastName">
                                    <el-input v-model="formData.lastName" :placeholder="formLabel.lastName"></el-input>
                                </el-form-item>
                            </div>

                            <el-form-item class="email required" :label="formLabel.email" prop="email">
                                <el-input v-model="formData.email" :placeholder="formLabel.email2"
                                    :prefixIcon="Message"></el-input>
                            </el-form-item>
                        </div>

                        <div class="right-section">
                            <el-form-item class="required" :label="formLabel.phone" prop="phone">
                                <el-input v-model="formData.phone" :placeholder="formLabel.phone"></el-input>
                            </el-form-item>

                            <el-form-item class="required" :label="formLabel.affiliation" prop="affiliation">
                                <el-input v-model="formData.affiliation"
                                    :placeholder="formLabel.affiliation"></el-input>
                            </el-form-item>

                            <el-form-item class="required" :label="formLabel.jobTitle" prop="jobTitle">
                                <el-input v-model="formData.jobTitle" :placeholder="formLabel.jobTitle"></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <el-form-item class="captcha" prop="verificationCode">
                        <el-input v-model="formData.verificationCode" placeholder="請輸入驗證碼"></el-input>
                        <div class="captcha-img">
                            <img :src="captchaData.image" alt="captcha">
                            <el-button class="refresh-btn" @click="getCaptcha"><el-icon>
                                    <ElIconRefreshRight />
                                </el-icon></el-button>
                        </div>
                    </el-form-item>

                    <el-form-item class="submit-btn">
                        <el-button type="primary" @click="submit(form)">前往付款</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-html="ecPayForm" ref="formRef" style="display: none;"></div>

        </main>
    </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { Message } from '@element-plus/icons-vue'

import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';

const router = useRouter()

/**-------------------------------取得驗證碼----------------------------- */
const captchaData = reactive({
    image: '',
    key: ''
})

const getCaptcha = async () => {
    console.log('getCaptcha')
    try {
        let res = await CSRrequest.get('/member/captcha')
        console.log(res)
        Object.assign(captchaData, res.data)
        formData.verificationKey = captchaData.key
    } catch (error) {
        console.error('取得驗證碼失敗:', error)
    }
}

/**-------------------------------表單標籤----------------------------- */
const formLabel = reactive({
    chineseName: '中文姓名',
    firstName: '英文名',
    lastName: '英文姓氏',
    email: '電子信箱',
    email2: '請輸入電子信箱',
    phone: '聯絡電話',
    affiliation: '所屬機構',
    jobTitle: '職稱',
    verificationCode: '驗證碼',
    chineseNameValidate: '請輸入中文姓名',
    firstNameValidate: '請輸入英文名',
    lastNameValidate: '請輸入英文姓氏',
    emailValidate: '請輸入電子信箱',
    emailValidate2: '請輸入正確格式的電子信箱',
    phoneValidate: '請輸入聯絡電話',
    affiliationValidate: '請輸入所屬機構',
    jobTitleValidate: '請輸入職稱',
    verificationCodeValidate: '請輸入驗證碼'
})

/**-------------------------------表單資料----------------------------- */
interface FormData {
    chineseName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    affiliation: string,
    jobTitle: string,
    verificationKey: string,
    verificationCode: string
}

const form = ref<FormInstance>()

const formData = reactive<FormData>({
    chineseName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    affiliation: '',
    jobTitle: '',
    verificationKey: '',
    verificationCode: ''
})

/**-------------------------------表單驗證規則----------------------------- */
const formRules = reactive<FormRules>({
    chineseName: [{ required: true, message: formLabel.chineseNameValidate, trigger: 'blur' }],
    firstName: [{ required: true, message: formLabel.firstNameValidate, trigger: 'blur' }],
    lastName: [{ required: true, message: formLabel.lastNameValidate, trigger: 'blur' }],
    email: [
        { required: true, message: formLabel.emailValidate, trigger: 'blur' },
        { type: 'email', message: formLabel.emailValidate2, trigger: 'blur' }
    ],
    phone: [{ required: true, message: formLabel.phoneValidate, trigger: 'blur' }],
    affiliation: [{ required: true, message: formLabel.affiliationValidate, trigger: 'blur' }],
    jobTitle: [{ required: true, message: formLabel.jobTitleValidate, trigger: 'blur' }],
    verificationCode: [{ required: true, message: formLabel.verificationCodeValidate, trigger: 'blur' }]
})

/**-------------------------------提交表單----------------------------- */
const ecPayForm = ref<any>();
const formRef = ref<any>()
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async (valid) => {
        if (valid) {
            console.log('submit', formData)
            try {
                let res = await CSRrequest.post('/temp-workspace', {
                    body: formData
                })

                console.log(res)
                if (res.code === 500) {
                    getCaptcha()
                    formData.verificationCode = ''
                    ElMessage.error(res.msg)
                    return
                }

                if (res.data) {
                    ElMessage.success('註冊成功')
                    formEl.resetFields()
                    ecPayForm.value = res.data
                    await nextTick();
                    if (formRef.value) {
                        const formItem = formRef.value.querySelector("form")
                        // console.log(formItem)
                        formItem.submit()
                    }

                    // router.push('/') // 可根據需要調整跳轉頁面
                }
            } catch (error) {
                console.error('註冊失敗:', error)
                ElMessage.error('註冊失敗，請稍後再試')
                getCaptcha()
                formData.verificationCode = ''
            }
        } else {
            console.log('表單驗證失敗')
            return false;
        }
    })
}

/**-------------------------------初始化----------------------------- */
onMounted(() => {
    getCaptcha()
})
</script>

<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .title-section {
        margin: 1rem auto;
        text-align: center;

        .title {
            font-size: 2.5rem;
            font-weight: 600;
            color: $main-color;
        }
    }

    .form {
        width: 60%;
        margin: 1rem auto;
        font-weight: 600;

        @media screen and (max-width: 768px) {
            width: 90%;
        }

        :deep(.el-form-item__label) {
            font-size: 1.3rem;
            font-weight: 600;
        }

        .main-form {
            display: flex;
            gap: 5rem;
            text-wrap: nowrap;

            @media screen and (max-width: 768px) {
                flex-direction: column;
                gap: 2rem;
            }

            .left-section {
                flex: 1;
                display: flex;
                flex-direction: column;

                .member-name {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;

                    @media screen and (max-width: 768px) {
                        flex-direction: column;
                        gap: 0;
                    }

                    .first-name {
                        flex: 1;
                    }

                    .last-name {
                        flex: 1;
                    }
                }
            }

            .right-section {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
        }

        .captcha {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 2rem auto 0;
            width: 80%;

            :deep(.el-form-item__content) {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                    gap: 1rem;
                }
            }

            :deep(.el-input) {
                width: 15rem;
            }

            .captcha-img {
                display: flex;
                align-items: center;
                gap: 1rem;

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                    gap: 1rem;
                }

                .refresh-btn {
                    border: none;
                    background-color: white;
                    font-size: 1.5rem;
                    color: #D86C7C;

                    &:hover {
                        background-color: white;
                        color: #D86C7C;
                    }
                }

                img {
                    width: 10rem;
                    height: auto;
                }
            }
        }

        .submit-btn {
            display: flex;
            justify-content: center;
            text-align: center;
            margin-top: 2rem;

            .el-button {
                margin: 0 auto;
                background-color: #DD6777;
                border: none;
                border-radius: 5px;
                padding: 12px 30px;
                font-size: 1.1rem;

                &:hover {
                    background-color: #c55666;
                }
            }
        }
    }

    :deep(.el-input__wrapper) {
        border-radius: 10px;
    }

    .reminder {
        text-align: center;
        font-size: 1.2rem;
        color: #D86C7C;
        margin: 1rem auto 2rem;
        font-weight: 500;
    }

    .required {
        :deep(.el-form-item__label) {
            &::after {
                content: ' *';
                color: #f56c6c;
            }
        }
    }
}
</style>