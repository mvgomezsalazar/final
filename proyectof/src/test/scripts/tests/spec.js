describe('Protractor Demo App', function() {

	var testurl = 'http://localhost:3000';
	var alterarButton = element(by.id('alterar'));

	beforeEach(function() {
		browser.get(testurl);
	  });

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('Demo MP');
	});

});
