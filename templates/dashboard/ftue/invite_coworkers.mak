<%def name="display_coworkers(coworker)">
    %if coworker:
        %if 'invited' in coworker or 'member' in coworker:

        %else:
            <tr class="expand_row" data-invite-id="${coworker['id']}">

                <td class="expand_invite_row">
                    
                    <div class="btn invite_blue">Invite</div>
                    <p>
                        %if 'label' in coworker:
                            ${coworker['label']}
                        %endif

                        %if 'emails' in coworker:
                            <span>
                                %for email in coworker['emails']:
                                    (${email['label']})
                                %endfor
                            </span>
                        %endif
                    </p>
                </td>
            </tr>
            <tr><td style="border-bottom:1px solid #ccc;"></td></tr>
        %endif

    %endif
</%def>

##%if coworker_count > 5:
##    <h2>Invite 5 Coworkers</h2>
##%else:
##    <h2>Invite Coworkers</h2>
##%endif

<table>
    <thead>
        <tr><td class="expand_invite_row"></td></tr>
    </thead>

    <tbody class="expand_tbody">
        % for coworker in coworkers:
            ${display_coworkers(coworker)}
        % endfor
    </tbody>
</table>