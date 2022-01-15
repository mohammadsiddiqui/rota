<template>
	<div>
		<v-toolbar flat class="trans">
			<v-toolbar-title class="title"> Your ROTA </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon small depressed dark class="primary" to="/add">
				<v-icon> mdi-plus </v-icon>
			</v-btn>
		</v-toolbar>

		<v-card class="elevation-1">
			<v-toolbar dense flat outlined style="border-bottom: 0;">
				<v-btn fab text small color="grey darken-2" @click="prev">
					<v-icon> mdi-chevron-left </v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-toolbar-title class="title">
					{{ value | MONTH }}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn fab text small color="grey darken-2" @click="next">
					<v-icon> mdi-chevron-right </v-icon>
				</v-btn>
			</v-toolbar>

			<v-sheet height="250">
				<v-calendar ref="calendar" v-model="value" color="primary" type="month" @click:day="viewDay" @change="updateRange">
					<template v-slot:day-label="{ month, day, date }">
						<div class="fill-height">
							<div v-if="currMonth == month">
								<v-btn icon small dark class="success text-weight-bold" v-if="hours[date]">{{ day }}</v-btn>
								<v-btn icon small text v-else>{{ day }}</v-btn>
							</div>
						</div>
					</template>
				</v-calendar>
			</v-sheet>
		</v-card>

		<Shiftlist :monthly="monthly" :key="currMonth" />
	</div>
</template>

<script>
import Shiftlist from "../components/Shiftlist.vue";
export default {
	components: {
		Shiftlist,
	},
	data: () => ({
		value: new Date(),
		currMonth: 0,
		hours: {},
		monthly: {},
	}),
	methods: {
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},

		viewDay({ date, month }) {
			if (month != this.currMonth) return false;
			this.$router.push(`/add?date=${date}`);
		},

		async updateRange({ start, end }) {
			this.$load(true);
			console.log("Month Changed");
			this.currMonth = start.month;
			let data = await this.$store.dispatch("getData", {
				start: start.date,
				end: end.date,
			});
			this.hours = data.hours;
			this.monthly = Object.assign(data);
			this.$load(false);
		},
	},
	mounted() {
		this.$refs.calendar.checkChange();
	},
};
</script>

<style scoped></style>
