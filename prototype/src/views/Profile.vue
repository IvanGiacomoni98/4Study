<template>


    <div class="container mt-3 ">
      <div class="row">
        <div class="col">
        <div class="card border-warning mb-3">
        <div class="card-body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item active"><a @click="switchProfile()" class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="false" >Profile</a></li>
          <li class="nav-item" ><a @click="switchBooking()"  class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="true">My bookings</a></li>
         
        </ul>
        <!-- TABBED PANE CONTENT-->
        <div class="tab-content" id="myTabContent" >
          <div v-if="profile" id="tab1" class="tab-pane active" role="tabpanel" aria-labelledby="tab1-tab">
              <div class="row">
                <div class="col">
                    
              <div class="row mt-5">
                <div class="col mt-2">
                  <h6><b>Name</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="name"
                    style="width: 200px"
                  />
                   </div>
                   <div class="col mt-2">
                  <h6><b>Phone</b></h6>
                </div>
               

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="phone"
                    style="width: 200px"
                  />
                </div>

              </div>

            <div class="row mt-2">
                <div class="col mt-2">
                  <h6><b>Surname</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="surname"
                    style="width: 200px"
                  />
                   </div>
                   <div class="col mt-2">
                  <h6><b>Date of birth</b></h6>
                </div>
               

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="date"
                    style="width: 200px"
                    type="date"
                  />
                </div>

              </div>

            <div class="row mt-2">
                <div class="col mt-2">
                  <h6><b>Email</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="email"
                    style="width: 200px"
                  />
                   </div>
                   <div class="col mt-2">
                  <h6><b>High School</b></h6>
                </div>
               

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="high"
                    style="width: 200px"
                  />
                </div>

              </div>

            <div class="row mt-2 mb-5">
                <div class="col mt-2">
                  <h6><b>Residence Town</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="town"
                    style="width: 200px"
                  />
                   </div>
                   <div class="col mt-2">
                  <h6><b>University</b></h6>
                </div>
               

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="university"
                    style="width: 200px"
                  />
                </div>

              </div>
              <div class="row">
              <div class="col">
                    <button class="btn btn-success" @click="saveProfile()" >Save</button>
                  </div>
              </div>
                </div>
              </div>
            

            </div>
          </div>

          <!-- Secondo Tabbed-->
          <div v-if="!profile" class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
              
            <div class="col" style="padding-top:5px;">

              <div>

              <!--  TABELLA  -->

              <div class="table-responsive table-borderless mt-1" style="height: 350px">
                <table class="table">
                  <!--  INTESTAZIONE TABELLA  -->
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Booking id</th>
                      <th scope="col">Study room name</th>
                      <th scope="col">Hours' range</th>
                      <th scope="col">Details</th>
                      <th scope="col">Download</th>
                    </tr>
                  </thead>

              <!--  CORPO TABELLA  -->
              <tbody>
                <tr v-for="booking in bookings" :key="booking.id_prenotazione">
                  <td>{{booking.id_prenotazione}}</td>
                  <td>{{booking.nome_aula}}</td>
                  <td>{{booking.rangeHours}}</td>
                  <td>
                    <img
                      src="../assets/eye.png"
                      height="30"
                      :id="booking.id_prenotazione"
                      class="img_dettagli_booking"
                      @click="viewBookingDetails"
                    />
                  </td>
                  <td>
                    <a href="../assets/download.txt" download="download.txt"
                      ><img
                        src="../assets/download.png"
                        :id="booking.id_prenotazione"
                        height="35"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      
    </div>
        
            </div>


          </div>




          
        </div>
        </div>
              </div>
              </div>
          </div>



</template>

<script>

import {mapMutations} from 'vuex'

export default {
  name: 'Profile',
  data(){
    return {
        id_utente:0,
        phone:"",
        email:"",
        town:"",
        high:"",
        university:"",
        date:"",
        name:"",
        surname:"",
        profile: true,
        
        bookings: [],
    }
  },
  mounted()
  {
    console.log('ID',this.id_utente)
    console.log('ID STORE',this.$store.state.indexLoggedUser)
    this.id_utente=localStorage.id_utente
    console.log(this.id_utente)
    this.phone=this.$store.state.phones[this.id_utente]
    this.email=this.$store.state.users[this.id_utente]
    this.phone=this.$store.state.phones[this.id_utente]
    this.name=this.$store.state.names[this.id_utente]
    this.surname=this.$store.state.surnames[this.id_utente]
    this.high=this.$store.state.highschools[this.id_utente]
    this.town=this.$store.state.towns[this.id_utente]
    this.university=this.$store.state.univerisities[this.id_utente]

    // carico le prenotazioni
    this.bookings = this.$store.state.prenotazioni_aule;

  },
  methods:{

      ...mapMutations([
        'setPrenotazione_dettagli',
      ]),

      switchBooking(){
          this.profile=false
      },
    switchProfile(){
          this.profile=true
      },
      saveProfile()
      {
          this.$store.state.phones[this.id_utente]=this.phone
          this.$store.state.users[this.id_utente]=this.email
          this.$store.state.phones[this.id_utente]= this.phone
          this.$store.state.names[this.id_utente]=this.name
          this.$store.state.surnames[this.id_utente]=this.surname
          this.$store.state.highschools[this.id_utente]=this.high
          this.$store.state.univerisities[this.id_utente]=this.university
          alert("Profile saved!")
          
      },

      viewBookingDetails(event){

        const id = event.target.id;

        for(let i=0;i<this.bookings.length;i++){
          if(this.bookings[i].id_prenotazione == id){
            this.setPrenotazione_dettagli(this.bookings[i]);
            this.$router.push('/bookingDetails');
          }
        }
      },
  }

  
}
</script>

<style scoped>


#im3{

    height:250px;  
    width:300px;
   
     background-size: cover;
     background-color: #ffc107;
     border-color: #c7b330;
     
    

}

#im3:hover{
  border-color: #ffe53e;
   background-color:#e0ca3b
    
}

#im4{

    height:250px;  
    width:300px;
    
    background-size: cover;
     border:0;
     background-color: transparent;

}

#im4:hover{
  background-image:url('../assets/menu_ins2.png');
   
    
}

.img_dettagli_booking{
  cursor: pointer;
}

.backImgFromBookingDetailsView{
  cursor: pointer;
}

</style>
