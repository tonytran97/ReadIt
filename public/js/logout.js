const logout = async () => {
  // Make a POST request to destroy the session on the back end
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successfully logged out, redirect to the login page
    // document.location.replace('/login');
    swal("You have successfully been logged out!", "Please refresh the page", "success");

    
    
  } else {
    alert(response.statusText);
  }
  
};

document.querySelector('#logout').addEventListener('click', logout);
