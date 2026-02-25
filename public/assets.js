import { initChart } from "./chart.js";
import { buildProfile } from "./fetchProfile.js";
import { buildMyApplicationTab } from "./fetchApplications.js";
import { buildSavedJobsTab } from "./fetchSavedJobs.js";
import { buildDashBoard } from "./dashboard.js";
import { updateApplicationsCount } from "./dashboard.js";
import { setupRecruiterListeners } from "./recruiterDashBuild.js";


const contentSection = document.querySelector('.content-bar');
const sideBar = document.querySelector('.sidebar')
const dashBtn=document.querySelector('.dashBtn');
const profileBtn=document.querySelector('.profile');
const savedJbsOption=document.querySelector('.saved-jobs-option');
const MyApplicationsBtn=document.querySelector('.my-applications-btn');
const settingsBtn=document.querySelector('.settings');
const followedRecruiterBtn=document.querySelector('.followed-recs');
const messagesBtn=document.querySelector('.messagesBtn')
 const matchingJobsThisWeekCount = document.querySelector('.market-demand-count');
 let applicationsNum;
 
const getCurrentUser = () => {
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

 const attachCredentials = () => {
    const smallPfp = document.querySelector('.profile-photo');
    const sideBarName = document.querySelector('.name');
    const sideBarRole = document.querySelector('.role');
    const optionContainer = document.querySelector('.option-container');
    
    const user = getCurrentUser();

    if (user === null) {
        sideBarName.textContent = "Sign-In";
        sideBarRole.textContent = " ";
        smallPfp.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    } else {
        sideBarName.textContent = user.name;
        sideBarRole.textContent = user.role;
        smallPfp.src = user.profilePic || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

        if (user.role === 'recruiter') {
            optionContainer.innerHTML = `
                <button class="options recruiter-dash">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"></path>
                        <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                Overview
                </button>
                <button class="options manage-jobs">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                Manage Jobs
                </button>
                <button class="options view-applicants">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                Applicants
                </button>
                <button class="options messages">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                Messages
                </button>
            `;
           
            setupRecruiterListeners();
        }
    }
}

document.addEventListener("DOMContentLoaded",attachCredentials);

const fetchData = async (url, method, contType) => {
    try {
        const response = await fetch(url, {
            method: method, 
            headers: {
                'content-type': contType
            }
        });

        if (response.ok) {
            
            const data = await response.text(); 
            return data;
        }
    } catch (err) {
        console.log("Fetch error:", err);
    }
}

dashBtn.addEventListener('click', async () => {

         const data = await fetchData('http://localhost:5000/api/assets/dashboard', 'GET', 'text/html');
               const applicationCount=await updateApplicationsCount();
            if (data) {
                contentSection.innerHTML = data;
                setTimeout(() => {
                const chartElement = document.querySelector("#chart");
                if (chartElement) {
                    applicationsNum= document.querySelector('.applications-count');
                    console.log('Fetching dashboard...');
                    initChart();
                    buildDashBoard();
                    applicationsNum.textContent=applicationCount.myApplications.length;
                } else {
                    console.error("Chart container not found in the fetched HTML!");
                }
                 
    }, 10); 

    
}
        
    
});

const getProfile=async()=>{
     console.log('Fetching profile...');

        const data = await fetchData('http://localhost:5000/api/assets/profile', 'GET', 'text/html');
        
        if (data) {
            contentSection.innerHTML = data;
            if (data) {
          contentSection.innerHTML = data;
          buildProfile();   
      }
  }
}
const getSavedJobs=async()=>{
 console.log('Fetching saved jobs...');

        const data = await fetchData('http://localhost:5000/api/assets/saved-jobs', 'GET', 'text/html');
        
        if (data) {
            contentSection.innerHTML = data;
            if (data) {
          contentSection.innerHTML = data;
      }
  }
  buildSavedJobsTab();
}

const getMyApplications=async()=>{
   console.log('Fetching My applications...');

        const data = await fetchData('http://localhost:5000/api/assets/my-applications', 'GET', 'text/html');
        
        if (data) {
            contentSection.innerHTML = data;
            if (data) {
          contentSection.innerHTML = data;
      }
  }
  buildMyApplicationTab();
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        // Prevent body from scrolling when menu is open
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    
    const options = document.querySelectorAll('.options');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                toggleSidebar();
            }
        });
    });
});

savedJbsOption.addEventListener('click',getSavedJobs);
profileBtn.addEventListener('click',getProfile);
MyApplicationsBtn.addEventListener('click',getMyApplications);
