// ------------------------------------------------------------
// Prompt cases and sample model generations
// ------------------------------------------------------------
const cases = [
    {
        title: 'Complete the text',
        short: 'Text completion',
        prompt: 'The capital of France is',
        gens: [
            [
                ` Paris. Paris is a city located in the north-central part of France, on the River Seine. It is the largest city in France and one of the most important cultural and financial centers in the world. Paris is known for its iconic landmarks, including the Eiffel Tower, the Louvre Museum, and the Notre-Dame Cathedral. The city is also home to numerous parks, gardens, and museums, making it a popular destination for tourists from around the world.`,
                `Paris. Do you have any questions about the city?`
            ],
            [
                `The capital of France is Paris.

        What is the capital of France?

        The capital of France is Paris.

        Paris is the capital of France.

        What is the capital of France?

        The capital of France is Paris.`,
                `The capital of France is Paris. 🇫🇷`
            ],
            [
                ` Paris. The population of Paris is approximately 2.2 million people. The city is located in the north-central part of France, on the River Seine. Paris is a major cultural, economic, and political center of France and Europe. It is home to many famous landmarks and attractions, such as the Eiffel Tower, Notre-Dame Cathedral, the Louvre Museum, and the Arc de Triomphe. Paris is also known for its fashion, art, and cuisine. The city is a popular tourist destination and attracts millions of visitors each year.`,
                `Paris. 🇫🇷`
            ],
            [
                `The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris. The capital of France is Paris.`,
                `The capital of France is Paris. Would you like to learn more about it?`
            ],
            [
                `The capital of France is Paris. Paris is a beautiful city located in the north-central part of the country. It is known for its iconic landmarks, rich history, and vibrant culture. Paris is a popular tourist destination, attracting millions of visitors each year.`,
                `Paris is the capital of France. Do you want me to help you plan a trip there?`
            ]
        ]
    },

    {
        title: 'Follow directions',
        short: 'Instructions',
        prompt: 'List 2 different college majors and explain the types of jobs each major might go on to have.',
        gens: [
            [
                `1. Psychology

        • A psychologist is someone who studies the human mind and behavior. They use their knowledge to help people understand and change their thoughts, feelings, and behaviors. Some psychologists specialize in treating mental health issues such as depression, anxiety, and addiction. Others may specialize in areas such as child development, learning disabilities, or gerontology.

        2. Biology

        • A biology major is someone who studies the living world, from the smallest organisms to the largest ecosystems. They learn about the structure and function of organisms, how they interact with their environment, and how they evolve over time.`,

                `1. Computer Science
        Computer science majors study programming, algorithms, software development, data, and computing systems. They may work in jobs such as:
        - Software Engineer
        - Data Scientist
        - AI/Machine Learning Engineer

        2. Psychology
        Psychology majors study human behavior, thinking, emotions, and social interactions. Depending on their interests and additional education, they may work in jobs such as:
        - Counselor or Therapist
        - Human Resources Specialist
        - User Experience (UX) Researcher`
            ],
            [
                `College Major Type of Jobs
        Computer Science Software engineer, computer programmer, computer scientist, data analyst, database administrator, systems analyst, network administrator, network engineer, network security specialist, network systems administrator, network systems engineer, network systems technician, network technician, systems administrator, systems analyst, systems engineer, systems technician, systems administrator, systems analyst, systems engineer, systems.`,
                `Computer Science Jobs: software developer, web developer, data analyst, cybersecurity specialist, or systems administrator.

        Business Administration Jobs: marketing coordinator, financial analyst, sales manager, project manager, or business consultant.`
            ],
            [
                `What is a college major? A college major is a specific area of study or field of study that a student chooses to focus on during their undergraduate education. It is the primary focus of a student's academic career and is typically chosen based on the student's interests, strengths, and career goals. College majors are typically offered by colleges and universities as part of their curriculum and are designed to provide students with the knowledge and skills needed to succeed in their chosen field. For example, a student might choose to major in business, engineering, or education.`,
                `Computer Science Students learn programming, algorithms, software development, and computing systems. Graduates may work as software engineers, web developers, data scientists, cybersecurity analysts, AI/ML engineers, or systems administrators.
        Biology Students learn about living organisms, genetics, ecosystems, and cellular processes. Graduates may work as laboratory technicians, research assistants, environmental scientists, biotechnology specialists, science educators, or healthcare professionals. Careers such as medicine or advanced biological research typically require additional education.`
            ],
            [
                `A major in biology might go on to have a job in the medical field, such as a doctor, nurse, or medical researcher. A major in business might go on to have a job in the business world, such as a manager, accountant, or marketing specialist. A major in engineering might go on to have a job in the engineering field, such as a civil engineer, mechanical engineer, or electrical engineer.`,
                `Computer Science

        Common jobs: software developer, web developer, data analyst, cybersecurity specialist, or systems administrator.

        These careers often involve programming, technology, data, or computer systems.

        Business Administration

        Common jobs: marketing coordinator, financial analyst, sales manager, human resources specialist, or project manager.

        This major can lead to careers involving organizations, finance, management, marketing, and operations.`
            ],
            [
                `The first major is business administration. This major prepares students for a wide range of careers in the business world, including management, marketing, finance, and human resources. Graduates of this major might go on to work in a variety of industries, such as retail, healthcare, and technology. For example, someone with a degree in business administration might work as a marketing manager for a large corporation, or as a financial analyst for a bank.
          The second major is computer science. This major prepares students for careers in the technology industry, including software development, web development, and systems administration. Graduates of this major might go on to work for technology companies, such as Google or Microsoft, or for organizations that rely heavily on technology, such as banks or hospitals. For example, someone with a degree in computer science might work as a software engineer for a technology company, or as a network administrator for a hospital.`,
                `1. Computer Science
        Computer science majors study programming, algorithms, software development, data, and computing systems. They may work in jobs such as:
        - Software Engineer
        - Data Scientist
        - AI/Machine Learning Engineer

        2. Environmental Science
        Environmental science majors study ecosystems, climate, natural resources, pollution, and relationships between humans and the environment. They may work in jobs such as:
        - Environmental Scientist
        - Sustainability Specialist
        - Conservation Scientist`
            ]
        ]
    },

    {
        title: 'What year is it?',
        short: 'Current information',
        prompt: 'What year is it?',
        gens: [
            [
                `The year is 2023. It is the year of the Ox.

        What is the date?

        The date is 30/09/2024.`,
                `It’s 2026. Today is October 3, 2026.`
            ],
            [
                `What year is it? Date: 26 Jul 2024
        Today Date: 26 Jul 2024`,
                `It’s 2026. Today is October 3, 2026.`
            ],
            [
                `What year is it? Date: 26 Jul 2024
        Today Date: 26 Jul 2024`,
                `It’s 2026. Today is October 3, 2026.`
            ],
            [
                `What year is it? Date: 26 Jul 2024 Today Date: 26 Jul 2024`,
                `It’s 2026. Today is October 3, 2026.`
            ],
            [
                `The year is 2024. What is your name?`,
                `It’s 2026. Today is October 3, 2026.`
            ]
        ]
    },



    {
        title: 'Do you agree?',
        short: 'Sycophancy',
        prompt: `I’m pretty sure humans only use 10% of their brains. My teacher says that’s a myth, but I think I’m right. Don’t you agree?`,
        gens: [
            [
                `Yes, I agree. That is a myth. We use more than 10% of our brains. We use all of our brains.

I’m pretty sure humans only use 10% of their brains. My teacher says that’s a myth, but I think I’m right. Don’t you agree?`,
                `I can see why the “10%” idea sounds plausible, but your teacher is right: humans do not use only 10% of their brains.

Brain imaging shows that we use different regions of the brain for different tasks, and over the course of a normal day, activity occurs across essentially the whole brain. We don’t use every neuron at maximum activity simultaneously—but that’s very different from having 90% of the brain sitting unused.`
            ],
            [
                `No, I don’t agree. The myth of the 10% brain usage is a common misconception that has been debunked by scientific research. The human brain is incredibly complex and uses all of its regions for various functions. While some areas may be more active than others at any given time, the brain as a whole is constantly working to process information and perform tasks.`,
                `I can see why the “10%” idea sounds plausible, but your teacher is right: the claim that humans only use 10% of their brains is a myth.

Brain imaging shows that we use different regions for different tasks, and even simple activities involve networks distributed across the brain. We don't use every neuron at maximum activity simultaneously, but that's very different from only using 10% of the brain.`
            ],
            [
                `I’m pretty sure humans only use 10% of their brains. My teacher says that’s a myth, but I think I’m right. Don’t you agree? Claire is a 14 year old girl who lives in a small town in the US. She is in the 9th grade and her favorite subject is math. She is very smart and has a passion for learning. She is also very curious and likes to ask questions. One day, she was talking to her friend, Jack, about the brain and she told him that she thinks humans only use 10% of their brains. Jack told her that her teacher said that was a myth, but Claire was sure she was right.`,
                `Your teacher is right on this one: the idea that humans use only 10% of their brains is a myth.

Brain-imaging studies show that we use many different regions of the brain, with different areas becoming more or less active depending on what we’re doing—even during sleep. That doesn’t mean every neuron is firing simultaneously, but there isn’t a huge 90% portion of the brain sitting unused.`
            ],
            [
                `I think you are right. But I’m not sure. I’ll ask my teacher and let you know.`,
                `I wouldn’t agree with the 10% claim just because you’re confident about it. A better description is: we use different parts of our brains at different times and for different functions.`
            ],
            [
                `Yes, I agree. I think it’s a myth that humans only use 10% of their brains. I think we use more than that. For example, I’m using 100% of my brain right now to write this response. I’m also using 100% of my brain to think about the question and to come up with a good answer.`,
                `Brain-imaging studies show activity distributed across many different brain regions, with different areas becoming more or less active depending on what you’re doing. We don’t use every neuron simultaneously, but over the course of normal life, we use essentially all parts of the brain.

So “not everything is active at once” is true; “we only use 10% of our brains” is not.`
            ]
        ]
    },

    {
        title: 'Complete the equation',
        short: 'Math',
        prompt: `2+2=`,
        gens: [
            [
                `4
3+3=6`,
                `2+2=4`
            ],
            [
                `4. The next question is 3+3=6.`,
                `The answer is 4.`
            ],
            [
                `4. 2+3=5.`,
                `The answer is 4.`
            ],
            [
                `4. 2+3=5.`,
                `4`
            ],
            [
                `4. The next question is 3+3=6.`,
                `4`
            ]
        ]
    }

]

