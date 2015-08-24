## Load White FTUE
%if snarfed is False:
    <script language="javascript">
        %if watched is False:
            WHOAT.ftue.loadWhiteFtue($());
        %elif watched is True:
            WHOAT.ftue.loadWhiteFtue('failed');
        %endif
    </script>

    %if darked is False:
        <script language="javascript">
            WHOAT.ftue.wireFTUEtour().showDark("true");
        </script>
    %endif
%endif

## Do not call api if not snarfed
%if snarfed is True:

    <script language="javascript">
        WHOAT.dashboard.home.showDashboard($());
    </script>

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

%else:
    <div id="not_snarfed"></div>
%endif

## Pull in scripts after Dark FTUE
<div class="init_widgets"></div>