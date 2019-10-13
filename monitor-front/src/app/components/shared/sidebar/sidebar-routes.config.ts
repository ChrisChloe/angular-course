export const ROUTES = [
    { path: '/home/dashboard', id: 'dashboard', title: 'Dashboard', icon: 'fa fa-tachometer', children: null},
    { path: '/home/dashboard-crm', id: 'dashboard-crm', title: 'Painel CRM', icon: 'fa fa-tachometer', children: null},

    { id: 'users', title: 'Usuários', icon: 'fa fa-users', subMenuOpen: false, children: [
        {path: '/home/logged-users', id: 'logged', title: 'Logados', icon: 'fa fa-sign-in'},
        
    ]},
    
    { path: '/home/late-ops', id: 'late-ops', title: 'OPs Atrasadas', icon: 'fa fa-clock-o', children: null},
    
    { path: '/home/issues', id: 'issues', title: 'Problemas', icon: 'fa fa-bug', children: null},
    

];
