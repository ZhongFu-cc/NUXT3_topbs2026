<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member Center'" :secound-route="'Payment'" />

        <el-dialog v-model="remitDialogVisible" width="min(92vw, 32rem)" :close-on-click-modal="false"
            :close-on-press-escape="false" :show-close="false" class="remit-dialog">
            <template #header>
                <div class="dialog-title-box">
                    <h2>請先補上匯款帳號末五碼</h2>
                    <p>台灣會員需先填寫匯款帳號末五碼，才能繼續確認付款資訊。</p>
                </div>
            </template>

            <div class="dialog-content">
                <el-input v-model="remitAccountLast5Input" maxlength="5" placeholder="請輸入 5 碼數字" />
                <p v-if="remitDialogError" class="dialog-error">{{ remitDialogError }}</p>
            </div>

            <template #footer>
                <div class="dialog-actions">
                    <el-button @click="handleRemitDialogCancel">先不填，返回上一頁</el-button>
                    <el-button type="primary" :loading="isSavingRemitAccount" @click="submitRemitAccountLast5">
                        儲存末五碼
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <div class="table-section" v-if="!remitDialogVisible">
            <div class="table-box">
                <span class="info" v-if="memberInfo.groupRole == 'slave'">*The group registration fee must be paid by
                    the main registration member.</span>
                <table class="orders-table" :class="isTaiwan(memberInfo.country)">
                    <thead>
                        <tr class="header-row">
                            <th>Item</th>
                            <th>Payment Amount {{ memberInfo.country === 'Taiwan' ? '(TWD)' : '(USD)' }}</th>
                            <th>Payment Status</th>
                            <th v-if="memberInfo.country === 'Taiwan'">Last 5 digits of account number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in orderList" :class="isEvenOrOdd(index)">
                            <td class="first-col">{{ item.itemsSummary }}</td>
                            <td>{{ memberInfo.country === 'Taiwan' ? item.totalAmount : (item.totalAmount /
                                RATE).toFixed(2) }}</td>
                            <td :class="memberInfo.country === 'Taiwan' ? 'none' : 'last-col'">{{
                                enums.payMentStatus[item.status]
                            }}</td>
                            <td v-if="memberInfo.country === 'Taiwan'" class="last-col">
                                {{ memberInfo.remitAccountLast5 }}
                            </td>
                            <td v-if="memberInfo.country !== 'Taiwan'" class="temp-col"></td>
                            <td v-if="memberInfo.country !== 'Taiwan' && (item.status === 0 || item.status === 3)"
                                class="not-pay"
                                :class="(memberInfo.groupRole == 'slave' && item.itemsSummary == 'Group Registration Fee') || isOverDeadline ? 'disabled' : ''"
                                @click="getOrders(item.ordersId, (memberInfo.groupRole != 'slave' || item.itemsSummary != 'Group Registration Fee'))">
                                <span>Pay now</span>
                            </td>
                            <td v-if="memberInfo.country !== 'Taiwan' && item.status === 2" class="completed">
                                <span><el-icon>
                                        <ElIconCircleCheckFilled />
                                    </el-icon></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="memberInfo.country === 'Taiwan'" class="payment-info">
                <p>*戶名 : 台灣乳房腫瘤手術暨重建學會</p>
                <p>*合作金庫銀行 : 長庚分行 帳號:3638871000153</p>
                <p>*經主辦單位確認後，會修改網站上付款狀態</p>
            </div>
        </div>
        <!-- Bearer 7bedca56-c711-4559-af47-afd6d4224da8 -->


        <div v-html="form" ref="formRef" style="display: none;"></div>
    </main>
</template>

<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';


const orderListRef = ref<any>();
const router = useRouter();

const RATE = 32;


const memberInfo = ref<any>({});
const remitDialogVisible = ref(false);
const remitAccountLast5Input = ref('');
const remitDialogError = ref('');
const isSavingRemitAccount = ref(false);

