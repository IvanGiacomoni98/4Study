<template>
  <div>
    <!--  SCHERMATA DI VISUALIZZAZIONE INIZIALE  -->
    <!--
    <div> {{this.announcements}}</div>
    <div> {{this.id}}</div>
    <div> ***********************</div>
    <div> {{this.$store.state.announcements}}</div>
    <div> {{this.$store.state.id_announcements}}</div>
    <div> ***********************</div>
    -->

       
    <div
      v-if="
        !adding &&
        !visualizzandoDettagli &&
        !updating &&
        !cliccatoSuFiltra &&
        !filtering &&
        !confirmationPage
      "
    >
      <div class="card border-warning mt-3">
        <div class="card-body">
          <h5 class="card-title"><b>My Announcements</b></h5>

          <!--  TABELLA  -->

          <div class="table-responsive table-borderless" style="height: 350px">
            <table class="table">
              <!--  INTESTAZIONE TABELLA  -->
              <thead class="thead-light">
                <tr>
                  <th scope="col">
                    <router-link to="/announcements"
                      ><img
                        data-title="Torna ad announcements"
                        src="../assets/back.png"
                        class="back"
                        style="width: 20px; margin-left: 16px"
                    /></router-link>
                  </th>
                  <th scope="col">Title</th>
                  <th scope="col">Details</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                  <th scope="col">
                    <img
                      @click="cliccatoSuFiltra = true"
                      src="../assets/filter.png"
                      data-title="Go to filters"
                      class="filter"
                      style="width: 25px"
                    />
                  </th>
                </tr>
              </thead>

              <!--  CORPO TABELLA  -->
              <tbody>
                <tr v-for="announcement in announcements" :key="announcement.id">
                  <td></td>
                  <td>{{ announcement.title }}</td>
                  <td>
                    <img
                      src="../assets/eye.png"
                      height="30"
                      :id="announcement.id"
                      @click="visualizzaDettagli"
                    />
                  </td>
                  <td>
                    <img
                      src="../assets/update.png"
                      height="25"
                      :id="announcement.id"
                      @click="visualizzaModifica"
                    />
                  </td>
                   <td>
                    <img
                      src="../assets/delete.png"
                      height="25"
                      :id="announcement.id"
                      @click="eliminaAnnuncio"
                    />
                  </td>
                
                  <td><!--  Padding per img filter  --></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- BOTTONE DI AGGIUNTA  -->

          <button
            @click="adding = true"
            type="button"
            data-title="Aggiungi"
            class="btn btn-success mt-1"
          >
            Publish announcement
          </button>
        </div>
      </div>
    </div>

    <!-- SCHERMATA DI INSERIMENTO NUOVO ANNUNCIO  -->

    <div v-if="adding">
      <!--  Img Back  -->
      <div class="row mt-1 ml-1">
        <img
          @click="tornaAllaSchermataPrecedenteDaFiltri()"
          src="../assets/back.png"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
      </div>

      <center>
        <!--  DA PC E TUTTI GLI ALTRI DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->
        <div class="card card-signin border-warning mt-2" style="width: 520px">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Publish announcement</b></h5>

            <form @keyup.enter="publishAnnouncement()">
              <div class="row mt-3">
                <div class="col mt-1">
                  <h6><b>Title</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning"
                    v-model="title"
                    placeholder="Insert a title"
                    type="text"
                    style="width: 200px"
                    required
                  />
                </div>
              </div>

              <div class="row mt-3">
                <div class="col mt-1">
                  <h6><b>Description</b></h6>
                </div>

                <div class="col">
                  <textarea v-model="description" id="inputDescription" class="form-control border-warning mt-1" placeholder="Insert a description" style="height: 100px" autofocus required></textarea>
                </div>
              </div>
              

              <div class="row mt-2">
                <div class="col mt-1">
                  <h6><b>Add tags</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="tags"
                    placeholder="e.g.: #maths#tutor"
                    style="width: 200px"
                    required
                  />
                </div>
              </div>
              <div class="row mt-2">
                <div class="col mt-1">
                  <h6><b>Choose file</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    style="width: 200px"
                    type="file"
                  />
                </div>
              </div>

              <!--  Bottone di pubblicazione annuncio  -->
              <button
                @click="publishAnnouncement()"
                type="button"
                class="btn btn-success mt-3"
              >
                Publish announcement
              </button>

              <div class="mt-2" v-if="errorAuth != null" :class="colore" role="alert" style="height: 50px">
                  {{text_error}}
            </div>

            </form>
          </div>
        </div>
      </center>
    </div>

    <!--  SCHERMATA DI VISUALIZZAZIONE DETTAGLI DELL'ANNUNCIO  -->

    <div v-if="visualizzandoDettagli">
      <!--  Img Back  -->
      <div class="row mt-1 ml-1">
        <img
          @click="tornaAllaSchermataPrecedenteDaFiltri()"
          src="../assets/back.png"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
      </div>

      <center>
        <div class="card border-warning mt-2" style="width: 460px">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Announcement details</b></h5>

            <!--    -->
            <div class="row">
              <div class="col">
                <p><b>Title</b></p>
              </div>

              <div class="col">
                {{ annunciDaVisualizzare.title }}
              </div>
            </div>

            <!--    -->
            <div class="row">
              <div class="col">
                <p><b>Description</b></p>
              </div>

              <div class="col">
                {{ annunciDaVisualizzare.description }}
              </div>
            </div>

            <!--    -->
            <div class="row">
              <div class="col">
                <p><b>Tags</b></p>
              </div>

              <div class="col">
                {{ annunciDaVisualizzare.tags }}
              </div>
            </div>

            <!--    -->
            <div class="row">
              <div class="col">
                <p><b>Attached file</b></p>
              </div>

              <div class="col">
                <a href="../assets/download.txt" download="announcement.pdf"
                      ><img
                        src="../assets/image.jpg"
                        height="35"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>

    <!--  SCHERMATA DI MODIFICA DELL'ANNUNCIO  -->

    <div v-if="updating">
      <!--  Img back  -->
      <div class="row mt-1 ml-1">
        <img
          @click="tornaAllaSchermataPrecedenteDaModifica()"
          src="../assets/back.png"
          :id="idBack"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
      </div>

      <center>
        <!--  DA PC E TUTTI GLI ALTRI DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->

        <div
          class="card card-signin border-warning mt-2 d-none d-sm-block"
          style="width: 520px"
        >
          <div class="card-body">
            <h5 class="card-title text-center"><b>UPDATE ANNOUNCEMENT</b></h5>

            <form @keyup.enter="aggiornaAnnuncio">
             
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Title</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning"
                    v-model="title"
                    type="text"
                    style="width: 200px"
                  />
                </div>

              </div>

              <div class="row">
                <div class="col mt-1">
                  <h6><b>Description</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning"
                    v-model="description"
                    type="text"
                    style="width: 200px"
                  />
                </div>

              </div>


              <div class="row">
                <div class="col mt-1">
                  <h6><b>Add tags</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="tags"
                    style="width: 200px"
                  />
                </div>
              </div>

              <div class="row mt-2">
                <div class="col mt-1">
                  <h6><b>Choose file</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    style="width: 200px"
                    type="file"
                  />
                </div>
              </div>


              <!--  Bottone di aggiornamento annuncio  -->
              <button
                @click="aggiornaAnnuncio()"
                type="button"
                class="btn btn-success mt-1"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </center>
    </div>    

    <!--  SCHERMATA FILTRI  -->

    <div v-if="cliccatoSuFiltra">
      <!--  Img back  -->
      <div class="row mt-1 ml-1">
        <img
          @click="tornaAllaSchermataPrecedenteDaFiltri()"
          src="../assets/back.png"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
      </div>

      <center>
        <div
          class="card card-signin border-warning mt-2 d-none d-sm-block"
          style="width: 520px"
        >
          <div class="card-body">
            <h5 class="card-title text-center"><b>Filter announcements</b></h5>

            <form @keyup.enter="filtraAnnunci()">
              <h6><b>Insert some tags:</b></h6>              
              <div class="row">
                <div class="col">
                  <input
                    class="form-control border-warning"
                    v-model="tag1"
                    placeholder="e.g.: #maths"
                    type="text"
                    style="width: 200px"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="tag2"
                    placeholder="e.g.: #maths"
                    style="width: 200px"
                  />
                </div>
              </div>

              <div class="row mt-1">
                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="tag3"
                    placeholder="e.g.: #maths"
                    style="width: 200px"
                  />
                </div>
              </div>

              <!--  Bottone di filtraggio annunci  -->
              <button
                @click="filtraAnnunci()"
                type="button"
                class="btn btn-success mt-2"
              >
                Filter announcements
              </button>

              <div class="mt-2" v-if="errorAuth != null" :class="colore" role="alert" style="height: 50px">
                  {{text_error}}
            </div>

            </form>
          </div>
        </div>
      </center>
    </div>

    <!--  SCHERMATA DI VISUALIZZAZIONE ANNUNCI FILTRATI  -->

    <div v-if="filtering && !visualizzandoDettagli">
      <div class="card border-warning mt-3">
        <div class="card-body">
          <h5 class="card-title"><b>My filtered announcements</b></h5>

          <!--  TABELLA  -->

          <div class="table-responsive table-borderless" style="height: 350px">
            <table class="table">
              <!--  Intestazione tabella  -->
              <thead class="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Details</th>
                  <th scope="col">
                    <img
                      @click="rimuoviFiltri()"
                      src="../assets/nofilter.png"
                      data-title="Vai ai filtri"
                      class="filter"
                      style="width: 25px"
                    />
                  </th>
                </tr>
              </thead>

              <!--  Corpo tabella  -->
              <tbody>
                <tr v-for="n in annunciFiltrati" :key="n.id">
                  <td>{{ n.title }}</td>
                  <td>
                    <img
                      src="../assets/eye.png"
                      height="30"
                      :id="n.id"
                       @click="visualizzaDettagli"
                    />
                  </td>
                  <td><!--  Padding per img no filter  --></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    <!-- CONFIRMATION PAGE  -->

    <div v-else-if="confirmationPage" class="container">

    <div class="row mt-5">
       <div class="col">
          <button class="rounded" disabled id="im3"><h5>Announcement has been correctly published!</h5></button>
          </div>

  
    </div>
    
    <center>

    <div class="row mt-5">
       <div class="col">
         <router-link to="/avanzato">
          <button type="button" id="bottone_homepage" class="btn btn-lg btn-success btn-block mt-3">Homepage</button>   
          </router-link>
        </div>
        <div class="col">
          <button @click="tornaAllaSchermataPrecedenteDaFiltri" type="button" id="bottone_annunci" class="btn btn-lg btn-success btn-block mt-3">My announcements</button>   
        </div>
        <div class="col mt-2">
          <a href="../assets/download.txt" download="announcement.pdf"
                      ><img
                        src="../assets/download.png"
                        height="60"
                        width="60"
                    /></a>
        </div>

  
    </div>
    </center>
    

  </div>



  </div>
