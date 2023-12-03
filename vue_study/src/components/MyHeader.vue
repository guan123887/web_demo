<template>
  <div>
      <input type="text" v-model='InputValue' @keyup.enter='add'>
  </div>
</template>

<script>
export default {
    name:'Myheader',
    data(){
        return{
            InputValue:null,
        }
    },
    methods:{
        add(){
            this.$emit('SendTo',this.InputValue);
        }
    }
}
</script>

<style>

</style>