<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business - Confirm Your Wireless Selections</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>	
	<link rel="stylesheet"
	href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />
	<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/wirelessServicesSummary.css" />
<%-- EndOf: Page Specific Styles (page_specific). --%>

</head>

<%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="WirelessServicesSummary" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

	<div id="wireless-summary-page" class="clearfix">
		<div id="content-wpr" class="clearfix">

			<div class="rsc-content-wpr" id="rsc-content-wpr">
				<%-- Backbone JS fills this space --%>
			</div>

			<div class="page-content-wpr" id="page-content-wpr">
				<div class="bui-screen-width clearfix">
						<div class="bui-grid-3 clearfix pageContentHeaderSection">
				            <div class="bui-block-a">
				            </div>
				            <div class="bui-block-b page-content-header">
				               <h1 class="page-content-header">Confirm Your Selections</h1> 
				            </div>
				            <div class="bui-block-c" id="dataplan-link"></div>
				        </div>						
						<hr />
					<%-- (page_specific START) page markup starts here --%>
						<div id="wireless-summary-wpr" class="bui-p-lr-10 clearfix">
							<%-- Backbone JS fills this space --%>
						</div>
						<hr />
					<%-- (page_specific END) page markup ends here --%>
					
				</div>
					<div class="bui-screen-width clearfix">
						<div id="button-wpr"></div>
					</div>
			</div>
		</div>
	</div>

	<%-- StartOf: Running Shopping cart section --%>
	<dsp:include page="/solution/config/_runningShoppingCart.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	<%-- EndOf: Running Shopping cart section --%>
	
	<%-- Template includes (page_specific)--%>
	<dsp:include page="${contextpath}/solution/buyflow/wireless/_wirelessServicesSummaryTpl.jsp"/>
	<%-- EndOF: Template includes --%>

	<%-- StartOf: Global File Includes (global_includes). Below JSP has all the common fragment JSP includes --%>
	<dsp:include page="${contextpath}/solution/common/includes/global/_fragmentIncludes.jsp"/>
	<%-- EndOf: Global File Includes (global_includes). --%>
	
    <%-- StartOf: Global Script Files (global_includes). Below JSP has all the common JS script files needed --%>
	<dsp:include page="${contextpath}/solution/common/includes/global/_jsScripts.jsp"/>
	<%-- EndOf: Global Script Files (global_includes). --%>
<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>

	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/wirelessServicesSummary${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/model/wirelessServicesSummaryModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/view/wirelessServicesSummaryView${jsdebug}" type="text/javascript"></script>
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
