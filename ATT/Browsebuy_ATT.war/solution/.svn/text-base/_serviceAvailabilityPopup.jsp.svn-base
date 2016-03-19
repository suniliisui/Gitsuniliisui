<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<div class="clearfix" id="service-availability-section-wpr">
	<div class="bui-screen-width clearfix">
		<div class="closeModel bui-text-align-right">
			<a href="javascript:;"><span class="services-sprite close-icon hidden-content">Close Button</span></a>
		</div>
	</div>
	<div id="service-availability-content" class="service-availability-content"></div>
</div>

<div id="addressSuggestions"></div>

<!-- Handle bar template -->
<script id="service-availability-form-template" type="text/x-handlebars-template">
<div class="service-availability-form-content">
	<div class="bui-screen-width clearfix">
		<div class="title">Check Availability in Your Area</div>
		<div class="notes">
			To help you know which plans are available, we need 
		    your location.<br /> Please enter your address and let us check for you.
		</div>
		<form id="service-availability-form">
			<div class="form-row clearfix">
				<div class="form-column">
					<label class="form-label" for="se_addressLine1">ADDRESS
						LINE 1 *</label> <input id="se_addressLine1" type="text" spellcheck="false"
						placeholder="Street Address" value="{{formInputData.se_addressLine1}}"
						class="validate[required, maxSize[40]]" maxLength="40"
						data-errormessage-value-missing="Please enter address for Line 1."
						data-errormessage-range-overflow="The text entered is more than 40 characters." />
				</div>
				<div class="form-column">
					<label class="form-label" for="se_addressLine2">ADDRESS
						LINE 2</label> <input id="se_addressLine2" type="text" spellcheck="false"
						placeholder="Suite, Floor, etc (Optional)"
						value="{{formInputData.se_addressLine2}}"
						class="validate[maxSize[40]]" maxLength="40"
						data-errormessage-value-missing="Please enter address for Line 2."
						data-errormessage-range-overflow="The text entered is more than 40 characters." />
				</div>
				<div class="form-column">
					<label class="form-label" for="se_city">CITY *</label> <input
						id="se_city" type="text" spellcheck="false" placeholder="City"
						value="{{formInputData.se_city}}" class="validate[required, maxSize[40]]"
						maxLength="40"
						data-errormessage-value-missing="Please enter city."
						data-errormessage-range-overflow="The text entered is more than 40 characters." />
				</div>
				<div class="form-column-small">
					<label class="form-label" for="se_state">STATE *</label> <select
						id="se_state" data-placeholder="Select"
                        class="bui-display-block validate[required]"
                        data-errormessage-value-missing = "Please select state.">
						{{{renderState formInputData.se_state}}}
					</select>
				</div>
				<div class="form-column-last">
					<label class="form-label" for="se_postalCode">ZIP CODE *</label> <input
						id="se_postalCode" value="{{formInputData.se_postalCode}}" type="text" placeholder="ZIP Code" maxLength="5"
						data-mask-pattern="00000"
						class="validate[required, custom[number], minSize[5], maxSize[5]]"
						data-errormessage-custom-error="Please enter only digits"
						data-errormessage-value-missing="Please enter ZIP Code."
						data-errormessage-range-underflow="The data entered require minimum 5 digits."
						data-errormessage-range-overflow="The data entered is more than 5 digits." />
				</div>
			</div>
			<div class="bui-grid-2 clearfix">
				<div class="bui-block-1 additional-notes bui-text-align-left">Street
					address of your business.</div>
				<div class="bui-block-2 bui-text-align-right">* Required</div>
			</div>

			<button type="submit" id="service-availability-continue-btn"
				class="bui-button check-availability-btn">Check Availability</button>
		</form>
	</div>
