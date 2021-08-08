window.addEventListener('load', () => {
const icon1 = document.querySelector('#icon1');
const icon2 = document.querySelector('#icon2');
const icon3 = document.querySelector('#icon3');
const icon4 = document.querySelector('#icon4');
const icon5 = document.querySelector('#icon5');
const icon6 = document.querySelector('#icon6');
const item1 = document.querySelector('.item');
const item2 = document.querySelector('.item2');
const item3 = document.querySelector('.item3');
const item4 = document.querySelector('.item4');
const item5 = document.querySelector('.item5');
const item6 = document.querySelector('.item6');
const buttonSpan = document.querySelector('.buttonSpan');
const buttonSpan2 = document.querySelector('.buttonSpan2');
const topErrorMessage = document.querySelector('#topErrorMessage');
const bottomErrorMessage = document.querySelector('#bottomErrorMessage');
const topInputButton = document.querySelector('#topInputButton');
const bottomInputButton = document.querySelector('#bottomInputButton');
const homepageEmailInput1 = document.querySelector('#emailInput1');
const homepageEmailInput2 = document.querySelector('#emailInput2');
const emailInputDiv2 = document.querySelector('#emailInputDiv2');
const emailInputDiv1 = document.querySelector('#emailInputDiv1');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

let icon1Text = "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. \n You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!";
let icon2Text = "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from N1,200 to N4,400 a month. No extra costs, no contracts."
let icon3Text = "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app. including smart TVs, smartphones, tablets, steaming media players and game consoles \n You can also download your favorite shows with the ios, Android, or windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.";
let icon4Text = "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees - start or stop your account anytime.";
let icon5Text = "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
let icon6Text = "The Netflix Kids experience is included in your membership to give parents cotrol while kids enjoy family-friendly TV shows and movies in their own space. \n Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."

const onClickIcons = (icons,iconsText,nodeItems) => {
    let iconsArray = [icon1,icon2,icon3,icon4,icon5,icon6]; 
    let itemsArray = [item1,item2,item3,item4,item5,item6];
    let icon1ClassList = icons.classList;

    if(icon1ClassList.contains('icon1')){
        let node = document.createElement("P");
        let textNode = document.createTextNode(iconsText);
        node.classList.add('netflix_explanation');
        node.appendChild(textNode);
        nodeItems.appendChild(node);

        iconsArray.map((icn,i) => {
            icnClassList = icn.classList;
            if(icnClassList.contains('icon1Cancel')){
                icn.classList.add("icon1");
                icn.classList.remove("icon1Cancel");
                itemsArray[i].removeChild(itemsArray[i].lastChild);
            }
        })

        icons.classList.add("icon1Cancel");
        icons.classList.remove("icon1");
    }
    else{
        nodeItems.removeChild(nodeItems.lastChild);
        icons.classList.add("icon1");
        icons.classList.remove("icon1Cancel");
    }
}

const emailError = (emailInput, buttonDiv) => {
    emailInput.style.borderBottom = "2px solid orange";
    buttonDiv.classList.remove('loader');
    buttonDiv.innerHTML =  `Get Started <i class="fa fa-chevron-right"></i>`;
}

const emailValidation = (inputDiv, emailInput, errorMessage, buttonDiv) => {
    let inputValue = emailInput.value;

    if(inputValue.length < 1){ 
    inputDiv.classList.remove('emailInputFocus');
     errorMessage.innerHTML = "Email is required!"; 
     emailError(emailInput,buttonDiv)
     return false;
    }

    if(emailRegex.test(inputValue) === false){
    errorMessage.innerHTML = "please, enter a valid email address";  
    emailError(emailInput,buttonDiv)
    return false;
    }

    if(emailRegex.test(inputValue) === true){
        errorMessage = '';
        return true;
    }
}

//onclick icon1
icon1.addEventListener('click', () => {
    onClickIcons(icon1, icon1Text, item1);
})

//onclick icon2
icon2.addEventListener('click', () => {
    onClickIcons(icon2, icon2Text, item2); 
})

//onclick icon3
icon3.addEventListener('click', () => {
    onClickIcons(icon3, icon3Text, item3); 
})

//onclick icon4
icon4.addEventListener('click', () => {
    onClickIcons(icon4, icon4Text, item4); 
})

//onclick icon5
icon5.addEventListener('click', () => {
    onClickIcons(icon5, icon5Text, item5); 
})

//onclick icon4
icon6.addEventListener('click', () => {
    onClickIcons(icon6, icon6Text, item6); 
})

//when the hoepage input1 gain focus
homepageEmailInput1.addEventListener('focus', (e)=> {
    emailInputDiv1.classList.add('emailInputFocus');
    e.target.style.outline = "none";
    e.target.style.border = "2px solid lightblue"
})

//when the homepage input1 looses focus
homepageEmailInput1.addEventListener('blur', (e) => {
 emailValidation(emailInputDiv1,homepageEmailInput1,topErrorMessage,buttonSpan);
})

//onclick top Get Started button 
topInputButton.addEventListener('click', async () => {
    try{
    buttonSpan.innerHTML = '';
    buttonSpan.classList.add('loader');
     let email = homepageEmailInput1.value;
    const payload = {
        email
    }
    
    if(emailValidation(emailInputDiv1,homepageEmailInput1,topErrorMessage,buttonSpan))
        sessionStorage.setItem("email", email);
       
        let postRequest = await axios.post('https://zuri-netlify-backend.herokuapp.com/apis/checkemail', payload)
        if(postRequest.status === 200) {
        window.location.href = 'Signup0.html';
        return;
    }
    }
    catch(error){       
        if(!error.response){
         alert("something is wrong, please check your internet connection")
         buttonSpan.innerHTML = `Get Started <i class="fa fa-chevron-right"></i>`;
         buttonSpan.classList.remove('loader');
         return
        }
       
        if(error.response.status === 406)
            sessionStorage.setItem("email", email);
            window.location.href = "welcomeback.html";
    }     
})

//when the homepage input2 gains focus
homepageEmailInput2 .addEventListener('focus', (e)=> {
    emailInputDiv2.classList.add('emailInputFocus');
    e.target.style.outline = "none";
    e.target.style.border = "2px solid lightblue"
})

//when the homepage input2 looses focus
homepageEmailInput2 .addEventListener('blur', (e) => {
    emailValidation(emailInputDiv2,homepageEmailInput2,bottomErrorMessage,buttonSpan2);

})

//when the bottom Get started button is clicked button is clicked
bottomInputButton.addEventListener('click', async () => {
    try{
    homepageEmailInput1.innerHTML = '';
    buttonSpan2.innerHTML = '';
    buttonSpan2.classList.add('loader');
     let email = homepageEmailInput2.value;
    const payload = {
        email
    }
    
    if(emailValidation(emailInputDiv2,homepageEmailInput2,bottomErrorMessage,buttonSpan2))
        sessionStorage.setItem("email", email);
       
        let postRequest = await axios.post('https://zuri-netlify-backend.herokuapp.com/apis/checkemail', payload)
        if(postRequest.status === 200) {
        window.location.href = 'Signup0.html';
        return;
    }
    }
    catch(error){       
        if(!error.response){
         alert("something is wrong, please check your internet connection")
         buttonSpan2.innerHTML = `Get Started <i class="fa fa-chevron-right"></i>`;
         buttonSpan2.classList.remove('loader');
         return
        }
       
        if(error.response.status === 406)
            sessionStorage.setItem("email", email);
            window.location.href = "welcomeback.html";
    }     
})

})