<template>
	<div>
		<v-toolbar flat class="trans">
			<v-toolbar-title class="title"> User Settings </v-toolbar-title>
		</v-toolbar>

		<v-card v-if="$store.state.user" class="pa-4 d-flex flex-column justify-center align-center elevation-1">
			<v-avatar size="100">
				<v-img :src="$store.state.user.avatar_url"></v-img>
			</v-avatar>
			<div class="title mt-4">{{ $store.state.user.name }}</div>
			<div class="subtitle">{{ $store.state.user.email }}</div>
		</v-card>
		<div v-else class="pa-6">Not Logged In</div>

		<v-card class="elevation-1 my-6" v-if="setting">
			<v-subheader>Default Settings</v-subheader>
			<v-card-text class="pt-0">
				<v-text-field v-model="setting.rate" label="Hourly Rate" type="number"></v-text-field>
				<v-text-field v-model="setting.start_time" label="Rota Start Time" type="time"></v-text-field>
				<v-text-field v-model="setting.end_time" label="Rota End Time" type="time"></v-text-field>
				<v-text-field v-model="setting.break" label="Break (Hrs)" type="number"></v-text-field>

				<v-text-field v-model="setting.month_start_day" label="Month Start Day" type="number"></v-text-field>
				<v-text-field v-model="setting.month_end_day" label="Month End Day" type="number"></v-text-field>
				<v-text-field v-model="setting.pay_day" label="Pay Day" type="number"></v-text-field>

				<v-btn class="px-16 mt-6" :loading="loading" color="primary" dark @click="save">Save</v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			setting: null,
			days: [],
			loading: false,
		};
	},

	methods: {
		async save() {
			console.log(this.setting);
			if (!this.setting.id) this.create();

			this.loading = true;
			try {
				const { error } = await this.$supabase.from("settings").update(this.setting).eq("id", this.setting.id);
				if (!error) {
					await this.getData();
					this.$notify("Data saved successfully!");
				} else this.$notify("Error occured!", "error");
			} catch (error) {
				console.log(error);
				this.$notify("Error occured!", "error");
			}

			this.loading = false;
		},

		async create() {
			this.loading = true;
			try {
				const { error } = await this.$supabase.from("settings").insert([this.setting]);
				if (!error) {
					this.$notify("Data saved successfully!");
					await this.getData();
				}
			} catch (error) {
				console.log(error);
				this.$notify("Error occured!", "error");
			}
			this.loading = false;
		},

		async getData(lazy) {
			if (!this.$store.state.user) return false;

			let data = null;

			if (lazy && this.$store.state.setting) {
				data = this.$store.state.setting;
			} else {
				await this.$store.dispatch("getSettings");
				data = this.$store.state.setting;
			}

			if (data) {
				this.setting = {
					user_id: this.$store.state.user.id,
					rate: 9.5,
					start_time: "08:00",
					end_time: "20:00",
					break: 1,
					month_start_day: 1,
					month_end_day: 31,
					pay_day: 31,
				};
			} else {
				this.setting = data;
			}
		},
	},

	created() {
		for (let i = 1; i <= 31; i++) {
			this.days.push(i);
		}
		this.days.sort();
		this.getData(true);
	},
};
</script>

<style scoped></style>
