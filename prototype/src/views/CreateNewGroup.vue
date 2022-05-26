<template>
    <div v-if="!confirmation">

        <div class="container">
        <div class="row mt-1">
            <router-link to="/findGroupMap"><img src="../assets/back.png" width="30" /></router-link>
        </div>
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5 border-warning">
                    <div class="card-body">
                        <h5 class="card-title text-center"><b>Create new Group</b></h5>
                        <hr>
                        <form @keyup.enter="goToMapStudyRooms()" class="form-signin">

                            <div class="form-label-group"><br>
 
                                <div class="form-center">
 
                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Group Name</h5>

                                            <input type="text" v-model="name" id="inputName" class="form-control border-warning mt-1" placeholder="Name" autofocus required>

                                            <label v-if="nameVer==false" for="inputGroupName" class="badge badge-danger">Group Name</label>
    
                                        </div>
    
                                    </div>
    
                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Group Course</h5>
                                            <input type="text" v-model="course" id="inputCourse" class="form-control border-warning mt-1" placeholder="Course" autofocus required>
                                            <label v-if="courseVer==false" for="inputGroupCourse" class="badge badge-danger">Group Course</label>
    
                                        </div>
    
                                    </div>
    
                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Address</h5>
                                            <input type="text" v-model="address" id="inputAddress" class="form-control border-warning mt-1" placeholder="Address" autofocus required>

                                            <label v-if="addressVer==false" for="inputAddress" class="badge badge-danger">Address</label>
    
                                        </div>
    
                                    </div>

                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Description</h5>
                                            <textarea v-model="description" id="inputDescription" class="form-control border-warning mt-1" placeholder="Insert a description" style="height: 100px" autofocus required></textarea>

                                            <label v-if="addressVer==false" for="inputDescription" class="badge badge-danger">Address</label>
    
                                        </div>
    
                                    </div>
    
                                </div>

                                <button @click="goToMapStudyRooms" class="btn btn-success btn-block mt-4" type="button">Create Group</button>

                                <div class="mt-2" v-if="errorAuth != null" :class="colore" role="alert" style="height: 50px">
                                    {{text_error}}
                                </div>

                                <select class="select-comune invisible" name="citta" id="citta"  v-model="chosen_city" required>
                    <option disabled value="">Choose the city</option>
                    <option v-for="(c, index) in nomi_citta" :key="index">{{c}}</option>
                </select>
  
                            </div>
                        </form>
                    </div>

                </div>

            </div>
    
    
    
        </div>
    
    </div>

    </div>

    <div v-else>
        <div class="row mt-5">
       <div class="col">
          <button class="rounded" disabled id="im3"><h5>Group successfully created! You can check your groups in the profile section.</h5></button>
          </div>

  
    </div>
    
    <center>

    <div class="row mt-5">
       <div class="col">
         <router-link to="/avanzato">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block ml-5 mt-3" style="width: 190px">Homepage</button>   
          </router-link>
        </div>

        <div class="col">
         <router-link to="/profile">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mr-5 mt-3" style="width: 190px">Profile</button>   
          </router-link>
        </div>
  
    </div>
    </center>
    </div>
    

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

require("dotenv").config();

export default {
    name: 'FindStudyGroup',
    data() {
        return {
            name:'',
            nameOk:false,
            nameClass: 'form-control-check',
            nameVer: true,

            course:'',
            courseOk:false,
            courseClass: 'form-control-check',
            courseVer: true,

            address:'',
            addressOk:false,
            addressClass: 'form-control-check',
            addressVer: true,

            description:'',
            descriptionOk:false,
            descriptionClass: 'form-control-check',
            descriptionVer: true,

            confirmation: false,

            nomi_citta: [],
            chosen_city: '',

            MARKER_DETERMINATION: 0.002,

            errorAuth : null,
            text_error : "",
            colore : "",
        }
    },

    async created() {
        const app = []

        // carico i comuni dal json
        const json = require('../../comuni.json');
        let i
        const len = json.length

        for (i = 0; i < len; i++) {
            //console.log(json[i].nome)
            app.push(json[i].nome)
        }

        this.nomi_citta = app;

    },

    watch: {

    },
    methods: {

        ...mapMutations([
            'setChosenCity',
            'setChosenCityCoordinates',
            'creaGruppo'
        ]),

        ...mapGetters([
            'getChosenCity',
            'getChosenCityCoordinates'
        ]),
         addGruppo()
        {

            const index = this.$store.state.indexGroupToAdd;
            let id_gruppo = 0;
            
            if(index == 0) id_gruppo = 3;
            else if(index == 1) id_gruppo = 4;
            
            this.$store.state.gruppi.push({
                id_study_group: id_gruppo,
                coordinate_gruppo : {
                    lat: this.$store.state.gruppiDaAggiungereCoordinate[index].lat,
                    lng: this.$store.state.gruppiDaAggiungereCoordinate[index].lng
                },
                nome_gruppo: this.name,
                descrizione_gruppo: this.description,
                indirizzo_gruppo: this.address,
                partecipanti:1,
                admin: true,
                member: true,
            })

            this.creaGruppo({
                id_study_group: id_gruppo,
                coordinate_gruppo : {
                    lat: this.$store.state.gruppiDaAggiungereCoordinate[index].lat,
                    lng: this.$store.state.gruppiDaAggiungereCoordinate[index].lng
                },
                nome_gruppo: this.name,
                descrizione_gruppo: this.description,
                indirizzo_gruppo: this.address,
                partecipanti:1,
                admin: true,
                member: true,
            });

            const lat = parseFloat(localStorage.getItem('lat'));
            const lng = parseFloat(localStorage.getItem('lng'));

            if(index == 0) this.$store.state.markers_gruppi.push({
                id_study_group: 3,
                lat: lat - this.MARKER_DETERMINATION,
                lng: lng + this.MARKER_DETERMINATION,
            })
            else if(index == 1) this.$store.state.markers_gruppi.push({
                id_study_group: 4,
                lat: lat - this.MARKER_DETERMINATION,
                lng: lng - this.MARKER_DETERMINATION
            })

            let markers_gruppi = this.$store.state.markers_gruppi;
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


            this.$store.state.indexGroupToAdd += 1;
           
        },

        goToMapStudyRooms() {

            const valid = this.validateFieldsCreateGroup();
            if(!valid) {
        
                setTimeout(() => {
                    this.errorAuth = null;
                }, 3000)
            
                return;
            }

            this.addGruppo();
            this.confirmation = true;
            //this.$router.push('/findGroupMap/' + this.chosen_city)
        },

        validateFieldsCreateGroup(){
            if(this.name == ""){
                this.errorAuth = true;
                this.text_error = "Please insert a name"
                this.colore = "alert alert-danger"
                return false;
            }

            if(this.course == ""){
                this.errorAuth = true;
                this.text_error = "Please insert a course"
                this.colore = "alert alert-danger"
                return false;
            }

            if(this.address == ""){
                this.errorAuth = true;
                this.text_error = "Please insert an address"
                this.colore = "alert alert-danger"
                return false;
            }

            if(this.description == ""){
                this.errorAuth = true;
                this.text_error = "Please insert a description"
                this.colore = "alert alert-danger"
                return false;
            }

            return true;
        },
        
        
    }
}
</script>

<style scoped>
.card-signin {
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.select-comune {
    height: auto;
    border-radius: 2rem;
    border: 1;
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
