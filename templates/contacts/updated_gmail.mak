<div class="gmail_sync_row stream_row">
    <div class="stream_type">
        <div class="gmail_logo start_sync_gmail"></div> <em>Gmail</em>
    </div>
    <div class="gmail_stats stream_stats">
        %if len([stream for stream in streams if stream["type"] == "Gmail"]) > 0:
            %for stream in streams:
                %if stream['type'] == "Gmail":
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
    <div class="sync_plus start_sync_gmail"></div>
</div>