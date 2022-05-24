<template>
    <div>
    
        <div v-if="!bookingSeat && !viewingSummaryPage && !sharingWithFriends" class="container">
    
            <div class="row mt-3">
                <router-link to="/avanzato"><img src="../assets/back.png" width="30" /></router-link>
            </div>
    
            <div class="mt-3 ">
                <h3>
                    <p>Find a Group</p>
                </h3>
            </div>
    
            <div class="row mt-5 ">
    
                <GmapMap class="mappa " :center="{lat:center.lat, lng:center.lng} " :zoom="zoomMap " :clickable="true " @click="removePopup " style="width: 1200px; height: 480px ">
    
                    <GmapMarker :key=index v-for="(marker, index) in markers " :id="marker.id_study_group " :position="google && new google.maps.LatLng(marker.lat, marker.lng) " :clickable="true " :animation=g oogle.maps.Animation.DROP :icon="markerOptions " @click="showInfoDetails "
                    />
    
                </GmapMap>
            </div>
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
                                <div class="col">
                     <router-link to="/Avanzato"><button style="width:170px" type="button" class="btn btn-success btn-block mt-3">Join the group</button></router-link>
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

            studyGroupClicked: {},

            studyGroupDetails : [

          {

            id_study_group: 0,
            coordinate_gruppo : {
              lat: '',
              lng: '',
            },
            nome_gruppo: 'HCI GROUP 1',
            descrizione_gruppo: 'First year of human computer interaction',
            indirizzo_gruppo: 'Viale Manzoni 3',
            partecipanti:'3'



          },
          {

            id_study_group: 1,
            coordinate_gruppo : {
              lat: '',
              lng: '',
            },
            nome_gruppo: 'StudyZone eng',
            descrizione_gruppo: 'Study group of engineering in computer cience',
            indirizzo_gruppo: 'Via Scarpa 123',
            partecipanti:'78'


          },
          {

            id_study_group: 2,
            coordinate_gruppo : {
              lat: '',
              lng: '',
            },
             nome_gruppo: 'Data Management',
            descrizione_gruppo: 'Data Management with Lenzerini',
            indirizzo_gruppo: 'Via Roma 78',
            partecipanti:'11'

          }
            ],




            markerOptions: {
                url: require('../assets/markerSensore.png'),
            },



        }
    },

    beforeCreate() {

    },

    mounted() {
        if(localStorage.getItem("groupAdded")=="true")
        {
            localStorage.setItem('groupAdded',"false");
            this.inserisciMarkers2();
            var obj=localStorage.getItem('gruppo_aggiunto')

            obj=JSON.parse(obj)
            obj.coordinate_gruppo = {
            lat: this.center.lat - this.MARKER_DETERMINATION,
             lng: this.center.lng - this.MARKER_DETERMINATION
             }
            this.studyGroupDetails.push(obj)
        }
        else{
            this.inserisciMarkers();
        }
           
            console.log();

        

    },

    methods: {

        inserisciMarkers() {

            this.markers.push({
                id_study_group: 0,
                lat: this.center.lat,
                lng: this.center.lng
            })

            this.markers.push({
                id_study_group: 1,
                lat: this.center.lat + this.MARKER_DETERMINATION,
                lng: this.center.lng + this.MARKER_DETERMINATION
            })

            this.markers.push({
                id_study_group: 2,
                lat: this.center.lat + this.MARKER_DETERMINATION,
                lng: this.center.lng - this.MARKER_DETERMINATION
            })
            this.studyGroupDetails[0].coordinate_gruppo = {
          lat: this.center.lat,
          lng: this.center.lng
        }

        this.studyGroupDetails[1].coordinate_gruppo = {
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng + this.MARKER_DETERMINATIONf
        }

        this.studyGroupDetails[2].coordinate_gruppo = {
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng - this.MARKER_DETERMINATION
        }



        },
        inserisciMarkers2() {

            this.markers.push({
                id_study_group: 0,
                lat: this.center.lat,
                lng: this.center.lng
            })

            this.markers.push({
                id_study_group: 1,
                lat: this.center.lat + this.MARKER_DETERMINATION,
                lng: this.center.lng + this.MARKER_DETERMINATION
            })

            this.markers.push({
                id_study_group: 2,
                lat: this.center.lat + this.MARKER_DETERMINATION,
                lng: this.center.lng - this.MARKER_DETERMINATION
            })

            this.markers.push({
                id_study_group: 3,
                lat: this.center.lat - this.MARKER_DETERMINATION,
                lng: this.center.lng - this.MARKER_DETERMINATION
            })

            this.studyGroupDetails[0].coordinate_gruppo = {
          lat: this.center.lat,
          lng: this.center.lng
        }

        this.studyGroupDetails[1].coordinate_gruppo = {
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng + this.MARKER_DETERMINATIONf
        }

        this.studyGroupDetails[2].coordinate_gruppo = {
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng - this.MARKER_DETERMINATION
        }



        }
        ,



        trovaStudyGroupCliccato(lat, lng) {
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
            'setcoordinate_gruppo'
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