</div>
</script>
<script id="service-availability-view-template" type="text/x-handlebars-template">
<div class="service-availability-form-content">
	<div class="bui-screen-width clearfix">
		<div class="title">{{serviceAddress.se_addressLine1}}{{#if serviceAddress.se_addressLine2}}, {{serviceAddress.se_addressLine2}} {{/if}}
			<br/> {{serviceAddress.se_city}}, {{serviceAddress.se_state}} {{serviceAddress.se_postalCode}}</div>
		<div class="notes">
			Products, services, and prices are linked with the current defined
			location.<br />  You can <a href="javascript:;" class="change-location">change
				location</a> at anytime.
		</div>
	</div>
</div>
<div class="service-availability-view">
	<div class="bui-screen-width clearfix">
		<div class="available-services" id="available-services">
			<%-- <img src="${contextPath}/web/common/images/common/loader-spinner.gif" /> --%>
			<div class="title">Your request is being processed...</div>
		</div>
	</div>
</div>
</script>
<script id="available-services-template" type="text/x-handlebars-template">

	<div class="title">
		{{#if allservicesflag}}
			Wireless & Internet Services
		{{/if}}

		{{#if wirelessonlyflag}}
			Wireless Service
		{{/if}}

		{{#if internetonlyflag}}
			Internet Service
		{{/if}}

		{{#if nointernetflag}}
			Internet Service
		{{/if}}

	</div>
	
	<div class="services clearfix">
		
		{{#if allservicesflag}}
			<div class="service">
				<div class="heading">
					<span class="services-sprite wireless-icon"></span>
					<span class="text"><a href="${contextPath}/solution/buyflow/wireless/deviceCatalog.jsp?mode=add" class="family-cta-btn" data-buyflow="wireless">Wireless Data</a></span>
				</div>
				<p>Stay connected on the go with AT&T. Plus connect for free at thousands of AT&T Wi-Fi Hot Spots nationwide.</p>
			</div>
			
			
			<div class="service">
					<div class="heading">
						<span class="services-sprite internet-icon"></span>
						<span class="text"><a class="shop-internet" href="${contextPath}/solution/buyflow/internet/chooseSpeedOptions.jsp?intState=speeds" class="family-cta-btn" data-buyflow="internet">Internet</a></span>
					</div>
					<p>Select a High Speed Internet plan for your office. Downstream speeds up to 45 Mbps.</p>
			</div>
		{{/if}}

		{{#if wirelessonlyflag}}
			<div class="service">
				<div class="heading">
					<span class="services-sprite wireless-icon"></span>
					<span class="text"><a href="${contextPath}/solution/buyflow/wireless/deviceCatalog.jsp?mode=add" class="family-cta-btn" data-buyflow="wireless">Wireless Data</a></span>
				</div>
				<p>Stay connected on the go with AT&T on a network you can count on. Plus connect for free at thousands of AT&T Wi-Fi hotspots nationwide.</p>
			</div>
		{{/if}}

		{{#if internetonlyflag}}
			<div class="service">
					<div class="heading">
						<span class="services-sprite internet-icon"></span>
						<span class="text"><a class="shop-internet" href="${contextPath}/solution/buyflow/internet/chooseSpeedOptions.jsp?intState=speeds" class="family-cta-btn" data-buyflow="internet">Internet</a></span>
					</div>
					<p>Select a High Speed Internet plan for your office. Downstream speed up to 45 Mbps.</p>
			</div>
		{{/if}}

		{{#if nointernetflag}}
			<div class="service">
					<p>Qualifying internet speed is not available at your location. Please keep shopping at <a href="http://www.att.com/smallbusiness">att.com/smallbusiness</a>.</p>
				</div>
		{{/if}}
		

		{{#if allservicesflag}}
			<div class="buynow-btn">
					<a href="${contextPath}/solution/buyflow/wireless/deviceCatalog.jsp?mode=add" class="family-cta-btn" data-buyflow="wireless-internet">
				        <button class="bui-button">Shop Now</button>
				    </a>
			</div>
		{{/if}}

		{{#if wirelessonlyflag}}
			<div class="buynow-btn">
					<a href="${contextPath}/solution/buyflow/wireless/deviceCatalog.jsp?mode=add" class="family-cta-btn" data-buyflow="wireless">
				        <button class="bui-button">Shop Now</button>
				    </a>
			</div>
		{{/if}}

		{{#if internetonlyflag}}
			<div class="buynow-btn">
							<a class="shop-internet" href="${contextPath}/solution/buyflow/internet/chooseSpeedOptions.jsp?intState=speeds" class="family-cta-btn" data-buyflow="internet">
						        <button class="bui-button">Buy Now</button>
						    </a>
						</div>
		{{/if}}

		{{#if nointernetflag}}
			<div class="buynow-btn">
				<a href="${contextPath}/solution/index.jsp">
				       <button class="bui-button">Learn More</button>
				</a>
			</div>
		{{/if}}
	
	</div>
</script>
<!-- Address Modal -->
<script id="suggested-addresses-template" type="text/x-handlebars-template">
		  <div class="modal fade" id="suggestedAddressesModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		      <div class="modal-content">
		        <div class="modal-header modal-header-custom">
		        	<div class="modal-header-position">
						<div class = "addressIcon"></div>
		         	 	<div id="addressModalTitle">
		         	 		<strong>address verification</strong>
		         	 	</div>
		        	</div>
		        </div>
		        <div class="modal-body">
		        	<div id="address-verification-text" class="address-text">
		        		<strong>We had trouble locating your address.</strong><br>
		        		Please verify the address you provided is correct.<br>
		        		Select an address below or keep the current one.
		        	</div>
	        		<div id="address-edit-text" class="address-text">		        		
	        				<strong>address entered </strong>
							<a id = "modalEditAddress" class="editAddress">Edit</a><br>	        				
							<div id = "modalUpdateAddress" class = "modalUpdateAddress">
		        				<div id = "modalAddress"> 
									<span id="editAddress1">{{{serviceAddress.se_addressLine1}}} {{{serviceAddress.se_addressLine2}}}<br></span>
	        						<span id="editcitystatezip">{{{serviceAddress.se_city}}}, {{{serviceAddress.se_state}}} {{{serviceAddress.se_postalCode}}}<br></span>		        				        	
							</div>	        			
							<a id="keep-current-address" class ="keep-current-address">Keep Address</a>
						</div>
	        		</div>
	        		<div id="addresses" class="antiscroll-wrap">												
						<div class="antiscroll-inner">
	        				<ul id="suggestedAddresses">
								{{#each suggestedAddresses}}
									<li id="addressNum-{{@index}}" class="suggestedAddress">{{{se_addressLine1}}}  {{{se_addressLine2}}}  {{{se_city}}} {{{se_state}}} {{{se_postalCode}}}</li>
								{{/each}}		       				
	        				</ul>
						</div>														
	        		</div>	
	        		<div class = "continueBtn" >
						<div class="bui-m-tb-15 bui-text-align-center clearfix">
		    				<button id="suggessted-address-continue-btn" class="bui-button-disable">Continue</button>
						</div>
	        		</div>	        	
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</script>
</dsp:page>