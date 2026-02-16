const fetchUserProfile = async () => {
    
    const sessionToken = localStorage.getItem('token');

    if (!sessionToken) {
        console.error("No token found, please login.");
        return null;
    }

    try {
        const response = await fetch('http://localhost:5000/api/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch profile');
        }

        return data;
    } catch (error) {
        console.error("Fetch error:", error.message);
        return null;
    }
};

export const buildProfile=async()=>{
    const userName=document.querySelector('.Username');
    const profilePicture=document.querySelector('.profile-picture')
    const coverPhoto=document.querySelector('.cover-photo');
    const email=document.querySelectorAll('.email');
    const topSocialLink=document.querySelector('.top-social-link');
    const location=document.querySelectorAll('.location')
    const profession=document.querySelector('.skillset') || null;
    const phoneNo=document.querySelector('.phoneNo');
 
    try{
        const profile=await fetchUserProfile();
        if(profile){ 
            userName.textContent=profile.userDetails.name;

            email.forEach(e=>{
                if(e.classList.contains('info-part')){
                    e.innerHTML=profile.userDetails.email;
                }else{e.innerHTML=`<i class="fa-solid fa-envelope"></i>`+ profile.userDetails.email;}
                
            })
              location.forEach(e=>{
                if(e.classList.contains('info-part')){
                    e.innerHTML=profile.userDetails.location;
                }else{e.innerHTML=`<i class="fa-solid fa-location-dot"></i>`+ profile.userDetails.location;}
                
            })
            profilePicture.src=profile.userDetails.profilePicture.url 
            topSocialLink.textContent=profile.userDetails.prefsocialLink || ' ';
            phoneNo.textContent= '+' + profile.userDetails.phoneNo
            profession.textContent=profile.userDetails.Profession;
            location.innerHTML=  `<i class="fa-solid fa-location-dot"></i>` + profile.userDetails.location;  
            console.log(profile);
        }
    }catch(err){
        console.log(err.message);
    }
 
     
}