<template>
    <footer class="footer-section">
        <div class="footer-box">
            <p>中華民國乳癌教育暨防治學會</p>
            <p>聯絡我們: twbc.prevention@gmail.com</p>
        </div>
    </footer>
</template>
<script lang="ts" setup>
import Title from './Title.vue';
</script>
<style lang="scss" scoped>
.footer-section {
    background-color: #915aa1;
    // background: url('../../assets/img/ticbcs_footer.jpg') no-repeat top center;
    background-size: cover;
    padding: 2rem 0;

    .footer-box {
        display: flex;
        flex-direction: column;
        width: 70%;
        color: white;
        margin: 0 auto;
        font-size: 1.1rem;
        font-weight: bold;
    }
}
</style>