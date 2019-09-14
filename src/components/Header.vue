<template>
  <v-toolbar flat color="transparent">
    <transition name="fade">
      <v-toolbar-title>
        MumUMidex Challenge
      </v-toolbar-title>
    </transition>
    <v-spacer></v-spacer>
    
    <!-- <template>
      <v-bottom-sheet v-model="sheet">
        <template v-slot:activator>
          <v-btn
            dark
            flat
            icon
            large
            @click="setFocus()"
          >
          <font-awesome-icon icon="plus" />
          </v-btn>
        </template>
        <v-list light>
            <v-flex xs12>
              <v-text-field
                placeholder="Saisissez une ville"
                v-model="newCity"
                @keyup.enter="addCity"
                flat
                solo
                text-center
                ref="newCity"
              >
              </v-text-field>
            </v-flex>
        </v-list>
      </v-bottom-sheet>
    </template> -->
  </v-toolbar>
</template>
 
<script>
export default {
  data() {
    return {
      sheet: false,
    }
  },
  methods: {
    setFocus() {
      this.$refs.newCity.$el.focus();
    }
  },
}
</script>
<style scoped>

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 2s;
}

</style>

