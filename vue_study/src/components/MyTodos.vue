<template>
  <div>
      <ul>
        <li v-for='list in arr' :key='list.name'>
            <input type="radio" name="Todoradio" id="Todoradio">
            <span  v-text='list.name'></span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'MyTodos',
    data(){
        return{
            arr:null,
        }
    },
    methods:{ 
        
    }
}
</script>

<style>

</style>