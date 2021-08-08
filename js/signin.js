window.addEventListener('load', () => {
const emailWrap = document.querySelector('.email-wrap');
const passwordWrap = document.querySelector('.password-wrap');
const emailInput = document.querySelector('.email_input');
const passwordInput = document.querySelector('.password_input');
const errorEmail = document.querySelector(".errorEmail");
const errorPassword = document.querySelector('.errorPassword');
const signInBtn = document.querySelector('.sign-in');
const backendError = document.querySelector('.backendError');
const signinDiv = document.querySelector('.signinDiv');

//validate email input
const emailValidation = () => {
    let value = emailInput.value.replace(/\s/g, '');
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const emailTest = emailRegex.test(value);

        if(value.length < 1) {
            emailWrap.classList.remove('email-wrap-focus');
            emailInput.style.borderBottom = '5px solid orange';
            errorEmail.innerHTML = "Email is required";
            return false;
        } 
    
        if(emailTest === false){      
            emailInput.style.borderBottom = '4% solid orange';
            errorEmail.innerHTML = "please, Enter a valid email address";
        } 
        else{
            emailInput.classList.add('email-wrapper');
            errorEmail.innerHTML = "";
            return true;
        }
}

//validate password input
const passwordValidation = () => {
    let initValue = passwordInput.value;
    let passwordValue = initValue.replace(/\s/g, '');
    passwordInput.classList.remove('email-wrapper');

    if(passwordValue.length < 1) {
        passwordWrap.classList.remove('password-wrap-focus');
        passwordInput.style.borderBottom = '4px solid orange';
        errorPassword.innerHTML = "Password is required";

        if(initValue.length > 0){
            passwordWrap.classList.add('password-wrap-focus');
        }
        return false;
    }

    if(passwordValue.length > 0 && passwordValue.length < 7){
        passwordInput.style.borderBottom = '4px solid orange';
        errorPassword.innerHTML = "Password should be between 6 and 60 characters";
        return false;
    }

    if(passwordValue.length > 6){
        passwordInput.style.border = '1px solid #333';
        passwordInput.classList.add('email-wrapper');
        errorPassword.innerHTML = "";
        return true;
    }
}


//when email input gains focus
emailInput.addEventListener('focus', () => {
    emailWrap.classList.add('email-wrap-focus');
});

emailInput.addEventListener('blur', () => {
    // emailWrap.classList.remove('email-wrap-focus');
    emailValidation();
})

//when password input gains focus
passwordInput.addEventListener('focus', () => {
    passwordWrap.classList.add('password-wrap-focus')
});

//when password input looses focus
passwordInput.addEventListener('blur', () => {
    passwordValidation();
})

//on click signin button
signInBtn.addEventListener('click', async(e) => {
    try{
       e.preventDefault();
        let password = passwordInput.value.replace(/\s/g, '');
        let email = emailInput.value.replace(/\s/g, '');

        const data = {
          email,
          password
        }

        backendError.style.display = 'none';
        signinDiv.innerHTML = '';
        signinDiv.classList.add('loader');

        if(passwordValidation() && emailValidation()){
          let postReq = await axios.post(' https://zuri-netlify-backend.herokuapp.com/apis/login',data)
          
          if(postReq.status === 201){
            const {registrationCompleted,planType,card} = postReq.data.user;
    
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("registrationCompleted", registrationCompleted);
            sessionStorage.setItem("token", postReq.data.user.token);
            sessionStorage.setItem("planType", planType);
            sessionStorage.setItem("firstName", card.firstName);
            sessionStorage.setItem("lastName", card.lastName);
            sessionStorage.setItem("ccv", card.ccv);
            sessionStorage.setItem("cardNumber", card.cardNumber);
            sessionStorage.setItem("expirationDate", card.expirationDate);
    
            if(registrationCompleted  === true){
             setSessionData();
              window.location.href = 'dashboard.html';
            }
            else{
              setSessionData();
              window.location.href = 'Signup2.html';
            }
          }
        }
        else{
          signinDiv.innerHTML = 'Sign in';
          signinDiv.classList.remove('loader');
        }
    
      }catch(error){
        signinDiv.innerHTML = 'Sign in';
        signinDiv.classList.remove('loader');
        backendError.style.display = 'block';
        console.log(error)
    
        if(!error.response){
          backendError.innerHTML= "Something went wrong. Please check your internet connection";
          return;
        }
    
        if(error.response.status === 400){
          backendError.innerHTML = `incorrect Email or Password. Please try again or you can <a href="#">reset your password</a>`
          return;
        }
    
        if(error.response.status === 500){
          backendError.innerHTML = 'Their is a problem from our end. try again later';
          return;
          }
      }
    
})

})