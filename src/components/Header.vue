<template>
  <v-app-bar
    color="transparent"
    dense
    flat
  >
    <v-toolbar-title>
      MumUMidex Challenge
    </v-toolbar-title>
    <v-spacer />
    <Add />
  </v-app-bar>
</template>

<script>

import Add from './Add'

export default {
  components: {
    Add
  }
}
</script>

