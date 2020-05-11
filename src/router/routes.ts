import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/upload-file',
    component: () => import('components/DashboardLayout.vue'),
    children: [
      { 
        path: '/upload-file',
        component: () => import('components/UploadFile.vue'),
        props: true
      },
      {
        path:'prize-lists',
        component: () => import('components/PrizeList.vue'),
        props: true
      },
      {
        path:'orders',
        component: () => import('components/Orders.vue'),
        props: true
      },
    ]
  },
  {
    path: '/sign-up',
    component: () => import('components/Account/SignUp.vue')
  },
  {
    path: '/sign-in',
    component: () => import('components/Account/SignIn.vue')
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('components/Error404.vue')
  });
}

export default routes;
