import Vue from 'vue'
import VueRouter from 'vue-router'
import mainForm from "../components/mainForm"
import gameNight from "../components/gameNight"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "volleyball",
        component: mainForm
    },
    {
        path: "/volleyball",
        name: "volleyball",
        component: mainForm
    },
    {
        path: "/gamenight",
        name: "gamenight",
        component: gameNight
    }


]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router