const emailInput=document.querySelector('.email');
const passwordInput=document.querySelector('.password');
const rememberMe=document.querySelector('.remember-me-checkbox');
const submitBtn=document.querySelector('.sign-in-button');
const messagebox=document.querySelector('.response-message');

const login_card=document.querySelector('.login-card');

const sendRequest=async()=>{
    const loginData={
        email:emailInput.value,
        password:passwordInput.value
    }
    try{
        submitBtn.disabled=true;
        submitBtn.innerHTML=`<span class="spinner"></span>`
        const response=await fetch('/api/auth/login',{
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
            messagebox.style.display="block";    
            messagebox.classList.add('msg-error');
             setTimeout(() => {
             messagebox.classList.remove('msg-error');
              messagebox.style.display="none";
        }, 2000);
            return;
        }
          
       else if(data.success){
        localStorage.setItem('token',data.token);
        messagebox.style.display="block"
        messagebox.innerHTML=data.message
        window.location.replace("index.html");
        messagebox.classList.add('msg-success');
        setTimeout(() => {
             messagebox.classList.remove('msg-success');
             messagebox.style.display="none";
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