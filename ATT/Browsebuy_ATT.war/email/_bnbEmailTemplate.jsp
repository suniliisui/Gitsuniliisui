<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<%@ taglib uri="/jstl" prefix="c"%>
<dsp:importbean bean="/atg/dynamo/droplet/ForEach" />
<dsp:importbean bean="/atg/dynamo/droplet/Switch" />
<dsp:importbean bean="/com/att/b2b/common/Environment" />
<dsp:importbean bean="/atg/dynamo/droplet/Format" />
<dsp:page>

       <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
       "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
       <html xmlns="http://www.w3.org/1999/xhtml" sss="en">
<head>
<title>AT&T Shopping Cart</title>

<style type="text/css">
.alignLeft {
       text-align: left;
}
</style>
</head>
<dsp:importbean bean="/com/att/b2b/browsebuy/droplet/EmailContentDroplet"/> 
<body class="alignLeft" style="margin-left:auto; margin-right:auto; width:600px">
       <div style="padding-bottom: 20px margin-left:auto; margin-right:auto; width:600px;">
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                     <tr>
                          <td align="center">
                              <table style="border-collapse: collapse; text-align: left; border: #d2d2d2 1px solid" border="0" width="600" bgcolor="#ffffff">
                                   <tbody>
                                        <tr>
                                            <td style="padding: 0">
                                            	 <table border="0" cellspacing="0" cellpadding="0" width="600">
                                                      <tbody>
                                                            <tr>
                                                                   <td style="" 2" valign="top">
                                                                          <dsp:include page="./fragments/email_header.jsp" />
                                                                   </td>
                                                            </tr>
                                                            <tr>
                                                                   <td style="padding: 15px 15px 0px 15px; text-align: center"
                                                                          colspan="2" valign="top"><span
                                                                          style="color: #656565; font: normal 28px Verdana">Thank
                                                                                 You for Your Order </span></td>
                                                            </tr>
                                                            <tr>
                                                            	<td style="padding:15px 20px 0 15px;font:normal 16px Verdana;color:#656565; text-align:center" valign="top">Your order has been successfully submitted!
                                                            	</td>
                                                            </tr>
                                                            <tr>
                                                            	<td style="padding:15px 15px 0px 15px; text-align:center" colspan="2" valign="top"><span style="color:#656565;font:normal 12px Verdana">Confirmation Number: &nbsp<span style="color:#067ab5;font:normal 12px Verdana"><dsp:valueof param="order.id" /></span></span></br></br>
                                                            	</td>
                                                            </tr>
                                                            <tr>
	                                                            <td
	                                                                   style="padding: 15px 20px 0 15px; font: normal 20px Verdana; color: #656565; text-align: center"
	                                                                   valign="top">What Happens Next?<br> <br>
	                                                            </td>
                                                            </tr>
                                                      </tbody>
                                                  </table>
                                                  
                                                          
                                                <!--  JSP email table templates goes here -->
                                                
                                            <dsp:setvalue param="checkoutInfo" paramvalue="checkoutInfo"/>
                                         		<dsp:setvalue param="order" paramvalue="order"/>
                                            
                                            <dsp:droplet name="EmailContentDroplet">
                                                       <dsp:param name="order" param="order" />
                                                       <dsp:oparam name="os_ps_id_ry">
                                                             <dsp:include page="./fragments/email-OS-PS-ID-RS.jsp" />
                                                       </dsp:oparam>
                                                       <dsp:oparam name="os_ps_ry">
                                                             <dsp:include page="./fragments/email-OS-PS-RY.jsp" />
                                                       </dsp:oparam>
                                                       <dsp:oparam name="os_id_ry">
                                                             <dsp:include page="./fragments/email-OS-ID-RY.jsp" />
                                                       </dsp:oparam>
                                                       <dsp:oparam name="os_ry">
                                                             <dsp:include page="./fragments/email-OS-RY.jsp" />
                                                       </dsp:oparam>
                                                       
                                                </dsp:droplet>
                                                
                                                <!--  Endof: jsp templates -->
                                                          
                                                          
                                                 <br/><br/>
                                                 <hr style="color: #d2d2d2; padding: 0px 50px; width: 400px"
                                                        size="1"><br/>
                 
                                                 <table border="0" cellspacing="0" cellpadding="0" width="600">
                                                        <tbody>
                                                              <tr>
                                                                     <td
                                                                            style="padding: 15px 40px 0px 50px; font: normal 12px Verdana; color: #656565; float: left">We
                                                                            appreciate your business and look forward to helping you as a
                                                                            customer. You can contact customer care at 855-477-1654 if you have any questions regarding your order.<br>
                                                                     </td>
                                                              </tr>
                                                              <tr>
                                                                     <td
                                                                            style="padding: 5px 40px 0px 50px; font: normal 12px Verdana; color: #656565; float: left"><br>
                                                                            <br>Thank You,<br>AT&amp;T<br> <br>
                                                                     </td>
                                                              </tr>
                                                        </tbody>
                                                 </table>
                                     </tbody>
                              </table><br/>
                              <table style="border-collapse: collapse; text-align: left; border="0" width="590" bgcolor="#ffffff">
                                  <tbody>
                                     <tr>
	                                     <td><p
	                                                   style="width: 590px; font: normal 12px Verdana; color: #656565; float: left; margin-left:auto; margin-right:auto;">
	                                                   <b>PLEASE DO NOT REPLY TO THIS MESSAGE</b><br>All replies
	                                                   are automatically deleted. For questions regarding this message,
	                                                   refer to the contact information listed above.
	                                            </p><br/>
	                                    </td>
                                     </tr>
                                     <tr>
	                                     <td><p
	                                                   style="width: 590px; font: normal 12px Verdana; color: #656565; float: left; margin-left:auto; margin-right:auto;"><a href="http://www.att.com/gen/privacy-policy?pid=2587">&#169;2014 AT&#38;T Intellectual Property</a>. All rights reserved. AT&#38;T,
	                                                   the AT&#38;T logo and all other AT&#38;T marks contained herein
	                                                   are trademarks of AT&#38;T Intellectual Property and/or AT&#38;T
	                                                   affiliated companies. All other marks contained herein are the
	                                                   property of their respective owners. <a href="http://www.att.com/gen/privacy-policy?pid=2506Privacy">Privacy Policy</a></p>
	                                     </td>
                                     </tr>
                                  </tbody>
                              </table>
                          </td>
                     </tr>
              </table>                  
       </div> 
</body>
       </html>
</dsp:page>

