<script id="int-equipment-options-template" type="text/x-handlebars-template">
<div class="bui-grid-3 clearfix pageContentHeaderSection">
	<div class="bui-block-a">
		<a href="${contextPath}/solution/buyflow/internet/chooseIpAddressOptions.jsp?intState=ips"><span class="arrow-left-icon"></span> Review IP Address</a>
	</div>
	<div class="bui-block-b page-content-header">
		<h1 class="page-content-header">Choose Your Equipment</h1>
	</div>
	<div class="bui-block-c">
		<a href="${contextPath}/solution/buyflow/internet/chooseInstallationOptions.jsp?intState=installation">Review Installation <span class="arrow-right-icon"></span></a>
	</div>
</div>
<div class="page-content-body">
    <div class="page-content-body-header">
        <h2 class="page-content-body-header">{{{parentGroupDescription}}}</h2>
		<hr />
    </div>
    <div class="bui-grid-{{qualifiedProducts.length}} product-columns clearfix">

        {{#each  qualifiedProducts}}
        <div id="plan-{{setIndex @index}}" class="bui-block-2 product-column {{isActiveProduct}}">
        	<div class="product-info">
				{{#if skusList.0.promotionDetails.promotionType}}
					<div class="promotion-info green-circle" data-promotionType="{{skusList.0.promotionDetails.promotionType}}">
						<div class="rebate-offer">FREE</div>
						<div class="rebateText">after</div>
						<div class="rebateText">rebate*</div>
					</div>
				{{/if}}
				<div class="product-capacity-info">
					<div class="circle-sprite blue-circle {{isActiveProduct}}">
	                    <div class="img-icon">
	                        <img src="${contextPath}{{skusList.0.auxiliaryMedia.iconActive}}" alt="equipment image" />
	                    </div>
					</div>
				</div>

	            <div class="product-title">{{{productExternalName}}}</div>
                <div class="product-description">{{{description}}}</div>
                <div class="product-price-info">
	                <div class="amount format-amount">
	                    <sup>$</sup>
	                    <span class="decimal-amount">{{getDecimals skusList.0.yourPrice}}</span>
	                    <sup>{{getCents skusList.0.yourPrice}}</sup>
	                </div>
	                <div class="per-month">One-Time</div>
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
    <a id="confirmSelection" class="cta-btn" href="${contextPath}/solution/buyflow/internet/chooseInstallationOptions.jsp?intState=installation">
        <button class="bui-button">Confirm Selection</button>
    </a>
</div>
</script>