<template>
  <div>
    <!--  SCHERMATA DI VISUALIZZAZIONE INIZIALE  -->

    <div
      v-if="
        !adding &&
        !visualizzandoDettagli &&
        !updating &&
        !cliccatoSuFiltra &&
        !filtering
      "
    >
      <div class="card border-warning mt-3">
        <div class="card-body">
          <h5 class="card-title"><b>Notes</b></h5>

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
                  <th scope="col">Download</th>
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
                <tr v-for="note in notes" :key="note.id">
                  <td></td>
                  <td>{{ note.title }}</td>
                  <td>
                    <img
                      src="../assets/eye.png"
                      height="30"
                      :id="note.id"
                      @click="visualizzaDettagli"
                    />
                  </td>
                  <td>
                    <a href="../assets/download.txt" download="download.txt"
                      ><img
                        src="../assets/download.png"
                        :id="note.id"
                        height="35"
                    /></a>
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
            Share Notes
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
            <h5 class="card-title text-center"><b>Share notes</b></h5>

            <form @keyup.enter="pubblicaAnnuncio()">
              <div class="row mt-3">
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

              <div class="row mt-2">
                <div class="col mt-1">
                  <h6><b>Course</b></h6>
                </div>

                <div class="col">
                  <select
                    class="form-control border-warning mt-1"
                    v-model="course"
                    style="width: 200px"
                  >
                    <option value="HCI">HCI</option>
                    <option value="HCI">SE</option>
                    <option value="HCI">IOT</option>
                  </select>
                </div>
              </div>

              <div class="row mt-2">
                <div class="col mt-1">
                  <h6><b>Email</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="email"
                    style="width: 200px"
                  />
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

              <!--  Bottone di pubblicazione annuncio  -->
              <button
                @click="pubblicaNote()"
                type="button"
                class="btn btn-success mt-3"
              >
                Share notes
              </button>
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
            <h5 class="card-title text-center"><b>Note details</b></h5>

            <!--  CF  -->
            <div class="row">
              <div class="col">
                <p><b>title</b></p>
              </div>

              <div class="col">
                {{ noteDaVisualizzare.title }}
              </div>
            </div>

            <!--  Data inizio  -->
            <div class="row">
              <div class="col">
                <p><b>Course</b></p>
              </div>

              <div class="col">
                {{ noteDaVisualizzare.course }}
              </div>
            </div>

            <!--  Data fine  -->
            <div class="row">
              <div class="col">
                <p><b>e-mail owner</b></p>
              </div>

              <div class="col">
                {{ noteDaVisualizzare.email }}
              </div>
            </div>

            <!--  Descrizione  -->
            <div class="row">
              <div class="col">
                <p><b>Tags</b></p>
              </div>

              <div class="col">
                {{ noteDaVisualizzare.tag }}
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
        <!--  DA PC E TUTTI I DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->
        <div
          class="card card-signin border-warning mt-2 d-none d-sm-block"
          style="width: 520px"
        >
          <div class="card-body">
            <h5 class="card-title text-center"><b>FILTRA ANNUNCI</b></h5>

            <form @keyup.enter="filtraNote()">
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Insert tag</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning"
                    v-model="tag1"
                    type="text"
                    style="width: 200px"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col mt-1">
                  <h6><b>Insert tag</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="tag2"
                    style="width: 200px"
                  />
                </div>
              </div>

              <div class="row mt-1">
                <div class="col mt-1">
                  <h6><b>Insert tag</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-warning mt-1"
                    v-model="tag3"
                    style="width: 200px"
                  />
                </div>
              </div>

              <!--  Bottone di filtraggio annunci  -->
              <button
                @click="filtraNote()"
                type="button"
                class="btn btn-success mt-2"
              >
                Filter notes
              </button>
            </form>
          </div>
        </div>
      </center>
    </div>

    <!--  SCHERMATA DI VISUALIZZAZIONE ANNUNCI FILTRATI  -->

    <div v-if="filtering && !visualizzandoDettagli">
      <div class="card border-warning mt-3">
        <div class="card-body">
          <h5 class="card-title"><b>Filtered notes</b></h5>

          <!--  TABELLA  -->

          <div class="table-responsive table-borderless" style="height: 350px">
            <table class="table">
              <!--  Intestazione tabella  -->
              <thead class="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Details</th>
                  <th scope="col">Download</th>
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
                <tr v-for="n in noteFiltrate" :key="n.id">
                  <td>{{ n.title }}</td>
                  <td>
                    <img
                      src="../assets/eye.png"
                      height="30"
                      :id="n.id"
                       @click="visualizzaDettagli"
                    />
                  </td>
                  <td>
                    <a href="../assets/download.txt" download="download.txt"
                      ><img
                        src="../assets/download.png"
                        :id="n.id"
                        height="35"
                    /></a>
                  </td>
                  <td><!--  Padding per img no filter  --></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",

  data() {
    return {
      notes: [],
      tipoUtente: "",
      annunci: [],
      noteFiltrate: [],
      loading: false,
      adding: false,
      visualizzandoDettagli: false,
      updating: false,
      cliccatoSuFiltra: false,
      filtering: false,
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
      noteDaVisualizzare: {},
      annuncioDaModificare: {},
      mostraZoneInserite: false,
      idBack: "",
      title: "",
      course: "",
      tags: "",
      id: 2,
      email: "",
      tag1: "",
      tag2: "",
      tag3: "",
    };
  },

  created() {
    this.notes = [
      {
        id: 1,
        title: "SE Notes",
        course: "SE",
        email: "danielebufalieritkd@gmail.com",
        tag: "#SE #IOT",
      },
      {
        id: 2,
        title: "HCI Notes",
        course: "HCI",
        email: "danielebufalieritkd@gmail.com",
        tag: "#HCI",
      },
    ];
  },

  methods: {
    // Pubblicazione annuncio
    pubblicaNote() {
      this.notes.push({
        id: this.id + 1,
        title: this.title,
        email: this.email,
        course: this.course,
        tag: this.tags,
      });

      this.adding = false;
      this.visualizzandoDettagli = false;
      this.updating = false;
      this.cliccatoSuFiltra = false;
      this.filtering = false;
    },
    
    visualizzaDettagli(event) {
      
      this.visualizzandoDettagli = true;

      // Prendo l'id dell'annuncio tramite event
      const id_note = event.target.id;
      console.log(id_note);
      const notes = this.notes;
      let i;
      const dim = notes.length;

      // Cerco l'annuncio con tale id
      for (i = 0; i < dim; i++) {
        if (notes[i].id == id_note) {
          this.noteDaVisualizzare = notes[i];
          break;
        }
      }

      console.log(this.noteDaVisualizzare);
    },

    // Filtri per gli annunci
    filtraNote() {
      this.cliccatoSuFiltra = false;
      var i = 0;
      const dim = this.notes.length;
      const notes = this.notes;

      for (i = 0; i < dim; i++) {
        var pushato = false;
        if (notes[i].tag.includes(this.tag1) && this.tag1 != "") {
          this.noteFiltrate.push(notes[i]);
          pushato = true;
        }
        if (
          notes[i].tag.includes(this.tag2) &&
          this.tag2 != "" &&
          pushato == false
        ) {
          this.noteFiltrate.push(notes[i]);
          pushato = true;
        }
        if (
          notes[i].tag.includes(this.tag3) &&
          this.tag3 != "" &&
          pushato == false
        ) {
          this.noteFiltrate.push(notes[i]);
          pushato = true;
        }
      }
      this.filtering = true;
   
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
      this.noteFiltrate = [];
    },

    tornaAllaSchermataPrecedenteDaFiltri() {
      this.adding = false;
      this.updating = false;
      this.cliccatoSuFiltra = false;
      this.mostraZoneInserite = false;
      this.visualizzandoDettagli = false;

      this.data_inizio = "";
      this.data_fine = "";
      this.descrizione = "";
      this.zone = [];
      this.CF = "";
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
</style>