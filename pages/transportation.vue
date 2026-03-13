<template>
    <div>
        <main class="common-section">
            <Banner></Banner>
            <div class="title-section">
                <p class="title">
                    交通資訊
                </p>
            </div>
            <div class="map-box">
                <iframe class="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0165568738184!2d121.55831637622504!3d25.033512177816732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb61ab3d33f%3A0xab0d0f7ac395bff4!2z5Y-w5YyX5ZyL6Zqb5pyD6K2w5Lit5b-DKFRJQ0Mp!5e0!3m2!1szh-TW!2stw!4v1739263463546!5m2!1szh-TW!2stw"
                    height="450" style="border:0;" allowfullscreen="false" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="map-info">
                <p class="map-info-item">台北國際會議中心(TICC)</p>
                <p class="map-info-item">11049, 台北市信義路五段1號</p>
                <p class="map-info-item">電話: +886(2)2725-5200</p>
                <p class="map-info-item">傳真: +886(2)2723-2589</p>
                <p class="map-info-item">電子郵件: ticc@taitra.org.tw</p>
            </div>
            <div class="shadow-divider"></div>
            <div class="transportation-1">
                <img src="../assets/img/transport.png" alt="">
            </div>

            <div class="transport-table">
                <table>
                    <thead>
                        <tr>
                            <th class="left-top-corner"> </th>
                            <th>路線/時刻表</th>
                            <th>行程時間</th>
                            <th class="right-top-corner">票價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="row-2">
                            <td>
                                <p class="transportation">桃園機場捷運</p>
                            </td>
                            <td>
                                <div>第一航廈: <span>A12</span> <el-icon>
                                        <ElIconRight />
                                    </el-icon> <span>A1</span></div>
                                <div>第二航廈: <span>A13</span> <el-icon>
                                        <ElIconRight />
                                    </el-icon> <span>A1</span></div>
                            </td>
                            <td>50 分鐘</td>
                            <td>NTD $160</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="row-3">
                            <td>
                                <p class="transportation">台北松山機場捷運</p>
                            </td>
                            <td>
                                <p>松山機場: <span>BR13</span> <el-icon>
                                        <ElIconRight />
                                    </el-icon> <span>R03</span></p>
                            </td>
                            <td>17 分鐘</td>
                            <td>NTD $25</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="row-4">
                            <td>
                                <p class="transportation">捷運</p>
                            </td>
                            <td>
                                <p>台北車站</p>
                                <div><span>BL12</span><span>R10</span><el-icon>
                                        <ElIconRight />
                                    </el-icon><span>BR09</span><span>R05</span><el-icon>
                                        <ElIconRight />
                                    </el-icon><span>R03</span>
                                </div>
                            </td>
                            <td>15 分鐘</td>
                            <td>NTD $25</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="row-5">
                            <td>
                                <p class="transportation">iBus(1960)</p>
                                <span class="small-font transportation-hint">公車位置</span>
                                <div class="small-font transportation-hint">
                                    <!-- <div>第一航廈:</div> -->
                                    <div>
                                        <!-- <div>接駁公車</div> -->
                                        <div>第一航廈: 地下1樓旅客候車區</div>
                                    </div>
                                </div>
                                <div class="small-font transportation-hint">
                                    <!-- <div>第二航廈:</div> -->
                                    <div>
                                        <!-- <div>接駁公車</div> -->
                                        <div> 第二航廈: 1樓旅客候車區
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                第一航廈/第二航廈 -> 台北君悅酒店
                                <div class="bus-timetable">
                                    <span class="small-font">時刻表:</span>
                                    <span class="small-font">00:15、12:40、06:50、07:30、09:00、10:20、
                                    </span>
                                    <span class="small-font">11:20、12:40、
                                        14:00、15:00、15:40、17:40、</span>
                                    <span class="small-font">19:10、21:10、22:40</span>
                                </div>
                            </td>
                            <td>90 分鐘</td>
                            <td>NTD $190</td>

                        </tr>
                    </tbody>
                    <tbody>
                        <tr class="row-6">
                            <td class="left-bottom-corner" :rowspan="2">
                                <div class="transportation">計程車</div>
                            </td>
                            <td class="line">桃園機場 <el-icon>
                                    <ElIconRight />
                                </el-icon> TICC</td>
                            <td>1-1.5 小時</td>
                            <td>NTD $1310</td>

                        </tr>
                        <tr>
                            <td class="line">台北松山機場捷運 <el-icon>
                                    <ElIconRight />
                                </el-icon> TICC</td>
                            <td>10-30 分鐘</td>
                            <td class="right-bottom-corner">NTD $225</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mobile-table-section">
                <p class="transport-title">桃園機場捷運</p>
                <table class="transport-mobile-table">
                    <thead>
                        <tr>
                            <th>
                                路線/時刻表
                            </th>
                            <th>
                                行程時間
                            </th>
                            <th>
                                票價
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="tayouan-airport-mrt-line">
                                <span>
                                    第一航廈: <span class="line-number">A12</span>
                                    <el-icon>
                                        <ElIconRight />
                                    </el-icon>
                                    <span class="line-number">A1</span>
                                </span>
                                <span>
                                    第二航廈:
                                    <span class="line-number">A13</span>

                                    <el-icon>
                                        <ElIconRight />
                                    </el-icon>
                                    <span class="line-number">A1</span>
                                </span>
                            </td>
                            <td>50 分鐘</td>
                            <td>NTD $160</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        </tr>
                    </tbody>
                </table>
                <div class="shadow-divider"></div>
                <p class="transport-title">台北松山機場捷運</p>
                <table class="transport-mobile-table">
                    <thead>
                        <tr>
                            <th>
                                路線/時刻表
                            </th>
                            <th>
                                行程時間
                            </th>
                            <th>
                                票價
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="taipei-songshan-airport-mrt">
                                <span>
                                    松山機場:
                                </span>
                                <span>
                                    <span class="line-number">BR13</span> <el-icon>
                                        <ElIconRight />
                                    </el-icon> <span class="line-number">R03</span>
                                </span>
                            </td>
                            <td>17 分鐘</td>
                            <td>NTD $25</td>
                        </tr>
                    </tbody>
                    <tr>
                    </tr>
                    <tr>
                    </tr>
                </table>
                <div class="shadow-divider"></div>
                <p class="transport-title">捷運</p>
                <table class="transport-mobile-table">
                    <thead>
                        <tr>
                            <th>
                                路線/時刻表
                            </th>
                            <th>
                                行程時間
                            </th>
                            <th>
                                票價
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="mrt">
                                <div>台北車站</div>
                                <div class="line-section">
                                    <div class="line-box">
                                        <span class="line-number bl12">BL12</span>
                                        <span class="line-number">R10</span>
                                    </div>
                                    <el-icon class="arrow">
                                        <ElIconRight />
                                    </el-icon>
                                    <div class="line-box">
                                        <span class="line-number br09"> BR09</span>
                                        <span class="line-number"> R05</span>
                                    </div>
                                    <el-icon class="arrow">
                                        <ElIconRight />
                                    </el-icon>
                                    <div class="line-box">
                                        <span class="line-number">R03</span>
                                    </div>
                                </div>
                            </td>
                            <td>15 分鐘</td>
                            <td>NTD $25</td>
                        </tr>
                    </tbody>
                </table>
                <div class="shadow-divider"></div>
                <p class="transport-title">iBus(1960)</p>
                <div class="ibus-location">
                    <p>公車位置:</p>
                    <p>
                        第一航廈: 地下1樓旅客候車區
                    </p>
                    <p>
                        第二航廈: 1樓旅客候車區
                    </p>
                </div>
                <table class="transport-mobile-table">
                    <thead>
                        <tr>
                            <th>路線/時刻表</th>
                            <th>行程時間</th>
                            <th>票價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ibus">
                                <div class="line-name">
                                    <span>第一航廈/第二航廈</span>
                                    <el-icon class="arrow">
                                        <ElIconRight />
                                    </el-icon>
                                    <span>台北君悅酒店</span>
                                </div>
                                <div class="time-table">
                                    <span class="title">時刻表:</span>
                                    <span class="time">00:15、12:40、06:50、07:30、09:00、10:20、
                                        11:20、12:40、14:00、15:00、15:40、17:40、
                                        19:10、21:10、22:40</span>
                                </div>
                            </td>
                            <td>90 分鐘</td>
                            <td>NTD $190</td>
                        </tr>
                    </tbody>
                </table>
                <div class="shadow-divider"></div>
                <p class="transport-title">Taxi</p>
                <table class="transport-mobile-table">
                    <thead>
                        <tr>
                            <th>路線/時刻表</th>
                            <th>行程時間</th>
                            <th>票價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="taxi">
                            <td class="no-radius">
                                <div>桃園機場</div>
                                <div class="taxi-arrow">-></div>
                                <div>台北國際會議中心</div>
                            </td>
                            <td>
                                <div>1-1.5</div>
                                <div>小時</div>
                            </td>
                            <td class="no-radius">
                                <div>NTD</div>
                                <div>$1310</div>
                            </td>
                        </tr>
                        <tr class="taxi">
                            <td>
                                <div>台北松山機場捷運</div>
                                <div class="taxi-arrow">-></div>
                                <div>台北國際會議中心</div>
                            </td>
                            <td>
                                <div>10-30</div>
                                <div>分鐘</div>
                            </td>
                            <td>NTD $225</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <p class="tips">*MRT (Taiwan Mass Rapid Transit)</p> -->
            </div>

            <div class="paragraph">桃園機場捷運</div>
            <div class="mrt-img-box">
                <img src="../assets/img/mrt_en.jpg" alt="">
            </div>
            <div class="paragraph">台北捷運</div>
            <div class="taipei-mrt-img-box">
                <img src="../assets/img/metrotaipeimap.jpg" alt="">
            </div>

            <div class="back-to-top" @click="backToTop">
                <img src="../assets/img/top.png" alt="">
            </div>
        </main>



    </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Banner from '@/components/layout/Banner.vue';

