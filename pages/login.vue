<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member'" :secound-route="'Member login'" />
        <Title :title="'Member Login'" />
        <!-- <div class="main-section">
            <el-form class="login-form" ref="formRef" :model="loginInfo" :rules="formRule">
                <el-form-item class="login-input" prop="email">
                    <el-input v-model="loginInfo.email" placeholder="Email">
                        <template #prefix>
                            <img src="../assets/img/email.svg" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item class="login-input" prop="password">
                    <el-input v-model="loginInfo.password" type="password" placeholder="Password" :show-password="true">
                        <template #prefix>
                            <img src="../assets/img/lock.svg" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <div class="captcha-section">
                    <el-form-item class="captcha" label="Verification Code" prop="verificationCode">
                        <el-input v-model="loginInfo.verificationCode" placeholder="Captcha"></el-input>
                    </el-form-item>
                    <div class="captcha-img-section">
                        <img :src="captcha.image" alt="">
                        <el-button class="refresh-btn" @click="getCaptcha"><el-icon>
                                <ElIconRefreshRight />
                            </el-icon></el-button>
                    </div>
                </div>
                <el-form-item class="sign-btn-section">
                    <el-button class="sign-btn" @click="login(formRef)">Sign in</el-button>
                </el-form-item>
                <div class="btn-section">
                    <nuxt-link :to="'retrieve-password'">Retrieve password</nuxt-link>
                    <span>/</span>
                    <nuxt-link :to="'registration-fee'">Sign up</nuxt-link>
                </div>
            </el-form>
        </div> -->
    </main>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Title from '@/components/layout/Title.vue';

const router = useRouter();

const captcha = reactive<any>({

});
const getCaptcha = async () => {
    let res = await CSRrequest.get('/member/captcha');
    Object.assign(captcha, res.data);
    loginInfo.verificationKey = captcha.key;
};

const loginInfo = reactive<any>({
    email: '',
    password: '',
    verificationKey: '',
    verificationCode: ''
});

const formRef = ref<FormInstance>();

const formRule = reactive<FormRules>({
    email: [
        { required: true, message: 'Please input email', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
    ],
    verificationCode: [
        { required: true, message: 'Please input verification code', trigger: 'blur' }
    ]
});


const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (valid) {
            let res = await CSRrequest.post('/member/login', {
                body: loginInfo
            })
            if (res.code === 500) {
                ElMessage.error(res.msg);
                getCaptcha();
            }
            if (res.data.isLogin) {
                localStorage.setItem(res.data.tokenName, 'Bearer ' + res.data.tokenValue);
                router.push('/member-center')
                formEl.resetFields();
            }
        } else {
            ElMessage.error('Please input correct information');
            return false;
        }
    });

}

onMounted(() => {
    getCaptcha();
});


</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .main-section {
        // background: url('assets/img/topbs_background-image.jpg') no-repeat center center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;

        .login-form {
            width: 30%;
            padding: 1rem 3rem;
            display: flex;
            flex-direction: column;
            border-radius: 20px;
            background-color: white;
            box-shadow: 8px 10px 10px 0 rgba(0, 0, 0, 0.4);

            gap: 1px;

            :deep(.el-form-item) {
                margin-bottom: 1rem;
                border: none;
            }

            .login-input {
                border: none;

                :deep(.el-input__wrapper) {
                    border: 1px solid #E8979E;
                    border-radius: 18px;
                    padding: 0.5rem;

                    &:focus {
                        border: 1px solid #E8979E !important;
                        box-shadow: none !important;
                    }
                }

                :deep(.el-input__prefix) {
                    width: 8%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .captcha-section {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 1rem 0;

                @media screen and (max-width: 1024px) {
                    flex-direction: column;

                }

                .captcha {
                    margin: 0;
                    width: 20rem;

                    :deep(.el-input__wrapper) {
                        border: 1px solid #E8979E;
                        border-radius: 10px;
                    }
                }

                .captcha-img-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;

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
                        width: 50%;
                        height: 100%;
                        padding: 0 0.5rem;
                    }
                }
            }

            .sign-btn-section {
                margin-top: 1rem;

                :deep(.el-form-item__content) {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }

                .sign-btn {
                    background-color: #D86C7C;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    width: 40%;
                }
            }

            .btn-section {
                display: flex;
                justify-content: center;
                margin-top: 1rem;

                a {
                    &:hover {
                      cursor: pointer;
                    }
                }
            }

        }
    }
}
</style>