<template>
  <div>
    <div class="loading" v-if="show">
        <img src="@/assets/loading.png" />
    </div>
    <div class="box" v-if="!show">
      <div class="update">
        Mise à jour : {{ items[0].current.last_updated }}
      </div>
      <div class="items">                  
        <div
          v-for="(item, index) in orderedTemp"
          :key="index"
          :class="getClass(getHumidex(item.current))"
        >
          <div>
            {{index + 1}}
          </div>
          <div class="city">
            {{item.location.name}}
          </div>
          <div class="humidex">
            {{ getHumidex(item.current) }}
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
      show: false,
    } 
  },
  computed: {
    orderedTemp: function () {
      return _.orderBy(this.items, ['current.temp_c'], ['desc'])
    }
  },
  methods: {
    getHumidex: function (el) {
      const e = 6.112 * Math.pow(10,(7.5*el.temp_c/(237.7+el.temp_c)))*(el.humidity/100)
      return Math.round(el.temp_c + 5/9 * (e-10))
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

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.update {
  font-size:0.8;
  text-align: right;
  margin-bottom: 0.25rem;
}

.items {
  font-size:1.3em;
}

.items > div {
  margin-bottom:1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  border-radius: 0.2rem;
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

.un {
  background-color: dodgerblue;
}

.deux {
  background-color: lightseagreen;
}

.trois {
  background-color:orange;
}

.quatre {
  background-color: indianred;
}

.cinq {
  background-color: brown;
}

.loading {
   animation: rotation 1s infinite linear;
}

.loading img {
  width:50px;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}



</style>
