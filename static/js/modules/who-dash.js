/**
 * Created with Sublime Text 2.
 * User: leongaban
 * Date: 3/7/14
 * Time: 2:50 PM
 * For Who@ Intro Dashboard | Version 3
 */

// =========================================================================
//  DASHBOARD methods and functions
// =========================================================================
WHOAT.dashboard = (function ($, w, undefined) { 'use strict';

	// Module Settings & Init
    var	timeoutHandle  = '',
		app_menu_open  = false,
		gear_menu_open = false,
		browse_open    = false;
	
	// Init globals:
	var init = function() {

		// Determine OS
		// var OSName="Unknown OS";
		// if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
		// if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
		// if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
		// if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
		// console.log(OSName);

		var loc = location.pathname;
		home.wireDashboard();
		wireUpViews(loc);

		function wireUpViews(loc) {
			
			loc = loc.split("/");
			
			switch (loc[1]) {

				// WIRE DASHBOARD
			    case 'dashboard':

			    	// Wire Heatmap
			    	home.heatmap();

			    	// Check for requests
			    	var outbox_num   = parseInt($('.default_outbox_count .viewing_outbox_num').text());
					var outbox_total = parseInt($('.default_outbox_count .viewing_outbox_total').text());
					var inbox_total  = parseInt($('.default_inbox_count .viewing_inbox_total').text());

					if (outbox_total > 0 || inbox_total > 0) {
						home.wireTableHighlighting();
					}

					// If there are outbox messages, wire Outbox list
					if (outbox_total > 0) {
			        	WHOAT.messaging.wire.outboxList(
			        		'.default_outbox_count .viewing_outbox_num',
			        		'.default_outbox_count .viewing_outbox_total',
			        		'.default_outbox_list .the_outbox_table',
			        		'.default_outbox_count .goto_outbox'
			        	);

					} else {
						home.outbox.wireNoOutboxHelpers();
					}

					// If there are inbox messages, wire Inbox list
					if (inbox_total > 0) {
			        	WHOAT.messaging.wire.inboxList(
			        		'.default_inbox_count .viewing_inbox_num',
			        		'.default_inbox_count .viewing_inbox_total',
			        		'.default_inbox_list .the_inbox_table',
			        		'.default_inbox_count .goto_inbox'
			        	);

					} else {
						home.inbox.wireNoInboxHelpers();
					}

			    	break;

			    // WIRE OUTBOX
			    case 'outbox': case 'intro_outbox':

			    	$('.outbox_sidebar_btn').addClass('on');

			    	// Render Outbox List View
			    	if (loc.length === 2) {
			    		var outbox_list_total = parseInt($('.intro_outbox_list .widget_lid em').text());
			    		if (outbox_list_total > 0) {
							home.wireTableHighlighting();
			        		WHOAT.messaging.wire.outboxList(
				        		'.default_outbox_count .viewing_outbox_num',
				        		'.default_outbox_count .viewing_outbox_total',
				        		'.default_outbox_list .the_outbox_table',
				        		'.default_outbox_count .goto_outbox'
			        		);
						} else {
							home.outbox.wireNoOutboxHelpers();
						}

			    	// Render Outbox Details View
			    	} else if (loc.length === 3) {
			    		WHOAT.messaging.wire.outboxDetails(loc[2]);
			    	}

			    	break;

			    // WIRE INBOX
			    case 'inbox': case 'intro_inbox':

			    	$('.inbox_sidebar_btn').addClass('on');

			    	// Render Inbox List View
			    	if (loc.length === 2) {
			    		var inbox_list_total = parseInt($('.intro_inbox_list .widget_lid em').text());
			    		if (inbox_list_total > 0) {
				        	home.wireTableHighlighting();
				        	WHOAT.messaging.wire.inboxList(
				        		'.default_inbox_count .viewing_inbox_num',
				        		'.default_inbox_count .viewing_inbox_total',
				        		'.default_inbox_list .the_inbox_table',
				        		'.default_inbox_count .goto_inbox'
				        	);
						} else {
							home.inbox.wireNoInboxHelpers();
						}

					// Render Inbox Details View
					} else if (loc.length === 3) {
			    		WHOAT.messaging.wire.inboxDetails(loc[2]);
					}

			    	break;

			    // WIRE BROWSE: companies, titles, regions
			    case 'view':
			    	WHOAT.search.wireBrowseTabButtons();
			    	//home.browse.wireBrowseTabButtons();

			    	switch (loc[2]) {

					    case 'companies':
					    	WHOAT.search.wireBrowseTabs(loc[2]);
					    	break;

					    case 'titles':
					    	WHOAT.search.wireBrowseTabs(loc[2]);
					    	break;

					    case 'regions':
					    	WHOAT.search.wireBrowseTabs(loc[2]);
					    	break;
			    	}

			    	break;

			    // WIRE CONTACTS
			    case 'contacts':
			    	WHOAT.contacts.wireContacts();
			    	break;

			    // WIRE INVITE COWORKERS
			    case 'invite':
			    	WHOAT.contacts.wireInviteCoworkers();
			    	break;

			    // WIRE SEARCH
			    case 'search':
  				  	WHOAT.search.wireSearch(loc);
			    	break;

			    // WIRE PROFILE
			    case 'profile':
			    	$('#dashboard_sidebar_menu > div').removeClass('on');
			    	var profileData = $('.profile_fields ul').data('profile');
	    			WHOAT.profile.wireProfile(profileData);
			    	break;

			    // WIRE ALERTS
			    case 'alerts':
			    	$('.alerts_sidebar_btn').addClass('on');
				    // WHOAT.alerts.wireAlerts(null, 'page');
			    	break;

			    // WIRE SYNC
			    case 'sync':
			    	WHOAT.contacts.wireSyncContacts();
			    	break;

			    // WIRE REPORTS
			    // ------------------------------------------------------
			    case 'reports':
					WHOAT.reports.wireReports();
			    	// Highlight Reports button
			    	$('.dash_sidebar_btn').removeClass('on');
			    	$('.reports_sidebar_btn').addClass('on');

			    	switch (loc[2]) {

			    		// WIRE REPORTS ONBOARDING
					    case 'on_board':
					    	WHOAT.reports.wireOnboardingReport();
					    	break;
					    // WIRE REPORTS ENGAGEMENT
					    case 'engagement':
					    	WHOAT.reports.wireEngagementReport();
					    	break;
					    // WIRE REPORTS UNREGISTERED
					    case 'unregistered':
					    	WHOAT.reports.wireUnregisteredReport();
					    	break;
			    	}

			    	break;
			}
		}
	};

	// iPad fix to hide keyboard on submit
	var hideKeyboard = function() {
		document.activeElement.blur();
		$("input").blur();
	};

	// Dashboard Home View
	var home = (function () {

		var showDashboard = function() {
			$('.white_cover').hide();
			$('.white_cover').remove();
		}

	    var	wireDashboard = function() {

	    	gearMenu.wireGearMenu();
	    	search.wireSearchButton();
	    	sideBar.wireSidebar();

	    	// Top Bar Actions:
	    	$('.whoat_logo_svg').unbind('click').bind('click', function() {
	    		window.location = '/';
	    	});

	    	// View All Companies
	    	$('#browse_companies').unbind('click').bind('click', function () {
				browse.navigateToBrowse('companies');
			});

	    	// View All / Browse dropdown
	    	$('.show_browse_choices').unbind('click').bind('click', function() {
	    		$(this).blur();

	    		if (browse_open === false) {
	    			browse_open = true;
		    		$('.browse_dropdown_arrow').css('background-position', '-418px -30px');
		    		$('#browse_options').slideDown('fast');
		    		browse.wireBrowseSelections();

		    		// Close view All
					$('#contentWrapper').unbind('click').bind('click', function() {
						if (browse_open) {
			    			browse_open = false;
			    			$('.browse_dropdown_arrow').css('background-position', '-409px -30px');
			    			$('#browse_options').slideUp('fast');
			    		}
					});

					// Start timer to hide View All
					$('#browse_options').unbind('mouseleave').bind('mouseleave', function() {
					    timeoutHandle = setTimeout(function() {
					    	$('.browse_dropdown_arrow').css('background-position', '-409px -30px');
			    			$('#browse_options').slideUp('fast');
					    	browse_open = false;
					    }, 1500);
					});

					// Clear time to hide View All
					$('#browse_options').unbind('mouseenter').bind('mouseenter', function() {
					    window.clearTimeout(timeoutHandle);
					});

	    		} else if (browse_open) {
	    			browse_open = false;
	    			$('.browse_dropdown_arrow').css('background-position', '-409px -30px');
	    			$('#browse_options').slideUp('fast');
	    		}
	    	});

			// Logout from footer
			$('.logout').bind('click', function () {
		        WHOAT.networking.redirectToURL('/logout');
		    });
        }

        var spinner = (function() {

        	var up = function() {
				$('#spinner').show();
				$('#spinner').removeClass('animateDown');
				$('#spinner').addClass('animateUp');
				$('#spinner').bind('oanimationend animationend webkitAnimationEnd', function() {
					$('#spinner').show();
				});
			};

			var down = function() {
				$('#spinner').removeClass('animateUp');
				$('#spinner').addClass('animateDown');
				$('#spinner').bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {
					$('#spinner').hide();
				});
			};

        	return {
				up: up,
				down: down
			}
		}());

        // wire gear menu
        var gearMenu = (function () {

        	var wireGearMenu = function() {

        		// hide Gear Menu on body html click
				$('html').unbind('click').bind('click', function() {
					if (gear_menu_open === true) {
						$('.gear_menu').slideUp(200);
						window.clearTimeout(timeoutHandle);
					}
				});

				// toggle Gear Menu on click
				$('.dash_settings').unbind('click').bind('click', function(event) {
					gear_menu_open = true;
			    	$('.gear_menu').slideToggle(200);
			    	event.stopPropagation();
			   	});

			   	$('.dash_settings').unbind('mouseleave').bind('mouseleave', function() {
				    timeoutHandle = setTimeout(function() {
				    	$('.gear_menu').slideUp(200);
				    }, 1500);
				});

			   	$('.dash_settings').unbind('mouseenter').bind('mouseenter', function() {
				    window.clearTimeout(timeoutHandle);
				});

				$('#goto_contacts').unbind('click').bind('click', function () {
					WHOAT.networking.redirectToURL('/contacts');
				});

				$('#goto_invite').unbind('click').bind('click', function () {
					WHOAT.networking.redirectToURL('/invite');
				});

				$('#goto_sync').unbind('click').bind('click', function () {
					WHOAT.networking.redirectToURL('/sync');
				});

				$('#goto_tour').unbind('click').bind('click', function () {
					$.get("/show/ftue", function(data) {
			            $("#ftue_tour").html(data);
			            WHOAT.modal.wireTourSyncModal().startTour("ftue", "withClose");
			            WHOAT.analytics.trackClickEvent("View Tour");
			        });
				});

	            $('#goto_profile').unbind('click').bind('click', function () {
					WHOAT.networking.redirectToURL('/profile');
				});

				$('#goto_reports').unbind('click').bind('click', function () {
					WHOAT.networking.redirectToURL('/reports/on_board');
				});

				$('#goto_logout').unbind('click').bind('click', function () {
					WHOAT.networking.redirectToURL('/logout');
				});
			};

			// fade Gear Menu on mouse off
			$('.gear_menu').unbind('mouseleave').bind('mouseleave', function() {
			    timeoutHandle = setTimeout(function() {
			    	$('.gear_menu').slideUp(200);
			    	gear_menu_open = false;
			    }, 1500);
			});

			// reset Gear Menu on mouse on
		   	$('.gear_menu').unbind('mouseenter').bind('mouseenter', function() {
			    window.clearTimeout(timeoutHandle);
			});

        	var show = function() {
	            $('.gear_menu').slideDown(200);
	            gear_menu_open = true;
			};

			var hide = function() {
				$('.gear_menu').slideUp(200);
				gear_menu_open = false;
			};

	        return {
				wireGearMenu: wireGearMenu,
				show: show,
				hide: hide
			}
		}());

        // table row hover
		var wireTableHighlighting = function() {
			// use class here to keep it only on list views...
			$(".wire_td_highlighting").delegate('td','mouseover mouseout', function(e) {
			   	if (e.type == 'mouseover') {
			   		$(this).parent().css("background", '#eee');
			    } else {
			    	$(this).parent().css("background", '#ffffff');
			    }
			});
		}

		// var wireMakeIntro = function(position) {
			// 	WHOAT.networking.getToServerWithAjax('/get/makeintro', null, function (response) {
   //                  if (response) {
   //                  	positionWidgets('intro', response, position);
   //                  }
   //              });
			// }

		// wire widgets (expand, pages):
		var widgets = (function() {

			
			var wireExpand = function(position) {
				position = position || "bot";

				function wireExpandFunctions() {

					// Invite & Friend buttons, need refactor
					$('.w_expand_tbody .invite_blue').unbind('click').bind('click', function (event) {
	                    var theBtn    = $(this),
	                        $tr       = $(this).closest("tr"),
	                        id        = $(theBtn).parents('tr:first').data('invite-id');

	                    var params    = {},
	                        coworkers = [];
	                        coworkers.push(id);
	                        params[0] = coworkers[0];

	                    $(theBtn).css('background', '#00386f');
	                    $(theBtn).css('cursor','auto');
	                    $(theBtn).html('Inviting...');
	                    $(theBtn).attr("disabled", "true");

	                    WHOAT.networking.postToServerWithAjax('/invite/coworkers', params, function (response) {
	                        if (response.result === 'success') {
	                            $(theBtn).css('background', '#ccc');
	                            $(theBtn).html('Invited');
	                        } else if (response.result === 'error') {
	                            $(theBtn).css('cursor','pointer');
	                            $(theBtn).removeAttr("disabled");
	                        }
	                    });
	                });

					// Add friend via email:
					$('#add_friend_form').unbind('submit').bind('submit', function (event) {
						var email = $('#add_friend_input').val(),
						params = { 'email' : email };

						WHOAT.networking.postToServerWithAjax('/add_friend_email', params, function (response) {
	                        if (response.result === 'success') {
	                            WHOAT.notify.topNotify('success', response.message);
	                        } else if (response.result === 'error') {
	                            WHOAT.notify.topNotify('error', response.message);
	                        }
	                    });
	                    return false;
	                });

					// Add friend via button:
					$('.w_expand_tbody .friend_yellow').unbind('click').bind('click', function (event) {

	                    var theBtn = $(this),
	                        $tr    = $(this).closest("tr"),
	                        userID = $(this).parents('tr:first').data('user-id'),
	                        id     = $.trim(userID);

	                    var params = { 'id' : id };

	                    $(theBtn).css('background', '#d69f00');
	                    $(theBtn).text('Sending...');
	                    $(theBtn).css('cursor','auto');
	                    $(theBtn).attr("disabled", "disabled");

	                    WHOAT.networking.postToServerWithAjax('/add_friend', params, function (response) {
	                        if (response.result === 'success') {
	                            $(theBtn).css('background', '#ccc');
	                            $(theBtn).html('Sent');
	                        } else if (response.result === 'error') {
	                            $(theBtn).css('cursor','pointer');
	                            $(theBtn).css('background', '#e4be0b');
	                            $(theBtn).removeAttr("disabled");
	                        }
	                    });
	                });

					// setup minimize for expand widget
					WHOAT.helper.wireMinimize(".expand_widget");
				}

				function positionWidget(response, position) {
		            var div_top = $('.expand_widget_top');
		            var div_bot = $('.expand_widget_bot');

		            if (position === 'top') {
		                $(div_top).empty();
		                $(div_top).append(response);
		                $(div_top).fadeIn('fast');
		            } else if (position === 'bot') {
		                $(div_bot).empty();
		                $(div_bot).append(response);
		                $(div_bot).fadeIn('fast');
		            }
		        }

				// NEED EXPAND MODULE
				WHOAT.networking.getToServerWithAjax('/get/expand', null, function (response) {
                    if (response) {
                    	positionWidget(response, position);
                    	wireExpandFunctions();
                    }
                });
			}

			return {
				wireExpand : wireExpand
			}
		}());

		var outbox = (function() {

			var fetchNextOutbox = function() {

				// Check for requests
				var outbox_num   = parseInt($('.fetch_outbox_count .viewing_outbox_num').text());
				var outbox_total = parseInt($('.fetch_outbox_count .viewing_outbox_total').text());

				// If there are outbox messages, wire Outbox list
				if (outbox_total > 0) {
					home.wireTableHighlighting();
		        	WHOAT.messaging.wire.outboxList(
		        		'.fetch_outbox_count .viewing_outbox_num',
		        		'.fetch_outbox_count .viewing_outbox_total',
		        		'.fetch_next_outbox_list .the_outbox_table',
		        		'.fetch_outbox_count .goto_outbox'
		        	);

				} else {
					wireNoOutboxHelpers();
				}
		    };

		    var reWireOutboxUnread = function() {
		    	$('.outbox_sidebar_btn .outbox_badge').unbind('mouseover').bind('mouseover', function () {
					$('.outbox_sidebar_btn .badge_help').fadeIn('fast');

					$('.outbox_sidebar_btn .outbox_badge').unbind('mouseout').bind('mouseout', function () {
						$('.outbox_sidebar_btn .badge_help').hide();
					});
				});
		    };

			var wireNoOutboxHelpers = function() {

				// setup minimize for outbox list widget
				WHOAT.helper.wireMinimize(".intro_outbox_list");

				$('.fake_help').unbind('mouseover').bind('mouseover', function () {
					$('#search_tooltip').animate({ opacity:'1' });
				});

				$('.fake_help').unbind('mouseout').bind('mouseout', function () {
					$('#search_tooltip').animate({ opacity:'0' });
				});
			}

			return {
				fetchNextOutbox : fetchNextOutbox,
				reWireOutboxUnread : reWireOutboxUnread,
				wireNoOutboxHelpers : wireNoOutboxHelpers
			}
		}());

		var inbox = (function() {

			var fetchNextInbox = function() {

				// Check for requests
				var inbox_num   = parseInt($('.fetch_inbox_count .viewing_inbox_num').text());
				var inbox_total = parseInt($('.fetch_inbox_count .viewing_inbox_total').text());

				// If there are inbox messages, wire inbox list
				if (inbox_total > 0) {
					home.wireTableHighlighting();
		        	WHOAT.messaging.wire.inboxList(
		        		'.fetch_inbox_count .viewing_inbox_num',
		        		'.fetch_inbox_count .viewing_inbox_total',
		        		'.fetch_next_inbox_list .the_inbox_table',
		        		'.fetch_inbox_count .goto_inbox'
		        	);

				} else {
					wireNoInboxHelpers();
				}
		    };

		    var reWireInboxUnread = function() {
		    	$('.inbox_sidebar_btn .inbox_badge').unbind('mouseover').bind('mouseover', function () {
					$('.inbox_sidebar_btn .badge_help').fadeIn('fast');

					$('.inbox_sidebar_btn .inbox_badge').unbind('mouseout').bind('mouseout', function () {
						$('.inbox_sidebar_btn .badge_help').hide();
					});
				});
		    };

			var wireNoInboxHelpers = function() {

				// setup minimize for inbox list widget
				WHOAT.helper.wireMinimize(".intro_inbox_list");

				$('.goto_invite_friends').unbind('click').bind('click', function() {
					WHOAT.networking.redirectToURL('/invite');
				});

				$('.goto_invite_coworkers').unbind('click').bind('click', function() {
					WHOAT.networking.redirectToURL('/invite');
				});
			}

			return {
				fetchNextInbox : fetchNextInbox,
				reWireInboxUnread : reWireInboxUnread,
				wireNoInboxHelpers : wireNoInboxHelpers
			}
		}());

		var heatmap = function() {
			WHOAT.helper.loadHeatMap('/map_widget');
	    	$('.goto_heatmap').unbind('click').bind('click', function () {
				WHOAT.networking.redirectToURL('/heatmap');
			});

	    	// setup minimize for heatmap widget
			WHOAT.helper.wireMinimize(".heatmap_widget");
	    }

		// wire search
		var search = (function () {

			// var grp_ids = [];
            var searchURL = function(query) { return '/search/'+query; }

			var wireSearchButton = function() {
				var searchValue;

				$('.search_highlight').unbind('mouseover').bind('mouseover', function () {
					$('#search_tooltip').animate({ opacity:'1' });
				});

				$('.search_highlight').unbind('mouseout').bind('mouseout', function () {
					$('#search_tooltip').animate({ opacity:'0' });
				});

				function startSearch() {
					WHOAT.dashboard.hideKeyboard($());
					searchValue = $('#dash_search_input').val();

					if (searchValue !== "" || undefined) {
						WHOAT.analytics.trackSearchEvent(searchValue);
						window.location.pathname = searchURL(searchValue);
					}
				}

				$('.search_button').unbind('click').bind('click', function () {
					startSearch();
				});

				$('#intro_search').unbind('submit').bind('submit', function () {
					startSearch();
					return false;
				});
            }

            return { wireSearchButton : wireSearchButton }
        }());

		// wire Browse
		var browse = (function () {

			// refactor
			$('#browse_btn').hover(
				function () {
					if (browse_open === false) {
						$(this).css('background', '#c4c4c4');
					} else {
						$(this).css('background', '#f27619');
					}		
				},

				function () {
					if (browse_open === false) {
						$(this).css('background', '#d9d9d9');
					} else {
						$(this).css('background', '#f58733');
					}
				}
			);

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

			// go to browse/companies, titles or regions
			var wireBrowseSelections = function() {

				// Companies
				$('#view_companies').unbind('click').bind('click', function () {
					navigateToBrowse('companies');
				});

				// Titles
				$('#view_titles').unbind('click').bind('click', function () {
					navigateToBrowse('titles');
				});

				// Regions
				$('#view_regions').unbind('click').bind('click', function () {
					navigateToBrowse('regions');
				});
			}

	        return {
	            navigateToBrowse : navigateToBrowse,
	            wireBrowseSelections : wireBrowseSelections
			}
		}());

		// wire side bar
        var sideBar = (function() {
        	
	        var loc = location.pathname;

	        var wireSidebar = function() {

	        	// Go to profile
	        	$('.go_to_profile').unbind('click').bind('click', function() {
					WHOAT.networking.redirectToURL('/profile');
				});

			    $('.dash-btn').unbind('click').bind('click', function () {

	                var $menuButton = $(this);
			    		$menuButton.addClass("on");
			        	$menuButton.siblings().removeClass('on');

			        // Go to Outbox
	                if ($menuButton.hasClass('outbox_sidebar_btn')) {
	                    WHOAT.networking.redirectToURL('/outbox');

	                // Go to Inbox
	                } else if ($menuButton.hasClass('inbox_sidebar_btn')) {
	                	WHOAT.networking.redirectToURL('/inbox');

	                // Go to Alerts
	                } else if ($menuButton.hasClass('alerts_sidebar_btn')) {
	                	WHOAT.networking.redirectToURL('/alerts');

	                // Go to Reports
	                } else if ($menuButton.hasClass('reports_sidebar_btn')) {
	                	WHOAT.networking.redirectToURL('/reports/on_board');
	                }
			    });
	        }

	        var reset = function() { closeIntroMenu(); };

	        // Bookmark bubble
	        $('#bookmark_learn').unbind('hover').bind('hover', function () {
        		$('.bookmark_bubble').show();
        	});

        	$('#bookmark_learn').unbind('mouseout').bind('mouseout', function () {
        		$('.bookmark_bubble').hide();
        	});

	        return {
				wireSidebar: wireSidebar,
	            reset: reset
			};
		}());
		
		return {
			showDashboard : showDashboard,
			wireDashboard : wireDashboard,
			spinner : spinner,
			gearMenu : gearMenu,
			hideKeyboard : hideKeyboard,
			wireTableHighlighting : wireTableHighlighting,
			widgets : widgets,
			outbox : outbox,
			inbox : inbox,
			heatmap : heatmap,
			browse : browse,
			search : search,
			sideBar : sideBar
		}
	}());

    return {
    	init : init,
    	hideKeyboard : hideKeyboard,
    	home : home
    }

}(jQuery, window));

$(document).ready(function () {
    WHOAT.dashboard.init();
});