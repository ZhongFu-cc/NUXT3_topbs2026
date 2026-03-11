<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member Login'" :secound-route="'Retrieve Password'" />
        <Title :title="'Retrieve Password'" />

        <div class="main-section">
            <el-form class="retrieve-form" ref="formRef" :model="retrieveInfo" :rules="formRules">
                <p class="tips">
                    Enter the email associated with your accouunt and we'll send an email with instructions to reset
                    your password.
                </p>
                <el-form-item>
                    <el-input v-model="retrieveInfo.email" placeholder="Email" type="email">
                        <template #prefix>
                            <img src="../assets/img/email.svg" alt="">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="send-btn" @click="submit(formRef)">Send instructions</el-button>
                </el-form-item>
            </el-form>

        </div>
    </main>
</template>
<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';
import Title from '@/components/layout/Title.vue';

import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();

const formRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
    email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
    ]
});

const retrieveInfo = reactive({
    email: ''
});

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async (valid) => {
        if (valid) {
            let res = await CSRrequest.post('/member/forget-password', {
                body: retrieveInfo
            });
            if (res.code === 200) {
                ElMessage.success(res.msg);
                formEl.resetFields();
                router.push('/login');
            } else {
                ElMessage.error(res.msg);
            }
        }
    })
}



</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .main-section {
        // background: url('assets/img/topbs_background-image.jpg') no-repeat center center;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .retrieve-form {
            width: 30%;
            padding: 1rem 3rem 2rem 3rem;
            display: flex;
            flex-direction: column;
            border-radius: 20px;
            background-color: white;
            box-shadow: 8px 10px 10px 0 rgba(0, 0, 0, 0.4);

            .tips {
                padding: 1rem;
                font-size: 1.2rem;
            }

            :deep(.el-input__wrapper) {
                border: 1px solid #E8979E;
                border-radius: 18px;
                padding: 0.5rem;

                &.is-focus {
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

            :deep(.el-form-item__content) {
                display: flex;
                justify-content: center;

                .send-btn {
                    background-color: #DE6A75;
                    color: white;
                    border-radius: 10;
                }
            }
        }
    }
}
</style>