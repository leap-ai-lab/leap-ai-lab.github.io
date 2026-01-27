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

// Fallback lessons data (used if JSON fetch fails)
const fallbackLessons = {
    "lessons": [
        {
            "id": 1,
            "title": "Introduction to Machine Learning",
            "slug": "intro-machine-learning",
            "description": "Learn the fundamentals of machine learning algorithms, including supervised and unsupervised learning techniques.",
            "category": "technical",
            "duration": "2 hours"
        },
        {
            "id": 2,
            "title": "Neural Networks Deep Dive",
            "slug": "neural-networks-deep-dive",
            "description": "Explore the architecture and training of neural networks, from basic perceptrons to deep learning models.",
            "category": "technical",
            "duration": "3 hours"
        },
        {
            "id": 3,
            "title": "Natural Language Processing Basics",
            "slug": "nlp-basics",
            "description": "Introduction to NLP concepts including tokenization, embeddings, and transformer models.",
            "category": "technical",
            "duration": "2.5 hours"
        },
        {
            "id": 4,
            "title": "AI Ethics and Bias",
            "slug": "ai-ethics-bias",
            "description": "Examine ethical considerations in AI development, including algorithmic bias, fairness, and accountability.",
            "category": "socio-ethical",
            "duration": "1.5 hours"
        },
        {
            "id": 5,
            "title": "Privacy and Data Protection",
            "slug": "privacy-data-protection",
            "description": "Understanding privacy concerns in AI systems and strategies for protecting user data.",
            "category": "socio-ethical",
            "duration": "1.5 hours"
        },
        {
            "id": 6,
            "title": "AI in Society: Impacts and Challenges",
            "slug": "ai-society-impacts",
            "description": "Explore how AI technologies affect society, including job displacement, decision-making, and social dynamics.",
            "category": "socio-ethical",
            "duration": "2 hours"
        },
        {
            "id": 7,
            "title": "Building Your AI Portfolio",
            "slug": "building-ai-portfolio",
            "description": "Learn how to showcase your AI projects effectively and build a compelling portfolio for job applications.",
            "category": "career-development",
            "duration": "1 hour"
        },
        {
            "id": 8,
            "title": "AI Career Paths and Opportunities",
            "slug": "ai-career-paths",
            "description": "Discover various career paths in AI, from research to industry applications, and how to prepare for them.",
            "category": "career-development",
            "duration": "1.5 hours"
        },
        {
            "id": 9,
            "title": "Networking in the AI Community",
            "slug": "networking-ai-community",
            "description": "Strategies for connecting with professionals, attending conferences, and building relationships in the AI field.",
            "category": "career-development",
            "duration": "1 hour"
        }
    ]
};

// Render lessons to the page
function renderLessons(lessons) {
    const cardsContainer = document.getElementById('cardsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');

    // Hide loading indicator and error message
    loadingIndicator.style.display = 'none';
    errorMessage.style.display = 'none';

    // Clear container
    cardsContainer.innerHTML = '';

    // Render each lesson as a card
    lessons.forEach(lesson => {
        const card = createLessonCard(lesson);
        cardsContainer.appendChild(card);
    });

    // Initialize filter functionality after cards are loaded
    initializeFilters();
}

// Load lessons from individual JSON files and render cards
async function loadLessons() {
    const cardsContainer = document.getElementById('cardsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');

    try {
        // First, load the index to get list of lesson files
        const indexResponse = await fetch('../lessons-index.json');
        if (!indexResponse.ok) {
            throw new Error('Failed to fetch lessons index');
        }
        
        const indexData = await indexResponse.json();
        
        // Fetch all lesson files in parallel
        const lessonPromises = indexData.lessons.map(lessonInfo => 
            fetch(`../lesson/${lessonInfo.filename}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${lessonInfo.filename}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.warn(`Failed to load ${lessonInfo.filename}:`, error);
                    return null;
                })
        );
        
        const lessons = await Promise.all(lessonPromises);
        
        // Filter out any failed loads
        const validLessons = lessons.filter(lesson => lesson !== null);
        
        if (validLessons.length === 0) {
            throw new Error('No lessons could be loaded');
        }
        
        renderLessons(validLessons);

    } catch (error) {
        console.warn('Could not load lessons, using fallback data:', error);
        // Use fallback data if fetch fails (e.g., when opening file directly)
        renderLessons(fallbackLessons.lessons);
    }
}

// Create a lesson card element
function createLessonCard(lesson) {
    const card = document.createElement('a');
    card.className = 'lesson-card';
    card.setAttribute('data-category', lesson.category);
    card.href = `lesson.html?slug=${lesson.slug || lesson.id}`;

    const tagClass = categoryClassMap[lesson.category] || 'technical-tag';
    const tagText = categoryMap[lesson.category] || lesson.category;

    card.innerHTML = `
        <div class="card-header">
            <h3 class="lesson-title">${escapeHtml(lesson.title)}</h3>
            <span class="tag ${tagClass}">${escapeHtml(tagText)}</span>
        </div>
        <p class="lesson-description">${escapeHtml(lesson.description)}</p>
        <div class="card-footer">
            <span class="duration">⏱ ${escapeHtml(lesson.duration)}</span>
        </div>
    `;

    return card;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lessonCards = document.querySelectorAll('.lesson-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter cards
            lessonCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Load lessons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadLessons();
});