<template>
    <div class="item" :style="itemStyle" :class="itemClass">
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

export default {
  name: 'Item',
  props: ['item','rank'],
  computed: {
    itemStyle() {
      return {
        '--i': this.rank
      }
    },
    itemClass() {
        if (this.item.humidex <= 29 ) {
          return 'bg-1'
        } else if (this.item.humidex <= 39) {
          return 'bg-2'
        } else if (this.item.humidex <= 45) {
          return 'bg-3'
        } else if (this.item.humidex <= 54) {
          return 'bg-4'
        } else {
          return 'bg-5'
        }
    }
  },
  methods: {
    deleteCity: function () {
      this.$store.commit('remove', this.item.location.name)
      this.$store.dispatch('getData')
    }
  }
}
</script>   

<style scoped>

.item {
  font-size: 1.3rem;
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

.slide-in-enter {
  opacity: 0;
  transform: scale(.5);
}

.slide-in-enter-active {
  transition: all .4s ease;
  transition-delay: calc(.1s * var(--i));
}

.bg-1 {
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
}
</style>