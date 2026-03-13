<template>
    <div>
        <main class="common-section">
            <Banner />
            <div class="main-section">
                <!-- <div class="credit-box">
                    <div class="credit-point-box">
                        <ul>
                            <h1 class="title">研討會申請之會議學分(申請中)</h1>
                            <li>(1)台灣乳房醫學會 <span class="score">14分</span></li>
                            <li>(2)台灣外科醫學會 <span class="score">3分</span></li>
                            <li>(3)社團法人臨床藥學會 藥師<span class="score">13.4分</span></li>
                            <li>(4)台灣專科護理師學會
                                <p>(1)專科護理師 <span class="score">13.4分</span></p>
                                <p>(2)護理師 <span class="score">13.4分</span></p>
                            </li>
                            <li>(5)中華民國癌症醫學會
                                <p>(1)腫瘤內科 <span class="score">3分</span></p>
                                <p>(2)腫瘤外科 <span class="score">3分</span></p>
                            </li>
                        </ul>
                    </div>
                    <div class="image-box">
                        <img src="../assets/img/bubble_tea_no-problem.png" alt="">
                    </div>
                </div> -->

                <!-- <el-divider></el-divider> -->
                <Title title="研討會報名"></Title>
                <div class="title-section">
                </div>
                <el-form :model="formData" class="form" ref="form" :rules="formRules" labelPosition="top"
                    require-asterisk-position="right" :show-message="true" :scroll-to-error="true"
                    :validate-on-rule-change="false">

                    <div class="main-form">
                        <div class="left-seciton">
                            <el-form-item :label="t.country" prop="country">
                                <el-select v-model="formData.country" placeholder="Select Country" filterable>
                                    <el-option v-for="country in countryList" :key="country" :label="country"
                                        :value="country"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="t.chineseName" :prop="'chineseName'">
                                <el-input v-model="formData.chineseName"></el-input>
                            </el-form-item>

                            <div class="member-name">
                                <el-form-item class="first-name" required :label="t.firstName" prop="firstName">
                                    <el-input v-model="formData.firstName" :placeholder="t.firstName"></el-input>
                                </el-form-item>
                                <el-form-item class="last-name" required :label="t.lastName" prop="lastName">
                                    <el-input v-model="formData.lastName" :placeholder="t.lastName"></el-input>
                                </el-form-item>

                            </div>

                            <el-form-item class="email required" :label="t.email" prop="email">
                                <el-input v-model="formData.email" :placeholder="t.email2"
                                    :prefixIcon="Message"></el-input>
                            </el-form-item>

                            <el-form-item class="email required" :label="t.email2" required prop="confirmEmail">
                                <el-input v-model="formData.confirmEmail" :placeholder="t.email2"
                                    :prefixIcon="Message"></el-input>
                            </el-form-item>

                            <el-form-item :label="t.password" prop="password">
                                <el-input v-model="formData.password" type="password"></el-input>
                            </el-form-item>

                            <el-form-item :label="t.confirmPassword" prop="confirmPassword">
                                <el-input v-model="formData.confirmPassword" type="password"></el-input>
                            </el-form-item>



                        </div>
                        <div class="right-section">
                            <el-form-item class="required" :label="t.affiliation" prop="affiliation">
                                <el-input v-model="formData.affiliation"></el-input>
                            </el-form-item>
                            <el-form-item class="required" :label="t.jobTitle" prop="jobTitle">
                                <el-input v-model="formData.jobTitle"></el-input>
                            </el-form-item>
                            <!-- 
                            <el-form-item :label="t.idCard" prop="idCard">
                                <el-input v-model="formData.idCard"></el-input>
                            </el-form-item> -->

                            <el-form-item :label="t.remitAccountLast5" prop="remitAccountLast5">
                                <el-input minlength="5" maxlength="5" v-model="formData.remitAccountLast5"></el-input>
                            </el-form-item>


                            <div class="member-phone required">
                                <el-form-item class="country-code" :label="t.phoneNum" prop="countryCode">
                                    <div class="country-code-inner">
                                        <el-input :disabled="formData.country === 'Taiwan'"
                                            v-model="formData.countryCode" placeholder="Country Code"></el-input>
                                        <span>-</span>
                                    </div>
                                </el-form-item>
                                <el-form-item :class="'domestic-phone-num'" :label="t.phoneNum" prop="phoneNum">
                                    <el-input v-model="formData.phoneNum"></el-input>
                                </el-form-item>
                            </div>

                            <el-form-item :label="t.food">
                                <el-radio-group v-model="formData.food">
                                    <el-radio value="葷">{{ t.foodRadio1 }}</el-radio>
                                    <el-radio value="素">{{ t.foodRadio2 }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item :label="t.foodTaboo">
                                <el-input v-model="formData.foodTaboo"></el-input>
                            </el-form-item>

                            <el-form-item :label="t.category" prop="category">
                                <el-select v-model="formData.category" placeholder="Select Category">
                                    <el-option :label="t.category1" :value="1"></el-option>
                                    <el-option :label="t.category2" :value="2"></el-option>
                                    <el-option :label="t.category3" :value="3"></el-option>
                                </el-select>
                            </el-form-item>

                        </div>
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
                        <el-button type="primary" disabled @click="submit(form)">Submit</el-button>
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



const countryList = ref(countries);

const router = useRouter()

const attendeeType = '2';

const { t, locale, setLocale } = useLang()

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
        callback(new Error('請輸入中文姓名'))
    }
    else {
        callback()
    }
}

const cleanRemitAccount = () => {
    formData.remitAccountLast5 = ''
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
    if (!value) callback(new Error('請輸入身分證字號'))
    if (value) {
        console.log('checkCkDigit', value)

        if (!/^[A-Z][0-9]{9}$/.test(value)) {
            callback({ valid: false, message: "身份證格式不正確" });
        }

        const placeCode = codeMap[value[0]];
        if (!placeCode) {
            callback({ valid: false, message: "首碼無效" });
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
            callback({ valid: false, message: "身分證號不合法" });
        } else {
            callback();
        }
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
    country: 'Taiwan',
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

const validCategoryExtra = (rule: any, value: string, callback: any) => {
    if (formData.category === 1 && !value) {
        callback(new Error(t.value.categoryValidate))
    } else {
        callback()
    }
}

const checkEmail = (rule: any, value: string, callback: any) => {
    console.log('checkEmail', value, formData.email)
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
    idCard: [{ required: true, validator: checkCkDigit, trigger: 'blur' }],
    country: [{ required: true, message: t.value.countryValidate, trigger: 'change' }],
    countryCode: [{ required: true, message: t.value.countryCodeValidate, trigger: 'blur' }],
    phoneNum: [{ required: true, message: t.value.phoneNumValidate, trigger: 'blur' }],
    category: [{ required: true, message: t.value.categoryValidate, trigger: 'change' }],
    remitAccountLast5: [{ required: true, validator: validateRemitAccount, trigger: 'blur' }],
    categoryExtra: [{ validator: validCategoryExtra, trigger: 'change' }],
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
                ElMessage.success('註冊成功')

                router.push('/')
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