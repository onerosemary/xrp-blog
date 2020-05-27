<template>
  <div>
    <header1/>
    <nuxt/>
    <footer1/>
  </div>
</template>
<script>
import header1 from './common/header.vue'
import footer1 from './common/footer.vue'

export default {
  data() {
    return{

    }
  },
  components: {
    header1,
    footer1
  }
}
</script>

