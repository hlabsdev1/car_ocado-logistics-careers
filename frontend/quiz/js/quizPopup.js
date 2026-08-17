const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup-close");
const popupButton = document.querySelector(".popup-button");

const POPUP_CLICKED_KEY = "homepagePopupClicked";
const POPUP_CLOSED_KEY = "homepagePopupClosedAt";

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

function canShowPopup() {
  // User previously clicked the CTA → never show again
  if (localStorage.getItem(POPUP_CLICKED_KEY) === "true") {
    return false;
  }

  // Check when they last closed the popup
  const closedAt = localStorage.getItem(POPUP_CLOSED_KEY);

  if (closedAt) {
    const timeSinceClosed = Date.now() - Number(closedAt);

    // Less than one week ago
    if (timeSinceClosed < ONE_WEEK) {
      return false;
    }
  }

  return true;
}

function handleScroll() {
  if (!canShowPopup()) return;

  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

  const scrollPercentage = scrollTop / pageHeight;

  if (scrollPercentage >= 0.5) {
    popup.classList.add("is-visible");

    // Don't keep running scroll calculations
    window.removeEventListener("scroll", handleScroll);
  }
}

popupClose.addEventListener("click", () => {
  popup.classList.remove("is-visible");

  // Remember the exact time they closed it
  localStorage.setItem(POPUP_CLOSED_KEY, Date.now());
});

popupButton.addEventListener("click", () => {
  // Permanently prevent popup for this browser
  localStorage.setItem(POPUP_CLICKED_KEY, "true");
});

if (canShowPopup()) {
  window.addEventListener("scroll", handleScroll);
}
