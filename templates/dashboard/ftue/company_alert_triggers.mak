<%def name="display_company_results(company)">
    %if company:
        <div class="parent_of_tr">
            <tr class="company_results_row"
                data-company-id="${company['id']}">

                <td class="company_label">${company['label']}</td>

                <td><div class="btn add_company_alert">Add</div></td>
            </tr>
        </div>
    %endif
</%def>

<table class="company_results_table">
    <tbody>
        %if companies:
            % for company in companies:
                ${display_company_results(company)}
            % endfor
        %endif
    </tbody>
</table>