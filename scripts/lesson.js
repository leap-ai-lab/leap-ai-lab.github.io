// Category mapping for tag display names
const categoryMap = {
    'technical': 'Technical',
    'socio-ethical': 'Socio-Ethical',
    'career-development': 'Career Development'
};

// Category mapping for CSS classes
const categoryClassMap = {
    'technical': 'technical-tag',
    'socio-ethical': 'socio-ethical-tag',
    'career-development': 'career-tag'
};

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Load and display lesson
async function loadLesson() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const lessonContent = document.getElementById('lessonContent');

    // Get slug from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        loadingIndicator.style.display = 'none';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        // Load individual lesson file based on slug
        // Since lesson.html is in html/, we need to go up one level to reach lesson/
        const lessonPath = `../lesson/${slug}.json`;
        
        const response = await fetch(lessonPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch lesson: ${response.status} ${response.statusText}. Tried path: ${lessonPath}`);
        }

        const lesson = await response.json();

        // Display lesson content
        displayLesson(lesson);
        loadingIndicator.style.display = 'none';
        lessonContent.style.display = 'block';

        // Update page title
        document.title = `${lesson.title} - LEAP`;

    } catch (error) {
        console.error('Error loading lesson:', error);
        console.error('Slug was:', slug);
        console.error('Attempted path:', `../lesson/${slug}.json`);
        console.error('Current page path:', window.location.pathname);
        loadingIndicator.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

// Display lesson content
function displayLesson(lesson) {
    // Header section
    document.getElementById('lessonTitle').textContent = lesson.title;
    
    const publicationDate = document.getElementById('publicationDate');
    if (lesson.publicationDate) {
        publicationDate.textContent = `Published: ${formatDate(lesson.publicationDate)}`;
    } else {
        publicationDate.style.display = 'none';
    }

    const lessonDuration = document.getElementById('lessonDuration');
    if (lesson.duration) {
        lessonDuration.textContent = `⏱ ${lesson.duration}`;
    }

    const lessonCategory = document.getElementById('lessonCategory');
    const tagClass = categoryClassMap[lesson.category] || 'technical-tag';
    const tagText = categoryMap[lesson.category] || lesson.category;
    lessonCategory.textContent = tagText;
    lessonCategory.classList.add(tagClass);

    if (lesson.overview) {
        document.getElementById('lessonOverview').textContent = lesson.overview;
    }

    // Learning Objectives
    const objectivesList = document.getElementById('learningObjectives');
    if (lesson.learningObjectives && lesson.learningObjectives.length > 0) {
        objectivesList.innerHTML = '';
        lesson.learningObjectives.forEach(objective => {
            const li = document.createElement('li');
            li.textContent = objective;
            objectivesList.appendChild(li);
        });
    } else {
        document.querySelector('.lesson-section:first-of-type').style.display = 'none';
    }

    // Lesson Outline
    const outlineContainer = document.getElementById('lessonOutline');
    if (lesson.outline && lesson.outline.length > 0) {
        outlineContainer.innerHTML = '';
        lesson.outline.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'outline-section';
            sectionDiv.innerHTML = `
                <div class="outline-section-header">
                    <h3>${index + 1}. ${escapeHtml(section.section)}</h3>
                    ${section.duration ? `<span class="outline-duration">${escapeHtml(section.duration)}</span>` : ''}
                </div>
                ${section.topics && section.topics.length > 0 ? `
                    <ul class="outline-topics">
                        ${section.topics.map(topic => `<li>${escapeHtml(topic)}</li>`).join('')}
                    </ul>
                ` : ''}
            `;
            outlineContainer.appendChild(sectionDiv);
        });
    } else {
        document.querySelector('.lesson-section:nth-of-type(2)').style.display = 'none';
    }

    // Download Buttons
    const downloadButtons = document.getElementById('downloadButtons');
    if (lesson.downloads) {
        downloadButtons.innerHTML = '';
        
        if (lesson.downloads.educatorGuide) {
            const guideBtn = createDownloadButton('Educator Guide', lesson.downloads.educatorGuide, 'guide');
            downloadButtons.appendChild(guideBtn);
        }
        
        if (lesson.downloads.slideDeck) {
            const slidesBtn = createDownloadButton('Slide Deck', lesson.downloads.slideDeck, 'slides');
            downloadButtons.appendChild(slidesBtn);
        }
        
        if (lesson.downloads.worksheets) {
            const worksheetsBtn = createDownloadButton('Activity Worksheets', lesson.downloads.worksheets, 'worksheets');
            downloadButtons.appendChild(worksheetsBtn);
        }
    } else {
        document.querySelector('.download-section').style.display = 'none';
    }
}

// Create download button
function createDownloadButton(text, url, type) {
    const button = document.createElement('a');
    button.href = url;
    button.className = `download-btn download-btn-${type}`;
    button.textContent = text;
    button.download = true;
    button.target = '_blank';
    return button;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load lesson when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadLesson();
});