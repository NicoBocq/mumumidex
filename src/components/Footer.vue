
<template>
	<v-footer class="pa-3" color="transparent">
			<div v-for="(item, index) in $store.getters.cities" :key="index">
				<span @click.exact="deleteVille">{{ item }}</span>
			</div>
			<v-spacer></v-spacer>
			<div>
        <v-btn
          dark
          flat
          small
          icon
          @click=clear()
        >
          <font-awesome-icon icon="eraser" />
        </v-btn>
      </div>
      <div> 
				<!-- {{ new Date().getFullYear() }} -->
				<a href="https://github.com/NicoBocq" target="_blank" color="white">
					@NicoBocq
				</a>
			</div>
	</v-footer>
</template>
<script>
export default {
	// props: ['getData'],
	methods: {
		clear () {
			localStorage.clear()
		},
    deleteVille: function(event) {
      this.$store.commit('remove', event.target.value)
    }
	},
}
</script>

<style scoped>

</style>
