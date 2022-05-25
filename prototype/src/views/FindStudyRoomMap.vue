<template>

    <div>

      <div v-if="!bookingSeat && !viewingSummaryPage && !sharingWithFriends" class="container">

      <div class="row mt-3">
        <router-link to="/avanzato"><img @click="backToAvanzato" src="../assets/back.png" width="30"/></router-link>
      </div>

      <div class="mt-3">
        <h3><p>Find a study room - {{cityMap}}</p></h3>
      </div>

      <div class="row mt-3">
        
        <div class="col">

        <GmapMap
              class = "mappa"
              :center="{lat:center.lat, lng:center.lng}"
              :zoom="zoomMap"
              :clickable="true"
              @click="removePopup"
              style="width: 1100px; height: 480px"
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
                      <th scope="col">Daily schedule</th>
                      <th scope="col">Currently available seats</th>
                      <th scope="col">Book a seat!</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="giorno in studyRoomClicked.schedule" :key="giorno.day">
                      <td>{{giorno.day}}</td>
                      <td>{{giorno.daily_schedule}}</td>
                      <td>{{giorno.curr_available_seats}}</td>
                      <td v-if="giorno.curr_available_seats > 0"><button :id="giorno.day+';'+giorno.daily_schedule" @click="goToBookSeat" class="btn btn-success">Book!</button></td>
                      <td v-else>--</td>
                    </tr>
                    
                  </tbody>
                </table>
        </div>
      </div>


          </div>

      </div>

      </div>

   
      <center>
        <router-link to="/chooseCity"><button style="width:170px" type="button" class="btn btn-success btn-block mt-3">Change city</button></router-link>

      </center>
       
    </div>






    <div v-else-if="bookingSeat && !viewingSummaryPage && !sharingWithFriends" class="container">

    <div class="row mt-3">
        <img @click="backToMap" class="backImgFromBookingView" src="../assets/back.png" width="30"/>
    </div>

    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">

        <!--  CARD  -->
        <div class="card card-signin my-5 border-warning mb-3">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Book your seat!</b></h5>
            <hr class="my-4">

            <!--  FORM  -->
            <form class="form-signin" @keyup.enter="bookSeat()">
              <div class="form-label-group">
                  <h4>Room name</h4>
                <input type="text" id="study_room_name" class="form-control" v-model="studyRoomClicked.nome_aula" disabled >
              </div>

              <div class="form-label-group">
                  <h4>Room address</h4>
                <input type="text" id="study_room_address" class="form-control" v-model="studyRoomClicked.indirizzo_aula" disabled >
              </div>

              <div class="form-label-group">
                  <h4>City</h4>
                <input type="text" id="citta_aula" class="form-control" v-model="citta_aula" disabled >
              </div>

              <div class="form-label-group">
                  <h4>Day details</h4>
                <input type="text" id="day_details" class="form-control" v-model="day_details" disabled >
              </div>

              <div class="form-label-group">
                  <h4>Daily schedule</h4>
                  <div class="row">

                    <div class="col">
                      <h6>Opening hours</h6>
                      <input type="time" id="open_time_schedule" class="form-control" name="open_time_schedule" v-model="open_time_schedule" disabled>

                    </div>

                    <div class="col">
                      <h6>Closing time</h6>
                      <input type="time" id="closing_time_schedule" class="form-control" name="closing_time_schedule" v-model="closing_time_schedule" disabled>


                    </div>

                  </div>

              </div>

              <div class="form-label-group">
                  <h4>Booking time</h4>
                  <div class="row">

                    <div class="col">
                      <h6>From</h6>
                      <input type="time" id="from_hour" class="form-control" name="from_hour" v-model="from_hour" required>

                    </div>

                    <div class="col">
                      <h6>To</h6>
                      <input type="time" id="to_hour" class="form-control" name="to_hour" v-model="to_hour" required>


                    </div>

                  </div>

              </div>


              <button @click="bookSeat" type="button" class="btn btn-lg btn-success btn-block text-uppercase mt-3">Book your seat!</button>
              <hr class="my-4">

              <div v-if="errorAuth != null" :class="colore" role="alert">
                  {{text}}
              </div>
              
            </form>
            <!--  FINE FORM  -->

          </div>
        </div>
        <!--  FINE CARD  -->

      </div>
    </div>
  </div>



  <div v-else-if="!bookingSeat && viewingSummaryPage && !sharingWithFriends" class="container">

    <div class="row mt-5">
       <div class="col">
          <button class="rounded" disabled id="im3"><h5>Your seat has been booked!</h5></button>
          </div>

  
    </div>
    
    <center>

    <div class="row mt-5">
       <div class="col">
         <router-link to="/avanzato">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mt-3">Homepage</button>   
          </router-link>
        </div>
        <div class="col mt-2">
          <a href="../assets/download.txt" download="study_room_reservation.pdf"
                      ><img
                        src="../assets/download.png"
                        height="60"
                        width="60"
                    /></a>
        </div>

  
    </div>
    </center>
    

  </div>




  <div v-else-if="!bookingSeat && !viewingSummaryPage && sharingWithFriends" class="container">
    <div class="row mt-3">
        <img @click="backImgFromSharingView" class="backImgFromSharingView" src="../assets/back.png" width="30"/>
    </div>

    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">

        <!--  CARD  -->
        <div class="card card-signin my-5 border-warning mb-3">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Insert your friends' emails</b></h5>
            <hr class="my-4">

            <!--  FORM  -->
            <form id="formShareEmails" ref="formShareEmails" class="form-signin" @keyup.enter="sendEmails">

              <div class="form-label-group">
                <input type="email" class="form-control" v-model="emailAddress1" placeholder="Insert an email address">
              </div>

              <div class="form-label-group">
                <input type="email" class="form-control" v-model="emailAddress2" placeholder="Insert an email address">
              </div>

              <div class="form-label-group">
                <input type="email" class="form-control" v-model="emailAddress3" placeholder="Insert an email address">
              </div>

              <div class="form-label-group">
                <input type="email" class="form-control" v-model="emailAddress4" placeholder="Insert an email address">
              </div>

              <div class="form-label-group">
                <input type="email" class="form-control" v-model="emailAddress5" placeholder="Insert an email address">
              </div>

              <div class="row">
                <div class="col">
                  <button @click="sendEmails" type="button" class="btn btn-lg btn-success btn-block mt-3">Send emails!</button>
                </div>
                  
                <div class="col">
                  <router-link to="/avanzato">
                    <button type="button" class="btn btn-lg btn-success btn-block mt-3">Homepage</button>
                  </router-link>
                </div>
              </div>
              
              <hr class="my-4">

              <div v-if="errorAuth != null" :class="colore" role="alert" style="height: 50px">
                  {{text_error}}
              </div>

            </form>
            <!--  FINE FORM  -->

          </div>
        </div>
        <!--  FINE CARD  -->

      </div>
    </div>
  
  </div>




    </div>

  
