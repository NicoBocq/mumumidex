<template>
  <v-toolbar flat color="transparent">
    <transition name="fade">
      <v-toolbar-title>
        MumUMidex Challenge
      </v-toolbar-title>
    </transition>
    <v-spacer></v-spacer>
      <Add />
  </v-toolbar>
</template>
 
<script>

import Add from './Add'

export default {
    components: {
    Add
  }
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

