<%def name="display_alerts(alert)">
    <tr data-trigger-id='${alert['id']}'>
        <td class='company_label'>
            <a href="/search/${alert['company']['label']}">${alert['company']['label']}</a>
        </td>
        <td><div class='blue_delete'></div></td>
    </tr>
</%def>

<table class="company_results_table">
    <tbody class="added_alert_row"></tbody>

    <tbody>
        %for alert in alerts:
            ${display_alerts(alert)}
        %endfor
    </tbody>
</table>