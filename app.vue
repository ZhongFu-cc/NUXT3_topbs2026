<template>
  <!-- 最外層新增一個wrapper,是為了搭配content 撐開中間內容為空的路由組件來達成一頁的效果  -->
  <div class="wrapper">

    <!-- 共用的Header -->
    <!-- <Header @open-menu="openMenu" :isActive="isActive"></Header> -->
    <Menu class="menu-bar" @open-menu="openMenu" :isActive="isActive"></Menu>
    <MobileMenu class="mobile-menu" v-if="isActive" @close-menu="closeMenu"></MobileMenu>
    <!-- 先用一個main標籤將之後要顯示的路由組件包起來 -->
    <main class="content" :class="{ 'is-open': isActive }">
      <NuxtPage></NuxtPage>
    </main>

    <!-- 共用的Footer -->
    <!-- <Bottom/> -->
    <Footer ref="footerRef"></Footer>
  </div>

</template>

<script setup lang="ts">

import Header from './components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import Bottom from '@/components/layout/Bottom.vue';
import Footer from '@/components/layout/Footer.vue';
import MobileMenu from './components/layout/MobileMenu.vue';
import { ref } from 'vue';

//這邊注意只是獲取組件而已
const footerRef = ref()


//這邊使用在easyState.ts , export 出來的useScrollPosition
//獲得全局共享變量scrollPosition
const scrollPosition = useScrollPosition()

const isActive = ref(false);
const openMenu = (value: boolean) => {
  isActive.value = value;
}
const closeMenu = () => {
  isActive.value = false;
}




//當有滑鼠滾動事件被觸發,需要執行的回調函數
function handleScroll() {
  // 獲取滾動到的位置
  let scrollPositionY = window.scrollY
  ////為全局變量scrollPosition進行賦值
  scrollPosition.value = scrollPositionY
  //console.log('滾輪位置',scrollPosition.value)
}

const handleBannerHeight = () => {
  const menuHeight = document.querySelector('.menu-container') as HTMLElement
  const contentMarginTop = document.querySelector('.content') as HTMLElement

  if (menuHeight && contentMarginTop) {
    const menuHeightValue = menuHeight.offsetHeight
    contentMarginTop.style.marginTop = `${menuHeightValue}px`
  }
}


onMounted(() => {
  // handleBannerHeight()
  // // 監聽滾動事件
  // window.addEventListener('scroll', handleScroll)
  // // 監聽視窗大小變化事件
  // // window.addEventListener('DOMContentLoaded', handleBannerHeight)
  // window.addEventListener('resize', handleBannerHeight)
})


</script>


<style lang="scss">
//覆蓋子選單的邊框
.my-popper {
  --el-popover-border-radius: 15px;
  // left: 800;
  // left:calc();

  .el-menu--popup {
    border-radius: 15px;
    min-width: 150px !important;
    padding: 0 !important;
    --el-menu-text-color: #1C2B6E !important;
    --el-menu-active-color: #6A6969 !important;
    --el-menu-hover-text-color: #6A6969 !important;
    --el-menu-hover-bg-color: none !important;
  }

  li {
    padding: 0 !important;
    height: auto !important;
    margin: 0 10px !important;
    line-height: 30px !important;
  }

}

.noSub {
  display: none;
}

.popper {
  --el-popover-border-radius: 0px;
  // padding-left: 20px !important;
  // inset: 89.6px 0px 0px 0px !important;

  .el-menu--popup {
    padding: 0 !important;
    --el-menu-active-color: none !important;
    --el-menu-hover-text-color: white !important;
    --el-menu-hover-bg-color: #450C73 !important;
    border: none !important;
  }

  li {
    border: 1px solid #CCCCCC;
    padding: 0 0.5rem !important;
    font-weight: bold;
    height: auto !important;
    // margin: 0 10px !important;
    line-height: 30px !important;
  }
}

//這個設定是撐開中間內容為空的組件
//讓他Header組件和Footer組件固定在最上方和最下方
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  // background-image: url('/img/bg01.webp');

  .content {
    flex-grow: 1;
    position: relative;
    margin-top: 6rem;
  }


}
</style>
