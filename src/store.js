import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		message: {
			show: false,
			text: "",
			color: "success",
			time: 5000,
		},
		setting: null,
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
	},
});
