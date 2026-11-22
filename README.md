# Quick Validate — Interactive Demo

An interactive web application demonstrating the capabilities of
[@palakpreet/quick-validate](https://www.npmjs.com/package/@palakpreet/quick-validate).

This demo showcases the package through practical examples,
interactive validation tools, and a real Express backend.

---

## Live Demo

[Open the live demo](https://quick-validate-v2-demo.onrender.com/)

---

## npm Package

[@palakpreet/quick-validate](https://www.npmjs.com/package/@palakpreet/quick-validate)

---

## Main Project

[Quick Validate GitHub Repository](https://github.com/Palakpreet-Kaur-Bhullar/quick-validate-v2)

---

## Features Demonstrated

### 1. Individual Validators

Interactive testing of common validators:

- Email
- Indian mobile number
- Indian PIN code
- Password
- URL
- Username

### 2. Indian-Specific Validation

The demo includes interactive validators for:

- PAN
- GSTIN
- IFSC
- UPI ID
- Indian PIN code
- Indian mobile number

### 3. Password Validation

Demonstrates password validation and a live strength indicator
with visual feedback for:

- Minimum length
- Uppercase letters
- Lowercase letters
- Numbers
- Special characters

### 4. Schema-Based Form Validation

A registration form demonstrates:

- Multiple validation rules per field
- Required fields
- Email validation
- Indian phone validation
- PIN code validation
- Password validation
- Optional PAN validation
- Field-specific errors

### 5. Custom Validation Rules

Demonstrates how to create a custom reusable rule.

Example:

```js
addValidator("even", (value) => Number(value) % 2 === 0);
```
