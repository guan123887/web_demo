<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang='ts'>
import HelloWorld from './components/HelloWorld.vue'
const jsgzk:string='hello world'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(jsgzk)
  },
}
</script>
