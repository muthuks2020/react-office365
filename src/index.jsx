import React from 'react';

class ReactLoginMS extends React.Component {

    constructor(props) {
        super(props);
        this.startOAuth = this.startOAuth.bind(this);
        this.getOAuthUrl = this.getOAuthUrl.bind(this);

        if (!this.props.clientId)
            throw new Error("invalid clientId provided for react-ms-login");
        if (!this.props.redirectUri)
            throw new Error("invalid redirectUri provided for react-ms-login");

        this.state = {
            clientId: this.props.clientId,
            redirectUri: this.props.redirectUri,
            scopes: this.props.scopes || ["user.read"],
            responseType: this.props.responseType || "token"
        }

        this.oauthUrl = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
    }

    getOAuthUrl() {
        let scopes = encodeURIComponent(this.state.scopes.join(" "));
        let oauthUri = `${this.oauthUrl}?client_id=${this.state.clientId}&response_type=${this.state.responseType}` +
            `&redirect_uri=${encodeURIComponent(this.state.redirectUri)}` +
            `&scope=${scopes}&response_mode=fragment`;

        return oauthUri;
    }

    startOAuth() {
        let popup = (url, title, w, h) => {
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        }

        let _authCompleteCb = function (data) {
            this.props.handleLogin(data);
        }.bind(this);

        window.authScope = {
            authCompletedCB: _authCompleteCb
        }

        popup(this.getOAuthUrl(), "Microsoft Sign In", 600, 750);

    }     

    render() {
        let cssClasses = `btn-microsoft-login ${this.props.cssClass}`
        let btnContent = "Sign in with Microsoft";

        if (this.props.btnContent) {
            if (typeof this.props.btnContent === "function")
                btnContent = <this.props.btnContent />
            else
                btnContent = this.props.btnContent
        }

        return (
            <button type="button" className={cssClasses} onClick={this.startOAuth}>
                {btnContent}
            </button>
        )
    }
}

export default ReactLoginMS;