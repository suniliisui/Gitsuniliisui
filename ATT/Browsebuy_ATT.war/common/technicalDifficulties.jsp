<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>Browse buy - Technical Difficulties page</title>

<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/solution-landing.css" />

</head>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="SolutionLanding" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

	<div class="solution-landing clearfix">

		<div id="content-wpr" class="clearfix">
			<div id="landing-page" class="clearfix">

				<%-- EndOf: Select Special Offer section --%>
				<dsp:include page="/cms/pages/solution/landing/_tdServices.jsp">
					<dsp:param name="contextPath" value="${contextPath}" />
				</dsp:include>
				<%-- EndOf: Special Offer section --%>
				
			</div>
		</div>
	</div>

</body>
	</html>
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
