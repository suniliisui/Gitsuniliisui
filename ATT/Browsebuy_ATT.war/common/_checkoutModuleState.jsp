<%@page contentType="application/json"%>
<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<%@ taglib uri="/jstl" prefix="c"%>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json"%>

<dsp:importbean
	bean="/com/att/b2b/commerce/order/checkout/bean/CheckoutInfo" />
<dsp:page>
<dsp:getvalueof var="pagePageItemMap" bean="CheckoutInfo.pageAndPageItemMap"/>
		<json:object name="PageOrderAndPageNameMap">
			<json:property name="pageOrder">
				<dsp:valueof bean="CheckoutInfo.pageOrderAndPageNameMap" />
			</json:property>
		</json:object>	
</dsp:page>