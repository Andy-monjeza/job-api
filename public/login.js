const emailInput=document.querySelector('.email');
const passwordInput=document.querySelector('.password');
const rememberMe=document.querySelector('.remember-me-checkbox');

const login_card=document.querySelector('.login-card');

const sendRequest=async()=>{
    const loginData={
        email:emailInput.value,
        password:passwordInput.value
    }
    try{
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(loginData)
        });
       const data=await response.json();
        console.log(data);
    
    }catch(err){
      console.log(err.message)
    }
}

const checkIfEmptyFields=()=>{
 [passwordInput,emailInput].forEach(field=>{
    if(field.value===""){
        field.style.border="1px solid #630424ff"
    } else{
         field.style.border="1px solid rgba(255, 255, 255, 0.1)"
    }
 })
}

login_card.addEventListener("click",(e)=>{
    e.preventDefault();
    checkIfEmptyFields();
    if(e.target.classList.contains('sign-in-button')){
      sendRequest();
    }
})