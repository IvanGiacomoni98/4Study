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
              Address
            </div>
            <div class="col">
              Via Antonio Scarpa
            </div>

          </div>
          
          <h7 class="card-text mt-2">Opening hours</h7>

                          <table class="table">
                  <thead class="thead bg-warning">
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Daily Schedule</th>
                      <th scope="col">Currently available seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Wednesday</td>
                      <td>8:00am - 18:00pm</td>
                      <td>12</td>
                    </tr>

                    <tr>
                      <td>Thursday</td>
                      <td>8:00am - 18:30pm</td>
                      <td>9</td>
                    </tr>

                    <tr>
                      <td>Friday</td>
                      <td>8:00am - 18:00pm</td>
                      <td>4</td>
                    </tr>

                    <tr>
                      <td>Saturday</td>
                      <td>9:00am - 17:00pm</td>
                      <td>43</td>
                    </tr>

                    <tr>
                      <td>Sunday</td>
                      <td>Closed</td>
                      <td>--</td>
                    </tr>

                    <tr>
                      <td>Monday</td>
                      <td>8:00am - 19:00pm</td>
                      <td>3</td>
                    </tr>

                    <tr>
                      <td>Wednesday</td>
                      <td>9:00am - 19:00pm</td>
                      <td>0</td>
                    </tr>
                    
                  </tbody>
                </table>
                          
          <button class="btn btn-success">Book a seat!</button>
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

        nome_aula: '',
        indirizzo_aula: '',
        schedule_aula: [],
        orderedDays : [],
        studyRoomsDetails : [],

        
        markerOptions: {
          url: require('../assets/markerSensore.png'),
        },

        

      }
  },

  beforeCreate(){

  },
  
  mounted() {
    
    this.inserisciMarkers();

    const coordinate_aule = this.$store.state.coordinate_aule;

    let numberOfMarkers = coordinate_aule.length;
    let i

    let studyRoomsDetails = []

    for(i=0;i<numberOfMarkers;i++){
      let info = {
        address: '',
        name: '',
        schedule: [],
        coordinates: {}
      }

      info.address = this.$store.state.study_rooms_addresses[i];
      info.name = this.$store.state.study_rooms_names[i];
      info.schedule = this.$store.state.schedules[i];
      info.coordinates = coordinate_aule[i];

      studyRoomsDetails.push(info)
    }

    /*console.log("-----");
    console.log()
    console.log(studyRoomsDetails);

    console.log('AAAAAAAa')
    console.log()
    console.log(this.studyRoomsDetails);*/

    this.studyRoomsDetails = studyRoomsDetails;

    let today = new Date();
    let todayDayNumber = today.getDate();
    let todayMonth = today.getMonth();
    let dayOfWeek = this.getDayOfWeek(today);

    if(todayMonth == 12)
      todayMonth = 1;
    else
      todayMonth += 1;

    let todayMonthName = this.convertiMese(todayMonth);

    i=0;
    for(i=0;i<numberOfMarkers;i++){

      let orderedSchedule = [];

      let j;
      for(j=0;j<this.studyRoomsDetails[i].schedule.length;j++){
        if(dayOfWeek == this.studyRoomsDetails[i].schedule[j].day){
          this.studyRoomsDetails[i].schedule[j].day = dayOfWeek + ' ' + todayMonthName + ' ' + todayDayNumber
          console.log("QUIIIIII")
          console.log(this.studyRoomsDetails[i].schedule[j])
          console.log()
          orderedSchedule.push(this.studyRoomsDetails[i].schedule[j]);
          this.studyRoomsDetails[i].schedule = [];
          break;
        }
      }

      console.log("PRIMA")
      console.log(orderedSchedule)
      console.log()

      let currentDayNumber = todayDayNumber;
      let currentMonth;
        
      if(todayMonth == 1)
        currentMonth = 12;
      else
        currentMonth = todayMonth - 1;

      let currentDate;
      currentDate = new Date(2022, parseInt(currentMonth), parseInt(currentDayNumber));

      for(let h=0;h<6;h++){
          
        currentDate.setDate(currentDate.getDate() + 1);

        
        let dayNumber = currentDate.getDate();
        let month = currentDate.getMonth();
        let day_of_week = this.getDayOfWeek(currentDate);

        if(month == 12)
          month = 1;
        else
          month += 1;

        let monthName = this.convertiMese(month);
        
        let k;
        for(k=0;k<this.studyRoomsDetails[i].schedule.length;k++){
          if(day_of_week == this.studyRoomsDetails[i].schedule[k].day){
            this.studyRoomsDetails[i].schedule[k].day = day_of_week + ' ' + monthName + ' ' + dayNumber
            orderedSchedule.push(this.studyRoomsDetails[i].schedule[k]);
            break;
          }
        }
      }

    this.studyRoomsDetails[i].schedule = orderedSchedule;
      
    }

    console.log("DANIELEEEEEEEEEEEEEEEEE")
    console.log(this.studyRoomsDetails)

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

        // preparo array di coordinate nello store per il successivo caricamento dei dati relativi ai dettagli
        let coordinate_aule = []
        
        coordinate_aule.push({
          id_study_room: 0,
          lat: this.center.lat,
          lng: this.center.lng
        })

        coordinate_aule.push({
          id_study_room: 1,
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng + this.MARKER_DETERMINATION
        })

        coordinate_aule.push({
          id_study_room: 2,
          lat: this.center.lat + this.MARKER_DETERMINATION,
          lng: this.center.lng - this.MARKER_DETERMINATION
        })

         this.setCoordinate_aule(coordinate_aule);

         console.log(this.$store.state.coordinate_aule);

    },

    findElementIndex(array_coordinates, lat, lng){
      for(let i=0;i<array_coordinates.length;i++){
        if(array_coordinates[i].lat === lat && array_coordinates[i].lng === lng){
          return i;
        }
      }
      return -1;
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

    findDayOfWeekDetailsFromSchedule(schedule, day){
      for(let i=0;i<schedule.length;i++){
        if(schedule[i].day == day){
          return schedule[i]
        }
      }
      return null;
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

