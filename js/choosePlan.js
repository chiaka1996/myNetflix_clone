const mobile = document.querySelector(".description1");
const Basic = document.querySelector(".description2");
const standard = document.querySelector(".description3");
const premium = document.querySelector(".description4");
const planItem1 = document.querySelector('.plan_item_1');
const planItem2 = document.querySelector(".plan_item_2");
const planItem3 = document.querySelector(".plan_item_3");
const planItem4 = document.querySelector(".plan_item_4");
const planItem5 = document.querySelector(".plan_item_5");
const submitBtn = document.querySelector(".planSubmitBtn");
const planDiv = document.querySelector('.planDiv');
const signOut = document.querySelector('.signOut');

//check if user is not registered
// if(!sessionStorage.getItem('_id')){
//   window.location.href = '../index.html';
// }

signOut.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = '../index.html';
})

//loop through plan item children
let loopThroughPLanChildren = (plan,num,planType) => {
  let planTypeArray = [mobile,Basic,standard,premium]

  planTypeArray.map((arr) => {
    if(arr === planType){
      // planType.classList.remove('description1');
     planType.classList.add('descriptionArrow');
    }
    else{
      arr.classList.remove('descriptionArrow');
    }
  })
  for (let i = 0; i < plan.children.length; i++) {
    if(i == num){
        let one = plan.children[i];
        one.style.color = 'red';
    }
    else{
      plan.children[i].style.color = "grey"
    }
  }
}


const changeColorFunction = (plan2,plan3,plan4,plan5,numb,type) => {
  loopThroughPLanChildren(plan2,numb,type);
  loopThroughPLanChildren(plan3,numb,type);
  loopThroughPLanChildren(plan4,numb,type);
  loopThroughPLanChildren(plan5,numb,type);
}

//onclick mobile button
mobile.addEventListener('click', () => {
    changeColorFunction(planItem2,planItem3,planItem4,planItem5,1,mobile);
    sessionStorage.setItem("planType", "Mobile");
    sessionStorage.setItem('planAmount', "N1,200/Month");
});

// onclick basic version
Basic.addEventListener('click', () => {
  changeColorFunction(planItem2,planItem3,planItem4,planItem5,2,Basic);
  sessionStorage.setItem("planType", "Basic");
  sessionStorage.setItem('planAmount', "N2,900/Month");
});

// onclick standard version
standard.addEventListener('click', () => {
  changeColorFunction(planItem2,planItem3,planItem4,planItem5,3,standard);
  sessionStorage.setItem("planType", "Standard");
  sessionStorage.setItem('planAmount', "N3,600/Month");
})

// onclick premium version
premium.addEventListener('click', () => {
  changeColorFunction(planItem2,planItem3,planItem4,planItem5,4,premium);
  sessionStorage.setItem("planType", "Premium");
  sessionStorage.setItem('planAmount', "N4,000/Month");
})

//when submit button is clicked
submitBtn.addEventListener('click', async () => {
  try{ 
    planDiv.innerHTML = '';
    planDiv.classList.add('loader');
    const cardDetails = {
    firstName: sessionStorage.getItem('card.firstName'),
    lastName: sessionStorage.getItem('card.lastName'),
    ccv: sessionStorage.getItem('card.cvv'),
    cardNumber: sessionStorage.getItem('card.cardNumber'),
    expirationDate: sessionStorage.getItem('card.expirationDate'),
  }
    const data = {
      _id: sessionStorage.getItem('_id'),
      planType: sessionStorage.getItem('planType'),
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('token'),
      registrationCompleted: sessionStorage.getItem('registrationCompleted'),
      NetflixEmail: sessionStorage.getItem('NetflixEmail'),
      card: cardDetails
  }

  const postPlan = await axios.post('https://zuri-netlify-backend.herokuapp.com/apis/updateplan', data)

  if(postPlan.status === 201){
    const {planType} = postPlan.data.data
    sessionStorage.setItem("planType", planType);
    window.location.href = 'Signup4.html';
  }
}
catch(error){
  if(!error.response){
    planDiv.innerHTML = 'Next';
    planDiv.classList.remove('loader');
    alert('Something went wrong. please check your network connection')
    return;
  }

}
})