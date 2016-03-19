<script id="internet-ip-options-template" type="text/x-handlebars-template">

<div class="bui-grid-3 clearfix pageContentHeaderSection">
	<div class="bui-block-a">
		<a href="${contextPath}/solution/buyflow/internet/chooseSpeedOptions.jsp?intState=speeds"><span class="arrow-left-icon"></span> Review Speed</a>
	</div>
	<div class="bui-block-b page-content-header">
		<h1 class="page-content-header">Choose Your IP Address Option</h1>
	</div>
	<div class="bui-block-c">
		<a href="${contextPath}/solution/buyflow/internet/chooseEquipmentOptions.jsp?intState=equipment">Review Equipment <span class="arrow-right-icon"></span></a>
	</div>
</div>
<div class="page-content-body">
		<div
			class="page-content-body-header">
			<h2 class="page-content-body-header">{{{qualifiedProducts.0.parentGroupDescription}}}</h2>
			<hr />
		</div>
		<div class="bui-grid-{{qualifiedProducts.length}} product-columns clearfix">
			{{#each qualifiedProducts}}
			<div class="bui-block-{{setIndex @index}} product-column {{isActiveProduct}}">
				<div class="product-info">
					<div class="product-capacity-info">
						<div class="circle-sprite blue-circle">
								<span class="capacity-size">{{getFirstWord productExternalName}}</span><br/>
	                            <span class="capacity-unit">{{getAllWordsExceptFirst productExternalName}}</span>
						</div>
					</div>
					<div class="product-title">{{{productSla}}}</div>
					<div class="product-description">{{{renderEncodedHTML description}}}</div>
					<div class="product-price-info">
					   <div class="amount format-amount">
							<sup>$</sup>
							<span class="decimal-amount">
								{{getDecimals skusList.0.mrcAmount}}
							</span> 
							<sup>{{getCents skusList.0.mrcAmount}}</sup>
					    </div>
					    <div class="per-month">Monthly</div>
						{{#ifNotZero skusList.0.nrcAmount}}
							<div>+ {{formatAmount skusList.0.nrcAmount}} Activation</div>				    
						{{/ifNotZero}}
					</div>
				</div>
				<div class="product-cta-btn">
					{{#if isActiveProduct}}
						<span class="check-mark-sprite"></span> In Cart
					{{else}}
						<a href="#" class="selectIp" data-productId="{{id}}"
							data-skuID="{{skusList.0.id}}"> <button
							class="bui-button">Select</button>
						</a>
					{{/if}}
				</div>
			</div>
		{{/each}}
	</div>
</div>
<div class="bui-p-tb-30 bui-text-align-right">
	<a id="" class="cta-btn"
		href="${contextPath}/solution/buyflow/internet/chooseEquipmentOptions.jsp?intState=equipment">
		<button class="bui-button">Confirm Selection</button>
	</a>
</div>
</script>
