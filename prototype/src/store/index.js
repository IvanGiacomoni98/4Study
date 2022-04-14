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

    studyRoomPrenotata : false,
    coordinate_aule : [],
    study_rooms_names : ['Aula 108 Edificio Marco Polo', 'Aula 31 SPV', 'Aula B2 DIAG'],
    study_rooms_addresses : ['Viale Dello Scalo di San Lorenzo 82', 'Via Eudossiana 18', 'Via Ariosto 25'],
    schedules: [
      [
        {
          day: 'Monday',
          daily_schedule: '8:00am - 18:00pm',
          curr_available_seates: 12,
        },
        {
          day: 'Tuesday',
          daily_schedule: '8:00am - 19:00pm',
          curr_available_seates: 3,
        },
        {
          day: 'Wednesday',
          daily_schedule: '8:30am - 18:00pm',
          curr_available_seates: 0,
        },
        {
          day: 'Thursday',
          daily_schedule: '8:30am - 18:30pm',
          curr_available_seates: 1,
        },
        {
          day: 'Friday',
          daily_schedule: '8:30am - 18:30pm',
          curr_available_seates: 5,
        },
        {
          day: 'Saturday',
          daily_schedule: '9:00am - 17:00pm',
          curr_available_seates: 32,
        },
        {
          day: 'Sunday',
          daily_schedule: 'closed',
          curr_available_seates: '--',
        }
      ],
      
      [
        {
          day: 'Monday',
          daily_schedule: '9:00am - 18:00pm',
          curr_available_seates: 12,
        },
        {
          day: 'Tuesday',
          daily_schedule: '9:00am - 19:00pm',
          curr_available_seates: 3,
        },
        {
          day: 'Wednesday',
          daily_schedule: '9:00am - 18:00pm',
          curr_available_seates: 0,
        },
        {
          day: 'Thursday',
          daily_schedule: '8:30am - 18:30pm',
          curr_available_seates: 1,
        },
        {
          day: 'Friday',
          daily_schedule: '9:0am - 18:30pm',
          curr_available_seates: 5,
        },
        {
          day: 'Saturday',
          daily_schedule: '9:00am - 17:00pm',
          curr_available_seates: 32,
        },
        {
          day: 'Sunday',
          daily_schedule: 'closed',
          curr_available_seates: '--',
        }
      ],

      [
        {
          day: 'Monday',
          daily_schedule: '8:00am - 18:00pm',
          curr_available_seates: 12,
        },
        {
          day: 'Tuesday',
          daily_schedule: '8:00am - 19:00pm',
          curr_available_seates: 3,
        },
        {
          day: 'Wednesday',
          daily_schedule: '8:30am - 18:00pm',
          curr_available_seates: 0,
        },
        {
          day: 'Thursday',
          daily_schedule: '8:30am - 18:30pm',
          curr_available_seates: 1,
        },
        {
          day: 'Friday',
          daily_schedule: '8:00am - 18:30pm',
          curr_available_seates: 5,
        },
        {
          day: 'Saturday',
          daily_schedule: 'closed',
          curr_available_seates: '--',
        },
        {
          day: 'Sunday',
          daily_schedule: 'closed',
          curr_available_seates: '--',
        }
      ]
    
    
    ],

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
    getStudy_rooms_names : state => {
      return state.study_rooms_names
    },
    getStudy_rooms_addresses : state => {
      return state.study_rooms_addresses
    },
    getSchedules : state => {
      return state.schedules
    },
    getStudyRoomPrenotata : state => {
      return state.studyRoomPrenotata
    },
    getCoordinate_aule : state => {
      return state.coordinate_aule
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
    setStudy_rooms_names : (state, val) => {
      state.study_rooms_names = val;
    },
    setStudy_rooms_addresses : (state, val) => {
      state.study_rooms_addresses = val;
    },
    setSchedules : (state, val) => {
      state.schedules = val;
    },
    setStudyRoomPrenotata : (state, val) => {
      state.studyRoomPrenotata = val;
    },
    setCoordinate_aule : (state, val) => {
      state.coordinate_aule = val;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
