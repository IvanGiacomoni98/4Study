<template>
    <div>
    
        <div v-if="!confirmation" class="container">
    
            <div class="row mt-3">
                <router-link to="/avanzato"><img @click="backToAvanzato" src="../assets/back.png" width="30" /></router-link>
            </div>
    
            <div class="mt-3 ">
                <h3>
                    <p>Find a study group - {{chosenCity}}</p>
                </h3>
            </div>
    
            <div class="row mt-3 ">
    
                <GmapMap class="mappa " :center="{lat:center.lat, lng:center.lng} " :zoom="zoomMap " :clickable="true " @click="removePopup " style="width: 1200px; height: 480px ">
    
                    <GmapMarker :key=index v-for="(marker, index) in markers " :id="marker.id_study_group " :position="google && new google.maps.LatLng(marker.lat, marker.lng) " :clickable="true " :animation=g oogle.maps.Animation.DROP :icon="markerOptions " @click="showInfoDetails "
                    />
    
                </GmapMap>
            </div>

        <center>
        <div class="container">
            <div class="row">
                <div class="col">
                     <router-link to="/chooseCityGroup"><button style="width:170px" type="button" class="btn btn-success btn-block mt-3">Change city</button></router-link>
                </div>
                <div class="col">
                     <router-link to="/CreateNewGroup"><button style="width:170px" type="button" class="btn btn-success btn-block mt-3">Create New Group</button></router-link>
                </div>
            </div>
        </div>
        </center>
        
        </div>

    <div v-else-if="confirmation" class="container">

    <div class="row mt-5">
       <div class="col">
          <button class="rounded" disabled id="im3"><h5>Group successfully joined! You can check your groups in the profile section.</h5></button>
          </div>

  
    </div>
    
    <center>

    <div class="row mt-5">
       <div class="col">
         <router-link to="/avanzato">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mt-3">Homepage</button>   
          </router-link>
        </div>
        <div class="col">
         <router-link to="/profile">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mt-3">Profile</button>   
          </router-link>
        </div>
  
    </div>
    </center>
    

  </div>

        <center>


        <div v-if="show" :style="stylecard" :class="content_class">
    
    
                        <div class="card text-center">
                            <!-- display:block per mostrare -->
    
                            <div class="card-body">
                                <h5 class="card-title"><b>Study Group details</b></h5>
    
    
                                <div class="row text-center mt-2">
    
                                    <div class="col">
                                        Study Group Description
                                    </div>
                                    <div class="col">
                                        {{studyGroupClicked.descrizione_gruppo}}
                                    </div>
    
                                </div>
    
    
                                <div class="row text-center mt-2">
    
                                    <div class="col">
                                        Study Group Name
                                    </div>
                                    <div class="col">
                                        {{studyGroupClicked.nome_gruppo}}
                                    </div>
    
                                </div>
                                <div class="row text-center mt-2">
    
                                    <div class="col">
                                        Address
                                    </div>
                                    <div class="col">
                                        {{studyGroupClicked.indirizzo_gruppo}}
                                    </div>
    
                                </div>
                                <div class="row text-center mt-2">
    
                                    <div class="col">
                                        Partecipants
                                    </div>
                                    <div class="col">
                                        {{studyGroupClicked.partecipanti}}
                                    </div>
    
                                </div>
                                <center>
                                <div v-if="!studyGroupClicked.member" class="col">
                                    <button :id="studyGroupClicked.id_study_group" @click="joinGroup" style="width:170px" type="button" class="btn btn-success btn-block mt-3">Join the group</button>
                                </div>
                                <div v-else-if="!studyGroupClicked.admin && studyGroupClicked.member" class="col  mt-1">
                                    <b>You are a member of this group.</b>
                                </div>
                                <div v-else-if="studyGroupClicked.admin" class="col mt-1">
                                    <b>You are the admin of this group.</b>
                                </div>
                                </center>
                                
                            </div>
                        </div>
                    
                </div>
                        
    

      </center>
    </div>
   
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { gmapApi } from 'vue2-google-maps'
import axios from 'axios';
require('dotenv').config();

//:icon="{ url: require('../assets/markerSensore.png')}"  => ICON SUI MARKER (?)