</template>

<script>

import { mapGetters, mapMutations} from 'vuex'
import {gmapApi} from 'vue2-google-maps'
import emailjs from 'emailjs-com';
import axios from 'axios';
require('dotenv').config();

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
        day_details: '',
        opening_hours: '',
        readyRangeHours: false,
        rangeHours: '',

        errorAuth : null,
        text_error : "",
        colore : "",

        emailAddress1: '',
        emailAddress2: '',
        emailAddress3: '',
        emailAddress4: '',
        emailAddress5: '',

        reservation: {
          
        },

        nomi_citta : [],
        cityMap: '',

        from_hour: '',
        to_hour: '',
        open_time_schedule: '',
        closing_time_schedule: '',


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

        bookingSeat: false,
        viewingSummaryPage: false,
        sharingWithFriends: false,

        citta_aula: '',

        
        markerOptions: {
          url: require('../assets/markerSensore.png'),
        },

        

      }
  },

  watch : {
    rangeHours : function(){
      const len = this.rangeHours.length 
        if(len >= 5 ) {
          this.readyRangeHours = true
        }
        else
          this.readyRangeHours = false
    },

  },

  beforeCreate(){

  },

  async created(){

      this.cityMap = this.$store.state.chosenCity;

    },
  
  mounted() {

    /*console.log(this.studyRoomsDetails[0].coordinate_aule)
    console.log(this.studyRoomsDetails[1].coordinate_aule)
    console.log(this.studyRoomsDetails[2].coordinate_aule)*/

    let GLOBAL_COUNTER_AULE = this.$store.state.GLOBAL_COUNTER_AULE;

    // Se è la prima volta (o più) che carico il componente, allora prendo i dati dal componente locale

    if(GLOBAL_COUNTER_AULE == 0){

      this.inserisciMarkers();

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

    // Salvo i dati la prima volta nello store
    this.setAule(this.studyRoomsDetails);

    // Aumento il contatore globale

    let c = this.$store.state.GLOBAL_COUNTER_AULE;
    c = c + 1;
    this.setGLOBAL_COUNTER_AULE(c);
    }


    // Se è la seconda volta (o più) che carico il componente, allora prendo i dati sempre dallo store

    else{

       this.studyRoomsDetails = this.$store.state.aule;

       this.inserisciMarkers();

       // Aumento il contatore globale

       let c = this.$store.state.GLOBAL_COUNTER_AULE;
       c = c + 1;
       this.setGLOBAL_COUNTER_AULE(c);

       console.log("array in data");
       console.log(this.studyRoomsDetails);
       console.log();
      
    }

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
        'setCoordinate_aule',
        'aggiungiPrenotazione',
        'setGLOBAL_COUNTER_AULE',
        'setAule',
        'levaUnPostoInAula'
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

        this.stylecard="position:absolute;top:"+Y+"px;left:"+X+"px;width:600px"
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
      },

      goToBookSeat(event){
        const prenotazioni = this.$store.state.prenotazioni_aule;

        for(let i=0;i<prenotazioni.length;i++){
          if(prenotazioni[i].day_details == event.target.id.split(";")[0]){
            alert("YOU ALREADY HAVE A RESERVATION FOR A STUDY ROOM IN THIS DAY!")
            return;
          }
        }

        this.citta_aula = this.cityMap;

        const dettagli_giorno = event.target.id.split(";")[0];
        const opening_hours = event.target.id.split(";")[1];

        this.day_details = dettagli_giorno;
        this.opening_hours = opening_hours;

        let start = this.opening_hours.split("-")[0].trim();
        let end = this.opening_hours.split("-")[1].trim();

        start = start.slice(0, -2)
        end = end.slice(0, -2)

        let start_ = '';
        let end_ = '';

        let n = start.split(":")[0].length;
        if(n==1){
          start_ = '0'+start;
        }
        else{
          start_ = start;
        }

        n = end.split(":")[0].length;
        if(n==1){
        end_ = '0'+end;
        }
        else{
          end_ = end;
        }

        this.open_time_schedule = start_;
        this.closing_time_schedule = end_;

        this.bookingSeat = true;

      },

      backToMap(){

        this.errorAuth = null;
        this.text_error = "";

        this.rangeHours = "";
        this.bookingSeat = false;
      },

      bookSeat(){

        this.errorAuth = null;
        this.text_error = "";

        const idUtenteLoggato = localStorage.getItem('id_utente');
        const nameUtenteLoggato = this.$store.state.names[idUtenteLoggato];
        const surnameUtenteLoggato = this.$store.state.surnames[idUtenteLoggato];
        const all = nameUtenteLoggato + ' ' + surnameUtenteLoggato;

        this.reservation.rangeHours = this.from_hour + " - " + this.to_hour;
        this.reservation.day_details = this.day_details;
        this.reservation.name = all;

        let max_id = this.$store.getters.getMaxIdfromBookings;

        const id = max_id + 1;

        let prenotazione = {
          id_prenotazione: id,
          nome_completo_persona: this.reservation.name,
          nome_aula: this.studyRoomClicked.nome_aula,
          indirizzo_aula: this.studyRoomClicked.indirizzo_aula,
          citta_aula: this.cityMap,
          day_details: this.reservation.day_details,
          rangeHours: this.reservation.rangeHours
        }

        const validRangeHours = this.validateRangeHours();

        if(!validRangeHours){
          return;
        }

        // Aggiungo la prenotazione nello store
        this.aggiungiPrenotazione(prenotazione);
        
        const info_aula = {
          nome_aula: this.studyRoomClicked.nome_aula,
          day_details: this.reservation.day_details
        }
        
        // Rimuovo un posto libero nell'aula in quel giorno, nello store
        this.levaUnPostoInAula(info_aula);

        this.bookingSeat = false;
        this.viewingSummaryPage = true;

      },

      validateRangeHours(){
        const opening_hours = this.opening_hours;
        let start = opening_hours.split("-")[0].trim();
        let end = opening_hours.split("-")[1].trim();

        start = start.slice(0, -2)
        end = end.slice(0, -2)

        /*alert(start)
        alert(end);*/

        let start_hour = parseInt(start.split(':')[0]);
        let start_minutes = parseInt(start.split(':')[1]);
        let end_hour = parseInt(end.split(':')[0]);
        let end_minutes = parseInt(end.split(':')[1]);

        let from_hour_hour = parseInt(this.from_hour.split(":")[0]);
        let from_hour_minutes = parseInt(this.from_hour.split(":")[1]);

        let to_hour_hour = parseInt(this.to_hour.split(":")[0]);
        let to_hour_minutes = parseInt(this.to_hour.split(":")[1]);

        if(isNaN(from_hour_hour) || isNaN(from_hour_minutes) || isNaN(to_hour_hour) || isNaN(to_hour_minutes)){
          this.errorAuth = true
          this.colore = "alert alert-danger"
          this.text = "One or both dates are not correctly filled!"
          return false;
        }

        /*console.log(start_hour + " " + start_minutes)
        console.log(end_hour + " " + end_minutes)

        console.log("from hour hour "+from_hour_hour)
        console.log("from hour minutes "+from_hour_minutes)
        console.log("to hour hour "+to_hour_hour)
        console.log("to hour minutes "+to_hour_minutes)*/

        /*alert(start_hour + " " + start_minutes)
        alert(end_hour + " " + end_minutes)

        alert("from hour hour "+from_hour_hour)
        alert("from hour minutes "+from_hour_minutes)
        alert("to hour hour "+to_hour_hour)
        alert("to hour minutes "+to_hour_minutes)*/

        if((from_hour_hour < start_hour) || ((from_hour_hour == start_hour) && from_hour_minutes < start_minutes)){
          this.errorAuth = true
          this.colore = "alert alert-danger"
          this.text = "Start hour must be greater than or equal "+start
          return false;
        }


        if((to_hour_hour > end_hour) || ((to_hour_hour == end_hour) && to_hour_minutes > end_minutes)){
          this.errorAuth = true
          this.colore = "alert alert-danger"
          this.text = "End hour must be less than or equal "+end
          return false;
        }

        if(from_hour_hour > to_hour_hour || (from_hour_hour == to_hour_hour && from_hour_minutes > to_hour_minutes)){
          this.errorAuth = true
          this.colore = "alert alert-danger"
          this.text = "Start hour must be less than or equal end hour"
          return false;
        }

        return true;
      },

      goToShareReservationWithFriends(){
        this.viewingSummaryPage = false;
        this.sharingWithFriends = true;
      },

      backImgFromSharingView(){
        this.viewingSummaryPage = true;
        this.sharingWithFriends = false;

        this.emailAddress1 = "";
        this.emailAddress2 = "";
        this.emailAddress3 = "";
        this.emailAddress4 = "";
        this.emailAddress5 = "";

        this.errorAuth = null,
        this.text_error = "",
        this.colore = ""
      },
      
      sendEmails(){

        let emails = [];

        let email_1_vuoto = false;
        let email_2_vuoto = false;
        let email_3_vuoto = false;
        let email_4_vuoto = false;
        let email_5_vuoto = false;

        if(this.emailAddress1 == ''){
          email_1_vuoto = true;
        }
        
        else{
          let tmp = this.emailAddress1;
          const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          const res = regex.test(tmp)

          if(!res){
            this.errorAuth = true;
            this.text_error = "Email number 1 wrong!"
            this.colore = "alert alert-danger"

            return;
          }
          else{
            emails.push(this.emailAddress1);
          }
        }

        if(this.emailAddress2 == ''){
          email_2_vuoto = true;
        }
        
        else{
          let tmp = this.emailAddress2;
          const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          const res = regex.test(tmp)

          if(!res){
            this.errorAuth = true;
            this.text_error = "Email number 2 wrong!"
            this.colore = "alert alert-danger"

            return;
          }
          else{
            emails.push(this.emailAddress2);
          }
        }

        if(this.emailAddress3 == ''){
          email_3_vuoto = true;
        }
        
        else{
          let tmp = this.emailAddress3;
          const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          const res = regex.test(tmp)

          if(!res){
            this.errorAuth = true;
            this.text_error = "Email number 3 wrong!"
            this.colore = "alert alert-danger"

            return;
          }
          else{
            emails.push(this.emailAddress3);
          }
        }

        if(this.emailAddress4 == ''){
          email_4_vuoto = true;
        }
        
        else{
          let tmp = this.emailAddress4;
          const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          const res = regex.test(tmp)

          if(!res){
            this.errorAuth = true;
            this.text_error = "Email number 4 wrong!"
            this.colore = "alert alert-danger"

            return;
          }
          else{
            emails.push(this.emailAddress4);
          }
        }

        if(this.emailAddress5 == ''){
          email_5_vuoto = true;
        }
        
        else{
          let tmp = this.emailAddress5;
          const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          const res = regex.test(tmp)

          if(!res){
            this.errorAuth = true;
            this.text_error = "Email number 5 wrong!"
            this.colore = "alert alert-danger"

            return;
          }
          else{
            emails.push(this.emailAddress5);
          }
        }


        if(email_1_vuoto && email_2_vuoto && email_3_vuoto && email_4_vuoto && email_5_vuoto){
          this.errorAuth = true;
          this.text_error = "All email fields are empty!"
          this.colore = "alert alert-danger"

          /*const idForm = "formShareEmails";
          const formInvioEmail = this.$refs[idForm];
          console.log(formInvioEmail)*/

          //console.log(this.reservation);

          return;
        }

        // Qui è andato tutto a buon fine
        else{

          // Qui si devono mandare le email => EMAILJS

          this.emailSender(emails);


          this.errorAuth = 'NO ERROR'
          this.text_error = "Emails successfully sent!"
          this.colore = "alert alert-success"


        }

        
      },

      emailSender(emails) {

        const user_id_public_key = process.env.VUE_APP_EMAILJS_PUBLIC_KEY_USER_ID;
      
        emailjs.init(user_id_public_key);

        const email_sender = process.env.VUE_APP_EMAILJS_SENDER_EMAIL

        const service_id = process.env.VUE_APP_EMAILJS_SERVICE_ID;
        const template_id = process.env.VUE_APP_EMAILJS_TEMPLATE_ID;

        const namePerson = this.reservation.name;
        const day_details = this.reservation.day_details;
        const rangeHours = this.reservation.rangeHours;
  
        const study_room_name = this.studyRoomClicked.nome_aula;
        const study_room_address = this.studyRoomClicked.indirizzo_aula;

        const city = this.$store.state.chosenCity;

        let message = "Name: "+namePerson+' - '+"Study room name: "+study_room_name+' - '+'Study room address: '+study_room_address
        +' - '+"City: "+city+' - '+"Day details: "+day_details+' - '+"Range hours: "+rangeHours;

        for(let i=0;i<emails.length;i++){
          const contactdetail = {
            from_name: this.reservation.name,
            to_email: emails[i],
            from_email: email_sender,
            message: message
          };

          emailjs.send(service_id, template_id, contactdetail).then( async function (res) {
            console.log(res)
            console.log("Email Sent Successfully");

            await this.sleep(1300).then(async ()=>{
              console.log("passiamo alla prossima email")
          })
          },
            error => {
              alert("Error Occur");
              console.log(error)
            })
        }

      },

      sleep(milliseconds){
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

            console.log(localStorage.getItem("lat"));
            console.log(localStorage.getItem("lng"));

          })
          .catch(error => {
            alert("catch")
            console.log(error);
          });
      }

  }

}
</script>


<style scoped>

.backImgFromBookingView{
  cursor: pointer;
}

.backImgFromSharingView{
  cursor: pointer;
}

#im3{

    height:400px;  
    width:1100px;
   
    background-size: cover;
    background-color: #ffc107;
    border-color: #c7b330;
    color: #000000;

}

#bottone_homepage{
  width: 180px;
  text-align: center;
}

#bottone_download{
  width: 180px;
  text-align: center;
}

#bottone_share{
  width: 200px;
  text-align: center;
}

</style>

