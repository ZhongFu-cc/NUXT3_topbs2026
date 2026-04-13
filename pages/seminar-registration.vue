<template>
    <div>
        <main class="common-section">
            <Banner />
            <div class="main-section">
                <Title :title="$t('registration')"></Title>
                <RegistrationFee></RegistrationFee>
                <el-form :model="formData" class="form" ref="form" :rules="formRules" labelPosition="top"
                    require-asterisk-position="right" :show-message="true" :scroll-to-error="true"
                    :validate-on-rule-change="false">

                    <div class="main-form">
                        <ClientOnly>
                            <div class="left-seciton">
                                <el-form-item :label="t.country" prop="country">
                                    <el-select v-model="formData.country" placeholder="Select Country" filterable>
                                        <el-option v-for="country in countryList" :key="country" :label="country"
                                            :value="country"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item :label="t.chineseName" :prop="'chineseName'"
                                    :style="{ order: getOrder('chineseName') }">
                                    <el-input v-model="formData.chineseName"></el-input>
                                </el-form-item>

                                <div class="member-name" :style="{ order: getOrder('englishName') }">
                                    <el-form-item class="first-name" required :label="t.firstName" prop="firstName">
                                        <el-input v-model="formData.firstName" :placeholder="t.firstName"></el-input>
                                    </el-form-item>
                                    <el-form-item class="last-name" required :label="t.lastName" prop="lastName">
                                        <el-input v-model="formData.lastName" :placeholder="t.lastName"></el-input>
                                    </el-form-item>

                                </div>


                                <el-form-item v-if="formData.country === 'Taiwan'" :label="t.idCard" prop="idCard"
                                    :style="{ order: getOrder('idCard') }">
                                    <el-input v-model="formData.idCard" :placeholder="t.idCard"></el-input>
                                </el-form-item>



                                <el-form-item :label="t.password" prop="password"
                                    :style="{ order: getOrder('password') }">
                                    <el-input v-model="formData.password" type="password"
                                        :placeholder="t.password"></el-input>
                                </el-form-item>

                                <el-form-item :label="t.confirmPassword" prop="confirmPassword"
                                    :style="{ order: getOrder('confirmPassword') }">
                                    <el-input v-model="formData.confirmPassword" type="password"
                                        :placeholder="t.confirmPassword"></el-input>
                                </el-form-item>
                                <el-form-item class="email required" :label="t.email" prop="email"
                                    :style="{ order: getOrder('email') }">
                                    <el-input v-model="formData.email" :placeholder="t.email2"
                                        :prefixIcon="Message"></el-input>
                                </el-form-item>

                                <el-form-item class="email required" :label="t.email2" required prop="confirmEmail"
                                    :style="{ order: getOrder('confirmEmail') }">
                                    <el-input v-model="formData.confirmEmail" :placeholder="t.email2"
                                        :prefixIcon="Message"></el-input>
                                </el-form-item>


                            </div>
                            <div class="right-section">
                                <el-form-item v-if="formData.country !== 'Taiwan'" :label="t.idCard" prop="idCard">
                                    <el-input v-model="formData.idCard" :placeholder="t.idCard"></el-input>
                                </el-form-item>

                                <el-form-item class="required" :label="t.affiliation" prop="affiliation">
                                    <el-input v-model="formData.affiliation" :placeholder="t.affiliation"></el-input>
                                </el-form-item>
                                <el-form-item class="required" :label="t.jobTitle" prop="jobTitle">
                                    <el-input v-model="formData.jobTitle" :placeholder="t.jobTitle"></el-input>
                                </el-form-item>


                                <el-form-item v-if="formData.country === 'Taiwan'" :label="t.remitAccountLast5"
                                    prop="remitAccountLast5">
                                    <el-input minlength="5" maxlength="5" v-model="formData.remitAccountLast5"
                                        :placeholder="t.remitAccountLast5"></el-input>
                                </el-form-item>

                                <el-form-item v-if="formData.country === 'Taiwan'" :label="t.receipt" prop="receipt">
                                    <el-input v-model="formData.receipt" :placeholder="t.receipt"></el-input>
                                </el-form-item>


                                <div class="member-phone required">
                                    <el-form-item class="country-code" :label="t.phoneNum" prop="countryCode">
                                        <div class="country-code-inner">
                                            <el-input :disabled="formData.country === 'Taiwan'"
                                                v-model="formData.countryCode" placeholder="Country Code"></el-input>
                                            <span>-</span>
                                        </div>
                                    </el-form-item>
                                    <el-form-item :class="'oversea-phone-num'" :label="t.phoneNum" prop="phoneNum">
                                        <el-input v-model="formData.phoneNum"></el-input>
                                    </el-form-item>
                                </div>

                                <el-form-item :label="t.food" prop="food">
                                    <el-radio-group v-model="formData.food">
                                        <el-radio value="葷">{{ t.foodRadio1 }}</el-radio>
                                        <el-radio value="素">{{ t.foodRadio2 }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label="t.foodTaboo" prop="foodTaboo">
                                    <el-input v-model="formData.foodTaboo"></el-input>
                                </el-form-item>

                                <el-form-item :label="t.category" prop="category">
                                    <el-select v-model="formData.category">
                                        <el-option :label="t.category1" :value="1"></el-option>
                                        <el-option :label="t.category2" :value="2"></el-option>
                                        <el-option :label="t.category3" :value="3"></el-option>
                                    </el-select>
                                </el-form-item>

                            </div>
                        </ClientOnly>
                    </div>
                    <el-form-item class="captcha" prop="captcha">
                        <el-input v-model="formData.verificationCode" :placeholder="t.captcha"></el-input>
                        <div class="captcha-img">
                            <img :src="captchaData.image" alt="captcha">
                            <el-button class="refresh-btn" @click="getCaptcha"><el-icon>
                                    <ElIconRefreshRight />
                                </el-icon></el-button>
                        </div>
                    </el-form-item>
                    <el-form-item class="submit-btn">
                        <el-button type="primary" @click="submit(form)"> Submit </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </main>

    </div>
</template>

<script lang="ts" setup>

import type { FormInstance, FormRules } from 'element-plus'
import { Lock, Message } from '@element-plus/icons-vue'
import { useLang } from '@/composables/useLang'
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';
import countries from '@/assets/data/countries.json'
import RegistrationFee from './registration-fee.vue';

useSeoMeta({
    title: 'Registration - TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society',
    description: 'Explore the registration details for the TOPBS 2026 Taiwan Oncoplastic Breast Surgery Society. Find information on personal , early-bird discounts, and payment methods.',
    keywords: 'Registration,TOPBS,TOPBS 2026,2026 TOPBS'
})


const { t, setLocale, locale } = useLang()
const countryList = ref(countries);
const router = useRouter()
const { isLogin } = useAuth()

/**-------------------------------匯款帳號末5碼校驗----------------------------- */


const validateRemitAccount = (rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error(t.value.remitAccountLast5Validate))
    } else if (value.length !== 5) {
        callback(new Error(t.value.remitAccountLast5Validate2))
    } else if (!/^\d{5}$/.test(value)) {
        callback(new Error(t.value.remitAccountLast5Validate2))
    }
    else {
        callback()
    }
}

