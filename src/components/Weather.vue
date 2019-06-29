<template>
  <div class="box" v-if="show">
    <!-- <h1>{{ items.location.name }}</h1> -->
     <!-- <p>{{ items.current.feelslike_c }}</p>
     <p>{{ items.current.last_updated }}</p>
      -->
      <table>
              <caption>MumUMidex Challenge</caption>

        <tr
          v-for="(item, index) in orderedTemp"
          :key="index"
        >
        <td>
          {{index + 1}}
        </td>
        <td>
          {{item.location.name}}
        </td>
        <td>
          {{item.current.feelslike_c}} ({{item.current.temp_c}})
        </td>  
        <!-- <td>
          <span class="updated">{{item.current.last_updated}}</span>
        </td> -->
        </tr>
      </table>
      
  </div>
</template>

<script>

const cities = ['Marseille',
'Valence',
'Paris',
'Montpellier',
'Miami',
'San Francisco',
'Lyon',
'Le Castellet'];
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
    }
  },
  mounted () {
  //   function getApi() {
  //     cities.forEach(function(element) {
  //       return axios.get(apiUrl + cities[element]);
  //   });
  //   this.items = getApi();
  //   }
  // }
  // axios.all([getApi()])
  //   .then(axios.spread(function (acct, perms) {
  //     // response => (this.items = response.data)
  //   }));

    const promises = [];
    var myUrl;

    cities.forEach(function(element){
      myUrl = apiUrl+element;
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
    // axios.all(promises).then(function(results) {
    //     results.forEach(function(response) {
    //         mainObject[response.identifier] = response.data;
    //     })
    // });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
}
table {
  background-color:#fff;
  padding: 2rem;
  color: indianred;
}
caption {
  background:#FFF;
  font-size:2rem;
  color: indianred;
  font-weight: 900;
  padding: 0.5rem 0;
}
td {
    padding:1rem;
      font-size:2em;
}

span.updated {
  font-size:0.5em;
  }
@media (max-width:600px) {
  table {
    margin: O auto;
  }
  caption {
    font-size:1.1em;
  }
  td {
    font-size:1em;
    padding:0.5rem;
  }
}
</style>
