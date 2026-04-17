<template>
    <div>
        <main class="common-section">
            <Banner />
            <Title title="Group Registration"></Title>


            <el-form :model="returnData" class="form" ref="form" :rules="formRules" labelPosition="top"
                require-asterisk-position="right" :show-message="true" :scroll-to-error="true">
                <div class="registration-notice">
                    Group registration data cannot be carried over to future annual meetings.
                    <!-- {{ t.registrationReminder }} -->
                </div>

                <div class="member-list" v-for="(item, index) in returnData.groupMembers" :key="index">
                    <div class="top-section">
                        <h1>Member {{ Number(index) + 1 }} : <span v-if="index === 0" class="tips">*The first on the
                                list must
                                be a main member</span></h1>
                        <el-button class="option-btn" v-if="returnData.groupMembers.length > 5"
                            @click="removeMember(Number(index))">
                            Remove
                        </el-button>
                    </div>
                    <!-- <el-form-item class="member-title required" label="Title" :prop="'groupMembers.' + index + '.title'"
                        :rules="formRules.title" labelPosition="left" labelWidth="auto">
                        <el-radio-group v-model="item.title">
                            <el-radio value="Prof.">Prof.</el-radio>
                            <el-radio value="Dr.">Dr.</el-radio>
                            <el-radio value="Mr.">Mr.</el-radio>
                            <el-radio value="Ms.">Ms.</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                    <div class="main-form">
                        <div class="left-seciton">
                            <el-form-item class="required" label="Country" :prop="'groupMembers.' + index + '.country'"
                                :rules="formRules.country">
                                <el-select :disabled="attendeeType === '2'" v-model="item.country"
                                    placeholder="Select a Country or Location" filterable @change="cleanRemitAccount">
                                    <el-option v-for="item in countries" :key="item" :label="item"
                                        :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <div class="member-name">
                                <el-form-item class="first-name required" label="First Name"
                                    :prop="'groupMembers.' + index + '.firstName'" :rules="formRules.firstName">
                                    <el-input v-model="item.firstName"></el-input>
                                </el-form-item>
                                <el-form-item class="last-name required" label="Last Name"
                                    :prop="'groupMembers.' + index + '.lastName'" :rules="formRules.lastName">
                                    <el-input v-model="item.lastName"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="Chinese Name" :prop="'groupMembers.' + index + '.chineseName'">
                                <el-input v-model="item.chineseName"></el-input>
                            </el-form-item>
                            <el-form-item class="email required" label="Email"
                                :prop="'groupMembers.' + index + '.email'" :rules="formRules.email">
                                <el-input v-model="item.email" placeholder="E-mail" :prefixIcon="Message"></el-input>
                            </el-form-item>
                            <el-form-item class="email required" label="Confirm Email"
                                :prop="'groupMembers.' + index + '.confirmEmail'" :rules="formRules.confirmEmail">
                                <el-input v-model="item.confirmEmail" placeholder="E-mail"
                                    :prefixIcon="Message"></el-input>
                            </el-form-item>
                            <el-form-item class="required" label="Password"
                                :prop="'groupMembers.' + index + '.password'" :rules="formRules.password">
                                <el-input v-model="item.password" placeholder="Password" :prefixIcon="Lock"
                                    show-password></el-input>
                            </el-form-item>
                            <el-form-item class="required" label="Confirm Password"
                                :prop="'groupMembers.' + index + '.confirmPassword'" :rules="formRules.confirmPassword">
                                <el-input v-model="item.confirmPassword" placeholder="Password" :prefixIcon="Lock"
                                    show-password></el-input>
                            </el-form-item>
                            <el-form-item label="Passport" :prop="'groupMembers.' + index + '.idCard'">
                                <el-input v-model="item.idCard" placeholder="Passport"></el-input>
                            </el-form-item>


                        </div>
                        <div class="right-section">
                            <el-form-item class="required" label="Affiliation"
                                :prop="'groupMembers.' + index + '.affiliation'" :rules="formRules.affiliation">
                                <el-input v-model="item.affiliation"></el-input>
                            </el-form-item>
                            <el-form-item class="required" label="Job Title"
                                :prop="'groupMembers.' + index + '.jobTitle'" :rules="formRules.jobTitle">
                                <el-input v-model="item.jobTitle"></el-input>
                            </el-form-item>
                            <div class="member-phone required">

                                <el-form-item class="country-code" label="Mobile Phone"
                                    :prop="'groupMembers.' + index + '.countryCode'" :rules="formRules.countryCode">
                                    <div class="country-code-inner">
                                        <el-input :disabled="attendeeType === '2'" v-model="item.countryCode"
                                            placeholder="Country Code"></el-input>
                                        <span>-</span>
                                    </div>
                                </el-form-item>
                                <el-form-item class="phone-num" label="phoneNum"
                                    :prop="'groupMembers.' + index + '.phoneNum'" :rules="formRules.phoneNum">
                                    <el-input v-model="item.phoneNum"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="Dietary Preference" prop="food">
                                <el-radio-group v-model="item.food">
                                    <el-radio value="葷">Non-Vegetarian</el-radio>
                                    <el-radio value="素">Vegetarian</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="Dietary Restrictions" prop="foodTaboo">
                                <el-input v-model="item.foodTaboo"></el-input>
                            </el-form-item>

                            <el-form-item label="Category" :prop="'groupMembers.' + index + '.category'">
                                <el-select v-model="item.category">
                                    <el-option label="Member" :value="1"></el-option>
                                    <el-option label="Others(Trainee/Nurse/Researcher)" :value="2"></el-option>
                                    <el-option label="Non-member" :value="3"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item v-if="item.category === 1 && item.country !== 'Taiwan'"
                                :prop="'groupMembers.' + index + '.categoryExtra'" label="Type of membership">
                                <el-select v-model="item.categoryExtra" class="category-select">
                                    <el-option label="JBCS" value="JBCS"></el-option>
                                    <el-option label="JOPBS" value="JOPBS"></el-option>
                                    <el-option label="KBCS" value="KBCS"></el-option>
                                    <el-option label="HKSBS " value="HKSBS "></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <el-divider></el-divider>

                </div>
                <el-button @click="addNewMember" class="option-btn">
                    Add new
                </el-button>
                <el-form-item class="captcha" label="" prop="captcha">
                    <el-input v-model="returnData.verificationCode" placeholder="Captcha"></el-input>
                    <img :src="captchaData.image" alt="captcha">
                    <el-button class="refresh-btn" @click="getCaptcha"><el-icon>
                            <ElIconRefreshRight />
                        </el-icon></el-button> </el-form-item>
                <el-form-item class="submit-btn">
                    <el-button type="primary" @click="submit(form)">Submit</el-button>
                </el-form-item>
            </el-form>
        </main>

    </div>
