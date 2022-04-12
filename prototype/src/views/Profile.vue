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
          <div   v-if="profile" id="tab1" class="tab-pane active" role="tabpanel" aria-labelledby="tab1-tab">
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
              
            <div class ="col" style="padding-top:5px;">
        
            </div>


          </div>
          
        </div>
        </div>
              </div>
              </div>
          </div>

</template>

<script>


export default {
  name: 'Profile',
  data(){
    return {
        profile: true,
      tipoUtente:null
    }
  },
  created()
  {
    
  },
  methods:{
      switchBooking(){
          this.profile=false
      },
    switchProfile(){
          this.profile=true
      }
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

</style>
