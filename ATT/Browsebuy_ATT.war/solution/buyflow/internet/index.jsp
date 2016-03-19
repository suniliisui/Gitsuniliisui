<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business Home - U-verse High Speed Wireless Internet</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>
<link rel="stylesheet"
	href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />

<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/buyflowInternetLanding.css" />

<%-- EndOf: Page Specific Styles (page_specific). --%>

</head>

<%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="InternetSolutionConfigLanding" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

	<div id="solution-internet-config" class="clearfix">
		
		<div class="mktg-content-wpr">

			<div class="row-section">
		
				<div class="right-img-section">
					<%-- left or right --%>
		
					<div class="bui-screen-width clearfix">
		
						<div class="content-holder">
							<div class="content">
								<h6 class="section-sub-title">Internet</h6>
								<h1 class="main-title">Accelerate your competitive edge.</h1>
								<div class="title-content-row">
								  Fast. Reliable and connected. In addition to powerful security features and a wide range of downstream speeds. With AT&amp;T High Speed Internet, you can:
								</div>
									
		                            <div class="clearfix bui-m-b-20">
								        <ul class="section-style-title ">
		                                   <li>Enjoy blazing downstream speeds from 6 Mbps to 45 Mbps.</li>
		                                   <li>Connect network file servers, printers, and other devices wirelessly.</li>
		                                   <li>Surf the web, exchange emails, stream video, video conference, or Skype&reg;.</li>
		                                   <li>Stay safe with robust security features like anti-virus, anti-spyware, firewall protection, and parental controls.</li>
		                                   <li>Access thousands of AT&amp;T Wi-Fi Hot Spots nationwide, at no extra charge.</li>		                                   
		                               </ul>
									</div>
								<div>From</div>									
								<div class="price-wpr">
									<span class="currency-symbol">$</span>
									<span class="total-price">45</span>
									<span class="currency-cents">00</span>
									<span class="per-month">/mo.</span>
								</div>									
								<div id="cta-btn-wpr" class="title-content-row bui-p-b-20">
									<%-- Backbone JS view template embeds HTML code here.. --%>
								</div>
							</div>
						</div>
		
						<div class="image-holder">
							<img src="${contextPath}/cms/images/internet/landing/header.png"
								width="" alt="shop internet promotion banner" />
						</div>
		
					</div>
		
				</div>
		
			</div>
		
		</div>
		
	</div>
	
	<%-- StartOf: Tabs Section --%>
	<div id="solution-tabs-section" class="bui-w-100-percent clearfix bui-sticky-elem-wpr">
	    <div class="wrapper-for-tab clearfix " >
	        <div class="bui-screen-width">
				<div class="solution-features-tabs-wpr clearfix bui-grid-3 hack-class bui-sticky">
					<div class="solution-features-tabs">
						<a href="javascript: void(0)" data-nav="#nav-overview" class="visual-nav-link bui-block-1">OVERVIEW</a>
						<a href="javascript: void(0)" data-nav="#nav-equipment" class="visual-nav-link bui-block-2">EQUIPMENT</a> 
						<a href="javascript: void(0)" data-nav="#nav-installation" class="visual-nav-link bui-block-3">INSTALLATION</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%-- StartOf: Tabs Section --%>

	<%-- StartOf: Back-to-top button code --%>
	<div id="back-to-top-btn-wpr" class="back-to-top-btn-wpr bui-display-none">
  		<a  id="back-to-top" href="javascript:void(0)">&nbsp;</a>
  	</div>  	
	<%-- EndOf: Back-to-top button code --%>
	  					
	<%-- StartOf: Marketing content section --%>
	<div id="nav-overview" class="clearfix nav-content">
	<dsp:include page="/cms/pages/internet/overview_content.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	</div>
	<%-- EndOf: Marketing content section --%>
	
	<%-- StartOf: Marketing content section --%>
	<div id="nav-equipment" class="clearfix nav-content">
	<dsp:include page="/cms/pages/internet/internet_equipment.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	</div>
	<%-- EndOf: Marketing content section --%>


	<%-- StartOf: Marketing content section --%>
	<div id="nav-installation" class="clearfix nav-content">
	<dsp:include page="/cms/pages/internet/internet_installation.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	</div>
	<%-- EndOf: Marketing content section --%>
	
	<%-- StartOf: Legal --%>
	<div id="legal-content" class="bui-screen-width clearfix">
		<div class="bui-w-100-percent clearfix bui-m-b-20">
			<div class="clearfix bui-p-lr-30">
				<p class=" bui-p-t-20">Twelve-month term required. Rate excludes taxes and other charges. Equipment is included in the monthly charge and owned by AT&amp;T. Upon disconnecting service, the equipment must be returned or there is a $150 charge. High speed internet speed references based on synch rates. Actual speed achieved depends on customer location, line condition and use of other U-verse services. Credit and other restrictions apply. Additional equipment (i.e., Ethernet card and/or Cable) may be required. Installation does not include additional wiring or installation of outlets. Service not available in all areas. Other conditions, including credit restrictions and qualifications, apply. Wireless networking and Wi-Fi access require a compatible Wi-Fi-enabled device, purchased separately.</p>
				<p class=" bui-p-t-20">*Claim based on data transfer completion rates on nationwide 4G LTE networks. 4G LTE not available everywhere.</p>
			</div>
		</div>
	</div>
	<%-- EndOf: Legal --%>
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

	<script src="${contextPath}/web/common/js/vendor/visualNav/jquery.visualNav.js" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/custom/att-sticky/jquery.sticky.js" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/custom/att-tabs/js/jquery.att_tabs.js" type="text/javascript"></script>
	
<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>

	<!--  custom js -->
	<script src="${contextPath}/web/js/solution/solutionMarketingContentUtils${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/internet/internetConfigLanding${jsdebug}" type="text/javascript"></script>		
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>