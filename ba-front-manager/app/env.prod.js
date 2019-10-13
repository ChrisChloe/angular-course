angular
    .module('managerApp')
    .constant('env', {
        apiUrl: 'https://gateway-manager.buscaaereo.com.br/manager',
        apiAuthUrl: 'https://gateway-manager.buscaaereo.com.br/',
        apiFinUrl: 'https://gateway-manager.buscaaereo.com.br/financeiro_new',
        apiVisionUrl: 'https://gateway-manager.buscaaereo.com.br/vision',
        apiMonitorUrl: 'https://api-monitor.mangue3.com/',
        auth:{
            clientId: '15',
            clientSecret: '9kaIVxGicvsbiQl7YZ34rXex9fGocGH3ASrdfuRv'
        }
    });
