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
      <div class="card border-success mt-3">
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
                      :id="note._id"
                      @click="settaCampiPerAggiornamentoAnnuncio"
                    />
                  </td>
                  <td>
                    <img
                      src="../assets/download.png"
                      :id="note._id"
                      @click="visualizzaDettagli"
                      height="35"
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
          @click="tornaAllaSchermataPrecedenteDaFiltri"
          src="../assets/back.png"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
      </div>

      <center>
        <!--  DA PC E TUTTI GLI ALTRI DISPOSITIVI AD ECCEZIONE DEL TELEFONO  -->
        <div class="card card-signin border-success mt-2" style="width: 520px">
          <div class="card-body">
            <h5 class="card-title text-center"><b>Share notes</b></h5>

            <form @keyup.enter="pubblicaAnnuncio()">
              <div class="row mt-3">
                <div class="col mt-1">
                  <h6><b>Title</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success"
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
                    class="form-control border-success mt-1"
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
                    class="form-control border-success mt-1"
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
                    class="form-control border-success mt-1"
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
                    class="form-control border-success mt-1"
  
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
          @click="
            aggiornaSchermataAnnunci();
            visualizzandoDettagli = false;
          "
          src="../assets/back.png"
          class="back mt-1"
          style="width: 20px; margin-left: 16px"
        />
      </div>

      <center>
        <div class="card border-success mt-2" style="width: 460px">
          <div class="card-body">
            <h5 class="card-title text-center"><b>DETTAGLI ANNUNCIO</b></h5>

            <!--  CF  -->
            <div class="row">
              <div class="col">
                <p><b>CF</b></p>
              </div>

              <div class="col">
                {{ annuncioDaVisualizzare.CF }}
              </div>
            </div>

            <!--  Data inizio  -->
            <div class="row">
              <div class="col">
                <p><b>Data di inizio</b></p>
              </div>

              <div class="col">
                {{ annuncioDaVisualizzare.start }}
              </div>
            </div>

            <!--  Data fine  -->
            <div class="row">
              <div class="col">
                <p><b>Data di fine</b></p>
              </div>

              <div class="col">
                {{ annuncioDaVisualizzare.end }}
              </div>
            </div>

            <!--  Unica zona  -->
            <div v-if="annuncioDaVisualizzare.zone.length == 1" class="row">
              <div class="col">
                <p><b>Zona</b></p>
              </div>

              <div class="col">
                {{ annuncioDaVisualizzare.zone[0] }}
              </div>
            </div>

            <!--  Più zone  -->
            <div
              v-else
              class="row"
              v-for="(zona, index) in annuncioDaVisualizzare.zone"
              :key="index"
            >
              <div class="col">
                <p>
                  <b>Zona {{ index + 1 }}</b>
                </p>
              </div>

              <div class="col">
                {{ zona }}
              </div>
            </div>

            <!--  Descrizione  -->
            <div class="row">
              <div class="col">
                <p><b>Descrizione</b></p>
              </div>

              <div class="col">
                {{ annuncioDaVisualizzare.description }}
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
          class="card card-signin border-success mt-2 d-none d-sm-block"
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
                    class="form-control border-success"
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
                    class="form-control border-success mt-1"
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
                    class="form-control border-success mt-1"
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
                    class="form-control border-success mt-1"
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
                    class="btn border-success"
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
                    class="form-control border-success mt-1"
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

        <!--  DA TELEFONO  -->

        <div
          class="card card-signin border-success mt-2 d-block d-sm-none"
          style="width: 100%"
        >
          <div class="card-body">
            <h5 class="card-title text-center"><b>AGGIORNA L'ANNUNCIO</b></h5>

            <form @keyup.enter="aggiornaAnnuncio">
              <!--  CF  -->
              <div class="row">
                <div class="col">
                  <h6><b>CF</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success"
                    v-model="CF"
                    type="text"
                    style="width: 200px"
                  />
                </div>
              </div>

              <!--  Data inizio  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Data inizio</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success mt-1"
                    v-model="data_inizio"
                    type="date"
                    style="width: 200px"
                  />
                </div>
              </div>

              <!--  Data fine  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Data fine</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success mt-1"
                    v-model="data_fine"
                    type="date"
                    style="width: 200px"
                  />
                </div>
              </div>

              <!--  Zone  -->
              <div class="row">
                <div class="col mt-1">
                  <h6><b>Zone</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success mt-1"
                    v-model="newZona"
                    placeholder="Aggiungi(+) / Rimuovi(-)"
                    type="text"
                    style="width: 200px"
                  />
                </div>
              </div>

              <!--  Bottoni inserimento(+) e rimozione(-) zone  -->
              <div class="row mt-1">
                <div class="col">
                  <!--  Padding  -->
                </div>

                <div class="col">
                  <button
                    @click="aggiungiZona()"
                    class="btn border-success"
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
                    class="form-control border-success mt-1"
                    v-model="descrizione"
                    type="textarea"
                    maxlength="200"
                    style="width: 200px; height: 200px"
                  ></textarea>
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
          class="card card-signin border-success mt-2 d-none d-sm-block"
          style="width: 520px"
        >
          <div class="card-body">
            <h5 class="card-title text-center"><b>FILTRA ANNUNCI</b></h5>

            <form @keyup.enter="filtraAnnunci()">
              <!--  CF  -->
              <div v-if="tipoUtente != 'cittadino'" class="row">
                <div class="col mt-1">
                  <h6><b>CF</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success"
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
                    class="form-control border-success mt-1"
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
              <div class="row mt-1">
                <div class="col mt-1">
                  <h6><b>Data fine</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success mt-1"
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
              <div class="row mt-1">
                <div class="col mt-1">
                  <h6><b>Zone</b></h6>
                </div>

                <div class="col">
                  <input
                    class="form-control border-success mt-1"
                    v-model="newZona"
                    placeholder="Aggiungi(+) / Rimuovi(-)"
                    type="text"
                    style="width: 200px"
                  />
                </div>

                <!--  Bottoni aggiunta(+) e rimozione(-) zone  -->
                <div class="col">
                  <button
                    @click="aggiungiZona()"
                    class="btn border-success"
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

              <!--  Bottone di filtraggio annunci  -->
              <button
                @click="filtraAnnunci()"
                type="button"
                class="btn btn-success mt-1"
              >
                Filtra annunci
              </button>
            </form>
          </div>
        </div>

      </center>
    </div>

    <!--  SCHERMATA DI VISUALIZZAZIONE ANNUNCI FILTRATI  -->

    <div v-if="filtering && !visualizzandoDettagli">
      <div class="card border-success mt-3">
        <div class="card-body">
          <h5 class="card-title"><b>ANNUNCI FILTRATI</b></h5>

          <!--  TABELLA  -->

          <div class="table-responsive table-borderless" style="height: 350px">
            <table class="table">
              <!--  Intestazione tabella  -->
              <thead class="thead-light">
                <tr>
                  <th scope="col">CF</th>
                  <th scope="col">Data inizio</th>
                  <th scope="col">Data fine</th>
                  <th scope="col">Dettagli</th>
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
                <tr v-for="annuncio in annunciFiltrati" :key="annuncio._id">
                  <td>{{ annuncio.CF }}</td>
                  <td>{{ annuncio.start }}</td>
                  <td>{{ annuncio.end }}</td>
                  <td>
                    <p
                      data-placement="top"
                      data-toggle="tooltip"
                      title="Detail"
                    >
                      <button
                        :id="annuncio._id"
                        @click="visualizzaDettagli"
                        class="btn btn-success btn-xs"
                        data-title="Detail"
                        data-toggle="modal"
                        data-target="#detail"
                        style="height: 10px; width: 20px"
                      >
                        <span class="glyphicon glyphicon-trash"></span>
                      </button>
                    </p>
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
      annunciFiltrati: [],
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
      annuncioDaVisualizzare: {},
      annuncioDaModificare: {},
      mostraZoneInserite: false,
      idBack: "",
      title: "",
      course: "",
      tags: "",
      id:2,
      email: "",
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
    // Permette di ottenere tutti gli annunci pubblicati finora

    // Validazione data inizio e fine
    controllaDate() {
      if (this.data_inizio.length < 10) {
        this.error = "Data inizio";
        this.messaggioErrore = "Data di inizio non valida";
        return false;
      }

      if (this.data_fine.length < 10) {
        this.error = "Data fine";
        this.messaggioErrore = "Data di fine non valida";
        return false;
      }

      if (this.data_fine < this.data_inizio) {
        this.error = "Logica delle date";
        this.messaggioErrore =
          "La data di inizio non può essere maggiore di quella di fine";
        return false;
      }

      return true;
    },

    // Pubblicazione annuncio
    pubblicaNote() {

      this.notes.push({id:this.id+1,title:this.title,email:this.email,course:this.course,tag:this.tags})
      console.log(this.notes)
      this.adding=false
      this.visualizzandoDettagli=false
      this.updating=false
      this.cliccatoSuFiltra=false
      this.filtering=false
    },
    // Visualizzazione dettagli annuncio
    visualizzaDettagli(event) {
      this.visualizzandoDettagli = true;

      // Prendo l'id dell'annuncio tramite event
      const id_annuncio = event.target.id;
      const annunci = this.annunci;
      let i;
      const dim = annunci.length;

      // Cerco l'annuncio con tale id
      for (i = 0; i < dim; i++) {
        if (annunci[i]._id == id_annuncio) {
          this.annuncioDaVisualizzare = annunci[i];
          break;
        }
      }
    },
  },

  // Filtri per gli annunci
  filtraAnnunci() {
    this.cliccatoSuFiltra = false;

    // SOLO CF
    if (
      this.CF != "" &&
      this.data_inizio == "" &&
      this.data_fine == "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (annunci[i].CF == this.CF) this.annunciFiltrati.push(annunci[i]);
      }
    }

    // SOLO DATA INIZIO
    else if (
      this.data_inizio != "" &&
      this.CF == "" &&
      this.data_fine == "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (annunci[i].start >= this.data_inizio)
          this.annunciFiltrati.push(annunci[i]);
      }
    }

    //SOLO DATA FINE
    else if (
      this.data_fine != "" &&
      this.CF == "" &&
      this.data_inizio == "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (annunci[i].end <= this.data_fine)
          this.annunciFiltrati.push(annunci[i]);
      }
    }

    //SOLO ZONA
    else if (
      this.zone.length > 0 &&
      this.CF == "" &&
      this.data_inizio == "" &&
      this.data_fine == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        this.appoggioFiltri(annunci[i]);
      }
    }

    // SOLO CF E DATA INIZIO
    if (
      this.CF != "" &&
      this.data_inizio != "" &&
      this.data_fine == "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (annunci[i].CF == this.CF && annunci[i].start >= this.data_inizio)
          this.annunciFiltrati.push(annunci[i]);
      }
    }

    // SOLO CF E DATA FINE
    if (
      this.CF != "" &&
      this.data_fine != "" &&
      this.data_inizio == "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (annunci[i].CF == this.CF && annunci[i].end <= this.data_fine)
          this.annunciFiltrati.push(annunci[i]);
      }
    }

    // SOLO DATA INIZIO E DATA FINE
    if (
      this.data_inizio != "" &&
      this.data_fine != "" &&
      this.CF == "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (
          annunci[i].start >= this.data_inizio &&
          annunci[i].end <= this.data_fine
        )
          this.annunciFiltrati.push(annunci[i]);
      }
    }

    // SOLO CF E ZONE
    if (
      this.CF != "" &&
      this.zone.length > 0 &&
      this.data_inizio == "" &&
      this.data_fine == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (annunci[i].CF == this.CF) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }

    // SOLO DATA INIZIO E ZONE
    if (
      this.data_inizio != "" &&
      this.zone.length > 0 &&
      this.data_fine == "" &&
      this.CF == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (annunci[i].start >= this.data_inizio) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }

    // SOLO DATA FINE E ZONE
    if (
      this.data_fine != "" &&
      this.zone.length > 0 &&
      this.data_inizio == "" &&
      this.CF == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (annunci[i].end <= this.data_fine) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }

    // SOLO CF, DATA INIZIO E DATA FINE
    if (
      this.CF != "" &&
      this.data_inizio != "" &&
      this.data_fine != "" &&
      this.zone.length == 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        if (
          annunci[i].CF == this.CF &&
          annunci[i].start >= this.data_inizio &&
          annunci[i].end <= this.data_fine
        )
          this.annunciFiltrati.push(annunci[i]);
      }
    }

    // SOLO CF, DATA INIZIO E ZONE
    if (
      this.CF != "" &&
      this.data_inizio != "" &&
      this.zone.length > 0 &&
      this.data_fine == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (annunci[i].CF == this.CF && annunci[i].start >= this.data_inizio) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }

    // SOLO CF, DATA FINE E ZONE
    if (
      this.CF != "" &&
      this.data_fine != "" &&
      this.zone.length > 0 &&
      this.data_inizio == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (annunci[i].CF == this.CF && annunci[i].end <= this.data_fine) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }

    // SOLO DATA INIZIO, DATA FINE E ZONE
    if (
      this.data_inizio != "" &&
      this.data_fine != "" &&
      this.zone.length > 0 &&
      this.CF == ""
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (
          annunci[i].start >= this.data_inizio &&
          annunci[i].end <= this.data_fine
        ) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }

    // CF, DATA INIZIO, DATA FINE E ZONE
    if (
      this.CF != "" &&
      this.data_inizio != "" &&
      this.data_fine != "" &&
      this.zone.length > 0
    ) {
      this.filtering = true;

      let i;
      const dim = this.annunci.length;
      const annunci = this.annunci;
      for (i = 0; i < dim; i++) {
        // Scorro gli annunci
        if (
          annunci[i].CF == this.CF &&
          annunci[i].start >= this.data_inizio &&
          annunci[i].end <= this.data_fine
        ) {
          this.appoggioFiltri(annunci[i]);
        }
      }
    }
  },

  // Funzione di appoggio per i filtri per zona
  appoggioFiltri(annuncio) {
    const zone = annuncio.zone;
    let j;
    const size = zone.length;
    for (j = 0; j < size; j++) {
      // Per ogni annuncio scorro le zone inserite
      const zonaAnnuncio = zone[j].toLowerCase();
      let h;
      const len = this.zone.length;
      for (h = 0; h < len; h++) {
        // Per ogni zona inserita di ogni annuncio vedo se corrisponde a qualcuna di quelle per cui sto filtrando
        const zonaFiltro = this.zone[h].toLowerCase();
        const res = zonaAnnuncio.match(zonaFiltro);

        if (res != null && !this.annunciFiltrati.includes(annuncio)) {
          this.annunciFiltrati.push(annuncio);
        }
      }
    }
  },

  // Rimozione filtri
  rimuoviFiltri() {
    this.cliccatoSuFiltra = false;
    this.filtering = false;

    this.data_inizio = "";
    this.data_fine = "";
    this.descrizione = "";
    this.zone = [];
    this.annunciFiltrati = [];
    this.CF = "";
  },

  tornaAllaSchermataPrecedenteDaFiltri() {
    this.adding = false;
    this.updating = false;
    this.cliccatoSuFiltra = false;
    this.mostraZoneInserite = false;

    this.data_inizio = "";
    this.data_fine = "";
    this.descrizione = "";
    this.zone = [];
    this.CF = "";
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