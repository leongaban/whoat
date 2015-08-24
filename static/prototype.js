function ObjectEncoder(target){

    var self = this;
    this.params = {};
    this.target = target;
    if(isString(target)){
        this.target = $(target);
    }
    this.container = null;
    /*function init(){
        throw new Error("The init function has not been overriddent!");
    };
    */

    /*
    this.createContainer = function(){

        throw new Error("The createContainer function has not been overriddent!");
    };
     */

    this.container = this.createContainer();
    this.target.append(this.container);

};

function SearchResultsEncoder(target){
    this.offset = 0;
    this.limit = 10;
    this.query = null;


    this.createContainer = function(){
        var buffer = [];
        buffer.push("<table>");

        buffer.push("<tr>");
        buffer.push("<td style='width: 50px;'>&nbsp;</td>");
        buffer.push("<td style='width: 100px;'>Avatar</td>");
        buffer.push("<td style='width: 150px;'>Name</td>");
        buffer.push("<td style='width: 150px;'>Title</td>");
        buffer.push("<td style='width: 150px;'>Company</td>");

        buffer.push("<td style='width: 50px;'><img src='"+widget.sprites.network_personal_on+"'/></td>");
        buffer.push("<td style='width: 50px;'><img src='"+widget.sprites.network_coworkers_on+"'/></td>");
        buffer.push("<td style='width: 50px;'><img src='"+widget.sprites.network_groups_on+"'/></td>");
        buffer.push("<td style='width: 50px;'><img src='"+widget.sprites.network_friends_on+"'/></td>");
        buffer.push("</tr>");
        buffer.push("</table>");
        html = buffer.join("\n");
        container = $(html);
        return container;
    };

    this.next = function(){
        console.log("NEXT!");
        widget.search(this.params);
    };

    this.load = function(query){
        function callback(scope, objects){
            var self = scope;
            return function(objects){
                self.render(objects);
                if(objects.length > 0){
                    self.next();
                }
            };
        };

        this.query = query;
        this.offset = 0;
        this.params = {
            query: query,
            offset: this.offset,
            limit: this.limit,
            //fn: widget.search,
            callback: callback(this)
        };
        //this.params.fn(this.params);
        widget.search(this.params);
    };

    this.render = function(objects){
        if(isArray(objects) === false){
            objects = [objects];
        }
        var params = this.params;
        //alert(params);
        //alert(params);
        params.count = objects.length;

        if(objects.length === 0){
            return;
        }

        function flattenNetworks(networks){
            var table = {
                personal: null,
                friends: null,
                coworkers: null,
                groups: null
            }

            for(var i = 0; i<networks.length; i++){
                var n = networks[i];
                if(n.type == "Personal"){
                    table.personal = 1;
                    continue;
                }

                if(n.type == "Organization"){
                    if(table.coworkers === null)
                        table.coworkers = 1;
                    else
                        table.coworkers += 1;
                    continue;
                }

                if(n.type == "Friends"){
                    if(table.friends === null)
                        table.friends = 1;
                    else
                        table.friends += 1;
                    continue;
                }

                if(n.type == "Groups"){
                    if(table.groups === null)
                        table.groups = 1;
                    else
                        table.groups += 1;
                    continue;
                }
            }
            return table;
        };

        var buffer = [];
        for(var i = 0; i< objects.length; i++){
            var contact = objects[i];
            var contact_id = contact.id;
            var label = contact.label;
            var avatar = contact.avatar;
            var title = contact.title;
            var company = contact.organization;
            title = (title === null || title === undefined) ? "&nbsp;" : title;
            company = (company === null || company === undefined) ? "&nbsp;" : company;
            var networks = flattenNetworks(contact.networks);
            var member = contact.member;
            if(member !== undefined){
                avatar = member.avatar;
            }
            var personal = (networks.personal === null) ? false : true;

            var span = "<span style='display: none;' id='contact_body_"+contact_id+"'>"+widget.json(contact)+"</span>";
            var button = "<input type='button' value='request' id='contact_button_"+contact_id+"' />";
            if(personal !== null){
                button = "<input type='button' value='details' id='contact_button_"+contact_id+"' />";
            }

            buffer.push("<tr>");
            buffer.push("<td>"+span+" "+button+"</td>");
            buffer.push("<td><img src='"+ avatar + "'/></td>");
            buffer.push("<td><a href='" + label + "'>"+ label + "</a></td>");
            buffer.push("<td>" + title + "</td>");
            buffer.push("<td>" + company + "</td>");
            if(networks.personal === null){
                buffer.push("<td>&nbsp;</td>");
            }else{
                buffer.push("<td>" + networks.personal + "</td>");
            }
            if(networks.coworkers === null){
                buffer.push("<td>&nbsp;</td>");
            }else{
                buffer.push("<td>" + networks.coworkers + "</td>");
            }
            if(networks.groups === null){
                buffer.push("<td>&nbsp;</td>");
            }else{
                buffer.push("<td>" + networks.groups + "</td>");
            }
            if(networks.friends === null){
                buffer.push("<td>&nbsp;</td>");
            }else{
                buffer.push("<td>" + networks.friends + "</td>");
            }
            buffer.push("</tr>");
        }
        var html = buffer.join("\n");
        var snippet = $(html);

        $(self.container).append(snippet);
        this.next();
    };

    ObjectEncoder.call(this, target);
};

