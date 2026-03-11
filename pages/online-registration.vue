<template>
    <main class="common-section">
        <Banner />
        <Breadcrumbs :first-route="'Registration'" :secound-route="'Online Registration'" />
        <Title :title="'Online Registration'" />
        <!-- <div class="title-section">
            <p class="title">
                Online Registration
            </p>
        </div>

        <div class="select-section">
            <div class="select-box">
                <el-radio-group v-model="attendeeType" class="radio-group">
                    <el-radio class="radio-item" value="1" border>Oversea Attendee</el-radio>
                    <el-radio class="radio-item" value="2" border>Domestic Attendee</el-radio>
                </el-radio-group>
                <nuxt-link class="next-btn" :to="`/registration-now/${attendeeType}`">
                    Next
                </nuxt-link>
            </div>
        </div> -->
    </main>
</template>

<script lang="ts" setup>
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Banner from '@/components/layout/Banner.vue';
import Title from '@/components/layout/Title.vue';


let attendeeType = ref('1');
</script>
<style lang="scss" scoped>
.common-section {
    font-family: $common-section-font-family;

    .title-section {
        margin-top: 1rem;
        text-align: center;
        position: relative;

        .title {
            font-size: 2.7rem;
            font-weight: 600;
        }

    }

    .select-section {
        // background: url('assets/img/topbs_background-image.jpg') no-repeat center center;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem ;


        .select-box {
            background-color: white;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 4px 3px 5px 1px rgba(0, 0, 0, 0.5);
            padding: 1.5rem ;

            .radio-group {
                display: flex;
                justify-content: center;
                padding: 1rem;

                .radio-item {
                    margin: 0 1rem;
                    padding: 2.5rem 2rem;
                    min-width: 15rem;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    border-radius: 15px;
                    font-weight: 600;
                    
                    :deep(.el-radio__inner) {
                        border: #DE6A75 1px solid;
                        
                        &::after {
                            background-color: #DE6A75;
                        }
                    }
                    :deep(.el-radio__label) {
                        font-size: 1.3rem;
                    }
                    
                    &.is-checked {
                        border: 1px solid #DE6A75;
                        
                        :deep(.el-radio__label) {
                            color: black;
                        }
                        
                        :deep(.el-radio__inner) {
                            background-color: #DE6A75;
                            border: none;

                            &::after {
                                display: none;
                            }
                        }
                    }
                }
            }

            .next-btn {
                margin-top: 1.5rem;
                display: flex;
                justify-content: center;
                width: 30%;
                background-color: #DE6A75;
                color: white;
                border: none;
                border-radius: 10px;
                padding: 1.5rem 3rem;
                font-size: 1rem;
                font-weight: 500;

            }
        }
    }
}
</style>