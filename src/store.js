import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		loading: false,
		message: {
			show: false,
			text: "",
			color: "success",
			time: 5000,
		},
		setting: null,
		months: {},
	},
	mutations: {
		SET_DATA(state, { key, value }) {
			state[key] = value;
		},
	},
	actions: {
		setData({ commit }, data) {
			for (const key in data) {
				if (Object.hasOwnProperty.call(data, key)) {
					const value = data[key];
					commit("SET_DATA", { key, value });
				}
			}
		},

		async getSettings({ commit }) {
			try {
				let { data } = await this._vm.$supabase.from("settings").select("*").range(0, 1);
				if (data && data.length > 0) {
					commit("SET_DATA", { key: "setting", value: data[0] });
				}
			} catch (error) {
				console.log(error);
			}
		},

		async getData({ commit, state }, prop) {
			if (!prop) return {};
			const { date, force } = prop;

			const start = this._vm.$day(date).startOf("month").format("YYYY-MM-DD");
			const end = this._vm.$day(date).endOf("month").format("YYYY-MM-DD");

			let currMonth = this._vm.$day(start).format("YYYY-MM");
			let months = Object.assign(state.months);
			if (!force && months[currMonth]) return months[currMonth];

			months[currMonth] = {
				hours: {},
				items: [],
				total: 0,
				hrs: 0,
				date: start,
			};

			try {
				let { data } = await this._vm.$supabase.from("timesheets").select("*").gte("date", start).lte("date", end).order("date");

				if (data && data.length > 0) {
					for (let i = 0; i < data.length; i++) {
						const el = data[i];
						let hr = months[currMonth].hours[el.date];
						if (!hr) hr = 0;
						months[currMonth].hours[el.date] = hr + el.hours;

						let total = parseFloat(months[currMonth].total) + parseFloat(el.amount);
						months[currMonth].total = parseFloat(total).toFixed(2);

						let hrs = parseFloat(months[currMonth].hrs) + parseFloat(el.hours);
						months[currMonth].hrs = parseFloat(hrs).toFixed(2);
						months[currMonth].items.push(el);
					}

					commit("SET_DATA", { key: "months", value: months });
					return months[currMonth];
				}
				return months[currMonth];
			} catch (error) {
				console.log(error);
				return months[currMonth];
			}
		},
	},
});
