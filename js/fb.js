const fbSDKLoaded = () => {
    
FB.getLoginStatus(function(response) {
    // console.log(statusChangeCallback(response));
    console.log(response);
});

}