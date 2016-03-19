<%-- START BLOCK --%>
<%@page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:getvalueof var="contextPath" bean="/OriginatingRequest.contextPath" scope="application" />
<dsp:include page="/common/include/global_header.jsp"/>
<%-- END BLOCK --%>
<title>AT&amp;T Small Business - Device Configuration</title>

<%-- StartOf: Page Specific Styles (page_specific). Below CSS file is page specific --%>	
	<link rel="stylesheet"
	href="${contextPath}/web/common/js/vendor/antiscroll-master/antiscroll.css" />
	<link rel="stylesheet" type="text/css"
	href="${contextPath}/web/css/chooseDevice.css" />
<%-- EndOf: Page Specific Styles (page_specific). --%>

</head>
<%-- START BLOCK --%>
<body class="att-smb-bnb" data-controller="ChooseDevice" data-action="show">
<div id="wrapper" class="no-print clearfix">
<dsp:include page="/common/include/header.jsp"/>
<%-- END BLOCK --%>
<%-- The "data-controller" attribute is page specific (page_specific) --%>

	<div id="choose-device-page" class="clearfix">
		<div id="content-wpr" class="clearfix">

			<div class="rsc-content-wpr" id="rsc-content-wpr">
				<%-- Backbone JS fills this space --%>
			</div>

			<div class="page-content-wpr" id="page-content-wpr">

				<div id="device-details-hdr-wpr"  class="bui-screen-width"></div>

				<div id="device-config-contents">
					<div class="bui-screen-width clearfix">
						<div id="col1">
							<dsp:droplet
								name="/com/att/b2b/common/catalog/ProductInfoLookUpDroplet">
								<dsp:param name="productId" param="productId" />
								<dsp:oparam name="output">
									<div class="device-details-page-title bui-m-tb-40">
										<h4 class="device-brand">
											<dsp:valueof valueishtml="true"
												param="productInfo.manufacturerDisplayName" />
										</h4>
										<h4 class="device-prod-name">
											<dsp:valueof valueishtml="true"
												param="productInfo.productExternalName" />
										</h4>
									</div>
									<div class="device-features-wpr">
										<ul>
											<hr>
											<dsp:droplet name="/atg/dynamo/droplet/ForEach">
												<dsp:param name="array" param="productInfo.keyFeatures" />
												<dsp:oparam name="output">
													<li>
														<span class="bui-p-tb-10">
															<dsp:valueof param="element" valueishtml="true" />
														</span>
													</li>
													<hr>
												</dsp:oparam>
											</dsp:droplet>
										</ul>
									</div>
								</dsp:oparam>
							</dsp:droplet>
							<div id="device-image-gallery-wpr" class="device-360 bui-m-t-20">
								<%-- This space will be filled by BackboneJS - View Template --%>
							</div>
						</div>

						<div id="col2">
							<div id="device-hero-img-wpr">
								<%-- This space will be filled by BackBoneJS - View Template --%>
							</div>
						</div>

						<div id="col3">
							<div id="device-config-wpr">
								<%-- This space will be filled by BackBoneJS - View Template --%>
							</div>

							<div id="device-price-wpr">
								<%-- This space will be filled by BackBoneJS - View Template --%>
							</div>

							<div id="device-cta-wpr" class="device-cta-wpr">
								<%-- This space will be filled by BackBoneJS - View Template --%>
<%--                                <div class="bui-m-t-40 bui-m-b-70">--%>
                                    <a href="${contextPath}/solution/buyflow/wireless/wirelessServicesSummary.jsp" class="cta-btn">
                                        <button class="bui-button-orange">Add to Cart</button>
                                    </a>
<%--                                </div>--%>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

       <dsp:include page="_featuredProductDetailTemplateHolder.jsp">
              <dsp:param name="productId" param="productId"/>
       </dsp:include>


	<%-- StartOf: Running Shopping cart section --%>
	<dsp:include page="/solution/config/_runningShoppingCart.jsp">
		<dsp:param name="contextPath" value="${contextPath}" />
	</dsp:include>
	<%-- EndOf: Running Shopping cart section --%>
	
	<%-- Template includes (page_specific)--%>
	<dsp:include page="${contextpath}/solution/buyflow/wireless/_chooseDeviceTpl.jsp"/>
	<%-- EndOF: Template includes --%>

	<%-- StartOf: Global File Includes (global_includes). Below JSP has all the common fragment JSP includes --%>
	<dsp:include page="${contextpath}/solution/common/includes/global/_fragmentIncludes.jsp"/>
	<%-- EndOf: Global File Includes (global_includes). --%>
	
	<script src="${contextPath}/web/common/js/vendor/visualNav/jquery.visualNav.js" type="text/javascript"></script>
	<script src="${contextPath}/web/common/js/custom/att-sticky/jquery.sticky.js" type="text/javascript"></script>
	

    <%-- StartOf: Global Script Files (global_includes). Below JSP has all the common JS script files needed --%>
	<dsp:include page="${contextpath}/solution/common/includes/global/_jsScripts.jsp"/>
	<%-- EndOf: Global Script Files (global_includes). --%>

<c:set var="jsdebug" value="-min.js"/>
<c:if test="${not empty param.jsdebug}">
	<c:set var="jsdebug" value=".js"/>
</c:if>
    <script src="${contextPath}/web/js/orderFlow/handlebarsOrderFlowHelper${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/solutionMarketingContentUtils${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/model/rscModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/config/view/rscView${jsdebug}"	type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/chooseDevice${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/model/chooseDeviceModel${jsdebug}" type="text/javascript"></script>
	<script src="${contextPath}/web/js/solution/buyflow/wireless/view/chooseDeviceView${jsdebug}" type="text/javascript"></script>
	
<%-- START BLOCK --%>
<dsp:include page="/common/include/global_footer.jsp"/>
</dsp:page>
<%-- END BLOCK --%>
