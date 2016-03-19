(function($){
    $.attTabs = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        //Related to tabs wrapper..
		base.$tabsObj = $(el).find(".bui-tab");
		base.$firstTabObj = $(el).find(".bui-tab").eq(0);
        base.tabsObj = base.$tabsObj[0];

        //Related to tab content wrapper..
        base.$tabContentWpr = $(el).siblings(".bui-tab-content-wpr").eq(0);
        base.tabContentWpr = base.$tabContentWpr[0];

        // Add a reverse reference to the DOM object
        base.$el.data("attTabs", base);

        base.init = function(){

            base.options = $.extend({},$.attTabs.defaultOptions, options);

            // Put your initialization code here
            var $tabContentObj = $(".bui-tab-content", base.$tabContentWpr); //collection of all the tab contents..
            var $tabContentWrapper = base.$tabContentWpr; // parent wrapper of all the tab contents (it should not be a collective, it's only a single object)
			var $firstTabContent = $tabContentObj.eq(0); //first tab content element (it's only a single object)

			//logic to show/hide the tab content..
			base.$tabsObj.click(function(clickedTabItem) {
				  clickedTabItem.preventDefault(); //prevent default anchor behavior..

				  if($(this).hasClass("bui-tab-active")){ // if the tab content is already displayed, nothing to do..
					  return;
				  }

				  var currentClickedTabIndex  = base.$tabsObj.index(this); //the tab index of the tab that is about to be displayed..
				  var currentClickedTabObj = $tabContentObj.eq(currentClickedTabIndex); //the tab element object that is about to be displayed (it's only a single object)..

				  base.$tabsObj.removeClass(base.options.activeTabClassName); //removing the 'active tab' class name on the tab elements..
				  $(this).addClass(base.options.activeTabClassName); //adding the 'active tab' class name on the tab that is about to be displayed..

				  $tabContentWrapper.height($tabContentWrapper.height()); //setting the height of the old tab (that is about to be hidden) to the tab content's parent wrapper.. This avoids extra scrolling of the page scroll bar

				  currentClickedTabObj.addClass("bui-tab-transition-class"); //this class makes the position of the tab to be displayed as 'absolute', that helps in fadeIn & fadeOut animation effects..

				  //callback to be executed before the tab switch happens..
				  base.options.beforeTabSwitchStart.call();

				  $tabContentObj.hide(); //hiding all the tab contents..
				  $tabContentObj.removeClass(base.options.activeTabClassName); //removing the 'active tab' class name on all the tab contents..

				  currentClickedTabObj
				  	.fadeIn(function(){
	  					$tabContentWrapper.height("auto");
						$(this).addClass(base.options.activeTabClassName);
						currentClickedTabObj.removeClass("bui-tab-transition-class");
					});

				  //callback to be executed after the tab switch happens..
				  base.options.afterTabSwitchComplete.call();
			});

			//triggering the first tab, by default (or on page load)..
			base.$firstTabObj.click();
        };

        // Run initializer
        base.init();
    };

    $.attTabs.defaultOptions = {
        activeTabClassName: "bui-tab-active",
        beforeTabSwitchStart: function(){},
        afterTabSwitchComplete: function(){}
    };

    $.fn.attTabs = function(options){
        return this.each(function(){
            (new $.attTabs(this, options));
        });
    };

})(jQuery);