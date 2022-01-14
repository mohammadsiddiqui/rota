<template>
	<v-app>
		<Navbar />
		<v-main class="grey lighten-5">
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>
		<Footer />
	</v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
	name: "App",
	components: { Navbar, Footer },
};
</script>

<style>
.p {
	cursor: pointer;
}

.trans {
	background: transparent !important;
}

.v-slide-group__prev--disabled,
.v-slide-group__next--disabled {
	display: none !important;
}
</style>
