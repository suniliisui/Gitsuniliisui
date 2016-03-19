<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business - Choose Your Shared Wireless Data Plan</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>	
	<link rel="stylesheet"
	href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />
	
	<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/chooseDataPlans.css" />
<%-- EndOf: Page Specific Styles (page_specific). --%>

</head>

<%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="ChooseDataPlans" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>
	<div id="choose-data-page" class="clearfix">
		<div id="content-wpr" class="clearfix">

			<div class="rsc-content-wpr" id="rsc-content-wpr">
				<%-- Backbone JS fills this space --%>
			</div>

			<div class="page-content-wpr" id="page-content-wpr">
					<%-- (page_specific START) page markup starts here --%>
					<div id="data-plans-wpr" class="bui-screen-width bui-p-lr-10 clearfix">
						<%-- Backbone JS View fills this space.. --%>
					</div>
					<%-- (page_specific END) page markup ends here --%>
			</div>
		</div>
	</div>

	<div id="back-to-top-btn-wpr" class="back-to-top-btn-wpr bui-display-none">
  		<a  id="back-to-top" href="javascript:void(0)">&nbsp;</a>
  	</div>
        	
	<%-- StartOf: Tabs Section --%>
	<div id="solution-tabs-section" class="bui-w-100-percent clearfix bui-sticky-elem-wpr">
	    <div class="wrapper-for-tab clearfix " >
	        <div class="bui-screen-width">
				<div class="solution-features-tabs-wpr clearfix bui-grid-3 hack-class bui-sticky">
					<div class="solution-features-tabs">
						<a href="javascript: void(0)" data-nav="#nav-overview" class="visual-nav-link bui-block-1">OVERVIEW</a>
						<a href="javascript: void(0)" data-nav="#nav-features" class="visual-nav-link bui-block-2">FEATURES</a> 
						<a href="javascript: void(0)" data-nav="#nav-action" class="visual-nav-link bui-block-3">SEE IT IN ACTION</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%-- StartOf: Tabs Section --%>
	
	<%-- StartOf: Marketing content section --%>
	<div id="nav-overview" class="clearfix nav-content">
		<div class="mktg-content-wpr content">

			<div class="row-section">

				<div class="left-img-section">
					<%-- left or right --%>

					<div class="bui-screen-width clearfix">

						<div class="image-holder">
							<img
								src="${contextPath}/cms/images/wireless/data/banner_1.png"
								width="" alt="shop wireless data banner" />
						</div>

						<div class="content-holder">
							<div class="content">
								<h4 class="title-section">Share more, save more.</h4>
								<div class="title-content-row">Why struggle with the
									frustration of managing multiple plans for your devices?
								    Now, the more you share, the more you save when you
									choose one data plan for multiple devices. Whether you
									simply have a tablet for personal and work use or are managing
									an on-the-ground salesforce, AT&amp;T can help you manage 
									multiple data needs with one simple plan.</div>
							</div>
						</div>

					</div>

				</div>

			</div>

		</div>
	</div>
	<%-- EndOf: Marketing content section --%>
	
	<%-- StartOf: Marketing content section --%>
	<div id="nav-features" class="clearfix nav-content">
		<div class="mktg-content-wpr content">

			<div class="row-section">

				<div class="right-img-section">
					<%-- left or right --%>

					<div class="bui-screen-width clearfix">

						<div class="content-holder">
							<div class="content">
								<h4 class="title-section">Features</h4>
								<div class="title-content-row">
									<ul>
										<li>Share 4GB, 6GB, 10GB across your devices.</li>
										<li>Access one data plan on up to 10 devices.</li>
										<li>Use your data plan for tablets, laptops, gaming devices, mobile hotspots, netbooks & more!.</li>
										<li>The more data you chose, the less you pay per gigabyte and per device.</li>
										<li>Every plan includes tethering and access to over 30,000 AT&T Wi-Fi Hotspots.</li>
										<li>AT&T also offers business customers a number of options for extending host connectivity to mobile users.</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="image-holder">
							<img
								src="${contextPath}/cms/images/wireless/data/banner_2.png"
								width="" alt="shop wireless data banner" />
						</div>
						
					</div>

				</div>

			</div>

		</div>
	</div>
	<%-- EndOf: Marketing content section --%>


	<%-- StartOf: Marketing content section --%>
	<div id="nav-action" class="clearfix nav-content">
		<div class="mktg-content-wpr content">

			<div class="row-section">

				<div class="left-img-section">
					<%-- left or right --%>

					<div class="bui-screen-width clearfix">

						<div class="image-holder">
							<img
								src="${contextPath}/cms/images/wireless/data/banner_3.png"
								width="" alt="shop wireless data banner" />
						</div>

						<div class="content-holder">
							<div class="content">
								<h4 class="title-section">See it in action.</h4>
								<div class="title-content-row">Wondering what a shared
									data plan could look like for you?</div>
								<div class="title-content-row">The convenience of sharing
									one data plan across multiple devices means your office is
									virtually wherever you are. Transition easily from work on your tablet to
									a presentation on your laptop. Even promote productivity to
									those around you with a mobile hotspot. All on one simple,
									affordable data plan.</div>
								<div class="title-content-row">In addition to reducing
									costs, sharing data across multiple devices can help you manage
									an entire sales force - keeping your employees connected no
									matter where your business takes you.</div>
							</div>
						</div>

					</div>

				</div>

			</div>

		</div>
	</div>
	<%-- EndOf: Marketing content section --%>
	
	<%-- StartOf: Running Shopping cart section --%>
	<dsp:include page="/solution/config/_runningShoppingCart.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	<%-- EndOf: Running Shopping cart section --%>
	
	<%-- Template includes (page_specific)--%>
	<dsp:include page="${contextpath}/solution/buyflow/wireless/_chooseDataPlansTpl.jsp"/>
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

	<script src="${contextPath}/web/js/solution/solutionMarketingContentUtils${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/chooseDataPlans${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/model/chooseDataPlansModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/view/chooseDataPlansView${jsdebug}" type="text/javascript"></script>
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
