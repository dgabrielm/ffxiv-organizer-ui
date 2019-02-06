angular.module('appConfig', [])

    .constant('INVENTORIES_CONFIG', {
        location: 'http://127.0.0.1',
        port: '5678'
    })

    .constant('ITEMS_CONFIG', {
        location: 'http://127.0.0.1',
        port: '6789'
    })

    .constant('LISTS_CONFIG', {
        location: 'http://127.0.0.1',
        port: '8765'
    })

    .constant('USERS_CONFIG', {
        location: 'http://127.0.0.1',
        port: '9876'
    })
    