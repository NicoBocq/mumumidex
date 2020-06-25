<template>
  <div>
    <v-btn
      icon
      @click="dialog = !dialog"
      large
    >
      <font-awesome-icon icon="plus" />
    </v-btn>

    <v-dialog
      light
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
          <v-text-field
            label="Ajoutez une nouvelle ville"
            v-model="newCity"
            @keyup.enter="addCity"
            autofocus
            solo
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="addCity">
            Validez
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
 export default {
  name: 'Add',
  data() {
    return {
      dialog: false,
      newCity:''
    }
  },
  methods: {
    addCity() {
      this.$store.commit('add', this.newCity)
      this.newCity=''
			this.dialog=false
      this.$store.dispatch('getData')
    }
  }
}
</script>