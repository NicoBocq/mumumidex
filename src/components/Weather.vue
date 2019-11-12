<template>
<div>
    <v-layout align-center justify-center column fill-height  v-if="!show">
        <img src="@/assets/loading.png" class="loading" />
    </v-layout>
    <v-layout align-center justify-top column fill-height v-if="show">
        <transition-group appear class="items" name="slide-in" tag="div">        
          <item
            v-for="(item, index) in sortedItems"
            :key="item.location.name + '_' + index"
            :item="item"
            :rank="index + 1"
          />
        </transition-group>
    </v-layout>
</div>
</template>

<script>
import Item from './Item.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      show: false
    } 
  },
  components: {
    Item
  },
  computed: {
    ...mapState(['items']),
    ...mapGetters(['sortedItems'])
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('getData')
    this.show = true
  }
}
</script>

<style>

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

</style>
