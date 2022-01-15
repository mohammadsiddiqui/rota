<template>
	<v-bottom-navigation class="primary" fixed app dark grow height="56">
		<v-btn to="/">
			<span class="pt-1">Home</span>
			<v-icon>mdi-home</v-icon>
		</v-btn>

		<v-btn to="/details">
			<span class="pt-1">Details</span>
			<v-icon>mdi-calendar-clock</v-icon>
		</v-btn>

		<v-btn to="/add">
			<span class="pt-1">Add Shift</span>
			<v-icon>mdi-plus-box</v-icon>
		</v-btn>

		<v-btn to="/profile">
			<span class="pt-1">Settings</span>
			<v-icon>mdi-cog</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {};
</script>
