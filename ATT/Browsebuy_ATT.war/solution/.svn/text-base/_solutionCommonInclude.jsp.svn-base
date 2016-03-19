<%@ taglib uri="/dspTaglib" prefix="dsp"%>

<dsp:page>
<!-- warning Modal -->
<div class="modal fade" id="att-warning-modal-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <div class="modal-header">
      	<div id="modal-header-icn-wpr" class="clearfix">
			<img src="${contextPath}/web/images/icons/error_sprite.png" alt="error icon"/>
      	</div>
        <h4 class="modal-title" id="myModalLabel">Warning</h4>
      </div>
      
      <div class="modal-body">
        ...
      </div>
      
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script id="default-warning-popup-template" type="text/x-handlebars-template">
	Default warning message..
</script>

<!-- information Modal -->
<div class="modal fade" id="att-info-modal-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <div id="modal-header-info-wpr" class="clearfix">
                    <img src="${contextPath}/web/images/icons/information-warning.png" alt="error icon"/>
                </div>
                <h4 class="modal-title" id="info-modal-title">Please Note</h4>
            </div>

            <div class="modal-body">
                ...
            </div>

        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Error Modal window Modal -->
<div class="modal fade" id="att-error-modal-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <div class="modal-header">
      	<div id="modal-header-icn-wpr" class="clearfix">
			<img src="${contextPath}/web/images/icons/error_sprite.png" alt="error icon"/>
      	</div>
        <h4 class="modal-title" id="myModalLabel">Error</h4>
      </div>
      
      <div class="modal-body">
		...
      </div>
      
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<%-- Promotion popup modal --%>
<div class="modal fade" id="att-promotion-modal-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <div id="modal-header-info-wpr" class="clearfix">
                    <img src="${contextPath}/web/images/icons/information-warning.png" alt="error icon"/>
                </div>
                <h4 class="modal-title" id="info-modal-title">BUNDLE BONUS</h4>
            </div>

            <div class="modal-body">
                <div class="clearfix">
                    <div>Select the Bundle Bonus that you would like to apply to your order</div>
                </div>
                <div class="bui-grid-2 clearfix bui-p-tb-15">
                    <div class="bui-block-1">
                        <button class="bui-button select-offer" data-select-promo="dollars-off">Extra $50 off tablets</button>
                    </div>
                    <div class="bui-block-2">
                        <button class="bui-button select-offer" data-select-promo="free-offer">FREE Galaxy Note&reg;8.0</button>
                    </div>
                </div>

<%--                <div class="clearfix footer-wpr">

                </div>--%>
            </div>

        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<%--end of promotion popup modal --%>

<script id="default-error-template" type="text/x-handlebars-template">
<div class="clearfix">{{msg}}</div>
<div class="clearfix footer-wpr bui-p-t-10">
	<a href="http://www.att.com/smallbusiness"> <button class="bui-button">OK</button></a>
</div>
</script>

<script id="default-info-popup-template" type="text/x-handlebars-template">
    <div class="clearfix">{{msgText}}</div>
    <div class="clearfix footer-wpr bui-p-t-10">
<%--        <a href="javascript: void(0)"> <button class="bui-button-disable" data-dismiss="modal">CANCEL</button></a>--%>
        <a href="javascript: void(0)"> <button class="bui-button info-btn">Continue</button></a>
    </div>
</script>

<%-- View template: Internet 'BUY NOW/CONFIGURE' CTA button --%>
<script id="internet-buynow-btn-template" type="text/x-handlebars-template">
    <a href="${contextPath}/solution/buyflow/internet/chooseSpeedOptions.jsp?intState=speeds" class="configure-internet-btn"> <button class="bui-button">Buy Now</button></a>
</script>
<%-- EndOf: View template: Internet 'BUY NOW/CONFIGURE' CTA button --%>

<%-- View template: Internet 'Check Availability' CTA button --%>
<script id="internet-checkavail-btn-template" type="text/x-handlebars-template">
    <a class="checkAvailability" href="javascript:void(0)" data-buyflowtype="internetflow"> <button class="bui-button">Check Availability</button></a>
</script>
<%-- EndOf: View template: Internet 'Check Availability' CTA button --%>

<%-- View template: Internet 'SEE MORE OPTIONS' CTA button --%>
<script id="internet-seeoptions-btn-template" type="text/x-handlebars-template">
    <a href="${contextPath}/solution/index.jsp"> <button class="bui-button">See Other Options</button></a>
</script>
<%-- EndOf: View template: Internet 'SEE MORE OPTIONS' CTA button --%>

<%-- Feedback panel used to push messages - MsgTypes: error, success, info --%>
<script id="feedback-panel-template" type="text/x-handlebars-template">
	<div class="feedback-wpr {{msgType}} no-print">
		<div class="feedback-content bui-screen-width clearfix">
			<div class="bui-grid-3">
				<div class="bui-block-1 feedback-sprite {{msgType}}">
					{{toUpperCase msgType}}
				</div>
				<div class="bui-block-2">{{msg}}</div>
				<div class="bui-block-3 feedback-sprite close"></div>
			</div>
		</div>
	</div>
</script>

<%-- Feedback panel placeholder --%>
<div id="feedback-panel"></div>
</dsp:page>