<!--  -->
<template>
    <section>
        <div class="clinicHoursBox">
            <h1>看診時刻表</h1>
            <img src="@/assets/img/clinic.png">
        </div>
    </section>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue'

</script>

<style scoped lang="scss">
.clinicHoursBox {
    width: 80%;
    margin: 2% auto;

    h1 {
        font-size: 2rem;
        text-align: center;
        margin: 2% auto;
    }

    img {
        max-width: 100%;

    }


}
</style>
