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
        <button @click="getApi()">Refresh</button>
      </div>
        <div class="items">            
          <item
            v-for="(item, index) in sortHumidex"
            :key="index"
            :class="getClass(getHumidex(item))"
            :item="item"
            :rank="index + 1"
            :getHumidex="getHumidex"
          />
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
import Item from './Item.vue'

export default {
  data () {
    return {
      items:[],
      show: false,
    } 
  },
  components: {
    Item
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
    getApi: function () {
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
      }))
        .catch(error => console.log(error));
    },
    intervalGetApi: function () {
      setInterval(() => {    
          this.getApi()
          }, 1000);
      }
  },
  mounted() {
    this.getApi()
    this.show = true
    // this.intervalGetApi() 
  },
  beforeDestroy() {
    clearInterval(this.intervalFetchData())
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
