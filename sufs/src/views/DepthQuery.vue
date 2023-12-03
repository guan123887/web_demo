<template>
  <div class="white--text pa-md-2">

  </div>
</template>

<script>
export default {
  name: "DepthQuery",
  methods:{
    recentView(){
      this.$bus.$emit('test',(e)=>{
        console.log(e)
        var that=this
        console.log(that.Cesium)
      })
    }
  },
  mounted() {
    this.$bus.$on("test",(Cesium,viewer)=>{
      console.log(Cesium,viewer)
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.7342061, 32.059, 4500),
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)
          roll: 0.0, // default value
        },
      });
    })

  },
  beforeDestroy() {
    this.$bus.$off("test")
  }
}
</script>

<style scoped>

</style>