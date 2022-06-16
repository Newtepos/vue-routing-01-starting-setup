import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamFooter.vue';
import UsersFooter from './components/users/UserFooter.vue';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('User beforEnter');
        console.log(to, from);
        next();
      },
    },

    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    next();
  } else {
    next();
  }
});

router.afterEach(function (to, from) {
  //sending analytics data
  console.log('Global AfterEach');
  console.log(to, from);
});

const app = createApp(App);

app.use(router);

app.mount('#app');
