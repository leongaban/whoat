<%namespace file="../functions.mak" name="functions"/>
<%block name="my_contact">
    <div class="widget_msg">
        <p></p><div class="close_widget_msg"></div>
    </div>
    <section class="widget intro_outbox gray_widget">
        <div class="widget_lid">
            <h2>Viewing Reports</h2>
        </div>

        <div class="widget_content_reports">

            

            <h2 class="report_h2">This report will help you manage your members engagement in your network.</h2>

            <hr>
            <table id="table_reports" cellspacing="0" cellpadding="0" border="0">
                
                <thead>
                    <tr id="spacer">
                        <td class="no_bottom_border"></td>
                        <td>${total_downloads}</td>
                        <td>${total_members}</td>
                    </tr>
                    
                    <tr id="spacer">
                        <th class="col_little_title month_date">Month Occurred</th>
                        <th class="col_little_title">App Downloads</th>
                        <th class="col_little_title">Registered Members</th> 
                        
                    </tr>
                </thead>

                <tbody>
                    %if analytics:
                        % for item in analytics.keys():
                            <%
                                report_result = analytics[item]
                            %>
                            ${functions.make_analytics_report(report_result)}
                        % endfor
                    %else:
                        <tr>
                            <td colspan="11">
                                <p class="no_result">No results yet, please try again when there is more activity on your account.</p>
                            </td>
                        </tr>
                    %endif
                </tbody>
            </table>
        </div>
    </section>
</%block>