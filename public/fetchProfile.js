const fetchUserProfile = async () => {
    
    const sessionToken = localStorage.getItem('token');

    if (!sessionToken) {
        console.error("No token found, please login.");
        return null;
    }

    try {
        const response = await fetch('/api/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            }
        });

        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch profile');
        }

        return data;
    } catch (error) {
        console.error("Fetch error:", error.message);
        return null;
    }
};

export const buildProfile = async () => {
    // Selectors
    const userName = document.querySelector('.Username');
    const profilePicture = document.querySelector('.profile-picture');
    const coverPhoto = document.querySelector('.cover-photo');
    const emails = document.querySelectorAll('.email'); // Renamed to plural for clarity
    const topSocialLink = document.querySelector('.top-social-link');
    const locations = document.querySelectorAll('.location'); // Renamed to plural
    const profession = document.querySelector('.skillset');
    const phoneNo = document.querySelector('.phoneNo');

    try {
        const profile = await fetchUserProfile();
        
        // Ensure profile and profile.userDetails exist before proceeding
        if (profile && profile.userDetails) {
            const user = profile.userDetails;

            // Use optional chaining (?.) to prevent crashes if elements are missing
            if (userName) userName.textContent = user.name || 'Anonymous';
            
            if (profilePicture) {
                // If the URL is missing, use that blank placeholder we discussed!
                profilePicture.src = user.profilePicture?.url || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
            }

            if (topSocialLink) topSocialLink.textContent = user.prefsocialLink || '';
            if (phoneNo) phoneNo.textContent = user.phoneNo ? `+${user.phoneNo}` : '';
            if (profession) profession.textContent = user.Profession || user.role || '';

            // Handle multiple Email fields
            emails.forEach(e => {
                if (e.classList.contains('info-part')) {
                    e.textContent = user.email;
                } else {
                    e.innerHTML = `<i class="fa-solid fa-envelope"></i> ${user.email}`;
                }
            });

            // Handle multiple Location fields
            locations.forEach(e => {
                if (e.classList.contains('info-part')) {
                    e.textContent = user.location;
                } else {
                    e.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${user.location}`;
                }
            });

            // REMOVED: location.innerHTML = ... (This was the main bug)
        }
    } catch (err) {
        console.error("Error building profile UI:", err);
    }
};