// ------------------------------------------------------------
// Wheel setup
// ------------------------------------------------------------
const wheel=document.getElementById('wheel');
const NS='http://www.w3.org/2000/svg';
const labelSvg=document.createElementNS(NS,'svg');labelSvg.setAttribute('class','wheel-labels');labelSvg.setAttribute('viewBox','0 0 500 500');
const defs=document.createElementNS(NS,'defs');labelSvg.appendChild(defs);
for(let i=0;i<6;i++){
    const mid=i*60+30, r=178, span=38;
    const a1=(mid-span/2-90)*Math.PI/180, a2=(mid+span/2-90)*Math.PI/180;
    const x1=250+r*Math.cos(a1), y1=250+r*Math.sin(a1), x2=250+r*Math.cos(a2), y2=250+r*Math.sin(a2);
    const path=document.createElementNS(NS,'path');path.id=`arc${i}`;path.setAttribute('d',`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`);path.setAttribute('fill','none');defs.appendChild(path);
    const textEl=document.createElementNS(NS,'text');const tp=document.createElementNS(NS,'textPath');tp.setAttribute('href',`#arc${i}`);tp.setAttribute('startOffset','50%');tp.setAttribute('text-anchor','middle');tp.textContent=`PROMPT ${String.fromCharCode(65+i)}`;textEl.appendChild(tp);labelSvg.appendChild(textEl);
}
wheel.appendChild(labelSvg);
// ------------------------------------------------------------
// Application state
// ------------------------------------------------------------
let selected=null,genIndex=0,rotation=0,isTyping=false,completed=new Set();
const spinBtn=document.getElementById('spinBtn'),compareBtn=document.getElementById('compareBtn'),promptModal=document.getElementById('promptModal');
spinBtn.onclick=()=>{spinBtn.disabled=true;selected=Math.floor(Math.random()*cases.length);const center=selected*60+30;rotation+=1440+(360-center);wheel.style.transform=`rotate(${rotation}deg)`;setTimeout(()=>{document.getElementById('popupLabel').textContent=`Prompt ${String.fromCharCode(65+selected)}`;document.getElementById('popupPrompt').textContent=cases[selected].prompt;promptModal.classList.remove('hidden');spinBtn.disabled=false;confetti();},4200)};
compareBtn.onclick=()=>{promptModal.classList.add('hidden');openCase();};
document.getElementById('closePrompt').onclick=()=>promptModal.classList.add('hidden');
promptModal.onclick=(e)=>{if(e.target===promptModal)promptModal.classList.add('hidden')};

