<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
	<script id="bundle-order-confirmation-template" type="text/x-handlebars-template">
			 <div class="bui-grid-4 order-review-status clearfix">
			<div class="bui-block-1 order-img">
				<div class="order-sec">
					<p><strong>1. Order</strong></p>
					<p>Order submitted</p>
				</div>
			</div>
			<div class="bui-block-2 ship-img">
				<div class="order-sec">
					<p><strong>2. Ship</strong></p>
					<p>We&#39;ll arrange shipment of your new products and email you tracking details.</p>
				</div>
			</div>
			<div class="bui-block-3 install-img">
				<div class="order-sec">
					<p><strong>3. Install</strong></p>
					<P>We&#39;ll schedule around the preferences you supplied, and send an email with suggested date and time. </p>
				</div>
			</div>
			<div class="bui-block-4 profit-img">
				<div class="order-sec">
					<p><strong>4. Start Profiting</strong></p>
					<p>Start working more efficiently with your new products and services.</p>
				</div>
			</div>
		</div>
	</script>
	<script id="prof-order-confirmation-template" type="text/x-handlebars-template">
		<div class="bui-grid-3 order-review-status-2 clearfix">
			<div class="bui-block-1 order-img">
				<div class="order-sec">
					<p><strong>1. Order</strong></p>
					<p>Order submitted</p>
				</div>
			</div>
			<div class="bui-block-2 install-img">
				<div class="order-sec">
					<p><strong>2. Install</strong></p>
					<P>We&#39;ll schedule around the preferences you supplied, and send an email with suggested date and time. </p>
				</div>
			</div>
			<div class="bui-block-3 profit-img">
				<div class="order-sec">
					<p><strong>3. Start Profiting</strong></p>
					<p>Start working more efficiently with your new products and services.</p>
				</div>
			</div>
		</div>
	</script>
	<script id="own-equipment-template" type="text/x-handlebars-template">
		<div class="bui-grid-2 order-review-status-4 clearfix">
			<div class="bui-block-1 order-img">
				<div class="order-sec">
					<p><strong>1. Order</strong></p>
					<p>Order submitted</p>
				</div>
			</div>
			<div class="bui-block-2 profit-img">
				<div class="order-sec">
					<p><strong>2. Start Profiting</strong></p>
					<p>Start working more efficiently with your new products and services.</p>
				</div>
			</div>
		</div>
	</script>
	<script id="self-order-confirmation-template" type="text/x-handlebars-template">
		<div class="bui-grid-3 order-review-status-3 clearfix">
			<div class="bui-block-1 order-img">
				<div class="order-sec">
					<p><strong>1. Order</strong></p>
					<p>Order submitted</p>
				</div>
			</div>
			<div class="bui-block-2 ship-img">
				<div class="order-sec">
					<p><strong>2. Ship</strong></p>
					<p>We&#39;ll arrange shipment of your new products and email you tracking details.</p>
				</div>
			</div>
			<div class="bui-block-3 profit-img">
				<div class="order-sec">
					<p><strong>3. Start Profiting</strong></p>
					<p>Start working more efficiently with your new products and services.</p>
				</div>
			</div>
		</div>
	</script>
	<script id="wireless-order-confirmation-template" type="text/x-handlebars-template">
		<div class="bui-grid-3 order-review-status-3 clearfix">
			<div class="bui-block-1 order-img">
				<div class="order-sec">
					<p><strong>1. Order</strong></p>
					<p>Order submitted</p>
				</div>
			</div>
			<div class="bui-block-2 ship-img">
				<div class="order-sec">
					<p><strong>2. Ship</strong></p>
					<p>We&#39;ll arrange shipment of your new products and email you tracking details.</p>
				</div>
			</div>
			<div class="bui-block-3 profit-img">
				<div class="order-sec">
					<p><strong>3. Start Profiting</strong></p>
					<p>Start working more efficiently with your new products and services.</p>
				</div>
			</div>
		</div>
		
	</script>
	
    <script id="order-confirmation-info-template" type="text/x-handlebars-template">
		<div class="bui-grid-2 order-section clearfix">
			<div class="bui-block-1">
				<div class="order-status">ORDER CONFIRMED</div>
				<span>Thank you for shopping with AT&T.</span>
			</div>
			<div class="bui-block-2 bui-text-align-right">
				<div class="order-label">Order Confirmation Number</div>
				<span class="order-info-text">{{lastSubmittedCartDetails.orderId}}</span>
			</div>
		</div>
		<hr/>
		<div class="order-section bui-text-align-center">
			<div class="order-status-label">Here&#39;s what happens next.</div>
			<div class="order-label">We will send a confirmation email to:</div>
			<div class="order-info-text">{{lastSubmittedCartDetails.emailId}}</div>
		</div>
