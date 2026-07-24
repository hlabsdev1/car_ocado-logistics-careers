console.log(json);

const userAnswers = {};

async function addingJson() {
  const mainWrap = document.querySelector(".sec-wrap.is--quiz");
  const quizWrap = document.querySelector(".quiz_item-wrap .quiz_item-content");
  json.forEach((item) => {
    const mainContainer = document.createElement("div");
    mainContainer.className = "quiz_item-change";

    //html
      const html = `
    <div class="quiz_item-c-inner">
      <div quiz-result-on="" class="quiz_intro-c-top">
        <div class="quiz_item-c-top-col1">
          <div class="pill-content">
            <div class="label-40px">${item.id}/${json.length}</div>
          </div>
          <div class="quiz_iitem-h-pill" style="background-color: ${item.styleVariants.color}; color: ${item.styleVariants.textColor}">
            <div class="text-h1" aria-label="On the go">
              ${item.label}
            </div>
          </div>
        </div>
        <div class="quiz_item-c-top-col1">
          <div class="text-20px">${item.question}</div>
        </div>
      </div>
      <div quiz-result-on="" class="quiz_radio-butn-wrap">
        ${item.options
                      .map(
                        (option) =>
                          `<label>
                            <input type="radio"
                            name="q${item.id}"
                            value="${option.id}"
                            />
                            ${option.text}
                        </label>`,
                      )
                      .join("")}
      </div>
      <div class="quiz_item-result-wrap">
        <div class="quiz_item-result" style="background-color: ${item.styleVariants.color}; color: ${item.styleVariants.textColor} ">
          <div class="text-25px" text-content-div="">All of our teams are transforming the future of grocery deliveries and making sure everyday moments flow. Whether you prefer to be based in one site – so might be more suitable for one of our warehouse roles or more suited to powering one of our zippy bikes or purple vans - there’s a hometown hero role for you within Ocado Logistics. Let’s try and narrow that down!</div>
        </div>
      </div>
    </div>
    <div class="quiz_item-arrow-wrap">
      <div class="quiz_item-arrow is--prev is--disabled">
        <img src="https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a6099de479f1133e183d05d_ocado-quiz-arrow.svg" loading="lazy" alt="" class="quiz_item-arrow-img is--prev">
      </div>
      <div class="quiz_item-arrow is--next is--disabled">
        <img src="https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a6099de479f1133e183d05d_ocado-quiz-arrow.svg" loading="lazy" alt="" class="quiz_item-arrow-img">
      </div>
    </div>
    `;

    mainContainer.insertAdjacentHTML("beforeend", html);
    quizWrap.appendChild(mainContainer);
  });
}

function saveAnswer(questionId) {
    const selected = document.querySelector(`input[name"q${questionId}"]:checked`);

    if(!selected) return false;

    userAnswers[questionId] = selected.value;

    return true;
}

