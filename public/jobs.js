import { attachCredentials,getCurrentUser } from "./index.js";

const jobList=document.querySelector('.job-list');
  const jobPreviewContainer = document.querySelector('.job-preview-side');

const fetchJobsFeed = async (pageNumber = 1) => {
    try {
        const response = await fetch(`http://localhost:5000/api/filtered-jobs/job-feed?page=${pageNumber}&limit=10`);
        const data = await response.json();
        if (data.success) {
         return data;
        }
    } catch (error) {
      
    }
};

const applyForJob = async (jobId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please login to apply!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/job-application/apply/${jobId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log(data)
        if (data.success) {
            const btn = document.querySelector('.btn-primary');
            btn.innerHTML = 'Applied <i class="fa-solid fa-check"></i>';
            btn.style.background = '#10b981';
            btn.disabled = true;
        }
    } catch (err) {
        console.error("Application failed", err);
    }
};

const saveJob = async (jobId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please login to save jobs!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/saved-jobs/save/${jobId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.success) {

            const saveBtn = document.querySelector('.btn-secondary');
            saveBtn.innerHTML = 'Saved <i class="fa-solid fa-bookmark"></i>';
            saveBtn.style.color = '#8B5CF6'; 
            saveBtn.classList.add('saved');
        }
    } catch (err) {
        console.error("Error saving job:", err);
    }
};

const fetchSelectedJob = async (jobId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/filtered-jobs/single-job?jobId=${jobId}`
    );

    if (!response.ok) {
      console.log("Job not found");
      return null;
    }

    return await response.json();

  } catch (err) {
    console.log(err.message);
  }
};

function renderJobCards(jobs) {
  const jobListContainer = document.querySelector('.job-list');

  const jobCardsHTML = jobs.map(job => `
    <div data-job-id="${job._id}" class="job-rect-card">
        <div class="job-card-header">
            <img src="${job.postedBy.profilePicture || 'https://picsum.photos/seed/tech1/100'}" alt="Company" class="company-logo-rect">
            <div class="job-main-info">
                <span class="job-role-title">${job.title}</span>
                <span class="company-meta">${job.postedBy.name}</span>
            </div>
        </div>
        
        <div class="job-details-text">
            ${job.description}
        </div>

        <div class="job-card-footer">
            <div class="job-tags">
                ${job.skills.map(skill => `<span>${skill}</span>`).join('')}
            </div>
            <button class="detail-view-btn">Check Out</button>
        </div>
    </div>
  `).join('');

  jobListContainer.innerHTML = jobCardsHTML;
}

const renderJobPreview = (job) => {
   
    const stringDate = new Date(job.createdAt).toDateString();
  
  const skillsHtml = job.skills && job.skills.length > 0 
    ? job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')
    : '<span class="skill-tag">No specific skills listed</span>';

  const html = `

            <button class="back-btn" >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to jobs
            </button>
        <div class="top-part">

         <div class="job-preview-header">
         <img src="${job.postedBy.profilePicture || 'https://picsum.photos/seed/tech1/100'}" alt="Company" class="company-logo-rect">
        <div class="title-area">
        <h1>${job.title}</h1>
        <div class="company-name">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            ${job.postedBy.name}
        </div>
        </div>
  </div>

  <div class="tag-row">
    <span class="tag">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
        </svg>
         ${job.location}
    </span>

    <span class="tag">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
        </svg>
       ${"MK " +job.salary.toLocaleString()}
    </span>

    <span class="tag">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        ${stringDate}
    </span>
  </div>

    <div class="button-row">
    <button class="btn-primary" data-job-id="${job._id}">Apply Now ↗</button>
    <button class="btn-secondary" data-job-id="${job._id}">Save Job</button>
    </div>

        </div>

  <hr class="divider">

  <div class="content-section">
    <h3>ABOUT THE ROLE</h3>
    ${job.description}
    </div>

  <div class="content-section">
    <h3>SKILLS</h3>
    <div class="skill-tags">
     ${skillsHtml}
    </div>
  </div>

  <div class="content-section">
    <h3>Responsibilities</h3>
     
    <p class="responsibilities">
        ${job.responsibilities}
    </p>
  </div>

  <div class="content-section">
    <h3>Requirements</h3>
    <p>
   ${job.requirements}
  </div>

  <div class="content-section">
    <h3>Benefits</h3>
    <p>
    ${job.benefits}
    </p>
  </div>

  `;
  
  jobPreviewContainer.innerHTML = html;
}

/*
function closePreview() {
    document.body.classList.remove('preview-mode');
    
    // Smoothly remove the active highlight from the list after the slide
    setTimeout(() => {
        document.querySelectorAll('.mini-card').forEach(c => c.classList.remove('active'));
    }, 300); 
}
*/
document.addEventListener("DOMContentLoaded", async () => {
    getCurrentUser();
    attachCredentials();
  try {
    const data = await fetchJobsFeed(1); 
    if (data && data.success) {
      renderJobCards(data.jobs);
    }
  } catch (err) {
    console.log("Error loading feed:", err.message);
  }
});

jobList.addEventListener("click", async (e) => {

  const card = e.target.closest('.job-rect-card');
  if (!card) return;

  const id = card.dataset.jobId;

  const fetched = await fetchSelectedJob(id);

  if (fetched && fetched.job) {
    renderJobPreview(fetched.job);
  }
  if (window.innerWidth <= 850) {
        document.body.classList.add('preview-mode');
        
        const previewSide = document.querySelector('.job-preview-side');
        previewSide.scrollTo(0, 0);
    }

});

/*
jobPreviewContainer.addEventListener("click", async (e) => {

  const applyBtn = e.target.closest('.btn-primary');
  const saveBtn = e.target.closest('.btn-secondary');

  if (applyBtn) {
    const id = applyBtn.dataset.jobId;
    applyForJob(id);
  }

  if (saveBtn) {
    const id = saveBtn.dataset.jobId;
    saveJob(id);
  }

  const backBtn=document.querySelector('.back-btn')
 backBtn.addEventListener('click',closePreview);

});*/

// 1. The Delegation Listener for Apply/Save
jobPreviewContainer.addEventListener("click", async (e) => {
    // Check for Apply Button
    const applyBtn = e.target.closest('.btn-primary');
    if (applyBtn) {
        const id = applyBtn.dataset.jobId;
        applyForJob(id); // Make sure your apply function updates UI to "Applied"
        return; // Exit so we don't check other conditions
    }

    // Check for Save Button
    const saveBtn = e.target.closest('.btn-secondary');
    if (saveBtn) {
        const id = saveBtn.dataset.jobId;
        saveJob(id);
        return;
    }

    // 2. The Back Button Logic (using delegation too!)
    const backBtn = e.target.closest('.back-btn');
    if (backBtn) {
        closePreview();
    }
});

// 3. The Toggle Function (referenced in your mobile guidelines)
function closePreview() {
    // Remove the mobile 'active' state
    document.body.classList.remove('preview-mode');
    
    // Optional: Clear active card highlight in the list
    document.querySelectorAll('.mini-card').forEach(card => {
        card.classList.remove('active');
    });
}