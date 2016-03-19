<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
    <%-- Order summary template --%>
    <script id="order-summary-template" type="text/x-handlebars-template">
        <div class="order-summary bui-screen-width">
            <div class="header bui-grid-4 clearfix row">
                <div class="bui-block-1 col1-title col1">
                    Order Summary
                </div>
                <div class="bui-block-2 col2-title col2">
                    Due Today
                </div>
                <div class="bui-block-3 col3-title col3">
                    On First Bill
                </div>
                <div class="bui-block-4 col4-title col4">
                    Monthly Bill
                </div>
            </div>
            <div class="content">
                <div id="subtotal" class="bui-grid-4 clearfix row">
                    <div class="bui-block-1 col1">
                        SUBTOTAL
                    </div>
                    <div id="subtotal-due-today" class="bui-block-2 col2">
                        <span class="decimal-amount">{{formatAmount subtotalDueNow}}</span>
                    </div>
                    <div id="subtotal-invoice" class="bui-block-3 col3">
                        <span class="decimal-amount">{{formatAmount subtotalFirstMonth}}</span>
                    </div>
                    <div id="subtotal-monthly" class="bui-block-4 col4">
                        <span class="decimal-amount">{{formatAmount subtotalMonthly}}</span>
                    </div>
                </div>
               	{{#if isWirelessFamilyInCart}}
				<div id="saving" class="bui-grid-4 clearfix row">
                    <div class="bui-block-1 col1">
                        ACTIVATION FEE
                    </div>
                    <div id="saving-due-today" class="bui-block-2 col2">
                        <span>&nbsp</span>
                    </div>
					<div id="saving-invoice" class="bui-block-3 col3">
                        <span>&nbsp</span>
                    </div>
                    <div id="saving-monthly" class="bui-block-4 col4">
                        <span>&nbsp</span>
                    </div>
					{{#each wirelessCartData.deviceList}}
						<div id="saving" class="bui-grid-4 clearfix row">
                    		<div class="bui-block-1 col1">
                       			<span class="sub-col">{{{manufacturerDisplayName}}} {{{externalName}}}</span>
                        	</div>
							<div id="saving-due-today" class="bui-block-2 col2">
                        	<span class="text-strikethrough bui-p-r-10">$36.00</span><span class="free-color">FREE</span>
                    		</div>
                    		<div id="saving-invoice" class="bui-block-3 col3">
                        	--
                    		</div>
                    		<div id="saving-monthly" class="bui-block-4 col4">
                        	--
                    		</div>
						</div>
                     {{/each}}
                </div>
				{{/if}}
                {{#if isWirelessShippingMethod}}
                <div id="w-shipping" class="bui-grid-4 clearfix row w-shipping">
                    <div class="bui-block-1 col1 equal-col">
                        <div class="title">
                            SHIPPING - <span class="title-detail">WIRELESS TABLETS</span>
                        </div>
                        <div class="shipping-method">
                            {{#each shippingMethods.wireless}}
                                <div id="w-{{value}}" class="field-container">
                                    <input type="radio" id="w-shipping-{{value}}" name="wireless-shipping" value="{{value}}" {{isChecked isActive}}
                                        data-prodid="{{prodId}}" data-skuid="{{skuId}}">
                                    <label class="shipping-label">{{productExternalName}} - {{{shippingPromotionPrice yourPrice listPrice}}}
                                    </label>
                                </div>
                            {{/each}}
                        </div>

                    </div>
                    <div class="bui-block-2 col2 equal-col">
                        <div id="w-shipping-due-today">
                            {{shippingPromotionPrice shippingMethods.wirelessShippingAmt shippingMethods.listPrice}}
                        </div>
                    </div>
                    <div class="bui-block-3 col3 equal-col">
                    </div>
                    <div class="bui-block-4 col4 equal-col">
                    </div>
                </div>
                {{/if}}
                {{#if isWirelineShippingMethod}}
                <div id="int-shipping" class="bui-grid-4 clearfix row int-shipping">
                    <div class="bui-block-1 col1 equal-col">
                        <div class="title">
                            SHIPPING - <span class="title-detail">INTERNET EQUIPMENT</span>
                        </div>
                        <div class="shipping-method">
                            {{#each shippingMethods.wireline}}
                                <div id="int-{{value}}" class="field-container">
                                    <input type="hidden" id="int-shipping-{{value}}" name="int-shipping" value="{{value}}" {{isChecked isActive}}
                                    data-prodid="{{prodId}}" data-skuid="{{skuId}}">
                                    <label class="int-shipping-label">Standard (2-4 business days) - {{yourPrice}}
                                    </label>
                                </div>
                            {{/each}}
                        </div>

<%--                        <div class="shipping-method">
                            <div id="int-standard" class="field-container">
                                <input type="radio" id="int-shipping-standard" name="int-shipping" value="standard" checked>
                                <label class="shipping-label">Standard (2-4 business days) - $14.99
                                </label>
                            </div>
                            <div id="int-express" class="field-container">
                                <input type="radio" id="int-shipping-express" name="int-shipping" value="express">
                                <label class="shipping-label">Express (next business day) - $20.99</label>
                            </div>
                        </div>--%>

                    </div>
                    <div class="bui-block-2 col2 equal-col">
                        <div id="int-shipping-due-today">
                            <!--{{shippingMethods.wirelineShippingAmt}}-->
                        </div>
                    </div>
                    <div class="bui-block-3 col3 equal-col">
<span class="decimal-amount">{{formatAmount totalShippingFirstMonth}}</span>
                    </div>
                    <div class="bui-block-4 col4 equal-col">
                    </div>
                </div>
                {{/if}}
                <div id="sales-tax" class="bui-grid-4 clearfix row sales-tax">
                    <div class="bui-block-1 col1  equal-col">
                        <div class="sales-tax-wpr" id="sales-tax-zipcode-form-wpr">ESTIMATE SALES TAX  {{#if taxZipCode}}<a href="javascript: void(0);" class="sales-tax-zipcode">Edit</a>{{/if}}
							<div>
								<a href="javascript: void(0);" class="sales-tax-zipcode">
									{{#if taxZipCode}}
										{{taxZipCode}}
									{{else}}
										Enter ZIP Code
									{{/if}}
								</a>
							</div>
						</div>
<%--                    <div></div>--%>
                    </div>
                    <div id="sale-tax-due-today" class="bui-block-2 col2 equal-col">
                        <span class="decimal-amount">{{formatAmount taxAmount}}</span>
                    </div>
                    <div id="sale-tax-invoice" class="bui-block-3 col3 equal-col">
                        shown on bill
                    </div>
                    <div id="sale-tax-monthly" class="bui-block-4 col4 equal-col">
                        shown on bill
                    </div>
                </div>
                <div id="total" class="bui-grid-4 clearfix row order-total">
                    <div class="bui-block-1 col1">
                        ORDER TOTAL
                    </div>
                    <div class="bui-block-2 col2">
                        <div>
                            Due Today
                        </div>
                        <div id="total-due-today" class="total-due-today amount">
                            <sup>$</sup>
                            <span class="decimal-amount">{{getDecimalsRunningCartFormat totalAmountDueNow}}</span>
                            <sup>{{getCentsRunningCartFormat totalAmountDueNow}}</sup>
                        </div>
                        <div id="total-checkout-btn" class="checkout-btn">
                            <button id="checkout-bottom-btn" class="bui-button-orange-small">Check Out</button>
                        </div>

                    </div>
                    <div class="bui-block-3 col3">
                        <div>
                            On First Bill
                        </div>
                        <div id="total-invoice" class="total-invoice amount">
                            <sup>$</sup>
                            <span class="decimal-amount">{{getDecimals totalFirstMonth}}</span>
                            <sup>{{getCents totalFirstMonth}}</sup>
                        </div>
                    </div>
                    <div class="bui-block-4 col4">
                        <div>
                            Monthly Bill
                        </div>
                        <div id="total-monthly" class="total-monthly amount">
                            <sup>$</sup>
                            <span class="decimal-amount">{{getDecimalsRunningCartFormat totalMonthly}}</span>
                            <sup>{{getCentsRunningCartFormat totalMonthly}}</sup>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bui-grid-4 clearfix footer">
                <div id="save-cart-btn" class="bui-block-1 col1">
                </div>
                <div id="retrieve-cart-btn" class="bui-block-2 col2">
                </div>
                <div class="bui-block-3 col3">
                    <a href="#" id="empty-cart-btn">Empty Cart</a>
                </div>
                <div class="bui-block-4 col4">
                    <a href="${contextPath}" id="keep-shopping-btn">Keep Shopping</a>
                </div>
            </div>
        </div>
    </script>
<script id="sales-tax-form-template" type="text/x-handlebars-template">
<div class="sales-tax-form clearfix">
<form id="sales-tax-form">
	<div class="postalcode">
		<label class="form-m-label" for="sales_tax_postalCode">ESTIMATE SALES TAX **</label> 
		<input id="sales_tax_postalCode" type="text" value="{{taxZipCode}}"
			placeholder="XXXXX" maxLength="5"
			data-mask-pattern="00000"
			class="validate[required,funcCall[AttErrorFunction.zipCode]]" />
	</div>
	<a href="javascript: void(0);" id="calc-sales-tax" class="cta-btn"> <button
		class="bui-button">Estimate</button>
	</a>
	<a href="javascript: void(0);" id="close-sales-tax-form" class="cta-btn"> <button
		class="bui-button">Cancel</button>
	</a>
</form>
</div>
</script>

<script id="special-offers-template" type="text/x-handlebars-template">
	<div class="bui-p-lr-10 clearfix">
		<div class="section-wpr clearfix">
			<span class="row-hdr">Special Offers</span>
		</div>
		<div class="row-section-wpr clearfix" id="row-1">
		
		{{#if isInternetFamilyInCart}}
				<div class="section-container bui-m-tb-20">
					<div class="bui-m-r-10">
						<div class="section-block-wpr">
							<div class="text-wpr bui-m-b-20">
								<div class="section-category">REWARD CARD</div>
								<div>Internet Service</div>
							</div>
							<div class="section-block">
								<div class="section-content">
									<div class="mini-orange-circle option-circle">
	                                    <div class="capacity-size">
	                                        <sup>$</sup>
	                                        <span class="decimal-amount">150</span>
	                                        <sup>00</sup>
	                                    </div>
										<span class="capacity-unit">Reward Card</span>
									</div>
									<div class="display-type">Internet Reward Card</div>
									<div>$150.00</div>
								</div>
								<div class="section-price-wpr bui-p-all-10">
									<div class="price-label">
											<a href="${contextPath}/cms/pages/legal/promotions/hsi-reward-card-promotion.jsp" class="tnc-modal-link">Terms & Conditions</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			
			{{#if internetCartData.equipmentData.promotionInfo}}
				<div class="section-container bui-m-tb-20">
					<div class="bui-m-r-10">
						<div class="section-block-wpr">
							<div class="text-wpr bui-m-b-20">
								<div class="section-category">REBATE</div>
								<div>Internet Equipment</div>
							</div>
							<div class="section-block">
								<div class="section-content">
									<div class="mini-orange-circle option-circle">
	                                    <div class="capacity-size">
	                                        <sup>$</sup>
	                                        <span class="decimal-amount">{{getDecimalsRunningCartFormat internetCartData.equipmentData.nrcAmount}}</span>
	                                        <sup>{{getCentsRunningCartFormat internetCartData.equipmentData.nrcAmount}}</sup>
	                                    </div>								 
										<span class="capacity-unit">Rebate</span>
									</div>
									<div class="display-type">{{{internetCartData.equipmentData.promotionInfo.displayName}}}</div>
									<div>{{formatAmount internetCartData.equipmentData.nrcAmount}}</div>
								</div>
								<div class="section-price-wpr bui-p-all-10">
									<div class="price-label">
											<a href="${contextPath}/cms/pages/legal/promotions/wireline-rebate-disclaimers.jsp" data-showContent="{{internetCartData.internetProductType}}" class="tnc-modal-link">Terms & Conditions</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{{/if}}
	        {{#isDollarOff snlPromotion}}
				 <div class="section-container bui-m-tb-20">
					<div class="bui-m-r-10">
						<div class="section-block-wpr">
							<div class="text-wpr bui-m-b-20">
								<div class="section-category">BUNDLE BONUS</div>
								<div>Additional Discount</div>
							</div>
							<div class="section-block">
								<div class="section-content">
									<div class="mini-orange-circle option-circle">
	                                    <div class="capacity-size">
	                                        <sup>$</sup>
	                                        <span class="decimal-amount">50</span>
	                                        <sup>00</sup>
	                                    </div>								 
										<span class="capacity-unit">per tablet</span>
									</div>
									<div class="display-type">Additional Discount</div>
									<div>$50.00/tablet</div>
								</div>
								<div class="section-price-wpr bui-p-all-10">
									<div class="price-label">
											<a href="${contextPath}/cms/pages/legal/promotions/bundle-promotion.jsp" data-showContent="" class="tnc-modal-link">Terms & Conditions</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> 
	        {{/isDollarOff}}
	
	        {{#isFreeTablet snlPromotion}}
				 <div class="section-container bui-m-tb-20">
					<div class="bui-m-r-10">
						<div class="section-block-wpr">
							<div class="text-wpr bui-m-b-20">
								<div class="section-category">BUNDLE BONUS</div>
								<div>Free Tablet</div>
							</div>
							<div class="section-block">
								<div class="section-content">
									<div class="image-wpr bui-p-t-20">
										<img class="image-holder" src="${contextPath}/web/images/wireless/device/samsung/galaxynote/retina/free_samsung_note_8_front_white.png" alt="">
									</div>
									<div class="display-text">Galaxy Note&reg; 8.0</div>
									<div>White, 16GB</div>
								</div>
								<div class="section-price-wpr bui-p-all-10">
									<div class="price-label">
											<a href="${contextPath}/cms/pages/legal/promotions/bundle-promotion.jsp" data-showContent="" class="tnc-modal-link">Terms & Conditions</a>
									</div>
									<div class="">FREE</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	        {{/isFreeTablet}}
	      {{/if}}
		{{#if isWirelessFamilyInCart}}	      
				<div class="section-container bui-m-tb-20">
					<div class="bui-m-r-10">
						<div class="section-block-wpr">
							<div class="text-wpr bui-m-b-20">
								<div class="section-category">BILL CREDIT</div>
								<div>Wireless Service</div>
							</div>
							<div class="section-block">
								<div class="section-content">
									<div class="mini-orange-circle option-circle">
	                                    <div class="capacity-size">
	                                        <sup>$</sup>
	                                        <span class="decimal-amount">{{getBillCreditTotal 100 wirelessCartData.deviceList.length}}</span>
	                                        <sup>00</sup>
	                                    </div>

										<span class="capacity-unit">Bill Credit</span>
									</div>
									<div class="display-type">One-time bill credit</div>
									<div>{{getBillCreditTotalWithCents 100 wirelessCartData.deviceList.length}}</div>
								</div>
								<div class="section-price-wpr bui-p-all-10">
									<div class="price-label">
											<a href="${contextPath}/cms/pages/legal/promotions/wireless-billcredit-promotion.jsp" class="tnc-modal-link">Terms & Conditions</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		{{/if}}			
		</div>		
	</div>
	<div class="modal fade hide tnc-modal" id="tncModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<div class="bui-grid-2 clearfix">
				<div class="bui-block-1 tnc-title">
					Terms & Conditions
				</div>
				<div class="bui-block-2 bui-text-align-right">
			        <a type="button" class="print-icon bui-m-r-10" data-printarea="modal-tnc-content" title="Print Terms and Conditions"></a>
					<a type="button" class="services-sprite close-icon bui-text-align-right" data-dismiss="modal" aria-hidden="true" title="Close Terms and Conditions Modal Window"></a>
				</div>
			</div>
  		</div>
  			<div class="modal-body" id="modal-tnc-content">
  			</div>
	</div>
</script>

<script id="empty-cart-popUp-template" type="text/x-handlebars-template">

	<div class="clearfix">
		<div>Are you sure you would like to empty your shopping cart?</div>
	</div>

	<div class="clearfix footer-wpr bui-m-tb-30">
		 <button class="bui-button-grey empty-cart-btn" data-empty-cart="keep-cart">No</button>
		 <button class="bui-button empty-cart-btn" data-empty-cart="remove-cart">Yes</button>
	</div>

</script>

</dsp:page>