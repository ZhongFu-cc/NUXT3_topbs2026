<template>
    <div>
        <main class="common-section">
            <Banner />

            <div class="title-section">
                <h1 class="title">Registration Now</h1>
            </div>
            <el-form :model="formData" class="form" ref="form" :rules="formRules" labelPosition="top"
                require-asterisk-position="right" :show-message="true" :scroll-to-error="true">
                <el-form-item class="member-title required" label="Title" prop="title" labelPosition="left"
                    labelWidth="auto">
                    <el-radio-group v-model="formData.title">
                        <el-radio value="Prof.">Prof.</el-radio>
                        <el-radio value="Dr.">Dr.</el-radio>
                        <el-radio value="Mr.">Mr.</el-radio>
                        <el-radio value="Ms.">Ms.</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="main-form">
                    <div class="left-seciton">
                        <div class="member-name">
                            <el-form-item class="first-name required" label="First Name" prop="firstName">
                                <el-input v-model="formData.firstName"></el-input>
                            </el-form-item>
                            <el-form-item class="last-name required" label="Last Name" prop="lastName">
                                <el-input v-model="formData.lastName"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item class="email required" label="ID: Primary E-mail" prop="email">
                            <el-input v-model="formData.email" placeholder="E-mail" :prefixIcon="Message"></el-input>
                        </el-form-item>
                        <el-form-item class="required" label="Password" prop="password">
                            <el-input v-model="formData.password" placeholder="Password" :prefixIcon="Lock"
                                show-password></el-input>
                        </el-form-item>
                        <el-form-item class="required" label="Confirm Password" prop="confirmPassword">
                            <el-input v-model="formData.confirmPassword" placeholder="Password" :prefixIcon="Lock"
                                show-password></el-input>
                        </el-form-item>
                        <el-form-item class="required" label="Affiliation" prop="affiliation">
                            <el-input v-model="formData.affiliation"></el-input>
                        </el-form-item>
                        <el-form-item class="required" label="Job Title" prop="jobTitle">
                            <el-input v-model="formData.jobTitle"></el-input>
                        </el-form-item>

                    </div>
                    <div class="right-section">
                        <el-form-item class="required" label="Country" prop="country">
                            <el-select :disabled="attendeeType === '2'" v-model="formData.country"
                                placeholder="Select a Country or Location" filterable @change="cleanRemitAccount">
                                <el-option v-for="item in countries" :key="item" :label="item"
                                    :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="formData.country === 'Taiwan'" label="Remit Account Last 5 Number"
                            prop="remitAccountLast5">
                            <el-input v-model="formData.remitAccountLast5"></el-input>
                        </el-form-item>
                        <div class="member-phone required">
                            <el-form-item class="country-code" label="Mobile Phone" prop="countryCode">
                                <div class="country-code-inner">
                                    <el-input :disabled="attendeeType === '2'" v-model="formData.countryCode"
                                        placeholder="Country Code"></el-input>
                                    <span>-</span>
                                </div>
                            </el-form-item>
                            <el-form-item class="phone-num" label="phoneNum" prop="phoneNum">
                                <el-input v-model="formData.phoneNum"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item class="category required" label="Category" prop="category">
                            <el-radio-group v-model="formData.category">
                                <el-radio :value="1">Non-member</el-radio>
                                <el-radio :value="2">Member</el-radio>
                                <el-radio :value="3">Others(Trainee/Nurse/Reasearcher)</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item class="captcha" label="" prop="captcha">
                    <el-input v-model="formData.verificationCode" placeholder="Captcha"></el-input>
                    <img :src="captchaData.image" alt="captcha">
                    <el-button class="refresh-btn" @click="getCaptcha"><el-icon>
                            <ElIconRefreshRight />
                        </el-icon></el-button>
                </el-form-item>
                <el-form-item class="submit-btn">
                    <el-button type="primary" @click="submit(form)">Submit</el-button>
                </el-form-item>
            </el-form>
        </main>

    </div>
</template>

<script lang="ts" setup>

import type { FormInstance, FormRules } from 'element-plus'
import { Lock, Message } from '@element-plus/icons-vue'

import Banner from '@/components/layout/Banner.vue';

import countriesJson from '@/assets/data/countries.json'

const countries = reactive(countriesJson);


const router = useRouter()

const attendeeType = useRoute().params.attendeeType

/**-------------------------------匯款帳號末5碼校驗----------------------------- */


const validateRemitAccount = (rule: any, value: string, callback: any) => {
    if (formData.country === 'Taiwan' && !value) {
        callback(new Error('Please input your remit account last 5 number'))
    } else if (formData.country === 'Taiwan' && value.length !== 5) {
        callback(new Error('Please input 5 numbers'))
    }
    else {
        callback()
    }
}

const cleanRemitAccount = () => {
    formData.remitAccountLast5 = ''
}



/**-------------------------------取得驗證碼----------------------------- */

const captcha = ref('')
const captchaData = reactive({
    image: '',
    key: ''
})


const getCaptcha = async () => {
    console.log('getCaptcha')
    let res = await CSRrequest.get('/member/captcha')
    console.log(res)
    Object.assign(captchaData, res.data)
    formData.verificationKey = captchaData.key
}




