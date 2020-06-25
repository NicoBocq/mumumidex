<template>
    <v-layout align-center justify-center column fill-height v-if="!show">
      <img src="@/assets/loading.png" class="loading" />
    </v-layout>
    <transition-group appear name="slide-in" tag="div" v-else class="items">
      <item
        v-for="(item, index) in sortedItems"
        :key="item.location.name + '_' + index"
        :item="item"
        :rank="index + 1"
      />
    </transition-group>
</template>

<script>
import Item from './Item.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'List',
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

.items {
  margin: 0 auto;
  max-width: 600px;
  min-width: 350px;
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

</style>
