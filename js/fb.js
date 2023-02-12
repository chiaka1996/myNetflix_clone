const loginWithFacebookSpan  = document.querySelector('.facebookLogin');
const backendError = document.querySelector('.backendError');
 
const loginWithFacebook = () => {
    FB.login( response => { 
       const {accessToken, userID} = response.authResponse;

    const data = {
        accessToken,
        id: userID
    }

     axios.post('https://zuri-netlify-backend.herokuapp.com/apis/facebookLogin', data)
     .then((res) => {
        const {data, status} = res;
        const {accessToken, facebookID} = data;
        const {registrationCompleted,planType,card,email} = data.user;

        if(status === 200){
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("registrationCompleted", registrationCompleted);
        sessionStorage.setItem("planType", planType);
        sessionStorage.setItem("firstName", card.firstName);
        sessionStorage.setItem("lastName", card.lastName);
        sessionStorage.setItem("ccv", card.ccv);
        sessionStorage.setItem("cardNumber", card.cardNumber);
        sessionStorage.setItem("expirationDate", card.expirationDate);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("facebookID", facebookID);

        if(registrationCompleted){
            window.location.href = 'dashboard.html';
        }
        else{
            window.location.href = 'Signup2.html'; 
        }

        }
        
     })
     .catch((error) => {
        if(!error.response){
            backendError.innerHTML= "Something went wrong. Please check your internet connection";
            return;
          }
      
          if(error.response.status === 400){
            backendError.innerHTML = "Their is a problem from our end. try again later"
            return;
          }
      
          if(error.response.status === 500){
            backendError.innerHTML = 'Their is a problem from our end. try again later';
            return;
            }
        })

    }, {scope: 'public_profile,email'})
   
    return false
}

loginWithFacebookSpan.addEventListener('click', loginWithFacebook, false);