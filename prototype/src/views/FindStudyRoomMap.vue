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
              :clickable="true"
              @click="removePopup"
              style="width: 1200px; height: 480px"
        >

        <GmapMarker
                :key = index
                v-for="(marker, index) in markers"
                :id = "marker.id_study_room"
                :position="google && new google.maps.LatLng(marker.lat, marker.lng)"
                :clickable="true"
                :animation= google.maps.Animation.DROP
                :icon="markerOptions"
                @click="showInfoDetails"
               />
           
        </GmapMap>

        <div v-if="show" :style="stylecard" :class="content_class">
            

            <div class="card text-center">  <!-- display:block per mostrare -->
        
        <div class="card-body">
          <h5 class="card-title"><b>Study room details</b></h5>

          
          <div class="row text-center mt-2">

            <div class="col">
              Name
            </div>
            <div class="col">
              {{studyRoomClicked.nome_aula}}
            </div>

          </div>
          
          
          <div class="row text-center mt-2">

            <div class="col">
              Address
            </div>
            <div class="col">
              {{studyRoomClicked.indirizzo_aula}}
            </div>

          </div>
          
          <h7 class="card-text mt-2">Opening hours</h7>

                          <table class="table">
                  <thead class="thead bg-warning">
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Daily Schedule</th>
                      <th scope="col">Currently available seats</th>
                      <th scope="col">Book a seat!</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="giorno in studyRoomClicked.schedule" :key="giorno.day">
                      <td>{{giorno.day}}</td>
                      <td>{{giorno.daily_schedule}}</td>
                      <td>{{giorno.curr_available_seats}}</td>
                      <td v-if="giorno.curr_available_seats > 0"><button class="btn btn-success">Book!</button></td>
                      <td v-else>--</td>
                    </tr>
                    
                  </tbody>
                </table>
        </div>
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
        'getChosenCityCoordinates',
        'getStudy_rooms_names',
        'getStudy_rooms_addresses',
        'getSchedules',
        'getStudyRoomPrenotata',
        'getCoordinate_aule'
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
        X: '',
        Y: '',

        studyRoomsDetails : [

          {

            id_study_room: 0,
            coordinate_aule : {
              lat: '',
              lng: '',
            },
            nome_aula: 'Aula 108 Edificio Marco Polo',
            indirizzo_aula: 'Viale Dello Scalo di San Lorenzo 82',
            schedule : [
              {
                day: 'Monday',
                daily_schedule: '8:00am - 18:00pm',
                curr_available_seats: 12,
              },
              {
                day: 'Tuesday',
                daily_schedule: '8:00am - 19:00pm',
                curr_available_seats: 3,
              },
              {
                day: 'Wednesday',
                daily_schedule: '8:30am - 18:00pm',
                curr_available_seats: 0,
              },
              {
                day: 'Thursday',
                daily_schedule: '8:30am - 18:30pm',
                curr_available_seats: 1,
              },
              {
                day: 'Friday',
                daily_schedule: '8:30am - 18:30pm',
                curr_available_seats: 5,
              },
              {
                day: 'Saturday',
                daily_schedule: '9:00am - 17:00pm',
                curr_available_seats: 32,
              },
              {
                day: 'Sunday',
                daily_schedule: 'closed',
                curr_available_seats: '--',
              }
            ]

          },

          // Study room 1

          {

            id_study_room: 1,
            coordinate_aule : {
              lat: '',
              lng: '',
            },
            nome_aula: 'Aula 31 SPV',
            indirizzo_aula: 'Via Eudossiana 18',
            schedule : [
              {
                day: 'Monday',
                daily_schedule: '9:00am - 18:00pm',
                curr_available_seats: 12,
              },
              {
                day: 'Tuesday',
                daily_schedule: '9:00am - 19:00pm',
                curr_available_seats: 3,
              },
              {
                day: 'Wednesday',
                daily_schedule: '9:00am - 18:00pm',
                curr_available_seats: 0,
              },
              {
                day: 'Thursday',
                daily_schedule: '8:30am - 18:30pm',
                curr_available_seats: 1,
              },
              {
                day: 'Friday',
                daily_schedule: '9:00am - 18:30pm',
                curr_available_seats: 5,
              },
              {
                day: 'Saturday',
                daily_schedule: '9:00am - 17:00pm',
                curr_available_seats: 32,
              },
              {
                day: 'Sunday',
                daily_schedule: 'closed',
                curr_available_seats: '--',
              }
            ]

          },


          // Study room 2

          {

            id_study_room: 2,
            coordinate_aule : {
              lat: '',
              lng: '',
            },
            nome_aula: 'Aula B2 DIAG',
            indirizzo_aula: 'Via Ariosto 25',
            schedule : [
              {
                day: 'Monday',
                daily_schedule: '8:00am - 18:00pm',
                curr_available_seats: 12,
              },
              {
                day: 'Tuesday',
                daily_schedule: '8:00am - 19:00pm',
                curr_available_seats: 3,
              },
              {
                day: 'Wednesday',
                daily_schedule: '8:30am - 18:00pm',
                curr_available_seats: 0,
              },
              {
                day: 'Thursday',
                daily_schedule: '8:30am - 18:30pm',
                curr_available_seats: 1,
              },
              {
                day: 'Friday',
                daily_schedule: '8:00am - 18:30pm',
                curr_available_seats: 5,
              },
              {
                day: 'Saturday',
                daily_schedule: 'closed',
                curr_available_seats: '--',
              },
              {
                day: 'Sunday',
                daily_schedule: 'closed',
                curr_available_seats: '--',
              }
            ]

          },



        ],

        studyRoomClicked: {},

        
        markerOptions: {
          url: require('../assets/markerSensore.png'),
        },

        

      }
  },

  beforeCreate(){

  },
  
  mounted() {
    
    this.inserisciMarkers();

    /*console.log(this.studyRoomsDetails[0].coordinate_aule)
    console.log(this.studyRoomsDetails[1].coordinate_aule)
    console.log(this.studyRoomsDetails[2].coordinate_aule)*/


    let today = new Date();
    let todayDayNumber = today.getDate();
    let todayMonth = today.getMonth();
    let dayOfWeek = this.getDayOfWeek(today);

    if(todayMonth == 12)
      todayMonth = 1;
    else
      todayMonth += 1;

    let todayMonthName = this.convertiMese(todayMonth);

    /*console.log(todayDayNumber)
    console.log(todayMonthName)
    console.log(dayOfWeek)*/

    let numberOfMarkers = this.studyRoomsDetails.length;
    let i

    for(i=0;i<numberOfMarkers;i++){

      //console.log("i = "+i)
      
      let ordered = []
      let j=0;
      let n = this.studyRoomsDetails[i].schedule.length;

      for(j=0;j<n;j++){

        if(dayOfWeek === this.studyRoomsDetails[i].schedule[j].day){
          let app = this.studyRoomsDetails[i].schedule[j]

          app.day = dayOfWeek + ' ' + todayMonthName + ' ' + todayDayNumber

          /*console.log("Stampo quello in data: ")
          console.log(this.studyRoomsDetails[i].schedule[j].day)
          console.log("Stampo app.day: ")
          console.log(app.day);*/

          ordered.push(app);

          break;
        }

      }

      /*console.log("ordered che contiene solo il giorno di oggi")
      console.log(ordered)*/
      
      let currentDayNumber = todayDayNumber;
      let currentMonth;
        
      if(todayMonth == 1)
        currentMonth = 12;
      else
        currentMonth = todayMonth - 1;

      let currentDate;
      currentDate = new Date(2022, parseInt(currentMonth), parseInt(currentDayNumber));

      /*console.log(currentDate);
      console.log()*/

      let h=0;

      for(h=0;h<6;h++){

        currentDate.setDate(currentDate.getDate() + 1);

        let dayNumber = currentDate.getDate();
        let month = currentDate.getMonth();
        let day_of_week = this.getDayOfWeek(currentDate);

        if(month == 12)
          month = 1;
        else
          month += 1;

        let monthName = this.convertiMese(month);
        
        let k=0;
        let size = this.studyRoomsDetails[i].schedule.length;

        for(k=0;k<size;k++){
          if(day_of_week == this.studyRoomsDetails[i].schedule[k].day){

            let app = this.studyRoomsDetails[i].schedule[k]
            app.day = day_of_week + ' ' + monthName + ' ' + dayNumber;

            ordered.push(app); 
            break;
          }
        }

      }

      /*console.log()
      console.log("ordered che contiene 7 elementi in ordine a partire da oggi")
      console.log(ordered)
      
      console.log()*/

      this.studyRoomsDetails[i].schedule = ordered;



    }
    console.log("array in data");
    console.log(this.studyRoomsDetails);
    console.log();

  },

  methods: {

      inserisciMarkers(){
        
        // preparo array dei marker con le coordinate
        this.markers.push({
          id_study_room: 0,
          lat: this.center.lat,
          lng: this.center.lng
        })

        this.markers.push({
          id_study_room: 1,
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng + this.MARKER_DETERMINATION
        })

        this.markers.push({
          id_study_room: 2,
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng - this.MARKER_DETERMINATION
        })

        // setto le coordinate nel mio array locale studyRoomsDetails

        this.studyRoomsDetails[0].coordinate_aule = {
          lat: this.center.lat,
          lng: this.center.lng
        }

        this.studyRoomsDetails[1].coordinate_aule = {
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng + this.MARKER_DETERMINATION
        }

        this.studyRoomsDetails[2].coordinate_aule = {
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng - this.MARKER_DETERMINATION
        }

    },

    getDayOfWeek(today){
      //alert('converti giorno della settimana')
      let number = today.getDay();

      if(number == 0)
        return 'Sunday'

      else if(number == 1)
        return 'Monday'
      
      else if(number == 2)
        return 'Tuesday'

      else if(number == 3)
        return 'Wednesday'

      else if(number == 4)
        return 'Thursday'

      else if(number == 5)
        return 'Friday'

      else if(number == 6)
        return 'Saturday'

    },

    convertiMese(numeroMese){
      //alert('converti mese')
      if(numeroMese == '1') return 'January';
      else if(numeroMese == '2') return 'February';
      else if(numeroMese == '3') return 'March';
      else if(numeroMese == '4') return 'April';
      else if(numeroMese == '5') return 'May';
      else if(numeroMese == '6') return 'June';
      else if(numeroMese == '7') return 'July';
      else if(numeroMese == '8') return 'August';
      else if(numeroMese == '9') return 'September';
      else if(numeroMese == '10') return 'October';
      else if(numeroMese == '11') return 'November';
      else if(numeroMese == '12') return 'December';
    },

      trovaStudyRoomCliccata(lat, lng){
        let i=0;
        let n = this.studyRoomsDetails.length;
        for(i=0;i<n;i++){
          if(this.studyRoomsDetails[i].coordinate_aule.lat == lat && this.studyRoomsDetails[i].coordinate_aule.lng == lng){
            return this.studyRoomsDetails[i];
          }
        }
        return null;
      },

      ...mapMutations([
        'setChosenCity',
        'setCoordinate_aule'
      ]),

      showInfoDetails(event){
        const X = event.domEvent.clientX
        const Y = event.domEvent.clientY

        this.X = X;
        this.Y = Y;

        this.text = JSON.stringify(event.latLng)
        const lat = JSON.parse(this.text).lat
        const lng = JSON.parse(this.text).lng
        
        //console.log(X + ' ' + Y)
        //console.log(lat + ' ' + lng)
        this.lat=lat
        this.lng=lng

        this.stylecard="position:absolute;top:"+Y+"px;left:"+X+"px;"
        //console.log(this.stylecard)

        const studyRoomCliccata = this.trovaStudyRoomCliccata(lat, lng);

        if (studyRoomCliccata == null){
          alert("ERRORE! STUDY ROOM NON TROVATA AL CLICK SULLA MAPPA!")
          return;
        }

        this.studyRoomClicked = studyRoomCliccata;

        this.show=true


      },

      removePopup(event){
        const X = event.domEvent.clientX
        const Y = event.domEvent.clientY

        if(this.X != X || this.Y != Y){
          this.show = false;
        }
      }

  }

}
</script>


<style scoped>



</style>

