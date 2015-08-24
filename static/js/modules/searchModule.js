// =========================================================================
//  SEARCH RESULTS MODULE
// =========================================================================
WHOAT.search = (function ($, w, undefined) {
    'use strict';

    var contact_id,
    browse_open = false;
        
    var wireSearch = function (loc) {

        var term = '';
        var fixedDecodeURI = function(str) {
            return decodeURI(str);
        }

        if (loc[3] === undefined) {
            term = fixedDecodeURI(loc[2]);
            $('#dash_search_input').val(term);
            
        } else if (loc[3] != undefined) {
            term = fixedDecodeURI(loc[3]);
            $('#dash_search_input').val(term);
        }

    	// Open vCard modal
        $('.open_modal').unbind('click').bind('click', function () {
            var row        = $(this),
            params         = {},
            $tr            = row.closest("tr"),
            modalType      = $(this).data('modal'),
            contactDetails = $(this).parents('tr:first').data('user-details'),
            contactID      = row.parents('tr:first').data('contact-id'),
            contact_id     = $.trim(contactID);

            switch (modalType) {
                case 'contact_details':
                    params = { 'id' : contact_id };
                    WHOAT.modal.generateModal('contact', contact_id, params, 'vcard', false, {}, '', '', 'off');
                    break;

                case 'intro_request':
                    params = { 'id' : contact_id };
                    WHOAT.modal.generateModal('contact', contact_id, params, 'intro', false, contactDetails);
                    break;

                case 'intro_request_combo':
                    params = { 'id' : contact_id };
                    WHOAT.modal.generateModal('contact', contact_id, params, 'intro_combo', true, contactDetails);
                    break;
            }

            WHOAT.modal.wireModals().activateCloseModal();
        });
    }

    var wireBrowseTabButtons = function () {
        var rowCheck = $('#browse_results tbody').find('td');

        if (rowCheck.length > 1) { 
            try{
                $("#browse_results").dataTable({
                    "bPaginate": false
                });
            }  
            catch (e){};
        }

        $('.browse_tab_btn').unbind('click').bind('click', function () {
            var type = $(this).text().toLowerCase();
            
            // remove highlighted
            $('.browse_tab_btn').each(function() {
                $(this).removeClass('highlighted');
            });

            // highlight selected tab

            // goto browse section:
            navigateToBrowse(type);
        });
    }

    var navigateToBrowse = function(tab) {
        $('#browse_btn').css('color', '#515656');
        $('#browse_btn').css('background', '#d9d9d9');
        $('#browse_selections').slideUp('fast');
        browse_open = false;

        switch (tab) {
            case 'companies':
                WHOAT.networking.redirectToURL("/view/companies");
                break;
            case 'titles':
                WHOAT.networking.redirectToURL("/view/titles");
                break;
            case 'regions':
                WHOAT.networking.redirectToURL("/view/regions");
                break;
            }
    }

    var wireBrowseTabs = function(tab) {
        $('#browse_companies').hide();
        $('#browse_titles').hide();
        $('#browse_regions').hide();

        switch (tab) {
            case 'companies':
                $('#browse_companies').show();
                $('#tab_companies').addClass('highlighted');
                break;
            case 'titles':
                $('#browse_titles').show();
                $('#tab_titles').addClass('highlighted');
                break;
            case 'regions':
                $('#browse_regions').show();
                $('#tab_regions').addClass('highlighted');
                break;
        }
    }

    return {
        wireSearch : wireSearch,
        wireBrowseTabButtons : wireBrowseTabButtons,
        wireBrowseTabs : wireBrowseTabs
    };

}(jQuery, window));