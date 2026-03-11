<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Member Center'" :secound-route="'Payment'" />
        <div class="table-section">
            <div class="table-box">
                <span class="info">*The group registration fee must be paid by the main registration member.</span>
                <table class="orders-table" :class="isTaiwan(memberInfo.country)">
                    <tr class="header-row">
                        <th>Item</th>
                        <th>Payment Amount</th>
                        <th>Payment Status</th>
                        <th v-if="memberInfo.country === 'Taiwan'">Last 5 digits of account number</th>
                    </tr>
                    <tr v-for="(item, index) in orderList" :class="isEvenOrOdd(index)">
                        <td class="first-col">{{ item.itemsSummary }}</td>
                        <td>{{ item.totalAmount }}</td>
                        <td :class="memberInfo.country === 'Taiwan' ? 'none' : 'last-col'">{{
                            enums.payMentStatus[item.status]
                        }}</td>
                        <td v-if="memberInfo.country === 'Taiwan'" class="last-col">
                            {{ memberInfo.remitAccountLast5 }}    
                        </td>
                        <td v-if="memberInfo.country !== 'Taiwan'" class="temp-col"></td>
                        <td v-if="memberInfo.country !== 'Taiwan' && item.status === 0"  class="not-pay" :class="(memberInfo.groupRole == 'slave' && item.itemsSummary == 'Group Registration Fee') ? 'disabled' : ''">
                            <span @click="getOrders(item.ordersId, (memberInfo.groupRole != 'slave' || item.itemsSummary != 'Group Registration Fee'))">Pay now</span>
                        </td>
                        <td v-if="memberInfo.country !== 'Taiwan'&& item.status === 2" class="completed">
                            <span><el-icon >
                                <ElIconCircleCheckFilled />
                            </el-icon></span>
                        </td>
                    </tr>
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

const router = useRouter();


const memberInfo = reactive<any>({});
const getMemberInfo = async () => {
    let res = await CSRrequest.get('/member/getMemberInfo');
    if (res.code === 200) {
        // res.data.country = 'Taiwan1'
        Object.assign(memberInfo, res.data)
        console.log(memberInfo)
    } else if (res.code === 401) {
        ElMessage.error(res.msg);
        localStorage.removeItem('Authorization-member');
        router.push('/login')
    }
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
        0: 'Non-payment',
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

const getOrders = async (ordersId: number, isPayable: boolean) => {
    console.log(!isPayable)
    if (!isPayable) {
        // ElMessage.error('You are not allowed to pay for this item')
        return
    }
    let res = await CSRrequest.get(`/orders/owner/${ordersId}`)
    console.log(res.data)
    res = await CSRrequest.get(`/orders/payment`, {
        params: {
            id: ordersId
        }
    })
    form.value = res.data

    await nextTick();
    if (formRef.value) {
        const formItem = formRef.value.querySelector("form")
        console.log(formItem)
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

onMounted(() => {
    getOrderListForOwner()
    getMemberInfo()
})
</script>

<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .table-section {
        margin-top: 1rem;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        // background: url('assets/img/topbs_background-image.jpg') no-repeat center center;

        .table-box {
            // width: 80%;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: 15px;
            padding: 1rem;
            justify-content: center;

            .info {
                font-size: 1rem;
                color: red;
                // margin-bottom: 1rem;
            }

            .taiwan {
                td {
                    border-right: 1px white solid;
                }
                .odd {
                   td {
                    &:not(:last-child) {
                        position: relative;
                        &::after{
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
                border-spacing: 0 0.3rem ;
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
                    position:relative;
                    &::after {
                        position:absolute;
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
                    // font-size: 1.3rem;
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

                    &.disabled {
                        background-color: #26AE07 !important;
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                }

            }
        }

    }


}
</style>