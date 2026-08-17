console.log(json);

const userAnswers = {};
const mobileWidth = window.innerWidth < 767;

async function addingJson() {
  const mainWrap = document.querySelector(".sec-wrap.is--quiz");
  const quizWrap = document.querySelector(".quiz_item-wrap .quiz_item-content");
  json.forEach((item) => {
    const mainContainer = document.createElement("div");
    mainContainer.className = "quiz_item-change";

    //html
    const html = `
    <div class="quiz_bg-svg is--inner"></div>
    <div class="quiz_item-c-inner">
      <div quiz-result-on="" class="quiz_intro-c-top">
        <div class="quiz_item-c-top-col1">
          <div class="pill-content">
            <div class="label-40px">${item.id}/${json.length}</div>
          </div>
          <div class="quiz_item-h-pill-wrap">
            <div class="text-h1">
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
          <div class="text-25px">${item.answer}</div>
        </div>
      </div>
      <div class="quiz_item-overlay"></div>
    </div>
    <div class="quiz_item-arrow-wrap">
      <div class="quiz_item-arrow is--prev is--disabled">
        <svg class="quiz_item-arrow-img is--prev" width="100%" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.40503 1.40503L7.45776 7.02542L1.40503 12.6458" stroke="#49C5B1" stroke-width="2.8102" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div>PREV</div>
      </div>
      <div class="quiz_item-arrow is--next is--disabled">
        <svg class="quiz_item-arrow-img" width="100%" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.40503 1.40503L7.45776 7.02542L1.40503 12.6458" stroke="#49C5B1" stroke-width="2.8102" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div>NEXT</div>
      </div>
    </div>
    `;

    mainContainer.insertAdjacentHTML("beforeend", html);
    quizWrap.appendChild(mainContainer);

    const pill = mainContainer.querySelector(".quiz_item-h-pill-wrap .text-h1");
  });
}

function saveAnswer(questionId) {
  const selected = document.querySelector(
    `input[name"q${questionId}"]:checked`,
  );

  if (!selected) return false;

  userAnswers[questionId] = selected.value;

  return true;
}

