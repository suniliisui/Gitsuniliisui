<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
<script id="device-wireless-summary-template" type="text/x-handlebars-template">
		<div class="wireless-service clearfix">
			<span class="wireless-services-hdr">Wireless Services</span>
			<a href="${contextPath}/solution/index.jsp" class="bui-p-l-10" id="remove-wrls-service" data-servicename="wireless">Remove Wireless Service</a>
		</div>

		<div id="wireless-row-1" class="clearfix">
			<div id="wireless-container">
				{{#each wirelessCartData.deviceList}}
				<div class="device-summary-block-wpr device bui-m-tb-20">
					<div class="add-device-block bui-m-r-10">
						<div class="device-text-wpr">
							<div class="device-cat-text">TABLET {{setIndex @index}}</div>
							<a class="device-display-name"
								href="${contextPath}/solution/buyflow/wireless/chooseDevice.jsp?productId={{parentProductId}}&skuId={{skuId}}&orderGroupId={{orderGroupId}}&sdgProdId={{../wirelessCartData.sharedDataPlan.sdgProdId}}&sdgSkuId={{../wirelessCartData.sharedDataPlan.sdgSkuId}}&sdfProdId={{sdfProdId}}&sdfSkuId={{sdfSkuId}}&device={{setIndex @index}}&mode=edit">
										{{{manufacturerDisplayName}}} {{{externalName}}}
							</a>
						</div>
						<div class="bui-grid-2 bui-m-b-10 clearfix">
							<div class="bui-block-1">
								<a class="edit-device nav-link"
									href="${contextPath}/solution/buyflow/wireless/chooseDevice.jsp?productId={{parentProductId}}&skuId={{skuId}}&orderGroupId={{orderGroupId}}&sdgProdId={{../wirelessCartData.sharedDataPlan.sdgProdId}}&sdgSkuId={{../wirelessCartData.sharedDataPlan.sdgSkuId}}&sdfProdId={{sdfProdId}}&sdfSkuId={{sdfSkuId}}&device={{setIndex @index}}&mode=edit"
									data-skuid="{{skuId}}" data-skutype="{{skuType}}">Edit</a>
							</div>
							<div class="bui-block-2">
								<a class="removeDevice nav-link" href="${contextPath}/solution/index.jsp"
									data-ordergrpid="{{orderGroupId}}"
									data-deviceindex="{{setIndex @index}}" data-manufacturername="{{{manufacturerDisplayName}}}" data-externalname="{{{externalName}}}">Remove</a>
							</div>
						</div>
						<div class="device-select-block">
							
								<a class="edit-device"
										href="${contextPath}/solution/buyflow/wireless/chooseDevice.jsp?productId={{parentProductId}}&skuId={{skuId}}&orderGroupId={{orderGroupId}}&sdgProdId={{../wirelessCartData.sharedDataPlan.sdgProdId}}&sdgSkuId={{../wirelessCartData.sharedDataPlan.sdgSkuId}}&sdfProdId={{sdfProdId}}&sdfSkuId={{sdfSkuId}}&device={{setIndex @index}}&mode=edit">
										<div class="display-device-img-wpr">
										<div class="img-container">
											<img class="img-holder" alt="{{{manufacturerDisplayName}}}{{{externalName}}}"
												src="${contextPath}{{smallImageUrl}}" />
										</div>
										<div class="bui-m-t-5">
											<span>{{color}},&nbsp;{{capacity}}</span>
										</div>
										<div>
											<span class="check-sprite"></span>
										</div>
									</div>
								</a>
							
							<div class="display-family-price-wpr bui-p-all-10">																
										<div class="price-label">Due Today</div>										
										<div> <span class="text-strikethrough bui-p-r-5">{{formatAmount nrcListAmount}}</span><span>{{formatAmount nrcAmount}}</span></div>
								
							</div>

						</div>
					</div>
				</div>
				{{/each}} 
				{{#if wirelessCartData.showAddDevice}}

				<div class="device-summary-block-wpr add-device bui-m-tb-20">

					<div class="add-device-block bui-m-r-10">
						<div class="device-text-wpr">
							<div class="device-cat-text">&nbsp;</div>
							<div class="device-display-name">&nbsp;</div>
						</div>
						<div class="clearfix bui-m-b-10">&nbsp;</div>
						<a href="${contextPath}/solution/buyflow/wireless/deviceCatalog.jsp?mode=add"  title="add another tablet">
							<div class="device-select-block">				
								<div class="add-device bui-m-t-25 bui-m-b-15">
									<span
										class="add-sprite"></span>
								</div>
								<div class="display-name">Add another tablet</div>
								<div class="bui-m-t-50">
									<button
										id="add-device" class="bui-button">Add Tablet</button>
								</div>
							</div>
						</a>
					</div>
				</div>
				{{/if}}
			</div>

			<div class="device-summary-block-wpr dataplan bui-m-tb-20">
				<div class="add-device-block bui-m-r-10">
					<div class="device-text-wpr">
						<div class="device-cat-text">DATA PLAN</div>
						<a href="${contextPath}/solution/buyflow/wireless/chooseDataPlans.jsp">
						<div class="device-display-name">{{{wirelessCartData.sharedDataPlan.sdgExternalName}}}</div>
						</a>
					</div>
					<div class="clearfix bui-m-b-10">
						<a class="nav-link" href="${contextPath}/solution/buyflow/wireless/chooseDataPlans.jsp">Edit</a>
					</div>
					<div class="device-select-block">
						<a class="edit-device nav-link" href="${contextPath}/solution/buyflow/wireless/chooseDataPlans.jsp">
						<div class="display-device-img-wpr">
							<div class="mini-blue-circle option-circle">
									<span class="capacity-size">{{getMemorySize wirelessCartData.sharedDataPlan.sdgData}}</span><br/>
									<span class="capacity-unit">{{getMemoryUnit wirelessCartData.sharedDataPlan.sdgData}}</span>
								</div>
								<div class="data-display-name bui-m-t-25">{{{wirelessCartData.sharedDataPlan.sdgExternalName}}}</div>
							<div>
								{{#isTrue wirelessCartData.sharedDataPlan.isDataPlanReviewed}}<span class="check-sprite"></span>{{/isTrue}}
							</div>
						</div>
						</a>
						<div class="display-family-price-wpr bui-p-all-10">									
							<div class="price-label">Monthly Bill</div>								
							<div class="">{{formatAmount wirelessCartData.sharedDataPlan.totalDataPlanAmount}}</div>								
						</div>

					</div>
				</div>
			</div>
		</div>

		<div class="family-cart-price-wpr bui-grid-2">
			<div class="bui-grid-2 bui-block-a clearfix">
				<div class="bui-block-1">
					<div class="price-label">Due Today</div>
					<div>{{formatAmount wirelessOneTimeAmount}}</div>
				</div>
				<div class="bui-block-2">
					<div class="price-label">On First Bill</div>
					<div>{{formatAmount wirelessFirstMonthBillAmount}}</div>
				</div>
			</div>
			<div class="bui-block-b">
				<div class="price-label">Monthly Bill</div>
				<div>{{formatAmount wirelessMonthlyAmount}}</div>
			</div>
		</div>
	</script>
	
		<script id="wireless-summary-shopinternet-link-template" type="text/x-handlebars-template">
		<div class="bui-text-align-right">
				{{#if isinternetInCart}}
					<a href="${contextPath}/solution/buyflow/shoppingCartReview.jsp">
						<button class="bui-button-orange">Check Out</button>
					</a>
				{{else}}
					<a href="${contextPath}/solution/buyflow/internet/index.jsp">Shop Internet <span class="arrow-right-icon"></span></a>
				{{/if}}
		</div>
	</script>
	
	<script id="wireless-summary-reviewdata-link-template" type="text/x-handlebars-template">
			<div class="bui-text-align-right">
				{{#if isReviewData}}
					<a href="${contextPath}/solution/buyflow/shoppingCartReview.jsp">
						<button class="bui-button-orange">Checkout</button>
					</a>
				{{else}}
					<a class="int-check-service" href="${contextPath}/solution/buyflow/wireless/chooseDataPlans.jsp">Review Data Plan <span class="arrow-right-icon"></span></a>
				{{/if}}
			</div>
	</script>

	<script id="wireless-summary-shopinternet-btn-template" type="text/x-handlebars-template">
		<div class="bui-p-all-10 bui-text-align-right">
				{{#if isinternetInCart}}
					<a href="${contextPath}/solution/buyflow/shoppingCartReview.jsp"> 
						<button class="bui-button-orange bui-float-right bui-p-tb-10 ">Checkout</button>
					</a>
				{{else}}
					<a href="${contextPath}/solution/buyflow/internet/index.jsp"> 
						<button class="bui-button bui-float-right bui-p-tb-10 ">Shop Internet</button>
					</a>
				{{/if}}
		</div>
	</script>
	
	<script id="wireless-summary-reviewdata-btn-template" type="text/x-handlebars-template">
			<div class="bui-p-all-10 bui-text-align-right">
				{{#if isReviewData}}
					<a href="${contextPath}/solution/buyflow/shoppingCartReview.jsp"> 
						<button class="bui-button-orange bui-float-right bui-p-tb-10 ">Checkout</button>
					</a>
				{{else}}
					<a class="int-check-service" href="${contextPath}/solution/buyflow/wireless/chooseDataPlans.jsp"> 
						<button class="bui-button bui-float-right bui-p-tb-10 ">Review Data Plan</button>
					</a>
				{{/if}}
			</div>
	</script>
	
<%-- page specific modal popup --%>
<script id="device-removal-warning-popup-single-template" type="text/x-handlebars-template">

	<div class="clearfix">
		<p>You are removing</p>
		<p>Tablet {{index}} - {{{manufacturerName}}} {{{externalName}}}.</p>
		<p>{{msgTxt}}</p>
	</div>

	<div class="clearfix footer-wpr">
		<a href="javascript: void(0)"> <button class="bui-button-grey" data-dismiss="modal">Keep Tablet</button></a> 
		<a href="javascript: void(0)"> <button class="bui-button delete-device">Remove Tablet</button></a>
	</div>

</script>

<script id="device-removal-warning-popup-multi-template" type="text/x-handlebars-template">

	<div class="clearfix">
		<p>You are removing</p>
		<p>Tablet {{index}} - {{{manufacturerName}}} {{{externalName}}}</p>
	</div>

	<div class="clearfix footer-wpr">
		<a href="javascript: void(0)"> <button class="bui-button-grey" data-dismiss="modal">Keep Tablet</button></a> 
		<a href="javascript: void(0)"> <button class="bui-button delete-device">Remove Tablet</button></a>
	</div>

</script>
<%-- EndOf: page specific modal popup --%>

<%-- page specific modal popup --%>
<script id="wrls-service-removal-warning-popup-template" type="text/x-handlebars-template">

	<div class="clearfix">
		<p>You are removing wireless service.</p>
		<p>This will also remove devices added to cart and an associated data plan.</p>
	</div>

	<div class="clearfix footer-wpr">
		<a href="javascript: void(0)"> <button class="bui-button-grey" data-dismiss="modal">Keep Service</button></a> 
		<a href="javascript: void(0)"> <button class="bui-button remove-service">Remove Service</button></a>
	</div>

</script>

</dsp:page>