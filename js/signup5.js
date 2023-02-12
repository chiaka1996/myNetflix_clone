const firstName = document.querySelector('.firstName');
const lastName = document.querySelector('.lastName');
const cardNumber = document.querySelector('.cardNumber');
const expirationDate = document.querySelector('.expirationDate');
const cvv = document.querySelector('.cvv');
const planAmount = document.querySelector('#change_amount');
const planType = document.querySelector('#plan_note');
const termsAndCondition = document.querySelector('.I_agree');
const creditCardButton = document.querySelector('.credit_card_button')
const firstNameError = document.querySelector('.firstNameError');
const lastNameError = document.querySelector('.lastNameError');
const cardNumberError = document.querySelector('.cardNumberError');
const expirationDateError = document.querySelector('.expirationDateError');
const cvvError = document.querySelector('.cvvError');
const firstNameDiv = document.querySelector('.firstNameDiv');
const lastNameDiv = document.querySelector('.lastNameDiv');
const cardNumberDiv = document.querySelector('.cardNumberDiv');
const expirationDateDiv = document.querySelector('.expirationDateDiv');
const cvvDiv = document.querySelector('.cvvDiv'); 
const submitBtn = document.querySelector('.credit_card_button');
const planDiv = document.querySelector('.planDiv');
const privacyError = document.querySelector('.privacy_error');
const signOut = document.querySelector('.signOut');

const numberRegex =  /^[0-9]+$/i;

planType.innerHTML = sessionStorage.getItem('planType') + " " + "Plan"; 
planAmount.innerHTML = sessionStorage.getItem('planAmount');

let termsAndConditionValue;

//check if user is registered
if(!sessionStorage.getItem('_id')){
    window.location.href = '../index.html';
  }

  signOut.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../index.html';
  })


//validate the first and lastName
const nameValidation = (name,inputDiv,divFocus,divError,nameType,input) => {
    const nameRegex = /^[A-Za-z]+$/i;
    const nameTest = nameRegex.test(name);

    if(name.length < 1) {
       inputDiv.classList.remove(divFocus);
       input.style.border = "1px solid darkred";
       divError.innerHTML = `please enter a ${nameType}`;
       return false;
    }

    if(!nameTest) {
        input.style.border = "1px solid darkred";
        divError.innerHTML = `please enter a valid ${nameType}`;
        return false;
    }
    else {
        input.style.border = '1px solid green';
        divError.innerHTML = '';
        return true
    }
}

//validate card number
const cardNumberValidation = () => {
    let value = cardNumber.value;
    const numberTest = numberRegex.test(value);

    if(value.length < 1) {
       cardNumberDiv.classList.remove('cardNumberDivFocus');
       cardNumber.style.border = "1px solid darkred";
       cardNumberError.innerHTML = 'please enter a card number';
       return false;
    }

    if(value.length > 1 && value.length < 15) {
        cardNumber.style.border = "1px solid darkred";
        cardNumberError.innerHTML = 'please enter a  valid card number';
        return false;
     }

    if(!numberTest) {
        cardNumber.style.border = "1px solid darkred";
        cardNumberError.innerHTML = `please enter a valid card number`;
        return false;
    }
    else {
        cardNumber.style.border = '1px solid green';
        cardNumberError.innerHTML = '';
        return true
    }
}

//validate expiration date
const expiryDateValidation = () => {
    let value = expirationDate.value;

    if(!value){
        expirationDate.type = 'text'
        expirationDateDiv.classList.remove('expirationDateDivFocus');
        expirationDate.style.border = "1px solid darkred";
        expirationDateError.innerHTML = 'please enter an expiration date';
        return false; 
    }

    else{
        expirationDate.style.border = '1px solid green';
        expirationDateError.innerHTML = '';
        return true
    }
}

