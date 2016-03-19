<%@page contentType="application/json"%>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<%@ taglib uri="/jstl" prefix="c" %>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %>

<dsp:importbean bean="/com/att/b2b/common/external/csi/services/isa/ServiceAvailabilityForLocationInfo" />
<dsp:importbean bean="/com/att/b2b/common/external/formhandler/ServiceAvailabilityForLocationFormHandler" />
<dsp:importbean bean="/atg/dynamo/droplet/IsEmpty" />
<dsp:page>
<dsp:droplet name="IsEmpty">  
	<dsp:param name="value" param="se_addressLine1"/>
   	<dsp:oparam name="false">
		<dsp:setvalue bean="ServiceAvailabilityForLocationInfo.userAddress.addressLine1" paramvalue="se_addressLine1" />
		<dsp:setvalue bean="ServiceAvailabilityForLocationInfo.userAddress.addressLine2" paramvalue="se_addressLine2" />
		<dsp:setvalue bean="ServiceAvailabilityForLocationInfo.userAddress.city" paramvalue="se_city" />
		<dsp:setvalue bean="ServiceAvailabilityForLocationInfo.userAddress.state" paramvalue="se_state" />
		<dsp:setvalue bean="ServiceAvailabilityForLocationInfo.userAddress.postalCode" paramvalue="se_postalCode" />
		<dsp:setvalue bean="ServiceAvailabilityForLocationFormHandler.ajaxSuccessUrl" value="" />
		<dsp:setvalue bean="ServiceAvailabilityForLocationFormHandler.submit" value="" />
   	</dsp:oparam>   
</dsp:droplet>
<json:object>
		<dsp:droplet name="/atg/dynamo/droplet/IsNull">
				<dsp:param name="value" bean="ServiceAvailabilityForLocationInfo.errorCode" />
				<dsp:oparam name="false"><dsp:droplet name="/atg/dynamo/droplet/Switch">
						<dsp:param name="value" bean="ServiceAvailabilityForLocationInfo.errorCode" />
						<dsp:oparam name="fail">
							<json:property name="systemError" value="We are experiencing technical difficulties. Please try again later."/>
						</dsp:oparam>
						<dsp:oparam name="900">
							<json:property name="systemError" value="We are experiencing technical difficulties. Please try again later."/>
						</dsp:oparam>
						<dsp:oparam name="300">
							<json:property name="systemError" value="Service Address Not Found. Please Check It."/>
						</dsp:oparam>
						<dsp:oparam name="500">
							<json:property name="systemError" value="Service not available for the location."/>
						</dsp:oparam>							
					</dsp:droplet>
			</dsp:oparam>
			</dsp:droplet>	
					<json:object name="userAddress">
						<json:property name="se_addressLine1">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.userAddress.addressLine1"/>
						</json:property>
						<json:property name="se_addressLine2">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.userAddress.addressLine2"/>
						</json:property>
						<json:property name="se_city">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.userAddress.city"/>
						</json:property>
						<json:property name="se_state">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.userAddress.state"/>
						</json:property>
						<json:property name="se_postalCode">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.userAddress.postalCode"/>
						</json:property>		
					</json:object>			
				
					<json:object name="serviceAddress">
						<json:property name="se_addressLine1">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.addressBean.address1"/>
						</json:property>
						<json:property name="se_addressLine2">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.addressBean.address2"/>
						</json:property>
						<json:property name="se_city">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.addressBean.city"/>
						</json:property>
						<json:property name="se_state">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.addressBean.state"/>
						</json:property>
						<json:property name="se_postalCode">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.addressBean.postalCode"/>
						</json:property>	
						<json:property name="suggestedAddressIndicator">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.suggestedAddressIndicator"/>
						</json:property>			
					</json:object>
					<%-- Suggested Addresses Collection Start--%>		
					<dsp:getvalueof var="validAddresses" bean="ServiceAvailabilityForLocationInfo.validAddresses"/>
					<c:set var="suggestedAddressIndicatorVar"><dsp:valueof bean="ServiceAvailabilityForLocationInfo.suggestedAddressIndicator"/></c:set>
					<c:if test="${suggestedAddressIndicatorVar == true }">
						<json:array  name="suggestedAddresses">			
							<c:forEach var="validAddress" items="${validAddresses}"> 
								<json:object>
									<json:property name="se_addressLine1" value="${validAddress.address1}"/>
									<json:property name="se_addressLine2" value="${validAddress.address2}"/>
									<json:property name="se_city" value="${validAddress.city}"/>
									<json:property name="se_state" value="${validAddress.state}"/>
									<json:property name="se_postalCode" value="${validAddress.postalCode}"/>					
								</json:object>
							</c:forEach>				 
						</json:array>
					</c:if>		
					<%-- Suggested Addresses Collection End--%>  
					<json:object name="offersAvailableAtServiceAddress">
						<json:property name="internet">
							<dsp:valueof bean="ServiceAvailabilityForLocationInfo.internetAvailable"/>
						</json:property>
						<json:property name="wireless" value="true"/>
					</json:object>	
				
			
</json:object>
</dsp:page>