var appServices = angular.module('dine.services');

appServices.factory('NavBarService', [function() {
    var pathStack = {
        coupons: [],
        businesses: []
    }

    var currentStates = {
        coupons: "#coupons",
        businesses: "#businesses"
    }

    var observerCallbacks = [];

    var pathStackPop = function(page) {
        var next = pathStack[page].pop();
        notifyObservers();
        return next;
    }

    var pathStackPush = function(page, route, next) {
        pathStack[page].push(route);
        currentStates[page] = next
        notifyObservers();
        return pathStack[page];
    }

    var getPathStack = function(page) {
        return pathStack[page];
    }

    var getNextLocation = function(page) {
        return currentStates[page];
    }




    //register an observer
    var registerObserverCallback = function(callback) {
        observerCallbacks.push(callback);
    };

    //call this when you know 'foo' has been changed
    var notifyObservers = function() {
        angular.forEach(observerCallbacks, function(callback) {
            callback();
        });
    };


    return {
        pathStackPush: pathStackPush,
        pathStackPop: pathStackPop,
        getPathStack: getPathStack,
        getNextLocation: getNextLocation,
        registerObserverCallback: registerObserverCallback
    };
}]);
