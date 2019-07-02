<template>
  <div class="box" v-if="show">
    <!-- <h1>{{ items.location.name }}</h1> -->
     <!-- <p>{{ items.current.feelslike_c }}</p>
     <p>{{ items.current.last_updated }}</p>
      -->
    

    <div class="items">
      <h1>MumUMidex Challenge</h1>
      <div
        v-for="(item, index) in orderedTemp"
        :key="index"
        :class="getClass(getHumidex(item))"
      >
        <div>
          {{index + 1}}
        </div>
        <div class="city">
          {{item.location.name}}
        </div>
        <div class="temp">
          <div class="humidex">
            {{ getHumidex(item) }}
          </div>
          <div class="tempsuite">
            T : {{item.current.temp_c}} / H : {{item.current.humidity}}
          </div> 
      </div>
      </div>
  </div>
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
const apiUrl = "https://api.apixu.com/v1/current.json?key=166fba8a30324b87be8203006192606&q="

import axios from 'axios';
import lodash from 'lodash';

export default {
  data () {
    return {
      items:[],
      show: false
    } 
  },
  computed: {
    orderedTemp: function () {
      return _.orderBy(this.items, ['current.feelslike_c', 'current.temp_c'], ['desc', 'desc'])
    },
  },
  methods: {
    getHumidex: function (el) {
      const e = 6.112 * Math.pow(10,(7.5*el.current.temp_c/(237.7+el.current.temp_c)))*(el.current.humidity/100)
      return Math.round(el.current.temp_c + 5/9 * (e-10))
    },
    getClass: function(e) {
      if (e <= 29 )
        return 'un'
      else if (e > 29 && e <= 39)
        return 'deux'
      else if (e > 40 && e <= 45)
        return 'trois'
      else if (e > 45 && e <= 54)
        return 'quatre'
      else
        return 'cinq' 
    }
  },
  mounted: function () {
    const promises = [];

    cities.forEach(function(element){
      const myUrl = apiUrl+element;
      promises.push(axios.get(myUrl))
    });``
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size:1.4em;
  font-weight: 700;
  margin-top:0;
}

.items {
  background: rgba(0, 0, 0, 0.6);
  padding:2rem;
  
  font-size:1.3em;
}

.items > div {
  margin-bottom:1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  border-radius: 0.2rem;
}

.city {
  text-align: left;
}

.temp {
  padding: 0.5rem;
}

.tempsuite {
  font-size:0.7em;
}

.humidex {
  font-size:2em;
  font-weight:900;
}

.un {
  background-color: dodgerblue;
}

.deux {
  background-color: lightseagreen;
}

.trois {
  background-color: sandybrown;
}

.quatre {
  background-color: indianred;
}

.cinq {
  background-color: brown;
}

</style>