function calculateResults() {
  const revealParent = document.querySelector(".quiz-reveal-item");
  const revealContainer = document.querySelector(".quiz_item-final-result");
  const revealHeading = revealContainer.querySelector("[reveal-heading]");
  const revealPara = revealContainer.querySelector("[reveal-para]");
  const butn = revealContainer.querySelector(".button");
  const scores = {
    customerService: 0,
    headOffice: 0,
    warehouse: 0,
    LGV: 0,
  };
  const eliminate = {
    customerService: -1,
    headOffice: -1,
    warehouse: -1,
    LGV: -1,
  };

  const messages = {
    customerService: "Enter this button to see customer service links",
    headOffice: "Check out our head office opportunities below",
    warehouse: "Take a look at our warehouse roles here",
    LGV: "Take a look at our LGV roles here",
  };

  json.forEach((question) => {
    const selected = document.querySelector(
      `input[name="q${question.id}"]:checked`,
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

  // 2 edge cases
  // if score are positives and equal share both
  // if score is negative - don't show any jobs

  const validCategories = Object.keys(scores).filter(
    (category) => scores[category] >= 0,
  );

  const eliminatedCategories = Object.keys(scores).filter((category) => {
    return scores[category] <= eliminate[category];
  });

  // Edge case #2: Everything is eliminated-- Working...
  if (validCategories.length === 0) {
    revealHeading.innerHTML = 'No suitable role found';
    revealPara.innerHTML = 'Unfortunately none of our categories matched your answers.';
    return scores;
  }

  // Find the highest score among valid categories
const highestScore = Math.max(
  ...validCategories.map(category => scores[category])
);

  const winningCategories = validCategories.filter(
  category => scores[category] === highestScore
);

  console.log(winningCategories, winningCategories[0])

  if(winningCategories.length > 0) {
    if(winningCategories.length === 1) {
      revealHeading.innerHTML = winningCategories[0];
      revealPara.innerHTML = messages[winningCategories[0]];
    } else if (winningCategories.length === 2) {
      revealHeading.innerHTML = `${winningCategories[0]} & ${winningCategories[1]}`;
    }
  }

  return scores;
}

const progressPath = document.getElementById('quiz-progress');
const trackPath = document.getElementById('quiz-track');
const arcClipPath = document.querySelector('#arcClip path');
// const total = progressPath.getTotalLength();
// progressPath.style.strokeDasharray = total;
let total = 0;
let currentTime = 10;

// const variants = {
//   mobile:  "M2,205 Q350,-30 698,205",
//   tablet:  "M2,190 Q350,10 698,190",
//   desktop: "M2,178 Q350,28 698,178"
// };
const variants = {
  mobile:  { apex: -30, edgeY: 205 },
  tablet:  { apex: 10,  edgeY: 190 },
  desktop: { apex: 28,  edgeY: 178 }
};

function applyVariant(name, pct) {
  // const d = variants[name];
  const { apex, edgeY } = variants[name];
  // progress + track lines
  const lineD = `M2,${edgeY} Q350,${apex} 698,${edgeY}`;
  progressPath.setAttribute('d', lineD);
  trackPath.setAttribute('d', lineD);

  const clipEdgeY = edgeY - 8; // small offset so line peeks past banner edge
  arcClipPath.setAttribute('d', `M0,0 H700 V${clipEdgeY} Q350,${apex - 8} 0,${clipEdgeY} Z`);

  total = progressPath.getTotalLength();// different per curve!
  progressPath.style.strokeDasharray = total;
  progressPath.style.strokeDashoffset = total - (total * (pct / 100));
}

function render(pct) {
  currentTime = pct
  const drawn = total * (pct / 100);
  progressPath.style.strokeDashoffset = total - drawn;
}

// pick variant by breakpoint
const mq = window.matchMedia('(max-width: 480px)');
const mq2 = window.matchMedia('(max-width: 768px)');
function pickVariant() {
  return mq.matches ? 'mobile' : mq2.matches ? 'tablet' : 'desktop';
}
[mq, mq2].forEach(m => m.addEventListener('change', () => applyVariant(pickVariant(), currentTime)));
applyVariant(pickVariant(), currentTime);


function sliderFunc() {
    const quizItemWrap = document.querySelector(".quiz_item-wrap");
    const tabPane = quizItemWrap.querySelectorAll(".quiz_item-change"); //quiz_item
    const introCard = document.querySelector('.quiz_intro-item')
    const introButn = introCard.querySelector(".button");
    const quizJoinItem = document.querySelector(".quiz_join-item");
    const quizFinalResult = document.querySelector(".quiz_item-final-result");
    const showFinalResultButn = quizJoinItem.querySelector(".button")
    const quizItemBgImg = quizItemWrap.querySelector("#quiz-banner-image");
    console.log(quizItemBgImg)


    //##1 Initially prev and next button will be disabled if radio button are not selected
    //##2 If radio selected then removed the disable button
    //##3 On next button check if quiz-info card include "is--active" class if no then add. If Yes then go to the next question

    let currentIndex = 0;
    const duration = 300;
    let isAnimating = false;

    // let percentage = ((currentIndex + 1) / tabPane.length) * 100;
    // render(percentage);
    quizItemBgImg.setAttribute('href', `${json[currentIndex].styleVariants.image}`)

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
       // 👇 Update progress
      const percentage = ((currentIndex + 1) / tabPane.length) * 100;
      render(percentage);

      //set image
      quizItemBgImg.setAttribute('href', `${json[currentIndex].styleVariants.image}`)
    }

    //Initial Intro butn click
    introButn.addEventListener('click', () => {
        introCard.classList.remove('is--active');
        quizItemWrap.classList.add('is--active')
    })


    //Next and previous button function
    tabPane.forEach((pane, i) => {
      const nextButn = pane.querySelector(".quiz_item-arrow.is--next");
      const prevButn = pane.querySelector(".quiz_item-arrow.is--prev");
      const infoCard = pane.querySelector(".quiz_item-result-wrap");
      const optionButns = pane.querySelectorAll('input[type="radio"]');
      const quizInnerItems = pane.querySelectorAll('[quiz-result-on]')

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
          quizInnerItems.forEach(i => {
            i.classList.add('is--active')
          })
        } else {
          if (currentIndex < tabPane.length - 1) {
            handleIndexChange(currentIndex + 1);
          } else if (currentIndex === tabPane.length -1) {
            console.log('This is last')
            quizItemWrap.classList.remove('is--active')
            const finalResult = calculateResults();
            console.log(finalResult)
            quizJoinItem.classList.add('is--active')
          }
        }
      });
    });

  // 👉 Init first slide
  tabPane.forEach((pane, i) => {
    pane.style.display = i === 0 ? "flex" : "none";
    pane.style.opacity = i === 0 ? "1" : "0";
  });


    //Show Final result page
    showFinalResultButn.addEventListener('click', () => {
      quizJoinItem.classList.remove('is--active')
      quizFinalResult.classList.add('is--active')
    })

}

async function mainFunc() {
  await addingJson();
  sliderFunc()
}

mainFunc();