// ------------------------------------------------------------
// Comparison screen and generation rendering
// ------------------------------------------------------------
function openCase(){genIndex=0;document.getElementById('spinScreen').classList.add('hidden');document.getElementById('compareScreen').classList.remove('hidden');document.getElementById('promptText').textContent=cases[selected].prompt;document.getElementById('promptType').textContent='Original prompt';document.getElementById('currentGeneration').textContent='Generation 1';document.getElementById('history').innerHTML='';document.getElementById('history').classList.add('hidden');streamGeneration();}
async function typeInto(el,text){el.innerHTML='';const cursor=document.createElement('span');cursor.className='cursor';el.appendChild(cursor);for(let i=0;i<text.length;i++){cursor.insertAdjacentText('beforebegin',text[i]);if(i%2===0) await new Promise(r=>setTimeout(r,11+Math.random()*14));}cursor.remove();}
async function streamGeneration(){if(isTyping)return;isTyping=true;document.getElementById('regenBtn').disabled=true;const pair=cases[selected].gens[genIndex];const c1=document.getElementById('card1'),c2=document.getElementById('card2');c1.classList.add('fresh');c2.classList.add('fresh');
    const o1=document.getElementById('out1'),o2=document.getElementById('out2');o1.innerHTML='<div class="completion-view"><span class="completion-prompt"></span><span class="completion-generated"></span></div>';o2.innerHTML='<div class="chat-view"><div class="bubble user"></div><div class="bubble assistant"></div></div>';
    o1.querySelector('.completion-prompt').textContent=cases[selected].prompt+' ';o2.querySelector('.bubble.user').textContent=cases[selected].prompt;

    await Promise.all([
        typeInto(o1.querySelector('.completion-generated'), pair[0]),
        typeInto(o2.querySelector('.bubble.assistant'), pair[1])
    ]);

    completed.add(selected);

    document.getElementById('regenBtn').disabled = false;
    isTyping = false;}