const validateChineseName = (rule: any, value: string, callback: any) => {
    if (formData.country === 'Taiwan' && !value) {
        callback(new Error(t.value.pleaseEnterChineseName))
    }
    else {
        callback()
    }
}

const cleanRemitAccount = () => {
    formData.remitAccountLast5 = ''
}

const getOrder = (field: string): number => {
    const country = formData.country;

    const sequence: Record<'Taiwan' | 'Other', Record<string, number>> = {
        'Taiwan': {
            'chineseName': 1,
            'englishName': 2,
            'idCard': 3,
            'password': 4,
            'confirmPassword': 5,
            'email': 6,
            'confirmEmail': 7,
        },
        'Other': {
            'englishName': 1,
            'chineseName': 2,
            'email': 3,
            'confirmEmail': 4,
            'password': 5,
            'confirmPassword': 6,
            'idCard': 7,
        }
    }

    const countryKey: 'Taiwan' | 'Other' = country === 'Taiwan' ? 'Taiwan' : 'Other';
    const contryConfig = sequence[countryKey];

    return contryConfig[field] || 0;
}

const codeMap: Record<string, number> = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 34,
    J: 18,
    K: 19,
    L: 20,
    M: 21,
    N: 22,
    O: 35,
    P: 23,
    Q: 24,
    R: 25,
    S: 26,
    T: 27,
    U: 28,
    V: 29,
    W: 32,
    X: 30,
    Y: 31,
    Z: 33,
};

