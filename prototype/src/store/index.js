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
    towns:["Rome","Terracina"],
    univerisities:["Sapienza","Sapienza"],
    pws:["daniele98","4study98."],

    chosenCity: "",
    chosenCityCoordinates: { lat: 0.0, lng: 0.0 },

    coordinate_aule : [],

    aule : [],

    prenotazioni_aule: [],

    prenotazione_dettagli : {},

    GLOBAL_COUNTER_AULE: 0,

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

    setPrenotazione_dettagli : (state, val) => {
      state.prenotazione_dettagli = val;
    }

  },
  actions: {
    
  },
  modules: {
  }
})
