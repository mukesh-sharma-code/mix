<template>
<div id="app">
  <summernote
    name="editor"
    :model="content"
    v-on:change="value => { content = value }"
  ></summernote>
</div>
</template>

<script>
export default {
  data() {
    return {
        content: null   
    }
  },
  components: {
    'summernote' : require('./Summernote')
  }
}
</script>.,..