function calculateResults() {
  const revealParent = document.querySelector(".quiz-reveal-item");
  const revealContainer = document.querySelector(".quiz_item-final-result");
  const revealHeading = revealContainer.querySelector("[reveal-heading]");
  const revealPara = revealContainer.querySelector("[reveal-para]");
  const resultColumn = revealContainer.querySelector("#result-column");
  const butnWrap = revealContainer.querySelector(
    ".quiz_final-result-butn-wrap",
  );
  const butn = butnWrap.querySelector(".button");
  const quizItemVisual = revealContainer.querySelector(
    ".quiz_item-visual-wrap",
  );
  const imgWrapper = revealContainer.querySelector(
    ".quiz_item-result-sum-img-wrap",
  );
  const quizMedal = revealContainer.querySelector(".quiz_medal-img");
  const topPillWrap = revealContainer.querySelector("#quiz-result-top");
  console.log(topPillWrap);
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
    customerService: {
      title: "Customer Delivery",
      link: "/team-categories/customer-delivery",
      para: `Your answers showed that you have some of the ingredients we require for our Customer Service Team Members or Zoom Last Mile Riders.You’ll help make mealtimes go smoothly by delivering groceries bang on time. Along the way, you’ll provide the great service that puts a smile on our customers’ faces. It’s no mean feat as, while their vans are loaded for them, they need tenacity and peak physical fitness to make all the deliveries in their shift safely, climb stairs with heavy bags, or trouble shoot when the traffic’s bad. And they do all of this without compromising the excellent customer service they pride themselves on.`,
      butnTxt: "CSTM",
      videoURL: "https://youtu.be/mM_JCzkgmcQ",
      imgURL:
        "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a7f07a0cd45378caa70d8e0_img1.webp",
    },

    headOffice: {
      title: "Head Office",
      link: "/team-categories/head-office",
      para: `Your answers show you enjoy routine, being based in one location and working office hours, so you might be suited to a role in our Head Office. These noble navigators guide Ocado Logistics to success. Whether that’s in organisational design, our communications teams, finance, marketing or HR, the resilient team work together to keep us all safe and efficient.`,
      butnTxt: "Head Office",
      videoURL: "https://youtu.be/mM_JCzkgmcQ",
      imgURL:
        "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a7f07a0a75897d18f3a27a1_img4.webp",
    },

    warehouse: {
      title: "Warehouse",
      link: "/team-categories/warehouse-roles",
      para: `Our warehouse crew are our beating heart. While everyone works shifts, they are based at the site nearest to them. If you’re over 18, happy handling all products and working quickly then this could be perfect for you. The shifts can be long, which requires top physical fitness, whichever area of the warehouse you’re in. You might be picking and packing alongside our robots, receiving inbound products for loading into our state-of-the-art hive, or in despatch - loading the customer delivery vans. We’re all one team, humans and robots working together to ensure customers’ groceries leave on time and in peak condition.`,
      butnTxt: "Warehouse",
      videoURL: "https://youtu.be/mM_JCzkgmcQ",
      imgURL:
        "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a7f07a09b209dc16f92762b_img3.webp",
    },

    LGV: {
      title: "LGV Drivers",
      link: "/team-categories/lgv-drivers",
      para: `Our LGV drivers are world class – fast paced, able to back into a narrow bay in under 5 minutes, they move seamlessly between our state-of-the-art automated warehouses and distribution sites. They’re our heroes steering our largest vehicles round pre-planned routes. Your answers show us that if you have the relevant category C+E licence, you could help us keep our automated supply chain moving 24/7, getting to know each site in detail and taking the responsibility to deliver groceries to the right hub in time for customers’ deliveries.`,
      butnTxt: "LGV",
      videoURL: "https://youtu.be/mM_JCzkgmcQ",
      imgURL:
        "https://cdn.prod.website-files.com/691db317d5523108e489fad8/6a7f07a0cc8d908db6cf4d35_img2.webp",
    },
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
    revealHeading.innerHTML = "No roles available right now";
    revealPara.innerHTML = `Ahh, it looks like we don’t have an open role matching your results right now! But don't worry, our teams are constantly growing. Keep an eye on our careers page or check back soon to see when your perfect match pops up.`;
    //clone the butn
    const clonebutn = butn.cloneNode(true);
    const link = clonebutn.querySelector("a");
    const butnTxt = clonebutn.querySelector(".button-txt");
    link.href = "/";
    link.textContent = `Explore website`;
    butnTxt.textContent = `Explore website`;
    butnWrap.append(clonebutn);
    butn.remove();
    const cloneButnWrap = butnWrap.cloneNode(true);
    quizItemVisual.appendChild(cloneButnWrap);
    resultColumn.classList.add("is--nojobs");
    topPillWrap.classList.add("is--norole");
    return scores;
  }

  // Find the highest score among valid categories
  const highestScore = Math.max(
    ...validCategories.map((category) => scores[category]),
  );

  const winningCategories = validCategories.filter(
    (category) => scores[category] === highestScore,
  );

  // console.log(winningCategories, winningCategories[0])

  function addingImages(winCat) {
    const imgElement = document.createElement("img");
    imgElement.className = "quiz_item-result-img";
    imgElement.src = winCat.imgURL;

    imgWrapper.append(imgElement);
  }

  if (winningCategories.length > 0) {
    resultColumn.classList.add("is--jobs");
    if (winningCategories.length === 1) {
      revealHeading.innerHTML = messages[winningCategories[0]].title;
      revealPara.innerHTML = messages[winningCategories[0]].para;

      //clone the butn
      const clonebutn = butn.cloneNode(true);
      const link = clonebutn.querySelector("a");
      const butnTxt = clonebutn.querySelector(".button-txt");
      link.href = messages[winningCategories[0]].link;
      link.textContent = `Explore ${messages[winningCategories[0]].butnTxt} roles`;
      butnTxt.textContent = `Explore ${messages[winningCategories[0]].butnTxt} roles`;
      butnWrap.append(clonebutn);
      butn.remove();
      const cloneButnWrap = butnWrap.cloneNode(true);
      quizItemVisual.appendChild(cloneButnWrap);
      addingImages(messages[winningCategories[0]]);
      quizMedal.style.opacity = "1";
    } else if (winningCategories.length === 2) {
      revealHeading.innerHTML = `You’ve got two great matches!`;
      // `${winningCategories[0]} & ${winningCategories[1]}`;
      revealPara.innerHTML = `Based on your answers, we think you could be a great fit for more than one role. Take a look at both options and see which one feels right for you.`;

      winningCategories.forEach((winCat) => {
        const clonebutn = butn.cloneNode(true);
        const link = clonebutn.querySelector("a");
        const butnTxt = clonebutn.querySelector(".button-txt");
        link.href = messages[winCat].link;
        link.textContent = `Explore ${messages[winCat].butnTxt} roles`;
        butnTxt.textContent = `Explore ${messages[winCat].butnTxt} roles`;
        butnWrap.append(clonebutn);
        addingImages(messages[winCat]);
      });
      butn.remove();
      const cloneButnWrap = butnWrap.cloneNode(true);
      quizItemVisual.appendChild(cloneButnWrap);
    }
  }

  // console.log(scores);

  return scores;
}

