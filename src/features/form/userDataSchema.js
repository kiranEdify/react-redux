import * as yup from "yup";

export const userDataSchema_setValue = yup.object({
  user: yup.object({
    name: yup.string().required("Name Required*"),
    age: yup.string().required("Age Required*"),

    worked: yup.boolean(),

    companyName: yup.string().when("worked", {
      is: true,
      then: (schema) => schema.required("Provide a comapy name*"),
    }),

    yearsOfExp: yup.string().when("worked", {
      is: true,
      then: (schema) => schema.required("Years of Experience Required*"),
    }),
  }),
});
