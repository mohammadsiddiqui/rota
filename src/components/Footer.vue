<template>
	<v-bottom-navigation class="primary" fixed app dark grow>
		<v-btn to="/">
			<span>Home</span>
			<v-icon>mdi-home</v-icon>
		</v-btn>

		<v-btn to="/details">
			<span>Details</span>
			<v-icon>mdi-calendar-clock</v-icon>
		</v-btn>

		<v-btn to="/profile">
			<span>Settings</span>
			<v-icon>mdi-cog</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {};
</script>

<style scoped></style>
