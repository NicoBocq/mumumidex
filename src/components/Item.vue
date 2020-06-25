<template>
  <v-card
    class="item mx-auto rounded-lg"
    :style="itemStyle"
    :color="color"
    tile
    dark
  >
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
        small
        icon
        @click=deleteCity
      >
        <font-awesome-icon icon="trash-alt" />
      </v-btn>
    </div>
  </v-card>
</template>


<script>

export default {
  name: 'Item',
  props: ['item','rank'],
  computed: {
    itemStyle() {
      return {
        '--i': this.rank
      }
    },
    color() {
      if (this.item.humidex <= 29 ) {
        return 'light-blue darken-1'
      } else if (this.item.humidex <= 39) {
        return 'light-green'
      } else if (this.item.humidex <= 45) {
        return 'orange'
      } else if (this.item.humidex <= 54) {
        return 'orange darken-4'
      } else {
        return 'red darken-4'
      }
    }
  },
  methods: {
    deleteCity() {
      this.$store.commit('remove', this.item.location.name)
      this.$store.dispatch('getData')
    }
  }
}
</script>

<style scoped>

.item {
  font-size: 1.1rem;
  margin-bottom:1rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr 0.5fr;
  align-items: center;
  color: #FFF;
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

.slide-in-enter {
  opacity: 0;
  transform: scale(.5);
}

.slide-in-enter-active {
  transition: all .4s ease;
  transition-delay: calc(.1s * var(--i));
}

/* .bg-1 {
  background-color: dodgerblue;
}

.bg-2 {
  background-color: lightseagreen;
}

.bg-3 {
  background-color:orange;
}

.bg-4 {
  background-color: indianred;
}

.bg-5 {
  background-color: brown;
} */
</style>