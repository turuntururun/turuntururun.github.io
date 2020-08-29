import Clock from "@/components/Clock";
import Home from "@/components/Home";
import Login from "@/components/Login";

export const routes = [
    {path: '', component: Home},
    {path: '/login', component: Login},
    {path: '/clock', component: Clock},
]
