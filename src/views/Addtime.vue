<template>
	<div>
		<v-toolbar flat class="trans">
			<v-toolbar-title class="title">Maintain Shift Details </v-toolbar-title>
		</v-toolbar>

		<v-card class="elevation-1" v-if="item">
			<v-subheader> Shift Date</v-subheader>
			<v-card-text class="py-0">
				<Datepicker v-model="item.date" label="Date" @input="load"></Datepicker>
			</v-card-text>

			<v-subheader> Shift Details</v-subheader>
			<v-card-text class="py-0">
				<v-text-field v-model="item.start_time" label="Shift Start Time" type="time"></v-text-field>
				<v-text-field v-model="item.end_time" label="Shift End Time" type="time"></v-text-field>
				<v-text-field v-model="item.break" label="Break (Hrs)" type="number"></v-text-field>
			</v-card-text>

			<v-toolbar flat dense @click="show = !show">
				<v-subheader class="pl-0">Additional Details</v-subheader>
				<v-spacer></v-spacer>
				<v-btn fab text small color="grey darken-2">
					<v-icon v-if="show"> mdi-chevron-up </v-icon>
					<v-icon v-else> mdi-chevron-down </v-icon>
				</v-btn>
			</v-toolbar>
			<v-card-text class="py-0" v-if="show">
				<v-text-field v-model="item.rate" label="Hourly Rate" type="number"></v-text-field>
				<v-text-field v-model="item.multi" label="Rate Multiplier" type="number"></v-text-field>
			</v-card-text>
			<v-card-text class="py-0" v-if="!show"> Hourly Rate: {{ item.rate }} | Rate Multiplier : {{ item.multi }} </v-card-text>

			<v-card-text class="mt-5">
				<v-btn class="px-10" :loading="loading" color="primary" dark @click="save">
					{{ item.id ? "Update Shift" : "Add Shift" }}
				</v-btn>

				<v-btn text class="ml-4" @click="goBack">Cancel</v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import Datepicker from "../components/Datepicker.vue";
export default {
	components: {
		Datepicker,
	},
	data: () => ({
		loading: false,
		item: null,
		show: false,
	}),

	methods: {
		goBack() {
			this.$router.go(-1);
		},
		async update() {
			this.loading = true;
			try {
				let { error } = await this.$supabase.from("timesheets").update(this.item).eq("id", this.item.id);
				if (error) throw Error("Unable to save, try again later!");
				this.$notify("Data Updated!");
				this.goBack();
			} catch (error) {
				console.log(error);
				this.$notify(error.message, "error");
			}
			this.loading = false;
		},
		async create() {
			this.loading = true;
			try {
				let { error } = await this.$supabase.from("timesheets").insert([this.item]);
				if (error) throw Error("Unable to save, try again later!");
				this.$notify("Data Updated!");
				this.goBack();
			} catch (error) {
				console.log(error);
				this.$notify(error.message, "error");
			}
			this.loading = false;
		},
		async save() {
			//calculate hours and amount;
			this.item.date = this.$day(this.item.date).format("YYYY-MM-DD");
			let start = this.$day(this.item.date + this.item.start_time);
			let end = this.$day(this.item.date + this.item.end_time);

			this.item.hours = end.diff(start, "hour", true) - parseFloat(this.item.break);
			this.item.multi = parseFloat(this.item.multi);
			this.item.rate = parseFloat(this.item.rate);

			this.item.amount = this.item.hours * this.item.multi * this.item.rate;

			this.item.id ? this.update() : this.create();
		},
		async load(d) {
			this.loading = true;
			let def = this.$store.state.setting;
			let user = this.$store.state.user;
			let date = this.$day(d).format("YYYY-MM-DD");

			let { data } = await this.$supabase.from("timesheets").select("*").eq("date", date);

			if (data && data.length > 0) {
				this.item = data[0];
			} else {
				this.item = {
					// hours: 11,
					// amount: 121.44,
					multi: 1,
					user_id: user.id,
					date: date,
					start_time: def.start_time,
					end_time: def.end_time,
					break: def.break,
					rate: def.rate,
				};
			}

			this.loading = false;
		},
	},
	created() {
		this.load(this.$route.query.date);
	},
};
</script>

<style scoped></style>
