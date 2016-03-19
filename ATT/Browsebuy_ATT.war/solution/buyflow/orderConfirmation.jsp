<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
        <title>*AT&amp;T Small Business Home - Order
         Confirmation</title>

            <%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>
        <link rel="stylesheet" type="text/css"
              href="${contextPath}/web/css/orderConfirmation.css" />
            <%-- StartOf: Page Specific Styles (page_specific). --%>

<!--BEGIN QUALTRICS POPUP-->
<script type="text/javascript">
var q_viewrate=100;
if (Math.random() < q_viewrate / 100){var q_popup_f = function(){var q_script = document.createElement("script");var q_popup_g = function(){new QualtricsEmbeddedPopup({
                id: "SV_9n6l5K5UqcmmDop",
                imagePath: "https://qdistribution.qualtrics.com/WRQualtricsShared/Graphics/",
                surveyBase: "http://attisd.az1.qualtrics.com/WRQualtricsSurveyEngine/",
                delay:500,
                preventDisplay:0,
                animate:true,
                width:500,
                height:300,
                surveyPopupWidth:900,
                surveyPopupHeight:600,
                startPos:"ML",
                popupText:"Thank you for placing an order with AT&T.  Please consider taking this quick survey (about 10 questions) regarding your online experience to help us improve the AT&T website.  Your participation is completely voluntary and you will still be able to view your order confirmation upon the conclusion of the survey. Regards, AT&T User Experience Research team",
                linkText:"Start Survey"
});};q_script.onreadystatechange= function () {if (this.readyState == "loaded") q_popup_g();};q_script.onload= q_popup_g;q_script.src="https://qdistribution.qualtrics.com/WRQualtricsShared/JavaScript/Distribution/popup.js";document.getElementsByTagName("head")[0].appendChild(q_script);};if (window.addEventListener){window.addEventListener("load",q_popup_f,false);}else if (window.attachEvent){r=window.attachEvent("onload",q_popup_f);}else {};};
</script>
<noscript><a target="_blank" href="http://attisd.az1.qualtrics.com/WRQualtricsSurveyEngine/?SID=SV_9n6l5K5UqcmmDop">Start Survey</a><br/></noscript>
<!--END QUALTRICS POPUP--> 


    </head>

        <%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="OrderConfirmation" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>
    
<%-- StartOf: Atlas tracking script --%>
<iframe src="https://iact.atdmt.com/iaction/ATT_SMBBID_ShopAndLearn_ThankYouConfirmationPage" width="1" height="1" frameborder="0" scrolling="No" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0"></iframe> 
<%-- EndOf: Atlas tracking script --%>

    <div class="order-confirmation">
        <div id="content-wpr" class="order-confirmation-wpr bui-screen-width clearfix">
				
				<%--Order confirmation details --%>		
				<div  id="order-confirmation-info" class="order-confirmation-info clearfix"></div>
				<div id="order-review-status"></div><hr/>
				<div id="install-type-wpr"></div>
				<div class="order-section">
					<div class="bui-grid-2 order-heading clearfix">
						<div class="bui-block-1">
							<div class="title">Order Details</div>
						</div>
						<div class="bui-block-2 bui-text-align-right">
							<a href="javascript: void(0);" class="print-icon" title="Print Confirmation Page"></a>
						</div>
					</div>
					<%--Wireless summary details --%>		
	                <div  id="wireless-summary-wpr" class="wireless-summary-wpr clearfix"></div>
	
					<%--Internet summary details --%>
	                <div  id="internet-summary-wpr" class="internet-summary-wpr clearfix"></div>
					
	                <%--Offer details info --%>
	                <div  id="offers-wpr" class="offers-wpr clearfix"></div>					
					
					<%--Order summary details --%>
	                <div  id="order-summary-wpr" class="order-summary-wpr clearfix"></div>
                </div>
				<hr/>
				<div class="customer-care-section clearfix">
					<p class="order-label">We&#39;re here to help</p>
					<div>To speak to a representative call</div>
					<div class="title">1-855-477-1654</div>
				</div>
				
       </div>
    </div>
    
    <%-- Start of Order confirmation page --%>
    <dsp:include page="/solution/buyflow/_orderConfirmationTpl.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
    <%-- End of Order confirmation page --%>
    
    <%-- Added solution common to present error messages --%>
    <dsp:include page="/solution/_solutionCommonInclude.jsp">
        <dsp:param name="contextPath" value="${contextPath}"/>
    </dsp:include>

	<script
		src="${contextPath}/web/common/js/vendor/handlebars/handlebars.js"
		type="text/javascript"></script>

	<script
		src="${contextPath}/web/common/js/vendor/underscore/underscore-min.js"
		type="text/javascript"></script>
	<script
		src="${contextPath}/web/common/js/vendor/backbone/backbone-min.js"
		type="text/javascript"></script>

<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>
	<script	src="${contextPath}/web/js/orderFlow/handlebarsOrderFlowHelper${jsdebug}"	type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/solutionCommon${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>	
    <script src="${contextPath}/web/js/solution/buyflow/view/orderConfirmationView${jsdebug}" type="text/javascript"></script>					
	<script src="${contextPath}/web/js/solution/buyflow/orderConfirmation${jsdebug}" type="text/javascript"></script>
			
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
