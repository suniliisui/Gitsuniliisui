<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<%@ taglib uri="/jstl" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %>

<dsp:page>
<dsp:importbean bean="/com/att/b2b/common/catalog/ProductInfoLookUpDroplet"/>
<dsp:importbean bean="/com/att/b2b/common/catalog/SkuInfoLookUpDroplet"/>
<dsp:importbean bean="/com/att/b2b/commerce/pricing/droplet/ItemPricingAndPromotionDroplet"/>
<dsp:importbean bean="/com/att/b2b/commerce/cart/formHandler/CustomCartModifierFormHandler" />
<dsp:importbean bean="/com/att/b2b/commerce/cart/bean/AddToCartInfo" />
<dsp:importbean bean="/com/att/b2b/commerce/wireless/bean/WirelessInfo" />

<dsp:droplet name="ProductInfoLookUpDroplet">
	<dsp:param name="productId" param="productId"/>
	<dsp:oparam name="output">
		<dsp:getvalueof var="productInfoJSON" param="productInfoJSON"/>
		<dsp:getvalueof var="productInfo" param="productInfo" scope="request"/>
		<dsp:getvalueof var="productGroupInfo" param="productGroupInfo"/>
		<dsp:getvalueof var="productGroupInfoJSON" param="productGroupInfoJSON"/>
	</dsp:oparam>
</dsp:droplet>

<dsp:droplet name="ItemPricingAndPromotionDroplet">
	<dsp:param name="items" value="${productGroupInfo.skuIds}"/>
	<dsp:oparam name="output">
	<dsp:getvalueof var="pricingJSON" param="pricingJSON"/>
	</dsp:oparam>
</dsp:droplet>


<script type="text/javascript">
	var deviceJSONObj = ${productGroupInfoJSON};
	var pricingJSONObj = ${pricingJSON};
</script>


<div id="product-banner-section" class="bui-w-100-percent clearfix bui-m-t-20">
<div class="section-content-wpr clearfix">
	<div class="bui-w-30-percent bui-m-t-105">
		<h1 class="device-title  bui-f50-size bui-active-text-color bui-omnes-light bui-lh-65"></h1>
		<p class="device-description bui-f18-size bui-omnes-med-italic bui-active-text-color"></p>
	</div>

	<div class="bui-w-40-percent bui-float-left">
		<img class="device-gallery-image" src="${contextPath}/web/images/wireless/device/device_placeholder.png" alt="" title=""/>
	</div>

	<div class="bui-w-25-percent bui-float-right bui-m-t-40">
		<div class="device-widget-section bui-p-all-15 clearfix">
			<div class="clearfix">
				<span class="device-title bui-f18-size"></span>
			</div>

			<div class="bui-m-tb-10 bui-h5 clearfix">
				<span class="device-discounted-price bui-f32-size bui-omnes-light bui-active-text-color"></span>
			</div>

			<div class="bui-m-b-10 clearfix bui-m-t-30">
				<div class="bui-float-left bui-f12-size bui-bold bui-display-inline-block bui-lh-30">CAPACITY</div>
				<div class="bui-float-right bui-display-inline-block bui-w-65-percent">
					<select id="chzn-capacity-select" data-placeholder="Choose your service ..." class="bui-w-100-percent bui-display-block">
		            </select>
				</div>
            </div>

			<div id="select-color-section-wpr" class="bui-p-b-20 clearfix">
				<span class="bui-float-left bui-f12-size bui-bold bui-lh-25">COLOR</span><span class="device-colors-section-wpr bui-text-align-right bui-float-right bui-f12-size"></span>
			</div>

			<div class="bui-m-b-10 clearfix bui-m-t-15">
				<span class="bui-float-left bui-f12-size bui-bold">RETAIL PRICE</span><span class="device-original-price bui-text-align-right bui-float-right bui-f12-size"></span>
			</div>

			<div class="bui-m-tb-10 clearfix">
				<span class="bui-float-left bui-f12-size bui-bold">SAVINGS</span><span class="device-contract-saving-price bui-text-align-right bui-float-right bui-f12-size"></span>
			</div>

			<div id="instant-rebate-section-wpr" class="bui-m-tb-10 clearfix">
				<span class="bui-float-left bui-f12-size bui-bold">PROMOTION</span><span class="device-instant-rebate bui-text-align-right bui-float-right bui-f12-size"></span>
			</div>

			<div class="bui-m-tb-10 clearfix">
				<span class="bui-float-left bui-f12-size bui-bold">YOUR PRICE</span><span class="device-discounted-price bui-text-align-right bui-float-right bui-f12-size"></span>
			</div>

			<div id="shipping-details-section-wpr" class="clearfix">
				<hr>
				<p class="bui-text-align-center bui-f12-size bui-m-t-5">Ships <strong class="shipping-date">June 1st, 2013</strong></p>
			</div>


		</div>
		<div id="product-details-widget-btn-wpr" class="clearfix">
			<div id="product-details-buy-now-btn" class="product-details-widget-btn bui-sticky-elem-wpr">
				<a href="javascript: ATTSMB.ProductDetails.addDeviceToOrder()"  class="bui-sticky bui-display-block bui-btn-wpr"><span class="widget-btn bui-button-orange-rectangle bui-display-block bui-p-tb-10">BUY NOW</span></a>
			</div>
			<div id="product-details-preorder-now-btn"  class="product-details-widget-btn bui-sticky-elem-wpr">
				<a href="http://www.att.com" class="bui-sticky bui-display-block bui-btn-wpr"><span class="widget-btn bui-button-orange-rectangle bui-display-block bui-p-tb-10">PRE-ORDER</span></a>
			</div>
			<div id="product-details-out-of-stock-btn"  class="product-details-widget-btn bui-sticky-elem-wpr">
				<a href="javascript: void(0)" class="bui-sticky bui-display-block bui-btn-wpr disabled-anchor-btn"><span class="widget-btn bui-disabled-button-rectangle bui-display-block bui-p-tb-10">OUT OF STOCK</span></a>
			</div>
		</div>
	</div>
	</div>
</div>

<div class="bui-display-none">
	<dsp:form id="device-selection-form">
		<dsp:input id="deviceProductId" type="hidden" bean="WirelessInfo.standaloneDevice" value=""/>
		<dsp:input id="catalogRefId" type="hidden" bean="AddToCartInfo.createOrderGroup.catalogRefId"/>
		<dsp:input id="selectedProductId" type="hidden" bean="AddToCartInfo.createOrderGroup.productId" value="" />
		<dsp:input type="hidden" bean="AddToCartInfo.createOrderGroup.quantity" value="1" />

		<dsp:input type="submit" bean="CustomCartModifierFormHandler.submit" value="BUY NOW"/>
	</dsp:form>
</div>

<dsp:include page="_featuredProductDetailTemplateHolder.jsp">
	<dsp:param name="productId" param="productId"/>
</dsp:include>
</dsp:page>