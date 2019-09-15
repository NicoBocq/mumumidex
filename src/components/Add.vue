<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-btn
        dark
        flat
        icon
        large
        @click.exact="setFocus()"
      >
      <font-awesome-icon icon="plus" />
      </v-btn>
    </template>
    <v-list light>
        <v-flex xs12>
          <v-text-field
            label="Saisissez une ville"
            v-model="newCity"
            @keyup.enter="addCity"
            flat
            solo
            text-center
            ref="newCity"
						persistent-hint
          >
          </v-text-field>
        </v-flex>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
 export default {
  data() {
    return {
      sheet: false,
      newCity:''
    }
  },
  methods: {
    setFocus() {
      this.$refs.newCity.$el.focus();
    },
    addCity: function(event) {
			this.$store.commit('add', event.target.value)
			this.sheet=false
      this.newCity=''
    }
  },
}
</script>