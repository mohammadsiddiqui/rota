<template>
	<v-app-bar app color="primary" fixed dark class="elevation-2">
		<v-app-bar-nav-icon></v-app-bar-nav-icon>
		<v-toolbar-title class="font-weight-bold" @click="$router.push('/')">ROTA</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon @click="logout" v-if="$store.state.user">
			<v-icon>mdi-logout</v-icon>
		</v-btn>
		<v-btn text to="/login" v-else>
			Login
			<v-icon right>mdi-login</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: "Navbar",
	data: () => ({}),
	methods: {
		async logout() {
			const { error } = await this.$supabase.auth.signOut();
			if (error) return console.log(error);
			this.$store.dispatch("setData", { user: null });
			this.$router.push("/login");
		},
	},
};
</script>
