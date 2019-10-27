<template>
    <div class="item">
      <div class="rank">
        {{rank}}
      </div>
      <div class="city">
        {{item.location.name}}
      </div>
      <div class="humidex">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{item.humidex}}</span>
          </template>
          <span>Mise à jour : {{ item.current.observation_time }}</span>
        </v-tooltip>
      </div>
      <div class="tempsuite">
        <div class="temp">
          <font-awesome-icon icon="thermometer-empty" />
          {{item.current.temperature}}°
        </div>
        <div class="humidity">
          <font-awesome-icon icon="tint" />
          {{item.current.humidity}}%
        </div>
      </div> 
      <div class="delete">
        <v-btn
          dark
          flat
          small
          icon
          @click=deleteCity
        >
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </div>
    </div>
</template>


<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Item',
  props: ['item','getHumidex','rank'],
  computed: mapGetters([ 'getStoreHumidex']),
  methods: {
    deleteCity: function () {
      this.$store.commit('remove', this.item.location.name)
      this.$store.dispatch('getData')
    }
  }
}
</script>   

<style scoped>
.items > div {
  margin-bottom:1rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr 0.5fr;
  align-items: center;
  border-radius: 0.3rem;
  color: #FFF;
  width: 100%;
}

.rank {
  text-align: center;
}

.city {
  text-align: left;
}

.data {
  padding: 0.5rem;
}

.tempsuite {
  text-align: left;
  font-size:0.9em;
}

.humidex {
  font-size:2em;
  font-weight:900;
  padding: 0.5rem;
  text-align: center;
}

.localtime {
  font-size:0.9rem;
}
</style>