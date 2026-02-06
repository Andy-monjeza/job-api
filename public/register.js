
const jobseeker = document.querySelector('.as-jobseeker');
const recruiter = document.querySelector('.as-company');
const role_conntainer=document.querySelector('.role-selector');
const Name=document.querySelector('.name');
const email=document.querySelector('.email');
const password=document.querySelector('.password');
const sign_up=document.querySelector('.sign-up-button');
const message_box=document.querySelector('.response-message');

let activeRole = 'jobseeker';

function setActive(element) {
  [jobseeker, recruiter].forEach(el => {
    el.style.backgroundColor = '';
    el.style.boxShadow = '';
    el.style.color='rgba(245, 245, 245, 0.664)'
  });

  element.style.backgroundColor = '#8B5CF6';
  element.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
}

setActive(jobseeker);

[jobseeker,recruiter].forEach(role=>{
    role.addEventListener('click',()=>{
        activeRole= role === recruiter ? "recruiter":"jobseeker";
        setActive(role);
        role.style.color="white";
    })
})


const sendRequest=async()=>{

    const sign_up_data={
    name:Name.value,
    email:email.value,
    role:activeRole,
    password:password.value
}

  try{
  
   sign_up.innerHTML=`<span class="spinner"></span>`

   const response=await fetch('http://localhost:5000/api/auth/register',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify(sign_up_data)
   })

  const data=await response.json();

  if(data.success){
    localStorage.setItem('token',data.token);
    console.log(data);
    
    message_box.style.display="block";
    message_box.classList.add("msg-success");
    message_box.innerHTML=data.message;
     
    sign_up.innerHTML="Sign Up"
  }else if (!data.success){
    message_box.style.display="block";
    message_box.classList.add("msg-error");
    message_box.innerHTML=data.message;
    sign_up.innerHTML="Sign Up";    
    console.log(data)};

  
  
  }catch(err){
    console.log(err.message);
  }
}

sign_up.addEventListener('click',()=>{
    event.preventDefault()
    sendRequest();
})