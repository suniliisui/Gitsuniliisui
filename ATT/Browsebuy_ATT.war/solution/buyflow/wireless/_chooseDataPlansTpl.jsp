<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
<script id="data-plans-template" type="text/x-handlebars-template">
<div class="bui-grid-3 pageContentHeaderSection clearfix">
	<div class="bui-block-a">
	</div>
	<div class="bui-block-b">
		<h1 class="page-content-header">Select Your Data Plan</h1>
		<p> Choose the amount of data that is shared between your wireless tablets.</p>
	</div>
	<div class="bui-block-c"></div>
</div>
<div class="page-content-body">
	<div class="page-content-body-header">
		<h2 class="page-content-body-header">AT&T Mobile Share<sup>SM</sup> Data Plan</h2>
		<hr />
	</div>
	<div class="bui-grid-3 product-columns clearfix">
		{{#each products}}
		<div class="bui-block-{{setIndex @index}} product-column {{isActiveProduct}}" id="plan-{{setIndex @index}}">
			<div class="product-info">
				<div class="product-capacity-info">
					<div class="circle-sprite blue-circle">
						<div class="capacity-size">{{getMemorySize wirelessRatePlanInfo.dataIncluded}}</div>
						<div class="capacity-unit">{{getMemoryUnit wirelessRatePlanInfo.dataIncluded}}</div>
					</div>
				</div>
				<div class="product-title">
					Shared Data
				</div>
				<div class="product-description">
					{{{productExternalName}}}
				</div>
				<div class="product-price-info">
					<div class="amount format-amount">
						<sup>$</sup>
						<span class="decimal-amount">{{getDecimals skuInfos.0.yourPrice}}</span>
						<sup>{{getCents skuInfos.0.yourPrice}}</sup>
					</div>
					<div class="per-month">Monthly</div>
					<div>+ $10/mo. per tablet</div>
				</div>
			</div>
			<div class="product-cta-btn">			
				{{#if isActiveProduct}}
					<span class="check-mark-sprite"></span> In Cart
				{{else}}
					<a href="#" class="selectPlan" data-productId="{{id}}" data-skuID="{{skuInfos.0.skuId}}">
						<button class="bui-button">Select</button>
					</a>
				{{/if}}
			</div>
		</div>
		{{/each}}
	</div>
</div>					
<div class="bui-text-align-right bui-p-tb-25">
	<a href="${contextPath}/solution/buyflow/wireless/wirelessServicesSummary.jsp" class="cta-btn">
		<button class="bui-button">Confirm Selection</button>
	</a>
</div>
</script>
</dsp:page>