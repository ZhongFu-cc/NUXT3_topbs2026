<template>
    <div class="common-section">
        <Title title="學分申請"></Title>
        <h1 class="title">研討會申請之會議學分</h1>
        <p>1.台灣乳房醫學會 <span class="score">認定積分 12 分</span></p>
        <p>2.台灣外科醫學會 <span class="score">認定積分 10 分</span></p>
        <p>3.社團法人臨床藥學會 <span class="score">藥師 12.4 分</span></p>
        <p>4.台灣專科護理師學會
        <p>(1)專科護理師 <span class="score">12.4分</span></p>
        <p>(2)護理師 <span class="score">12.4分</span></p>
        </p>


        <p>5.中華民國癌症醫學會 <p>(1)腫瘤內科 <span class="score">3分</span></p> <p>(2)腫瘤外科 <span class="score">3分</span></p></p>
       
       
    </div>

</template>
<script lang="ts" setup>
import Title from '@/components/layout/Title.vue';
</script>
<style lang="scss" scoped>
.common-section {
    margin: $common-section-margin;
    width: $common-section-width;
    font-family: $common-section-font-family;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-weight: bold;

    .title {
        color: #1C4587;
        font-size: 2rem;
        font-weight: 700;
        margin: 0rem 0 1rem 0;
    }

    .score {
        color: red;
    }
}
</style>