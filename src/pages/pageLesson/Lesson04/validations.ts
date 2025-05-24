export const validateUsername = (value: string): true | string => {
    if (!value) return 'Username is required.';
    return /^[a-z]{8,}$/.test(value) ||
      'Tối thiểu 8 ký tự, không được bao gồm chữ viết hoa, số và ký tự đặc biệt.';
  };
  
  export const validatePassword = (value: string): true | string => {
    if (!value) return 'Password is required.';
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value) ||
      'Phải có 1 chữ hoa, 1 số, 1 ký tự đặc biệt, tối thiểu 8 ký tự.';
  };
  
  export const validatePhone = (value: string): true | string => {
    if (!value) return 'Phone is required.';
    return /^0\d{9,}$/.test(value) ||
      'Bắt đầu bằng 0, ít nhất 10 số, không chứa ký tự khác.';
  };
  
  export const validateWebsite = (value: string): true | string => {
    if (!value) return 'Website is required.';
    return /^(https?:\/\/).+/.test(value) || 'Địa chỉ website không hợp lệ.';
  };
  
  export const validateLinkedIn = (value: string): true | string => {
    if (!value) return true;
    return value.includes('linkedin.com') || 'Cần nhập đúng link LinkedIn.';
  };
  
  export const validateFacebook = (value: string): true | string => {
    if (!value) return true;
    return value.includes('facebook.com') || 'Cần nhập đúng link Facebook.';
  };
  
  export const validateConfirmPassword = (value: string, password: string): true | string => {
    if (!value) return 'Confirm password is required.';
    return value === password || 'Your passwords do not match.';
  };
  
  export const requiredEmail = 'Email là bắt buộc';
  export const requiredDob = 'Date of birth không được bỏ trống';
  export const requiredFirstName = 'firstName is required.';
  export const requiredLastName = 'lastName is required.';
  export const requiredActiveRange = 'Active date không được bỏ trống';
  