import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Customers',
    url: '/customers',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Products',
    url: '/product',
    iconComponent: { name: 'cil-bookmark' }
  },
  {
    name: 'Orders',
    url: '/order',
    iconComponent: { name: 'cil-basket' }
  }
];
