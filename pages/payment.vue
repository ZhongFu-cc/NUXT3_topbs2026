<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member Center'" :secound-route="'Payment'" />

        <el-dialog v-model="remitDialogVisible" width="min(92vw, 32rem)" :close-on-click-modal="false"
            :close-on-press-escape="false" :show-close="false" class="remit-dialog">
            <template #header>
                <div class="dialog-title-box">
                    <h2>確認付款資訊</h2>
                    <p>台灣會員送出付款確認前，需提供匯款帳號末五碼以利主辦單位核對。</p>
                </div>
            </template>

            <div class="dialog-content">
                <div v-if="hasSavedRemitAccount" class="saved-remit-info">
                    <p>已填寫的末五碼</p>
                    <el-input v-model="memberInfo.remitAccountLast5"></el-input>
                </div>
                <template v-else>
                    <p class="input-caption">請輸入匯款帳號末五碼</p>
                    <el-input v-model="remitAccountLast5Input" maxlength="5" placeholder="請輸入 5 碼數字" />
                </template>
                <p v-if="remitDialogError" class="dialog-error">{{ remitDialogError }}</p>
            </div>

            <template #footer>
                <div class="dialog-actions">
                    <el-button @click="handleRemitDialogCancel">取消</el-button>
                    <el-button type="primary" :loading="isSavingRemitAccount"
                        :disabled="!canConfirmTaiwanPayment || isSavingRemitAccount" @click="confirmPayment">
                        確認付款
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <div class="table-section">
            <div v-if="memberInfo.country === 'Taiwan'" class="payment-info">
                <p>*戶名 : 台灣乳房腫瘤手術暨重建學會</p>
                <p>*合作金庫銀行 : 長庚分行 帳號:3638871000153</p>
                <p>*請於匯款後點擊下方付款按鈕，並輸入帳戶末五碼以利主辦單位核對。</p>
            </div>
            <div class="table-box">
                <span class="info" v-if="memberInfo.groupRole == 'slave'">*The group registration fee must be paid by
                    the main registration member.</span>
                <table class="orders-table" :class="isTaiwan(memberInfo.country)">
                    <thead>
                        <tr class="header-row">
                            <th>Item</th>
                            <th>Payment Amount {{ memberInfo.country === 'Taiwan' ? '(TWD)' : '(USD)' }}</th>
                            <th :colspan="2">Payment Status</th>
                            <!-- <th></th> -->
                            <!-- <th v-if="memberInfo.country === 'Taiwan'">Last 5 digits of account number</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in orderList" :class="isEvenOrOdd(index)">
                            <td class="first-col">{{ item.itemsSummary }}</td>
                            <td>{{ memberInfo.country === 'Taiwan' ? item.totalAmount : (item.totalAmount /
                                RATE).toFixed(2) }}</td>
                            <td class="last-col">{{
                                enums.payMentStatus[item.status]
                                }}</td>
                            <!-- <td v-if="memberInfo.country === 'Taiwan'" class="last-col">
                                {{ memberInfo.remitAccountLast5 }}
                            </td> -->
                            <td v-if="memberInfo.country !== 'Taiwan'" class="temp-col"></td>
                            <td v-if="memberInfo.country !== 'Taiwan' && (item.status === 0 || item.status === 3)"
                                class="not-pay"
                                :class="(memberInfo.groupRole == 'slave' && item.itemsSummary == 'Group Registration Fee') || isOverDeadline ? 'disabled' : ''"
                                @click="getOrders(item.ordersId, (memberInfo.groupRole != 'slave' || item.itemsSummary != 'Group Registration Fee'))">
                                <span>Pay now</span>
                            </td>
                            <td v-if="memberInfo.country === 'Taiwan' && (item.status === 0 || item.status === 3)"
                                class="not-pay" :class="isOverDeadline ? 'disabled' : ''"
                                @click="openTaiwanPaymentDialog(item.ordersId)">
                                <span>付款</span>
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

        </div>
        <!-- Bearer 7bedca56-c711-4559-af47-afd6d4224da8 -->


        <div v-html="form" ref="formRef" style="display: none;"></div>
    </main>
</template>

<script lang="ts" setup>
import Banner from '@/components/layout/Banner.vue';
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue';


const orderListRef = ref<any>();

const RATE = 32;


