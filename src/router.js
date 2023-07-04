import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue'
import MyTasks from './components/MyTasks.vue'
import AddTask from './components/AddTask.vue'
import Registration from './components/Registration.vue'


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/mytasks',
    component: MyTasks,
  },
  {
    path: '/addtask',
    component: AddTask,
  },
  {
    path: '/registration',
    component: Registration,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
