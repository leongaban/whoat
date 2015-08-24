<div class="exchange_sync_row stream_row">
    <div class="stream_type">
        <div class="exchange_logo"></div> <em>Exchange</em>
    </div>
    <div class="exchange_stats stream_stats">
        %if len([stream for stream in streams if stream["type"] == "Exchange"]) > 0:
            %for stream in streams:
                %if stream['type'] == "Exchange":
                    <table>
                        <thead>
                            <tr>
                                <th>Username:</th>
                                <th>Last Sync:</th>
                                <th>Resolved Contacts:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="stat_box">${stream["account"]}</div>
                                </td>
                                <td>
                                    <div class="stat_box">${stream["last_sync"]}</div>
                                </td>
                                <td>
                                    <div class="stat_box">${stream["contacts"]["unique"]}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                %endif
            %endfor

        %else:

        %endif
    </div>
    <div class="sync_plus start_exchange_snarf"></div>
</div>