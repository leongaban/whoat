<%namespace file="functions.mak" name="functions"/>

<section class="widget orange_widget">

    <div class="widget_lid">
        <h2>${profile['firstName']} ${profile["lastName"]} <span>(${profile["username"]})</span></h2>
        
        <h5>Member since: <em>${born}</em></h5>
    </div>

    <section id="my_profile" class="module">

        <div class="widget_content">

	        <div class="current_avatar_area clearfix">

	            <form id="avatar_upload" action="/avatar/update" method="post" enctype="multipart/form-data" onsubmit="">
	                
                    <div class="preview_pane">
	                    <div id="current_avatar" class="preview_container">
	                        <img class="jcrop-preview" src="${profile['avatar']}" alt=""/>
	                    </div>
	                </div>

	                <div class="preview_details">
                        
                        <h2>Edit Profile Pic</h2>

                        <div id="upload_avatar">
                            <input id="choose_file" type="file" name="datafile" size="80"/>
                            <div id="hover_upload" class="click_to_upload">Upload Image</div>
                        </div>

                        <button id="upload_new_pic_btn" class="btn"/>Click to Upload</button>
	                </div>
	                
	            </form>

	        </div>

            <div class="profile_details_area clearfix">
                
                <section class="profile_left_column">

                    <header>
                        <div class="green_phone_icon"></div>
                        <h3>Contact Info</h3>
                    </header>

                    <hr>
                    <div class="firefox_hr"></div>

                    <div class="profile_fields">
                        <form action="" class="profile-info-form" method="post" novalidate>
                            <ul
                                data-profile="${to_json(profile)}"
                            >

                                <li class="required">Primary Email / Username*</li>
                                <li>
                                    <input type="text" id="profile-username" name="username" value="${profile["username"]}" autocomplete="off"/>
                                </li>

                                <li class="required">Password</li>
                                <li>
                                    <div class="password_container">
                                        <div class="password_bullets">&bull;&bull;&bull;&bull;&bull;&bull;</div>
                                        <div class="password_reset">reset</div>
                                    </div>
                                </li>

                                <li>Title</li>
                                <li>
                                    <input type="text" id="the-title" name="title" value="${profile['title']}" autocomplete="off"/>
                                </li>

                                <li>Company</li>
                                <li>
                                    <input type="text" id="profile-company" name="company" value="${profile['organization']}" autocomplete="off"/>
                                </li>

                                <li class="required">First Name*</li>
                                <li>
                                    <input type="text" id="profile-firstname" name="firstname" value="${profile["firstName"]}"  autocomplete="off"/>
                                </li>

                                <li class="required">Last Name*</li>
                                <li>
                                    <input type="text" id="profile-lastname" name="lastname" value="${profile['lastName']}" autocomplete="off"/>
                                </li>

                                <span id="added_phone_info">
                                    %if "phones" in profile:
                                        %for phone in profile["phones"]:
                                            <div class="removeable">
                                                <li><label>${phone["tag"]} Phone</label></li>
                                                <li><input type='tel' pattern='[0-9]{10}' class='profile_contact_info added_${phone["tag"]}phone' name='${phone["tag"]}phone' data-key='${phone["key"]}' value='${phone["label"]}' autocomplete='off' maxlength='20' /><div class="remove_info"></div></li>
                                            </div>
                                        %endfor
                                    %endif
                                </span>

                                <span id="added_email_info">
                                    %if "emails" in profile:
                                        %for email in profile["emails"]:
                                            <div class="removeable">
                                                <li class="email_label_li"><label>${email["tag"]} Email</label>
                                                    %if 'primary' in email and email['primary'] is 0:
                                                        <span class="make_primary">Make Primary</span>
                                                    %endif
                                                </li>
                                                <li><input type='email' class='profile_contact_info added_${email["tag"]}email' name='${email["tag"]}email' data-key='${email["key"]}' value='${email["label"]}' autocomplete='off' /><div class="remove_info"></div></li>
                                            </div>
                                        %endfor
                                    %endif
                                </span>

                                <hr class="hr_spacer">

                                <li>
                                    <label for="id_contact_info_options">Add Additional Phone Numbers</label>
                                </li>
                                <li class="profile_contact_select">
                                    <div class="dropdown_arrow"></div>
                                    <select name="contact_options" id="contact_options_phones">
                                      <option value="1">select phone type</option>
                                      <option value="mobile phone">Mobile Phone</option>
                                      <option value="work phone">Work Phone</option>
                                      <option value="home phone">Home Phone</option>
                                    </select>
                                </li>

                                <li>
                                    <label for="id_contact_info_options">Add Additional Emails</label>
                                </li>
                                <li class="profile_contact_select">
                                    <div class="dropdown_arrow"></div>
                                    <select name="contact_options" id="contact_options_emails">
                                      <option value="1">select email type</option>
                                      <option value="work email">Work Email</option>
                                      <option value="personal email">Personal Email</option>
                                    </select>
                                </li>

                                <li class="extra_contact_info">
                                    <ul class="new_option">
                                    </ul>
                                </li>

                            </ul>

                            <hr>
                            <div class="firefox_hr"></div>

                            <button class="btn" id="btn_save_profile">save profile</button>
                        </form>
                    </div>
                </section>

                <section class="profile_right_column">
                    <header>
                        <div class="green_groups_icon"></div>
                        <h3>Groups</h3>
                    </header>

                    <hr>
                    <div class="firefox_hr"></div>

                    <div class="profile_links">
                        <ul>
                            <span id="added_groups">
                                %if groups and groups is not None:
                                    <li>&nbsp;</li>
                                    %for group in groups:
                                        <li data-group-id="${group['id']}">
                                            <input type="text" class="profile_group_info" name="${group['label']}" value="${group['label']}"/> <div class="remove_group"></div>
                                        </li>
                                    %endfor
                                %endif
                            </span>
                            
                            <li>Join a Group</li>
                            <li>
                                <form id="add-group-form" action="" novalidate>

                                    <input type="text"
                                       id="group-code" value="Group Code Here" name="Group Code Here"
                                       onblur="if (this.value == '') {this.value = 'Group Code Here';}"
                                       onfocus="if (this.value == 'Group Code Here') {this.value = '';}"
                                       autocomplete="off"/>

                                    <button class="btn" id="btn_join_group">join group</button>
                                </form>
                            </li>

                            <li class="extra_info">Contact <a href="mailto:sales@whoat.net">sales@whoat.net</a> to setup a group code. Self service feature coming soon.</li>
                        </ul>
                    </div>

                    %if enterprise is True:
                        <header>
                            <div class="green_groups_icon"></div>
                            <h3>Admin Proxy</h3>
                        </header>
                        <div>
                            <ul>
                                <span id="added_proxy">
                                    %if proxy and proxy is not None:
                                        <li>&nbsp;</li>
                                        <li>
                                            <input type="text" class="profile_proxy_info" name="${proxy['email']}" value="${proxy['email']}"/> <div class="remove_proxy"></div>
                                        </li>
                                    %endif
                                </span>
                                <li>
                                    <form id="add-email-proxy-form" action="" novalidate>
                                        <input type="email"
                                           id="email-proxy" value="Admin Email Here" name="Admin Email Here"
                                           onblur="if (this.value == '') {this.value = 'Admin Email Here';}"
                                           onfocus="if (this.value == 'Admin Email Here') {this.value = '';}"
                                           autocomplete="off"/>
                                        <button class="btn" id="btn_email_proxy">Submit</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    %endif

                    <div class="profile_links">
                        <ul>
                            <li>Email Subscribe</li>
                            <li>
                                <div class="onoffswitch">
                                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch"
                                    %if subscribe is True:
                                        checked>
                                    %else:
                                        >
                                    %endif

                                    <label
                                        %if subscribe is True:
                                            data-status="true"
                                        %else:
                                            data-status="false"
                                        %endif
                                            class="onoffswitch-label" for="myonoffswitch">

                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </section>

                <hr>

            </div>

        </div>
    </section>

</section>

<%!
   import simplejson as json

   def to_json( d ):
       return json.dumps(d)
%>