</template>

<script lang="ts" setup>

import { type FormInstance, type FormRules } from 'element-plus'
import { Lock, Message } from '@element-plus/icons-vue'

import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';

import countriesJson from '@/assets/data/countries.json'

const countries = ref(countriesJson.filter((item: any) => item !== 'Taiwan').map((item: any) => item));




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
    returnData.verificationKey = captchaData.key
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
    verificationKey: string,
    chineseName?: string,
    food?: string,
    foodTaboo?: string,
    categoryExtra?: string,
    idCard?: string
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
    verificationKey: '',
    chineseName: '',
    food: '葷',
    foodTaboo: '',
    categoryExtra: '',
    idCard: ''
})

const returnData = reactive<any>({
    groupMembers: [],
    verificationCode: '',
    verificationKey: ''
})

// const testFormData = ref({
//     title: 'Prof.',
//     firstName: '12',
//     lastName: '123',
//     email: '',
//     password: '123456',
//     confirmPassword: '123456',
//     affiliation: 'ZF',
//     jobTitle: 'IT',
//     country: 'Canada',
//     remitAccountLast5: '',
//     phone: '886',
//     countryCode: '886',
//     phoneNum: '123456777',
//     category: 1,
//     verificationCode: '',
//     verificationKey: '',
//     chineseName: '',
//     food: '葷',
//     foodTaboo: '',
//     categoryExtra: '',
//     idCard: ''
// })

const initMember = () => {
    returnData.groupMembers = Array.from({ length: 5 }, () => ({ ...formData }))
    // let index = 0;
    // returnData.groupMembers =
    //     Array.from({ length: 5 }, () => ({ ...testFormData.value, email: `test${index}@example.com`, confirmEmail: `test${index++}@example.com` }))
}

