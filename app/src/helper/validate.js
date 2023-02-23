import { toast } from "react-hot-toast";

export async function loginvalidate(values) {
  const emailerrors = email({}, values);
  const errors = password({}, values);

  return { errors, emailerrors };
}

function email(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required");
    } else if(values.email.includes(" ")) {
      error.email = toast.error("Invalid Email");
    }
    return error;
}



function password(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Passowrd Required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password");
  }
  return error;
}