function finalRevealSplit() {
  const revealContainer = document.querySelector(".quiz_item-final-result");
  const pill = revealContainer.querySelector("[reveal-heading]");
  const pillWrap = revealContainer.querySelector(".pill-quiz");
  // console.log(pill, pillWrap);

  if (!pill || pill.dataset.split) return;

  const split = SplitText.create(pill, {
    type: "lines",
    linesClass: "quiz_item-h-pill",
  });

  split.lines.forEach((line) => {
    line.style.backgroundColor = "var(--_palette---purple)";
    line.style.color = "var(--_palette---white)";
    line.style.display = "inline-block";
  });

  pill.dataset.split = "true";
  pillWrap.style.padding = "0rem";
}

const progressPath = document.getElementById("quiz-progress");
const trackPath = document.getElementById("quiz-track");
const arcClipPath = document.querySelector("#arcClip path");
const total = progressPath.getTotalLength();
progressPath.style.strokeDasharray = total;

function render(pct) {
  progressPath.style.strokeDashoffset = total * (1 - pct / 100);
}

function scrollTop() {
  if (mobileWidth) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

function splitPill(panel, item) {
  const pill = panel.querySelector(".text-h1");
  const pillWrap = panel.querySelector(".quiz_item-h-pill-wrap");
  // console.log(panel, pillWrap)

  if (!pill || pill.dataset.split) return;

  const split = SplitText.create(pill, {
    type: "lines",
    // mask: "lines",
    linesClass: "quiz_item-h-pill",
  });

  split.lines.forEach((line) => {
    line.style.backgroundColor = item.styleVariants.color;
    line.style.color = item.styleVariants.textColor;
    line.style.display = "inline-block";
  });

  pill.dataset.split = "true";
  pillWrap.style.padding = "0rem";
}

function sliderFunc() {
  const quizItemWrap = document.querySelector(".quiz_item-wrap");
  const tabPane = quizItemWrap.querySelectorAll(".quiz_item-change"); //quiz_item
  const introCard = document.querySelector(".quiz_intro-item");
  const introButn = introCard.querySelector(".button");
  const quizJoinItem = document.querySelector(".quiz_join-item");
  const quizFinalResult = document.querySelector(".quiz_item-final-result");
  const showFinalResultButn = quizJoinItem.querySelector(".button");
  const quizItemBgImg = quizItemWrap.querySelector("#quiz-banner-image");
  const overlay = quizItemWrap.querySelectorAll(".quiz_item-overlay");
  // console.log(quizItemBgImg)

  //##1 Initially prev and next button will be disabled if radio button are not selected
  //##2 If radio selected then removed the disable button
  //##3 On next button check if quiz-info card include "is--active" class if no then add. If Yes then go to the next question

  let currentIndex = 0;
  const duration = 300;
  let isAnimating = false;

  let percentage = ((currentIndex + 1) / tabPane.length) * 100;
  render(percentage);
  // quizItemBgImg.setAttribute('href', `${json[currentIndex].styleVariants.image}`)
  quizItemBgImg.src = `${json[currentIndex].styleVariants.image}`;

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
      // Split now that it's visible
      splitPill(tabPane[newIndex], json[newIndex]);

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
    // quizItemBgImg.setAttribute('href', `${json[currentIndex].styleVariants.image}`)
    quizItemBgImg.src = `${json[currentIndex].styleVariants.image}`;
  }

  //Initial Intro butn click
  introButn.addEventListener("click", () => {
    introCard.classList.remove("is--active");
    quizItemWrap.classList.add("is--active");
  });

  //Next and previous button function
  tabPane.forEach((pane, i) => {
    const nextButn = pane.querySelector(".quiz_item-arrow.is--next");
    const prevButn = pane.querySelector(".quiz_item-arrow.is--prev");
    const infoCard = pane.querySelector(".quiz_item-result-wrap");
    const optionButns = pane.querySelectorAll('input[type="radio"]');
    const quizInnerItems = pane.querySelectorAll("[quiz-result-on]");

    //Change butn class based on tapping on radio buttons
    optionButns.forEach((radio) => {
      radio.addEventListener("change", () => {
        nextButn.classList.remove("is--disabled");
      });
    });

    //remove disable from every prev button if its not the first.
    if (i !== 0) {
      prevButn.classList.remove("is--disabled");
      console.log(prevButn);
    }

    //Hide last tab next button
    if (i === tabPane.length - 1) {
      nextButn.classList.add("is--hide");
    }

    //Next Butn click
    nextButn.addEventListener("click", () => {
      if (!infoCard.classList.contains("is--active")) {
        infoCard.classList.add("is--active");
        overlay.forEach((i) => {
          i.classList.add("is--active");
        });
        prevButn.classList.remove("is--disabled");
        //Mobile
        if (mobileWidth) {
          const rect = infoCard.getBoundingClientRect();
          const top =
            window.scrollY +
            rect.top -
            (window.innerHeight / 2 - rect.height / 2);

          window.scrollTo({
            top,
            behavior: "smooth",
          });
        }
      } else {
        if (currentIndex < tabPane.length - 1) {
          handleIndexChange(currentIndex + 1);
          overlay.forEach((i) => {
            i.classList.remove("is--active");
          });
          infoCard.classList.remove("is--active");
        } else if (currentIndex === tabPane.length - 1) {
          // console.log('This is last')
          quizItemWrap.classList.remove("is--active");
          const finalResult = calculateResults();
          // console.log(finalResult)
          quizJoinItem.classList.add("is--active");
        }
        //Mobile
        scrollTop();
      }
    });

    prevButn.addEventListener("click", () => {
      if (infoCard.classList.contains("is--active")) {
        infoCard.classList.remove("is--active");
        // prevButn.classList.add("is--disabled");
        if (i === 0) {
          prevButn.classList.add("is--disabled");
        }
        overlay.forEach((i) => {
          i.classList.remove("is--active");
        });
      } else {
        handleIndexChange(currentIndex - 1);
        overlay.forEach((i) => {
          i.classList.add("is--active");
        });
        // prettier-ignore
        const prevInfoCard = tabPane[currentIndex].querySelector(".quiz_item-result-wrap");
        // console.log(tabPane[currentIndex]);
        prevInfoCard.classList.add("is--active");
      }
    });
  });

  // 👉 Init first slide
  tabPane.forEach((pane, i) => {
    pane.style.display = i === 0 ? "flex" : "none";
    pane.style.opacity = i === 0 ? "1" : "0";

    if (i === 0) {
      splitPill(tabPane[i], json[i]);
    }
  });

  //Show Final result page
  showFinalResultButn.addEventListener("click", () => {
    quizJoinItem.classList.remove("is--active");
    quizFinalResult.classList.add("is--active");
    finalRevealSplit();
    //Mobile
    scrollTop();
  });
}