/**-------------------------------表單區塊----------------------------- */
interface formData {
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    affiliation: string,
    jobTitle: string,
    country: string,
    remitAccountLast5: string,
    phone: string,
    countryCode: string,
    phoneNum: string,
    category: number,
    verificationCode: string,
    verificationKey: string
}

const form = ref<FormInstance>()

const formData = reactive<formData>({
    title: 'Prof.',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    affiliation: '',
    jobTitle: '',
    country: '',
    remitAccountLast5: '',
    phone: '',
    countryCode: '',
    phoneNum: '',
    category: 1,
    verificationCode: '',
    verificationKey: ''
})

watch(() => attendeeType, (value) => {
    if (value === '2') {
        formData.country = 'Taiwan';
        formData.countryCode = '886';
    }
}, { immediate: true })

const vaildConfirmPassword = (rule: any, value: string, callback: any) => {

    if (!value) {
        callback(new Error('Please input your password again'))
    } else if (value !== formData.password) {
        callback(new Error('The two passwords do not match'))
    } else {
        callback()
    }
}



const formRules = reactive<FormRules>({
    title: [{ required: true, message: 'Please select a title', trigger: 'change' }],
    firstName: [{ required: true, message: 'Please input your first name', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Please input your last name', trigger: 'blur' }],
    email: [{ required: true, message: 'Please input your email', trigger: 'blur' }, { type: 'email', message: 'Please input correct email', trigger: 'blur' }],
    password: [{ required: true, message: 'Please input your password', trigger: 'blur' }],
    confirmPassword: [{ validator: vaildConfirmPassword, trigger: 'blur' }],
    affiliation: [{ required: true, message: 'Please input your affiliation', trigger: 'blur' }],
    jobTitle: [{ required: true, message: 'Please input your job title', trigger: 'blur' }],
    country: [{ required: true, message: 'Please select a country', trigger: 'change' }],
    countryCode: [{ required: true, message: 'Please input your country code', trigger: 'blur' }],
    phoneNum: [{ required: true, message: 'Please input your phone number', trigger: 'blur' }],
    category: [{ required: true, message: 'Please select a category', trigger: 'change' }],
    remitAccountLast5: [{ validator: validateRemitAccount, trigger: 'blur' }]
})



const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (valid) {
            formData.phone = formData.countryCode + '-' + formData.phoneNum
            let res = await CSRrequest.post('/member', {
                body: formData
            })

            console.log(res)
            if (res.code === 500) {
                getCaptcha()
                formData.verificationCode = ''
                ElMessage.error(res.msg)
            }

            if (res.data.isLogin) {
                localStorage.setItem(res.data.tokenName, 'Bearer ' + res.data.tokenValue);
                router.push('/member-center')
            }

            formEl.resetFields()
        } else {
            console.log('error submit!!')
            return false;
        }
    })
}

/**---------------------- */
onMounted(() => {
    // router.push('/demo-register')
    getCaptcha()
})
</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .banner-box {
        margin-top: 1rem;

        img {
            width: 100%;
            box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.5);
        }
    }

    .title-section {
        margin: 1rem auto;
        text-align: center;

        .title {
            font-size: 2.7rem;
            font-weight: 600;
        }
    }


    .content {
        margin: 1rem auto;
        text-align: center;

        h1 {
            font-size: 2rem;
        }
    }

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


            .left-seciton {
                flex: 1;
                display: flex;
                flex-direction: column;


                .member-name {
                    display: flex;
                    justify-content: space-between;

                    .first-name {
                        flex: 1;
                        margin-right: 1rem;
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

                .member-phone {
                    display: flex;
                    gap: 2rem;

                    .country-code {
                        flex: 1;

                        .country-code-inner {
                            display: flex;
                            align-items: center;
                            gap: 2rem;

                            :deep(.el-input) {
                                flex: 2;
                            }
                        }

                    }

                    .phone-num {
                        flex: 2;

                        :deep(.el-form-item__label) {
                            color: white;
                            position: relative;

                            &::after {
                                position: absolute;
                                content: 'Country Code+number';
                                color: red;
                                font-size: 0.7rem;
                                right: 0;
                            }
                        }
                    }
                }

                .category {
                    display: flex;
                    width: 100%;
                    flex-direction: column;

                    :deep(.el-radio-group) {
                        display: flex;

                        .el-radio {
                            width: 43%;
                        }
                    }
                }

            }
        }

        .captcha {
            display: flex;
            align-items: center;
            gap: 1rem;

            :deep(.el-form-item__content) {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                width: 100%;
            }

            :deep(.el-input) {
                width: 15vw;

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
                width: 15vw;
                // height: 40px;
            }
        }

        .submit-btn {
            display: flex;
            justify-content: center;
            text-align: center;
            margin-top: 2rem;

            .el-button {
                width: 10%;
                margin: 0 auto;
                background-color: #DD6777;
                border: none;
                border-radius: 5px;
            }
        }
    }

    :deep(.el-input__wrapper) {
        border-radius: 10px;
    }
}
</style>