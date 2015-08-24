%if page:
	%if page == "searched":
		<%include file="widgets/searches.mak"/>
	%elif page == "onboard":
		<%include file="widgets/onboarding.mak"/>
	%elif page == "engage":
		<%include file="widgets/engagement.mak"/>
	%elif page == "unregistered":
		<%include file="widgets/unregistered.mak"/>
	%elif page == "google":
		<%include file="widgets/google_report.mak"/>
	%endif
%else:
    <tr>
        <td colspan="11">
            <p class="no_result">No results yet, please try again when you have synchronized some contacts.</p>
        </td>
    </tr>
%endif