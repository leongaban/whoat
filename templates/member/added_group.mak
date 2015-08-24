%if groups is not None:
    %for group in groups:
        <li data-group-id="${group['id']}">
            <input type="text" class="profile_group_info" name="${group['label']}" value="${group['label']}"/> <div class="remove_group"></div>
        </li>
    %endfor
%endif