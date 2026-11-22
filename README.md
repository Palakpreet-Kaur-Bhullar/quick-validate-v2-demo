<img width="1166" height="703" alt="image" src="https://github.com/user-attachments/assets/6ac33e4c-de0e-4a0a-8ba7-98a237206cff" /># Quick Validate — Interactive Demo

An interactive web application demonstrating the capabilities of
[@palakpreet/quick-validate](https://www.npmjs.com/package/@palakpreet/quick-validate).

This demo showcases the package through practical examples,
interactive validation tools, and a real Express backend.

---

## Live Demo

(Clone repository and run npm dev)

<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/568640ba-4627-4fe2-825d-b641ef7592ce" />

<img width="1512" height="982" alt="image" src="https://github.com/user-attachments/assets/6901b8a8-7187-4714-be4b-c25dbfbf076a" />



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

<img width="1166" height="703" alt="image" src="https://github.com/user-attachments/assets/011ab206-cf62-4d22-9e03-eaa774d60cda" />

<img width="1146" height="747" alt="image" src="https://github.com/user-attachments/assets/1d000a1a-6bc3-4ef1-8e9d-7ceb97f0ec64" />


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

  <img width="842" height="802" alt="image" src="https://github.com/user-attachments/assets/e2415acd-36a4-4bbe-93c2-a68b4cf34d54" />


### 5. Custom Validation Rules

Demonstrates how to create a custom reusable rule.

<img width="1060" height="645" alt="image" src="https://github.com/user-attachments/assets/308378ec-dd45-4621-a1f4-58d388208bed" />


Example:

```js
addValidator("even", (value) => Number(value) % 2 === 0);
```

<img width="1059" height="601" alt="image" src="https://github.com/user-attachments/assets/32e1de5a-775b-4916-8ed4-8d987a6586fa" />

<img width="1064" height="760" alt="image" src="https://github.com/user-attachments/assets/1d8fcee0-6894-4ec2-ae98-21a575a35877" />

<img width="1054" height="702" alt="image" src="https://github.com/user-attachments/assets/546724ee-45c4-4376-b9a1-4a7f31b23ca1" />

<img width="1050" height="543" alt="image" src="https://github.com/user-attachments/assets/88063be9-ed80-4e95-b359-12e5fa95eacc" />

