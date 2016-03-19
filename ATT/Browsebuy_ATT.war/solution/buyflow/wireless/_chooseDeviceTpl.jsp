<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<script id="device-config-template" type="text/x-handlebars-template">
<%--    <div class="device-details-hdr bui-m-tb-15 bui-m-l-10">Device Details</div>--%>
<%--    <div class="bui-m-t-20  bui-m-b-15 bui-m-l-10"><span>Available Colors</span></div>--%>
    <div class="bui-m-t-10 bui-m-b-5  bui-m-lr-20"><span class="color-title">Available Colors</span></div>
    <div id="device-color-wpr" class="bui-m-l-20 clearfix">

    {{#each distinctColors}}
        <span class="device-color-mask-wpr">
            <a id="device-color-{{{getColorName this}}}" class="color-chip-sprite device-color" data-color="{{{getColorName this}}}" href="javascript: void(0)"><span class="hidden-content">{{{getColorName this}}}</span></a>
            <span class="color-wpr" style="background-color: {{{getColorHex this}}}">&nbsp;</span>
        </span>
    {{/each}}

    </div>

<%--    <div class="bui-m-t-20 bui-m-b-15 bui-m-l-10"><span>Available Storage</span></div>--%>
    <div class="bui-m-t-10 bui-m-b-5  bui-m-lr-20"><span class="color-title">Available Storage</span></div>
    <div id="device-mem-wpr" class="bui-m-l-20 bui-grid-{{dynSortedMemArray.length}} clearfix">
        {{#each dynSortedMemArray}}
            <div id="device-mem-{{this}}" class="bui-block-{{setIndex @index}} device-mem-size memory-block unavailable current-selection"
                 data-memory="{{this}}">
					<a href="javascript: void(0)">
                        {{getMemorySize this}}{{getMemoryUnit this}}
                    </a>
            </div>

        {{/each}}
    </div>
<%--    <div id="price-detail" class="price-detail">
        <div id="your-price" class="bui-grid-2 clearfix your-price">
            <div class="bui-block-1 text"> Regular Price</div>
            <div class="bui-block-2 number">$749.99</div>
        </div>
        <div id="savings" class="bui-grid-2 clearfix savings">
            <div class="bui-block-1 text">Savings</div>
            <div class="bui-block-2 saving-number number">$270.99</div>
        </div>
        <div id="promotion" class="bui-grid-2 clearfix promotion">
            <div class="bui-block-1 text">Promotion</div>
            <div class="bui-block-2 promotion-number number">$0.99</div>
        </div>
    </div>--%>

</script>

<script id="device-price-unavailable-template" type="text/x-handlebars-template">
This color and memory size combination is not available.
</script>

<script id="device-cta-unavailable-template" type="text/x-handlebars-template">
<div class="bui-m-t-40 bui-m-b-70">
	 <a href="#">
		 <button class="bui-button-disable">Unavailable</button>
	 </a>
</div>
</script>

<script id="device-cta-outofstock-template" type="text/x-handlebars-template">
<div class="bui-m-t-40 bui-m-b-70">
	 <a href="#">
		 <button class="bui-button-disable">Out of Stock</button>
	 </a>
</div>
</script>

<script id="device-price-template" type="text/x-handlebars-template">

    <div id="price-detail" class="price-detail">
        <div id="your-price" class="bui-grid-2 clearfix your-price">
            <div class="bui-block-1 text"> Regular Price</div>
            <div class="bui-block-2 number">{{originalPrice}}</div>
        </div>
        <div id="savings" class="bui-grid-2 clearfix savings">
            {{renderContractSaving contractSavings}}
        </div>
        <div id="promotion" class="bui-grid-2 clearfix promotion">
            {{renderPromotion instantDiscount}}
        </div>
    </div>

    <div id="final-price" class="final-price bui-grid-2 clearfix">
        <div class="bui-block-1 due-today-text">
            Due Today
        </div>
        <div class="bui-block-2 due-today-number">
            <sup class="dollar-sign">{{getFormatDollar yourPrice}}</sup>
            <span>{{getFormatPrice yourPrice}}</span>
            <sup class="cents">{{getFormatCents yourPrice}}</sup>
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

<script id="device-gallery-img-template" type="text/x-handlebars-template">
<div class="bui-grid-3">
	<div class="bui-block-1">
		<a class="gallery-thumbnail" href="javascript: void(0)"><img src="${contextPath}{{auxiliaryMedia.DeviceView1}}" alt="image front view" /></a>
	</div>
	<%--<div class="bui-block-2">
		<a class="gallery-thumbnail" href="javascript: void(0)"><img src="${contextPath}{{auxiliaryMedia.DeviceView2}}" alt="image back view" /></a>
	</div>
	<div class="bui-block-3">
		<a class="gallery-thumbnail" href="javascript: void(0)"><img src="${contextPath}{{auxiliaryMedia.DeviceView3}}" alt="image side view" /></a>
	</div>--%>
</div>
</script>

<script id="device-hero-img-template" type="text/x-handlebars-template">
<img class="hero-image" src="${contextPath}{{auxiliaryMedia.DeviceView1}}" alt="tablet large view" />
</script>
<script id="device-details-header-template" type="text/x-handlebars-template">
	<div class="bui-grid-3 clearfix pageContentHeaderSection">
          <div class="bui-block-a">
              <a href="{{changeDeviceUrl}}"><span class="arrow-left-icon"></span> {{changeDeviceUrlText}}</a>
	</div>
	<div class="bui-block-b page-content-header">
		Configure Your {{convertNumberToText device}} Tablet
	</div>
	<div class="bui-block-c">
	</div>
</div>
</script>
</dsp:page>