import express from "express";
import * as validators from "@palakpreet/quick-validate";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const validatorMap = {
  email: validators.isEmail,
  phone: validators.isIndianPhone,
  pinCode: validators.isIndianPinCode,
  password: validators.isStrongPassword,
  url: validators.isURL,
  username: validators.isUsername,
  pan: validators.isPAN,
  gstin: validators.isGSTIN,
  ifsc: validators.isIFSC,
  upi: validators.isUPI,
  vehicle: validators.isIndianVehicleNumber,
  uuid: validators.isUUID,
  ipv4: validators.isIPv4,
  ipv6: validators.isIPv6,
  slug: validators.isSlug,
  hexColor: validators.isHexColor,
  numeric: validators.isNumeric,
  integer: validators.isInteger,
  json: validators.isJSON,
  date: validators.isDate,
  creditCard: validators.isCreditCard,
  alphanumeric: validators.isAlphanumeric,
  domain: validators.isDomain,
  bankAccount: validators.isBankAccount,
  postalCode: validators.isPostalCode,
  dateTime: validators.isDateTime,
  ip: validators.isIP,
};

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Quick Validate API is running",
    version: "2.0.1",
  });
});

/* Individual validator */

app.post("/api/validate", (req, res) => {
  const { type, value, options = {} } = req.body;

  const validator = validatorMap[type];

  if (!validator) {
    return res.status(400).json({
      valid: false,
      error: "Unknown validator",
    });
  }

  try {
    const valid = validator(value, options);

    res.json({
      valid,
      type,
      value,
      message: valid ? "Valid input" : "Invalid input",
    });
  } catch (error) {
    res.status(400).json({
      valid: false,
      error: error.message,
    });
  }
});

/* Password strength */

app.post("/api/password", (req, res) => {
  const { password = "" } = req.body;

  res.json({
    ...validators.getPasswordStrength(password),
    passwordValid: validators.isStrongPassword(password),
  });
});

/* Registration schema */

app.post("/api/register", (req, res) => {
  const data = req.body;

  const schema = {
    name: ["required", "username"],
    email: ["required", "email"],
    phone: ["required", "indianPhone"],
    password: ["required", "password"],
    pinCode: ["required", "pinCode"],
  };

  const result = validators.validateSchema(data, schema);

  res.json(result);
});

/* Custom validator */

app.post("/api/custom", (req, res) => {
  const { value } = req.body;

  validators.addValidator("demoEven", (v) => {
    return Number(v) % 2 === 0;
  });

  const result = validators.validate(value, ["required", "demoEven"]);

  res.json({
    ...result,
    validator: "demoEven",
    explanation: "The custom validator checks whether the value is even.",
  });
});

/* Array validation */

app.post("/api/array", (req, res) => {
  const { values = [] } = req.body;

  const result = validators.validateArray(values, ["required", "email"], {
    minItems: 1,
    maxItems: 10,
  });

  res.json(result);
});

/* Object validation */

app.post("/api/object", (req, res) => {
  const { data } = req.body;

  const result = validators.validateObject(data, {
    name: validators.isUsername,
    email: validators.isEmail,
    phone: validators.isIndianPhone,
  });

  res.json(result);
});

/* Nested validation */

app.post("/api/nested", (req, res) => {
  const { data } = req.body;

  const schema = {
    name: ["required", "username"],

    address: {
      type: "object",
      schema: {
        city: ["required"],
        pinCode: ["required", "pinCode"],
      },
    },

    emails: {
      type: "array",
      rules: ["required", "email"],
      minItems: 1,
      maxItems: 5,
    },
  };

  const result = validators.validateNested(data, schema);

  res.json(result);
});

/* File validation */

app.post("/api/file", (req, res) => {
  const { file } = req.body;

  const result = validators.isFileValid(file, {
    maxSize: 5 * 1024 * 1024,
    types: ["image/jpeg", "image/png", "application/pdf"],
  });

  res.json({
    valid: result,
    message: result
      ? "File meets the validation requirements"
      : "File does not meet the validation requirements",
  });
});

/* Single field validation */

app.post("/api/field", (req, res) => {
  const { data, field } = req.body;

  const schema = {
    name: ["required", "username"],
    email: ["required", "email"],
    phone: ["required", "indianPhone"],
    password: ["required", "password"],
    pinCode: ["required", "pinCode"],
  };

  const result = validators.validateField(data, schema, field);

  res.json(result);
});

/* General validation */

app.post("/api/quick", (req, res) => {
  const { value, rules } = req.body;

  res.json(validators.validate(value, rules));
});

app.listen(PORT, () => {
  console.log(`Quick Validate demo running at http://localhost:${PORT}`);
});
