<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<%@ taglib uri="/jstl" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<dsp:page>
<dsp:importbean bean="/atg/targeting/TargetingFirst"/>

<!-- Solutions Page Internet Banner -->
	<dsp:droplet name="TargetingFirst">
		<dsp:param
			bean="/atg/registry/RepositoryTargeters/DynamicContent/SLPInternetBannerTargeter"
			name="targeter" />
		<dsp:param name="howMany" value="1" />
		<dsp:oparam name="output">
			<dsp:getvalueof var="bannerFilePath" param="element.filepath" />
			<dsp:include page="${bannerFilePath}">
				<dsp:param name="contextPath" value="${contextPath}" />
			</dsp:include>
		</dsp:oparam>
		<dsp:oparam name="empty">
                Alas! No Banner Present at this time.
            </dsp:oparam>
	</dsp:droplet>

</dsp:page>
