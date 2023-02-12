window.addEventListener('load', () => {
 
const createEmailDiv = document.querySelector(".create_email_div");
const createPasswordDiv = document.querySelector(".create_password_div");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const errorEmail = document.querySelector('.errorEmail');
const errorPassword = document.querySelector('.errorPassword');
const submitBtn = document.querySelector('.submitBtn');
const specialOffer = document.querySelector('#special_offers');
const backendErrorMessage = document.querySelector(".backendErrorMessage");
const signup1BtnDiv = document.querySelector('.signup1BtnDiv');

// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

//check if user is registered
if(sessionStorage.getItem('_id')){
    window.location.href = '../index.html';
  }

let email = sessionStorage.getItem("email");
inputEmail.value = email;
createEmailDiv.classList.add("create_email_focus");

//validate email input
const emailValidation = () => {
    inputEmail.style.border = '';
    let value = inputEmail.value.replace(/\s/g, '');
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const emailTest = emailRegex.test(value);

        if(value.length < 1) {
            createEmailDiv.classList.remove('create_email_focus');
            inputEmail.style.border = '0.5px solid #E34B4F';
            errorEmail.innerHTML = "Email is required";
            return false;
        } 
    
        if(emailTest === false){      
            inputEmail.style.border = '0.5px solid #E34B4F';
            errorEmail.innerHTML = "please, Enter a valid email address";
        } else{
            inputEmail.style.border = '0.5px solid green';
            errorEmail.innerHTML = "";
            return true;
        }
}

//validate password input
const passwordValidation = () => {
    let initValue = inputPassword.value;
    let value = initValue.replace(/\s/g, '');

    if(value.length < 1) {
        createPasswordDiv.classList.remove('create_password_focus');
        inputPassword.style.border = '0.5px solid #E34B4F';
        errorPassword.innerHTML = "Password is required";

        if(initValue.length > 0){
        createPasswordDiv.classList.add('create_password_focus');
        }
        return false;
    }

    if(value.length > 0 && value.length < 7){
        inputPassword.style.border = '0.5px solid #E34B4F';
        errorPassword.innerHTML = "Password should be between 6 and 60 characters";
        return false;
    }

    if(value.length > 6){
        inputPassword.style.border = '0.5px solid green';
        errorPassword.innerHTML = "";
        return true;
    }
}



inputEmail.addEventListener('focus', (e) => {
    // inputEmail.style.border = ' 0.5px solid blue';
    e.target.style.border = '0.5px solid #3366F8';
    createEmailDiv.classList.add("create_email_focus");
});

inputEmail.addEventListener('blur', () => {
    emailValidation();
});

inputPassword.addEventListener('focus', (e) => {
    createPasswordDiv.classList.add('create_password_focus');
    e.target.style.border = '0.5px solid #3366F8';
})

inputPassword.addEventListener('blur', () => {
    passwordValidation();
});

submitBtn.addEventListener('click', async () => {
    try{
    let email = inputEmail.value;
    let password = inputPassword.value;
    let NetflixEmail = specialOffer.checked;
    let data = {
        email,
        password,
        NetflixEmail
    } 

    backendErrorMessage.style.display = 'none';
    signup1BtnDiv.innerHTML = '';
    signup1BtnDiv.classList.add('loader');
    sessionStorage.setItem("email", email);

    if(emailValidation() && passwordValidation()){
        let signupUser = await axios.post('https://zuri-netlify-backend.herokuapp.com/apis/register', data);
        const {_id,card,registrationCompleted,NetflixEmail,token,planType} = signupUser.data.payload;
        if(signupUser.status === 201){    
        sessionStorage.setItem("_id", _id);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("registrationCompleted", registrationCompleted);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("planType", planType);
        sessionStorage.setItem("firstName", card.firstName);
        sessionStorage.setItem("lastName", card.lastName);
        sessionStorage.setItem("ccv", card.ccv);
        sessionStorage.setItem("cardNumber", card.cardNumber);
        sessionStorage.setItem("expirationDate", card.expirationDate);
        sessionStorage.setItem("NetflixEmail", NetflixEmail);
        window.location.href = 'Signup2.html';

        }
    }
    else{
        signup1BtnDiv.classList.remove('loader');
        signup1BtnDiv.innerHTML = 'Next';
    }
}
catch(error){
signup1BtnDiv.classList.remove('loader');
signup1BtnDiv.innerHTML = 'Next';
backendErrorMessage.style.display = 'block';

if(!error.response){
backendErrorMessage.innerHTML= "Something went wrong. Please check your internet connection";
  return;
}

if(error.response.status === 400){
backendErrorMessage.innerHTML = `incorrect Password. Please try again or you can <a href="#">reset your password</a>`
  return;
}

if(error.response.status === 500){
backendErrorMessage.innerHTML = 'Their is a problem from our end. try again later';
  return;
}

}   
})
});
