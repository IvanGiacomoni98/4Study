<template>
    <div class="container">
        <div class="row mt-4">
            <router-link to="/avanzato"><img src="../assets/back.png" width="30" /></router-link>
        </div>
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5 border-warning">
                    <div class="card-body">
                        <h5 class="card-title text-center"><b>Create new Group</b></h5>
                        <hr>
                        <form class="form-signin">

                            <div class="form-label-group"><br>
 
                                <div class="form-center">
 
                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Group Name</h5>

                                            <input type="text" v-model="name" id="inputName" :class="nameClass" placeholder="Name" autofocus required>

                                            <label v-if="nameVer==false" for="inputGroupName" class="badge badge-danger">Group Name</label>
    
                                        </div>
    
                                    </div>
    
                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Group Course</h5>
                                            <input type="text" v-model="course" id="inputCourse" :class="courseClass" placeholder="Course" autofocus required>
                                            <label v-if="courseVer==false" for="inputGroupCourse" class="badge badge-danger">Group Course</label>
    
                                        </div>
    
                                    </div>
    
                                    <div class="row mt-2">
    
                                        <div class="col">
    
                                            <h5>Address</h5>
                                            <input type="text" v-model="address" id="inputAddress" :class="addressClass" placeholder="Address" autofocus required>

                                            <label v-if="addressVer==false" for="inputAddress" class="badge badge-danger">Address</label>
    
                                        </div>
    
                                    </div>
    
                                </div>

                                <button @click="goToMapStudyRooms" class="btn btn-success btn-block mt-4" type="button">Create Group</button>
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

            nomi_citta: [],
            chosen_city: ''
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
            'setChosenCityCoordinates'
        ]),

        ...mapGetters([
            'getChosenCity',
            'getChosenCityCoordinates'
        ]),
         addGruppo()
        {

            var obj={ id_study_group: 3, coordinate_gruppo : {lat: '',lng: '',},nome_gruppo: this.name,descrizione_gruppo: 'This is a course for '+this.course, indirizzo_gruppo: this.address,partecipanti:'1' }
         
            localStorage.setItem('gruppo_aggiunto',JSON.stringify(obj))

           
        },

        goToMapStudyRooms() {
            this.addGruppo()
            localStorage.setItem('groupAdded', "true")
            this.$router.push('/findGroupMap/' + this.chosen_city)


        }
        
        
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
</style>