import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
		cities: loadState() || [],
  },
  mutations: {
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