angular.module('appConfig', [])

    .constant('INVENTORIES_CONFIG', {
        location: 'http://192.168.0.4',
        port: '5678'
    })

    .constant('ITEMS_CONFIG', {
        location: 'http://192.168.0.4',
        port: '6789'
    })

    .constant('LISTS_CONFIG', {
        location: 'http://192.168.0.4',
        port: '8765'
    })

    .constant('USERS_CONFIG', {
        location: 'http://192.168.0.4',
        port: '9876'
    })
    