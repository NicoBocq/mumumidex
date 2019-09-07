<template>
<div>
    <v-layout align-center justify-center column fill-height  v-if="!show">
        <img src="@/assets/loading.png" class="loading" />
    </v-layout>
    <v-layout align-center justify-top column fill-height v-if="show">
      <!--<div class="update">
         <input v-model="newCity" @keyup.enter="addCity">
        <br />
        <button @click="getApi()">
          <font-awesome-icon icon="sync" />
        </button>
      </div> -->
        <div class="items">            
          <item
            v-for="(item, index) in sortHumidex"
            :key="item.location.name + '_' + index"
            :class="getClass(getHumidex(item))"
            :item="item"
            :rank="index + 1"
            :getHumidex="getHumidex"
          />
        </div>
<template>
  
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator>
        <v-btn
          dark
          flat
        >
        <font-awesome-icon icon="plus" />
          <!-- <v-icon large>
            fas fa-plus
          </v-icon> -->
        </v-btn>
      </template>
      <v-list light>
          <v-flex xs12>

            <span v-if="error">NON</span>
            <v-text-field
              label="Solo"
              placeholder="Saisissez une ville"
              solo
              v-model="newCity"
              @keyup.enter="addCity"
              flat
              text-center
            >
            </v-text-field>
          </v-flex>
      </v-list>
    </v-bottom-sheet>
</template>
    </v-layout>
</div>
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
      cities: cities,
      newCity:'',
      sheet: false,
      error: false
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
    addCity() {
      if (this.newCity.trim().length == 0) {
        return
      }
      // if (this.cities.includes(this.newCity)) {
      //   this.error = true
      //   this.newCity =''
      // }
      this.cities.push(this.newCity)
      this.newCity = ''
      this.persist()
      this.getApi()
    },
    persist() {
      const parsed = JSON.stringify(this.cities);
      localStorage.setItem('cities', parsed);
    },
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

      this.cities.forEach(function(element){
        const myUrl = apiUrl+element;
        promises.push(axios.get(myUrl))
      });
      let self = this;

      axios
        .all(promises)
        .then(axios.spread((...responses) => {
          // responses.forEach(res => self.items.push(res.data))
          self.items = responses.map(res => res.data)
      }))
        .catch(error => console.log(error));
    },
    intervalGetApi: () => {
      setInterval(() => {    
          this.getApi()
          }, 1000);
      }
  },
  mounted() {
    if (localStorage.getItem('cities')) {
      try {
        this.cities = JSON.parse(localStorage.getItem('cities'));
      } catch(e) {
        localStorage.removeItem('cities');
      }
    }
  },
  created() {
    this.getApi()
    this.show = true
    // this.intervalGetApi() 
  },
  beforeDestroy() {
    clearInterval(this.intervalFetchData)
  }
}
</script>

<style scoped>

.update {
  font-size:0.8;
  text-align: center;
  margin-bottom: 0.25rem;
}

.items {
  font-size:1.3rem;
  margin:1rem 0;
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