const openRemitDialogIfNeeded = () => {
    console.log('Checking if remit dialog needs to be opened...', memberInfo.value);
    if (memberInfo.value.country === 'Taiwan' && !memberInfo.value.remitAccountLast5) {
        remitAccountLast5Input.value = '';
        remitDialogError.value = '';
        remitDialogVisible.value = true;
    }
}

const getMemberInfo = async () => {
    const res = await CSRrequest.get('/member/owner');

    console.log(res)
    memberInfo.value = res.data;
    openRemitDialogIfNeeded();
}



interface Order {
    itemsSummary: string;
    totalAmount: number;
    status: number;
    ordersId: number;
}

let orderList = reactive<Order[]>([])
const getOrderListForOwner = async () => {
    let res = await CSRrequest.get('/orders/owner')
    Object.assign(orderList, res.data)
    console.log(orderList)
}

const enums = {
    payMentStatus: {
        0: 'Unpaid',
        1: 'Comfirming',
        2: 'Payment completed',
        3: 'Payment failed',
    } as any,

    paymentBtnColor: {
        0: 'success',
        2: 'warning',
    } as any,
}

/**----------------------------前往付款------------------- */

const formRef = ref<any>()

const form = ref<any>()

const handleRemitDialogCancel = () => {
    remitDialogVisible.value = false;

    if (window.history.length > 1) {
        router.back();
        return;
    }

    router.push('/member-center');
}

const submitRemitAccountLast5 = async () => {
    remitDialogError.value = '';
    const value = remitAccountLast5Input.value.trim();

    if (!/^\d{5}$/.test(value)) {
        remitDialogError.value = '請輸入 5 碼數字';
        return;
    }

    isSavingRemitAccount.value = true;

    const payload = {
        memberId: memberInfo.value.memberId,
        title: memberInfo.value.title,
        chineseName: memberInfo.value.chineseName,
        firstName: memberInfo.value.firstName,
        lastName: memberInfo.value.lastName,
        email: memberInfo.value.email,
        country: memberInfo.value.country,
        remitAccountLast5: value,
        affiliation: memberInfo.value.affiliation,
        jobTitle: memberInfo.value.jobTitle,
        phone: memberInfo.value.phone,
        countryCode: memberInfo.value.countryCode,
        receipt: memberInfo.value.receipt,
        food: memberInfo.value.food,
        foodTaboo: memberInfo.value.foodTaboo,
    };

    const res = await CSRrequest.put('/member/owner', {
        body: payload,
    });

    isSavingRemitAccount.value = false;

    if (res.code !== 200) {
        remitDialogError.value = res.msg || '儲存失敗，請稍後再試';
        return;
    }

    memberInfo.value = {
        ...memberInfo.value,
        ...payload,
    };

    if (useAuth().memberInfo.value) {
        useAuth().memberInfo.value = {
            ...useAuth().memberInfo.value,
            ...payload,
        };
    }

    remitDialogVisible.value = false;
    ElMessage.success('匯款帳號末五碼已更新');
}

const getOrders = async (ordersId: number, isPayable: boolean) => {
    console.log(!isPayable)
    // console.log('isOverDeadline:', isOverDeadline.value)
    if (isOverDeadline.value) {
        return;
    }


    if (!isPayable) {
        // ElMessage.error('You are not allowed to pay for this item')
        return
    }
    let res = await CSRrequest.get(`/orders/owner/${ordersId}`)
    res = await CSRrequest.get(`/orders/payment`, {
        params: {
            id: ordersId
        }
    })

    form.value = res.data

    await nextTick();
    if (formRef.value) {
        const formItem = formRef.value.querySelector("form")
        // console.log(formItem)
        formItem.submit()
    }



}

/**---------------------------------------- */
const isEvenOrOdd = (index: number) => {
    return index % 2 === 0 ? 'even' : 'odd'
}

const isCompleted = (status: number) => {
    return status === 2 ? 'completed' : 'not-pay'
}

const isTaiwan = (country: string) => {
    return country === 'Taiwan' ? 'taiwan' : 'none'
}

const deadline = ref(new Date());
const isOverDeadline = ref(false);
const eventDays = ['2025-11-15', '2025-11-16', '2025-11-07'];

