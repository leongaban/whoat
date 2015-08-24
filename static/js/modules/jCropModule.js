// jCrop
//======================================================================
WHOAT.jcrop = (function ($, w, undefined) {
    'use strict';
    
    function init() {

    }
    
    var wirejCrop = function() {

		// Show Upload button after file is selected
		var i = 1;
		$('input:file[name$=\'datafile'+'\']').change(function() {
            var file = $(this).val();
            if(file !== null && file !== "") {
                $('#upload_new_pic_btn').fadeIn('slow');
                // $('#proxy_email_section').css('top', '-135px');
            }
        });

		// var jcrop_api,
	 //        boundx,
	 //        boundy,
		//     $preview = $('#preview-pane'),
	 //        $pcnt = $('#preview-pane .preview-container'),
	 //        $pimg = $('#preview-pane .preview-container img'),
	 //        xsize = $pcnt.width(),
	 //        ysize = $pcnt.height();

	    // $('#target').Jcrop({
	    //     onChange: updatePreview,
	    //     onSelect: updatePreview,
	    //     aspectRatio: xsize / ysize
	    // },function() {
	    //     // Use the API to get the real image size
	    //     var bounds = this.getBounds();
	    //     boundx = bounds[0];
	    //     boundy = bounds[1];
	    //     // Store the API in the jcrop_api variable
	    //     jcrop_api = this;
	    //     // Move the preview into the jcrop container for css positioning
	    //     $preview.appendTo(jcrop_api.ui.holder);
	    // });

	  //   function updatePreview(c) {
			// if (parseInt(c.w) > 0) {
			// 	var rx = xsize / c.w;
			// 	var ry = ysize / c.h;

			// 	$pimg.css({
			// 	  width: Math.round(rx * boundx) + 'px',
			// 	  height: Math.round(ry * boundy) + 'px',
			// 	  marginLeft: '-' + Math.round(rx * c.x) + 'px',
			// 	  marginTop: '-' + Math.round(ry * c.y) + 'px'
			// 	});
			// }
	  //   };

	    function updateCoords(c) {
			$('#x').val(c.x);
			$('#y').val(c.y);
			$('#w').val(c.w);
			$('#h').val(c.h);
		};

		var checkCoords = function() {
			if (parseInt($('#w').val())) return true;
			alert('Please select a crop region then press submit.');
			return false;
		};

		// $('#target').Jcrop({
  //           aspectRatio: 1 / 1,
  //           onSelect: updateCoords
  //       });

        $('#avatar_upload').on('submit',(function(e) {
	        e.preventDefault();

	        var uploadBtn = $('#upload_new_pic_btn');
            $(uploadBtn).css('cursor','auto');
            $(uploadBtn).css('background','#ccc');
            $(uploadBtn).text('Uploading...');
            $(uploadBtn).attr("disabled", "disabled");
	        var formData = new FormData(this);
	        var response;

	        // function createNewAvatar(imageId, size) {
			    // return $("<img class='jcrop-preview' src='share/avatars/member."+imageId+"/"+size+".jpg' alt=''>");
			function createNewAvatar() {
			    return $("<img class='jcrop-preview' src='/static/img/dashboard/gifs/uploading_avatar.gif' alt='uploading'>");
			}

	        $.ajax({
	            type:'POST',
	            url: $(this).attr('action'),
	            data:formData,
	            cache:false,
	            contentType: false,
	            processData: false,
	            success:function(data) {
	                // console.log("success");
	                // console.log(data);
	                // response = JSON.parse(data);
	                // console.log(response);
	                // console.log(data.result);
	                // console.log(data.message);

	                if (data.result === 'success') {
	                	WHOAT.notify.topNotify('success', data.message);
	                } else if (data.result === 'error') {
	                	WHOAT.notify.topNotify('error', data.message);
	                }

	                // Update the Profile Pic in the edit window
	                $('#current_avatar .jcrop-preview').fadeOut('fast', function() {
	                	$('#current_avatar').empty();
	                	$('#current_avatar').append(createNewAvatar());
	                	// $(uploadBtn).css('cursor','pointer');
		                // $(uploadBtn).text('Upload Image');
		                // $(uploadBtn).css('background','#f58733');
		                // $(uploadBtn).removeAttr("disabled");
	                });

	                // Update the Profile Pic in the sidebar
	                $('#user_badge .profile_pic').fadeOut('fast', function() {
	                	$('#user_badge .profile_pic').empty();
	                	$('#user_badge .profile_pic').append(createNewAvatar());
	                	$('#user_badge .profile_pic').fadeIn('fast', function(){
	                		setTimeout(function () {
				            	location.reload();
				        	}, 2000);
	                	});
	                });

	            },
	            error: function(data){
	                // console.log("error");
	                // console.log(data);
	                // notification.setStatusAndFadeStatus(data);
	                $(uploadBtn).css('cursor','pointer');
	                $(uploadBtn).text('Try Upload Image Again');
	                $(uploadBtn).css('background','#f58733');
	                $(uploadBtn).removeAttr("disabled");
	            }
	        });
	    }));

		return {
			checkCoords: checkCoords
		}
	}

    return {
        wirejCrop: wirejCrop,
        init : init
    };
}(jQuery, window));

$(document).ready(function () {
    WHOAT.jcrop.init();
});

// jCrop area (move later)
			