<template>
    
  <div>

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
                <p><b>Hours' range</b></p>
              </div>

              <div class="col">
                {{booking.rangeHours}}
              </div>
            </div>



          </div>
        </div>
      </center>

  </div>

</template>

<script>
export default {
  name: "BookingDetails",

  data() {
    return {
      booking: {}
    };
  },

  created() {
    this.booking = this.$store.state.prenotazione_dettagli;
  },

  methods: {
    
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
</style>