<%@ taglib uri="/dspTaglib" prefix="dsp" %>
<dsp:page>
<dsp:importbean bean="/atg/dynamo/droplet/IsEmpty" />
		<%-- End of white background content area --%>
		
		</td>
		</tr>
		<tr>
			<td style="text-align:left;padding-left:20px;">
				<div style="padding:5px 20px 5px 0px;">
				<table>
						<tr>
							<td>
					<div style="padding-bottom: 10px;padding-top:10px;">
					 	<span style="font-size:12px;">Thank you,
	                 	
	                 	<p style="margin-top:12px;margin-bottom:12px">The AT&amp;T Small Business Team</p>
	                 	This email was auto-generated. Do not respond.</span>
	                	<hr color="#e5e5e5">
	                 	<div class="line" style="padding-bottom: 10px;padding-top: :10px;"></div>
	                 	<dsp:getvalueof param="noMessage" var="v_noMessage"/>
	                 	<dsp:droplet name="IsEmpty">
	                 	<dsp:param name="value" param="noMessage"/>
	                 	<dsp:oparam name="true">
		                 	<p style="font-size:10px;line-height:14pt;color:#9f9f9f">
									<strong>Note:</strong>
									This email message was sent from a notification-only address that cannot accept incoming e-mails. Do not reply to this message.
							</p>
						</dsp:oparam>
						</dsp:droplet>
						<p style="font-size:10px;line-height:14pt;color:#9f9f9f">
							<a href="http://www.att.com/gen/corporate-citizenship?pid=5882" target="_blank">&copy;&nbsp; 
							<dsp:valueof bean="/atg/dynamo/service/CurrentDate.year"/> AT&amp;T Intellectual Property.</a> 
							All rights reserved. AT&amp;T, the AT&amp;T logo, and all other AT&amp;T marks contained herein are trademarks of 
							AT&amp;T Intellectual Property and/or AT&amp;T affiliated companies. 
						</p>
					</div>
					</td>
					</tr>
					</table>
					<table>
						<tr>
							<td style="color:#999999;font-size:10px;line-height:14pt;font-weight:normal;font-type:arial;"><br/>
								<a href="http://www.att.com/privacy" target="_blank" style="color:3381b7;">Privacy Policy</a> | 
								<a href="http://www.att.com/gen/general?pid=11561" target="_blank" style="color:3381b7;">Terms of Use</a> 
							</td>
						</tr>
					</table>
				</div>
			</td>
		</tr>	
		
		</table>
			</td>
		</tr>
	</table>
</dsp:page>
