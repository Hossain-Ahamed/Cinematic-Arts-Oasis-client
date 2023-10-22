const validateMobileNumber = (number) => {

    const regex = /^(?:\+88)?01[3-9][0-9]{8}$/;
  
    // Remove "+88" if it exists
    const formattedNumber = number.replace(/^\+88/, '');
  
    // Check if the formatted number matches the regex pattern
    return regex.test(formattedNumber);
  };
  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const validateURL = (url) => {
    // Regular expression for a basic URL validation
    const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/\S*)?$/;
    // console.log(regex.test(url))
    return regex.test(url);
  };
  


  const validateImage = (file) => {
    if (file && file[0]) {
      const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
      const { type, size } = file[0];
  
      if (!supportedFormats.includes(type)) {
        return 'Only JPEG, PNG, and GIF images are allowed.';
      }
  
      if (size > 3 * 1024 * 1024) {
        return 'Image size should not exceed 3MB.';
      }
    }
  
    return true;
  };



  const getPcInfo = async () => {
  const response = await fetch('https://api64.ipify.org?format=json');
  const data = await response.json();

  console.log(data.ip);
  console.log('User Agent:', navigator.userAgent);
  console.log('App Name:', navigator.appName);
  console.log('Platform:', navigator.platform);
  console.log('Language:', navigator.language);
  console.log('Cookies Enabled:', navigator.cookieEnabled);


  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode is preferred
    console.log('Dark mode is enabled.');
  } else {
    // Light mode is preferred
    console.log('Light mode is enabled.');
  }


  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
    });
  } else {
    console.log('Geolocation API not supported.');
  }


  if ('bluetooth' in navigator) {
    // Use the Web Bluetooth API here
  } else {
    console.log('Web Bluetooth API not supported.');
  }


};


export {
  validateMobileNumber,
  validateEmail,
  validateImage,
  getPcInfo,
  validateURL
}