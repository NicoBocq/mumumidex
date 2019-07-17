<template>
  <v-container fluid>
      <h1 class="fade-in">
        MumUMidex Challenge
      </h1>
    <v-layout align-center justify-center column fill-height  v-if="!show">
        <img src="@/assets/loading.png" class="loading" />
    </v-layout>
    <v-layout align-center justify-top column fill-height v-if="show">
      <div class="update">
        Mise à jour : {{ items[0].current.last_updated }}
      </div>
        <div class="items">            
          <div
            v-for="(item, index) in sortHumidex"
            :key="index"
            :class="getClass(getHumidex(item))"
          >
            <div>
              {{ index + 1 }}
            </div>
            <div class="city">
              {{item.location.name}}
            </div>
            <div class="humidex">
              {{ getHumidex(item) }}
            </div>
            <div class="tempsuite">
              <div class="temp">
                <font-awesome-icon icon="thermometer-empty" />
                {{item.current.temp_c}}°
              </div>
              <div class="humidity">
                <font-awesome-icon icon="tint" />
                {{item.current.humidity}}%
              </div>
            </div> 
          </div>
        </div>      
    </v-layout>
  </v-container>
</template>

<script>

const cities = ['Marseille',
'Valence',
'Paris',
'Montpellier',
'Miami',
'San Francisco',
'Lyon'];

// const apiUrl = 'http://localhost:3000/current'
const apiUrl = `https://api.apixu.com/v1/current.json?key=${process.env.VUE_APP_API_KEY}&q=`
import axios from 'axios';

export default {
  data () {
    return {
      items:[],
      show: false,
    } 
  },
  computed: {
    sortHumidex() {
      return this.items.slice().sort((a,b) => {
        return this.getHumidex(b) - this.getHumidex(a) || b.current.temp_c - a.current.temp_c
      })
    }
  },
  methods: {
    getHumidex: (el) => {
      const e = 6.112 * Math.pow(10,(7.5*el.current.temp_c/(237.7+el.current.temp_c)))
      *(el.current.humidity/100)
      return Math.round(el.current.temp_c + 5/9 * (e-10))
    },
    getClass: (e) => {
      if (e <= 29 )
        return 'bg-1'
      else if (e > 29 && e <= 39)
        return 'bg-2'
      else if (e > 39 && e <= 45)
        return 'bg-3'
      else if (e > 45 && e <= 54)
        return 'bg-4'
      else
        return 'bg-5' 
    },
  //   ranking: () => {
  //     return this.items.sort((a,b) => a.current.temp_c === b.current.temp_c ? a.name.localeCompare(b.name) : b.current.temp_c - a.current.temp_c)
  // .map(x => { x.position = this.items.findIndex(y => y.current.temp_c === x.current.temp_c) + 1; return x;})
  //   }
  },
  mounted: function () {
    const promises = [];

    cities.forEach(function(element){
      const myUrl = apiUrl+element;
      promises.push(axios.get(myUrl))
    });
    let self = this;

    axios
      .all(promises)
      .then(axios.spread((...responses) => {
        responses.forEach(res => self.items.push(res.data))
        // self.items = responses.data
        // // response => (this.items = response.data)
        self.show = true
    }));
  }
}
</script>

<style scoped>

h1 {
  margin: 1rem 0;
  font-size:2.1rem;
  text-align: center;
}

.update {
  font-size:0.8;
  text-align: right;
  margin-bottom: 0.25rem;
}

.items {
  font-size:1.3rem;
}

.items > div {
  margin-bottom:1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  border-radius: 0.3rem;
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

.loading {
   animation: rotation 1s infinite linear;
}


@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.flip-list-move {
  transition: transform 1s;
}

.fade-in {
	-webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}



</style>
