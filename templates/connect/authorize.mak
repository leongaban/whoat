<!DOCTYPE html>
<html>
<head>
    <title>Who@ Oauth Accept</title>
</head>


<body id="body-home">
    Authorize access to <span>${partner["label"]}</span> ?
    <br>
    <img src='${partner["avatar"]}' />
    <form id="form" action="/oauth2/agree" method="post">
        <input type="hidden" name="roundtrip" id="roundtrip" value='${partner["roundtrip"]}' />
        <input type="hidden" name="state" id="state" value='${partner["state"]}' />
        <input type="submit" value="submit" />
    </form>
</body>
</html>

