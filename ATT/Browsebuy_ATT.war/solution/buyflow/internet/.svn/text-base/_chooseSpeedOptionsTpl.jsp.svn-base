<script id="internet-speed-options-template" type="text/x-handlebars-template">

<div class="bui-grid-3 clearfix pageContentHeaderSection">
    <div class="bui-block-a">
    </div>
    <div class="bui-block-b page-content-header">
        <h1 class="page-content-header">Choose Your Downstream Speed</h1>
    </div>
    <div class="bui-block-c">
        <a href="${contextPath}/solution/buyflow/internet/chooseIpAddressOptions.jsp?intState=ips">Review IP Address <span class="arrow-right-icon"></span></a>
    </div>
</div>
<div class="page-content-body">
    <div class="page-content-body-header">
        <h2 class="page-content-body-header">{{{sortedInternetSpeeds.0.parentGroupDescription}}}</h2>
		<hr />
    </div>

    <div class="bui-grid-{{sortedInternetSpeeds.length}} product-columns clearfix">
        {{#each sortedInternetSpeeds}}
        <div class="bui-block-{{setIndex @index}} product-column {{isActiveProduct}}" id="plan-{{setIndex @index}}">
			<div class="product-info">
	            <div class="product-capacity-info">
	                <div class="circle-sprite blue-circle">
                        <span class="capacity-size">{{downloadSpeed}}</span><br/>
                        <span class="capacity-unit">Mbps</span>
	                </div>
	            </div>
	            <div class="product-title">
	                {{{productExternalName}}}
	            </div>
	            <div class="product-description">
                    {{{description}}}
                </div>
				<div class="product-price-info">

					{{#ifCond ../internetProductType 'u-verse'}}
						<div class="clearfix">
						<div class="text-strikethrough">
							<div class="amount">
	                    		<span class="decimal-amount">{{uVerseOriginalPrice}}</span>
	                		</div>
						</div>
						<div class="amount format-amount">
	                    	<sup>$</sup>
	                    	<span class="decimal-amount">{{getDecimals uVersePromoPrice}}</span>
	                    	<sup>{{getCents uVersePromoPrice}}</sup>
	                	</div>
	                	<div>Monthly</div>
						</div>
					{{/ifCond}}

						{{#ifCond ../internetProductType 'fastaccess-dsl'}}
						<div class="amount format-amount">
	                    	<sup>$</sup>
	                    	<span class="decimal-amount">{{getDecimals skusList.0.mrcAmount}}</span>
	                    	<sup>{{getCents skusList.0.mrcAmount}}</sup>
	                	</div>
	                	<div>Monthly</div>
						<div>+ {{formatAmount skusList.0.nrcAmount}} Activation Fee</div>
						{{/ifCond}}

						{{#ifCond ../internetProductType 'hsi'}}
							<div class="amount format-amount">
	                    	<sup>$</sup>
	                    	<span class="decimal-amount">{{getDecimals skusList.0.yourPrice}}</span>
	                    	<sup>{{getCents skusList.0.yourPrice}}</sup>
	                		</div>
	                		<div>Monthly</div>
						{{/ifCond}}

	            </div>
			</div>
			<div class="product-cta-btn">
	            {{#if isActiveProduct}}
	                <span class="check-mark-sprite"></span> In Cart
	            {{else}}
	                <a href="#" class="selectSpeed" data-productId="{{id}}" data-skuID="{{skusList.0.id}}">
	                    <button class="bui-button">Select</button>
	                </a>
	            {{/if}}
			</div>
        </div>
        {{/each}}
    </div>
</div>
<div class="bui-text-align-right bui-p-tb-25">
    <a href="${contextPath}/solution/buyflow/internet/chooseIpAddressOptions.jsp?intState=ips" class="cta-btn">
        <button class="bui-button">Confirm Selection</button>
    </a>
</div>
</script>
