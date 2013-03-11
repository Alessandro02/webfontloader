describe('CustomCss', function () {
  var CustomCss = webfont.CustomCss,
      FontFamily = webfont.FontFamily;

  describe('insert links correctly', function () {
    var fakeDomHelper = null,
        load = null;

    beforeEach(function () {
      fakeDomHelper = {
        createCssLink: jasmine.createSpy('createCssLink'),
        insertInto: jasmine.createSpy('insertInto')
      };

      load = jasmine.createSpy('load');

      var defaultModule = new CustomCss(fakeDomHelper, {
        families: ['Font1', 'Font2', 'Font3'],
        urls: ['http://moo', 'http://meuh']
      });

      defaultModule.load(load);
    });

    it('should have inserted the links correctly', function () {
      expect(fakeDomHelper.createCssLink.callCount).toEqual(2);
      expect(fakeDomHelper.createCssLink).toHaveBeenCalledWith('http://moo');
      expect(fakeDomHelper.createCssLink).toHaveBeenCalledWith('http://meuh');
    });

    it('should have loaded the families correctly', function () {
      expect(load.callCount).toEqual(1);
      expect(load.calls[0].args[0].length).toEqual(3);
      expect(load.calls[0].args[0][0].getName()).toEqual('Font1');
      expect(load.calls[0].args[0][1].getName()).toEqual('Font2');
      expect(load.calls[0].args[0][2].getName()).toEqual('Font3');
    });
  });
});
