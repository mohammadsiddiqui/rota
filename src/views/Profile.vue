<template>
	<div>
		<v-toolbar flat class="mb-4 trans">
			<v-toolbar-title class="title"> User Settings </v-toolbar-title>
		</v-toolbar>

		<v-card v-if="$store.state.user" class="pa-4 d-flex flex-column justify-center align-center elevation-1">
			<v-avatar size="100">
				<v-img :src="$store.state.user.avatar_url"></v-img>
			</v-avatar>
			<div class="title mt-4">{{ $store.state.user.name }}</div>
			<div class="subtitle">{{ $store.state.user.email }}</div>
		</v-card>
		<div v-else class="pa-6 mt-10">Not Logged In</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped></style>
