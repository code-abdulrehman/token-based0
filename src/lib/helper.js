export function saveTokenWithExpiration(token, expirationMinutes) {
  const now = new Date();
  const expirationTime = now.getTime() + expirationMinutes * 60000; // Convert minutes to milliseconds
  const tokenData = {
      token: token,
      expiration: expirationTime
  };
  sessionStorage.setItem('authToken', JSON.stringify(tokenData));
}
// saveTokenWithExpiration("token", 2) 

export function getToken() {
  const tokenData = JSON.parse(sessionStorage.getItem('authToken'));
  if (tokenData) {
      const now = new Date().getTime();
      if (now < tokenData.expiration) {
          return tokenData.token;
      } else {
          sessionStorage.removeItem('authToken');
          return null; // Token has expired
      }
  }
  return null; 
}
export function reomoveToken() {
  sessionStorage.removeItem('authToken');
}
export const authToken = getToken()

function getRemainingTime() {
  const tokenData = JSON.parse(sessionStorage.getItem('authToken'));
  if (tokenData) {
      const now = new Date().getTime();
      const remainingTime = tokenData.expiration - now;
      if (remainingTime > 0) {
          // Remaining time in milliseconds, you can convert it to minutes or seconds if needed
          return remainingTime;
      } else {
          sessionStorage.removeItem('authToken');
      }
  }
  return 0; // No token or token has expired
}

// To get remaining time in minutes
export function getRemainingMinutes() {
  const remainingTime = getRemainingTime();
  return Math.max(Math.floor(remainingTime / 60000), 0); // Convert milliseconds to minutes
}



export function capitalize(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // email 

  export function setEmail(email) {
    // Encode the email using Base64
    const encodedEmail = btoa(email);
    // Set the cookie with the encoded email
    document.cookie = `email=${encodedEmail}; path=/;`;
}
export function getEmail() {
  // Retrieve the cookies
  const cookies = document.cookie.split(';');
  // Loop through cookies to find the email cookie
  for (const cookie of cookies) {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name === 'email') {
          // Decode the email using Base64
          return atob(value);
      }
  }
  return null; // Return null if the email cookie is not found
}


 export function removeEmail() {
    // Set the cookie to expire immediately by using the past date
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
}


export function isImageUrl(url) {
  // Default placeholder URL
  const defaultUrl = "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg";
  
  // Check if URL starts with 'https://'
  if (url.startsWith('https://')) {
      return url;
  } else {
      return defaultUrl;
  }
}