<!-- 團隊介紹組件 -->
<template>
    <section class="team-detail-section">
        <div class="team-detail-box">
            <div class="detail-item" v-for="(doctor, index) in memberList " :key="index" ref="itemRefs"
                :class="{ 'visible': itemVisibility[index] }">
                <!-- 醫師圖片 -->
                <div class="detail-img-box">
                    <img :src=doctor.imgURL alt="醫師照片">
                </div>

                <!-- 醫師資訊 -->
                <div class="detail-content">

                    <div class="doctor-header">
                        <h1 class="doctor-name">{{ doctor.name }}
                            <span class="doctor-title">{{ doctor.jobTitle }}</span>

                            <span class="detail-appointment-link-box">
                                <a :href="doctor.appointmentLink" target="_blank" class="detail-appointment-link">掛號</a>
                            </span>
                        </h1>
                    </div>

                    <div class="doctor-info">

                        <!-- 背景陰影 -->
                        <div class="doctor-info-shadow"></div>

                        <div class="experience-section">
                            <h2>經歷</h2>
                            <ul>
                                <li v-for="(item, index) in doctor.experience " :key="index">{{ item }}</li>
                            </ul>
                        </div>

                        <div class="expertise-section">
                            <h2>主治項目</h2>
                            <ul>
                                <li v-for="(item, index) in doctor.expertise " :key="index">{{ item }}</li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

//獲取路由參數
const route = useRoute()


let memberList = reactive([
    {
        name: "許毓昭",
        jobTitle: "副院長",
        experience: [
            "台北醫學大學醫學系",
            "林口長庚醫院泌尿科 主治醫師",
            "教育部部定 助理教授",
            "美國馬里蘭大學 研究員",
            "台灣泌尿科醫學會 秘書長",
            "台灣尿失禁協會 理事"
        ],
        expertise: [
            "雷射攝護腺手術", "攝護腺蒸氣消融手術", "微創疝氣手術",
            "微創結石手術", "男女尿失禁", "男性結紮", "包皮", "性病預防治療不孕症及性功能"
        ],
        imgURL: "/img/team-img-01.png",
        appointmentLink: "https://thcloudsrv.these.com.tw/opdregweb/Menu.aspx?hospitalID=1531020122&doct=0808"
    },
    {
        name: "張慧朗",
        jobTitle: "教授",
        experience: [
            "教育部部定 教授",
            "林口長庚醫院 副院長",
            "林口長庚外科部長",
            "林口長庚泌尿科系 主任",
            "醫學資訊學會 理事長"
        ],
        expertise: [
            "攝護腺疾病", "婦女尿失禁"
        ],
        imgURL: "/img/team-img-02.png",
        appointmentLink: "https://thcloudsrv.these.com.tw/opdregweb/Menu.aspx?hospitalID=1531020122&doct=0810"
    },
    {
        name: "朱聖賢",
        jobTitle: "副教授",
        experience: [
            "長庚醫院泌尿科 臨床教授",
            "長庚醫院泌尿科 主任",
            "長庚醫院顧問 醫師",
            "美國紐約羅徹斯特醫學中心 研究員",
        ],
        expertise: [
            "一般泌尿科", "尿路結石", "攝護腺肥大"
        ],
        imgURL: '/img/team-img-03.png',
        appointmentLink: "https://thcloudsrv.these.com.tw/opdregweb/Menu.aspx?hospitalID=1531020122&doct=0812"
    },
    {
        name: "曲元正",
        jobTitle: "主任",
        experience: [
            "林口長庚醫院泌尿腫瘤科  主治醫師",
            "林口長庚醫院泌尿科  總醫師",
            "林口長庚醫院泌尿科  住院醫師",
            "林口長庚醫院外科部  住院醫師",

        ],
        expertise: [
            "攝護腺雷射手術，攝護腺水蒸氣消融治療",
            "攝護腺抗原(PSA)增高：核磁共振導引攝護腺精準切片手術",
            "攝護腺癌：攝護腺海扶刀手術",
            "泌尿上皮癌：軟式輸尿管鏡雷射氣化手術",
            "腹股溝疝氣：微創腹腔鏡疝氣修補手術",
            "結石：體外震波碎石手術，軟式輸尿管鏡碎石手術",
            "包皮過長：包皮槍手術",
            "病毒疣：雷射氣化手術"
        ],
        imgURL: "/img/team-img-04.png",
        appointmentLink: "https://thcloudsrv.these.com.tw/opdregweb/Menu.aspx?hospitalID=1531020122&doct=0809"
    },


    {
        name: "朱信誠",
        jobTitle: "醫師",
        experience: [
            "衛生福利部雙和醫院泌尿科 住院醫師",
            "衛生福利部雙和醫院泌尿科 總醫師",
            "台大醫院泌尿部代訓醫師",
            "臺灣泌尿科醫學會會員 ",
            "衛福部疾管署認證 性傳染病友善門診專家醫師",
            "秀傳亞洲遠距微創手術中心(IRCAD-TAIWAN)進修"
        ],
        expertise: [
            "微創結紮手術", "包皮槍手術", "性傳染疾病",
            "一般泌尿系統疾病（含尿路感染、排尿障礙）", "泌尿道結石手術(軟式輸尿管鏡及迷你腎造廔微創碎石手術)",
            "攝護腺肥大及雷射手術", "腹腔鏡疝氣微創修補手術"
        ],
        imgURL: "/img/team-img-05.png"
    },


])


