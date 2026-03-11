// components/TheCkeditor.client.vue
<template>
  <div class="editorBox">
    <!-- 這邊要使用Document 編輯器,需要監聽這個組件的@ready事件 -->
    <ckeditor class="ckBox" :editor="DocumentEditor" v-model="editorData" :config="editorConfig" @ready="onReady">
    </ckeditor>
  </div>
</template>

<script setup>
//引入適配Vue框架的CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';
//引入編輯器
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
//上傳圖片方法
import MyUploadAdapter from '@/composables/CKEditorUploadImg'//自定义上传图片方法


const ckeditor = defineComponent(CKEditor.component);
const editorData = ref('');
const editorConfig = {
  placeholder: 'type the content here',



}


function onReady(editor) {
  //在編輯器區域插入工具欄,這個是官方文檔的配置
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  )

  //配置自定義的適配器
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new MyUploadAdapter(loader)
  }
}

// 监视，情况一：监视【ref】定义的【基本类型】数据
const stopWatch = watch(editorData,(newValue,oldValue)=>{
    console.log('文本編輯器变化了',newValue,oldValue)
    if(newValue >= 10){
      stopWatch()
    }
  })

</script>

<style lang="scss">
.editorBox {
  width: 80%;
  margin: 0 auto;

  .ckBox {
    min-height: 200px;
    border: 1px solid rgb(223 223 223 / 77%)
  }
}
</style>