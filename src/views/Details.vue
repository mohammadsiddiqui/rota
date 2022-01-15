<template>
	<div>
		<v-toolbar class="elevation-2" style="position: fixed; left: 0; right: 0; top: 56px; z-index: 9;">
			<v-tabs v-model="tab" center-active grow :show-arrows="false">
				<v-tab v-for="item in items" :key="item" @click="showItem(item)">
					{{ item | MONTH }}
				</v-tab>
			</v-tabs>
		</v-toolbar>
		<div style="height: 56px;"></div>

		<Shiftlist :monthly="monthly" :key="currMonth" />
	</div>
</template>

<script>
import Shiftlist from "../components/Shiftlist.vue";

export default {
	components: {
		Shiftlist,
	},
	data() {
		return {
			tab: null,
			date: null,
			items: [],
			monthly: {},
			currMonth: 0,
		};
	},
	methods: {
		showItem(date) {
			if (this.date == date) return false;
			this.date = date;
			this.load();
		},

		setIndex() {
			this.currMonth = this.$day(this.date).format("MM");
			this.tab = this.items.findIndex((x) => x == this.date);
		},

		setItems() {
			this.date = this.$day().date(1).format("YYYY-MM-DD");
			let next = this.date;
			for (let i = -9; i < 3; i++) {
				if (i > 0) next = this.$day(next).add(1, "month").format("YYYY-MM-DD");
				else if (i < 0) next = this.$day(next).subtract(1, "month").format("YYYY-MM-DD");
				else next = this.date;
				this.items.push(next);
			}
			this.items.sort();

			this.load();
		},

		async load() {
			this.$load(true);
			this.setIndex();

			let start = this.date;
			let end = this.$day(start).endOf("month").format("YYYY-MM-DD");
			console.log("load data for date", start, end);

			let data = await this.$store.dispatch("getData", {
				start: start,
				end: end,
			});

			console.log(data);

			this.monthly = Object.assign(data);
			this.$load(false);
		},
	},
	created() {
		this.setItems();
	},
};
</script>
