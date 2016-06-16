// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
        // el state 'tabs' no va a poder existir por sí solo, ya que es de tipo abstracto.
        // esto nos va a permitir que no exista una vista solo con un 'tabs' y no sin una página
        // con información. En este caso tiene que existir el 'tabs' sólo cuando exista, en este caso, 'lista'.
    .state('tabs.lista', {
        url: '/lista',
        views: {
            'lista-tab': {
                templateUrl: 'templates/lista.html',    // Ruta del HTML que compone 'lista'
                controller: 'ControladorLista'          // Controlador necesario para que funcione 'lista'
            }
        }
    })

    $urlRouterProvider.otherwise('/tab/lista');      // Si no encontrara el state indicado por algún error, 
                                                      // va a 'lista' por defecto
})




.controller('ControladorLista', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $http.get('js/data.json').success(function(data){
        $scope.peliculas = data;
        $scope.quePelicula = $state.params.fichaId;

        $scope.toggleStar = function(item) {
            item.star = !item.star;
        }

        $scope.doRefresh = function() {
          $http.get('js/data.json').success(function(data){
            $scope.peliculas = data;
            $scope.$broadcast('scroll.refreshComplete');
          });
        }

        $scope.onItemDelete = function(item) {
          $scope.peliculas.splice($scope.peliculas.indexOf(item), 1);
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
          $scope.peliculas.splice(fromIndex, 1);
          $scope.peliculas.splice(toIndex, 0, item);
        };
    });
}]);

