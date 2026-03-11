<template>
    <main class="common-section">
        <Banner></Banner>
        <!-- <Breadcrumbs firstRoute="Abstracts" secoundRoute="Abstract Submission"></Breadcrumbs> -->
        <Title :title="fillableForm.title"></Title>
        <div class="form-box">
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-position="top">
                <template v-for="field in fillableForm.formFields" :key="field.formFieldId">
                    <el-form-item :label="field.label" :prop="field.formFieldId">
                        <component :is="resolveComponent(field)" v-model="formModel[field.formFieldId]"
                            :field="field" />
                    </el-form-item>
                </template>

                <div class="function-bar">
                    <el-button size="large" round class="submit-btn" type="primary" @click="submit">
                        送出
                    </el-button>
                </div>
            </el-form>
        </div>
    </main>
</template>

<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';

import { type FormDto, type FormField, FieldType } from '~/components/formField/type';
import TextQuestion from "@/components/formField/FormText.vue"
import TextareaQuestion from "@/components/formField/FormTextarea.vue"
import SelectQuestion from "@/components/formField/FormSelect.vue"
import CheckboxQuestion from "@/components/formField/FormCheckbox.vue"
import RateQuestion from "@/components/formField/FormRate.vue"
import RadioQuestion from "@/components/formField/FormRadio.vue"

import type { FormInstance, FormRules, UploadProps, UploadUserFile, UploadFile, UploadFiles, UploadInstance } from 'element-plus';

const router = useRouter();
const formId = useRoute().params.formId as string;

/**-------------------------------------------------------- */

const formRef = ref<FormInstance>()

let fillableForm = reactive<FormDto>({
    formId: '',
    title: '',
    description: '',
    status: '',
    requireLogin: 0,
    requiredForCheckout: 0,
    allowMultipleSubmissions: 0,
    startTime: '',
    endTime: '',
    formFields: []
})

const formModel = reactive<Record<string, any>>({})
const formRules = reactive<FormRules>({})

const initForm = () => {
    fillableForm.formFields
        .sort((a, b) => a.fieldOrder - b.fieldOrder)
        .forEach(field => {
            const key = field.formFieldId

            // 初始化答案
            switch (field.fieldType) {
                case 'checkbox':
                    formModel[key] = []
                    break
                case 'rate':
                    formModel[key] = field.validationRules?.min ?? 0
                    break
                default:
                    formModel[key] = ''
            }

            // required 驗證
            if (field.isRequired) {
                formRules[key] = [
                    {
                        required: true,
                        message: `${field.label} 為必填`,
                        trigger: ['blur', 'change']
                    }
                ]
            }
        })
}

const getFillableForm = async () => {
    let res = await CSRrequest.get(`form/${formId}/fill`);
    console.log("CSR獲取: ", res)
    Object.assign(fillableForm, res.data)
    console.log("fillable Form為:", fillableForm)
}

const componentMap: Record<FieldType, any> = {
    [FieldType.TEXT]: TextQuestion,
    [FieldType.TEXTAREA]: TextareaQuestion,
    [FieldType.RADIO]: RadioQuestion,
    [FieldType.CHECKBOX]: CheckboxQuestion,
    [FieldType.SELECT]: SelectQuestion,
    [FieldType.RATE]: RateQuestion,

    // 尚未製作
    [FieldType.NUMBER]: TextQuestion,
    [FieldType.EMAIL]: TextQuestion,
    [FieldType.DATE]: TextQuestion,
    [FieldType.SECTION]: TextQuestion,
    [FieldType.IMAGE]: TextQuestion,
};

const resolveComponent = (field: FormField) => {
    return componentMap[field.fieldType]
}

watch(() => fillableForm.formFields, initForm, { immediate: true })

const buildSubmitPayload = () => {
    return {
        formId: fillableForm.formId,
        memberId: undefined,
        //Object.entries 物件轉成陣列
        responseAnswerList: Object.entries(formModel)
            //處理空字串、空值，_ 只是代表「我不使用這個變數」。
            .filter(([_, value]) => {
                if (Array.isArray(value)) return value.length > 0
                return value !== '' && value !== null && value !== undefined
            })
            .map(([formFieldId, value]) => ({
                formFieldId: formFieldId,
                answerValue: Array.isArray(value)
                    ? value.join(',')
                    : String(value)
            }))
    }
}

const submit = async () => {

    if (!formRef.value) return

    const valid = await formRef.value.validate().catch(() => false)

    if (!valid) return

    const payload = buildSubmitPayload()
    console.log("目前數值為: ", payload)

    await CSRrequest.post(`form-response`, {
        body: payload
    })

    ElMessage.success("填寫完成")
    router.push("/form/finish")

}

onMounted(() => {
    getFillableForm()
})

</script>

<style lang="scss" scoped>
.form-box {
    width: 50%;
    margin: 3% auto;

    @media screen and (max-width:800px) {
        width: 90%;
    }

    .function-bar {
        text-align: center;
        margin: 2% 0;
    }

}
</style>