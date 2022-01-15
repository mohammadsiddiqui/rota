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

		<v-toolbar rounded class="my-4 elevation-1">
			<v-toolbar-title class="title"> Your Earnings </v-toolbar-title>
			<v-btn small text class="">{{ value | MONTH }}</v-btn>
			<v-spacer></v-spacer>
			<v-btn text depressed>
				£1999.00
			</v-btn>
		</v-toolbar>

		<v-card flat>
			<v-list two-line>
				<v-list-item-group multiple>
					<template v-for="(item, index) in hours">
						<v-list-item :key="index">
							<v-list-item-content>
								<v-list-item-title>{{ index | DATE }}</v-list-item-title>
								<v-list-item-subtitle>Some Note</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action>
								<v-list-item-action-text>
									<v-btn text color="primary">
										<span class="text-font-bold">{{ item }}</span>
										<v-icon> mdi-clock </v-icon>
									</v-btn>
								</v-list-item-action-text>
							</v-list-item-action>
						</v-list-item>

						<v-divider :key="index + 'D'"></v-divider>
					</template>
				</v-list-item-group>
			</v-list>
		</v-card>
	</div>
</template>

<script>
export default {
	data: () => ({
		value: new Date(),
		currMonth: 0,

		weekday: [0, 1, 2, 3, 4, 5, 6],
		events: [],
		hours: {
			"2021-12-31": 11,
			"2022-01-16": 11,
			"2022-01-15": 11,
			"2022-01-08": 11,
			"2022-01-07": 11,
			"2022-01-06": 11,
			"2022-01-05": 11,
			"2022-01-04": 11,
			"2022-01-03": 11,
			"2022-01-02": 11,
			"2022-01-01": 11,
			"2022-02-01": 11,
		},
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

		updateRange({ start, end }) {
			console.log("Month Changed");
			this.currMonth = start.month;
		},

		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		},

		getVal(past, date) {
			console.log(past, date);
			if (past) return "";

			return this.hours[date] ? this.hours[date] : "";
		},
		getEvents() {},
	},
	mounted() {
		this.$refs.calendar.checkChange();
	},
};
</script>

<style scoped></style>
