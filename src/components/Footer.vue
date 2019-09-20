
<template>
	<v-footer class="pa-3" color="transparent">
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
	methods: {
		clear () {
			localStorage.clear()
		}
	},
}
</script>

<style scoped>

</style>
