<template>

    <div class="container">

      <div class="row mt-3">
        <router-link to="/findStudyRoom"><img src="../assets/back.png" width="30"/></router-link>
      </div>

      <div class="mt-3">
        <h3><p>Find a study room</p></h3>
      </div>

      <div class="row mt-5">

        <GmapMap
              class = "mappa"
              :center="{lat:center.lat, lng:center.lng}"
              :zoom="zoomMap"
              style="width: 1200px; height: 480px"
        >

        <GmapMarker
                :key = index
                v-for="(marker, index) in markers"
                :id = "marker.lat+';'+marker.lng"
                :position="google && new google.maps.LatLng(marker.lat, marker.lng)"
                :clickable="true"
                :animation= google.maps.Animation.DROP
                :icon="markerOptions"
                @click="showInfoDetails"
               />
           
        </GmapMap>
        <div v-if="show" :style="stylecard" class="card">
            <div class="card-body">
              {{lat}}
              {{lng}}
              </div>
          </div>

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
        text: '',
        center: { lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) },
        zoomMap: 16,
        coord_array: [],
        MARKER_DETERMINATION: 0.002,
        markers : [],
        lat:"",
        lng:"",
        show:false,
        stylecard:"",

        
        markerOptions: {
          url: require('../assets/markerSensore.png'),
        },

        

      }
  },

  beforeCreate(){

  },
  
  mounted() {
    
    this.inserisciMarkers();

  },

  methods: {

      inserisciMarkers(){
        this.markers.push({
        lat: this.center.lat,
        lng: this.center.lng
      })

      this.markers.push({
        lat: this.center.lat + this.MARKER_DETERMINATION,
        lng: this.center.lng + this.MARKER_DETERMINATION
      })

      this.markers.push({
        lat: this.center.lat + this.MARKER_DETERMINATION,
        lng: this.center.lng - this.MARKER_DETERMINATION
      })
    },

      ...mapMutations([
        'setChosenCity'
      ]),

      showInfoDetails(event){
        const X = event.domEvent.clientX
        const Y = event.domEvent.clientY

        this.text = JSON.stringify(event.latLng)
        const lat = JSON.parse(this.text).lat
        const lng = JSON.parse(this.text).lng
        
        console.log(X + ' ' + Y)
        console.log(lat + ' ' + lng)
        this.lat=lat
        this.lng=lng

        this.stylecard="position:absolute;top:"+Y+"px;left:"+X+"px;"
        console.log(this.stylecard)
        this.show=true

      },

  }

}
</script>


<style scoped>



</style>

