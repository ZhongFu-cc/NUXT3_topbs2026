<template>
    <div class="main-box">
        <!-- <div class="test"></div> -->
        <img class="background-image" src="@/assets/img/countdown-bg.jpg" alt="Countdown Background" />
        <div class="countdown-timer">
            <div class="note">Coming soon</div>
            <div class="timeer">
                <span class="time-item"><span class="time-number">{{ timeLeft.days }}</span><span
                        class="time-label">days</span></span>:
                <span class="time-item"><span class="time-number">{{ timeLeft.hours }}</span><span
                        class="time-label">hours</span></span>:
                <span class="time-item"><span class="time-number">{{ timeLeft.minutes }}</span><span
                        class="time-label">minutes</span></span>:
                <span class="time-item"><span class="time-number">{{ timeLeft.seconds }}</span><span
                        class="time-label">seconds</span></span>
            </div>
            <div class="add-calendar-img-box">
                <a href="https://evt.to/z77j18jbb2pn" target="_blank">
                    <img src="@/assets/img/add-calendar.png" alt="Add to Calendar">
                </a>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">

const props = defineProps<{
    targetDate: Date
}>()

const timeLeft = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

const timer = ref<ReturnType<typeof setInterval> | null>(null);

const calculateTimeLeft = () => {
    const now = new Date();
    const difference = props.targetDate.getTime() - now.getTime();

    if (difference > 0) {
        timeLeft.value.days = Math.floor(difference / (1000 * 60 * 60 * 24));
        timeLeft.value.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        timeLeft.value.minutes = Math.floor((difference / (1000 * 60)) % 60);
        timeLeft.value.seconds = Math.floor((difference / 1000) % 60);
    } else {
        timeLeft.value.days = 0;
        timeLeft.value.hours = 0;
        timeLeft.value.minutes = 0;
        timeLeft.value.seconds = 0;
    }
};


onMounted(() => {
    calculateTimeLeft();
    timer.value = setInterval(calculateTimeLeft, 1000);
});

onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value);
    }
});

</script>
<style lang="scss" scoped>
.main-box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background-image {
    vertical-align: middle; // 或者 top, bottom
    width: 100%;

    @media screen and (max-width: 1280px) {
        height: 10rem;
    }

    @media screen and (max-width: 1024px) {
        height: 8rem;
    }
}

.countdown-timer {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 1rem;
    left: 0;
    // border: 1px solid red;
    gap: 10rem;

    @media screen and (max-width: 1536px) {
        top: 1rem;
        gap: 9rem;
    }

    @media screen and (max-width: 1280px) {
        gap: 9rem;
    }

    @media screen and (max-width: 1024px) {
        gap: 4rem;
    }

    @media screen and (max-width: 768px) {
        gap: 0rem;
    }






    .note {
        font-size: 2.5rem;
        // font-family: 'ArphicNewArtist';

        @media screen and (max-width: 1536px) {
            font-size: 2.5rem;
        }

        @media screen and (max-width: 1280px) {
            font-size: 1.5rem;
        }

        @media screen and (max-width: 1024px) {
            font-size: 1.5rem;
        }

        @media screen and (max-width: 768px) {
            display: none;
        }

    }

    .timeer {
        font-size: 3.5rem;
        display: flex;
        gap: 4rem;
        // font-family: 'ArphicNewArtist';
        align-self: flex-end;

        @media screen and (max-width: 1536px) {
            font-size: 3rem;
            gap: 3rem;
        }

        @media screen and (max-width: 1280px) {
            font-size: 2.5rem;
            gap: 1rem;
        }

        @media screen and (max-width: 1024px) {
            font-size: 2rem;
        }

        @media screen and (max-width: 768px) {
            font-size: 3.5rem;
            gap: 2rem;

        }

        @media screen and (max-width: 640px) {
            font-size: 3rem;

        }

        @media screen and (max-width: 575px) {
            font-size: 2.5rem;
            gap: 1.5rem;
        }

        .time-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .time-number {
                font-size: 4rem;
                font-weight: bold;
                // font-family: 'ArphicNewArtist';
                text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);

                @media screen and (max-width: 1536px) {
                    font-size: 3.5rem;
                }

                @media screen and (max-width: 1280px) {
                    font-size: 3rem;
                    padding-bottom: 0.4rem;
                }

                @media screen and (max-width: 1024px) {
                    font-size: 2rem;
                    padding-bottom: 0.3rem;
                }

                @media screen and (max-width: 768px) {
                    font-size: 3.5rem;
                    gap: 2rem;

                }

                @media screen and (max-width: 640px) {
                    font-size: 3rem;
                    gap: 2rem;

                }

                @media screen and (max-width: 575px) {
                    gap: 2rem;
                }
            }

            .time-label {
                font-size: 1.5rem;
                font-family: 'ArphicNewArtist'

            }
        }



    }

    .add-calendar-img-box {
        padding-bottom: 1rem;

        img {
            width: 11rem;
            height: auto;

            &:hover {
                transform: scale(1.05);
                transition: transform 0.3s ease;
                cursor: pointer;
            }

            @media screen and (max-width: 1280px) {
                width: 11rem;
            }

            @media screen and (max-width: 1024px) {
                width: 9rem;
            }

            @media screen and (max-width: 768px) {
                display: none;
            }
        }
    }
}
</style>