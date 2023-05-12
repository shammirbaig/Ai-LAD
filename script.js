function showForm(formId) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
}

async function submitForm(event, formId) {
    event.preventDefault();  // Prevent the form from submitting normally
   
    let form = document.getElementById(formId + '-form');
    let formdata = new FormData(form);
    let message =document.getElementById("message")
    message.style.display="none";
    let loginButton =document.getElementById("login-button");
    let loginshow =document.getElementById("login-show");
    let profile=document.getElementById("profile");
    loginButton.disabled = true;  // Disable the button
    loginButton.innerHTML = 'Loading...';

  let email = formdata.get('login-email');
  let password = formdata.get('login-password');
  
  // Create the request body object
  let requestBody = {
    email: email,
    password: password
  };
  const response = await fetch('https://2nh5mq5dg4.execute-api.us-east-1.amazonaws.com/default/ailad_backend?apikey=c7ff3702-ec4d-4c70-a7a8-2600f4c9b587', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  });

  const data= await response.json()
  loginButton.disabled = false;  // Enable the button
  loginButton.innerHTML = 'Login';
  if(data.ErrorCode){
    message.style.display="block";
    message.innerText=data.Description
  }else{
    form.style.display="none";
    profile.style.display="block";
    profile.innerHTML=`<h2>Hi! ${data.Profile.Email[0].Value}</h2>`;
    loginshow.style.display="block";


    
  }
  console.log(data)

    // Here you can send 'data' using AJAX to your server.
}

function showLoginForm() {
    let loginForm = document.getElementById('login-form');
    let loginshow= document.getElementById("login-show");
    let profile=document.getElementById("profile");
    loginForm.style.display = 'flex';
    loginForm.style.flexDirection="column";
    loginshow.style.display="none";
    profile.style.display="none";

  }
  