</script>

    <script id="wireless-summary-info-template" type="text/x-handlebars-template">
		<div class="box">
			<div class="bui-grid-4 header clearfix">
				<div class="bui-block-1 title">Wireless Service</div>
				<div class="bui-block-2 price-col">
					<div>Due Today</div>
					<div>{{formatAmount wirelessOneTimeAmount}}</div>
				</div>
				<div class="bui-block-3 price-col">
					<div>On First Bill</div>
					<div>{{formatAmount wirelessFirstMonthBillAmount}}</div>
				</div>
				<div class="bui-block-4 price-col">
					<div>Monthly Bill</div>
					<div>{{formatAmount wirelessMonthlyAmount}}</div>
				</div>
			</div>
			<div class="body">
					<div class="product-details clearfix">
					{{#each wirelessCartData.deviceList}}
						<div class="bui-grid-2 order-item wrls-device clearfix">
							<div class="bui-block-1 left-column"><img src="${contextPath}{{smallImageUrl}}" alt="{{{manufacturerDisplayName}}} {{{externalName}}}" /></div>
							<div class="bui-block-2 right-column">
								<div class="item-heading">TABLET {{setIndex @index}}</div>
								<ul>
									<li class="desc"> 
												<div>{{{manufacturerDisplayName}}} {{{externalName}}}, {{color}}, {{capacity}}</div> 
									</li>
<%--									<li class="price-col">{{formatAmount nrcAmount}}</li>--%>
                                    <li class="price-col"><span class="text-strikethrough bui-p-r-5">{{formatAmount nrcListAmount}}</span><span>{{formatAmount nrcAmount}}</span></li>

									<li class="price-col">--</li>
									<li class="price-col">--</li>
								</ul>
							</div>
						</div>
					{{/each}}
						<div class="bui-grid-2 order-item product-capacity-row">
							<div class="bui-block-1 left-column">
								<div class="mini-blue-circle option-circle">
									<span class="capacity-size">{{getMemorySize wirelessCartData.sharedDataPlan.sdgData}}</span><br/>
									<span class="capacity-unit">{{getMemoryUnit wirelessCartData.sharedDataPlan.sdgData}}</span>
								</div>
							</div>
							<div class="bui-block-2 right-column">
								<div class="item-heading">DATA PLAN</div>
								<ul>
									<li class="desc">{{{wirelessCartData.sharedDataPlan.sdgExternalName}}}, {{wirelessCartData.sharedDataPlan.sdgData}}</li>
									<li class="price-col">--</li>
									<li class="price-col">--</li>
									<li class="price-col">{{formatAmount wirelessCartData.sharedDataPlan.totalDataPlanAmount}}</li>
								</ul>
							</div>
						</div>				
				</div>
			</div>
		</div>
    </script>
    <script id="internet-summary-info-template" type="text/x-handlebars-template">
		<div class="box">
			<div class="bui-grid-4 header clearfix">
				<div class="bui-block-1 title">Internet Service</div>
				<div class="bui-block-2 price-col">
					<div>Due Today</div>
					<div>--</div>
<!--					<div>{{formatAmount wirelineOneTimeAmount}}</div> -->
				</div>
				<div class="bui-block-3 price-col">
					<div>On First Bill</div>
					<div>{{formatAmount wirelineFirstMonthBillAmount}}</div>
				</div>
				<div class="bui-block-4 price-col">
					<div>Monthly Bill</div>
					<div>{{formatAmount wirelineMonthlyAmount}}</div>
				</div>
			</div>
			<div class="body">
					<div class="product-details clearfix">
						<div class="bui-grid-2 order-item product-capacity-row">
							<div class="bui-block-1 left-column">
								<div class="mini-blue-circle option-circle">
									<span class="capacity-size">{{getFirstWord internetCartData.speedPlanData.speed}}</span><br/>
									<span class="capacity-unit">{{getAllWordsExceptFirst internetCartData.speedPlanData.speed}}</span>
								</div>
							</div>
							<div class="bui-block-2 right-column">
								<div class="item-heading">INTERNET ACCESS</div>
								<ul>
									<li class="desc">{{{internetCartData.speedPlanData.externalName}}} {{internetCartData.speedPlanData.speed}}</li>
									<li class="price-col">--</li>
									<li class="price-col">{{formatAmount internetCartData.speedPlanData.nrcAmount}}</li>
									<li class="price-col">{{formatAmount internetCartData.speedPlanData.mrcAmount}}</li>
								</ul>
								<ul>
									<li class="desc"><span class="item-heading">IP Address:</span> {{{internetCartData.ipAddressData.externalName}}}</li>
									<li class="price-col">--</li>
									<li class="price-col">{{formatAmount internetCartData.ipAddressData.nrcAmount}}</li>
									<li class="price-col">{{formatAmount internetCartData.ipAddressData.mrcAmount}}</li>
								</ul>
								<ul>
									<li class="desc"><span class="item-heading">Equipment:</span> {{{internetCartData.equipmentData.externalName}}}</li>
									<li class="price-col">
											--
									</li>
									<li class="price-col">
                                			{{formatAmount internetCartData.equipmentData.nrcAmount}}
									</li>
									<li class="price-col">--</li>
								</ul>
								<ul>
									<li class="desc"><span class="item-heading">Installation:</span> {{{internetCartData.installationData.externalName}}}</li>
									<li class="price-col">
											--
									</li>
									<li class="price-col">
                                			{{formatAmount internetCartData.installationData.nrcAmount}}
									</li>
									<li class="price-col">--</li>
								</ul>
							</div>
						</div>				
				</div>
			</div>
		</div>
    </script>
    <script id="offers-info-template" type="text/x-handlebars-template">
		<div class="box">
			<div class="bui-grid-4 header clearfix">
				<div class="bui-block-1 title">Special Offers</div>
				<div class="bui-block-2 price-col"></div>
				<div class="bui-block-3 price-col"></div>
				<div class="bui-block-4 price-col"></div>
			</div>
			<div class="body">
					<div class="product-details clearfix">
						<div class="bui-grid-2 order-item product-capacity-row clearfix">
							<div class="bui-block-1 left-column">
								<img src="${contextPath}/web/images/icons/reward.png" alt="Promotions Image" />
							</div>
							<div class="bui-block-2 right-column">
								<div class="item-heading">PROMOTIONS</div>
								{{#if isInternetFamilyInCart}}
									<ul>
										<li class="desc">
											<div>
												<span class="item-heading">Internet Reward Card:</span> Internet Reward Card $150.00
											</div>
										</li>
										<li class="price-col">
										</li>
										<li class="price-col"></li>
										<li class="price-col"></li>
									</ul>
									{{#if internetCartData.equipmentData.promotionInfo}}
									<ul>
										<li class="desc">
											<div>
												<span class="item-heading">Internet Equipment:</span> {{{internetCartData.equipmentData.promotionInfo.displayName}}} {{formatAmount internetCartData.equipmentData.nrcAmount}}
											</div>
										</li>
										<li class="price-col"></li>
										<li class="price-col"></li>
										<li class="price-col"></li>
									</ul>
									{{/if}}
	
	                                {{#isDollarOff snlPromotion}}
	                                <ul>
	                                    <li class="desc">
	                                        <div>
	                                            <span class="item-heading">Bundle Bonus:</span> Extra $50 off tablets
	                                        </div>
	                                    </li>
	                                    <li class="price-col"></li>
	                                    <li class="price-col"></li>
	                                    <li class="price-col"></li>
	                                </ul>
	                                {{/isDollarOff}}
	                                {{#isFreeTablet snlPromotion}}
	                                <ul>
	                                    <li class="desc">
	                                        <div>
	                                            <span class="item-heading">Bundle Bonus:</span> FREE Galaxy Note&reg; 8.0, White, 16GB
	                                        </div>
	                                    </li>
	                                    <li class="price-col"></li>
	                                    <li class="price-col"></li>
	                                    <li class="price-col"></li>
	                                </ul>
	                                {{/isFreeTablet}}
	                             	{{/if}}
	                                {{#if isWirelessFamilyInCart}}
		                                <ul>
		                                    <li class="desc">
		                                        <div>
		                                            <span class="item-heading">Bill Credit:</span> One-time bill credit {{getBillCreditTotalWithCents 100 wirelessCartData.deviceList.length}}
		                                        </div>
		                                    </li>
		                                    <li class="price-col"></li>
		                                    <li class="price-col"></li>
		                                    <li class="price-col"></li>
		                                </ul>
	                                {{/if}}

                            </div>
						<div>
					<div>
			</div>
		</div>
	</script>    
    <script id="order-summary-info-template" type="text/x-handlebars-template">
		<div class="box">
			<div class="bui-grid-4 header clearfix">
				<div class="bui-block-1 title">Order Summary</div>
				<div class="bui-block-2 price-col">
					<div>Due Today</div>
					<div>&nbsp;</div>
				</div>
				<div class="bui-block-3 price-col">
					<div>On First Bill</div>
					<div>&nbsp;</div>
				</div>
				<div class="bui-block-4 price-col">
					<div>Monthly Bill</div>
					<div>&nbsp;</div>
				</div>
			</div>
			<div class="body">
					<div class="product-details clearfix">
						<div class="bui-grid-2 order-item">
							<div class="bui-block-1 left-column">
								&nbsp;
							</div>
							<div class="bui-block-2 right-column">
								<ul>
									<li class="desc item-heading">SUB TOTALS</li>
									<li class="price-col">{{formatAmount subtotalDueNow}}</li>
									<li class="price-col">{{formatAmount subtotalFirstMonth}}</li>
									<li class="price-col">{{formatAmount totalMonthlyAmount}}</li>
								</ul>
								{{#if isWirelessFamilyInCart}}
								<ul>
									<li class="desc">
										<span class="item-heading">ACTIVATION FEE </span>
										{{#each wirelessCartData.deviceList}}
	                                		<div class="bui-p-l-20">
													{{{manufacturerDisplayName}}} {{{externalName}}}
                	                		</div>
                            			{{/each}} 
									</li>
									<li class="price-col">
										{{#each wirelessCartData.deviceList}}
											<span class="text-strikethrough bui-p-r-10">$36.00</span><span class="free-color">FREE</span>
                            			{{/each}} 
									</li>
									<li class="price-col">--</li>
									<li class="price-col">--</li>
								</ul>
								{{/if}}
								{{#if isWirelessShippingMethod}}
								<ul>
									<li class="desc">
										<span class="item-heading">SHIPPING - </span> WIRELESS TABLETS
                            			{{#each shippingMethods.wireless}}
	                                		<div class="bui-p-l-20">
												{{#if isActive}}
                                                    {{productExternalName}} - {{{shippingPromotionPrice yourPrice listPrice}}}
<%--													{{productExternalName}} - {{yourPrice}}--%>
												{{/if}}
                	                		</div>
                            			{{/each}} 
									</li>
<%--                                    <li class="price-col">{{shippingMethods.wirelessShippingAmt}}</li>    --%>
									<li class="price-col">{{shippingPromotionPrice shippingMethods.wirelessShippingAmt shippingMethods.listPrice}}</li>
									<li class="price-col">--</li>
									<li class="price-col">--</li>
								</ul>
								{{/if}}
                				{{#if isWirelineShippingMethod}}
								<ul>
									<li class="desc">
										<span class="item-heading">SHIPPING - </span> INTERNET EQUIPMENT 
                            			{{#each shippingMethods.wireline}}
	                                		<div class="bui-p-l-20">
												{{#if isActive}}
													Standard (2-4 business days) - {{yourPrice}}
												{{/if}}
                	                		</div>
                            			{{/each}}
									</li>
									<li class="price-col">--</li>
									<!--<li class="price-col">{{shippingMethods.wirelineShippingAmt}}</li>-->
									<li class="price-col">{{formatAmount totalShippingFirstMonth}}</li>
									<li class="price-col">--</li>
								</ul>
								{{/if}}
								<ul>
									<li class="desc">
									<span class="item-heading">ESTIMATED TAXES **</span>
									<div>
										{{#if confirmedOrderData.lastSubmittedCartDetails.zipCode}}
											{{confirmedOrderData.lastSubmittedCartDetails.zipCode}}
										{{/if}}
									</div>
									</li>
									<li class="price-col">{{formatAmount confirmedOrderData.lastSubmittedCartDetails.taxAmount}}</li>
									<li class="price-col">--</li>
									<li class="price-col">--</li>
								</ul>
								<ul class="order-totals">
									<li class="desc item-heading">ORDER TOTALS</li>
									<li class="price-col">

                                    <div>Due Today</div>
                                    <div class="amount">
                                        <sup>$</sup>
 										<span class="decimal-amount">{{getDecimalsRunningCartFormat confirmedOrderData.lastSubmittedCartDetails.dueTodayAmount}}</span>
										<sup>{{getCentsRunningCartFormat confirmedOrderData.lastSubmittedCartDetails.dueTodayAmount}}</sup>
									</div>

									</li>
									<li class="price-col">
									    <div>On First Bill</div>
										<div class="amount">
											<sup>$</sup>
    	                        			<span class="decimal-amount">{{getDecimalsRunningCartFormat totalFirstMonth}}</span>
        	                    			<sup>{{getCentsRunningCartFormat totalFirstMonth}}</sup>
										</div>
									</li>
									<li class="price-col">
									    <div>Monthly Bill</div>
										<div class="amount">
											<sup>$</sup>
                            				<span class="decimal-amount">{{getDecimalsRunningCartFormat totalMonthly}}</span>
                            				<sup>{{getCentsRunningCartFormat totalMonthly}}</sup>
										</div>
									</li>
								</ul>
							</div>
						</div>				
				</div>
			</div>
		</div>
    </script>    
</dsp:page>
