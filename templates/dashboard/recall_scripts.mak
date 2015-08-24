## Adjust position of Expand Widget
%if invited is True:
    <script language="javascript">
        WHOAT.dashboard.home.widgets.wireExpand('bot');
    </script>
%else:
    <script language="javascript">
        WHOAT.dashboard.home.widgets.wireExpand('top');
    </script>
%endif

## Adjust position of Alerts Widget
%if alerts is True:
    <script language="javascript">
        WHOAT.alerts.wireAlerts('bot', 'widget');
    </script>
%else:
    <script language="javascript">
        WHOAT.alerts.wireAlerts('top', 'widget');
    </script>
%endif