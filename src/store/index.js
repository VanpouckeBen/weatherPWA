import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const apiKey = `appid=10a396fb7dd1458e8f5b1b818982b9c9` ;
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?`
export default new Vuex.Store({
  state: {
    weater : null
  },
  getters: {
    getWeater: state => state.weater
  },
  mutations: {
    setWeater(state, data){
      state.weater = data;
    }
  },
  actions: {
    GetWeather: async function (store, coords) {
      
      const request = await fetch(`${baseUrl}lat=${coords.latitude}&lon=${coords.longitude}&units=metric&${apiKey}&cnt=8&lang=nl`)
          const data = await request.json();
          
          store.commit('setWeater', data);
    },
  }
  
})
