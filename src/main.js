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

Vue.$supabase.auth.onAuthStateChange((event, session) => {
	console.log(event);
	if (session && session.user && session.user.user_metadata) {
		store.dispatch("setData", { user: session.user.user_metadata });
	}
	mountAPP();
});

if (!Vue.$supabase.auth.session()) mountAPP();

function mountAPP() {
	new Vue({
		vuetify,
		router,
		store,
		render: (h) => h(App),
	}).$mount("#app");
}