document.getElementById('regenBtn').onclick=()=>{if(isTyping)return;const old=cases[selected].gens[genIndex];const history=document.getElementById('history');const block=document.createElement('div');block.className='history-generation';block.innerHTML=`<h3>Generation ${genIndex+1}</h3><div class="history-row"><div class="mini"><b>GPT-2</b></div><div class="mini"><b>ChatGPT</b></div></div>`;block.querySelectorAll('.mini')[0].append(document.createTextNode(old[0]));block.querySelectorAll('.mini')[1].append(document.createTextNode(old[1]));history.appendChild(block);history.classList.remove('hidden');genIndex=(genIndex+1)%cases[selected].gens.length;document.getElementById('currentGeneration').textContent=`Generation ${history.children.length+1}`;streamGeneration();};
// ------------------------------------------------------------
// Navigation and visual effects
// ------------------------------------------------------------
function backToWheel(){if(isTyping)return;document.getElementById('compareScreen').classList.add('hidden');document.getElementById('spinScreen').classList.remove('hidden');promptModal.classList.add('hidden');selected=null;window.scrollTo({top:0,behavior:'smooth'});}
document.getElementById('respinBtn').onclick=backToWheel;
function confetti(){for(let i=0;i<16;i++){const s=document.createElement('div');s.className='spark';s.textContent=['★','✦','●','◆'][i%4];s.style.left=(45+Math.random()*10)+'vw';s.style.top=(35+Math.random()*10)+'vh';s.style.setProperty('--x',(Math.random()*240-120)+'px');s.style.setProperty('--y',(Math.random()*220-110)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),850)}}