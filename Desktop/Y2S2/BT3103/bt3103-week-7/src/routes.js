import Orders from './components/Orders';
import PageContent from './components/PageContent';
import modify from './components/Modify';
import Dashboard from './components/Dashboard';

export default [
    {path: '/', name: 'home', component: PageContent},
    {path: '/orders', name: 'orders', component: Orders},
    {path: '/modify', name: 'modify', component: modify, props: true},
    {path: '/dashboard', name: 'dashboard', component: Dashboard}
]