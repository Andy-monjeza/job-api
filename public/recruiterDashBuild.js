import { 
    initChart,
    fetchRecruiterAnalytics,
    fetchRecruiterDash, 
    buildDashboard,
    fillStats,
    fetchApplicantManagerTab,
    loadApplicants,
    updateJobFilterOptions,
    populateApplicantTable,
    filterJobs,
    openApplicantModal,
    closeApplicantsModal
} from "./recruiter-build-helper.js";

const contentSection=document.querySelector('.content-bar');

const getJobManager = async () => {
    try {
        const response = await fetch('/api/assets/job-manager');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text(); 
        return data; 
    } catch (err) {
        console.error("Error in getJobManager:", err.message);
        return null;
    }
};

const buildJobManagerTab = async () => {
    const shell = await getJobManager();
    if (!shell) return;
    contentSection.innerHTML = shell;

    const jobs = await fetchRecruiterJobs();
      console.log(jobs)
    const tableBody = document.querySelector('#jobTableBody');
    const categoryFilter = document.getElementById('categoryFilter');

    if (tableBody) {
        if (jobs.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:50px;">No jobs found.</td></tr>`;
        } else {
            tableBody.innerHTML = jobs.map(job => createJobRow(job)).join('');

            const categories = [...new Set(jobs.map(job => job.category))];
            categoryFilter.innerHTML = `<option value="all">All categories</option>` + 
                categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }
    }
};

const createJobRow = (job) => {
      return `
    <tr>
        <td data-label="Position">
            <div class="pos-cell">
                <span class="pos-name">${job.title || 'Untitled Position'}</span>
                <span class="pos-sub">${job.type || 'N/A'}</span>
            </div>
        </td>
        <td data-label="Category">
            <span class="category-text">${job.category || 'General'}</span>
        </td>
        <td data-label="Location">
            <div class="loc-cell">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${job.location || 'Remote'}
            </div>
        </td>
        <td data-label="Applicants" class="text-center">
            <span class="applicant-count">${job.applicantCount || 0}</span>
        </td>
        <td data-label="Posted">
            <div class="date-cell">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                ${job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Date N/A'}
            </div>
        </td>
        <td data-label="Actions" class="action-cell">
            <button class="dots-btn" onclick="toggleActionMenu(event, '${job._id}')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
        </td>
    </tr>`;
};

const fetchRecruiterJobs = async () => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('/api/all-jobs/my-jobs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch jobs');

        const jobs = await response.json();
        return jobs; 
    } catch (err) {
        console.error("Fetch error:", err.message);
        return [];
    }
}

const handleJobSubmission = async (form) => {
    const formData = new FormData(form);
    
    const jobData = {
        title: formData.get('title'),
        location: formData.get('location'),
        salary: Number(formData.get('salary')),
        type: formData.get('type'),
        category: formData.get('category'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        requirements: formData.get('requirements'),
        responsibilities: formData.get('responsibilities'),
        benefits: formData.get('benefits'),
        skills: formData.get('skills').split(',').map(s => s.trim()).filter(s => s !== "")
    };

    try {
        const response = await fetch('/api/job-create/post-job', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        });

        if (response.ok) {
            alert("Job Posted Successfully!");
            window.closeJobModal();
            buildJobManagerTab(); 
        }
    } catch (err) {
        console.error("Post Error:", err);
    }
};

window.closeJobModal = () => {
    const modal = document.getElementById('jobModal');
    modal.style.display = 'none';
    
    document.getElementById('postJobForm').reset();
};

window.onclick = (event) => {
    const modal = document.getElementById('jobModal');
    if (event.target == modal) {
        window.closeJobModal();
    }
};

export const setupRecruiterListeners = () => {
    const jobManagerOption = document.querySelector('.manage-jobs');
    const dashBoardOption= document.querySelector('.recruiter-dash')
    const applicantsOption=document.querySelector('.view-applicants');
    const ModalClose=document.querySelector('.modal-close');
   

    jobManagerOption.addEventListener('click', async () => {
        await buildJobManagerTab();
        
        const newJobBtn = document.getElementById('createNewJob');
        if (newJobBtn) {
            newJobBtn.addEventListener('click', () => {
                document.getElementById('jobModal').style.display = 'block';
            });
        }
    });

    dashBoardOption.addEventListener('click',async()=>{
        try{
           const dashboard=await fetchRecruiterDash();
           if(dashboard){
            buildDashboard(dashboard);
            const analytics=await fetchRecruiterAnalytics();
            const categories = analytics.skillDemand.map(item => item._id);
            const values = analytics.skillDemand.map(item => item.count);
    
            fillStats(analytics);
            initChart(values, categories, "Applicants Per Skill");
           }
        }catch(err){
            console.log(err.message);
        }
    })

    applicantsOption.addEventListener('click', async () => {
    const contentSection = document.querySelector('.content-bar');
    
    // 1. Load the shell HTML
    contentSection.innerHTML = await fetchApplicantManagerTab();
    
    // 2. Fetch and render data
    const applicants = await loadApplicants();
   
    populateApplicantTable(applicants);
    updateJobFilterOptions(applicants);

    // 3. ACTIVATE THE FILTERING
    const searchInput = document.getElementById('jobSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        // Use 'input' instead of 'keyup' for a smoother experience (handles deletes/pastes)
        searchInput.addEventListener('input', filterJobs);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }
});

    document.addEventListener('submit', async (e) => {
        if (e.target.id === 'postJobForm') {
            e.preventDefault();
            await handleJobSubmission(e.target);
        }
    });
 
    contentSection.addEventListener('click', (e) => {
        const btn = e.target.closest('.options-btn');
        const closeBtnModal=document.querySelector('.modal-close');
        const modal= document.querySelector('.applicant-modal');
        
        if (btn) {
            const id = btn.dataset.applicantId;
        openApplicantModal(id);
        }

        if(closeBtnModal){
            closeApplicantsModal();
        }
    
    });
    
    
};

window.filterJobs = () => {
    const searchInput = document.getElementById('jobSearch').value.toLowerCase();
    const categorySelect = document.getElementById('categoryFilter').value;
    const rows = document.querySelectorAll('#jobTableBody tr');

    rows.forEach(row => {
        const title = row.querySelector('.pos-name').textContent.toLowerCase();
        const category = row.querySelector('.category-text').textContent;
        const matchesSearch = title.includes(searchInput);
        const matchesCategory = (categorySelect === 'all') || (category === categorySelect);
        row.style.display = (matchesSearch && matchesCategory) ? "" : "none";
    });
};