const memberInfo = ref<any>({});
const remitDialogVisible = ref(false);
const remitAccountLast5Input = ref('');
const remitDialogError = ref('');
const isSavingRemitAccount = ref(false);
const hasSavedRemitAccount = computed(() => {
    const value = String(memberInfo.value?.remitAccountLast5 ?? '').trim();
    return /^\d{5}$/.test(value);
});
const canConfirmTaiwanPayment = computed(() => {
    if (hasSavedRemitAccount.value) {
        return true;
    }

    return /^\d{5}$/.test(remitAccountLast5Input.value.trim());
});

const targetOrderId = ref<string>('')
const openTaiwanPaymentDialog = (ordersId: string) => {
    if (isOverDeadline.value) {
        return;
    }

    remitDialogError.value = '';
    remitAccountLast5Input.value = hasSavedRemitAccount.value ? String(memberInfo.value.remitAccountLast5) : '';
    remitDialogVisible.value = true;

    targetOrderId.value = ordersId
}

const getMemberInfo = async () => {
    const res = await CSRrequest.get('/member/owner');

    console.log(res)
    memberInfo.value = res.data;
}



interface Order {
    itemsSummary: string;
    totalAmount: number;
    status: number;
    ordersId: string;
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
}

const getOrders = async (ordersId: string, isPayable: boolean) => {
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

interface orderStatusPayload {
    orderId: string;
    remitAccountLast5: string;
}

const confirmPayment = async () => {
    if (!canConfirmTaiwanPayment.value) {
        remitDialogError.value = 'Please enter the last 5 digits of the remittance account number.';
        return;
    }

    if (targetOrderId.value === '') {
        remitDialogError.value = 'Invalid order. Please try again.';
        return;
    }

    const payload: orderStatusPayload = { orderId: targetOrderId.value, remitAccountLast5: remitAccountLast5Input.value.trim() }

    try {
        const res: any = await CSRrequest.put('/orders/offline-transfer', {
            body: payload,
        });

        if (res.code !== 200) {
            ElNotification.error({
                title: 'Error',
                message: res.msg || 'Failed to update payment information. Please try again later.',
            });
            return;
        }
        ElNotification.success({
            title: 'Success',
            message: 'Payment information updated successfully.',
        });
        remitDialogVisible.value = false;
        getOrderListForOwner();
    } catch (error) {
        ElNotification.error({
            title: 'Error',
            message: 'Failed to update payment information. Please try again later.',
        });
    }
}


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
        .input-caption {
            margin: 0 0 0.5rem;
            color: #6d5f65;
            font-weight: 600;
        }

        .saved-remit-info {
            padding: 0.75rem 0.85rem;
            border: 1px solid #e5d3d7;
            border-radius: 10px;
            background-color: #faf6f7;

            p {
                margin: 0;
                font-size: 0.92rem;
                color: #7a646a;
            }

            .el-input {
                display: block;
                margin-top: 1rem;
                font-size: 1.15rem;
                letter-spacing: 0.08em;
                color: #3f2f35;
            }
        }

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
            width: min(100%, 1120px);
            box-sizing: border-box;
            overflow-x: auto;

            @media screen and (max-width: 640px) {
                overflow-x: visible;
                padding: 0.75rem;
            }

            .info {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                width: fit-content;
                margin: 0 0 0.85rem;
                padding: 0.55rem 0.8rem;
                border-radius: 10px;
                border: 1px solid #f2c9cf;
                background-color: #fff5f6;
                font-size: 0.95rem;
                font-weight: 600;
                color: #b94858;
                line-height: 1.45;

                &::before {
                    content: '!';
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius: 999px;
                    background-color: #b94858;
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 700;
                    flex-shrink: 0;
                }
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
                font-size: clamp(1rem, 1.4vw, 1.2rem);
                border-collapse: separate;
                border-spacing: 0 0.4rem;
                width: 100%;
                min-width: 760px;

                @media screen and (max-width: 1048px) {
                    font-size: 1rem;
                }

                @media screen and (max-width: 768px) {
                    min-width: 640px;
                }

                th {
                    padding: 0.95rem 1rem;
                    border-radius: 12px;
                    text-align: start;
                    font-weight: 700;
                    color: #6b4b53;
                    background-color: #fff5f7;
                    white-space: nowrap;
                    border-bottom: 1px solid #d6cdd1;
                }

                td {
                    padding: 0.8rem 1rem;
                    vertical-align: middle;
                }

                .first-col {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    min-width: 18ch;
                }

                .last-col {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border: none !important;
                    white-space: nowrap;
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
                    min-width: 8.5rem;

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
                    min-width: 8.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    white-space: nowrap;
                    transition: background-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;

                    &:hover {
                        background-color: #229a06 !important;
                        box-shadow: 0 6px 14px rgba(38, 174, 7, 0.25);
                    }

                    &.disabled {
                        background-color: #26AE07 !important;
                        opacity: 0.5;
                        cursor: not-allowed;
                        pointer-events: none;

                    }
                }

                @media screen and (max-width: 768px) {
                    th {
                        padding: 0.75rem 0.8rem;
                    }

                    td {
                        padding: 0.65rem 0.8rem;
                    }
                }

                // Mobile card layout
                @media screen and (max-width: 640px) {
                    display: block;
                    min-width: unset;
                    width: 100%;
                    border-spacing: 0;

                    thead {
                        display: none;
                    }

                    tbody {
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;
                    }

                    tr {
                        display: block;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid rgba(232, 151, 158, 0.3);

                        // even row: value bg = soft pink, label bg = deeper pink
                        &.even {
                            background-color: #f9eced;

                            td {
                                background-color: transparent;
                                text-align: center;
                                color: rgb(85, 82, 82);
                                font-weight: 600;
                                border-bottom: 1px solid rgba(232, 151, 158, 0.25);

                                &::before {
                                    background-color: #E8979E;
                                    color: #fff;
                                }
                            }
                        }

                        // odd row: value bg = white, label bg = light pink
                        &.odd {
                            background-color: #fff;

                            td {
                                background-color: transparent;
                                color: #7a3d48;
                                font-weight: 600;
                                border-bottom: 1px solid rgba(232, 151, 158, 0.18);

                                &::before {
                                    background-color: #f2d6da;
                                    color: #7a3d48;
                                }
                            }
                        }

                        td:last-child {
                            border-bottom: none;
                        }
                    }

                    td {
                        display: flex !important;
                        align-items: center;
                        justify-content: flex-start;
                        border-radius: 0 !important;
                        padding: 0;
                        gap: 0;
                        min-height: 3rem;

                        &::before {
                            display: flex;
                            align-items: center;
                            align-self: stretch;
                            min-width: 6rem;
                            padding: 0.65rem 0.8rem;
                            font-size: 0.82rem;
                            font-weight: 700;
                            letter-spacing: 0.03em;
                            white-space: nowrap;
                            flex-shrink: 0;
                            margin-right: 1rem;
                        }

                        padding-right: 0.8rem;
                        line-height: 1.4;

                        &:nth-child(1)::before {
                            content: 'Item';
                        }

                        &:nth-child(2)::before {
                            content: 'Amount';
                        }

                        &:nth-child(3)::before {
                            content: 'Status';
                        }
                    }

                    .temp-col {
                        display: none !important;
                    }

                    .not-pay,
                    .completed {
                        justify-content: center;
                        border-radius: 0 !important;
                        min-width: unset;
                        padding: 0.75rem 0.9rem;
                        border-bottom: none !important;

                        &::before {
                            content: none !important;
                            min-width: 0;
                            padding: 0;
                        }
                    }

                    &.taiwan {
                        td {
                            border-right: none !important;
                        }

                        .odd td::after {
                            display: none !important;
                        }
                    }
                }
            }

        }

        .payment-info {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            margin-bottom: 1rem;
            padding: 1rem 1.15rem;
            border-radius: 14px;
            border: 1px solid #f0d3d8;
            background: linear-gradient(180deg, #fff7f8 0%, #fffefe 100%);
            box-sizing: border-box;
            font-size: 1.05rem;
            font-weight: 600;
            text-align: start;
            width: min(100%, 1120px);

            p {
                margin: 0;
                color: #6a4d55;
                line-height: 1.6;
            }

            p:first-child {
                color: #8a3e4d;
            }

            @media screen and (max-width: 1048px) {
                font-size: 1rem;
                padding: 0.85rem 0.9rem;
                gap: 0.35rem;
            }

            @media screen and (max-width: 640px) {
                font-size: 0.95rem;
            }
        }
    }


}
</style>