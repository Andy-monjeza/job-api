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
    const location=document.querySelector('.location')
    const prodffession=document.querySelector('.skillset');
    const phoneNo=document.querySelector('.phoneNo');

    try{
        const profile=await fetchUserProfile();
        if(profile){ 
            userName.textContent=profile.userDetails.name;
            email.forEach(e=>{
                e.textContent=profile.userDetails.email;
            })
            topSocialLink.textContent=profile.userDetails.prefsocialLink || ' ';
            phoneNo.textContent=profile.userDetails.phoneNo
            prodffession.textContent=profile.userDetails.prodffession;
            location.textContent=profile.userDetails.location;  
            console.log(profile);
        }
    }catch(err){
        console.log(err.message);
    }
 
     
}