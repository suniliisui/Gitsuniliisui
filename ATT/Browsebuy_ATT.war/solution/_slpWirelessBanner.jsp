<%@ taglib uri="/dspTaglib" prefix="dsp"%>

<dsp:page>

	<dsp:droplet name="/atg/targeting/TargetingFirst">
		<dsp:param name="targeter"
			bean="/atg/registry/RepositoryTargeters/DynamicContent/BNBWirelessContentTargeter" />
		<dsp:oparam name="output">
			<dsp:getvalueof var="smallPromoSlotFilePath" param="element.filepath" />
			<dsp:include page="${smallPromoSlotFilePath }" />
		</dsp:oparam>
		<dsp:oparam name="empty">
						Alas! No Banner configured
					</dsp:oparam>
	</dsp:droplet>
	
</dsp:page>