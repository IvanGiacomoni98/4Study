<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5 border-warning">
          <div class="card-body">
           <h5 class="card-title text-center"><b>Insert the city where to study</b></h5>
           
            <hr>
            <form class="form-signin">

              <div class="form-label-group"><br>
              
                <div class="form-center">
                
                <select class="select-comune" name="citta" id="citta" v-model="chosen_city" required>
                    <option disabled value="">Choose the city</option>
                    <option v-for="(c, index) in nomi_citta" :key="index">{{c}}</option>
                </select>
                
                </div>
               </div>

               <button  @click="goToMapStudyRooms" class="btn btn-success btn-block mt-4"  type="button">Search</button>
              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations} from 'vuex'

export default {
    name:'FindStudyRoom',
    data() {
        return {
            nomi_citta : [],
            chosen_city : ''
        }
    },

    async created(){
      const app = []

      // carico i comuni dal json
      const json = require('../../comuni.json');
      let i
      const len = json.length
            
      for(i=0; i<len; i++){
        //console.log(json[i].nome)
         app.push(json[i].nome)
      }

      this.nomi_citta = app;

    },

    watch: {
       
    }
    ,
    methods : {

      ...mapMutations([
        'setChosenCity'
      ]),

      ...mapGetters([
        'getChosenCity'
      ]),

        goToMapStudyRooms() {
          
          this.setChosenCity(this.chosen_city)

          alert(this.getChosenCity())

          this.$router.push('/findStudyRoomMap/'+this.chosen_city)
        }
    }
}
</script>

<style scoped>

.card-signin {
  
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.select-comune{
  height: auto;
    border-radius: 2rem;
    border: 1;
}

</style>