const checkCkDigit = (rule: any, value: string, callback: any) => {
    if (!value) callback(new Error(t.value.idCardValidate))
    if (value && formData.country === 'Taiwan') {
        console.log('checkCkDigit', value)

        if (!/^[A-Z][0-9]{9}$/.test(value)) {
            callback({ valid: false, message: t.value.idCardValidate2 });
        }

        const placeCode = codeMap[value[0]];
        if (!placeCode) {
            callback({ valid: false, message: t.value.idCardValidate2 });
        }

        const bodyCode = value.substring(1, 9);
        const lastCode = value[9];
        const calHead = (num: number): number =>
            Math.floor(num / 10) * 1 + (num % 10) * 9;
        const calBody = (code: string): number => {
            let sum = 0;
            for (let i = 0; i < code.length; i++) {
                sum += parseInt(code[i]) * (8 - i);
            }
            return sum;
        };
        const idSum =
            calHead(placeCode) + calBody(bodyCode) + parseInt(lastCode) * 1;
        const isValid = idSum % 10 === 0;
        if (!isValid) {
            callback({ valid: false, message: t.value.idCardValidate2 });
        } else {
            callback();
        }
    } else {
        callback();
    }


}


/**-------------------------------取得驗證碼----------------------------- */

const captcha = ref('')
const captchaData = reactive({
    image: '',
    key: ''
})


const getCaptcha = async () => {
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
    chineseName: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string,
    affiliation: string,
    jobTitle: string,
    country: string,
    idCard: string,
    remitAccountLast5: string,
    phone: string,
    countryCode: string,
    phoneNum: string,
    category: number,
    receipt: string,
    food: string,
    foodTaboo: string,
    categoryExtra: string,
    verificationCode: string,
    verificationKey: string
}

const form = ref<FormInstance>()

const formData = reactive<formData>({
    title: 'Prof.',
    firstName: '',
    lastName: '',
    chineseName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    affiliation: '',
    jobTitle: '',
    idCard: '',
    country: '',
    remitAccountLast5: '',
    phone: '',
    countryCode: '886',
    phoneNum: '',
    receipt: '',
    category: 1,
    food: '葷',
    foodTaboo: '',
    categoryExtra: '',
    verificationCode: '',
    verificationKey: ''
})


/**---------------------- */
// const 
watch(() => formData.country, (value) => {
    value === 'Taiwan' ? setLocale('zh') : setLocale('en')
}, { immediate: true })

const cleanCategoryExtra = (item: any) => {
    item.categoryExtra = ''
}


const vaildConfirmPassword = (rule: any, value: string, callback: any) => {

    if (!value) {
        callback(new Error(t.value.confirmPasswordValidate))
    } else if (value !== formData.password) {
        callback(new Error(t.value.confirmPasswordValidate2))
    } else {
        callback()
    }
}


const checkEmail = (rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error(t.value.confirmEmail))
    } else if (value !== formData.email) {
        callback(new Error(t.value.confirmEmailValidate))
    } else {
        callback()
    }
}


const formRules = computed<FormRules>(() => ({
    title: [{ required: true, message: t.value.titleValidate, trigger: 'change' }],
    firstName: [{ required: true, message: t.value.firstNameValidate, trigger: 'blur' }],
    lastName: [{ required: true, message: t.value.lastNameValidate, trigger: 'blur' }],
    email: [{ required: true, message: t.value.emailValidate, trigger: 'blur' }, { type: 'email', message: t.value.emailValidate2, trigger: 'blur' }],
    confirmEmail: [{ validator: checkEmail, trigger: 'blur' }],
    password: [{ required: true, message: t.value.passwordValidate, trigger: 'blur' }],
    chineseName: [{ required: formData.country === 'Taiwan', message: t.value.chineseNameValidate, trigger: 'blur' }],
    confirmPassword: [{ required: true, validator: vaildConfirmPassword, trigger: 'blur' }],
    affiliation: [{ required: true, message: t.value.affiliationValidate, trigger: 'blur' }],
    jobTitle: [{ required: true, message: t.value.jobTitleValidate, trigger: 'blur' }],
    idCard: [{ required: formData.country === 'Taiwan', validator: checkCkDigit, trigger: 'blur' }],
    country: [{ required: true, message: t.value.countryValidate, trigger: 'change' }],
    countryCode: [{ required: true, message: t.value.countryCodeValidate, trigger: 'blur' }],
    phoneNum: [{ required: true, message: t.value.phoneNumValidate, trigger: 'blur' }],
    category: [{ required: true, message: t.value.categoryValidate, trigger: 'change' }],
    remitAccountLast5: [{ required: formData.country === 'Taiwan', validator: validateRemitAccount, trigger: 'blur' }],
    // categoryExtra: [{ validator: validCategoryExtra, trigger: 'change' }],
}))



