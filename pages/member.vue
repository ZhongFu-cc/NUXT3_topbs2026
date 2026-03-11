<template>
    
</template>
<script setup lang="ts">
    const router = useRouter()
    const returnEcPay = async () => {
        let res = await CSRrequest.post(`/payment`)
        router.push('/payment')
    }

    onMounted(()=> {
        returnEcPay()
    })
</script>