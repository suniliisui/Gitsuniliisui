<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
<script id="empty-shopping-cart-template" type="text/x-handlebars-template">
<div
	class="bui-grid-3 clearfix pageContentHeaderSection">
	<div class="bui-block-a"></div>
	<div class="bui-block-b page-content-header">
		Your Cart Is Empty
	</div>
	<div class="bui-block-c"></div>
</div>

<div class="bui-m-tb-100 bui-text-align-center">
	<p>You have no items in your shopping cart.</p>
	<a href="${contextPath}/solution/index.jsp"> <button
		class="bui-button">Start Shopping</button>
	</a>
</div>
</script>
<script id="promotion-info-popup-template" type="text/x-handlebars-template">
	
	<div class="clearfix">
		<div>Select the promotion that you would like to apply to your order</div>
	</div>

	<div class="clearfix footer-wpr">
		<div>
			 <button class="bui-button select-offer" data-select-promo="dollars-off">$50 off selected Tablets</button>
			 <button class="bui-button select-offer" data-select-promo="free-offer">FREE Galaxy Note&reg;</button>
		</div>
		<div>Terms & Conditions</div>
	</div>

</script>

</dsp:page>