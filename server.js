import express from "express";
import {
  validateSchema,
  isEmail,
  isIndianPhone,
  isIndianPinCode,
  isStrongPassword,
  isPAN,
  isGSTIN,
  isIFSC,
  isUPI,
  isURL,
  isUsername
} from "@palakpreet/quick-validate";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

/*
|--------------------------------------------------------------------------
| API: Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Quick Validate Demo API is running",
    package: "@palakpreet/quick-validate",
    version: "2.0.0"
  });
});

/*
|--------------------------------------------------------------------------
| API: Registration Form Validation
|--------------------------------------------------------------------------
*/

app.post("/api/register", (req, res) => {
  const schema = {
    name: [
      "required",
      { name: "minLength", value: 2 },
      { name: "maxLength", value: 50 }
    ],

    email: ["required", "email"],

    phone: ["required", "indianPhone"],

    pin: ["required", "indianPinCode"],

    password: ["required", "password"],

    pan: ["pan"]
  };

  const result = validateSchema(req.body, schema);

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      result
    });
  }

  res.json({
    success: true,
    message: "All fields passed validation!",
    result
  });
});

/*
|--------------------------------------------------------------------------
| API: Individual Validator Playground
|--------------------------------------------------------------------------
*/

app.post("/api/validate", (req, res) => {
  const { type, value } = req.body;

  const validators = {
    email: isEmail,
    indianPhone: isIndianPhone,
    pinCode: isIndianPinCode,
    password: isStrongPassword,
    pan: isPAN,
    gstin: isGSTIN,
    ifsc: isIFSC,
    upi: isUPI,
    url: isURL,
    username: isUsername
  };

  const validator = validators[type];

  if (!validator) {
    return res.status(400).json({
      success: false,
      message: "Unknown validation type"
    });
  }

  const valid = validator(value);

  res.json({
    success: true,
    type,
    value,
    valid,
    message: valid
      ? "The value passed validation."
      : "The value failed validation."
  });
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(`Quick Validate Demo running at http://localhost:${PORT}`);
});