// 为每个项目创建一个可见性ref和DOM ref
//獲取節點的集合(列表List),因為節點是透過For循環遍歷的
//且在使用者點擊路由前,獲得路由傳過來的參數前,不知道要獲取哪個被創建的節點
//所以先用list的方式接收所有節點,在根據query參數傳角標(index)過來,再實際獲取特定節點
const itemRefs = ref([])
const itemVisibility = ref(memberList.map(() => false))

const observerOptions = {
    threshold: 0.05,
}

const observers: any[] = []

onMounted(() => {
    // 确保所有refs都已经设置,開始增加動畫
    nextTick(() => {
        itemRefs.value.forEach((ref, index) => {
            // console.log("這是REF", ref)
            if (ref) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                itemVisibility.value[index] = true
                            }, 100)
                        } else {
                            itemVisibility.value[index] = false
                        }
                    })
                }, observerOptions)

                observer.observe(ref)
                observers.push(observer)
            }
        })
    })


    //掛載完成時根據路由傳過來的參數進行Window滾動效果
    //因為這邊使用typeScript,所以會對類型作判斷,這邊要進行強轉為10進制的 Int類型
    // 嘗試將 route.query.doctor 轉換為數字，並檢查是否為有效數字
    let doctorNum: number | null = route.query.doctor ? parseInt(route.query.doctor as string, 10) : null;


    let doctorInfoElement = null; // 預設為 null

    // 判斷 doctorNum 是否為有效數字並檢查 divDomList 是否存在該編號的元素
    if (doctorNum !== null && !isNaN(doctorNum) && itemRefs.value[doctorNum]) {
        doctorInfoElement = itemRefs.value[doctorNum] as HTMLElement;
    }

    //先做一個簡單的判定,避免報錯,當節點不為Null 以及不為 Undefined時才執行
    if (doctorInfoElement != null && doctorInfoElement != undefined) {

        ElMessage.success("跳轉至醫師介紹，請稍後~")

        //獲取DOM元素的垂直偏移量,也就是該容器節點最上方的位置
        //根據調適結果,獲取到容器頂部位置 - 30px 是最適合的
        const offsetTop = doctorInfoElement.offsetTop - 30;

        // 使用window.scrollTo()方法触发滚动效果
        // 這邊是一個根據這個項目的優化,因為Navbar(Header組件)有個監聽一個全局變量
        // 當滾輪位置下滑位置超過/不超過 200px時 ,會變更Navbar的高度,這會導致滾動失效
        // 所以這邊做一個延遲執行 
        setTimeout(() => window.scrollTo({
            top: offsetTop,
            behavior: 'smooth' // 平滑滚动
        }), 1300)


    }
})

onUnmounted(() => {
    observers.forEach(observer => observer.disconnect())
})






// onMounted(() => {


//     }



// })


</script>

<style lang="scss" scoped>
.team-detail-section {
    width: 90%;
    margin: 0 auto;


    .team-detail-box {
        .detail-item {
            display: flex;
            background: white;
            margin: 4% 0;
            /** 動畫效果  */
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s, transform 0.5s;

            &.visible {
                opacity: 1;
                transform: translateY(0);
            }


            .detail-img-box {
                width: 33%;
                position: relative;
                z-index: 15;

                @media screen and (max-width: 850px) {
                    width: 48%;
                }

                img {
                    aspect-ratio: 1 / 1;
                    /** 也可以換成任何你想要的寬度*/
                    width: 100%;
                    height: 100%;
                    /** 新增這行 */
                    display: block;
                    object-position: top center;
                    object-fit: cover;
                    transition: 0.5s;
                }
            }

            .detail-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-top: 2%;

                .doctor-header {
                    margin-bottom: 1.5rem;

                    .doctor-name {
                        font-size: 2.3rem;
                        font-weight: bold;
                        color: #2492C5;
                        letter-spacing: 0.3rem;

                        .doctor-title {
                            font-size: 1.3rem;
                            font-weight: normal;
                            color: #666;
                        }

                        .detail-appointment-link-box {
                            font-size: 0.8rem;
                            font-weight: normal;
                            letter-spacing: 0;
                            padding: 2px 8px;
                            background: #C0DEE6;
                            border-radius: 4px;

                            .detail-appointment-link {
                                text-decoration: none;
                                color: #005378;

                                &:hover {
                                    color: #fff !important;
                                }

                            }

                            &:hover .detail-appointment-link {
                                color: #fff;
                            }

                        }
                    }
                }

                .doctor-info {
                    display: flex;
                    flex: 1;
                    gap: 32px;
                    position: relative;
                    z-index: 10;

                    .doctor-info-shadow {
                        width: 125%;
                        height: 88%;
                        // 將容器固定在底部
                        bottom: 0;
                        // 將容器往左偏移25%
                        left: -25%;
                        position: absolute;
                        background: linear-gradient(to right, #E4E4E6 0%, #F0F0F2 50%, #fff 100%);
                        z-index: -1;

                        @media screen and (max-width: 850px) {
                            width: 140%;
                            left: -40%;
                        }

                    }


                    .experience-section,
                    .expertise-section {
                        flex: 1;

                        h2 {
                            color: #676767;
                            letter-spacing: 0.3rem;
                            font-size: 1.5rem;
                            font-weight: 600;
                            margin-bottom: 0.5rem;

                        }

                        ul {
                            list-style: none;
                            padding: 0;

                            li {
                                line-height: 2rem;
                                font-size: 0.9rem;
                                color: #666;
                                margin-bottom: 4px;

                                @media screen and (max-width: 850px) {
                                    font-size: 0.8rem;
                                    line-height: 1.5rem;
                                }

                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
