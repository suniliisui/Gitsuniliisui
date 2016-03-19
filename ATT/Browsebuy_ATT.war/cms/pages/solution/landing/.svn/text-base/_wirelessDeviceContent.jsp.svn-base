<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/jstl" prefix="c"%>
<%@ taglib uri="/jstl/functions" prefix="fn"%>
<%@ taglib uri="/dspTaglib" prefix="dsp"%>

<dsp:page>
	<dsp:importbean
		bean="/com/att/b2b/commerce/filter/droplet/BuyFlowNoFilterDroplet" />
	<dsp:importbean
		bean="/com/att/b2b/commerce/pricing/droplet/LowestProductPriceItemDroplet" />
		
	<dsp:importbean bean="/atg/dynamo/droplet/ForEach" />
	
	
	
		<dsp:droplet name="BuyFlowNoFilterDroplet">
		<%-- <dsp:param name="slotId" value="ALL_TABS_BNB" /> --%>
		<dsp:param name="slotId" value="E_WIR_FEATURED_PRODS_SLOT"/>

		<dsp:oparam name="output">
			<dsp:getvalueof var="v_product" param="PRODUCTS_OUTPUT" />
			<div id="featured-devices-section-wpr" class="featured-devices-section-wpr content-wpr clearfix content"
						class="content-wpr clearfix content clearfix">
						<div class="bui-screen-width clearfix bui-m-t-50">
							<h4 id="section-insert"class="section-title"> 
								 Tablets in the offer.</h4>
							<div class="featured-devices-note bui-m-t-20">
								<p class="">
								The functionality you need, the sleek styling you love:
								 choose the device that best suits your on-the-go lifestyle.								
								  </p>
							</div>
							<div id="featured-device-parent-wpr"
								class="bui-m-lr-10 bui-m-tb-20 clearfix">
								<div class="bui-grid-4">
			<dsp:droplet name="ForEach">
				<dsp:param name="array" value="${v_product}" />
				<dsp:param name="elementName" value="productInfo" />
				<dsp:getvalueof var="size" param="size"/>
				<dsp:oparam name="outputStart">
					
				</dsp:oparam>
				<dsp:oparam name="output">
					<dsp:getvalueof var="count" param="count"/>
					<dsp:getvalueof var="productDisplayName" param="productInfo.productExternalName" />
					<dsp:getvalueof var="productId" param="productInfo.productId" />
					
					
					<dsp:getvalueof var="manufacturerDisplayName" param="productInfo.manufacturerDisplayName" />
					<dsp:getvalueof var="productItem" param="productInfo.productItem.childSKUs" />

					<dsp:droplet name="LowestProductPriceItemDroplet">
						<dsp:param name="items" value="${productItem}" />
						<dsp:oparam name="output">
						  <dsp:getvalueof var="cachedItem" param="cachedPriceItem" />
						   <dsp:getvalueof var="myEstimatedPrice" param="cachedPriceItem.priceAfterAppliedDiscount" />
						   <dsp:getvalueof var="smallImageUrl" param="cachedPriceItem.smallImageURL" />
						   <dsp:getvalueof var="skuId" param="cachedPriceItem.skuId" />
						</dsp:oparam>
					</dsp:droplet>
					<div class="bui-block-${count} device-section-content">
						<div class="section-device-title">
							<div class="">${manufacturerDisplayName}</div>
							<div class="">${productDisplayName}</div>
						</div>
						<div class="device-image-holder">
							<img alt="${manufacturerDisplayName} ${productDisplayName}"
								src="${contextPath}${smallImageUrl}" />
						</div>
						<div class="device-section-price-wpr">
						<div class="device-section-note bui-m-t-15 bui-m-r-45">
									From</div>
							<c:set var="priceParts"
								value="${fn:split(myEstimatedPrice, '.')}" />
							<span class="device-section-currency-symbol">$</span> <span
								class="device-section-total-price">${priceParts[0]}</span>
								
							<span class="device-section-currency-cents">
								<c:choose>
									<c:when test="${(fn:length(priceParts) eq 1) || priceParts[1] == '0' }">00</c:when>
									<c:otherwise>${priceParts[1]}</c:otherwise>
								</c:choose>
							</span>		
						</div>
						<div class="bui-m-tb-25">
							<a href="${contextPath}/solution/buyflow/wireless/chooseDevice.jsp?productId=${productId}&skuId=${skuId}&mode=add" class="select-btn"  data-buyflow="wireless"> <button
								class="bui-button ${productId} ${skuId}">Learn More</button>
							</a>
						</div>
					</div>
				</dsp:oparam>
				
			</dsp:droplet>
																	
						</div>
					</div>
				</div>
			</div>
				
			
		</dsp:oparam>
	</dsp:droplet>
	
	
	
	

										
										
</dsp:page>