const getLocalISODate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const todayString = getLocalISODate(new Date());

const { setting } = useSetting();
watch(() => setting.value, () => {
    if (setting.value) {
        isOverDeadline.value = !setting.value.isRegistrationOpen
    }
}, { immediate: true })


onMounted(() => {
    getOrderListForOwner()
    getMemberInfo()
})
</script>

<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    :deep(.remit-dialog) {
        .el-dialog {
            border-radius: 24px;
            padding: 0.5rem;
        }
    }

    .dialog-title-box {
        h2 {
            margin: 0;
            color: #34282d;
            font-size: 1.5rem;
        }

        p {
            margin: 0.75rem 0 0;
            color: #6d5f65;
            line-height: 1.7;
        }
    }

    .dialog-content {
        .dialog-error {
            margin: 0.75rem 0 0;
            color: #c45656;
            font-size: 0.95rem;
        }
    }

    .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;

        @media screen and (max-width: 640px) {
            flex-direction: column;

            :deep(.el-button) {
                width: 100%;
                margin-left: 0;
            }
        }
    }

    .table-section {
        margin-top: 1rem;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url('assets/img/topbs_background-image.jpg') no-repeat center center;

        .table-box {
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: 15px;
            padding: 1rem;
            justify-content: center;

            .info {
                font-size: 1rem;
                color: red;
            }

            .taiwan {
                td {
                    border-right: 1px white solid;
                }

                .odd {
                    td {
                        &:not(:last-child) {
                            position: relative;

                            &::after {
                                position: absolute;
                                top: 0px;
                                right: -1px;
                                content: '';
                                display: block;
                                width: 1px;
                                height: 100%;
                                background-color: #E8979E;
                                z-index: 10;
                            }
                        }
                    }
                }
            }

            .orders-table {
                overflow: hidden;
                background-color: white;
                font-size: 1.3rem;
                border-collapse: separate;
                border-spacing: 0 0.3rem;
                width: 70vw;

                @media screen and (max-width: 1048px) {
                    font-size: 1rem;
                }

                th {
                    padding: 1rem;
                    border-radius: 15px;
                    text-align: start;
                }

                td {
                    padding: 0.5rem 1rem;
                }

                .header-row {
                    position: relative;

                    &::after {
                        position: absolute;
                        bottom: 5px;
                        right: 0;
                        content: '';
                        display: block;
                        width: 100%;
                        height: 0.1rem;
                        background-color: #CACACA;
                    }
                }

                .first-col {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                .last-col {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border: none !important;
                }



                .even {
                    td {
                        background-color: #E8979E;
                        color: white;
                        font-weight: bold;
                    }
                }

                .odd {
                    td {
                        background-color: white;
                        color: #E8979E;
                        font-weight: bold;
                    }


                }

                .btn-col {
                    background-color: white;
                    padding: 0.5rem 0.5rem;
                    border-radius: 5px;
                }


                .pay-btn {
                    background-color: #26AE07;
                    color: white;
                    height: 100%;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    margin-left: 0.3rem;
                    border-radius: 5px;
                    width: 40%;
                }


                .completed {
                    background-color: #D77102 !important;
                    color: white;
                    text-align: center;
                    border-radius: 5px;
                    cursor: default;

                }

                .temp-col {
                    background-color: white !important;
                    width: 0.1rem;
                    padding: 0;
                    border: none !important;
                }

                .not-pay {
                    text-align: center;
                    background-color: #26AE07 !important;
                    color: white !important;
                    border-radius: 5px;
                    width: 13%;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.05);
                        transition: all 0.3s ease-in-out;
                    }

                    &.disabled {
                        background-color: #26AE07 !important;
                        opacity: 0.5;
                        cursor: not-allowed;

                    }
                }

            }

        }

        .payment-info {
            font-size: 1.3rem;
            font-weight: bold;
            text-align: start;
            border-radius: 15px;
            width: 70vw;

            @media screen and (max-width: 1048px) {
                font-size: 1rem;
            }
        }
    }


}
</style>