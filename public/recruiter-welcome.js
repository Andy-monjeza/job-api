
const companyPhoneInput = document.querySelector('#companyPhone');
const companyLocationInput = document.querySelector('#companyLocation');
const companyWebsiteInput = document.querySelector('#companyWebsite');
const companyDescriptionInput = document.querySelector('#companyDescription');

const companyStep1 = document.querySelector('#companyStep1');
const companyStep2 = document.querySelector('#companyStep2');

const companyNextBtn = document.querySelector('#companyNextBtn');
const companyFinishBtn = document.querySelector('#companyFinishBtn');



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

companyFinishBtn.addEventListener('click', async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/welcome-user/about-user', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Add this
            },
            // Wrap the object in JSON.stringify
            body: JSON.stringify({
                phoneNo: companyPhoneInput.value,
                location: companyLocationInput.value,
                companyWebsite: companyWebsiteInput.value,
                companyDescription: companyDescriptionInput.value
            })
        });

        if (response.ok) {
            window.location.replace('assets.html');
        } else {
            console.error('Failed to update profile');
        }

    } catch (err) {
        console.log(err.message);
    }
});