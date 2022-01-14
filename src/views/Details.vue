<template>
	<div>
		<!-- <v-toolbar flat class="  trans">
			<v-toolbar-title class="title"> Monthly Overview </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-slot:extension>

      </template>
		</v-toolbar> -->
		<v-toolbar class="elevation-2" style="position: fixed; left: 0; right: 0; top: 56px; z-index: 9;">
			<v-tabs v-model="tab" center-active grow :show-arrows="false">
				<v-tab v-for="item in items" :key="item" @click="showItem(item)">
					{{ item | MONTH }}
				</v-tab>
			</v-tabs>
		</v-toolbar>
		<div style="height: 56px;"></div>
		<v-toolbar rounded class="mb-4 elevation-1">
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
								<!-- <v-list-item-subtitle class="text--primary"></v-list-item-subtitle> -->
								<v-list-item-subtitle>Some Note</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action>
								<v-list-item-action-text>
									<v-btn text color="primary">
										<span class="text-font-bold">{{ item }}</span>
										<v-icon right> mdi-clock </v-icon>
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
import dayjs from "dayjs";
export default {
	data() {
		return {
			tab: null,
			value: null,
			items: [],
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
		};
	},
	methods: {
		showItem(date) {
			console.log("Month Changed to ", date);
			this.value = date;
			this.setIndex();
		},

		setIndex() {
			this.tab = this.items.findIndex((x) => x == this.value);
		},
	},
	created() {
		this.value = dayjs().date(1).format("YYYY-MM-DD");

		let next = this.value;
		for (let i = -6; i < 6; i++) {
			if (i > 0) next = dayjs(next).add(1, "month").format("YYYY-MM-DD");
			else if (i < 0) next = dayjs(next).subtract(1, "month").format("YYYY-MM-DD");
			else next = this.value;
			this.items.push(next);
		}

		this.items.sort();
		this.tab = this.items.findIndex((x) => x == this.value);
		// this.items = ['2022-01-01', '2022-01-01','2022-01-01','2022-01-01','2022-01-01','2022-01-01','2022-01-01',]
	},
};
</script>
