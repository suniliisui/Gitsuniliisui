<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
<script id="internet-summary-template" type="text/x-handlebars-template">
		<div class="section-wpr clearfix">
			<span class="row-hdr">Internet Service</span>
			<span class="page-link"><a href="${contextPath}/solution/index.jsp" class="bui-p-l-10" id="remove-internet-service" data-servicename="internet">Remove Internet Service</a></span>		
		</div>
 		<div id="row-1" class="row-section-wpr clearfix">
 			<div class="section-container bui-m-tb-20">
				<div class="bui-m-r-10">
					<div class="section-block-wpr">
						<div class="text-wpr">
							<div class="section-category">SPEED</div>
							<div>Business Edition {{{internetCartData.speedPlanData.externalName}}}</div>
						</div>
						<div class="bui-m-b-10"><a href="${contextPath}/solution/buyflow/internet/chooseSpeedOptions.jsp?intState=speeds">Edit</a></div>
						<div class="section-block">
							<div class="section-content">
								<div class="mini-blue-circle option-circle">
									<span class="capacity-size">{{getFirstWord internetCartData.speedPlanData.speed}}</span><br/>
									<span class="capacity-unit">{{getAllWordsExceptFirst internetCartData.speedPlanData.speed}}</span>
								</div>
								<div class="display-type">Maximum downstream speed</div>
								<div>
									<span class="check-sprite"></span>
									{{#isTrue internetCartData.speedPlanData.isSpeedPlanReviewed}}<span class="check-sprite"></span>{{/isTrue}}
								</div>
							</div>
							<div class="section-price-wpr bui-p-all-10">

							{{#ifCond internetCartData.internetProductType 'u-verse'}}
								<div class="price-label">Monthly Bill</div>
								<div class="text-strikethrough bui-p-r-10 bui-display-inline-block">{{formatAmount internetCartData.speedPlanData.uVerseOriginalPrice}}</div><div class="bui-display-inline-block">{{formatAmount internetCartData.speedPlanData.uVersePromoPrice}}</div>
							{{/ifCond}}
							
							{{#ifCond internetCartData.internetProductType 'fastaccess-dsl'}}
								<div class="bui-grid-2 clearfix">
									<div class="bui-block-1 bui-w-50-percent">
										<div class="price-label">Activation</div>
                               	        <div>{{formatAmount internetCartData.speedPlanData.nrcAmount}}</div>
									</div>
									<div class="bui-block-2 bui-w-50-percent">
                   	                    <div class="price-label">Monthly Bill</div>
										<div>{{formatAmount internetCartData.speedPlanData.mrcAmount}}</div>
									</div>
								</div>
							{{/ifCond}}
							
							{{#ifCond internetCartData.internetProductType 'hsi'}}
								<div class="price-label">Monthly Bill</div>
								<div>{{formatAmount internetCartData.speedPlanData.mrcAmount}}</div>
							{{/ifCond}}
							
							</div>
						</div>
					</div>
				</div>
			</div>
			
				<div class="section-container bui-m-tb-20">
				<div class="bui-m-r-10">
					<div class="section-block-wpr">
						<div class="text-wpr">
							<div class="section-category">IP ADDRESS</div>
							<div>Business Edition {{{getAllWordsExceptFirst internetCartData.ipAddressData.externalName}}}</div>
						</div>
						<div class="bui-m-b-10"><a href="${contextPath}/solution/buyflow/internet/chooseIpAddressOptions.jsp?intState=ips">Edit</a></div>
						<div class="section-block">
							<div class="section-content">
								<div class="mini-blue-circle option-circle">
									<span class="capacity-size">{{{getFirstWord internetCartData.ipAddressData.externalName}}}</span><br/>
									<span class="capacity-unit">{{{getAllWordsExceptFirst internetCartData.ipAddressData.externalName}}}</span>
								</div>
								<div class="display-type">Business Edition {{{getAllWordsExceptFirst internetCartData.ipAddressData.externalName}}}</div>
								<div>
									{{#isTrue internetCartData.ipAddressData.isIpAddressReviewed}}<span class="check-sprite"></span>{{/isTrue}}
								</div>
							</div>
							<div class="section-price-wpr bui-p-all-10">
								<div class="bui-grid-2 clearfix">
									<div class="bui-block-1 bui-w-50-percent">
										<div class="price-label">Activation</div>
                                        <div>{{formatAmount internetCartData.ipAddressData.nrcAmount}}</div>
									</div>
									<div class="bui-block-2 bui-w-50-percent">
                                        <div class="price-label">Monthly Bill</div>
										<div>{{formatAmount internetCartData.ipAddressData.mrcAmount}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
				<div class="section-container bui-m-tb-20">
				<div class="bui-m-r-10">
					<div class="section-block-wpr">
						<div class="text-wpr">
							<div class="section-category">EQUIPMENT</div>
							<div>{{{internetCartData.equipmentData.externalName}}}</div>
						</div>
						<div class="bui-m-b-10"><a href="${contextPath}/solution/buyflow/internet/chooseEquipmentOptions.jsp?intState=equipment">Edit</a></div>
						<div class="section-block">
							<div class="section-content">
								<div class="mini-blue-circle option-circle">
								 	<div class="img-icon">
                               			 <img src="${contextPath}{{internetCartData.equipmentData.activeIcon}}" alt="equipment image" />
                          		 	</div>
                          		 </div>
									<div class="display-type">{{{internetCartData.equipmentData.externalName}}}</div>
								<div>
									{{#isTrue internetCartData.equipmentData.isEquipmentReviewed}}<span class="check-sprite"></span>{{/isTrue}}
								</div>
							</div>
							<div class="section-price-wpr bui-p-all-10">
                               	<div class="price-label">On First Bill</div>
                               	<div>{{formatAmount internetCartData.equipmentData.nrcAmount}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
				<div class="section-container bui-m-tb-20">
				<div class="bui-m-r-10">
					<div class="section-block-wpr">
						<div class="text-wpr">
							<div class="section-category">INSTALLATION</div>
							<div>{{{internetCartData.installationData.externalName}}}</div>
						</div>
						<div class="bui-m-b-10"><a href="${contextPath}/solution/buyflow/internet/chooseInstallationOptions.jsp?intState=installation">Edit</a></div>
						<div class="section-block">
							<div class="section-content">
								<div class="mini-blue-circle option-circle">
								 	<div class="img-icon">
                               			 <img src="${contextPath}{{internetCartData.installationData.activeIcon}}" alt="professional installation image" />
                          		 	</div>
                          		 </div>
								<div class="display-type">{{{internetCartData.installationData.externalName}}}</div>
								<div>
									{{#isTrue internetCartData.installationData.isInstallationReviewed}}<span class="check-sprite"></span>{{/isTrue}}
								</div>
							</div>
							<div class="section-price-wpr bui-p-all-10">
                               	<div class="price-label">On First Bill</div>
                               	<div>{{formatAmount internetCartData.installationData.nrcAmount}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
 		</div>
<%-- 		<hr />
		<div class="bui-p-all-10 bui-text-align-right">
			<a href="${contextPath}/solution/buyflow/shoppingCartReview.jsp"> <span
				class="bui-button bui-float-right bui-p-tb-10 ">REVIEW DATA</span>
			</a>
		</div>--%>
		<div class="family-cart-price-wpr bui-grid-2">
			<div class="bui-grid-2 bui-block-a clearfix">
				<div class="bui-block-1">
					<div class="price-label">Due Today</div>
					<!--div>{{formatAmount wirelineOneTimeAmount}}</div-->
					<div>$0.00</div>
				</div>
				<div class="bui-block-2">
					<div class="price-label">On First Bill</div>
					<div>{{formatAmount wirelineFirstMonthBillAmount}}</div>
				</div>
			</div>
			<div class="bui-block-b">
				<div class="price-label">Monthly Bill</div>
				<div>{{formatAmount wirelineMonthlyAmount}}</div>
			</div>
		</div>


	</div>
</script>

<%--Internet summary Dynamic button --%>
<script id="internet-summary-page-btn-wpr" type="text/x-handlebars-template">
	
	<div class="bui-p-all-10 bui-text-align-right">
			<a href="${contextPath}/solution/buyflow/shoppingCartReview.jsp"><button
				class="bui-button-orange bui-float-right bui-p-tb-10 ">Check Out</button>
			</a>
		</div

</script>
<%-- page specific modal popup --%>
<script id="internet-service-removal-warning-popup-template" type="text/x-handlebars-template">

	<div class="clearfix">
		<p>You are removing Internet Service.</p>
	</div>

	<div class="clearfix footer-wpr">
		<a href="javascript: void(0)"> <button class="bui-button-disable" data-dismiss="modal">Keep Service</button></a> 
		<a href="javascript: void(0)"> <button class="bui-button remove-service">Remove Service</button></a>
	</div>

</script>

</dsp:page>