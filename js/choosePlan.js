const mobile = document.querySelector(".description1");
const Basic = document.querySelector(".description2");
const standard = document.querySelector(".description3");
const premium = document.querySelector(".description4");
const planItem2 = document.querySelector(".plan_item_2");
const planItem3 = document.querySelector(".plan_item_3");
const planItem4 = document.querySelector(".plan_item_4");
const planItem5 = document.querySelector(".plan_item_5");
const submitBtn = document.querySelector(".planSubmitBtn");

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
      plan.children[i].style.color = "black"
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
});

// onclick basic version
Basic.addEventListener('click', () => {
  changeColorFunction(planItem2,planItem3,planItem4,planItem5,2,Basic);
});

// onclick standard version
standard.addEventListener('click', () => {
  changeColorFunction(planItem2,planItem3,planItem4,planItem5,3,standard);
})

// onclick premium version
premium.addEventListener('click', () => {
  changeColorFunction(planItem2,planItem3,planItem4,planItem5,4,premium);
})

submitBtn.addEventListener('click', async () => {
  // sessionStorage.setItem("_id", _id);
  // sessionStorage.setItem("email", email);
  // sessionStorage.setItem("registrationCompleted", registrationCompleted);
  // sessionStorage.setItem("token", token);
  // sessionStorage.setItem("planType", planType);
  // sessionStorage.setItem("firstName", card.firstName);
  // sessionStorage.setItem("lastName", card.lastName);
  // sessionStorage.setItem("ccv", card.ccv);
  // sessionStorage.setItem("cardNumber", card.cardNumber);
  // sessionStorage.setItem("expirationDate", card.expirationDate);
  // sessionStorage.setItem("NetflixEmail", NetflixEmail);

  const _id = sessionStorage.getItem('_id');
  const planType = sessionStorage.getItem("planType");

  console.log(planType)

})