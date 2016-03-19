<%@ taglib uri="/dspTaglib" prefix="dsp"%>
<dsp:page>
    <script id="rsc-header-template" type="text/x-handlebars-template">
        <div class="rsc-header-light">
            <div class="bui-screen-width clearfix">
                <div class="bui-grid-2 clearfix">
                    <div class="bui-block-1 title">
                        <div class="header-label">
                            {{title}}
                        </div>
                        <div class="address">
                            {{renderServiceAddress saResponse}}
                        </div>
                    </div>
                    <div class="rsc bui-block-2 bui-grid-2 clearfix">
                        <div class="bui-block-a">
                            <div class="rsc-label">One-Time Charges</div>
                            <div class="bui-grid-2 clearfix one-time-charges">
                                <div class="bui-block-1 due-today">
                                    <div class="rsc-amount">
                                        <sup>$</sup>
                                        <span class="decimal-amount">{{getDecimalsRunningCartFormat subtotalDueNow}}</span>
                                        <sup>{{getCentsRunningCartFormat subtotalDueNow}}</sup>
                                    </div>
                                    <div class="desc">Due Today</div>
                                </div>
                                <div class="bui-block-2 first-bill">
                                    <div class="rsc-amount">
                                        <sup>$</sup>
                                        <span class="decimal-amount">{{getDecimalsRunningCartFormat subtotalFirstMonth}}</span>
                                        <sup>{{getCentsRunningCartFormat subtotalFirstMonth}}</sup>
                                    </div>
                                    <div class="desc">On First Bill</div>
                                </div>
                            </div>
                        </div>
                        <div class="bui-block-b">
                            <div class="rsc-label">Monthly Charges</div>
                            <div class="monthly rsc-amount">
                                <sup>$</sup>
                                <span class="decimal-amount">{{getDecimalsRunningCartFormat totalMonthlyAmount}}</span>
                                <sup>{{getCentsRunningCartFormat totalMonthlyAmount}}</sup>
                            </div>
                            <div class="desc bui-p-lr-10">Monthly Bill</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </script>
</dsp:page>
