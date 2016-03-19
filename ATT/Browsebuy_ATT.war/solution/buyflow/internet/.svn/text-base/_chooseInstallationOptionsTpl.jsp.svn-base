<script id="internet-installation-options-template" type="text/x-handlebars-template">
<div class="bui-grid-3 clearfix pageContentHeaderSection">
	<div class="bui-block-a">
		<a href="${contextPath}/solution/buyflow/internet/chooseEquipmentOptions.jsp?intState=equipment"><span class="arrow-left-icon"></span> Review Equipment</a>
	</div>
	<div class="bui-block-b page-content-header">
		<h1 class="page-content-header">Choose Your Installation Option</h1>
	</div>
	<div class="bui-block-c">
		<a href="${contextPath}/solution/buyflow/internet/internetSummary.jsp">Confirm Selection <span class="arrow-right-icon"></span></a>
	</div>
</div>

<div class="page-content-body">
	<div class="page-content-body-header">
		<h2 class="page-content-body-header">{{qualifiedProducts.0.parentGroupDescription}}</h2>
		<hr />
	</div>
	<div class="bui-grid-{{qualifiedProducts.length}} product-columns clearfix">

		{{#each qualifiedProducts}}
		<div class="bui-block-{{setIndex @index}} product-column {{isActiveProduct}}" id="plan-item-{{setIndex @index}}">
			<div class="product-info">
				<div class="product-capacity-info">
					<div class="circle-sprite blue-circle">
						<img class="active-icon" src="${contextPath}{{skusList.0.auxiliaryMedia.iconActive}}" alt="professional installation image" />
					</div>
				</div>
				<div class="product-title">
						{{{productExternalName}}}
				</div>
				<div class="product-description">{{description}}</div>
				<div class="product-price-info">
					<div class="amount format-amount">
						<sup>$</sup>
						<span class="decimal-amount">{{getDecimals skusList.0.yourPrice}}</span>
						<sup>{{getCents skusList.0.yourPrice}}</sup>
					</div>
	                <div class="plan-item-unit">One-Time</div>
	            </div>
			</div>
			<div class="product-cta-btn">
				{{#if isActiveProduct}}
                   <span class="check-mark-sprite"></span> In Cart
               {{else}}
	               <a data-skuid="{{skusList.0.id}}" data-productid="{{id}}" class="selectPlan plan-btn" href="#">
	                   <button class="bui-button">Select</button>
	               </a>
               {{/if}}
			</div>
		</div>
		{{/each}}
	</div>
</div>
<div class="bui-text-align-right bui-p-tb-25">
	<a href="${contextPath}/solution/buyflow/internet/internetSummary.jsp" class="cta-btn">
		<button class="bui-button">Confirm Selection</button>
	</a>
</div>
</script>
