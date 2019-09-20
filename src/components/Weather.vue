<template>
<div>
    <v-layout align-center justify-center column fill-height  v-if="!show">
        <img src="@/assets/loading.png" class="loading" />
    </v-layout>
    <v-layout align-center justify-top column fill-height v-if="show">
        <transition-group class="items" name="items" tag="div">        
          <item
            v-for="(item, index) in items"
            :key="item.location.name + '_' + index"
            :class="getClass(getHumidex(item))"
            :item="item"
            :rank="index + 1"
            :getHumidex="getHumidex"
          />
        </transition-group>
    </v-layout>
</div>
</template>

<script>

// const apiUrl = 'http://localhost:3000/current'
const apiUrl = `http://api.weatherstack.com/current?access_key=${process.env.VUE_APP_API_KEY}&query=`
import axios from 'axios';
import Item from './Item.vue'

import { mapState } from 'vuex'
export default {
  data () {
    return {
      show: false,
      error: false
    } 
  },
  components: {
    Item
  },
  // computed: {
  //   sortHumidex() {
  //     return this.items.slice().sort((a,b) => {
  //       return this.getHumidex(b) - this.getHumidex(a) || b.current.temperature - a.current.temperature
  //     })
  //   }
  // },
  computed: mapState([
    'items'
  ]),
  methods: {
    getHumidex: (el) => {
      const e = 6.112 * Math.pow(10,(7.5*el.current.temperature/(237.7+el.current.temperature)))
      *(el.current.humidity/100)
      return Math.round(el.current.temperature + 5/9 * (e-10))
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
    }
  },
  created() {
    this.$store.dispatch('getData')
    this.show = true
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
