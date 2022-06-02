import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    token : "",
    type : "",
    menuclicked:false,
    statomenu:"",
    stazione:"",
    agente:"",
    nomeStazione:"",
    names:["daniele","ivan"],
    surnames:["bufalieri","giacomoni"],
    phones:["3312233230","3553332230"],
    dates:["2/12/1998","31/05/1998"],
    users:["danielebufalieritkd@gmail.com","ivangiacomoni@gmail.com"],
    highschools:["A.Volta","G.Galilei"],
    towns:["Roma","Terracina"],
    univerisities:["Sapienza","Sapienza"],
    pws:["daniele98","4study98."],

    chosenCity: "",
    chosenCityCoordinates: { lat: 0.0, lng: 0.0 },

    coordinate_aule : [],

    aule : [],

    prenotazioni_aule: [],

    prenotazione_dettagli : {},
    gruppoDettagli : {},

    GLOBAL_COUNTER_AULE: 0,

    markers_gruppi: [

      {
        id_study_group: 0,
        lat: parseFloat(localStorage.getItem('lat')),
        lng: parseFloat(localStorage.getItem('lng'))
      },
      {
        id_study_group: 1,
        lat: parseFloat(localStorage.getItem('lat')) + 0.002,
        lng: parseFloat(localStorage.getItem('lng')) + 0.002
      },
      {
        id_study_group: 2,
        lat: parseFloat(localStorage.getItem('lat')) + 0.002,
        lng: parseFloat(localStorage.getItem('lng')) - 0.002
      }

    ],

    my_groups : [],
    
    gruppi : [

      {

        id_study_group: 0,
        coordinate_gruppo : {
          lat: '',
          lng: '',
        },
        nome_gruppo: 'SE GROUP',
        descrizione_gruppo: 'First year - Software Engineering',
        indirizzo_gruppo: 'Viale Manzoni 3, Roma',
        partecipanti:2,
        admin: false,
        member: false,
      },
      {

        id_study_group: 1,
        coordinate_gruppo : {
          lat: '',
          lng: '',
        },
        nome_gruppo: 'SE group for ECS',
        descrizione_gruppo: 'Study group of software engineering',
        indirizzo_gruppo: 'Via Scarpa 123, Roma',
        partecipanti:3,
        admin: false,
        member: false,
      },
      {

        id_study_group: 2,
        coordinate_gruppo : {
          lat: '',
          lng: '',
        },
         nome_gruppo: 'A group for SE',
        descrizione_gruppo: 'Software Engineering group for preparing written exam',
        indirizzo_gruppo: 'Via Roma 78, Roma',
        partecipanti:4,
        admin: false,
        member: false,
      }
     ],

     gruppiDaAggiungereCoordinate: [
       {
        lat: parseFloat(localStorage.getItem('lat')) - 0.002,
        lng: parseFloat(localStorage.getItem('lng')) + 0.002
       },
       {
        lat: parseFloat(localStorage.getItem('lat')) - 0.002,
        lng: parseFloat(localStorage.getItem('lng')) - 0.002
       }
     ],

     indexGroupToAdd: 0,


    notes:[
      {
        id: 0,
        title: "SE Notes",
        course: "SE",
        email: "danielebufalieritkd@gmail.com",
        tag: "#SE #IOT",
      },
      {
        id: 1,
        title: "HCI Notes",
        course: "HCI",
        email: "danielebufalieritkd@gmail.com",
        tag: "#HCI",
      },
    ],
    id_notes:2,
    indexLoggedUser:0,
    announcements:[
      {
        id: 0,
        email: "danielebufalieritkd@gmail.com",
        title: "For sale backpack",
        description: "1 years old backbard, red colour",
        tags: "#selling #backpack ",
      },
      {
        id: 1,
        email: "",
        title: "Tutoring for school children",
        description: "maths, english and science, 10 euros per hour",
        tags: "#tutor #maths #english #science ",        
      },
    ],
    id_announcements: 1,
  },
  getters: {
    getStazione: state=>{
      return state.stazione
    },
    getNomeStazione: state=>{
      return state.nomeStazione
    },
    getAgente: state =>{
      return state.agente
    },
    getLogged: state => {
      return state.logged
    },
    getStatoMenu: state => {
      return state.statomenu
    },
    getMenu: state => {
      return state.menuclicked
    },
    getToken : state => {
      return state.token
    },

    getType : state => {
      return state.type
    },
    getUsers : state => {
      return state.users
    },
    getPws : state => {
      return state.pws
    },
    getChosenCity : state => {
      return state.chosenCity
    },
    getChosenCityCoordinates : state => {
      return state.chosenCityCoordinates
    },
    getCoordinate_aule : state => {
      return state.coordinate_aule
    },
    getPrenotazioni_aule : state => {
      return state.prenotazioni_aule
    },
    getGLOBAL_COUNTER_AULE : state => {
      return state.GLOBAL_COUNTER_AULE;
    },
    getAule : state => {
      return state.aule;
    },
    getPrenotazione_dettagli : state => {
      return state.prenotazione_dettagli;
    },
    getMaxIdfromBookings : state => {

      let max_id = 0;
      
      for(let i=0;i<state.prenotazioni_aule.length;i++){
        if(state.prenotazioni_aule[i].id_prenotazione > max_id){
          max_id = state.prenotazioni_aule[i].id_prenotazione;
        }
      }

      return max_id;
    }

  },
  mutations: {
    setIndexLoggedUser: (state,val)=>
    {
      state.indexLoggedUser=val
    },
    setLogged: (state,val)=> {
      state.logged=val
    },
    setAgente: (state,val)=>
    {
      state.agente=val
    },
    setStazione: (state,val)=>
    {
      state.stazione=val
    },
    setNomeStazione: (state,val)=>
    {
      state.nomeStazione=val
    },

    setToken: (state, token)=> {
      state.token = token
    },

    setType: (state, type)=> {
      state.type = type
    },
    setMenu: (state, menu)=> {
      state.menuclicked = menu
    },
    setStatoMenu: (state, menu)=> {
      state.statomenu= menu
    },
    setChosenCity : (state, val)=> {
      state.chosenCity = val;
    },
    setChosenCityCoordinates : (state, val) => {
      state.chosenCityCoordinates = val;
    },
    setCoordinate_aule : (state, val) => {
      state.coordinate_aule = val;
    },
    aggiungiPrenotazione : (state, prenotazione) => {
      state.prenotazioni_aule.push(prenotazione);
    },
    setGLOBAL_COUNTER_AULE : (state, val) => {
      state.GLOBAL_COUNTER_AULE = val;
    },
    setAule : (state, val) => {
      state.aule = val;
    },
    levaUnPostoInAula : (state, info_aula) => {
      const nome_aula = info_aula.nome_aula;
      const day_details = info_aula.day_details;

      for(let i=0;i<state.aule.length;i++){
        if(state.aule[i].nome_aula == nome_aula){
          for(let j=0;j<state.aule[i].schedule.length;j++){
            if(state.aule[i].schedule[j].day == day_details){
              state.aule[i].schedule[j].curr_available_seats = state.aule[i].schedule[j].curr_available_seats - 1;
              break;
            }
          }
        }
      }
    },

    aggiungiUnPostoInAula : (state, info_aula) => {
      const nome_aula = info_aula.nome_aula;
      const day_details = info_aula.day_details;

      for(let i=0;i<state.aule.length;i++){
        if(state.aule[i].nome_aula == nome_aula){
          for(let j=0;j<state.aule[i].schedule.length;j++){
            if(state.aule[i].schedule[j].day == day_details){
              state.aule[i].schedule[j].curr_available_seats = state.aule[i].schedule[j].curr_available_seats + 1;
              break;
            }
          }
        }
      }
    },

    joinaGruppo : (state, group_id) => {

      const n = state.gruppi.length;

      for(let i=0;i<n;i++){
        if(state.gruppi[i].id_study_group == group_id){
          state.gruppi[i].partecipanti += 1;
          state.gruppi[i].member = true;

          state.my_groups.push(state.gruppi[i]);

          break;
        }
      }
    },

    abbandonaGruppo : (state, group_id) => {

      const n = state.gruppi.length;

      for(let i=0;i<n;i++){
        if(state.gruppi[i].id_study_group == group_id){
          state.gruppi[i].partecipanti -= 1;
          state.gruppi[i].member = false;
          state.gruppi[i].admin = false;
        }
      }

      for(let i=0;i<state.my_groups.length;i++){
        if(state.my_groups[i].id_study_group == group_id){
          state.my_groups.splice(i, 1);
          break;
        }
      }

    },

    creaGruppo : (state, gruppo) => {
      state.my_groups.push(gruppo);
    },

    eliminaGruppoDaiMieiGruppi : (state, group_id) => {
      let app = [];
      let app_m = [];
      let app_g = [];
      const n = state.my_groups.length;

      for(let i=0;i<n;i++){
        if(state.my_groups[i].id_study_group != group_id){
          app.push(state.my_groups[i])
        }
      }

      state.my_groups = [];
      state.my_groups = app;

      const nn = state.markers_gruppi.length;

      for(let i=0;i<nn;i++){
        if(state.markers_gruppi[i].id_study_group != group_id){
          app_m.push(state.markers_gruppi[i]);
        }
      }

      state.markers_gruppi = [];
      state.markers_gruppi = app_m;

      const nnn = state.gruppi.length;

      for(let i=0;i<nnn;i++){
        if(state.gruppi[i].id_study_group != group_id){
          app_g.push(state.gruppi[i])
        }
      }

      state.gruppi = [];
      state.gruppi = app_g;

      state.indexGroupToAdd -= 1;

    },

    setPrenotazione_dettagli : (state, val) => {
      state.prenotazione_dettagli = val;
    },

    setGruppoDettagli : (state, val) => {
      state.gruppoDettagli = val;
    }

  },
  actions: {
    
  },
  modules: {
  }
})
