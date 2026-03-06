// Step 1 Inputs
const phoneInput = document.querySelector('#phone-number'); 
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
const step4 = document.querySelector('#step4');

// Buttons
const step1Btn = step1.querySelector('button');
const step2Btn = step2.querySelector('button');
const step3Btn = step3.querySelector('button');
const finishBtn = step4.querySelector('button');

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

step3Btn.addEventListener('click', () => {
    if (validateFields([schoolInput, degreeInput, fieldInput])) {
        step3.classList.remove('active');
        step4.classList.add('active');
    }
});

    const fileInput = document.getElementById("profilePicture");
    const preview = document.getElementById("previewImage");
    const uploadBox= document.querySelector('.upload-box')
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
            uploadBox.style.display="none";
        }
    });


finishBtn.addEventListener('click', async () => {

const formData = new FormData();

formData.append("phoneNo", phoneInput.value);
formData.append("location", locationInput.value);
formData.append("profession", professionInput.value);

// skills array
skillsInput.value.split(',').map(s => s.trim()).forEach(skill => {
    formData.append("skills[]", skill);
});

// education object
formData.append("education[0][school]", schoolInput.value);
formData.append("education[0][degree]", degreeInput.value);
formData.append("education[0][field]", fieldInput.value);

// social links
formData.append("socialLinks[instagram]", instagramInput.value || "");
formData.append("socialLinks[linkedin]", linkedinInput.value || "");
formData.append("socialLinks[facebook]", facebookInput.value || "");
formData.append("socialLinks[website]", websiteInput.value || "");

// PROFILE PICTURE
const fileInput = document.getElementById("profilePicture");

if (fileInput.files.length > 0) {
    formData.append("profilePicture", fileInput.files[0]);
}

try {

const token = localStorage.getItem('token');

const response = await fetch('/api/welcome-user/about-user', {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: formData
});

const data = await response.json();

localStorage.removeItem('token');
localStorage.setItem('token',data.sessionToken)

if (data.success) {
    window.location.replace('assets.html');
}

} catch (err) {
console.log(err.message);
}

});