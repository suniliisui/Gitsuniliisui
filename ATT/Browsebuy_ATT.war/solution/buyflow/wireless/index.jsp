<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business - Wireless Landing</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>	
	<link rel="stylesheet"
			  href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />
	<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/buyflowWirelessLanding.css" />
<%-- EndOf: Page Specific Styles (page_specific). --%>

</head>

<%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="WirelessSolutionConfigLanding" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>
	<div id="solution-wireless-config" class="clearfix">
					

					<div class="bui-screen-width bui-p-lr-30 clearfix">
						<div class="wireless-landing-content-wpr clearfix">
							<div class="left-content-wpr">
							    <h6 class="section-sub-title">Wireless Data</h6>
								<h4 class="section-title"> 
								 Carry your world<br>with you.
									</h4>
								<div class="row-content-title bui-m-b-20">									
								Managing and growing a business is easier when you work efficiently. That&#8217;s where we come in. Tablets and AT&amp;T data service connect you to everything that matters. So you can keep making things happen.								
								</div>
                            <div class="clearfix bui-m-b-20">
						        <ul class="section-style-title ">
                                   <li>No need for a separate data plan per tablet.</li>
                                   <li>Save with a shared bucket of data, plus <br/>$10 per tablet each month.</li>
                                   <li>Log on with top speeds from a tablet.</li>
                                   <li>Enjoy internet access, virtually anywhere.</li>
                                   <li>Get a $100 bill credit for every qualified line you add.</li>
                               </ul>
							</div>
							<div class=" ">From</div>									
							<div class="price-wpr">
								<span class="currency-symbol">$</span>
								<span class="total-price">40</span>
								<span class="currency-cents">00</span>
								<span class="per-month">/mo.</span>
							</div>
							
								<div id="cta-btn-wpr" class="third-row-heading">
								<a href="${contextPath}/solution/buyflow/wireless/deviceCatalog.jsp?mode=add">
									<button class="bui-button">Shop Now</button>
									</a>
								</div>
							</div>
							<div class="right-wireless-image-holder">
								<img alt="shop wireless promotion banner"
									src="${contextPath}/cms/images/solution/config/Header.png">
							</div>
						</div>
					</div>
					  <div id="solution-tabs-section" class="bui-w-100-percent clearfix bui-sticky-elem-wpr">
		        	<%-- StartOf: Tabs Section --%>
		        	<div class="wrapper-for-tab clearfix " >
				        <div class="bui-screen-width">
							<div class="solution-features-tabs-wpr clearfix bui-grid-4 hack-class bui-sticky">
								<div class="solution-features-tabs">
									<a href="javascript: void(0)" data-nav="#purchasing-section-wpr" class="visual-nav-link bui-block-1">WHY AT&amp;T</a>
									<a href="javascript: void(0)" data-nav="#reliable-section-wpr" class="visual-nav-link bui-block-2">NETWORK</a>	
									<a href="javascript: void(0)" data-nav="#mobiledata-section-wpr" class="visual-nav-link bui-block-3">PLANS</a>  									
									<a href="javascript: void(0)" data-nav="#featured-devices-section-wpr" class="visual-nav-link bui-block-4">TABLETS</a>
								</div>
							</div>
						</div>
					</div>
					<%-- EndOf: Tabs Section --%>
					
					<%-- EndOf: customer section content  --%>
						<dsp:include page="/cms/pages/solution/landing/_customerSectionContent.jsp">
                                   <dsp:param name="contextPath" value="${contextPath}"/>
                        </dsp:include>
					 <%-- EndOf: customer section content --%>

			        <%-- StartOf: ReliableNetwork section --%>
			        <dsp:include page="/cms/pages/solution/landing/_reliableNetworkContent.jsp">
			       		<dsp:param name="contextPath" value="${contextPath}"/>
			        </dsp:include>
			        <%-- EndOf: ReliableNetwork section --%>
					 
					 <%-- StartOf: mobile share data section --%>
						<dsp:include page="/cms/pages/solution/landing/_mobileShareData.jsp">
                                   <dsp:param name="contextPath" value="${contextPath}"/>
                        </dsp:include>
					 <%-- EndOf: mobile share data section --%>
			       
			       
			        
			        <%-- StartOf: Select Featured Devices section --%>
						<dsp:include page="/cms/pages/solution/landing/_wirelessDeviceContent.jsp">
                                   <dsp:param name="contextPath" value="${contextPath}"/>
                        </dsp:include>
					 <%-- EndOf: Featured Devices section --%>
					 
					 <%-- StartOf: Select Featured Devices section --%>
						<dsp:include page="/cms/pages/solution/landing/_wirelessLegalContent.jsp">
                                   <dsp:param name="contextPath" value="${contextPath}"/>
                        </dsp:include>
					 <%-- EndOf: Featured Devices section --%>
					 
					 <div id="back-to-top-btn-wpr" class="back-to-top-btn-wpr bui-display-none">
        	           	<a  id="back-to-top" href="javascript:void(0)">&nbsp;</a>
        	        </div>
		        </div> 
		        
			</div>

	<%-- StartOf: Running Shopping cart section --%>
	<dsp:include page="/solution/config/_runningShoppingCart.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	<%-- EndOf: Running Shopping cart section --%>
	
	<%-- Template includes (page_specific)--%>
		<%-- nothing here.. --%>
	<%-- EndOF: Template includes --%>

	<%-- StartOf: Global File Includes (global_includes). Below JSP has all the common fragment JSP includes --%>
	<dsp:include page="${contextpath}/solution/common/includes/global/_fragmentIncludes.jsp"/>
	<%-- EndOf: Global File Includes (global_includes). --%>
	
    <%-- StartOf: Global Script Files (global_includes). Below JSP has all the common JS script files needed --%>
	<dsp:include page="${contextpath}/solution/common/includes/global/_jsScripts.jsp"/>
	<%-- EndOf: Global Script Files (global_includes). --%>
	
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
	
	<script src="${contextPath}/web/js/solution/solutionMarketingContentUtils${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/attSmbFormUtils.js" type="text/javascript"></script>
	<script src="${contextPath}/web/js/orderFlow/view/baseFormView${jsdebug}" type="text/javascript"></script>    
    <script src="${contextPath}/web/js/orderFlow/handlebarsOrderFlowHelper${jsdebug}" type="text/javascript"></script> 	
	<script src="${contextPath}/web/js/orderFlow/view/serviceEligibilityView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/orderFlow/model/serviceEligibilityModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/wireless/wirelessConfigLanding${jsdebug}" type="text/javascript"></script>		
	<%-- StartOf: Page Specific Script file (page_specific). --%>
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
