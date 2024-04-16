let attempts = 0;
let isButtonDisabled = false;
const maxAttempts = 5; // Maximum attempts allowed

// generate captcha
function generateCaptcha() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const captchaLength = 6;
  let captchaCode = "";
  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captchaCode += characters[randomIndex];
  }
  document.getElementById("captcha-output").textContent = captchaCode;
}

// check captcha
function checkCaptcha() {
  if (isButtonDisabled) return;

  const captchaInput = document.getElementById("captcha-input").value;
  const captchaOutput = document.getElementById("captcha-output").textContent;
  const result = document.getElementById("result");
  const remainingAttempts = document.getElementById("remaining-attempts");
  const checkButton = document.getElementById("check-button");

  if (!captchaInput) {
    result.textContent = "CAPTCHA field is empty";
    return;
  }

  attempts++;
  const remaining = maxAttempts - attempts;
  remainingAttempts.textContent = `Remaining attempts: ${remaining}`;

  if (captchaInput !== captchaOutput) {
    if (attempts < maxAttempts) {
      result.textContent = `CAPTCHA doesn't match ❌ Please try again.`;
    } else {
      result.textContent = `Maximum attempts reached. Button disabled.`;
      disableCheckButton();
      checkButton.classList.add("disabled"); // Add 'disabled' class to button
    }
  } else {
    result.textContent = "CAPTCHA matched ✅!";
    attempts = 0; // Reset attempts
    remainingAttempts.textContent = ""; // Clear remaining attempts
  }
}

// disable check button
function disableCheckButton() {
  const checkButton = document.getElementById("check-button");
  checkButton.disabled = true;
  isButtonDisabled = true;

  let timer = 15;
  const result = document.getElementById("result");
  const remainingAttempts = document.getElementById("remaining-attempts");

  const intervalId = setInterval(() => {
    if (timer <= 0) {
      clearInterval(intervalId);
      checkButton.disabled = false;
      isButtonDisabled = false;
      result.textContent = "";
      remainingAttempts.textContent = ""; // Clear remaining attempts
    } else {
      result.textContent = `Button disabled for ${timer} seconds.`;
      remainingAttempts.textContent = `Remaining attempts: 0`;
      timer--;
    }
  }, 1000);
}
