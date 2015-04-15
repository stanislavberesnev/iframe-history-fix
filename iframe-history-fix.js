angular.module('iframeHistoryFix', [])
    .directive('a', function ($rootScope, $location, $timeout) { 'use strict';
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                element.on('click', function(e) {
                    if (attrs.href) {
                        e.preventDefault();
                        $timeout(function() {
                            window.location.replace(attrs.href);
                        });
                    }
                });
            }
        };
    })
    .config(function($provide) { 'use strict';
        $provide.decorator('$location', function($delegate) {
            var __oldPath = $delegate.path;
            $delegate.path = function() {
                this.replace();
                return __oldPath.apply(this, arguments);
            };
            return $delegate;
        });
    });
