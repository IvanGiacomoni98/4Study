<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5 border-warning mb-3">
            <div class="card-body">
              <h6 class="card-title text-center"><b>Recover your password</b></h6>
              <p class="text-left" style="size:6;" > Enter the email address with which you registered and your social security number, you will receive the temporary password via email to log in</p>
              <hr class="my-4">
              <!-- form -->
              <form class="form-signin pt-3 pb-3"   >
                <div class="form-label-group">
                    <input type="text" id="inputEmail" class="form-control" placeholder="Email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"  name="email" v-model="Email" required autofocus>
                </div>
               
                <button v-if="ready ==true"  @click="postPost" class="btn btn-lg btn-success btn-block text-uppercase mt-1" type="button"  id="sub" >Send email</button>

              <!-- alert che segnala la riuscita o no del reset-->  
              <hr class="my-4">
                <div v-if="errorePost!=null" :class="coloreAlert " role="alert">
                    {{text}}
              </div>
                <router-link to="/login">Torna alla schermata di Login</router-link>
              </form>
              <!-- fine form-->
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PasswordForgotten',
    data (){
      return {

            Email:null,
            readyCF:true,
            readyEmail:false,
            ready:false,
            postBody:null,
            errors: [],
            errorePost:null,
            coloreAlert:'',
            text:''
      };
  },
  watch:{

    Email: function(){
      if(!this.Email)
        this.readyEmail=false
      else
        this.readyEmail=true
    },
    readyEmail:function() {
        if(this.readyCF==true && this.readyEmail==true)
        this.ready=true
      else
        this.ready=false
    }
  },
   methods: {
 
   postPost() {
             this.errorePost=false
            this. coloreAlert="alert alert-success"
            this.text="Email inviata correttamente!"
        
 
          } 
  }


}








</script>

