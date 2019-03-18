angular.module('appConfig', [])

    .constant('INVENTORIES_CONFIG', {
        location: 'http://localhost',
        port: '5678'
    })

    .constant('ITEMS_CONFIG', {
        location: 'http://localhost',
        port: '6789'
    })

    .constant('LISTS_CONFIG', {
        location: 'http://localhost',
        port: '8765'
    })

    .constant('USERS_CONFIG', {
        location: 'http://localhost',
        port: '9876'
    })
    