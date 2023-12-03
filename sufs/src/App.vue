<template>
  <div id="app">
    <v-app class="d-lg-flex" >
      <Home></Home>
    </v-app>
  </div>
</template>

<script>
import Home from "./components/Home";

export default {
  components: {Home},
  name: "App"
}
</script>

<style scoped>
#app {
  height: 100%;
  width: 100%
}

</style>