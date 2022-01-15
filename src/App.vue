<template>
	<v-app>
		<Navbar />
		<v-main class="grey lighten-5">
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>
		<Footer />

		<v-dialog v-model="loading" width="100" persistent>
			<v-btn class="elevation-0" x-large loading>Loading...</v-btn>
		</v-dialog>

		<v-snackbar v-model="message.show" :color="message.color" :timeout="message.time" bottom>
			<div class="d-flex">
				<v-icon class="mr-2">{{ message.color == "error" ? "mdi-alert-circle" : "mdi-check-circle" }}</v-icon>
				<span v-html="message.text" class="center"></span>
			</div>
			<template v-slot:action="{ attrs }">
				<v-btn color="black" text v-bind="attrs" @click="message.show = false">Close</v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { mapState } from "vuex";

export default {
	name: "App",
	components: { Navbar, Footer },
	computed: {
		...mapState(["message", "loading"]),
	},
};
</script>

<style>
.p {
	cursor: pointer;
}

.trans {
	background: transparent !important;
}

.v-snack--top {
	top: 56px !important;
}
.v-snack--bottom {
	bottom: 56px !important;
}

.v-slide-group__prev--disabled,
.v-slide-group__next--disabled {
	display: none !important;
}

.theme--dark.v-btn--active:before,
.theme--dark.v-btn--active:hover:before {
	opacity: 0 !important;
}
</style>
