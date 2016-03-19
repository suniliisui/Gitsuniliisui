<%@page contentType="application/json"%>
<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<%@ taglib uri="/jstl" prefix="c" %>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %>

<dsp:importbean bean="/com/att/b2b/buyflow/droplet/bean/BuyFlowInfoSessionBean"/>
<dsp:importbean bean="/atg/dynamo/droplet/IsEmpty"/>

<dsp:page>

		<dsp:droplet name="IsEmpty">
		  <dsp:param param="internetFlow" name="value"/>
			<dsp:oparam name="false">
		  <dsp:setvalue bean="BuyFlowInfoSessionBean.isInternetBuyFlow" paramvalue="internetFlow"/>
			</dsp:oparam>
		</dsp:droplet>

		<dsp:droplet name="IsEmpty">
		  <dsp:param param="wirelessFlow" name="value"/>
			<dsp:oparam name="false">
				 <dsp:setvalue bean="BuyFlowInfoSessionBean.isWirelessBuyFlow" paramvalue="wirelessFlow"/>
			</dsp:oparam>
		</dsp:droplet>
	
		<dsp:droplet name="IsEmpty">
   		 <dsp:param param="dataPlanReviewed" name="value"/>
         <dsp:oparam name="false">
             <dsp:setvalue bean="BuyFlowInfoSessionBean.wirelessBuyFlowInfo.isDataPlanReviewed"  paramvalue="dataPlanReviewed"/>
         </dsp:oparam>
      </dsp:droplet>

	<dsp:droplet name="IsEmpty">
   		 <dsp:param param="isSpeedPlanReviewed" name="value"/>
         <dsp:oparam name="false">
             <dsp:setvalue bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isSpeedPlanReviewed"  paramvalue="isSpeedPlanReviewed"/>
         </dsp:oparam>
      </dsp:droplet>

	<dsp:droplet name="IsEmpty">
   		 <dsp:param param="isIpAddressReviewed" name="value"/>
         <dsp:oparam name="false">
             <dsp:setvalue bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isIpAddressReviewed"  paramvalue="isIpAddressReviewed"/>
         </dsp:oparam>
      </dsp:droplet>

	<dsp:droplet name="IsEmpty">
   		 <dsp:param param="isEquipmentReviewed" name="value"/>
         <dsp:oparam name="false">
             <dsp:setvalue bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isEquipmentReviewed"  paramvalue="isEquipmentReviewed"/>
         </dsp:oparam>
      </dsp:droplet>
      
	<dsp:droplet name="IsEmpty">
   		 <dsp:param param="isInstallationReviewed" name="value"/>
         <dsp:oparam name="false">
             <dsp:setvalue bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isInstallationReviewed"  paramvalue="isInstallationReviewed"/>
         </dsp:oparam>
      </dsp:droplet>      
      
	<json:object name="sessionInfo">
		<json:property name="isInternetBuyFlow">
			<dsp:valueof bean="BuyFlowInfoSessionBean.isInternetBuyFlow"/>
		</json:property>
		<json:property name="isWirelessBuyFlow">
			<dsp:valueof bean="BuyFlowInfoSessionBean.isWirelessBuyFlow"/>
		</json:property>
		<json:property name="isDataPlanReviewed">
			<dsp:valueof bean="BuyFlowInfoSessionBean.wirelessBuyFlowInfo.isDataPlanReviewed"/>
		</json:property>
 		<json:property name="isSpeedPlanReviewed">
			<dsp:valueof bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isSpeedPlanReviewed"/>
		</json:property>		
		<json:property name="isIpAddressReviewed">
			<dsp:valueof bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isIpAddressReviewed"/>
		</json:property>
		<json:property name="isEquipmentReviewed">
			<dsp:valueof bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isEquipmentReviewed"/>
		</json:property>
		<json:property name="isInstallationReviewed">
			<dsp:valueof bean="BuyFlowInfoSessionBean.wirelineBuyFlowInfo.isInstallationReviewed"/>
		</json:property>								
	</json:object>
</dsp:page>
