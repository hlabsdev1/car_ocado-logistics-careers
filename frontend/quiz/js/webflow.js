console.log(json);

const userAnswers = {};

async function addingJson() {
  const mainWrap = document.querySelector(".sec-wrap.is--quiz");
  const quizWrap = document.querySelector(".quiz_item-wrap");
  json.forEach((item) => {
    const mainContainer = document.createElement("div");
    mainContainer.className = "quiz_item";

    //html
      const html = `
  <div class="sec-bg is--home-hero">
    <div class="hero-bg_img">
      <img class="image" src="https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG.webp" alt="" sizes="(max-width: 2881px) 100vw, 2881px" loading="eager" fetchpriority="high" srcset="https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG-p-500.webp 500w, https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG-p-800.webp 800w, https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG-p-1080.webp 1080w, https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG-p-1600.webp 1600w, https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG-p-2000.webp 2000w, https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG-p-2600.webp 2600w, https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a5f910829707f9728bf13f3_BG.webp 2881w">
    </div>
  </div>
  <div class="quiz_item-content">
    <div class="quiz_item-c-inner">
      <div quiz-result-on="" class="quiz_intro-c-top">
        <div class="quiz_item-c-top-col1">
          <div class="pill-content">
            <div class="label-40px" text-content-div="">${item.id}/${json.length}</div>
          </div>
          <div pill="hero1">
            <div class="text-h1" aria-label="On the go">
              <div class="line">${item.label}</div>
            </div>
          </div>
        </div>
        <div class="quiz_item-c-top-col1">
          <div class="text-20px" text-content-div="">${item.question}</div>
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
        <div class="quiz_item-result">
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
    <div class="quiz_item-circle"></div>
  </div>
    `;

    mainContainer.insertAdjacentHTML("beforeend", html);
    quizWrap.appendChild(mainContainer);
  });

  const revealContainer = document.createElement("div");
  revealContainer.className = "quiz-reveal-item";
  const revealHtml = `
        <div class="quiz-reveal-cat" category="customerService"></div>
        // <div class="quiz-reveal-cat" category="LGV"></div>
        // <div class="quiz-reveal-cat" category="warehouse"></div>
        // <div class="quiz-reveal-cat" category="headOffice"></div>
    `;

  revealContainer.insertAdjacentHTML("beforeend", revealHtml);
  mainWrap.appendChild(revealContainer);
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

  const revealParent = document.querySelector(".quiz-reveal-item");
  const revealCat = document.querySelector(".quiz-reveal-cat");

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
    revealParent.innerHTML = `
    <h3>No suitable role found</h3>
    <p>Unfortunately none of our categories matched your answers.</p>
          ${
            eliminatedCategories.length
              ? `
        <h4>Eliminated Categories</h4>
        <ul>
          ${eliminatedCategories
            .map((category) => `<li>${category}</li>`)
            .join("")}
        </ul>
      `
              : ""
          }
  `;

    revealParent.classList.add("is--active");
    return scores;
  }

  // Find the highest score among valid categories
const highestScore = Math.max(
  ...validCategories.map(category => scores[category])
);


  // const winningCategory = validCategories.reduce((a, b) =>
  //   scores[a] > scores[b] ? a : b,
  // );

  const winningCategories = validCategories.filter(
  category => scores[category] === highestScore
);


  revealParent.innerHTML = `
    ${winningCategories.map(category =>`
      <div class="quiz-result">
      <h3>${category}</h3>
      <p>${scores[category]}</p>
      <p>${messages[category]}</p>
    </div>
      `).join("")}
    ${
      eliminatedCategories.length
              ? `
        <h4>Eliminated Categories</h4>
        <ul>
          ${eliminatedCategories
            .map((category) => `<li>${category}</li>`)
            .join("")}
        </ul>
      `
              : ""
          }
  `

  if (revealParent) revealParent.classList.add("is--active");

  return scores;
}

function sliderFunc() {
    const quizItemWrap = document.querySelector(".quiz_item-wrap");
    const tabPane = quizItemWrap.querySelectorAll(".quiz_item");
    const introCard = document.querySelector('.quiz_intro-item')
    const introButn = introCard.querySelector(".button")


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
    const butnWrap = tabPane[tabPane.length - 1].querySelector(".quiz_item-arrow-wrap")

    butnWrap.appendChild(submitButnDiv)

    const submitButn = document.querySelector('.quiz-submit-button');
    submitButn.addEventListener("click", () => {
    const results = calculateResults();
    console.log(results);
    quizItemWrap.classList.remove('is--active')
    });

}

async function mainFunc() {
  await addingJson();
  sliderFunc()
}

mainFunc();