function videoFunc() {
  const vidWrap = document.querySelector(".quiz_item-visual-inner");
  const vid = vidWrap.querySelector("video");
  const playButn = vidWrap.querySelector(".quiz_visual-play-butn");
  const pauseButn = vidWrap.querySelector(".quiz_visual-pause-butn");
  let playing = false;

  // vid.src = 'https://ocado.netlify.app/quiz/videos/quiz_vid.mp4'
  // vid.load();

  // vid.pause();

  function vidPlayer(isPlaying) {
    if (!isPlaying) {
      vid.play();
      pauseButn.style.pointerEvents = "auto";
      playButn.style.cssText = "opacity: 0; pointer-events: 'none'";
    } else {
      vid.pause();
      playButn.style.cssText = "";
    }
  }

  playButn.addEventListener("click", async () => {
    vid.play();
    pauseButn.style.pointerEvents = "auto";
    playButn.style.opacity = "0";
    playButn.style.pointerEvents = "none";
  });

  pauseButn.addEventListener("click", () => {
    vid.pause();
    pauseButn.style.pointerEvents = "";
    playButn.style.pointerEvents = "";
    playButn.style.opacity = "";
  });
}

async function mainFunc() {
  await addingJson();
  sliderFunc();
}

videoFunc();
mainFunc();
