import * as Yup from "yup";

const PickupDetailsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits")
    .min(7, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(3, "Password must be at least 8 character")
    .required("Required"),
});

export { PickupDetailsSchema, LoginSchema };
