<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
        <title>AT&amp;T Small Business - Shopping Cart Review</title>

            <%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>
        <link rel="stylesheet" type="text/css"
              href="${contextPath}/web/css/shoppingCartReview.css" />
            <%-- StartOf: Page Specific Styles (page_specific). --%>

    </head>

        <%-- The "data-controller" attribute is page specific (page_specific) --%>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="ShoppingCartReview" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>

        <%-- (page_specific START) page markup starts here --%>

        <%-- <div class="bui-screen-width clearfix"></div> --%>
    <div class="shopping-cart-review clearfix">
        <div id="content-wpr" class="clearfix">
                <%-- BeginOf: Running Cart --%>
            <div class="rsc-header-light-wpr" id="rsc-header-wpr">
                <%-- Running shopping cart header --%>
            </div>

            <div id="page-content-wpr" class="page-content-wpr bui-screen-width">
			     <div class="bui-grid-3 clearfix pageContentHeaderSection">
					<div class="bui-block-a">
						<a href="${contextPath}"><span class="arrow-left-icon"></span> Keep Shopping</a>
					</div>
					<h1 class="bui-block-b page-content-header">
						Review Your Order
					</h1>
					<div class="bui-block-c">
                        <button id="checkout-top-btn" class="bui-button-orange">Check Out</button>
					</div>
				</div>
            
				<hr>

                <div id="wireless-content">
                    <div  id="wireless-summary-wpr" class="bui-p-lr-10 wireless-summary-wpr clearfix">
                        Wireless Summary
                    </div><hr>
                </div>

                <div id="internet-content">
                    <div  id="internet-summary-wpr" class="bui-p-lr-10 internet-summary-wpr clearfix">
                        Internet Summary
                    </div><hr>
                </div>

                <div  id="offers-wpr" class="bui-p-lr-10 offers-wpr clearfix">
                   Special Offers Section
                </div><hr>

                <div  id="order-summary-wpr" class="order-summary-wpr">
                    Price total
                </div>
            </div>

            <div id="term-n-condition" class="term-n-condition bui-screen-width">
                <dsp:include page="/cms/pages/legal/int-wireless-term-n-condition.jsp">
                    <dsp:param name="contextPath" value="${contextPath}" />
                </dsp:include>
            </div>
        </div>
    </div>
        <%-- StartOf: Service Availability section --%>
    <dsp:include page="/solution/_serviceAvailabilityPopup.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
        <%-- EndOf: Service Availability section --%>

        <%-- StartOf: Running Shopping cart section --%>

        <dsp:include page="/solution/buyflow/_rscLightTpl.jsp">
            <dsp:param name="contextPath" value="${contextPath}" />
        </dsp:include>

    <dsp:include page="/solution/buyflow/_orderSummaryTpl.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
        <%-- EndOf: Running Shopping cart section --%>

    <dsp:include page="/solution/buyflow/_shoppingCartReviewTpl.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>

    <dsp:include page="/solution/buyflow/internet/_internetSummaryTpl.jsp">
        <dsp:param name="contextPath" value="${contextPath}" />
    </dsp:include>
    
    <%-- Template includes (page_specific)--%>
	<dsp:include page="${contextpath}/solution/buyflow/wireless/_wirelessServicesSummaryTpl.jsp"/>
	<%-- EndOF: Template includes --%>

        <%-- (page_specific END) page markup ends here --%>

        <%-- StartOf: Global File Includes (global_includes). Below JSP has all the common fragment JSP includes --%>
    <dsp:include page="${contextpath}/solution/common/includes/global/_fragmentIncludes.jsp"/>
        <%-- EndOf: Global File Includes (global_includes). --%>

        <%-- StartOf: Global Script Files (global_includes). Below JSP has all the common JS script files needed --%>
    <dsp:include page="${contextpath}/solution/common/includes/global/_jsScripts.jsp"/>
        <%-- EndOf: Global Script Files (global_includes). --%>

    <script type="text/javascript" src="${contextPath}/web/common/js/custom/att-radio/js/jquery.attradio.js"></script>

<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>

	<!-- custom js -->
    <script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/view/shoppingCartReviewView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/internet/view/internetSummaryView${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/model/wirelessServicesSummaryModel${jsdebug}"	type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/view/wirelessServicesSummaryView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/view/OrderSummaryView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/view/RSCLightView${jsdebug}" type="text/javascript"></script>
    <script src="${contextPath}/web/js/solution/buyflow/shoppingCartReview${jsdebug}" type="text/javascript"></script>

<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
