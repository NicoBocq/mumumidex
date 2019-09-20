import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiUrl = `http://api.weatherstack.com/current?access_key=${process.env.VUE_APP_API_KEY}&query=`

const cities = ['Marseille',
'Valence',
'Paris',
'Montpellier',
'Miami',
'San Francisco',
'Lyon'];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cities');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cities', serializedState);
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
}

export const store = new Vuex.Store({
  state: {
    cities: loadState() || cities,
    items: []
  },
  actions: {
    getData ({ commit }) {
      const promises = [];

      this.state.cities.forEach(function(element){
        const myUrl = apiUrl+element;
        promises.push(axios.get(myUrl))
      });

      axios
        .all(promises)
        // .then(axios.spread((...responses) => {
        //   // responses.forEach(res => self.items.push(res.data))
        //   responses.map(res => res.data)
        // }))
        .then(axios.spread((...responses) => {
          commit('SET_ITEMS', responses.map(res => res.data))
        }))
        .catch(error => console.log(error));
    }
  },
  mutations: {
    SET_ITEMS (state, items) {
      state.items = items
    },
    add (state, city) {
			if (!city || cities.includes(city)) {
        return
      }
			state.cities.push(city)
			saveState(state.cities)
		},
    remove (state, city) {
			state.cities.splice(state.cities.indexOf(city), 1)
			saveState(state.cities)
    },
    // getHumidex (item) {
    //   const e = 6.112 * Math.pow(10,(7.5*item.current.temperature/(237.7+item.current.temperature)))
    //   *(item.current.humidity/100)
    //   return Math.round(item.current.temperature + 5/9 * (e-10))
    // }
  },
  getters: {
    cities: state => state.cities,
    sorted_items(state) {
      return state.items.slice().sort((a,b) => {
        // return this.getHumidex(b) - this.getHumidex(a) || b.current.temperature - a.current.temperature
        return b.current.temperature - a.current.temperature || b.current.humidity - a.current.humidity
      })
    }
  }
})