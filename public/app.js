import express from "express";

import {
  validate,
  validateSchema,
  validateArray,
  validateNested,
  validateObject,
  isFileValid,
  isEmail,
  isIndianPhone,
  isIndianPinCode,
  isStrongPassword,
  isPAN,
  isGSTIN,
  isIFSC,
  isUPI,
  isURL,
  isUsername,
  addValidator,
} from "@palakpreet/quick-validate";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("public"));

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Quick Validate Demo API is running",
    package: "@palakpreet/quick-validate",
    version: "2.0.0",
  });
});

/* =========================================================
   INDIVIDUAL VALIDATORS
========================================================= */

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
    username: isUsername,
  };

  const validator = validators[type];

  if (!validator) {
    return res.status(400).json({
      success: false,
      message: "Unknown validation type.",
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
      : "The value failed validation.",
  });
});

/* =========================================================
   SCHEMA VALIDATION
========================================================= */

app.post("/api/register", (req, res) => {
  const schema = {
    name: [
      "required",
      { name: "minLength", value: 2 },
      { name: "maxLength", value: 50 },
    ],

    email: ["required", "email"],

    phone: ["required", "indianPhone"],

    pin: ["required", "indianPinCode"],

    password: ["required", "password"],

    pan: ["pan"],
  };

  const result = validateSchema(req.body, schema);

  res.status(result.valid ? 200 : 400).json({
    success: result.valid,
    message: result.valid
      ? "All fields passed validation!"
      : "Please correct the validation errors.",
    result,
  });
});

/* =========================================================
   CUSTOM VALIDATOR
========================================================= */

addValidator("even", (value) => Number(value) % 2 === 0);

app.post("/api/custom", (req, res) => {
  const { value } = req.body;

  const result = validate(value, ["even"]);

  const valid = result.valid;

  res.json({
    success: true,
    valid,
    message: valid
      ? `${value} is an even number.`
      : `${value} is not an even number.`,
    result,
  });
});

/* =========================================================
   ARRAY VALIDATION
========================================================= */

app.post("/api/array", (req, res) => {
  const { values } = req.body;

  if (!Array.isArray(values)) {
    return res.status(400).json({
      success: false,
      valid: false,
      message: "The supplied value must be an array.",
    });
  }

  try {
    const result = validateArray(values, ["required"], {
      minItems: 1,
      maxItems: 10,
    });

    res.json({
      success: true,
      valid: result.valid,
      message: result.valid
        ? `Array validation passed. ${values.length} values were received.`
        : "Array validation failed.",
      values,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      valid: false,
      message: error.message,
    });
  }
});

/* =========================================================
   NESTED OBJECT VALIDATION
========================================================= */

app.post("/api/nested", (req, res) => {
  const data = {
    user: {
      name: "Palak",
      email: "palak@example.com",
    },

    address: {
      city: "Pune",
      pin: "411001",
    },
  };

  const schema = {
    user: {
      name: ["required"],
      email: ["required", "email"],
    },

    address: {
      city: ["required"],
      pin: ["required", "indianPinCode"],
    },
  };

  try {
    const result = validateNested(data, schema);

    res.json({
      success: true,
      valid: result.valid,
      message: result.valid
        ? "Nested object validation passed."
        : "Nested object validation found errors.",
      data,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      valid: false,
      message: error.message,
      data,
    });
  }
});

/* =========================================================
   OBJECT VALIDATION
========================================================= */

app.post("/api/object", (req, res) => {
  const data = {
    name: "Palak",
    email: "palak@example.com",
    age: 21,
  };

  const validators = {
    name: (value) => typeof value === "string" && value.length >= 2,

    email: isEmail,

    age: (value) => Number(value) >= 18,
  };

  try {
    const result = validateObject(data, validators);

    res.json({
      success: true,
      valid: result.valid,
      message: result.valid
        ? "Object validation passed."
        : "Object validation found errors.",
      data,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      valid: false,
      message: error.message,
      data,
    });
  }
});

/* =========================================================
   FILE METADATA VALIDATION
========================================================= */

app.post("/api/file", (req, res) => {
  const file = req.body;

  try {
    const result = isFileValid(file, {
      maxSize: 5 * 1024 * 1024,

      types: ["image/jpeg", "image/png", "application/pdf"],

      extensions: [".jpg", ".jpeg", ".png", ".pdf"],
    });

    res.json({
      success: true,
      valid: result.valid ?? result,
      message:
        (result.valid ?? result)
          ? "File metadata passed validation."
          : "File metadata failed validation.",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      valid: false,
      message: error.message,
    });
  }
});

/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log("  QUICK VALIDATE INTERACTIVE DEMO");
  console.log("======================================");
  console.log("");
  console.log(`  Local: http://localhost:${PORT}`);
  console.log("");
});
