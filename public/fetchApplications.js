
const fetchApplications= async()=>{
    const sessionToken = localStorage.getItem('token');
    if(!sessionToken)return console.log("token not found please login again!");

    try{
      const response = await fetch('/api/applications/get-my-applications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            }
        });
        if(!response.ok) return;

        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}



 const renderMyApplicationsTab= (applications, container, counterEls) => {

    const emptyStateSVG = `
<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="150" cy="100" r="80" fill="#f0f2f5"/>
  <rect x="110" y="70" width="80" height="100" rx="8" fill="#e0e4e8"/>
  <rect x="120" y="85" width="60" height="8" rx="4" fill="#cbd5e0"/>
  <rect x="120" y="105" width="40" height="8" rx="4" fill="#cbd5e0"/>
  <rect x="120" y="125" width="50" height="8" rx="4" fill="#cbd5e0"/>
  <path d="M210 150C210 161.046 201.046 170 190 170H110C98.9543 170 90 161.046 90 150V150C90 138.954 98.9543 130 110 130H190C201.046 130 210 138.954 210 150V150Z" fill="#4A90E2" fill-opacity="0.2"/>
  <circle cx="210" cy="70" r="25" stroke="#4A90E2" stroke-width="6"/>
  <line x1="228" y1="88" x2="250" y2="110" stroke="#4A90E2" stroke-width="6" stroke-linecap="round"/>
</svg>`;
  
    let counts = { hired: 0, shortlisted: 0, rejected: 0 };
    let listHTML = ``;

   
    applications.forEach(a => {
       console.log(a)
        const status = a.status.toLowerCase();
        if (counts.hasOwnProperty(status)) {
            counts[status]++;
        }

        
        const appliedDate = new Date(a.appliedOn).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short'
        });

      
        listHTML += `
        <div class="job-rect-card">
            <div class="job-card-header">
                <img src="${a.job?.postedBy?.profilePicture.url || 'https://picsum.photos/seed/tech1/100'}" class="company-logo-rect">
                <div class="job-main-info">
                    <span class="job-role-title">${a.job?.title}</span>
                    <span class="company-meta">${a.job?.category} • Applied ${appliedDate}</span>
                </div>
            </div>

            <div class="job-details-text">
                 ${a.job.description}
             </div>

            <div class="job-card-footer">
                <div class="job-body">
                    <p>${a.job?.postedBy?.name} • ${a.job?.location}</p>
                </div>
                <div class="job-status status">${a.status}</div>
            </div>
        </div>`;
    });


    counterEls.hired.textContent = counts.hired + " Hired";
    counterEls.shortlisted.textContent = counts.shortlisted + " Shortlisted";
    counterEls.rejected.textContent = counts.rejected + " Rejected";

    

if (applications.length > 0) {
    container.innerHTML = listHTML;
} else {
    container.innerHTML = `
        <div class="empty-state-wrapper" style="text-align: center; padding: 50px 20px;">
            ${emptyStateSVG}
            <h3 style="margin-top: 20px; color: #2d3748;">No applications yet</h3>
            <p style="color: #718096; max-width: 300px; margin: 10px auto;">
                Looks like you haven't applied to any jobs yet. Your next big career move is just a click away!
            </p>
            <a href="browse-jobs.html" class="btn-primary" style="display: inline-block; margin-top: 20px; text-decoration: none;">
                Find Your Next Job
            </a>
        </div>
    `;
}
};


 export const buildMyApplicationTab= async()=>{
    const response=await fetchApplications();
    const applications=response.myApplications;

    const applicationCounter=document.querySelector('.application-count');
    const applicationContainer=document.querySelector('.application-container');

    const statusCounters={
    shortlisted:document.querySelector('.Shortlisted'),
    hired:document.querySelector('.hired'),
    rejected:document.querySelector('.Rejected')
 };

renderMyApplicationsTab(applications, applicationContainer,statusCounters);
applicationCounter.textContent=applications.length;

 }

 
