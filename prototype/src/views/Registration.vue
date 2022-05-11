
<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5  border-warning">
          <div class="card-body">
           <h4 class="card-title text-center "><b>Registration </b></h4>
           
            <hr class="my-4">
            <form class="form-signin" onsubmit="return checkForm();">



              <div class="form-label-group">
                
                    <div class="row">
                    <div class="col ">
                      <h5>Surname</h5>
                        <input type="text" v-model=surname id="inputSurname" :class="surnameClass" placeholder="Surname" required>
                        <label v-if="surnameVer==false" for="inputSurname" class="badge badge-danger">No numero</label>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <h5>Name</h5>
                        <input type="text" v-model=name  id="inputName" :class="nameClass" placeholder="Name" autofocus required>
                        <label v-if="nameVer==false" for="inputName" class="badge badge-danger">No numero</label>
                    </div>
                    </div>
              </div>

              <div class="form-label-group">
                <div class="row mt-2">
                    <div class="col">
                       <h5>Email</h5>
                        <input type="email" v-model=email id="inputEmail" :class="emailClass" placeholder="E-mail" required>
                        <label v-if="emailVer==false" for="inputEmail" class="badge badge-danger">Email not valid</label>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                      <h5>Date of birth</h5>
                        <input type="date" v-model=phone id="inputDate" :class="nameClass" placeholder="Date of birth">
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col">
                      <h5>Residence town</h5>
                        <input type="text" v-model=town id="inputTown" :class="townClass" placeholder="Residence town" required>
                        <label v-if="townVer==false" for="inputTown" class="badge badge-danger">Residence town not valid</label>
                    </div>
                </div>

                <div class="row mt-2">
                  <div class="col">
                    <h5>Password</h5>
                    <input type="password" v-model=password :class="passwordClass" placeholder="Password" required>
                  <label v-if="passwordVer==false" class="badge badge-danger">It must contain at least 8 characters, <br> a capital letter, a small letter and a number</label>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col">
                      <h5>Repeat the password</h5>
                         <input type="password" v-model=password2 :class="password2Class" placeholder="Repeat Password" required>
                  <label v-if="password2Ver==false" class="badge badge-danger">The two password are not equals</label>
                      </div>
                    </div>
              </div>

              
              <hr class="my-4">

              <button  @click="regPost" class="btn btn-lg btn-success btn-block text-uppercase"  type="button">Register</button>
              
              <hr class="my-4">
              <router-link to="/login" >Back to the login page</router-link>
              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name:'Registration',
    data() {
        return {
            //i campiOk riguardano l'inserimento
            //i campiVer riguardano la correttezza dell'inserimento
            flaginseriti: false,

            name: '',
            nameOk: false,
            nameClass: 'form-control-check',
            nameVer: true,

            surname:'',
            surnameOk:false,
            surnameClass: 'form-control-check',
            surnameVer: true,

            sex:'',
            sexOk:false,
            sexClass: 'select-control-check',

            day:'',
            dayOk:false,
            dayClass: 'select-control-check',

            month:'',
            monthOk:false,
            monthClass: 'select-control-check',

            year:'',
            yearOk:false,
            yearClass: 'select-control-check',

            birthplace:'',
            birthplaceOk:false,
            birthplaceClass: 'form-control-check',
            birthplaceVer: true,

            town:'',
            townOk: false,
            townClass: 'form-control-check',
            townVer: true,

            email:'',
            emailOk:false,
            emailClass: 'form-control-check',
            emailVer: true,

            password:'',
            passwordOk:false,
            passwordClass: 'form-control-check',
            passwordVer: true,

            password2:'',
            password2Ok:false,
            password2Class: 'form-control-check',
            password2Ver: true,

            phone: '',
            phoneOk:false,
            phoneClass: 'form-control-check',
            phoneVer: true,

            allerta: false
        }
    },
    watch: {
        name: function(){
          if(this.name=='') this.nameOk = false
          else this.nameOk = true 
          if(isNaN(this.name) || this.name=='')  { this.nameVer = true; this.nameClass = "form-control-check-ver";}
          else { this.nameVer = false; this.nameClass = "form-control-check-errore";}
        },
        surname: function(){
          if(this.surname=='') this.surnameOk = false
          else this.surnameOk = true
          if(isNaN(this.surname) || this.surname=='')  { this.surnameVer = true; this.surnameClass = "form-control-check-ver";}
          else{ this.surnameVer = false; this.surnameClass = "form-control-check-errore";}
        },
        town: function(){
          if(this.town=='') this.townOk = false
          else this.townOk = true

          if(this.town.charAt(0) == this.town.charAt(0).toLowerCase()){ 
            var newTown = ""
            newTown=this.town.charAt(0).toUpperCase() + this.town.slice(1);
            this.birthplace = newTown
          }  
          
          var trovato = false
          var json = require('../../comuni.json');
          var i=0
          for(i=0; i<json.length; i++){
            if(json[i].nome.toLowerCase()==this.town.toLowerCase()){
              trovato=true
              this.town = json[i].nome
            }
          }          

          if(trovato==true && this.townOk==true) { this.townVer = true; this.townClass = "form-control-check-ver";}
          else { this.townVer = false; this.townClass = "form-control-check-errore";}
        },
        sex: function(){
          if(this.sex=='') this.sexOk = false
          else this.sexOk = true
        },
        day: function(){
          if(this.day=='') this.dayOk = false
          else this.dayOk = true
        },
        month: function(){
          if(this.month=='') this.monthOk = false
          else this.monthOk = true
        },
        year: function(){
          if(this.year=='') this.yearOk = false
          else this.yearOk = true
        },
        birthplace: function(){
          if(this.birthplace=='') this.birthplaceOk = false
          else this.birthplaceOk = true

          if(this.birthplace.charAt(0) == this.birthplace.charAt(0).toLowerCase()){ 
            var newBirth = ""
            newBirth=this.birthplace.charAt(0).toUpperCase() + this.birthplace.slice(1);
            this.birthplace = newBirth
          }  
          
          var trovato = false
          var json = require('../../comuni.json');
          var i=0
          for(i=0; i<json.length; i++){
            if(json[i].nome.toLowerCase()==this.birthplace.toLowerCase()){
              trovato=true
              this.birthplace = json[i].nome
            }
          }          

          if(trovato==true && this.birthplaceOk==true) { this.birthplaceVer = true; this.birthplaceClass = "form-control-check-ver";}
          else { this.birthplaceVer = false; this.birthplaceClass = "form-control-check-errore";}
        },
        email: function(){
          if(this.email=='') this.emailOk = false
          else this.emailOk = true
          var corretta = false
          
          var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(this.email)) corretta = true
          

          if(corretta==true)  { this.emailVer = true; this.emailClass = "form-control-check-ver";}
          else{ this.emailVer = false; this.emailClass = "form-control-check-errore";}
        },
        password: function(){
          if(this.password=='') this.passwordOk = false
          else this.passwordOk = true
          var numero = false;
          var lMaiusc = false;
          var lMinusc = false;
          var i = 0
          for(i=0;i<this.password.length;i++){
            var character = this.password.charAt(i);
            if (!isNaN(character * 1)){
                numero=true
            }else{
              if (character == character.toUpperCase()) {
                lMaiusc = true
              }
              if (character == character.toLowerCase()){
                lMinusc = true
              }
            }
          }
          if(this.password.length>=8 && numero==true && lMaiusc==true && lMinusc==true)  
                { this.passwordVer = true; this.passwordClass = "form-control-check-ver";}
          else{ this.passwordVer = false; this.passwordClass = "form-control-check-errore";}
        },
        password2: function(){
          if(this.password2=='') this.password2Ok = false
          else this.password2Ok = true
          if(this.password2 == this.password) { this.password2Ver = true; this.password2Class = "form-control-check-ver";}
          else{ this.password2Ver = false; this.password2Class = "form-control-check-errore";}
        },
        phone: function(){
          if(!isNaN(this.phone) && this.phone.length==10 && this.phone!='')  { this.phoneVer = true; this.phoneClass = "form-control-check-ver";}
          else if(this.phone==''){this.phoneVer=true;this.phoneClass = "form-control-check";}
          else{ this.phoneVer = false; this.phoneClass = "form-control-check-errore";}
        },
        nameOk: function(){
          if(this.nameOk==true) this.nameClass = 'form-control-check'
          else this.nameClass = "form-control-check-errore"
        },
        surnameOk: function(){
          if(this.surnameOk==true) this.surnameClass = 'form-control-check'
          else this.surnameClass = "form-control-check-errore"
        },
        birthplaceOk: function(){
          if(this.birthplaceOk==true) this.birthplaceClass = 'form-control-check'
          else this.birthplaceClass = "form-control-check-errore"
        },
        emailOk: function(){
          if(this.emailOk==true) this.emailClass = 'form-control-check'
          else this.emailClass = "form-control-check-errore"
        },
        passwordOk: function(){
          if(this.passwordOk==true) this.passwordClass = 'form-control-check'
          else this.passwordClass = "form-control-check-errore"
        },
        dayOk: function(){
          if(this.dayOk==true) this.dayClass = 'select-control-check-ver'
          else this.dayClass = "select-control-check-errore"
        },
        monthOk: function(){
          if(this.monthOk==true) this.monthClass = 'select-control-check-ver'
          else this.monthClass = "select-control-check-errore"
        },
        yearOk: function(){
          if(this.yearOk==true) this.yearClass = 'select-control-check-ver'
          else this.yearClass = "select-control-check-errore"
        },
        sexOk: function(){
          if(this.sexOk==true) this.sexClass = 'select-control-check-ver'
          else this.sexClass = "select-control-check-errore"
        },
        townOk: function(){
          if(this.townOk==true) this.townClass = 'select-control-check-ver'
          else this.townClass = "select-control-check-errore"
        }


    }
    ,
    methods : {
        checkForm(){
          if(this.nameVer==true && this.surnameVer==true && (this.phoneVer==true || this.phone=='') && this.emailVer==true && 
          this.birthplaceVer==true && this.passwordVer==true && this.dayOk==true && this.monthOk==true && 
          this.yearOk==true && this.townOk==true && this.sexOk==true && this.password2Ver==true) return true;
          else return false
        }
        ,
        regPost() { 
          var tuttoInserito = true;
          if(!this.nameOk || this.nameVer==false){
              tuttoInserito = false
              this.allerta = true
              this.nameClass = 'form-control-check-errore'
          }
          if(!this.surnameOk || this.surnameVer==false){
              tuttoInserito = false
              this.allerta = true
              this.surnameClass = 'form-control-check-errore'
          }
          if(!this.birthplaceOk || this.birthplaceVer==false){
              tuttoInserito = false
              this.allerta = true
              this.birthplaceClass = 'form-control-check-errore'
          }
          if(!this.emailOk || this.emailVer==false){
              tuttoInserito = false
              this.allerta = true
              this.emailClass = 'form-control-check-errore'
          }
          if(this.phone!='' && this.phoneVer==false){
              tuttoInserito = false
              this.allerta = true
              this.phoneClass = 'form-control-check-errore'
          }
          if(!this.passwordOk || this.passwordVer==false){
              tuttoInserito = false
              this.allerta = true
              this.passwordClass = 'form-control-check-errore'
          }
          if(!this.password2Ok || this.password2Ver==false){
              tuttoInserito = false
              this.allerta = true
              this.password2Class = 'form-control-check-errore'
          }
          if(!this.dayOk){
              tuttoInserito = false
              this.allerta = true
              this.dayClass = 'select-control-check-errore'
          }
          if(!this.monthOk){
              tuttoInserito = false
              this.allerta = true
              this.monthClass = 'select-control-check-errore'
          }
          if(!this.yearOk){
              tuttoInserito = false
              this.allerta = true
              this.yearClass = 'select-control-check-errore'
          }
          if(!this.sexOk){
              tuttoInserito = false
              this.allerta = true
              this.sexClass = 'select-control-check-errore'
          }
          if(!this.townOk || this.townVer == false){
              tuttoInserito = false
              this.allerta = true
              this.passwordClass = 'form-control-check-errore'
          }

          this.$store.state.names.push(this.name)
          this.$store.state.surnames.push(this.surname)
          //don't worry be happy
           this.$store.state.dates.push(this.phone)
           this.$store.state.towns.push(this.town);
        this.$store.state.users.push(this.email)
        this.$store.state.pws.push(this.password)
        this.$store.state.phones.push("")
          this.$store.state.highschools.push("")
          this.$store.state.univerisities.push("")
        console.log( tuttoInserito)
        alert("Registration success")
        this.$router.push('/login')

          

        }
    }
}
</script>

<style scoped>



.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

h5 {
float:left;
}




</style>

