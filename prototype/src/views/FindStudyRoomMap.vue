<template>

    <div class="container">

      <div class="mt-3">
        <h3><p>Find a study room</p></h3>
      </div>

      <div class="row mt-5">

        <GmapMap
              class = "mappa"
              :center="{lat:center.lat, lng:center.lng}"
              :zoom="zoomMap"
              style="width: 1200px; height: 500px"
        >

        
           
        </GmapMap>

      </div>

       
    </div>

  
</template>

<script>

import { mapGetters, mapMutations} from 'vuex'
import {gmapApi} from 'vue2-google-maps'

//:icon="{ url: require('../assets/markerSensore.png')}"  => ICON SUI MARKER (?)

export default {
  name: 'FindStudyRoomMap',

  computed: {
    google: gmapApi,

    ...mapGetters([
        'getChosenCity',
        'getChosenCityCoordinates'
    ]),

  },

  components: {
   
  },

  data() {

      return {
        center: { lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) },
        zoomMap: 16,
        coord_array: [],
        MARKER_DETERMINATION: 3
      }
  },

  beforeCreate(){

    const coord = this.$store.state.choosenCityCoordinates;
    this.center.lat = coord.lat;
    this.center.lng = coord.lng;

  },
  
  mounted() {

  },

  methods: {

    

    ...mapMutations([
        'setChosenCity'
      ]),

      showInfoDetails(){
        alert("cliccato sulla study room!")
      },
  }

}
</script>


<style scoped>



</style>

