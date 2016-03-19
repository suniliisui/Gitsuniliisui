<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>

        <title>Business Solution Pages</title>

        <link rel="stylesheet"
              href="${contextPath}/web/common/js/custom/att-checkbox/css/attcheckbox.css">

        <link rel="stylesheet"
              href="${contextPath}/web/common/js/vendor/jquery-ui/css/jquery.ui.core.css">
        <link rel="stylesheet"
	          href="${contextPath}/web/common/js/vendor/jquery-ui/css/jquery.ui.accordion.css">
		<link rel="stylesheet"
			  href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />

		<link rel="stylesheet" type="text/css"
		              href="${contextPath}/web/css/solution-landing.css"/>


    </head>
<%-- START BLOCK --%>
    <body class="att-smb-bnb" data-controller="SolutionLanding" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

    <div class="solution-landing clearfix">

         <%-- StartOf: Service Availability section --%>
        <dsp:include page="/solution/_serviceAvailabilityPopup.jsp">
        	<dsp:param name="contextPath" value="${contextPath}"/>
        </dsp:include>
        <%-- EndOf: Service Availability section --%>  
        
        <div id="content-wpr" class="clearfix">
        	<div id="landing-page" class="clearfix">
		        <%-- StartOf: Banner section --%>
		        <dsp:include page="/solution/_slpTopBanner.jsp">
		       		<dsp:param name="contextPath" value="${contextPath}"/>
		        </dsp:include>
		        <%-- EndOf: Banner section --%>
		        
		        <div id="solution-tabs-section" class="bui-w-100-percent clearfix bui-sticky-elem-wpr">
		        	<%-- StartOf: Tabs Section --%>
		        	<div class="wrapper-for-tab clearfix " >
				        <div class="bui-screen-width">
							<div class="solution-features-tabs-wpr clearfix bui-grid-4 hack-class bui-sticky">
								<div class="solution-features-tabs">
									<a href="javascript: void(0)" data-nav="#selectSpecialOffer-section-wpr" class="visual-nav-link bui-block-1">OFFERS</a>
									<a href="javascript: void(0)" data-nav="#wireless-section-wpr" class="visual-nav-link bui-block-2">WIRELESS DATA</a> 
									<a href="javascript: void(0)" data-nav="#featured-devices-section-wpr" class="visual-nav-link bui-block-3">TABLETS</a>
									<a href="javascript: void(0)" data-nav="#internet-section-wpr" class="visual-nav-link bui-block-4">INTERNET</a>
								</div>
							</div>
						</div>
					</div>
					<%-- StartOf: Tabs Section --%>
					
					<%-- EndOf: Select Special Offer section --%>
						<dsp:include page="/cms/pages/solution/landing/_selectSpecialOffer.jsp">
                                   <dsp:param name="contextPath" value="${contextPath}"/>
                        </dsp:include>
					 <%-- EndOf: Special Offer section --%>

			        <%-- StartOf: Wireless section --%>
			        <dsp:include page="/solution/_slpWirelessBanner.jsp">
			       		<dsp:param name="contextPath" value="${contextPath}"/>
			        </dsp:include>
			        <%-- EndOf: Wireless section --%>
					 
					 <%-- EndOf: Select Featured Devices section --%>
						<dsp:include page="/cms/pages/solution/landing/_featuredDevicesContent.jsp">
                                   <dsp:param name="contextPath" value="${contextPath}"/>
                        </dsp:include>
					 <%-- EndOf: Featured Devices section --%>

			        <%-- StartOf: Internet section --%>
			        <dsp:include page="/solution/_slpInternetBanner.jsp">
			       		<dsp:param name="contextPath" value="${contextPath}"/>
			        </dsp:include>
			        <%-- EndOf: Internet section --%>
		        </div>
            
	        </div>
        	<div id="back-to-top-btn-wpr" class="back-to-top-btn-wpr bui-display-none">
        		<a  id="back-to-top" href="javascript:void(0)">&nbsp;</a>
        	</div>
        </div>

    </div>

        <%-- StartOf: Solution Common Include --%>
    <dsp:include page="/solution/_solutionCommonInclude.jsp">
        <dsp:param name="contextPath" value="${contextPath}"/>
    </dsp:include>
	<%--Modal Pop up --%>
<div class="modal fade" id="browser-version-check" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <div id="modal-header-info-wpr" class="clearfix">
                    <img src="${contextPath}/web/images/icons/information-warning.png" alt="error icon"/>
                </div>
                <h4 class="modal-title" id="info-modal-title">Please Note</h4>
            </div>

            <div class="modal-body">
               <div class="bui-p-lr-30 modal-display-message">Sorry. Your browser isn&#39;t supported, so the site might not work or look its best.</div> 
 
					<div class="bui-p-lr-75 bui-m-t-20 modal-display-text">For an optimal experience, please visit again using:
					Internet Explorer 9, Firefox 17+, or Google Chrome 24+.</div>
            </div>
            <div class="bui-btn-wpr bui-m-tb-20">
            	 <button class="bui-button" data-dismiss="modal" aria-hidden="true">OK</button>
            </div>

        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
	<%--End of Modal Pop up --%>
    <!-- Plugin scripts -->      
	<script src="${contextPath}/web/common/js/vendor/visualNav/jquery.visualNav.js" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/custom/att-sticky/jquery.sticky.js" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/custom/att-tabs/js/jquery.att_tabs.js" type="text/javascript"></script>
	
	<!-- Base scripts - Open source API -->
	<script src="${contextPath}/web/common/js/vendor/handlebars/handlebars.js" type="text/javascript"></script>
    <script src="${contextPath}/web/common/js/vendor/underscore/underscore-min.js" type="text/javascript"></script>
    <script src="${contextPath}/web/common/js/vendor/backbone/backbone-min.js" type="text/javascript"></script>
    <script src="${contextPath}/web/common/js/vendor/backbone-relational-master/backbone-relational.js" type="text/javascript"></script>
    <script type="text/javascript" src="${contextPath}/web/common/js/vendor/antiscroll-master/deps/jquery-mousewheel.js"></script>
    <script type="text/javascript" src="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.js"></script>
    
    
<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>
    
	<!-- Custom scripts - for functionality-->
	<script src="${contextPath}/web/js/solution/solutionCommon${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/solutionMarketingContentUtils${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/attSmbFormUtils.js" type="text/javascript"></script>
	<script src="${contextPath}/web/js/orderFlow/view/baseFormView${jsdebug}" type="text/javascript"></script>    
    <script src="${contextPath}/web/js/orderFlow/handlebarsOrderFlowHelper${jsdebug}" type="text/javascript"></script> 	
	<script src="${contextPath}/web/js/orderFlow/view/serviceEligibilityView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/serviceEligibilityModel${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/solutionLanding${jsdebug}" type="text/javascript"></script>

<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
	