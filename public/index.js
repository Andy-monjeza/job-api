const authOptions= document.querySelector('.auth-options');
const toDashBoardBtn=document.querySelector('.home-dashboard');
let user;

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));


        const currentTime = Date.now() / 1000;
        if (payload.exp < currentTime) {
            console.warn("Token expired. Logging out...");
            localStorage.removeItem('token'); 
            return null;
        }

        return payload; 
    } catch (e) {
        localStorage.removeItem('token'); 
        return null;
    }
};

export const attachCredentials=()=>{
    if(user === null){
      toDashBoardBtn.style.display="none";
    }else{
      
      authOptions.innerHTML=`
      <p class="user-name">${user.name.split(' ')[0]}</p>
      <img class="user-profile" src="${user.profilePic}" alt="">
      `
    }
}



document.addEventListener("DOMContentLoaded",()=>{
 user=getCurrentUser();
 attachCredentials();
})
 
