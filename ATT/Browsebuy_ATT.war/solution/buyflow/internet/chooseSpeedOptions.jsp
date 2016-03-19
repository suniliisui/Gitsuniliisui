<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business - Choose Your Internet Download Speed</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>			  
<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/chooseSpeedOptions.css" />
<%-- StartOf: Page Specific Styles (page_specific). --%>

</head>

<%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="ChooseSpeedOptions" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>
	<%-- (page_specific START) page markup starts here --%>

    <div class="page-content clearfix">
        <div id="content-wpr" class="clearfix">
                <%-- BeginOf: Running Cart --%>
            <div class="rsc-content-wpr" id="rsc-content-wpr"></div>
                <%-- EndOf: Running Cart --%>
            <div class="" id="page-content-wpr">
                <div id="internet-speed-options-wpr" class="bui-screen-width bui-p-lr-10 clearfix">
                	<%--Backbone Content appends --%>
                </div>
            </div>
        </div>
    </div>
    
    <%-- StartOf: Marketing content section --%>
	<dsp:include page="/cms/pages/internet/internet_speed.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	<%-- EndOf: Marketing content section --%>

        <%-- StartOf: Service Availability section --%>
    <dsp:include page="/solution/_serviceAvailabilityPopup.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
        <%-- EndOf: Service Availability section --%>
        <%-- StartOf: Running Shopping cart section --%>
    <dsp:include page="/solution/config/_runningShoppingCart.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>

		<%-- <div class="bui-screen-width clearfix"></div> --%>


    <dsp:include page="/solution/buyflow/internet/_chooseSpeedOptionsTpl.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>

	<%-- (page_specific END) page markup ends here --%>

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

	<!--  custom javascript -->
    <script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/internet/chooseSpeedOptions${jsdebug}"	type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/internet/model/speedOptionsModel${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/internet/view/speedOptionsView${jsdebug}" type="text/javascript"></script>

	<%-- StartOf: Page Specific Script file (page_specific). --%>
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>