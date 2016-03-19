<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business - Tablet Catalog</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>	
	<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/deviceCatalog.css" />
<%-- EndOf: Page Specific Styles (page_specific). --%>

</head>

<%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="DeviceCatalog" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

	<div id="content-wpr" class="clearfix">
		<div id="device-catalog-page" class="bui-screen-width clearfix">
			<dsp:include page="/solution/config/_getProductsListing.jsp">
				<dsp:param name="contextPath" value="${contextPath}" />
			</dsp:include>
		</div>
	</div>

	<%-- StartOf: Select Featured Devices section --%>
	<div id="compare-device-parent-wpr" class="clearfix">
	<dsp:include page="${contextpath}/solution/buyflow/wireless/_compareDevice.jsp">
       <dsp:param name="contextPath" value="${contextPath}"/>
    </dsp:include>
    </div>
	 <%-- EndOf: Featured Devices section --%>
	 
	<%-- StartOf: Running Shopping cart section --%>
	<dsp:include page="/solution/config/_runningShoppingCart.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	<%-- EndOf: Running Shopping cart section --%>
	
	<%-- Template includes (page_specific)--%>
		<%-- nothing here... --%>
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
	
	<script src="${contextPath}/web/common/js/custom/att-sticky/jquery.sticky.js" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}"	type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/deviceCatalog${jsdebug}" type="text/javascript"></script>
	
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
