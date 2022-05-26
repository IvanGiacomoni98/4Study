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
            <h5 class="card-title text-center"><b>Group details</b></h5>
            
            <div class="row">
              <div class="col">
                <p><b>Group name</b></p>
              </div>

              <div class="col">
                {{group.nome_gruppo}}
              </div>
            </div>

            
            <div class="row">
              <div class="col">
                <p><b>Address</b></p>
              </div>

              <div class="col">
                {{group.indirizzo_gruppo}}
              </div>
            </div>

            
            <div class="row">
              <div class="col">
                <p><b>Description</b></p>
              </div>

              <div class="col">
                {{group.descrizione_gruppo}}
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p><b>Partecipants</b></p>
              </div>

              <div class="col">
                {{group.partecipanti}}
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p><b>Admin</b></p>
              </div>

              <div v-if="group.admin" class="col">
                Yes
              </div>
              <div v-else class="col">
                No
              </div>
            </div>

            <div class="row">

              <div class="col">
                
                <button class="btn btn-danger" @click="leaveGroup">Leave the group</button>

              </div>
            
              <div v-if="group.admin" class="col">
                
                <button class="btn btn-danger" @click="deleteGroup">Delete group</button>

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
          <button class="rounded" disabled id="im3"><h5>{{message}}</h5></button>
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
      group: {},
      cliccatoSuCancella: false,
      text: 'Booking succesfully deleted!',
      confirmation: false,
      message: "",
    };
  },

  created() {
    this.group = this.$store.state.gruppoDettagli;
  },

  methods: {

    ...mapMutations([
        'eliminaGruppoDaiMieiGruppi',
        'abbandonaGruppo'
      ]),

    deleteGroup(){
        if(!confirm("Are you sure you want to delete this group?")){
            return
        }

        this.eliminaGruppoDaiMieiGruppi(this.group.id_study_group);

        this.message = "Group successfully deleted!";
        this.confirmation = true;
    },

    leaveGroup(){

        if(this.group.partecipanti == 1){
            if(!confirm("Are you sure you want to leave this group? The group will be permanently deleted if you do that...")){
                return
            }
            this.eliminaGruppoDaiMieiGruppi(this.group.id_study_group);
            this.message = "Group successfully deleted!";
            this.confirmation = true;
        }

        else{
            if(!confirm("Are you sure you want to leave this group?")){
                return
            }
            this.abbandonaGruppo(this.group.id_study_group);
            this.message = "Group successfully left!";
            this.confirmation = true;
        }

    },

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