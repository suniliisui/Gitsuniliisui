<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:importbean bean="/com/att/b2b/common/Environment" />
<dsp:importbean bean="/atg/dynamo/droplet/Format" />
<dsp:page>
	
	<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
		<tr>
			<td colspan="2" valign="top">
				<dsp:droplet name="Format">
					<dsp:param name="format" value="{host}{context}{url}"/>
					<dsp:param bean="Environment.wwwURL" name="host"/>
					<dsp:param value="/businessoffers" name="context"/>
					<dsp:param value="/web/common/images/common/email/e-mailheader.png" name="url"/> 
					<dsp:oparam name="output">
						<dsp:getvalueof id="imgResult" param="message" idtype="java.lang.String">
							<img src="<%=imgResult%>" alt="AT&amp;T"/>
						</dsp:getvalueof>										
					</dsp:oparam>
				</dsp:droplet>
			</td>
		</tr>
	</table>
</dsp:page>
