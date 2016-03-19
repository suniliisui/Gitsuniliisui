<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<%@ taglib uri="/jstl" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<dsp:page>
	<div id="solution-tabs-section" class="bui-w-100-percent clearfix bui-sticky-elem-wpr">
		<div class="wrapper-for-tab clearfix">
			<div class="bui-screen-width">
				<dsp:importbean bean="/atg/dynamo/droplet/ForEach" />
				<dsp:importbean
					bean="com/att/b2b/common/catalog/ProductDetailsTabLookUpDroplet" />

				<dsp:getvalueof var="v_skuId" param="skuId" />
				<dsp:getvalueof param="pProdId" var="v_prodId" />
				<dsp:droplet name="ProductDetailsTabLookUpDroplet">
					<dsp:param name="productId" param="productId" />
					<dsp:oparam name="output">
						<dsp:getvalueof var="v_productDetailsInfos"
							param="productDetailsInfos" />
						<c:set var="tabsCount" value="${fn:length(v_productDetailsInfos)}"></c:set>

						<%-- StartOf: tab header label render logic--%>
						<div
							class="solution-features-tabs-wpr  clearfix bui-grid-${tabsCount} bui-sticky">
							<div class="solution-features-tabs">
								<dsp:droplet name="/atg/dynamo/droplet/ForEach">
									<dsp:param name="array" param="productDetailsInfos" />
									<dsp:param name="sortProperties" value="+displayOrder" />
									<dsp:getvalueof var="tabCountIndex" param="index" />

									<dsp:oparam name="output">
										<dsp:getvalueof var="tabItem" param="element" />
										<a data-nav="#${tabItem.externalTabName}" class="visual-nav-link bui-block-${tabCountIndex+1}"
											href="javascript: void(0)">${tabItem.externalTabName}</a>
											<%-- #${tabItem.internalTabName} --%>
									</dsp:oparam>
								</dsp:droplet>
							</div>
						</div>
						<%-- Sticky button renders here.. --%>
			</div>
			<%-- EndOf: tab header label render logic--%>
		</div>
		<%-- StartOf: tab content --%>
		<div class="bui-w-100-percent clearfix">
			<%-- <c:forEach var="productDetailsInfo"
							items="${v_productDetailsInfos}">
							<div id="${productDetailsInfo.internalTabName}" class="clearfix content">
								<h1>${productDetailsInfo.externalTabName}</h1>
								<dsp:include page="${productDetailsInfo.contentLocationURL}"></dsp:include>
							</div>
						</c:forEach> --%>

			<dsp:droplet name="/atg/dynamo/droplet/ForEach">
				<dsp:param name="array" param="productDetailsInfos" />
				<dsp:param name="sortProperties" value="+displayOrder" />
				<dsp:getvalueof var="tabCountIndex" param="index" />

				<dsp:oparam name="output">
					<dsp:getvalueof var="tabItem" param="element" />
					<div id="${tabItem.externalTabName}"
						class="clearfix nav-content">
						<%-- <h1>${tabItem.externalTabName}</h1> --%>
						<dsp:include page="${tabItem.contentLocationURL}">
							<dsp:param name="contextPath" value="${contextPath}" />
						</dsp:include>
					</div>
				</dsp:oparam>
			</dsp:droplet>

		</div>
		<%-- EndOf: tab content --%>

		</dsp:oparam>
		<dsp:oparam name="legal">
			<dsp:getvalueof var="v_legalDetailsInfo" param="legalDetail" />
			<div id="${v_legalDetailsInfo.externalTabName}"
				class="clearfix content">
				<%-- <h1>${tabItem.externalTabName}</h1> --%>
				<dsp:include page="${v_legalDetailsInfo.contentLocationURL}">
					<dsp:param name="contextPath" value="${contextPath}" />
				</dsp:include>
			</div>
		</dsp:oparam>
		
		</dsp:droplet>
	</div>
	<div id="back-to-top-btn-wpr" class="back-to-top-btn-wpr bui-display-none">
      		<a  id="back-to-top" href="javascript:void(0)">&nbsp;</a>
    </div>
</dsp:page>