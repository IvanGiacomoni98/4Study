<template>
    
  <div v-if="!confirmation">

      <!--  Img Back  -->
      <div class="row mt-1 ml-1">
        <router-link to="/profile">
        <img
          src="../assets/back.png"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
        </router-link>
      </div>

      <center>
        <div class="card border-warning mt-2" style="width: 460px">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Booking details</b></h5>

            <div class="row">
              <div class="col">
                <p><b>Reservation id</b></p>
              </div>

              <div class="col">
                {{booking.id_prenotazione}}
              </div>
            </div>

            
            <div class="row">
              <div class="col">
                <p><b>Person name</b></p>
              </div>

              <div class="col">
                {{booking.nome_completo_persona}}
              </div>
            </div>

            
            <div class="row">
              <div class="col">
                <p><b>Study room name</b></p>
              </div>

              <div class="col">
                {{booking.nome_aula}}
              </div>
            </div>

            
            <div class="row">
              <div class="col">
                <p><b>Study room address</b></p>
              </div>

              <div class="col">
                {{booking.indirizzo_aula}}
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p><b>Study room city</b></p>
              </div>

              <div class="col">
                {{booking.citta_aula}}
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p><b>Day details</b></p>
              </div>

              <div class="col">
                {{booking.day_details}}
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p><b>Booking time</b></p>
              </div>

              <div class="col">
                {{booking.rangeHours}}
              </div>
            </div>

            <div class="row">
              <div class="col mt-1">
                <p><b>Download</b></p>
              </div>

              <div class="col">
                <a href="../assets/download.txt" download="study_room_reservation.pdf"
                      ><img
                        src="../assets/download.png"
                        height="35"
                        width="35"
                    /></a>
              </div>
            </div>

            <div class="row">
              <div class="col">
                  <button class="btn btn-danger" @click="deleteBooking">Delete booking</button>
              </div>
            </div>

              <!--
              <div v-if="cliccatoSuCancella" class="alert alert-success mt-2" role="alert" style="height: 50px">
                  {{text}}
              </div> -->



          </div>
        </div>
      </center>

  </div>

  <div v-else-if="confirmation" class="container">

    <div class="row mt-5">
       <div class="col">
          <button class="rounded" disabled id="im3"><h5>Reservation succesfully deleted!</h5></button>
          </div>

  
    </div>
    
    <center>

    <div class="row mt-5">
       <div class="col">
         <router-link to="/avanzato">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mt-3" style="width: 190px">Homepage</button>   
          </router-link>
        </div>

        <div class="col">
         <router-link to="/profile">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mt-3" style="width: 190px">Profile</button>   
          </router-link>
        </div>
  
    </div>
    </center>
    

  </div>

</template>

<script>

import {mapMutations} from 'vuex'

export default {
  name: "BookingDetails",

  data() {
    return {
      booking: {},
      cliccatoSuCancella: false,
      text: 'Booking succesfully deleted!',
      confirmation: false,
    };
  },

  created() {
    this.booking = this.$store.state.prenotazione_dettagli;
  },

  methods: {

    ...mapMutations([
        'deleteBookingById',
        'aggiungiUnPostoInAula'
      ]),

    deleteBooking(){

      if(!confirm("Are you sure you want to delete this booking?")){
        return
      }

      console.log("Prima della cancellazione: ")
      console.log(this.$store.state.prenotazioni_aule)

      for(let i=0;i<this.$store.state.prenotazioni_aule.length;i++){
        if(this.$store.state.prenotazioni_aule[i].id_prenotazione == this.booking.id_prenotazione){
          this.$store.state.prenotazioni_aule.splice(i, 1);
          break;
        }
      }

      console.log()
      console.log("Dopo della cancellazione: ")
      console.log(this.$store.state.prenotazioni_aule)

      

      const info_aula = {
        nome_aula : this.booking.nome_aula,
        day_details : this.booking.day_details
      }

      this.aggiungiUnPostoInAula(info_aula);

      this.confirmation = true;

      //this.cliccatoSuCancella = true;
      
    }

  },
};
</script>

<style scoped>
.back {
  cursor: pointer;
}
img {
  cursor: pointer;
}

.card {
  border-radius: 10px 10px 10px 10px;
}

.btn {
  font-size: 80%;
  border-radius: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

#im3 {
    height: 400px;
    width: 1100px;
    background-size: cover;
    background-color: #ffc107;
    border-color: #c7b330;
    color: #000000;
}

</style>