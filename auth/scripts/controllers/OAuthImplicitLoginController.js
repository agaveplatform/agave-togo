angular.module('AgaveAuth').controller('OAuthImplicitLoginController', function ($rootScope, $scope, $state, $stateParams, $http, $window, $localStorage, $filter, $timeout, settings, Commons, Alerts, TokensController, ProfilesController, APIHelper, Configuration) {

  $scope.getTenantByCode = function (tenantId) {
    var namedTenant = false;
    angular.forEach($scope.tenants, function (tenant, key) {
      if (tenant.code === tenantId) {
        namedTenant = tenant;
        return false;
      }
    });

    if (namedTenant) {
      return namedTenant;
    } else {
      return {};
    }
  };

  $scope.excludeSelectedTenant = function (selectedTenant) {
    return function(tenant) {
      return tenant.code !== selectedTenant.code;
    };
  };

  $scope.setCurrentTenant = function (tenant) {
    $scope.selectedTenant = tenant;

    $rootScope.$broadcast('oauth:template:update', 'views/templates/oauth-ng-button.html');

  };

  $scope.isDevEnvironment = function () {
    return true;
    // return settings.environment == 'development' || settings.environemnt == 'devel' || settings.environment == 'dev';
  };

  $scope.settings = settings;
  $scope.tenants = settings.tenants;

  $scope.remember = true;

  var currentTenantId = '';
  if ($stateParams.tenantId) {
    currentTenantId = $stateParams.tenantId;
  }
  else if ($localStorage.tenant && $localStorage.tenant.code) {
    currentTenantId =  $localStorage.tenant.code;
  }
  else if ($scope.tenants.length) {
    currentTenantId =  $scope.tenants[0].code;
  }

  $scope.selectedTenant = $scope.getTenantByCode(currentTenantId);
  if (!_.isEmpty($scope.selectedTenant)) {
    $localStorage.tenant = $scope.selectedTenant;
  }

  $scope.user = ($localStorage.client && angular.copy($localStorage.client)) || {
    username: '',
    password: '',
    client_key: '',
    client_secret: '',
    remember: 0
  };

  $scope.$watch('settings.tenants', function(){
    $timeout(function () {
      if ($rootScope.settings.tenants.length) {
        $scope.tenants = $rootScope.settings.tenants;

        if (currentTenantId === '') {
          currentTenantId = $scope.tenants[0].code;
        }

        // update the selected tenant if now present
        $scope.selectedTenant = $scope.getTenantByCode(currentTenantId);
        if (!_.isEmpty($scope.selectedTenant)) {
          $localStorage.tenant = $scope.selectedTenant;
        }
      }
    }, 0);
  }, true);

  // show content on state change success
  $scope.$on('$stateChangeSuccess', function () {
    jQuery('.content.hide, .copyright.hide').removeClass('hide'); // show content area
  });

  // show content on state change success
  $scope.$on('$stateChangeError', function () {
    jQuery('.content.hide, .copyright.hide').removeClass('hide'); // show content area
  });

  // show content on state change success
  $scope.$on('$stateNotFound', function () {
    jQuery('.content.hide, .copyright.hide').removeClass('hide'); // show content area
  });
});