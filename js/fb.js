let loginWithFacebook = _ => _

const fbSDKLoaded = () => {
    
FB.getLoginStatus(function(response) {
    // console.log(statusChangeCallback(response));
    console.log(response);
    if(response.status == "not_authorized"){
        loginWithFacebook = _ => {
            FB.login(response => {
                console.log(response);
            })
        }
    }
});

}