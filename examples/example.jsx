import React from "react";
import ReactDOM from "react-dom";

import ReactLoginMS from "../dist/react-ms-login.js";

class ButtonContent extends React.Component {
    render() {
        return (
            <span>
                MS Login
        </span>)
    }
}

ReactDOM.render(<ReactLoginMS
    clientId="XXXXX-XXXXX-XXXX" // required: 'application id/client id' obtained from https://apps.dev.microsoft.com for your app
    redirectUri="http://localhost:9999/authComplete.html" // required: redirectUri registered in https://apps.dev.microsoft.com for your app
    scopes={["user.read"]} //optional: defaults to "user.read" full list is present https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference
    responseType="token" //optional: valid values are "token" for `Implicite OAuth flow` and "code" for `Authorization Code flow` defaults to "token"
    cssClass="some-css-class" // optional: space separated class names which are applied on the html Button element
    btnContent={ButtonContent} // optional: can be string or a valid react component which can be rendered inside html Button element
    handleLogin={(data) => console.log(data)}// required: callback to receive token/code after successful login
/>, document.getElementById("app"));