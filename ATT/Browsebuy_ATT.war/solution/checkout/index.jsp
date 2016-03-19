<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
        <title>AT&amp;T Small Business - Checkout</title>

        <link rel="stylesheet"
              href="${contextPath}/web/common/js/custom/att-checkbox/css/attcheckbox.css">
		<link rel="stylesheet"
              href="${contextPath}/web/common/js/vendor/jquery-ui-1.10.4.custom/css/flick/jquery-ui-1.10.4.custom.css">
		
       <%--  <link rel="stylesheet"
              href="${contextPath}/web/common/js/vendor/jquery-ui/css/jquery.ui.core.css"> --%>
        <link rel="stylesheet"
              href="${contextPath}/web/common/js/vendor/jquery-ui/css/jquery.ui.accordion.css">
        <link rel="stylesheet"
			  href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />

		<link rel="stylesheet" type="text/css"
		              href="${contextPath}/web/css/solution-checkout.css"/>


    </head>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="SolutionCheckout" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

    <div class="solution-checkout clearfix">

        <div class="rsc-header-light-wpr" id="rsc-header-wpr">
            <%-- running RSC here--%>
        </div>

        <div id="step-tracker-wpr" class="step-tracker-wpr bui-screen-width">
            <%-- Step traker get inserted here --%>
        </div>

        <div id="content-wpr" class="clearfix">
        	<%-- Accordion gets inserted here --%>
        </div>
        
        <%-- StartOf: Service Availability section --%>
        <dsp:include page="/solution/_serviceAvailabilityPopup.jsp">
        	<dsp:param name="contextPath" value="${contextPath}"/>
        </dsp:include>
        <%-- EndOf: Service Availability section --%>  
        
    </div>
    
     <%-- StartOf: Running Shopping cart section --%>

<%--        <dsp:include page="/solution/buyflow/_rscLightTpl.jsp">
            <dsp:param name="contextPath" value="${contextPath}" />
        </dsp:include>--%>

    <dsp:include page="/solution/buyflow/_orderSummaryTpl.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
    
    <dsp:include page="/solution/_solutionCommonInclude.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
        <%-- EndOf: Running Shopping cart section --%>

    <dsp:include page="../../orderflow/checkout/_checkoutTpl.jsp"/>

    <script
            src="${contextPath}/web/common/js/vendor/jquery-ui/js/jquery.ui.core.js"
            type="text/javascript"></script>
    <script
            src="${contextPath}/web/common/js/vendor/jquery-ui/js/jquery.ui.widget.js"
            type="text/javascript"></script>
    <script
            src="${contextPath}/web/common/js/vendor/jquery-ui/js/jquery.ui.accordion.js"
            type="text/javascript"></script>
     <script
            src="${contextPath}/web/common/js/vendor/jquery-ui-1.10.4.custom/js/jquery-ui-flick-datepicker.js"
            type="text/javascript"></script>
            

    <%-- Vendor plug-in scripts - Backbone & Handle Bar utilities --%>           
    <script src="${contextPath}/web/common/js/vendor/handlebars/handlebars.js" type="text/javascript"></script>
    <script src="${contextPath}/web/common/js/vendor/underscore/underscore-min.js" type="text/javascript"></script>
    <script src="${contextPath}/web/common/js/vendor/backbone/backbone-min.js" type="text/javascript"></script>
    <script src="${contextPath}/web/common/js/vendor/backbone-relational-master/backbone-relational.js" type="text/javascript"></script>
    
    <%-- Vendor plug-in scripts - Utilities --%>
    <script type="text/javascript" src="${contextPath}/web/common/js/custom/att-radio/js/jquery.attradio.js"></script>
    <script type="text/javascript" src="${contextPath}/web/common/js/custom/att-checkbox/js/jquery.attcheckbox.js"></script>
	<script type="text/javascript" src="${contextPath}/web/common/js/vendor/antiscroll-master/deps/jquery-mousewheel.js"></script>
    <script type="text/javascript" src="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.js"></script>
    <script src="${contextPath}/web/common/js/vendor/jQuery-Validation-Engine-master/js/customErrorValidation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${contextPath}/web/common/js/custom/att-sticky/jquery.sticky.js" type="text/javascript"></script>

    <script src="${contextPath}/web/js/orderFlow/controller/stepTracker.js" type="text/javascript"></script>

    <script src="${contextPath}/web/common/js/attSmbFormUtils.js" type="text/javascript"></script>

<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>

    <script src="${contextPath}/web/js/orderFlow/handlebarsOrderFlowHelper${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/solutionCommon${jsdebug}" type="text/javascript"></script>
 	<script src="${contextPath}/web/js/orderFlow/view/baseFormView${jsdebug}" type="text/javascript"></script>          
    
    <%-- accordion view scripts --%>
    <script src="${contextPath}/web/js/orderFlow/view/checkout/coLightRSCView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>

    <script src="${contextPath}/web/js/orderFlow/controller/orderFlowController${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/view/checkout/stepTrackerView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/checkout/checkoutAccordionModel${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/view/checkout/checkoutAccordionView${jsdebug}" type="text/javascript"></script>
    
    <%-- Business Info View scripts --%> 
    <script src="${contextPath}/web/js/orderFlow/view/checkout/businessInfoView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/checkout/businessInfoModel${jsdebug}" type="text/javascript"></script>
    
    <%-- Billing Info View scripts --%> 
    <script src="${contextPath}/web/js/orderFlow/view/checkout/billingShippingInfoView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/checkout/billingShippingInfoModel${jsdebug}" type="text/javascript"></script>   

    <script src="${contextPath}/web/js/orderFlow/view/checkout/internetInformationView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/checkout/internetInformationModel${jsdebug}" type="text/javascript"></script>

    <script src="${contextPath}/web/js/orderFlow/view/checkout/addressModalView${jsdebug}" type="text/javascript"></script>

    <%-- Billing Info View scripts --%> 
    <script src="${contextPath}/web/js/orderFlow/view/checkout/termsConditionsInfoView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/checkout/termsConditionsInfoModel${jsdebug}" type="text/javascript"></script>
	
	<%-- StartOf: Service Eligibility related file includes --%>
	<script src="${contextPath}/web/js/orderFlow/view/serviceEligibilityView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/serviceEligibilityModel${jsdebug}" type="text/javascript"></script>
    <%-- EndOf: Service Eligibility related file includes --%>
    
    <script src="${contextPath}/web/js/solution/solutionCheckout${jsdebug}" type="text/javascript"></script>

<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
