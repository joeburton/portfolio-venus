export function validateName(value: string) {
  let error = "";
  if (!value) {
    error = "Name is required";
  } else if (value === "King Kong") {
    error = "What the heck 😱";
  }
  return error;
}

export function validateEmail(value: string) {
  let error = "";
  const reg = /\S+@\S+\.\S+/;
  if (!value) {
    error = "Email is required";
  } else if (!reg.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

export function validatePhoneNumber(value: string) {
  let error = "";
  if (!value) {
    error = "Phone number is required";
  } else if (!/^\d+$/.test(value)) {
    error = "Phone number must be digits only";
  }
  return error;
}

export function validateMessage(value: string) {
  let error = "";
  if (!value) {
    error = "Please provide a short message 😱";
  }
  return error;
}
