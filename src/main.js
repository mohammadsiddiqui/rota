import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";

import VueSupabase from "vue-supabase";
Vue.use(VueSupabase, {
	supabaseUrl: "https://pxpnekoihntgvdpuqfqf.supabase.co",
	supabaseKey:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTY3MjUwLCJleHAiOjE5NTc3NDMyNTB9.L4YJUww4uXodBjf6QIyStV3b5oWITrae6ddqJnQcwyc",
	supabaseOptions: {},
});

import VueRouter from "vue-router";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
Vue.use(VueRouter);

import dayjs from "dayjs";

Vue.filter("MONTH", (val) => {
	if (val) return dayjs(val).format("MMM, YYYY");
	return "";
});

Vue.filter("DATE", (val) => {
	if (val) return dayjs(val).format("DD MMM, YYYY - dddd");
	return "";
});

Vue.prototype.$day = dayjs;

Vue.prototype.$notify = function (text, color = "green", time = 5000, show = true) {
	store.dispatch("setData", { message: { text, color, show, time } });
};

let app = null;
Vue.$supabase.auth.onAuthStateChange((_, session) => {
	storeUser(session ? session.user : null);
	mountApp();
});

if (!Vue.$supabase.auth.user()) {
	//check if it has access token
	let hash = location.hash ? location.hash.substring(1) : "";
	let access_token = "";
	hash.split("&").forEach((item) => {
		if (item.split("=")[0] == "access_token") access_token = decodeURIComponent(item.split("=")[1]);
	});

	if (!access_token) mountApp();
	else getUserByHash(access_token);
}

async function getUserByHash(token) {
	const { user } = await Vue.$supabase.auth.api.getUser(token);
	storeUser(user);
	mountApp();
}

async function storeUser(user) {
	if (!user) return false;
	const userData = { ...user.user_metadata, id: user.id };
	store.dispatch("setData", { user: userData });
}

async function mountApp() {
	if (app) app.$destroy();
	if (store.state.user) await store.dispatch("getSettings");

	app = new Vue({
		vuetify,
		router,
		store,
		render: (h) => h(App),
	}).$mount("#app");
}
