<template>
  <v-toolbar flat color="transparent">
    <v-toolbar-title>MumUMidex Challenge</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-btn icon large>
        <font-awesome-icon icon="plus" />
      </v-btn>
    </template>
    </v-bottom-sheet> -->
  </v-toolbar>
</template>
 
<script>
export default {
  data() {
    return {
      sheet: false,
    }
  }
}
</script>
<style>

h1 {
  font-size:1.6em;
  font-weight: 700;
  margin:1rem 0;
}

.text-shadow-drop-center {
	-webkit-animation: text-shadow-drop-center 0.6s both;
	animation: text-shadow-drop-center 0.6s both;
}

@-webkit-keyframes text-shadow-drop-center {
  0% {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  }
}
@keyframes text-shadow-drop-center {
  0% {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  }
}

</style>

