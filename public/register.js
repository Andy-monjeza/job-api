const jobseeker = document.querySelector('.as-jobseeker');
const recruiter = document.querySelector('.as-company');
const Name = document.querySelector('.name');
const nameLabel = document.querySelector('.name-label'); // Ensure you have this class in your HTML
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const sign_up = document.querySelector('.sign-up-button');
const message_box = document.querySelector('.response-message');

let activeRole = 'jobseeker';


function setActive(element) {
    [jobseeker, recruiter].forEach(el => {
        el.style.backgroundColor = '';
        el.style.boxShadow = '';
        el.style.color = 'rgba(245, 245, 245, 0.664)';
    });

    element.style.backgroundColor = '#8B5CF6';
    element.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
    element.style.color = "white";
}


setActive(jobseeker);

[jobseeker, recruiter].forEach(role => {
    role.addEventListener('click', () => {
        activeRole = role === recruiter ? "recruiter" : "jobseeker";
        setActive(role);

        
        if (activeRole === 'recruiter') {
            if (nameLabel) nameLabel.innerHTML = "Company Name";
            Name.placeholder = "Enter your company name";
        } else {
            if (nameLabel) nameLabel.innerHTML = "Full Name";
            Name.placeholder = "Enter your full name";
        }
    });
});


const sendRequest = async () => {
    
    if (!Name.value || !email.value || !password.value) {
        showMessage("Please fill in all fields", "msg-error");
        return;
    }

    const sign_up_data = {
        email: email.value,
        role: activeRole,
        password: password.value,
        [activeRole === 'recruiter' ? 'companyName' : 'name']: Name.value
    };

    try {
        // 3. UI Loading State
        sign_up.innerHTML = `<span class="spinner"></span>`;
        sign_up.disabled = true;

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(sign_up_data)
        });

        const data = await response.json();
        console.log(data)
        if (data.success) {
            localStorage.setItem('token', data.token);
            showMessage(data.message || "Registration Successful!", "msg-success");
            
            // 4. Redirect after success
            setTimeout(() => {
                window.location.replace("index.html");
            }, 1500);
        } else {
            showMessage(data.message || "Registration failed", "msg-error");
            resetButton();
        }

    } catch (err) {
        console.error("Fetch Error:", err.message);
        showMessage("Connection error. Is the server running?", "msg-error");
        resetButton();
    }
};

// --- Helper Functions ---
function showMessage(text, typeClass) {
    message_box.style.display = "block";
    message_box.className = `response-message ${typeClass}`; // Resets old classes
    message_box.innerHTML = text;
}

function resetButton() {
    sign_up.innerHTML = "Sign Up";
    sign_up.disabled = false;
}

// --- Event Listener ---
sign_up.addEventListener('click', (e) => {
    e.preventDefault(); // Fixed: Passing 'e' ensures preventDefault works
    sendRequest();
});