const addNewMember = () => {
    returnData.groupMembers.push({ ...formData })
}

const removeMember = (index: number) => {
    returnData.groupMembers.splice(index, 1)
}

watch(() => attendeeType, (value) => {
    if (value === '2') {
        formData.country = 'Taiwan';
        formData.countryCode = '886';
    }
}, { immediate: true })

const vaildConfirmPassword = (rule: any, value: string, callback: any) => {
    const match = rule.field.match(/^groupMembers\.(\d+)\.confirmPassword$/);
    if (!match) {
        return callback(new Error('Invalid field'));
    }

    const index = Number(match[1]); // 轉換為數字索引
    if (!value) {
        callback(new Error('Please input your password again'))
    } else if (value !== returnData.groupMembers[index].password) {
        callback(new Error('The two passwords do not match'))
    } else {
        callback()
    }
}

const vaildConfirmEmail = (rule: any, value: string, callback: any) => {
    const match = rule.field.match(/^groupMembers\.(\d+)\.confirmEmail$/);
    if (!match) {
        return callback(new Error('Invalid field'));
    }

    const index = Number(match[1]); // 轉換為數字索引
    if (!value) {
        callback(new Error('Please input your email again'))
    } else if (value !== returnData.groupMembers[index].email) {
        callback(new Error('The two emails do not match'))
    } else {
        callback()
    }
}



const formRules = reactive<FormRules>({
    title: [{ required: true, message: 'Please select a title', trigger: 'change' }],
    firstName: [{ required: true, message: 'Please input your first name', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Please input your last name', trigger: 'blur' }],
    email: [{ required: true, message: 'Please input your email', trigger: 'blur' }, { type: 'email', message: 'Please input correct email', trigger: 'blur' }],
    confirmEmail: [{ required: true, validator: vaildConfirmEmail, trigger: 'blur' }],
    password: [{ required: true, message: 'Please input your password', trigger: 'blur' }],
    confirmPassword: [{ required: true, validator: vaildConfirmPassword, trigger: 'blur' }],
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
            returnData.groupMembers.forEach((item: any) => {
                item.phone = item.countryCode + '-' + item.phoneNum
            })
            let res = await CSRrequest.post('/member/group', {
                body: returnData
            })

            if (res.code === 500) {
                getCaptcha()
                formData.verificationCode = ''
                ElMessage.error(res.msg)
            }

            if (res.code === 200) {
                router.push('/login')
                ElNotification({
                    title: 'Success',
                    message: 'Group registration successful!',
                    type: 'success',
                    duration: 5000
                })
            }

            formEl.resetFields()
        } else {
            console.log('error submit!!')
            return false;
        }
    })
}

const { setting } = useSetting()
watch(() => setting.value, (newVal) => {
    if (newVal) {
        console.log('setting', newVal)
        if (!newVal.isGroupRegistrationOpen) {
            router.push('/registration-fee')
            ElNotification({
                title: 'Notification',
                message: 'Group registration is closed now.',
                type: 'warning',
                duration: 5000
            })
        }
    }
}, { immediate: true })

/**---------------------- */
onMounted(() => {
    getCaptcha()
    initMember()
})
</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;
    margin-top: 6rem;

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

        .registration-notice {
            margin-bottom: 1.5rem;
            padding: 0.9rem 1rem;
            border: 1px solid #f1c4ca;
            border-radius: 14px;
            background: linear-gradient(180deg, #fff8f9 0%, #fff2f4 100%);
            color: #9e5060;
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .option-btn {
            color: #DD6777;
            border: 1px solid #DD6777;
            border-radius: 5px;

            &:hover {
                color: white;
                background-color: #DD6777;
            }
        }

        .top-section {
            display: flex;
            justify-content: space-between;

            .tips {
                color: red;
            }
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


    .shadow-divider {
        width: 85%;
        height: 2px;
        margin: 1rem auto;
        background-image: repeating-linear-gradient(to right,
                #CDCBCB,
                #CDCBCB 30px,
                transparent 5px,
                transparent 50px);
    }
}
</style>