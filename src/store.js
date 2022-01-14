import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
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
	},
});
