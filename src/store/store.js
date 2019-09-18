import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiUrl = `http://api.weatherstack.com/current?access_key=${process.env.VUE_APP_API_KEY}&query=`

let cities = ['Marseille',
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
        .then(axios.spread((...responses) => {
          responses.map(res => res.data)
        }))
        .then(items => {
          commit('SET_ITEMS', items)
        })
        .catch(error => console.log(error));
    }
  },
  mutations: {
    SET_ITEMS (state, items) {
      state.items = items
    },
    add(state, city) {
			if (!city || cities.includes(city)) {
        return
      }
			state.cities.push(city)
			saveState(state.cities)
		},
    remove(state, city) {
			state.cities.splice(state.cities.indexOf(city), 1)
			saveState(state.cities)
    }
  },
  getters: {
    cities: state => state.cities
  }
})