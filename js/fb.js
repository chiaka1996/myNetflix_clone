const loginWithFacebookSpan  = document.querySelector('.facebookLogin');
 
const loginWithFacebook = async () => {
    FB.login( response => {
       console.log(response) 
       const {accessToken, userID} = response.authResponse;
    //    FB.api('/me', function(response) {
    //     console.log(JSON.stringify(response));
    // });
    const data = {
        accessToken,
        id: userID
    }

    const postApi = await axios.post('https://zuri-netlify-backend.herokuapp.com/apis/facebookLogin', data);

    console.log(postApi)


    }, {scope: 'public_profile,email'})
   
    return false
}

loginWithFacebookSpan.addEventListener('click', loginWithFacebook(), false);

// let loginWithFacebook = _ => _

// const fbSDKLoaded = () => {
    
// FB.getLoginStatus(function(response) {
//     // console.log(statusChangeCallback(response));
//     console.log(response);
//     if(response.status == "not_authorized"){
//         loginWithFacebook = _ => {
//             FB.login(response => {
//                 console.log(response);
//             })
//         }
//     }
// });

// }