describe('eventoController', function() {
var $controller, eventoController;
    // Load ui.router and our components.users module which we'll create next
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('ngResource'));
    beforeEach(angular.mock.module('oc.lazyLoad'));
    beforeEach(angular.mock.module('mpApp'));
    beforeEach(angular.mock.module('mpApp.ui'));
    beforeEach(angular.mock.module('mpApp.public'));
    // Add the module for our Users service

    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
      eventoController = $controller('eventoController', {});
    }));

    it('should be defined', function() {
      expect(eventoController).toBeDefined();
    });
    
    // Add a new test for our expected controller behavior
    it('should return test', function() {
      expect(eventoController.dev.foo).toEqual('test');
    });
    
    it('should return test', function() {
      expect(eventoController.dev2.bar).toEqual('test');
    });


});