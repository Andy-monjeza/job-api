const companyPhoneInput = document.querySelector('#companyPhone');
const companyLocationInput = document.querySelector('#companyLocation');
const companyWebsiteInput = document.querySelector('#companyWebsite');
const companyDescriptionInput = document.querySelector('#companyDescription');
const profilePictureInput = document.querySelector('#profilePicture');
const previewImage = document.querySelector('#previewImage');

const companyStep1 = document.querySelector('#companyStep1');
const companyStep2 = document.querySelector('#companyStep2');
const companyStep3 = document.querySelector('#companyStep3');

const companyNextBtn = document.querySelector('#companyNextBtn');
const companyFinishBtn = document.querySelector('#companyFinishBtn');
const step2FinishBtn = companyStep2.querySelector('#companyNextBtn')
const uploadBox=document.querySelector('.upload-box');

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


profilePictureInput.addEventListener('change', () => {
    const file = profilePictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            previewImage.src = reader.result;
            previewImage.style.display = 'block';
            uploadBox.style.display="none";
        };
        reader.readAsDataURL(file);
    }
});


companyNextBtn.addEventListener('click', () => {
    const step1Fields = [
        companyPhoneInput,
        companyLocationInput,
        companyWebsiteInput
    ];

    if (validateFields(step1Fields)) {
        companyStep1.classList.remove('active');
        companyStep2.classList.add('active');
    }
});


step2FinishBtn.addEventListener('click', () => {
    const step2Fields = [
        companyDescriptionInput
    ];

    if (validateFields(step2Fields)) {
        companyStep2.classList.remove('active');
        companyStep3.classList.add('active');
    }
});

companyFinishBtn.addEventListener('click', async () => {

    if (companyDescriptionInput.value.trim() === '') {
        companyDescriptionInput.parentElement.style.borderColor = 'red';
        return;
    } else {
        companyDescriptionInput.parentElement.style.borderColor = '#ccc';
    }

    const formData = new FormData();
    formData.append('phoneNo', companyPhoneInput.value);
    formData.append('location', companyLocationInput.value);
    formData.append('companyWebsite', companyWebsiteInput.value);
    formData.append('companyDescription', companyDescriptionInput.value);

    if (profilePictureInput.files[0]) {
        formData.append('profilePicture', profilePictureInput.files[0]);
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
        console.log(data);

        if (data.success) {
            window.location.replace('assets.html');
        } else {
            console.error('Failed to update profile');
            alert('Failed to update profile');
        }

    } catch (err) {
        console.log(err.message);
        alert('An error occurred');
    }
});