<template>
    <div class="speaker-info">
        <div class="profile-image-box">
            <img v-if="props.speaker.photoUrl" class="profile-image" :src="envMinio + props.speaker.photoUrl"
                alt="Speaker Image" />
            <el-icon v-else class="avatar-uploader-icon">
                <!-- <Avatar /> -->
            </el-icon>
        </div>
        <div class="profile-info">
            <h2 class="speaker-name">{{ props.speaker.name }}</h2>
            <p class="speaker-country">{{ props.speaker.country }}</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    speaker: {
        type: Object,
        required: true
    }
})


watch(() => props, (newVal) => {
    console.log(newVal);
})
const envMinio = useRuntimeConfig().public.minio
</script>
<style lang="scss" scoped>
.speaker-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem 0;
    gap: 1rem;

    .profile-image-box {
        width: 13rem;
        height: 13rem;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;

        &:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
            cursor: pointer;
        }
    }

    .profile-image {
        width: 100%;
        height: auto;
    }

    .profile-info {
        // margin-left: 2rem;

        text-align: center;
        width: 13rem;

        .speaker-name {
            font-size: 1.5rem;
            font-weight: bold;
            font-style: italic;
            text-wrap: nowrap;
            color: #371307;
        }

        .speaker-country {
            font-style: italic;
            font-size: 1rem;
            color: #371307;
        }

    }
}
</style>