export default {
    name: 'FindGroup',

    computed: {
        google: gmapApi,

        ...mapGetters([
            'getChosenCity',
            'getChosenCityCoordinates',
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
            markers: [],
            lat: "",
            lng: "",
            show: false,
            stylecard: "",
            X: '',
            Y: '',
            chosenCity: '',
            
            confirmation: false,

            studyGroupClicked: {},
            studyGroupDetails: [],


            markerOptions: {
                url: require('../assets/markerSensore.png'),
            },



        }
    },

    beforeCreate() {

    },

    created(){

        console.log(this.$store.state.markers_gruppi)

        this.chosenCity = this.$store.state.chosenCity;

        this.studyGroupDetails = this.$store.state.gruppi;

        this.markers = this.$store.state.markers_gruppi;

        this.inserisciMarkers();
    },

    mounted() {

    },

    methods: {

        inserisciMarkers() {

            for(let i=0;i<this.markers.length;i++){
                this.studyGroupDetails[i].coordinate_gruppo = {
                    lat: this.markers[i].lat,
                    lng: this.markers[i].lng,
                }
            }

        },

        trovaStudyGroupCliccato(lat, lng) {

            console.log("quelle che mi arrivano in input => "+lat+" - "+lng)

            let i = 0;
            let n = this.studyGroupDetails.length;
            for (i = 0; i < n; i++) {
                if (this.studyGroupDetails[i].coordinate_gruppo.lat == lat && this.studyGroupDetails[i].coordinate_gruppo.lng == lng) {
                    return this.studyGroupDetails[i];
                }
            }
            return null;
        },

        ...mapMutations([
            'setChosenCity',
            'setcoordinate_gruppo',
            'joinaGruppo'
        ]),

        showInfoDetails(event) {

            const X = event.domEvent.clientX
            const Y = event.domEvent.clientY

            this.X = X;
            this.Y = Y;

            this.text = JSON.stringify(event.latLng)
            const lat = JSON.parse(this.text).lat
            const lng = JSON.parse(this.text).lng

            //console.log(X + ' ' + Y)
            //console.log(lat + ' ' + lng)
            this.lat = lat
            this.lng = lng

            this.stylecard = "position:absolute;top:" + Y + "px;left:" + X + "px;"
            //console.log(this.stylecard)

            const studyGroupCliccato = this.trovaStudyGroupCliccato(lat, lng);

            if (studyGroupCliccato == null) {
                alert("ERRORE! GRUPPO NON TROVATO AL CLICK SULLA MAPPA!")
                return;
            }

            this.studyGroupClicked = studyGroupCliccato;
            this.show = true;


        },
       
        removePopup(event) {
            const X = event.domEvent.clientX
            const Y = event.domEvent.clientY

            if (this.X != X || this.Y != Y) {
                this.show = false;
            }
        },

        backToMap() {
            this.rangeHours = "";
            this.bookingSeat = false;
        },
        sleep(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        },

        backToAvanzato(){
            this.setChosenCity(this.$store.state.towns[this.$store.state.indexLoggedUser]);

        const key = process.env.VUE_APP_MAP_STUDY_ROOMS
          const city = this.$store.state.chosenCity;
          

          axios.get('https://open.mapquestapi.com/geocoding/v1/address?key='+key+'&location='+city)
          .then(response => {

            const latLng = response.data.results[0].locations[0].displayLatLng

            //alert("SUBITO LAT: "+response.data.results[0].locations[0].displayLatLng.lat)
            //alert("SUBITO LNG: "+response.data.results[0].locations[0].displayLatLng.lng)

            const lat = parseFloat(latLng.lat);
            const lng = parseFloat(latLng.lng);

            localStorage.setItem('lat', lat);
            localStorage.setItem('lng', lng);

            const markers_gruppi = this.$store.state.markers_gruppi;
            this.$store.state.markers_gruppi = [];

            for(let i=0;i<markers_gruppi.length;i++){
              let lat_ = 0.0;
              let lng_ = 0.0;

              if(i == 0){
                lat_ = lat;
                lng_ = lng;
              }
              else if(i == 1){
                lat_ = lat + this.MARKER_DETERMINATION;
                lng_ = lng + this.MARKER_DETERMINATION;
              }
              else if(i == 2){
                lat_ = lat + this.MARKER_DETERMINATION;
                lng_ = lng - this.MARKER_DETERMINATION;
              }
              else if(i == 3){
                lat_ = lat - this.MARKER_DETERMINATION;
                lng_ = lng + this.MARKER_DETERMINATION;
              }
              else if(i == 4){
                lat_ = lat - this.MARKER_DETERMINATION;
                lng_ = lng - this.MARKER_DETERMINATION;
              }

              this.$store.state.markers_gruppi.push({
                id_study_group: i,
                lat: lat_,
                lng: lng_
              })

            }

          })
          .catch(error => {
            alert("catch")
            console.log(error);
          });
        },

        joinGroup(event){
            const group_id = event.target.id;
            this.joinaGruppo(group_id);
            
            console.log(this.studyGroupClicked);
            this.show = false;
            this.confirmation = true;

        }

    }

}
</script>


<style scoped>
.backImgFromBookingView {
    cursor: pointer;
}

.backImgFromSharingView {
    cursor: pointer;
}

#im3 {
    height: 400px;
    width: 1100px;
    background-size: cover;
    background-color: #ffc107;
    border-color: #c7b330;
    color: #000000;
}

#bottone_homepage {
    width: 180px;
    text-align: center;
}

#bottone_download {
    width: 180px;
    text-align: center;
}

#bottone_share {
    width: 200px;
    text-align: center;
}
</style>

