<template>
  <div>
    <!--  SCHERMATA DI VISUALIZZAZIONE INIZIALE  -->

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
          <h5 class="card-title "><button class="btn btn-warning mb-2" @click="myAnnouncements()" style="float:left">View my announcements </button><b>Announcements</b></h5>
          <!--
          <div> {{this.announcements}}</div>
          <div> {{this.id}}</div>
          <div> ***********************</div>
          <div> {{this.$store.state.announcements}}</div>
          <div> {{this.$store.state.id_announcements}}</div>
          -->
          <!--  TABELLA  -->

          <div class="table-responsive table-borderless" style="height: 350px">
            <table class="table">
              <!--  INTESTAZIONE TABELLA  -->
              <thead class="thead-light">
                <tr>
                  <th scope="col">
                    <router-link to="/avanzato"
                      ><img
                        data-title="Torna alle avanzate"
                        src="../assets/back.png"
                        class="back"
                        style="width: 20px; margin-left: 16px"
                    /></router-link>
                  </th>
                  <th scope="col">Title</th>
                  <th scope="col">Details</th>
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
                    <!--   da inserire in img tag: @click="visualizzaDettagli"  -->

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
        <div class="card card-signin border-warning mt-2" style="width: 520px">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Publish announcement</b></h5>

            <form  @keyup.enter="publishAnnouncement()" >
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
                <p><b>Email</b></p>
              </div>

              <div class="col">
                {{ annunciDaVisualizzare.email }}
              </div>
            </div>

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

        <div
          class="card card-signin border-warning mt-2 d-none d-sm-block"
          style="width: 520px"
        >
          <div class="card-body">
            <h5 class="card-title text-center"><b>AGGIORNA L'ANNUNCIO</b></h5>

            <form @keyup.enter="aggiornaAnnuncio">
              <!--  CF  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>CF</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning"
                    v-model="CF"
                    type="text"
                    style="width: 200px"
                  />
                </div>

                <div class="col">
                  <!--  Padding per bottoni + e -  -->
                </div>
              </div>

              <!--  Data inizio  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Data inizio</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="data_inizio"
                    type="date"
                    style="width: 200px"
                  />
                </div>

                <div class="col">
                  <!--  Padding per bottoni + e -  -->
                </div>
              </div>

              <!--  Data fine  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Data fine</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="data_fine"
                    type="date"
                    style="width: 200px"
                  />
                </div>

                <div class="col">
                  <!--  Padding per bottoni + e -  -->
                </div>
              </div>

              <!--  Zone  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Zone</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="newZona"
                    placeholder="Aggiungi(+) / Rimuovi(-)"
                    type="text"
                    style="width: 200px"
                  />
                </div>

                <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
                <div class="col">
                  <button
                    @click="aggiungiZona()"
                    class="btn border-warning"
                    type="button"
                    style="width: 35px; height: 35px"
                  >
                    <b>+</b>
                  </button>
                  <button
                    @click="mostraZoneInserite = !mostraZoneInserite"
                    class="btn border-danger ml-1"
                    type="button"
                    style="width: 35px; height: 35px"
                  >
                    <b>-</b>
                  </button>
                </div>
              </div>

              <!--  Zone inserite  -->
              <div v-if="mostraZoneInserite">
                <div v-for="(zona, index) in zone" :key="index">
                  <div class="row mt-2">
                    <div class="col">
                      {{ zona }}
                    </div>

                    <div class="col">
                      <button
                        @click="rimuoviZona"
                        :id="index"
                        class="btn border-warning ml-1"
                        type="button"
                        style="width: 35px; height: 35px"
                      >
                        <b>-</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!--  Descrizione  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Descrizione</b></h6>
                </div>

                <div class="col">
                  <textarea
                    class="form-control border-warning mt-1"
                    v-model="descrizione"
                    type="textarea"
                    maxlength="200"
                    style="width: 200px; height: 200px"
                  ></textarea>
                </div>

                <div class="col">
                  <!--  Padding per bottoni + e -  -->
                </div>
              </div>

              <div
                v-if="
                  cliccatoSuAggiorna &&
                  (error == 'CF' ||
                    error == 'Data inizio' ||
                    error == 'Data fine' ||
                    error == 'Logica delle date' ||
                    error == 'Descrizione')
                "
                class="alert alert-danger mt-1"
                role="alert"
              >
                {{ messaggioErrore }}
              </div>

              <div
                v-else-if="cliccatoSuAggiorna && error == ''"
                class="alert alert-success mt-1"
                role="alert"
              >
                {{ messaggioConferma }}
              </div>

              <!--  Bottone di aggiornamento annuncio  -->
              <button
                @click="aggiornaAnnuncio()"
                type="button"
                class="btn btn-success mt-1"
              >
                Aggiorna annuncio
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
          <h5 class="card-title"><b>Filtered announcements</b></h5>

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
          <button @click="tornaAllaSchermataPrecedenteDaFiltri" type="button" id="bottone_annunci" class="btn btn-lg btn-success btn-block mt-3">Announcements</button>   
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
  name: "Announcements",

  data() {
    return {
      notes: [],
      tipoUtente: "",
      annunci: [],
      annunciFiltrati: [],
      loading: false,
      adding: false,
      visualizzandoDettagli: false,
      updating: false,
      cliccatoSuFiltra: false,
      filtering: false,
      confirmationPage: false,
      CF: "",
      data_inizio: "",
      data_fine: "",
      descrizione: "",
      newZona: "",
      zone: [],
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
      course: "",
      tags: "",
      id: 0,
      email: "",
      tag1: "",
      tag2: "",
      tag3: "",
      announcements: [],
      id_utente:0,

      errorAuth : null,
      text_error : "",
      colore : "",
    };
  },

  created() {
    this.announcements = this.$store.state.announcements
    this.id = this.$store.state.id_announcements
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


      //questo aggiorna sia versione locale sia store di announcements
      this.id_utente=localStorage.id_utente
      this.email=this.$store.state.users[this.id_utente]
      this.announcements.push({
        id: this.id + 1,
        email: this.email,
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
    myAnnouncements()
    {
      this.$router.push("/myannouncements")
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

      this.data_inizio = "";
      this.data_fine = "";
      this.descrizione = "";
      this.zone = [];
      this.CF = "";

      this.title = "";
      this.description = "";
      this.tags = "";
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