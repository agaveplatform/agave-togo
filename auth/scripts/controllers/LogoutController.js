angular.module('AgaveAuth').controller('LogoutController', function ($injector, $timeout, $rootScope, $scope, $state, moment, $location, settings, $localStorage, AccessToken, TenantsController, Commons, Alerts) {

    // clean up the previous login and tenant info, forcing a refresh.
    $rootScope.$broadcast('oauth:logout', $localStorage.token);

    delete $localStorage.token;
    delete $localStorage.client;
    delete $localStorage.tenant;
    delete $localStorage.activeProfile;

    $state.go("oauth-default");

});
