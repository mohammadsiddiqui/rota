import VueRouter from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

const baseRoutes = [
	{ path: "/", component: Home },
	{ path: "/login", component: Login },
];

const routes = baseRoutes.concat([]);
let router = new VueRouter({
	mode: "history",
	routes: routes,
});

// router.beforeEach(async (to, from, next) => {
// 	if (to.path == "/login" && store.state.user) {
// 		next("/");
// 	} else if (to.path == "/login") {
// 		next();
// 	} else if (to.path.includes("/admin") && !store.state.user.admin) {
// 		next("/");
// 	} else if (store.state.user) {
// 		next();
// 	} else {
// 		window.redirect = to.path;
// 		next("/login");
// 	}
// });

export default router;