jQuery.extend(SearchResultsEncoder.prototype, ObjectEncoder.prototype);


var sprites = {};
sprites.network_personal_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMkRENjJFRkQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMkRENjJGMEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkVERDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkVFRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2KK18wAAAGJJREFUOMtj+NpuLATE54D4PwEMUiPEACSOokloAjEDFLuhyR1mIMJkFAzTwEAkHtUwqmEkaEDHb4H4J74MhIwPADEjEHPj0nATTXAT1Ho2LBqOgyR0oU5AljgPxC+wlBoiAB9+NuWyWPBKAAAAAElFTkSuQmCC";
sprites.network_personal_off = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMkRENjJGM0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMkRENjJGNEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkYxRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkYyRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+U7uVxAAAAGFJREFUOMtj2Hv8uBAQnwPi/wQwSI0QA5A4iiahCcQMUOyGJneYgQiTUTBMAwOReFTDqIaRoAEdvwXin/gyEDI+AMSMQMyNS8NNNMFNUOvZsGgAS+hCnYAscR6IX2ApNUQA4u3fFfhm+bYAAAAASUVORK5CYII=";

sprites.network_coworkers_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4Q0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4REQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NjU0OThBRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM5NjU0OThCRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NDrrYQAAAQlJREFUOMtj+NpuzAbENUB8D4j/A/ELIG4FYk4gZoBhEOELVYCO49EVyuJQqIGuEIQPoim6BcSM2BSyAzE/EHMAMReUz4BNIRMQzwLitUC8GIhZcSnkRrNaCJdCcTSFyrgUaqApNAdiZmwK7dEUBgCxDDaF0WgKC6DOkUJXWImmcCrUg6XoChehKdwDdeNHWMDDFJ5DU/gWKv4TFpUwhd+xxDXIpItAPBGmkAlHomCDxtJvkDMYoOkOm0JBIK6Hsi1ACkVxKFSApkkQeylIoRoOhcbQQL8OxE4ghTY4FPqhx0w4DoXZ6Aq5oMYjK3oGxALY4hoUFMehiu5Aow9rMgNhFiCehJ5NYRgA6IP/g6qKgGoAAAAASUVORK5CYII=";
sprites.network_coworkers_off = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFN0ZDOUFCRkQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFN0ZDOUFDMEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NjU0OThFRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3RkM5QUJFRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+wjw1BQAAAQlJREFUOMtj2Hv8OBsQ1wDxPSD+D8QvgLgViDmBmAGGQYQvVAE6jkdXKItDoQa6QhA+iKboFhAzYlPIDsT8QMwBxFxQPgM2hUxAPAuI1wLxYiBmxaWQG81qIVwKxdEUKuNSqIGm0ByImbEptEdTGADEMtgURqMpLIA6RwpdYSWawqlQD5aiK1yEpnAP1I0fYQEPU3gOTeFbqPhPWFTCFH7HEtcgky4C8USYQiYciYINGku/Qc5ggKY7bAoFgbgeyrYAKRTFoVABmiZB7KUghWo4FBpDA/06EDuBFNrgUOiHHjPhOBRmoyvkghqPrOgZEAtgi2tQUByHKroDjT6syQyEWYB4Eno2hWEAldqR0r8c4REAAAAASUVORK5CYII=";

