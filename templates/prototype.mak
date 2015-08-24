<%inherit file="master.mak"/>

<%block name="title">Who@ Dashboard</%block>

<%block name="head">
    <link rel="stylesheet" href="/static/css/dashboard.css" type="text/css">
    <script type='text/javascript' src="/static/js/who.js"></script>
</%block>


<%block name="header">
    <%include file="dashboard/top_bar.mak"/>
</%block>

<%block name="body">

    <div id="bigbox" style="overflow: auto; width: 800px; height: 1000px; background-color: red">
        <table cellspacing=0 cellpadding=0 border=0 style="width: 325px; height: 100px; font-size: 10pt">
            <!--
            <tr>
                <td style="width: 25px">
                    <span class="tooltip" style="cursor: pointer;" alt="Personal" title="Personal">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMkRENjJFRkQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMkRENjJGMEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkVERDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkVFRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2KK18wAAAGJJREFUOMtj+NpuLATE54D4PwEMUiPEACSOokloAjEDFLuhyR1mIMJkFAzTwEAkHtUwqmEkaEDHb4H4J74MhIwPADEjEHPj0nATTXAT1Ho2LBqOgyR0oU5AljgPxC+wlBoiAB9+NuWyWPBKAAAAAElFTkSuQmCC" />
                        <sub class="network_counts" style="font-size: .5em">5</sub>
                    </span>
                </td>
                <td style="width: 25px">
                    <span class="tooltip" style="cursor: pointer;" alt="Coworkers" title="Coworkers">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4Q0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4REQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NjU0OThBRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM5NjU0OThCRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NDrrYQAAAQlJREFUOMtj+NpuzAbENUB8D4j/A/ELIG4FYk4gZoBhEOELVYCO49EVyuJQqIGuEIQPoim6BcSM2BSyAzE/EHMAMReUz4BNIRMQzwLitUC8GIhZcSnkRrNaCJdCcTSFyrgUaqApNAdiZmwK7dEUBgCxDDaF0WgKC6DOkUJXWImmcCrUg6XoChehKdwDdeNHWMDDFJ5DU/gWKv4TFpUwhd+xxDXIpItAPBGmkAlHomCDxtJvkDMYoOkOm0JBIK6Hsi1ACkVxKFSApkkQeylIoRoOhcbQQL8OxE4ghTY4FPqhx0w4DoXZ6Aq5oMYjK3oGxALY4hoUFMehiu5Aow9rMgNhFiCehJ5NYRgA6IP/g6qKgGoAAAAASUVORK5CYII=" />
                        <sub class="network_counts" style="font-size: .7em">5</sub>
                    </span>
                </td>
                <td style="width: 25px">
                    <span class="tooltip" style="cursor: pointer;" alt="Groups" title="Groups">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4NEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4NUQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkY1RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkY2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3ftIfgAAAQ9JREFUOMtj+NpuzEAEZgbifCB+BsSvgbgaiNlAcsRoZgTiU0D8Hw1fBxlMjAFWWDTDcAgxBmTiMaCHGAOc8RgQT4wB5Tg0gwKTg5DmOiQNP5HYW4FYEFss8ACxEhALAHEnkoZHQMwHxEzQKIXrQY6qThxOvQPEXLhcCWPk4ND8F4g58XkTxviKJ6R5CRnAhEczCIsQ44L1eAzgIMYAfiB+gcOAfUDMQsgAEGYF4lBobKQD8QYkQ45C5fEagI5BYbMMyZBzQNwASv9AbE6MAbD0MReH15aC5InJC5p4AtiGGANS8BjQSYwBoXgMKCDGAG60nIiMRRmILFRV0NLJZyA2IbZQRY4RCSCWgUYxWBwAl3TvAMDXKP4AAAAASUVORK5CYII=" />
                    </span>
                </td>
                <td style="width: 25px">
                    <span class="tooltip" style="cursor: pointer;" alt="Friends" title="Friends">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFN0ZDOUFDN0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFN0ZDOUFDOEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3RkM5QUM1RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3RkM5QUM2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PkNkogAAAc5JREFUSMelld0rw1EYx2dexiQZJXnJmrxdECnDUl5mMYTYXHDBNBNrKf4FKcuVC/+A/8Ctcrcb5ZrrXSi5dqHF99T31HE6R525+NSv7ezzO+c83+eZ56FQ8PyDatAK+kCN/NxV4gX9IANOwAzoAk0g5SptBlmwAQKWNTkXaQXIg0blBfNgHSTBIoiAI9ednoER0A4mwbeBFeBzkYbAADjkTk3SVdDhWihRmDSoBCWDdJmF+yWN815S/PEYqFe+3waDYAgUDdItcKxLM9rO6sAoXySE4yzIi+X4lzIBulQGuIrB9vFZ5HMC3HFHJumzzKraGeKir3hk/Qdv7JxXMGyRCmLAL6VtvNMo2DMsLvL43czmvUUq8tsjpVOsXhi8GxbvgnOuFZ01Z5EuCI+UptmCtmOJik9zbSdf/mVJQE5KRRQuLMJHsMaCqX1+bShUrziJXLQPnizSqDosyCYzm+auG/h5rSi2fIhbhCU2QVCT+sESI9jCTjplobweVjRmkd6o00dD3nNQHdAyp7E/pBF2k9Mwl0VKGIQfYFa5L2epyN2nJs0q2XSW5jndvYzEAbhlVcPlSkX1dzgMQsqlJzg7y5KqBNiySQ6Osv66fwDn9CLZIAcU3QAAAABJRU5ErkJggg==" />
                    </span>
                </td>
            </tr>
            -->
            <tr>
                <td colspan="2" height="10px">&nbsp;</td>
            </tr>
            <tr>
                <td align="center" style="width: 100px; height: 100px; vertical-align: top">
                    <img src="https://s3.amazonaws.com/whoat_assets/images/member_avatar.png">
                </td>
                <td style="width: 200px; font-size: 1.1em; vertical-align: top">
                    Rupal Dalal
                    <br/>
                    Miss Fancy Pants
                    <br/>
                    Art of Old India
                    <br/><br/>
                    <span class="tooltip" style="cursor: pointer;" alt="Personal" title="Personal">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMkRENjJFRkQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMkRENjJGMEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkVERDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkVFRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2KK18wAAAGJJREFUOMtj+NpuLATE54D4PwEMUiPEACSOokloAjEDFLuhyR1mIMJkFAzTwEAkHtUwqmEkaEDHb4H4J74MhIwPADEjEHPj0nATTXAT1Ho2LBqOgyR0oU5AljgPxC+wlBoiAB9+NuWyWPBKAAAAAElFTkSuQmCC" />
                        <sub class="network_counts" style="font-size: .5em">5</sub>
                    </span>
                    &nbsp;&nbsp;
                    <span class="tooltip" style="cursor: pointer;" alt="Coworkers" title="Coworkers">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4Q0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4REQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NjU0OThBRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM5NjU0OThCRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NDrrYQAAAQlJREFUOMtj+NpuzAbENUB8D4j/A/ELIG4FYk4gZoBhEOELVYCO49EVyuJQqIGuEIQPoim6BcSM2BSyAzE/EHMAMReUz4BNIRMQzwLitUC8GIhZcSnkRrNaCJdCcTSFyrgUaqApNAdiZmwK7dEUBgCxDDaF0WgKC6DOkUJXWImmcCrUg6XoChehKdwDdeNHWMDDFJ5DU/gWKv4TFpUwhd+xxDXIpItAPBGmkAlHomCDxtJvkDMYoOkOm0JBIK6Hsi1ACkVxKFSApkkQeylIoRoOhcbQQL8OxE4ghTY4FPqhx0w4DoXZ6Aq5oMYjK3oGxALY4hoUFMehiu5Aow9rMgNhFiCehJ5NYRgA6IP/g6qKgGoAAAAASUVORK5CYII=" />
                        <sub class="network_counts" style="font-size: .7em">5</sub>
                    </span>
                    &nbsp;&nbsp;
                    <span class="tooltip" style="cursor: pointer;" alt="Groups" title="Groups">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4NEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4NUQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkY1RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkY2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3ftIfgAAAQ9JREFUOMtj+NpuzEAEZgbifCB+BsSvgbgaiNlAcsRoZgTiU0D8Hw1fBxlMjAFWWDTDcAgxBmTiMaCHGAOc8RgQT4wB5Tg0gwKTg5DmOiQNP5HYW4FYEFss8ACxEhALAHEnkoZHQMwHxEzQKIXrQY6qThxOvQPEXLhcCWPk4ND8F4g58XkTxviKJ6R5CRnAhEczCIsQ44L1eAzgIMYAfiB+gcOAfUDMQsgAEGYF4lBobKQD8QYkQ45C5fEagI5BYbMMyZBzQNwASv9AbE6MAbD0MReH15aC5InJC5p4AtiGGANS8BjQSYwBoXgMKCDGAG60nIiMRRmILFRV0NLJZyA2IbZQRY4RCSCWgUYxWBwAl3TvAMDXKP4AAAAASUVORK5CYII=" />
                        <sub class="network_counts" style="font-size: .7em">4</sub>
                    </span>
                    &nbsp;&nbsp;
                    <span class="tooltip" style="cursor: pointer;" alt="Friends" title="Friends">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFN0ZDOUFDN0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFN0ZDOUFDOEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3RkM5QUM1RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3RkM5QUM2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PkNkogAAAc5JREFUSMelld0rw1EYx2dexiQZJXnJmrxdECnDUl5mMYTYXHDBNBNrKf4FKcuVC/+A/8Ctcrcb5ZrrXSi5dqHF99T31HE6R525+NSv7ezzO+c83+eZ56FQ8PyDatAK+kCN/NxV4gX9IANOwAzoAk0g5SptBlmwAQKWNTkXaQXIg0blBfNgHSTBIoiAI9ednoER0A4mwbeBFeBzkYbAADjkTk3SVdDhWihRmDSoBCWDdJmF+yWN815S/PEYqFe+3waDYAgUDdItcKxLM9rO6sAoXySE4yzIi+X4lzIBulQGuIrB9vFZ5HMC3HFHJumzzKraGeKir3hk/Qdv7JxXMGyRCmLAL6VtvNMo2DMsLvL43czmvUUq8tsjpVOsXhi8GxbvgnOuFZ01Z5EuCI+UptmCtmOJik9zbSdf/mVJQE5KRRQuLMJHsMaCqX1+bShUrziJXLQPnizSqDosyCYzm+auG/h5rSi2fIhbhCU2QVCT+sESI9jCTjplobweVjRmkd6o00dD3nNQHdAyp7E/pBF2k9Mwl0VKGIQfYFa5L2epyN2nJs0q2XSW5jndvYzEAbhlVcPlSkX1dzgMQsqlJzg7y5KqBNiySQ6Osv66fwDn9CLZIAcU3QAAAABJRU5ErkJggg==" />
                    </span>
                </td>
            </tr>
        </table>


    </div>

</%block>

<%block name="footer">
    <%include file="dashboard/scripts.mak"/>
    <script type="text/javascript" src="/static/prototype.js"></script>
</%block>
