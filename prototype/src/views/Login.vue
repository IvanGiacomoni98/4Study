<template>
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">

        <!--  CARD  -->
        <div class="card card-signin my-5 border-warning mb-3">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Log in</b></h5>
            <hr class="my-4">

            <!--  FORM  -->
            <form class="form-signin" @keyup.enter="accedi()">
              <div class="form-label-group">
                  <h4>Email</h4>
                <input type="text" id="inputEmailOrPhone" class="form-control" v-model="emailOrPhone" placeholder="Insert your email address" required >
              </div>

              <div class="form-label-group">
              <h4>Password</h4>
                <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Insert your password" required>
              </div>


              <button v-if="readyEmail || readyPhone" @click="accedi()" type="button" class="btn btn-lg btn-success btn-block text-uppercase mt-3">Log in</button>
              <hr class="my-4">

              <div v-if="errorAuth != null" :class="colore" role="alert">
                  {{text}}
              </div>
              
              <router-link to="/registration">Not registered? Sign up</router-link>
              
            </form>
            <!--  FINE FORM  -->

          </div>
        </div>
        <!--  FINE CARD  -->

      </div>
    </div>
  </div>
</template>


<script>


import {mapMutations} from 'vuex'
import { mapGetters} from 'vuex'
import axios from 'axios';
require("dotenv").config();

export default {
    name: 'Login',
    data (){
      return {
        password : "",
        emailOrPhone : "",
        readyEmail : false,
        readyPhone : false,
        emailOk : false,
        passwordOk : false,
        phoneOk : false,
        errorAuth : null,
        text : "",
        colore : "",
        users:[],
        pws:[]
      }
    },

    beforeCreate(){
      // Se ho già effettuato l'accesso, vado direttamente alla dashboard
      if((localStorage.getItem('email') != undefined || localStorage.getItem('phone') != undefined) &&
        localStorage.getItem('password') != undefined && localStorage.getItem('token') != undefined &&
        localStorage.getItem('type') != undefined){
        
        this.$store.commit('setLogged', true)
        this.$router.push('/dashboard')
      }
    },

    watch : {
      password : function(){
        const len = this.password.length 
        if(len < 8 || len > 1024) {
          this.passwordOk = false
        }
        else
        this.passwordOk = true
      },

      emailOk : function(){
        if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
        }
        else{
          this.readyEmail = false
        }
      },

      phoneOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
        }
        else{
          this.readyPhone = false
        }
      },

      passwordOk : function(){
        if(!this.emailOk && this.passwordOk && this.phoneOk){
          this.readyPhone = true
        }
        else if(this.emailOk && this.passwordOk && !this.phoneOk){
          this.readyEmail = true
        }
        else{
          this.readyEmail = false
          this.readyPhone = false
        }
      },

      emailOrPhone : function(){
        const tmp = this.emailOrPhone
        const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        const res = regex.test(tmp)

        //Se il test va a buon fine vuol dire che ho un'email valida
        if(res){
          this.emailOk = true
          this.phoneOk = false
        }
        
        //Altrimenti, controllo se ho un telefono valido
        else if(!res){

          //Se il campo testo è lungo 10 ed è un numero vuol dire che ho un telefono valido
          if(this.emailOrPhone.length == 10 && !isNaN(parseInt(this.emailOrPhone))){
            this.emailOk = false
            this.phoneOk = true
          }

          //Altrimenti non ho nè un telefono valido nè un'email valida
          else{
            this.emailOk = false
            this.phoneOk = false
          }
        }
        
      }
    },

    methods : {
      
      ...mapMutations([
        'setLogged',
        'setToken',
        'setType',
        'setChosenCity',
      ]),
      ...mapGetters([
        'getUsers',
        'getPws'
      ]),

      memorizzaCredenziali(response){
        localStorage.email = this.emailOrPhone,
        localStorage.password = this.password,
        localStorage.token = response.data.token,
        localStorage.type = response.data.type
      },
    
      async accedi() {

  
        
        // Accesso con email e password
     
          this.users=this.$store.state.users
          this.pws= this.$store.state.pws

        var i=0
        var okusers=false
        var okpw=false
        var index=0
        console.log(this.emailOrPhone)
        console.log(this.password)
        console.log(this.users.length)
        for (i=0;i<(this.users.length);i++)
        {
               console.log(i)
          if(this.users[i]==this.emailOrPhone){
  
                okusers=true
                index=i
                break
          }
        }

        for (i=0;i<=(this.pws.length);i++)
        {
          if(this.pws[i]==this.password)
          {
                okpw=true
                break
          }
        }

        this.$store.state.indexLoggedUser=index
        localStorage.id_utente=index
        console.log("INDEX",index)
        console.log("ID STORE PRE",this.$store.state.indexLoggedUser)
        if(okusers & okpw)
          { 
            
            // Setto la città per le mappe come la città di residenza dell'utente che si è appena loggato
            this.setCityForMaps();

            this.errorAuth = 'NO ERROR'
            this.text = "Accesso a 4Study effettato con successo!"
            this.colore = "alert alert-success"
            this.$store.commit('setLogged', true)
            this.$router.push('/avanzato')
          }
          else{
              this.errorAuth = true
              this.colore = "alert alert-danger"
              this.text = "Email o password errati!"
            }
        

       

      },

      setCityForMaps() {

          const indexLoggedUser = this.$store.state.indexLoggedUser;
          
          // Setto la città per le mappe come la città di residenza dell'utente che si è appena loggato
          this.setChosenCity(this.$store.state.towns[indexLoggedUser]);

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
          })
          .catch(error => {
            alert("catch")
            console.log(error);
          });

        }

    },
}
</script>


