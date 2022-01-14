<template>
	<v-app>
		<Navbar />
		<v-main class="grey lighten-5">
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>
		<v-bottom-navigation v-model="value" grow>
			<v-btn value="home">
				<span>Home</span>
				<v-icon>mdi-home</v-icon>
			</v-btn>

			<v-btn value="favorites">
				<span>Favorites</span>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn value="nearby">
				<span>Nearby</span>
				<v-icon>mdi-map-marker</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
	name: "App",
	components: { Navbar },
	data: () => ({
		value: "home",
	}),
};
</script>

<style>
.p {
	cursor: pointer;
}
</style>
