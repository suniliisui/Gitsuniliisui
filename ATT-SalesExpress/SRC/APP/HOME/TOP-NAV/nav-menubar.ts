export default {
  'navMenubarmodel': [
    {
      'label': 'Accounts',
      'id': 'menuAccounts',
      'routerLinkActive': 'active',
      'routerLink': '/accounts',
      'menuItems': []
    },
    {
      'label': 'Prepare',
      'id': 'menuPrepare',
      'menuItems': [{
        'label': 'Opportunities',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/opportunities',
        'id': 'prepare-opportunities'
      },
      {
        'label': 'Leads',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/leads',
        'id': 'prepare-leads'
      },
      {
        'label': 'Qualifications',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/qualifications',
        'id': 'prepare-qualifications'
      },
      {
        'label': 'FiberLit Buildings',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/fiberlit-buildings',
        'id': 'prepare-fiberlit-buildings'
      },
      {
        'label': 'Locations',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/locations',
        'id': 'prepare-locations'
      },
      {
        'label': 'GeoLink',
        'routerLinkActive': 'active',
        'routerLink': '/prepare/geolink',
        'id': 'prepare-geoLink'
      }]
    },
    {
      'label': 'Sell',
      'id': 'menuSell',
      'menuItems': [{
        'label': 'Solutions',
        'routerLinkActive': 'active',
        'routerLink': '/sell/solutions',
        'id': 'develop-ultimate-prospector'
      },
      {
        'label': 'SOA/GO Forms',
        'routerLinkActive': 'active',
        'routerLink': '/sell/soa',
        'id': 'sell-soa'
      },
      {
        'label': 'Product List',
        'routerLinkActive': 'active',
        'routerLink': '/sell/products',
        'id': 'sell-products'
      }]
    },
    {
      'label': 'Support',
      'id': 'menuSupport',
      'menuItems': [{
        'label': 'Orders (status)',
        'routerLinkActive': 'active',
        'routerLink': '/support/orders',
        'id': 'support-orders'
      },
      {
        'label': 'Notifications',
        'routerLinkActive': 'active',
        'routerLink': '/support/notifications',
        'id': 'support-notifications'
      },
      {
        'label': 'Links',
        'routerLinkActive': 'active',
        'routerLink': '/support/links',
        'id': 'support-links'
      }]
    }
  ],
  'userProfileMenumodel': [
    {
      'label': 'Profile',
      'routerLinkActive': 'active',
      'routerLink': '/user/profile',
      'id': 'profile-profile'
    },
    {
      'label': 'Comp',
      'routerLinkActive': 'active',
      'routerLink': '/user/compensation',
      'id': 'profile-compensation'
    },
    {
      'label': 'My SIPs',
      'routerLinkActive': 'active',
      'routerLink': '/user/mysips',
      'id': 'profile-mysips'
    },
    {
      'label': 'Communities',
      'routerLinkActive': 'active',
      'routerLink': '/user/communities',
      'id': 'profile-communities'
    },
    {
      'label': 'Following',
      'routerLinkActive': 'active',
      'routerLink': '/user/following',
      'id': 'profile-following'
    },
    {
      'label': 'People',
      'routerLinkActive': 'active',
      'routerLink': '/user/people',
      'id': 'profile-people'
    }
  ],
} 
