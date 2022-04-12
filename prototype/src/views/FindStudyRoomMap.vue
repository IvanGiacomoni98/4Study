<template>

    <div class="container">

      <div class="mt-3">
        <h3><p>Find a study room</p></h3>
      </div>

      <div class="row mt-5">

        MAPPA

      </div>

       
    </div>

  
</template>

<script>

import { mapGetters, mapMutations} from 'vuex'
import axios from 'axios';
require("dotenv").config();

export default {
  name: 'FindStudyRoomMap',

  components: {
   
  },

  data() {

      return {
                
      }
  },

  created(){

      const key = process.env.VUE_APP_MAP_STUDY_ROOMS
      const city = this.getChosenCity()
      alert(city)

      axios.get('https://open.mapquestapi.com/geocoding/v1/address?key='+key+'&location='+city)
      .then(response => {

        const latLng = response.data.results[0].locations[0].displayLatLng

        //alert(response.data.results[0].locations[0].displayLatLng.lat)
        //alert(response.data.results[0].locations[0].displayLatLng.lng)

        const lat = latLng.lat;
        const lng = latLng.lng;
        
        alert(lat)
        alert(lng)
        

      })
      .catch(error => {
        alert("catch")
        console.log(error);
      });
  },
  
  mounted() {
    
  },

  computed: {
    
  },

  methods: {

    ...mapGetters([
        'getChosenCity'
      ]),

    ...mapMutations([
        'setChosenCity'
      ]),

  }

}
</script>


<style scoped>



</style>

