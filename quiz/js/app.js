console.log(json)

const userAnswers = {}
// let currentIndex = 0;        // 0-11, which question
// let currentStage = 'question'; // 'question' or 'info'


async function addingJson() {
  const mainWrap = document.querySelector(".quiz-wrap")
    const quizWrap = document.querySelector(".quiz-item-wrap");
    json.forEach(item => {
        const mainContainer = document.createElement('div');
        mainContainer.className = "quiz-item"

        //html
        const html = `
                <div class="quiz-ques">${item.id}) ${item.label}</div>
                <div class="quiz-ques">${item.question}</div>
                <div class="quiz-butn-wrap">
                    ${item.options.map(option => 
                        `<label>
                            <input type="radio"
                            name="q${item.id}"
                            value="${option.id}"
                            />
                            ${option.text}
                        </label>`
                    ).join("")}
                </div>
                <div class="quiz-butn-wrap is--arrow">
                    <button type="button" class="quiz-arrow-butn prev-butn is--disabled">Prev</button>
                    <button type="button" class="quiz-arrow-butn next-butn is--disabled">Next</button>
                </div>
                <div class="quiz-info-card">
                    <p>All of our teams are transforming the future of grocery deliveries and making sure everyday moments flow. Whether you prefer to be based in one site – so might be more suitable for one of our warehouse roles or more suited to powering one of our zippy bikes or purple vans - there’s a hometown hero role for you within Ocado Logistics. Let’s try and narrow that down!</p>
                </div>
        `

         mainContainer.insertAdjacentHTML('beforeend', html)           
        quizWrap.appendChild(mainContainer)


    })

    const revealContainer = document.createElement('div');
        revealContainer.className = "quiz-reveal-item"
    const revealHtml = `
        <div class="quiz-reveal-cat" category="customerService"></div>
        <div class="quiz-reveal-cat" category="LGV"></div>
        <div class="quiz-reveal-cat" category="warehouse"></div>
        <div class="quiz-reveal-cat" category="headOffice"></div>
    `

    revealContainer.insertAdjacentHTML('beforeend', revealHtml)
    mainWrap.appendChild(revealContainer)   

}

function saveAnswer(questionId) {
    const selected = document.querySelector(`input[name"q${questionId}"]:checked`);

    if(!selected) return false;

    userAnswers[questionId] = selected.value;

    return true;
}

function calculateResults() {
  const scores = {
    customerService: 0,
    LGV: 0,
    warehouse: 0,
    headOffice: 0,
  };

  json.forEach((question) => {

    const selected = document.querySelector(
            `input[name="q${question.id}"]:checked`
        );
    const answer = userAnswers[question.id];

    if (!selected) return;

    const selectedOption = question.options.find((option) => {
      return option.id === selected.value;
    });

    Object.entries(selectedOption.scores).forEach(([category, points]) => {
      scores[category] += points;
    });
  });


  //Adding to the revealItem
  const revealParent = document.querySelector(".quiz-reveal-item")
  const revealCat = document.querySelectorAll('.quiz-reveal-cat');
  revealCat.forEach(cat => {
    const category = cat.getAttribute('category');
    cat.innerHTML = `
        <h3>${category}</h3>
        <p>${scores[category] ?? 0}</p>
    `;
  })

  if(revealParent) revealParent.classList.add('is--active')

  return scores;
}

async function mainFunc() {
    await addingJson()
    sliderFunc()
}

function sliderFunc() {
    const quizItemWrap = document.querySelector(".quiz-item-wrap");
    const tabPane = quizItemWrap.querySelectorAll(".quiz-item");
    const introCard = document.querySelector('.intro-item')
    const introButn = introCard.querySelector("#intro-butn")


    //##1 Initially prev and next button will be disabled if radio button are not selected
    //##2 If radio selected then removed the disable button
    //##3 On next button check if quiz-info card include "is--active" class if no then add. If Yes then go to the next question

    let currentIndex = 0;
    const duration = 300;
    let isAnimating = false;

    function handleIndexChange(newIndex) {
      if (isAnimating || newIndex === currentIndex) return;
      isAnimating = true;
      const current = tabPane[currentIndex];

      // Fade out current
      current.style.opacity = "0";
      //tab Panes
      setTimeout(() => {
        current.style.display = "none";

        // 👇 directly using tabPane[newIndex]
        tabPane[newIndex].style.display = "flex";

        tabPane[newIndex].offsetHeight;

        tabPane[newIndex].style.opacity = "1";

        setTimeout(() => {
          isAnimating = false;
        }, duration);
      }, duration);
      currentIndex = newIndex;
    }

    //Initial Intro butn click
    introButn.addEventListener('click', () => {
        introCard.classList.remove('is--active');
        quizItemWrap.classList.add('is--active')
    })


    //Next and previous button function
    tabPane.forEach((pane, i) => {
      const nextButn = pane.querySelector(".quiz-arrow-butn.next-butn");
      const prevButn = pane.querySelector(".quiz-arrow-butn.prev-butn");
      const infoCard = pane.querySelector(".quiz-info-card");
      const optionButns = pane.querySelectorAll('input[type="radio"]');

      //Change butn class based on tapping on radio buttons
      optionButns.forEach((radio) => {
        radio.addEventListener("change", () => {
          nextButn.classList.remove("is--disabled");
        });
      });

    //Hide last tab next button
    if(i === tabPane.length -1) {
        nextButn.classList.add('is--hide')
    }

      //Next Butn click
      nextButn.addEventListener("click", () => {
        if (!infoCard.classList.contains("is--active")) {
          infoCard.classList.add("is--active");
        } else {
          if (currentIndex < tabPane.length - 1) {
            handleIndexChange(currentIndex + 1);
          } else if (currentIndex === tabPane.length) {

          }
        }
      });
    });

  // 👉 Init first slide
  tabPane.forEach((pane, i) => {
    pane.style.display = i === 0 ? "flex" : "none";
    pane.style.opacity = i === 0 ? "1" : "0";
  });


  //Adding Submit button & Function
    const submitButnDiv = document.createElement('button');
    submitButnDiv.className = 'quiz-submit-button';
    submitButnDiv.innerHTML = 'Submit butn'
    const butnWrap = tabPane[tabPane.length - 1].querySelector(".quiz-butn-wrap.is--arrow")

    butnWrap.appendChild(submitButnDiv)

    const submitButn = document.querySelector('.quiz-submit-button');
    submitButn.addEventListener("click", () => {
    const results = calculateResults();
    console.log(results);
    quizItemWrap.classList.remove('is--active')
    });

}

mainFunc()