sprites.network_groups_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4NEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4NUQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyREQ2MkY1RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyREQ2MkY2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3ftIfgAAAQ9JREFUOMtj+NpuzEAEZgbifCB+BsSvgbgaiNlAcsRoZgTiU0D8Hw1fBxlMjAFWWDTDcAgxBmTiMaCHGAOc8RgQT4wB5Tg0gwKTg5DmOiQNP5HYW4FYEFss8ACxEhALAHEnkoZHQMwHxEzQKIXrQY6qThxOvQPEXLhcCWPk4ND8F4g58XkTxviKJ6R5CRnAhEczCIsQ44L1eAzgIMYAfiB+gcOAfUDMQsgAEGYF4lBobKQD8QYkQ45C5fEagI5BYbMMyZBzQNwASv9AbE6MAbD0MReH15aC5InJC5p4AtiGGANS8BjQSYwBoXgMKCDGAG60nIiMRRmILFRV0NLJZyA2IbZQRY4RCSCWgUYxWBwAl3TvAMDXKP4AAAAASUVORK5CYII=";
sprites.network_groups_off = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDOTY1NDk4OEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDOTY1NDk4OUQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NjU0OTg2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM5NjU0OTg3RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vRT+BgAAAQ9JREFUOMtj2Hv8OAMRmBmI84H4CRC/BuJqIGYDyRGjmRGITwHxfzR8HWQwMQZYYtEMwyHEGJCJx4AeYgxwxmNAPDEGlOPQDApMDkKa65A0/ERibwViQWyxwAPESkAsAMSdSBoeATEfEDNBoxSuBzmqOnE49Q4Qc+FyJYyRg0PzXyDmxOdNGOMrnpDmJWQAEx7NICxCjAvW4zGAgxgD+IH4BQ4D9gExCyEDQJgViEOhsZEOxBuQDDkKlcdrADoGhc0yJEPOAXEDKP0DsTkxBsDSx1wcXlsKkicmL2jiCWAbYgxIwWNAJzEGhOIxoIAYA7jRciIyFmUgslBVQUsnn4HYhNhCFTlGJIBYBhrFYHEAwwfPTFbh8H4AAAAASUVORK5CYII=";

