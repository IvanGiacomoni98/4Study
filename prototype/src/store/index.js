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
    }
  },
  actions: {
    
  },
  modules: {
  }
})
