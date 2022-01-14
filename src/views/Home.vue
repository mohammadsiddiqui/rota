<template>
	<div>
		<h1 class="mb-10">Home Page</h1>
		<v-card v-if="$store.state.user" flat class="pa-6 d-flex flex-column justify-center align-center">
			<v-avatar size="100">
				<v-img :src="$store.state.user.avatar_url"></v-img>
			</v-avatar>
			<div class="title mt-6">{{ $store.state.user.name }}</div>
			<div class="subtitle">{{ $store.state.user.email }}</div>
		</v-card>
		<div v-else class="pa-6 mt-10">Not Logged In</div>
	</div>
</template>

<script>
export default {
	data: () => ({}),
};
</script>

<style scoped></style>