useSeoMeta({
    title: 'Transportation - 9th IOPBS & TOPBS 2025 International Conference on Oncoplastic Breast Surgery',
    description: 'Explore the transportation options for the 9th IOPBS & TOPBS 2025 International Conference on Oncoplastic Breast Surgery. This page provides detailed information on how to reach the venue, including MRT, bus, and taxi services.',
    keywords: 'Transportation , 9th IOPBS, IOPBS 2025, TOPBS 2025, 2025 IOPBS, 2025 TOPBS '
})


const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
</script>
<style lang="scss" scoped>
.common-section {
    // width: $common-section-width;
    // margin: $common-section-margin;
    font-family: $common-section-font-family;

    .content {
        margin: 1rem auto;
        text-align: center;

        h1 {
            font-size: 2rem;
        }
    }

    .title-section {
        margin: 1rem 0;
        text-align: center;
        position: relative;

        .title {
            font-size: 2.7rem;
            font-weight: 600;
        }

    }

    .map-box {
        width: 100%;
        display: flex;
        justify-content: center;

        .google-map {
            width: 70%;
            height: 60vh;
        }
    }

    .map-info {
        width: 70vw;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem auto;

        .map-info-item {
            font-size: 1.5rem;
            letter-spacing: 0.1rem;
            margin: 0.5rem 0;
        }
    }

    .transportation-1 {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;

        img {
            margin: 3% auto;
            width: 88%;
        }
    }

    .mrt-img-box {
        display: flex;
        margin: 1rem auto;
        width: 80%;

        img {
            width: 100%;
        }
    }

    .taipei-mrt-img-box {
        display: flex;
        margin: 1rem auto;
        width: 80%;

        img {
            width: 100%;
        }
    }

    .paragraph {
        font-size: 2rem;
        color: #D36672;
        margin: 1rem auto;
        padding-left: 10rem;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            width: 8rem;
            height: 5px;
            background-color: #D36672;
            left: 0;
            top: 1.1rem;
        }
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

    .back-to-top {
        position: fixed;
        bottom: 27%;
        right: 2rem;
        width: 4rem;
        height: 4rem;

        img {
            width: 100%;
        }
    }

    .transport-table {
        width: 90%;
        margin: 1rem auto;
        font-family: "思源黑體", "Arial", sans-serif;

        @media screen and (max-width: 1024px) {
            display: none;
        }


        p {
            display: inline-block !important;
        }


        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: 1px solid black;
            border-radius: 15px;
            text-align: start;

            th {
                padding: 1rem;
                font-size: 1.3rem;
                background-color: #D36672;
                border: 1px solid black;

                color: white;
                text-align: center;
            }

            td {
                padding: 1rem 0.1rem 1rem 1rem;
                // text-wrap: nowrap;
                font-size: 1.3rem;
                border: 1px solid black;

                @media screen and (max-width: 1023px) {
                    font-size: 1rem;
                    padding: 1rem 0.1rem 1rem 0.5rem;

                }

            }

            .transportation {
                // padding: 0.2rem 2rem;
                font-size: 1.5rem;
                text-wrap: nowrap;
                color: #D36672;
            }

            .row-2 {
                padding: 0 1rem;

                td {

                    div {
                        margin: 0.5rem 0 0.5rem 0;
                        display: flex;
                        align-items: center;
                    }

                    span {
                        background-color: #70448E;
                        color: white;
                        border-radius: 13px;
                        font-weight: normal;
                        padding: 0.5rem 1rem;
                        margin: 0 0.5rem;
                    }
                }
            }

            .row-3 {
                text-align: start;
                padding: 0 1rem;

                td {
                    text-align: start;

                    p {
                        margin: 0.5rem 0 0 0;
                        display: flex;
                        align-items: center;
                    }

                    span {
                        &:first-child {
                            background-color: #B78537;
                        }

                        &:last-child {
                            background-color: #C7182D;
                        }

                        color: white;
                        font-weight: normal;
                        border-radius: 13px;
                        padding: 0.5rem 1rem;
                        margin: 0 0.5rem 0 0.5rem;
                    }
                }
            }

            .row-4 {
                text-align: start;
                padding: 0 1rem;

                td {
                    text-align: start;

                    div {
                        margin: 0.5rem 0 0 0;
                        display: flex;
                        align-items: center;
                        text-wrap: nowrap;
                    }

                    span {

                        &:nth-child(even),
                        &:last-child {
                            background-color: #C7182D;
                        }

                        &:nth-child(1) {
                            background-color: #1165A6;
                        }

                        &:nth-child(5) {
                            background-color: #B78537;
                        }

                        color: white;
                        font-weight: normal;
                        border-radius: 13px;
                        padding: 0.5rem 1rem;
                    }
                }
            }

            .row-5 {
                td {

                    p {
                        margin: 0.5rem 0 0 0;
                        display: flex;
                        align-items: center;
                    }

                    .small-font {
                        font-size: 1rem;
                        font-weight: normal;
                    }

                    .transportation-hint {
                        font-size: 1rem;
                        padding: 0 2rem;
                        text-wrap: nowrap;
                        display: flex;
                        align-items: flex-start;
                    }

                    .bus-timetable {
                        width: 65%;
                        background-color: #D36672;
                        border-radius: 10px;
                        color: white;
                        padding: 0.5rem 0.5rem;
                        text-align: start;
                        display: flex;
                        flex-direction: column;
                        margin-top: 0.5rem;

                        span {
                            margin: 0rem 0 0 1rem;
                        }
                    }
                }
            }

            .row-6 {
                .line {
                    display: flex;
                    // justify-content: center;
                    align-items: center;
                }
            }

            .left-top-corner {
                border-top-left-radius: 15px;
            }

            .left-bottom-corner {
                border-bottom-left-radius: 15px;
            }

            .right-top-corner {
                border-top-right-radius: 15px;
            }

            .right-bottom-corner {
                border-bottom-right-radius: 15px;
            }
        }
    }

    /**================Mobile===================== */
    .mobile-table-section {
        width: 95%;
        margin: 1rem auto;

        @media screen and (min-width: 1025px) {
            display: none;

        }

        .transport-title {
            color: #D36672;
            font-size: 2rem;
            width: 90%;
            margin: 0.3rem auto;
        }

        .transport-mobile-table {
            border: 1px solid black;
            border-radius: 15px;
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;

            th {
                padding: 1rem;
                font-size: 1.3rem;
                background-color: #D36672;
                border: 1px solid black;

                color: white;
                text-align: center;


                &:first-of-type {
                    border-top-left-radius: 15px;
                    width: 60%;
                }

                &:last-of-type {
                    border-top-right-radius: 15px;
                }
            }

            td {
                padding: 1rem 1rem 1rem 1rem;
                font-size: 1.3rem;
                border: 1px solid black;
                // text-align: center;

                &:first-of-type {
                    border-bottom-left-radius: 15px;
                }

                &:last-of-type {
                    border-bottom-right-radius: 15px;
                }

                @media screen and (max-width: 576px) {
                    padding: 1rem 0.1rem;

                }
            }

            .time {
                justify-content: flex-start;
                display: inline-block;
                margin-left: 0.5rem;
            }

        }

    }

    .tayouan-airport-mrt-line {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;

        .line-number {
            background-color: #70448E;
            color: white;
            border-radius: 8px;
            padding: 0.5rem 1rem;
        }
    }

    .taipei-songshan-airport-mrt {
        gap: 1rem;

        @media screen and (max-width: 576px) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

        }

        .line-number {
            color: white;
            border-radius: 8px;
            padding: 0.5rem 1rem;

            &:first-of-type {
                background-color: #B78537;
            }

            &:last-of-type {
                background-color: #C7182D;
            }
        }
    }

    .mrt {
        gap: 1rem;
        display: flex;
        flex-direction: column;

        .line-section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;

            @media screen and (max-width: 576px) {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .arrow {
                    transform: rotate(90deg);
                }

            }

            .line-box {
                display: flex;
                gap: 0.1rem;

                .line-number {
                    color: white;
                    background-color: #C7182D;
                    border-radius: 8px;
                    padding: 0.5rem 1rem;

                    &.bl12 {
                        background-color: #1165A6;
                    }

                    &.br09 {
                        background-color: #B78537;
                    }
                }
            }
        }

    }

    .ibus-location {
        width: 90%;
        margin: 0.5rem auto;
        text-align: start;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .ibus {
        gap: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .line-name {
            text-align: center;
            display: flex;
            align-items: center;

            @media screen and (max-width: 576px) {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .arrow {
                    transform: rotate(90deg);
                }

            }
        }

        .time-table {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background-color: #D36672;
            color: white;
            border-radius: 10px;
            padding: 0.5rem 0.5rem;
        }
    }

    .taxi {
        .no-radius {
            border-radius: 0 !important;
        }

        .taxi-arrow {
            @media screen and (max-width: 576px) {
                display: inline-block;
                transform: rotate(90deg);

            }
        }
    }

    .tips {
        font-size: 1rem;
        padding-left: 1rem;
        margin: 1rem 0;

    }



}
</style>