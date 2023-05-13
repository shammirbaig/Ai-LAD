
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();  // Prevent the form from submitting normally

  let form = document.forms[0]
  let formdata = new FormData(form);
  let message = document.getElementById("message")
  message.style.display = "none";
  let loginButton = document.getElementById("login-button");
  let loginshow = document.getElementById("login-show");
  let profile = document.getElementById("profile");
  let profileContainer = document.getElementById("profile-container");
  let risk = document.getElementById("risk");
  loginButton.disabled = true;  // Disable the button
  loginButton.innerHTML = 'Loading...';


  let email = formdata.get('login-email');
  let password = formdata.get('login-password');
  let ipaddress = formdata.get('login-Ipaddress');
  let useragent = formdata.get('Useragent');

  // Create the request body object
  let requestBody = {
    email: email,
    password: password,
    ipaddress: ipaddress,
    useragent: useragent
  };
  const response = await fetch('https://2nh5mq5dg4.execute-api.us-east-1.amazonaws.com/default/ailad_backend?apikey=c7ff3702-ec4d-4c70-a7a8-2600f4c9b587', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  });

  loginButton.disabled = false;  // Enable the button
  loginButton.innerHTML = 'Login';
  const data = await response.json()

  if (data.ErrorCode) {
    message.style.display = "block";
    risk.style.display = "block";
    message.innerText = data.Description
    risk.innerHTML = `Your risk score is ${data.fraud.score} and risk factor is ${data.fraud.ruleId}`;
  } else {
    form.style.display = "none";
    profile.style.display = "block";
    // profileContainer.style.display="flex";
    // profileContainer.style.flexDirection="column";
    // profileContianer.style.alignItems="space-around";
    profileContainer.style.minHeight = "200px";
    risk.style.display = "block";
    profile.innerHTML = `<h2>Hi! ${data.Profile.Email[0].Value}</h2>`;
    loginshow.style.display = "block";
    risk.innerHTML = `Your risk score is ${data.fraud.score} and risk factor is ${data.fraud.ruleId}`;
    form.reset();
  }
  console.log(data)
});

document.getElementById("login-show").addEventListener("click", async (event) => {
  event.preventDefault(); 
  let loginForm = document.getElementById('login-form');
  let loginshow= document.getElementById("login-show");
  let profile=document.getElementById("profile");
  let risk=document.getElementById("risk");
  let profileContainer=document.getElementById("profile-container");
    loginForm.style.display = 'flex';
    loginForm.style.flexDirection="column";
    loginshow.style.display="none";
    profile.style.display="none";
    risk.style.display="none";
    profileContainer.style.minHeight="auto";
});