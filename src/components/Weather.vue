<template>
<div>
    <v-layout align-center justify-center column fill-height  v-if="!show">
        <img src="@/assets/loading.png" class="loading" />
    </v-layout>
    <v-layout align-center justify-top column fill-height v-if="show">
        <transition-group class="items" name="items" tag="div">        
          <item
            v-for="(item, index) in sortHumidex"
            :key="item.location.name + '_' + index"
            :class="getClass(getHumidex(item))"
            :item="item"
            :rank="index + 1"
            :getHumidex="getHumidex"
            :removeCity="removeCity"
            :index="index"
            :cities="cities"
          />
        </transition-group>
<template>
  
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator>
        <v-btn
          dark
          flat
          icon
          large
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
              ref="newCity"
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
      if (!this.newCity) {
        return
      }
      // if (this.cities.includes(this.newCity)) {
      //   this.error = true
      //   this.newCity =''
      // }
      this.cities.push(this.newCity)
      this.newCity = ''
      this.saveCities()
      this.getData()
      this.sheet = false
    },
    removeCity(x) {
      this.cities.splice(x, 1)
      this.saveCities()
      this.getData()
    },
    saveCities() {
      const parsed = JSON.stringify(this.cities);
      localStorage.setItem('cities', parsed);
    },
    setFocus() {
      this.$refs.addCity.focus();
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
    getData: function () {
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
    intervalgetData: () => {
      setInterval(() => {    
          this.getData()
          }, 1000);
      }
  },
  created() {
    if (localStorage.getItem('cities')) {
      try {
        this.cities = JSON.parse(localStorage.getItem('cities'));
      } catch(e) {
        localStorage.removeItem('cities');
      }
    }
    this.getData()
    this.show = true
    // this.intervalGetApi() 
  },
  beforeDestroy() {
    clearInterval(this.intervalFetchData)
  }
}
</script>

<style>

.items-enter-active,
.items-leave-active,
.items-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.items-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.items-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.items-leave-active {
  position: absolute;
}

.items-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

.items {
  font-size:1.3rem;
  margin:1rem auto;
  position: relative;
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
