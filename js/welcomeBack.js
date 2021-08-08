window.addEventListener('load', () => { 

const welcomeBackPasswordDiv = document.querySelector('.welcome_back_password_div');
const welcomeBackPasswordInput = document.querySelector('.welcome_back_password');
const welcomeBackError = document.querySelector('.welcomeBackError');
const welcomeEmail = document.querySelector('#welcome_email_span');
const welcomeBtn = document.querySelector('#welcome_back_button');
const backendError = document.querySelector('.backendError');
const welcomeBtnDiv = document.querySelector('.welcomeBtnDiv');

let email = sessionStorage.getItem("email");
welcomeEmail.innerHTML = email;
let passwordValue;

//password verification
const passwordCheck = () => {
  let initValue = welcomeBackPasswordInput.value;
  passwordValue =  initValue.replace(/\s/g, '');
 
  if(passwordValue.length < 1){
    welcomeBackPasswordDiv.classList.remove('welcomeInputFocus');
    welcomeBackPasswordInput.style.border = '0.5px solid #E34B4F';
    welcomeBackError.innerHTML = 'Password is required';
  
    if(initValue.length > 0){
      welcomeBackPasswordDiv.classList.add('welcomeInputFocus');
    }
    return false;
  }

  if(passwordValue.length > 0 && passwordValue.length < 7){
    welcomeBackPasswordDiv.classList.add('welcomeInputFocus');
    welcomeBackPasswordInput.style.border = '0.5px solid #E34B4F';
    welcomeBackError.innerHTML = "Password should be between 6 and 60 characters";
    return false;
  }
  if(passwordValue.length > 6){
  welcomeBackPasswordDiv.classList.add('welcomeInputFocus');
  welcomeBackPasswordInput.style.border = '0.5px solid green';
  welcomeBackError.innerHTML = "";
  return true;
  }
  }

//when the welcomeback page password-input gains focus
welcomeBackPasswordInput.addEventListener('focus', (e) => {
    welcomeBackPasswordDiv.classList.add('welcomeInputFocus');
    e.target.style.border= "0.5px solid blue";
  });

//when the welcomeback-page password-input looses focus
welcomeBackPasswordInput.addEventListener('blur', () => {
  passwordCheck();
})

welcomeBtn.addEventListener('click', async() => {
  try{
    const data = {
      email,
      password: passwordValue
    }
    backendError.style.display = 'none';
    welcomeBtnDiv.innerHTML = '';
    welcomeBtnDiv.classList.add('loader');
    if(passwordCheck()){
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
      welcomeBtnDiv.innerHTML = 'Next';
      welcomeBtnDiv.classList.remove('loader');
    }

  }catch(error){
    welcomeBtnDiv.innerHTML = 'Next';
    welcomeBtnDiv.classList.remove('loader');
    backendError.style.display = 'block';

    if(!error.response){
      backendError.innerHTML= "Something went wrong. Please check your internet connection";
      return;
    }

    if(error.response.status === 400){
      backendError.innerHTML = `incorrect Password. Please try again or you can <a href="#">reset your password</a>`
      return;
    }

    if(error.response.status === 500){
      backendError.innerHTML = 'Their is a problem from our end. try again later';
      return;
    }
  }

})

});