</template>


<script>
export default {
  name: "MyAnnouncements",

  data() {
    return {
      announcements: [],
      tipoUtente: "",
      annunciFiltrati: [],
      loading: false,
      adding: false,
      visualizzandoDettagli: false,
      updating: false,
      cliccatoSuFiltra: false,
      filtering: false,
      confirmationPage: false,
      error: "",
      messaggioErrore: "",
      cliccatoSuPubblica: false,
      cliccatoSuAggiorna: false,
      messaggioConferma: "",
      annunciDaVisualizzare: {},
      annuncioDaModificare: {},
      mostraZoneInserite: false,
      idBack: "",
      title: "",
      description: "",
      tags: "",
      id: 0,
      email: "",
      tag1: "",
      tag2: "",
      tag3: "",
      user_id:0,
      id_updating:0,

      errorAuth : null,
      text_error : "",
      colore : "",
    };
  },

  created() {
    this.id=this.$store.state.id_announcements
    this.announcements = this.$store.state.announcements
    this.user_id=this.$store.state.indexLoggedUser
    var app=[]
    var i=0
    for(i=0;i<this.announcements.length;i++)
    {
        if(this.announcements[i].email == this.$store.state.users[this.user_id])
            app.push(this.announcements[i])
    }
    this.announcements=app
  },


  methods: {

    // Pubblicazione annuncio
    publishAnnouncement() {

      const valid = this.validateFieldsPublishAnnouncement();
      if(!valid) {
        
        setTimeout(() => {
          this.errorAuth = null;
        }, 3000)
        
        return;
      }

      //questo aggiorna solo versione locale
      this.announcements.push({
        id: this.id + 1,
        email: this.$store.state.users[this.user_id],
        title: this.title,
        description: this.description,
        tags: this.tags,
      });

      //questo aggiorna solo store di announcements
      this.$store.state.announcements.push({
        id: this.id + 1,
        email: this.$store.state.users[this.user_id],
        title: this.title,
        description: this.description,
        tags: this.tags,
      });

      this.id += 1; //aggiorna versione locale di id_announcements
      this.$store.state.id_announcements +=1; //aggiorna versione store di id_announcements
      this.adding = false;
      this.visualizzandoDettagli = false;
      this.updating = false;
      this.cliccatoSuFiltra = false;
      this.filtering = false;
      this.confirmationPage = true;
    },

    validateFieldsPublishAnnouncement(){

      if(this.title == ""){
        this.errorAuth = true;
        this.text_error = "Please insert a title"
        this.colore = "alert alert-danger"
        return false;
      }

      if(this.description == ""){
        this.errorAuth = true;
        this.text_error = "Please insert a description"
        this.colore = "alert alert-danger"
        return false;
      }

      if(this.tags == ""){
        this.errorAuth = true;
        this.text_error = "Please insert at least one tag"
        this.colore = "alert alert-danger"
        return false;
      }

      if(this.tags.split("#").length == 1){
        this.errorAuth = true;
        this.text_error = "Tags not valid"
        this.colore = "alert alert-danger"
        return false;
      }

      return true;
    },

    visualizzaModifica(event)
    {
        const id_announcement = event.target.id;
        console.log(id_announcement)
        var i=0
         for (i=0;this.announcements.length;i++ )
             {
                 if(this.announcements[i].id==id_announcement)
                 {
                     console.log(this.announcements[i])
                    this.title=this.announcements[i].title
                    this.tags=this.announcements[i].tags
                    this.description=this.announcements[i].description
                    this.email=this.announcements[i].email
                    this.id_updating=id_announcement
                    break
                 }
             }
        this.updating=true
     },

     eliminaAnnuncio(event){
        const id_announcement = event.target.id;
         if(confirm("Do you really want to delete?"))
         {
             var  index=0
             var i=0
             //elimina annuncio in locale
             for (i=0;this.announcements.length;i++ )
             {
                 if(this.announcements[i].id==id_announcement)
                 {
                     index=i
                     console.log(i)
                     break
                 }
             }
            this.announcements.splice(index,1)

            //elimina annuncio in store
            for (i=0;this.$store.state.announcements.length;i++ )
             {
                 if(this.$store.state.announcements[i].id==id_announcement)
                 {
                     index=i
                     console.log(i)
                     break
                 }
             }
            this.$store.state.announcements.splice(index,1)
            
         }
    },

    visualizzaDettagli(event) {
      
      this.visualizzandoDettagli = true;

      // Prendo l'id dell'annuncio tramite event
      const id_announcement = event.target.id;
      console.log(id_announcement);
      const announcements = this.announcements;
      let i;
      const dim = announcements.length;

      // Cerco l'annuncio con tale id
      for (i = 0; i < dim; i++) {
        if (announcements[i].id == id_announcement) {
          this.annunciDaVisualizzare = announcements[i];
          break;
        }
      }

      console.log(this.annunciDaVisualizzare);
    },

    // Filtri per gli annunci
    filtraAnnunci() {

      const valid = this.validateTagsFiltering();
      if(!valid){
        setTimeout(() => {
          this.errorAuth = null;
        }, 3000)
        
        return;
      }

      this.cliccatoSuFiltra = false;
      var i = 0;
      const dim = this.announcements.length;
      const announcements = this.announcements;

      for (i = 0; i < dim; i++) {
        var pushato = false;
        if (announcements[i].tags.includes(this.tag1) && this.tag1 != "") {
          this.annunciFiltrati.push(announcements[i]);
          pushato = true;
        }
        if (
          announcements[i].tags.includes(this.tag2) &&
          this.tag2 != "" &&
          pushato == false
        ) {
          this.annunciFiltrati.push(announcements[i]);
          pushato = true;
        }
        if (
          announcements[i].tags.includes(this.tag3) &&
          this.tag3 != "" &&
          pushato == false
        ) {
          this.annunciFiltrati.push(announcements[i]);
          pushato = true;
        }
      }
      this.filtering = true;
   
    },

    validateTagsFiltering(){

      if(this.tag1 == "" && this.tag2 == "" && this.tag3 == ""){
        this.errorAuth = true;
        this.text_error = "Please insert at least one tag"
        this.colore = "alert alert-danger"
        return false;
      }

      if(this.tag1 != "" && this.tag1.split("#").length == 1){
        this.errorAuth = true;
        this.text_error = "First tag is not valid"
        this.colore = "alert alert-danger"
        return false;
      }

      if(this.tag2 != "" && this.tag2.split("#").length == 1){
        this.errorAuth = true;
        this.text_error = "Second tag is not valid"
        this.colore = "alert alert-danger"
        return false;
      }

      if(this.tag3 != "" && this.tag3.split("#").length == 1){
        this.errorAuth = true;
        this.text_error = "Third tag is not valid"
        this.colore = "alert alert-danger"
        return false;
      }

      return true;
    },

    tornaIndietro() {
      this.adding = false;
      this.visualizzandoDettagli = false;
      this.updating = false;
      this.cliccatoSuFiltra = false;
      this.filtering = false;
    },

    aggiornaAnnuncio(){
      var i=0
      var index=0
      var id_announcement=this.id_updating
          //elimina annuncio in locale
          for (i=0;this.announcements.length;i++ )
             {
                 if(this.announcements[i].id==id_announcement)
                 {
                     index=i
                     console.log(i)
                     break
                 }
             }
          console.log(index)
          this.announcements.splice(index,1)

          //elimina annuncio in store
          for (i=0;this.$store.state.announcements.length;i++ )
             {
                 if(this.$store.state.announcements[i].id==id_announcement)
                 {
                     index=i
                     console.log(i)
                     break
                 }
             }
          this.$store.state.announcements.splice(index,1)

          //aggiorna annuncio in locale
          this.announcements.push({
             id: this.id_updating,
             title: this.title,
             email: this.email,
             description: this.description,
             tags: this.tags,
          });
          //aggiorna annuncio in store
          this.$store.state.announcements.push({
              id: this.id_updating,
              title: this.title,
              email: this.email,
              description: this.description,
              tags: this.tags,
          })
          this.updating=false
    },

    // Rimozione filtri
    rimuoviFiltri() {
      this.cliccatoSuFiltra = false;
      this.filtering = false;
      this.tag1 = "";
      this.tag2 = "";
      this.tag3 = "";
      this.annunciFiltrati = [];
    },

    tornaAllaSchermataPrecedenteDaFiltri() {
      this.adding = false;
      this.updating = false;
      this.cliccatoSuFiltra = false;
      this.mostraZoneInserite = false;
      this.visualizzandoDettagli = false;
      this.confirmationPage = false;

      this.title = "";
      this.description = "";
      this.tags = "";

      this.tag1 = "";
      this.tag2 = "";
      this.tag3 = "";
    },
    tornaAllaSchermataPrecedenteDaModifica()
    {
      this.adding = false;
      this.visualizzandoDettagli = false;
      this.updating = false;
      this.cliccatoSuFiltra = false;
      this.filtering = false;
      
    }
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

.filter {
  cursor: pointer;
}

.inserimento {
  border-color: green;
  border-width: 0.04rem;
  /*border-radius: 10px 10px 10px 10px;*/
}

.card {
  border-color: green;
  border-radius: 10px 10px 10px 10px;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

#im3{

    height:400px;  
    width:1100px;
   
    background-size: cover;
    background-color: #ffc107;
    border-color: #c7b330;
    color: #000000;

}

</style>