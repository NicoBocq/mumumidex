<template>
  <div>
      <v-btn
        icon
        fab
        flat
        large
        color="yellow accent-3"
        @click="dialog = !dialog"
      >
        <font-awesome-icon icon="plus" />
      </v-btn>

      <v-dialog light v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-text-field
              label="Saisissez une ville"
              v-model="newCity"
              @keyup.enter="addCity"
              flat
              ref="newCity"
              autofocus
            >
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>


<script>
 export default {
  data() {
    return {
      dialog: false,
      newCity:''
    }
  },
  methods: {
    addCity: function(event) {
      this.$store.commit('add', event.target.value)
      this.newCity=''
			this.dialog=false
      this.$store.dispatch('getData')
    }
  }
}
</script>