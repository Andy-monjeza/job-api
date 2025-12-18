const emailInput=document.querySelector('.email');
const passwordInput=document.querySelector('.password');
const rememberMe=document.querySelector('.remember-me-checkbox');
const submitBtn=document.querySelector('.sign-in-button');
const messagebox=document.querySelector('.error-message');

const login_card=document.querySelector('.login-card');

const sendRequest=async()=>{
    const loginData={
        email:emailInput.value,
        password:passwordInput.value
    }
    try{
        submitBtn.disabled=true;
        submitBtn.innerHTML=`<span class="spinner"></span>`
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(loginData)
        });
        
           
          const data=await response.json();
            if(data){
                submitBtn.disabled=false;
                submitBtn.innerHTML="Sign in";
            }
            console.log(data);

        if(!data.success){
            messagebox.innerHTML=data.message;
            messagebox.style.color=" #c21616";
            messagebox.classList.add('disapear-message');
             setTimeout(() => {
             messagebox.classList.remove('disapear-message');
              messagebox.innerHTML="";
        }, 2000);
            return;
        }
          
       else if(data.success){
        localStorage.setItem('token',data.token);
        messagebox.innerHTML=data.message
        messagebox.style.color="#069134ff";
        messagebox.classList.add('disapear-message');
        setTimeout(() => {
             messagebox.classList.remove('disapear-message');
             messagebox.innerHTML="";
        }, 2000);
        }
         
      
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