// Variables for menu button in mobile view
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animateme');

// Event listener for menu button
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Year for copyright year
const currentYear = document.getElementById('currentyear');
currentYear.textContent = new Date().getFullYear();

// Date/Time for last modification for website
const lastModified = document.getElementById('lastModified');
lastModified.textContent = (document.lastModified);

// Array for courses
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Setting default behavior when page opens
displayCourseCards(courses);
displayCourseInfo(courses);


// Button to show all courses
const allCoursesButton = document.querySelector('#all');
allCoursesButton.addEventListener('click', () => {
    displayCourseCards(courses);
    displayCourseInfo(courses);
})

// Button to show CSE courses
const cseCoursesButton = document.querySelector('#cse');
cseCoursesButton.addEventListener('click', () => {
    displayCourseCards(courses.filter(course => course.subject == 'CSE'));
    displayCourseInfo(courses.filter(course => course.subject == 'CSE'));
})

// Button to show WDD courses
const wddCoursesButton = document.querySelector('#wdd');
wddCoursesButton.addEventListener('click', () => {
    displayCourseCards(courses.filter(course => course.subject == 'WDD'));
    displayCourseInfo(courses.filter(course => course.subject == 'WDD'));
})

const dialog = document.querySelector('dialog')
let courseDetails = document.querySelector('detail');

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id='closeModal'>X</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `

    dialog.showModal();

    closeModal.addEventListener('click', () => {
        dialog.close();
    });
}

// Function to make cards for web and computer programming certificate portion
function displayCourseCards(filteredClasses) {
    document.querySelector('#course-displays').innerHTML = "";
    filteredClasses.forEach(course => {
        let card = document.createElement("section");
        let name = document.createElement("h3");

        name.innerHTML = `${course.subject} ${course.number}`;

        if (course.completed == true) {
            card.setAttribute("id", "completed");
        }

        card.appendChild(name);

        card.addEventListener('click', () => {
            displayCourseDetails(course);
        })

        document.querySelector('#course-displays').appendChild(card);
    })
}

// Function to make list of courses and display credit counts as well as total credits
function displayCourseInfo(filteredClasses) {
    document.querySelector('#courses').innerHTML = "";
    document.querySelector('#credits').innerHTML = "";

    let credits = 0;

    let completedCredits = 0;

    filteredClasses.forEach(course => {
        let listItem = document.createElement("li");
        
        listItem.innerHTML = `${course.subject} ${course.number} - ${course.title}<br><span class="credit-list">${course.credits} credits`;

        credits += course.credits;

        if (course.completed == true) {
            completedCredits += course.credits;
        }

        document.querySelector('#courses').appendChild(listItem);
        
    })

    document.querySelector('#credits').innerHTML = `Total credits: ${credits}`;
    document.querySelector('#completed-credits').innerHTML = `Completed: ${completedCredits}`;
}

const currentTemp = document.querySelector("#current-temp");
const image = document.querySelector("#weather-icon");
const weatherConditions = document.querySelector("#conditions");

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=37.80&lon=-122.27&appid=499d17cb2fcb9bce311b043aee09342e&units=imperial'

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp} F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    image.setAttribute('src', iconsrc);
    image.setAttribute('alt', data.weather[0].description);
    image.setAttribute('loading', 'lazy');
    weatherConditions.innerHTML = `${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
}

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

apiFetch();