//validate cvv
const cvvValidation = () => {
    let value = cvv.value;
    const numberTest = numberRegex.test(value);

    if(value.length < 1) {
       cvvDiv.classList.remove('cvvDivFocus');
       cvv.style.border = "1px solid darkred";
       cvvError.innerHTML = 'please enter a security code(cvv)';
       return false;
    }

    if(value.length !== 3) {
        cvv.style.border = "1px solid darkred";
        cvvError.innerHTML = 'please enter a  valid security code(cvv)';
        return false;
     }

    if(!numberTest) {
        cvv.style.border = "1px solid darkred";
        cvvError.innerHTML = `please enter a valid security code(cvv)`;
        return false;
    }
    else { 
        cvv.style.border = '1px solid green';
        cvvError.innerHTML = '';
        return true
    }
}

const onInputFocus = (inputDiv,focusClass, e) => {
    inputDiv.classList.add(focusClass);
    e.target.style.border= "0.5px solid lightblue";  
}

firstName.addEventListener('focus', (e) => {
    onInputFocus(firstNameDiv,'firstNameDivFocus',e);
});

firstName.addEventListener('blur', () => {
    let name = firstName.value;
    nameValidation(name,firstNameDiv,'firstNameDivFocus',firstNameError,"first name",firstName);

})

lastName.addEventListener('focus', (e) => {
    onInputFocus(lastNameDiv,'lastNameDivFocus', e);
});

lastName.addEventListener('blur', () => {
    let name = lastName.value;
    nameValidation(name,lastNameDiv,"lastNameDivFocus",lastNameError,"last name",lastName);
})

cardNumber.addEventListener('focus', (e) => {
    onInputFocus(cardNumberDiv,"cardNumberDivFocus",e)
})

cardNumber.addEventListener('blur', (e) => {
    cardNumberValidation();
})

expirationDate.addEventListener('focus', (e) => {
    onInputFocus(expirationDateDiv,'expirationDateDivFocus', e);
    expirationDate.type = 'month'
});

expirationDate.addEventListener('blur', () => {
    expiryDateValidation();
})

cvv.addEventListener('focus', (e) => {
    onInputFocus(cvvDiv,'cvvDivFocus', e);
})

cvv.addEventListener('blur', () => {
    cvvValidation();
})

termsAndCondition.addEventListener('click', () => {
     termsAndConditionValue = termsAndCondition.checked;
     termsAndConditionValidation();
})

//validate terms and condition
const termsAndConditionValidation = () => {
    if(termsAndConditionValue){
        privacyError.innerHTML = '';
        return true
    }
    else{
        privacyError.innerHTML = "please agree to the terms and conditions";
        return false;
    }
}

submitBtn.addEventListener('click', async () => {
    try{
        planDiv.innerHTML = '';
        planDiv.classList.add('loader');
        const data = {
            _id: sessionStorage.getItem("_id"),
            card: {
                firstName: firstName.value,
                lastName: lastName.value,
                cardNumber: cardNumber.value,
                expirationDate: expirationDate.value,
                ccv: cvv.value,
                planType
            },
            registrationCompleted: true
        }
        if(termsAndConditionValidation() && cvvValidation() && expiryDateValidation() && cardNumberValidation() &&
        nameValidation(firstName.value,firstNameDiv,'firstNameDivFocus',firstNameError,"first name",firstName) &&
        nameValidation(lastName.value,lastNameDiv,"lastNameDivFocus",lastNameError,"last name",lastName)
        ){
            let addCard = await axios.post('https://zuri-netlify-backend.herokuapp.com/apis/updatecard', data);
            const {registrationCompleted, planType} = addCard.data.data;
            if(addCard.status === 201){
            sessionStorage.setItem('registrationCompleted', registrationCompleted);
            sessionStorage.setItem('planType', planType);
            window.location.href = 'dashboard.html';
            }
        }
        else{
            planDiv.innerHTML = 'Start Membership';
            planDiv.classList.remove('loader');
        }
    }
    catch(error){
        if(!error.response){
            planDiv.innerHTML = 'Start Membership';
            planDiv.classList.remove('loader');
            alert('Something went wrong. please check your network connection')
            return;
          }
    }
})

