import VueRouter from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Details from "./views/Details.vue";

const baseRoutes = [
	{ path: "/", component: Home },
	{ path: "/login", component: Login },
	{ path: "/profile", component: Profile },
	{ path: "/details", component: Details },
];

const routes = baseRoutes.concat([]);

const scrollBehavior = function (to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition;
	} else {
		return { x: 0, y: 0 };
	}
};

let router = new VueRouter({
	mode: "history",
	routes: routes,
	scrollBehavior,
});

router.beforeEach(async (to, from, next) => {
	if (!store.state.user && to.path != "/login") {
		next("/login");
	} else if (to.path == "/login" && store.state.user) {
		next("/");
	} else {
		next();
	}

	// if (to.path == "/login" && store.state.user) {
	// 	next("/");
	// } else if (to.path == "/login") {
	// 	next();
	// } else if (!store.state.user) {
	// 	next("/login");
	// } else if (store.state.user) {
	// 	next();
	// }
});

export default router;
