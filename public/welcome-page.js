// Step 1 Inputs
const phoneInput = document.querySelector('#phone-number'); // Matches the new HTML ID
const locationInput = document.querySelector('#location');
const professionInput = document.querySelector('#profession');
const skillsInput = document.querySelector('#skills');

// Step 2 Inputs
const schoolInput = document.querySelector('#school');
const degreeInput = document.querySelector('#degree');
const fieldInput = document.querySelector('#field');

// Step 3 (Socials)
const instagramInput = document.querySelector('#instagram');
const facebookInput = document.querySelector('#facebook');
const websiteInput = document.querySelector('#website');
const linkedinInput = document.querySelector('#linkedin');

// Containers
const step1 = document.querySelector('#step1');
const step2 = document.querySelector('#step2');
const step3 = document.querySelector('#step3');

// Buttons
const step1Btn = step1.querySelector('button');
const step2Btn = step2.querySelector('button');
const finishBtn = step3.querySelector('button');

// VALIDATION
function validateFields(fieldsArray) {
    let isValid = true;
    fieldsArray.forEach(input => {
        if (input.value.trim() === '') {
            input.parentElement.style.borderColor = 'red';
            isValid = false;
        } else {
            input.parentElement.style.borderColor = '#ccc';
        }
    });
    return isValid;
}

// NAVIGATION LOGIC
step1Btn.addEventListener('click', () => {

    if (validateFields([phoneInput, locationInput, professionInput, skillsInput])) {
        step1.classList.remove('active');
        step2.classList.add('active');
    }
});

step2Btn.addEventListener('click', () => {
    if (validateFields([schoolInput, degreeInput, fieldInput])) {
        step2.classList.remove('active');
        step3.classList.add('active');
    }
});

finishBtn.addEventListener('click', async() => {
    // Collect all data
   const userData = {
    phoneNo: phoneInput.value,
    location: locationInput.value,
    profession: professionInput.value,
    skills: skillsInput.value.split(',').map(s => s.trim()),

    education: [{
        school: schoolInput.value,
        degree: degreeInput.value,
        field: fieldInput.value
    }],

    socialLinks: {
        instagram: instagramInput.value || "",
        linkedin: linkedinInput.value || "",
        facebook: facebookInput.value || "",
        website: websiteInput.value || ""
    }
};

     try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/welcome-user/about-user', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
          
            body: JSON.stringify(userData)
        });
        const data=await response.json();
        console.log(data)
        if (data.success) {
            window.location.replace('assets.html');
        } else {
            console.error('Failed to update profile');
        }

    } catch (err) {
        console.log(err.message);
    }
    console.log("Form Submitted!", userData);
    alert("Profile Setup Complete!");
});