sprites.network_friends_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFN0ZDOUFDM0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFN0ZDOUFDNEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3RkM5QUMxRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3RkM5QUMyRDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0XeCpwAAAc5JREFUSMellV0rw1Ecx2cexiQZJXnImjxdkIcyLOVhFkOIzQUXTDOxluItoCxXLrwB78AL8AKUa653oeRSLrT4nvqeOk7nqDMXn/q3nX3+55zf9/eb5+NixPMPKkEz6AFV8nNXiRf0ggw4BtOgAzSAlKu0EWTBOghY1uRcpGUgD+qVF8yBNZAECyACDl13egqGQCuYAN8GloHPRRoCfeCAOzVJV0Cba6FEYdKgHBQN0iUW7pc0zntJ8cejoFb5fgv0gwFQMEg3wZEuzWg7qwHDfJEQjrEgz5bjX8oE6FIZ4AoG28dnkc9xcMcdmaRPMqtqZ4iLvuKR9R+8snNewKBFKogBv5S28E6jYNewuMDjdzKb9xapyG+XlE6yemHwZli8A864VnTWrEU6LzxSmmYL2o4lKj7Fte18+ZclATkpFVE4twgfwCoLpvb5taFQ3eIkctEeeLRIo+qwIBvMbJq7ruPn1aLY8iFuERbZBEFN6geLjGATO+mEhfJ6WNGYRXqjTh8Nec9BdUDLnMb+kEbYTU7DXBYpYRC+gxnlvpylInefmjSrZNNZmud09zIS++CWVQ2XKhXV3+YwCCmXnuDsLEmqEmDLJjk4Svrr/gHk2++bxUIhngAAAABJRU5ErkJggg==";
sprites.network_friends_off = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFN0ZDOUFDN0Q2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFN0ZDOUFDOEQ2QTIxMUUyODlGRkIzNDlBMDJCMjgyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3RkM5QUM1RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3RkM5QUM2RDZBMjExRTI4OUZGQjM0OUEwMkIyODJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PkNkogAAAc5JREFUSMelld0rw1EYx2dexiQZJXnJmrxdECnDUl5mMYTYXHDBNBNrKf4FKcuVC/+A/8Ctcrcb5ZrrXSi5dqHF99T31HE6R525+NSv7ezzO+c83+eZ56FQ8PyDatAK+kCN/NxV4gX9IANOwAzoAk0g5SptBlmwAQKWNTkXaQXIg0blBfNgHSTBIoiAI9ednoER0A4mwbeBFeBzkYbAADjkTk3SVdDhWihRmDSoBCWDdJmF+yWN815S/PEYqFe+3waDYAgUDdItcKxLM9rO6sAoXySE4yzIi+X4lzIBulQGuIrB9vFZ5HMC3HFHJumzzKraGeKir3hk/Qdv7JxXMGyRCmLAL6VtvNMo2DMsLvL43czmvUUq8tsjpVOsXhi8GxbvgnOuFZ01Z5EuCI+UptmCtmOJik9zbSdf/mVJQE5KRRQuLMJHsMaCqX1+bShUrziJXLQPnizSqDosyCYzm+auG/h5rSi2fIhbhCU2QVCT+sESI9jCTjplobweVjRmkd6o00dD3nNQHdAyp7E/pBF2k9Mwl0VKGIQfYFa5L2epyN2nJs0q2XSW5jndvYzEAbhlVcPlSkX1dzgMQsqlJzg7y5KqBNiySQ6Osv66fwDn9CLZIAcU3QAAAABJRU5ErkJggg==";
widget.sprites = sprites;


var contacts = widget.api.get("contacts");
var members = widget.api.get("members");

contacts.lookup = function(){
    var params = arguments[0];
    if(isString(params)){
        params = {
            name: params
        }
    }

    var callback = (arguments.length > 1) ? arguments[1] : params.callback;
    var name = params.name;
    var emails = (params.emails === undefined || params.emails === null) ? null : params.emails;
    if(emails === null){
        var email = (params.email === undefined || params.email === null) ? null : params.email;
        if(email !== null){
            emails = [email];
        }
    }

    var phones = (params.phones === undefined || params.phones === null) ? null : params.phones;
    if(phones === null){
        var phone = (params.phone === undefined || params.phone === null) ? null : params.phone;
        if(phone !== null){
            phones = [phone];
        }
    }

    var companies = (params.companies === undefined || params.companies === null) ? null : params.companies;
    if(companies === null){
        var company = (params.company === undefined || params.company === null) ? null : params.company;
        if(company !== null){
            companies = [company];
        }
    }


    var queryParams = [];
    if(emails !== null){
        emails = emails.join("|");
        queryParams.push("emails=" + emails);
    }

    if(phones !== null){
        phones = phones.join("|");
        queryParams.push("phones=" + phones);
    }

    if(companies !== null){
        companies = companies.join("|");
        queryParams.push("companies=" + companies);
    }

    queryParams = queryParams.join("&");
    var query = name + "?" + queryParams;
    widget.invoke("contacts/lookup", query, callback);
    return params;
};


contacts.search = function(){
    var params = arguments[0];
    if(isString(params)){
        params = {
            query: params
        }
    }
    var callback = (arguments.length > 1) ? arguments[1] : params.callback;
    var query = params.query;
    var offset = (params.offset === undefined || params.offset === null) ? 0 : params.offset;
    var limit = (params.limit === undefined || params.limit === null) ? 25 : params.limit;

    query = (query + "?offset=" + offset + "&limit=" + limit);
    widget.invoke("contacts/search", query, callback);
    params.offset = (offset + limit);
    return params;
};
widget.search = contacts.search;



