# react-office365
A react component to implement Microsoft login (via outlook.com, live.com, office365.com). Microsoft login in a react.js app


Follow the steps for imention:

Step 1
Obtain application Id by registering your app in Microsoft App Dev Center, under the platforms section, add web platform and enter the redirect uri, which is the path of an html file residing on your web server. For example http://localhost:9999/authComplete.html. Content of this html file in mentioned in step 4. Select appropriate scopes from the Delegated Permissions Section. Keep a note of these.

Step 2
Install the package via

npm install react-ms-login --save
Step 3
You can use this component anywhere in your app as shown below:

import React from "react";
import ReactDOM from "react-dom";

import ReactLoginMS from "react-ms-login";

class ButtonContent extends React.Component {
    render(){
        return (
        <span>
            MS Login
        </span>)
    }
}

ReactDOM.render(<ReactLoginMS
    clientId="XXX-XXX-XXX-XXX-XX" // required: 'application id/client id' obtained from https://apps.dev.microsoft.com for your app
    redirectUri="http://localhost:9999/authComplete.html" // required: redirectUri registered in https://apps.dev.microsoft.com for your app
    scopes={["user.read"]} //optional: defaults to "user.read" full list is present https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference
    responseType="token" //optional: valid values are "token" for `Implicite OAuth flow` and "code" for `Authorization Code flow` defaults to "token"
    cssClass="some-css-class" // optional: space separated class names which are applied on the html Button element
    btnContent={ButtonContent} // optional: can be string or a valid react component which can be rendered inside html Button element
    handleLogin={(data) => console.log(data)}// required: callback to receive token/code after successful login
/>, document.getElementById("app"));

Step 4
Based on the redirectUri you have configured in the Step 1, create the corresponding html file. For example in this case since we have configured redirectUri as http://localhost:9999/authComplete.html, that means we need authComplete.html file at the root of the server. You can of course choose any path in your server, just make sure redirectUri reflects that path correctly. Content of authComplete.html is shown below.

<!DOCTYPE html>
<html>

<head>
    <script src="dist/authComplete.js"></script>
    <script>
        ReactLoginMS.authComplete();
    </script>
</head>
<body>
    
</body>
</html>
first script reference points to authComplete.js, make sure you copy this file from the dist directory of react-ms-login package and put it in your server where it's accessible and then change the script src to reflect the path.