const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    // console.log(valid)
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
                ElMessage.success(t.value.registrationSuccess)
                useAuth().checkLoginState();

                router.push('/')
            }

            formEl.resetFields()
        } else {
            console.log('error submit!!')
            return false;
        }
    })
}

const listenKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        submit(form.value)
    }
}




/**---------------------- */
onMounted(() => {
    getCaptcha()
    window.addEventListener('keydown', listenKeydown)

    if (isLogin.value) {
        ElMessage.info(t.value.alreadyLogin)
        router.push('/')
    }
})

onUnmounted(() => {
    window.removeEventListener('keydown', listenKeydown)
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


    .content {
        margin: 1rem auto;
        text-align: center;

        h1 {
            font-size: 2.5rem;
            font-weight: 600;
            color: $main-color;
        }
    }

    .form {
        width: 60%;
        margin: 1rem auto;
        font-weight: 600;

        :deep(.el-form-item__label) {
            font-size: 1.3rem;
            font-weight: 600;
            // color: #1C4587;
        }

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

                    .oversea-phone-num {
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

                    .domestic-phone-num {
                        flex: 2;

                        :deep(.el-form-item__label) {
                            color: white;
                            position: relative;

                            &::after {
                                position: absolute;
                                content: '國碼+電話號碼';
                                color: red;
                                font-size: 0.7rem;
                                right: 0;
                            }
                        }
                    }
                }

                .category {

                    :deep(.el-radio-group) {
                        flex-direction: column;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;

                    }

                    :deep(.el-form-item__error) {
                        // color: black;
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

        .captcha {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 0 auto;
            width: 80%;

            :deep(.el-form-item__content) {
                display: flex;
                justify-content: center;
                gap: 1rem;

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                    gap: 1rem;

                }
            }

            :deep(.el-input) {
                width: 10rem;
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
                }
            }

        }

        .submit-btn {
            display: flex;
            justify-content: center;
            text-align: center;
            margin-top: 2rem;

            .el-button {
                // width: 10%;
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


    .credit-box {
        display: flex;
        justify-content: center;
        margin-inline: auto;
        width: 80%;
        gap: 5rem;

        @media screen and (max-width: 1024px) {
            // flex-direction: column;
            gap: 2rem;
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;

            gap: 2rem;

        }

        @media screen and (max-width: 375px) {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        .credit-point-box {
            justify-content: center;
            align-items: flex-start;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            font-weight: bold;
            font-size: 1.5rem;
            color: $main-color;

            @media screen and (max-width: 768px) {
                width: 100%;
                font-size: 1.2rem;
            }


            ul {
                list-style-type: none;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                p {
                    padding-left: 2rem;
                }

                @media screen and (max-width: 768px) {
                    margin-inline: auto;
                }
            }

            .title {
                font-size: 2.5rem;
                font-weight: 700;
                margin: 0rem 0 1rem 0;
                color: $main-color;


            }


            .score {
                color: #D27DA6;
            }
        }

        .image-box {
            width: 30%;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            @media screen and (max-width: 768px) {
                width: 100%;
                justify-content: center;
                margin-top: 2rem;
                display: none;
            }

            img {
                width: 100%;
                max-width: 20rem;
                height: auto;
            }
        }
    }

    .reminder {
        text-align: center;
        font-size: 1.2rem;
        color: #D86C7C;
        margin: 1rem auto;
    }
}
</style>