members.get = function(){
    var member_id = arguments[0];
    var callback = arguments[1];
    widget.invoke("member/details/" + member_id, callback);
};



function ContactPreviewBuilder(target){
    this.createContainer = function(){
        var buffer = [];
        buffer.push("<div style='width: 500px; height: 500px; background-color: green;'>");

        buffer.push("</div>");
        html = buffer.join("\n");
        container = $(html);
        return container;
    };


    this.load = function(params){
        function callback(scope, object){
            var self = scope;
            return function(object){
                self.render(object);
            };
        };


        if(isString(params)){
            params = {
                name: params
            };
        }
        params.callback = callback(this);
        widget.contacts.lookup(params);
    };

    this.render = function(contact){
        console.log(contact);


        function flattenNetworks(networks){
            var table = {
                personal: null,
                friends: null,
                coworkers: null,
                groups: null
            };

            for(var i = 0; i<networks.length; i++){
                var n = networks[i];
                if(n.type == "Personal"){
                    table.personal = 1;
                    continue;
                }

                if(n.type == "Organization"){
                    if(table.coworkers === null)
                        table.coworkers = 1;
                    else
                        table.coworkers += 1;
                    continue;
                }

                if(n.type == "Friends"){
                    if(table.friends === null)
                        table.friends = 1;
                    else
                        table.friends += 1;
                    continue;
                }

                if(n.type == "Groups"){
                    if(table.groups === null)
                        table.groups = 1;
                    else
                        table.groups += 1;
                    continue;
                }
            }
            return table;
        };

        var buffer = [];
        buffer.push("<table>");

        var contact_id = contact.id;
        var label = contact.label;
        var avatar = contact.avatar;
        var title = contact.title;
        var company = contact.organization;
        title = (title === null || title === undefined) ? "&nbsp;" : title;
        company = (company === null || company === undefined) ? "&nbsp;" : company;
        var networks = flattenNetworks(contact.networks);
        var member = contact.member;
        if(member !== undefined){
            avatar = member.avatar;
        }
        var personal = (networks.personal === null) ? false : true;

        var span = "<span style='display: none;' id='contact_body_"+contact_id+"'>"+widget.json(contact)+"</span>";
        var button = "<input type='button' value='request' id='contact_button_"+contact_id+"' />";
        if(personal !== null){
            button = "<input type='button' value='details' id='contact_button_"+contact_id+"' />";
        }

        buffer.push("<tr>");
        buffer.push("<td>"+span+" "+button+"</td>");
        buffer.push("<td><img src='"+ avatar + "'/></td>");
        buffer.push("<td><a href='" + label + "'>"+ label + "</a></td>");
        buffer.push("<td>" + title + "</td>");
        buffer.push("<td>" + company + "</td>");
        if(networks.personal === null){
            buffer.push("<td>&nbsp;</td>");
        }else{
            buffer.push("<td>" + networks.personal + "</td>");
        }
        if(networks.coworkers === null){
            buffer.push("<td>&nbsp;</td>");
        }else{
            buffer.push("<td>" + networks.coworkers + "</td>");
        }
        if(networks.groups === null){
            buffer.push("<td>&nbsp;</td>");
        }else{
            buffer.push("<td>" + networks.groups + "</td>");
        }
        if(networks.friends === null){
            buffer.push("<td>&nbsp;</td>");
        }else{
            buffer.push("<td>" + networks.friends + "</td>");
        }
        buffer.push("</tr>");
        buffer.push("</table>");

        var html = buffer.join("\n");
        var snippet = $(html);

        $(self.container).append(snippet);
        console.log($(self.container).html());
    };

    ObjectEncoder.call(this, target);
};

jQuery.extend(ContactPreviewBuilder.prototype, ObjectEncoder.prototype);

$(function(){
    //members.get(1, function(o){debug(o);});
    //contacts.lookup({name: "Rupal Dalal", emails: ["rupal22@gmail.com", "purple244@aol.com"]}, function(o){console.log("callback!");});
    //var encoder = new SearchResultsEncoder("#bigbox");
    //encoder.load("dallas");
    var builder = new ContactPreviewBuilder("#bigbox");
    //builder.load({name: "Rupal Dalal"});

});