<template>
    <div class="quick-link-section">
        <div class="title-box">
            <div class="title-image-box">
                <img class="home-banner-bak" src="@/assets/img/Link.svg">
            </div>
            <h1 class="title">{{ $t('quickLinks') }}</h1>
        </div>
        <div class="link-item-box">
            <nuxt-link to="/conference-information" class="link-item item1">
                <div class="item-image-box">
                    <img class="link-item" src="@/assets/img/AuditOutlined.svg">
                </div>
                <div class="link-item-text">{{ $t('conferenceInformation') }}</div>
            </nuxt-link>
            <nuxt-link to="/registration-fee" class="link-item item3">
                <div class="item-image-box">
                    <img class="link-item" src="@/assets/img/Online registration-01.svg">
                </div>
                <div class="link-item-text">{{ $t('registration') }}</div>
            </nuxt-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.quick-link-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;

    .title-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        padding-bottom: 1rem;

        .title-image-box {
            img {
                width: 2rem;
            }
        }

        .title {
            font-size: 2rem;
            font-weight: bold;
            color: #B62D66;
            text-align: start;
        }
    }

    .link-item-box {
        display: flex;
        gap: 0.1rem;
        flex-direction: column;

        .link-item {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.4rem;
            padding: 1rem;
            border-radius: 8px;


            &:hover {
                cursor: pointer;
                scale: 1.05;
                transition: all 0.3s ease-in-out;
            }

            .item-image-box {
                border-radius: 50%;
                text-align: center;
                background-color: white;
                padding: 0.1rem;

                img {
                    width: 2rem;
                    height: 2rem;
                }
            }

            .link-item-text {
                min-width: 70%;
                max-width: 70%;
                font-size: 1.3rem;
                font-weight: bold;
                color: white;
                text-align: start;
            }

        }

        .item1 {
            background-color: #EA86B3;
        }

        .item2 {
            background-color: #C21062;
        }

        .item3 {
            background-color: #991D4F;
        }
    }
}
</style>