export const buildSavedJobsTab = async () => {
    const sessionToken = localStorage.getItem('token');
    if (!sessionToken) return console.error("No token found");

    try {
   
        const [savedRes, appRes] = await Promise.all([
            fetch('http://localhost:5000/api/saved-jobs/my-saved-jobs', {
                headers: { 'Authorization': `Bearer ${sessionToken}` }
            }),
            fetch('http://localhost:5000/api/applications/get-my-applications', {
                headers: { 'Authorization': `Bearer ${sessionToken}` }
            })
        ]);

        const savedData = await savedRes.json();
        const appData = await appRes.json();

       
        const savedJobs = savedData.jobs || [];
        const applications = appData.myApplications || [];

        
        const appliedJobIds = applications.map(app => app.job._id.toString());

        const savedAndApplied = savedJobs.filter(item => 
            appliedJobIds.includes(item.job._id.toString())
        );

     
        const container = document.querySelector('.saved-jobs-container');
        const totalSavedEl = document.querySelector('.saved-count'); 
        const appliedFromSavedEl = document.querySelector('.applied-counter');
        const dueSoonEl = document.querySelector('.due-soon-counter'); 

        if (totalSavedEl) totalSavedEl.textContent = savedJobs.length;
        if (appliedFromSavedEl) appliedFromSavedEl.textContent = savedAndApplied.length + " Applied";

      
        let dueSoonCount = 0;
        const today = new Date();
        savedJobs.forEach(item => {
            const hasApplied = appliedJobIds.includes(item.job._id.toString());
            if (item.job?.deadline && !hasApplied) {
                const diff = Math.ceil((new Date(item.job.deadline) - today) / (1000 * 60 * 60 * 24));
                if (diff >= 0 && diff <= 3) dueSoonCount++;
            }
        });
        if (dueSoonEl) dueSoonEl.textContent = dueSoonCount + " Due Soon";

        renderSavedJobsList(savedJobs, container, appliedJobIds);

    } catch (err) {
        console.error("Critical Error in Saved Jobs Tab:", err.message);
    }
};

const renderSavedJobsList = (savedItems, container, appliedJobIds) => {
const emptySavedSVG = `
<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="150" cy="100" r="70" fill="#f8fafc"/>
  
  <rect x="115" y="65" width="70" height="90" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
  <rect x="125" y="80" width="50" height="6" rx="3" fill="#cbd5e1"/>
  <rect x="125" y="95" width="40" height="6" rx="3" fill="#cbd5e1"/>
  <rect x="125" y="110" width="30" height="6" rx="3" fill="#cbd5e1"/>
  
  <path d="M165 60V85L175 78L185 85V60H165Z" fill="#3b82f6"/>
  
  <ellipse cx="150" cy="165" rx="40" ry="5" fill="#e2e8f0"/>
</svg>`;

    if (!savedItems || savedItems.length === 0) {
        container.innerHTML = `
            <div class="empty-state-wrapper" style="text-align: center; padding: 60px 20px;">
                ${emptySavedSVG}
                <h3 style="margin-top: 15px; color: #1e293b; font-family: 'Inter', sans-serif; font-weight: 600;">No saved jobs yet</h3>
                <p style="color: #64748b; max-width: 280px; margin: 8px auto; font-family: 'Inter', sans-serif; font-size: 0.95rem;">
                    Your saved jobs will appear here. Find an interesting role and save it to review later.
                </p>
                <button class="btn-primary" onclick="window.location.href='/jobs.html'" style="margin-top: 20px; padding: 10px 25px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Browse Openings
                </button>
            </div>
        `;
        return;
    }

    let html = '';
    savedItems.forEach(item => {
        const job = item.job;
        const alreadyApplied = appliedJobIds.includes(job._id.toString());
        
    
        const deadline = job.deadline ? new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'N/A';

        html += `
        <div class="job-rect-card">
                <div class="job-card-header">
                    <img src="${job.postedBy?.profilePicture || 'default.png'}" alt="Company" class="company-logo-rect">
                    <div class="job-main-info">
                        <span class="job-role-title">${job.title}</span>
                        <span class="company-meta">${job.company} • Ends: ${deadline}</span>
                    </div>
                
                </div>
                
                <div class="job-details-text">
                ${job.description}
                </div>

                <div class="job-card-footer">
                    <div class="job-body">
                            <p>Saved Jobs • Saved On ${item.savedAt}</p>
                        </div>
                    <button class="detail-view-btn">Apply</button>
                </div>
            </div>>`;
    });

    container.innerHTML = html;
};