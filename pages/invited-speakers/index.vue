<template>
  <div>
    <main class="common-section">
      <Banner></Banner>
      <!-- <h1 class="title">Invited Speakers</h1> -->
      <Breadcrumbs firstRoute="Program" secoundRoute="Invited Speakers"></Breadcrumbs>
      <Title title="Invited Speakers"></Title>
      <div class="content">
        <speaker class="speaker" v-for="item in internationalSpeakers" :speaker="item"></speaker>
      </div>
      <el-divider></el-divider>
      <div class="content">
        <speaker class="speaker" v-for="item in taiwaneseSpeakers" :speaker="item"></speaker>
      </div>
    </main>
    <!-- <p style="text-align: center; color: #e5716b"><b>Speakers are currently being invited</b></p> -->

  </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import Banner from '@/components/layout/Banner.vue';
import Speaker from './components/speaker.vue';
import Title from '@/components/layout/Title.vue';


const speakers = reactive<any>([]);
const taiwaneseSpeakers = reactive<any>([]);
const internationalSpeakers = reactive<any>([]);

const getSpeakers = async () => {
  let res = await CSRrequest.get('/invited-speaker/pagination', {
    params: {
      page: 1,
      size: 100,
    },
  })
  if (res.code === 200) {
    Object.assign(speakers, res.data.records);

    // const taiwaneseSpeakers =;

    Object.assign(taiwaneseSpeakers, res.data.records.filter((speaker: any) => speaker.country === 'Taiwan'))

    taiwaneseSpeakers.sort((a: any, b: any) => {
      const aLast = a.name.trim().split(/\s+/).pop()!;
      const bLast = b.name.trim().split(/\s+/).pop()!;
      const lastCompare = aLast.localeCompare(bLast, 'en', { sensitivity: 'base' });
      if (lastCompare !== 0) return lastCompare;

      const firstA = a.name.replace(aLast, '').trim();
      const firstB = b.name.replace(bLast, '').trim();
      const firstCompare = firstA.localeCompare(firstB, 'en', { sensitivity: 'base' });
      if (firstCompare !== 0) return firstCompare;

      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    })


    // const internationalSpeakers =;

    Object.assign(internationalSpeakers, res.data.records.filter((speaker: any) => speaker.country !== 'Taiwan'));

    internationalSpeakers.sort((a: any, b: any) => {
      const countryCompare = a.country.localeCompare(b.country);
      if (countryCompare !== 0) return countryCompare;
      const nameCompare = a.name.split(' ').pop().localeCompare(b.name.split(' ').pop());
      if (nameCompare !== 0) return nameCompare;
      return a.name.localeCompare(b.name);
    });
    speakers.splice(0, speakers.length, ...internationalSpeakers, ...taiwaneseSpeakers);
  }
};

onMounted(() => {
  getSpeakers();
});



</script>
<style lang="scss" scoped>
.common-section {
  // width: $common-section-width;
  margin: $common-section-margin;
  font-family: $common-section-font-family;

  .title {
    margin-left: 7.4%;
    font-size: 2.5rem;
    color: $main-color;
  }

  .content {
    width: 80%;
    margin: 1rem auto;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2rem;
    padding: 1.5rem;

    h1 {
      font-size: 1.5rem;
    }

    .speaker {
      width: calc(100% / 4 - 2rem);

      @media screen and (max-width: 1200px) {
        width: calc(100% / 3 - 2rem);
      }

      @media screen and (max-width: 870px) {
        width: calc(100% / 2 - 2rem);
      }

      @media screen and (max-width: 500px) {
        width: calc(100% - 2rem);
      }
    }
  }
}
</style>