%if type == 'outbox':
    <div class="outbox_badge badge">${badges['outbox_unread']}</div>
%elif type == 'inbox':
    <div class="inbox_badge badge">${badges['inbox_unread']}</div>
%endif