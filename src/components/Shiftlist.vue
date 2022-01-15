<template>
	<div>
		<v-card rounded flat class="elevation-1 my-3">
			<div class="d-flex justify-space-between align-center px-3 pt-3">
				<div class="title">Your Earnings</div>
				<div class="title">£{{ monthly.total }}</div>
			</div>
			<div class="d-flex grey--text justify-space-between align-center px-3 mb-3">
				<div class="body-2">Post Tax (approx)</div>
				<div class="body-2" v-if="min">£{{ min }} - £{{ max }} *</div>
			</div>

			<v-divider></v-divider>
			<v-list two-line dense v-if="monthly">
				<v-list-item v-if="monthly.items && monthly.items.length == 0">
					<v-list-item-content>
						<v-list-item-subtitle>
							No shifts found for this month!
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<template v-for="(item, i) in monthly.items">
					<v-list-item :key="item.id">
						<v-list-item-avatar>
							<v-icon color="primary">mdi-clock</v-icon>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ item.date | DATE }}</v-list-item-title>
							<v-list-item-subtitle>
								<span>Rate: {{ item.rate }}</span>
								<span v-if="item.note">| {{ item.note }}</span>
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-avatar @click="goTo(item)">
							<v-avatar class="green white--text" size="36">
								<span class="font-weight-bold subtitle-2">{{ item.hours }}</span>
							</v-avatar>
						</v-list-item-avatar>
					</v-list-item>

					<v-divider v-if="i < monthly.items.length - 1" :key="item.created_at"></v-divider>
				</template>
			</v-list>
		</v-card>
	</div>
</template>

<script>
export default {
	props: {
		monthly: {
			type: Object,
			default: {},
		},
	},

	computed: {
		max() {
			if (this.monthly && this.monthly.total) {
				return parseFloat(0.87 * parseFloat(this.monthly.total)).toFixed(2);
			}
			return 0;
		},
		min() {
			if (this.monthly && this.monthly.total) {
				return parseFloat(0.77 * parseFloat(this.monthly.total)).toFixed(2);
			}
			return 0;
		},
	},
	methods: {
		goTo(item) {
			this.$router.push(`/add?date=${item.date}`);
		},
	},
};
</script>

<style scoped></style>
