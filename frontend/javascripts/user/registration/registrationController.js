(function() {
    'use strict';

    var app = require('../../app/app');

    app.controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = [
        '$location',
        '$route',
        'UserHttpService'
    ];

    function RegistrationController(userHttpService) {
        var vm = this;

        vm.user = {};

        vm.register = register;

        function register(user) {
            if (!user.firstName || !user.lastName || !user.email || !user.password) {
                alertify.error('Some fields are empty');
                return;
            }
            userHttpService.registerUser(user, function(data) {
                $location.url('/');
                $route.reload();
            }, function(err) {
                var errMsg = 'Failed register user';
                if (err.data === 'User with current email doesn\'t exist') errMsg = err.data;
                alertify.error(errMsg);
            });
        }
    }
})();
