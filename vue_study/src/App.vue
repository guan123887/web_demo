<template>
  <div id="app">
    <MyHeader/>
    <MyTodos/>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyTodos from '@/components/MyTodos'
import MyFooter from '@/components/MyFooter'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyTodos,
    MyFooter
  },
  data(){
    return{
       
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
