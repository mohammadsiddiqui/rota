<template>
	<div>
		<div class="mx-auto my-14 text-center" style="max-width: 300px;">
			<div class="text-center title mb-10">Sign in with Google</div>
			<v-img src="/login.png" class="p" @click="login"></v-img>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		user: window.USER,
	}),
	methods: {
		async login() {
			const { error } = await this.$supabase.auth.signIn({ provider: "google" });
			if (error) throw error;
		},
	},
};
</script>

<style scoped></style>
