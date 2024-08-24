export function saveTokenWithExpiration(token, expirationMinutes) {
  const now = new Date();
  const expirationTime = now.getTime() + expirationMinutes * 60000; // Convert minutes to milliseconds
  const tokenData = {
      token: token,
      expiration: expirationTime
  };
  localStorage.setItem('authToken', JSON.stringify(tokenData));
}

export function getToken() {
  const tokenData = JSON.parse(localStorage.getItem('authToken'));
  if (tokenData) {
      const now = new Date().getTime();
      if (now < tokenData.expiration) {
          return tokenData.token;
      } else {
          localStorage.removeItem('authToken');
          return null; // Token has expired
      }
  }
  return null; 
}
export const authToken = getToken()

function getRemainingTime() {
  const tokenData = JSON.parse(localStorage.getItem('authToken'));
  if (tokenData) {
      const now = new Date().getTime();
      const remainingTime = tokenData.expiration - now;
      if (remainingTime > 0) {
          // Remaining time in milliseconds, you can convert it to minutes or seconds if needed
          return remainingTime;
      } else {
          localStorage.removeItem('authToken');
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
  