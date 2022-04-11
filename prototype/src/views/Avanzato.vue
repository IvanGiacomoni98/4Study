<template>
<div>
  <!-- pc -->
  <div class="container mt-3 ">
    <div class="row mt-5">
       <div class="col">
         <router-link to="/studygroup">
          <button  class="rounded"  id="im3"><h5>Find a study group</h5></button>
          </router-link>
          </div>
        <div class="col">
            <router-link to="/findStudyRoom">
         <button  class="rounded"  id="im3"><h5>Find study rooms</h5></button> 
          </router-link>
        </div>

  
    </div>
       <div class="row mt-5">
       <div class="col">
         <router-link to="/announcements">
          <button class="rounded"  id="im3"><h5>Announcements</h5></button> 
          </router-link>
          </div>
        <div class="col">
            <router-link to="/notes">
         <button   class="rounded" id="im3"><h5>Notes</h5></button> 
          </router-link>
        </div>

  
    </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters} from 'vuex'


export default {
  name: 'Avanzato',
  data(){
    return {
      tipoUtente:null
    }
  },
  created()
  {
    console.log( this.$store.state.indexUserLogged)
    this.tipoUtente=localStorage.type

      this.$store.commit('setStazione','')
      this.$store.commit('setAgente','')
  },
  computed:{
...mapGetters({
        'getTipo':'getType'
    })
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
