/* =========================================================
   QUICK VALIDATE DEMO
   Frontend JavaScript
   ========================================================= */

/* ---------------- HELPER FUNCTIONS ---------------- */

async function apiRequest(endpoint, data) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Something went wrong");
  }

  return result;
}

function showResult(elementId, title, data, status = "neutral") {
  const box = document.getElementById(elementId);

  box.className = `result-box ${status}`;
  box.classList.remove("hidden");

  box.replaceChildren();

  const titleElement = document.createElement("div");
  titleElement.className = `result-title ${status}`;

  titleElement.textContent = title;

  const contentElement = document.createElement("div");
  contentElement.className = "result-content";

  const pre = document.createElement("pre");
  pre.textContent =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  contentElement.appendChild(pre);

  box.appendChild(titleElement);
  box.appendChild(contentElement);
}

function showError(elementId, error) {
  showResult(
    elementId,
    "❌ Error",
    error.message || "Something went wrong.",
    "error",
  );
}

function getStatus(value) {
  if (value === true) return "success";
  if (value === false) return "error";

  if (value && typeof value === "object") {
    if ("valid" in value) {
      return value.valid ? "success" : "error";
    }

    if ("isValid" in value) {
      return value.isValid ? "success" : "error";
    }

    if ("success" in value) {
      return value.success ? "success" : "error";
    }
  }

  return "neutral";
}

/* ---------------- HEALTH CHECK ---------------- */

async function checkServer() {
  try {
    const response = await fetch("/api/health");
    const data = await response.json();

    console.log("Server status:", data);
  } catch (error) {
    console.error("Server health check failed:", error);
  }
}

checkServer();

/* ---------------- INDIVIDUAL VALIDATOR ---------------- */

document.getElementById("validateBtn").addEventListener("click", async () => {
  const type = document.getElementById("validatorType").value;

  const value = document.getElementById("validatorValue").value.trim();

  if (!value) {
    showResult(
      "validatorResult",
      "⚠️ Input Required",
      "Please enter a value to validate.",
      "warning",
    );
    return;
  }

  try {
    const data = await apiRequest("/api/validate", {
      type,
      value,
    });

    const status = getStatus(data.valid);

    showResult(
      "validatorResult",
      status === "success" ? "✅ Valid Input" : "❌ Invalid Input",
      data,
      status,
    );
  } catch (error) {
    showError("validatorResult", error);
  }
});

/* ---------------- PASSWORD STRENGTH ---------------- */

document.getElementById("passwordBtn").addEventListener("click", async () => {
  const value = document.getElementById("passwordInput").value;

  if (!value) {
    showResult(
      "passwordResult",
      "⚠️ Input Required",
      "Please enter a password.",
      "warning",
    );
    return;
  }

  try {
    const data = await apiRequest("/api/password", {
      password: value,
    });

    showResult("passwordResult", "🔐 Password Analysis", data, "neutral");
  } catch (error) {
    showError("passwordResult", error);
  }
});

/* ---------------- REGISTRATION / SCHEMA ---------------- */

document
  .getElementById("registrationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById("regName").value.trim(),
      email: document.getElementById("regEmail").value.trim(),
      phone: document.getElementById("regPhone").value.trim(),
      password: document.getElementById("regPassword").value,
      pinCode: document.getElementById("regPin").value.trim(),
    };

    try {
      const result = await apiRequest("/api/register", data);

      showResult(
        "registrationResult",
        "📋 Schema Validation Result",
        result,
        "neutral",
      );
    } catch (error) {
      showError("registrationResult", error);
    }
  });

/* ---------------- CUSTOM VALIDATION ---------------- */

document.getElementById("customBtn").addEventListener("click", async () => {
  const value = document.getElementById("customValue").value;

  if (value === "") {
    showResult(
      "customResult",
      "⚠️ Input Required",
      "Please enter a number.",
      "warning",
    );
    return;
  }

  try {
    const data = await apiRequest("/api/custom", {
      value,
    });

    const status = data.valid ? "success" : "error";

    showResult(
      "customResult",
      data.valid ? "✅ Custom Rule Passed" : "❌ Custom Rule Failed",
      data,
      status,
    );
  } catch (error) {
    showError("customResult", error);
  }
});

/* ---------------- ARRAY VALIDATION ---------------- */

document.getElementById("arrayBtn").addEventListener("click", async () => {
  const input = document.getElementById("arrayValues").value;

  const values = input
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);

  if (values.length === 0) {
    showResult(
      "arrayResult",
      "⚠️ Input Required",
      "Please enter at least one email address.",
      "warning",
    );
    return;
  }

  try {
    const data = await apiRequest("/api/array", {
      values,
    });

    showResult("arrayResult", "📚 Array Validation Result", data, "neutral");
  } catch (error) {
    showError("arrayResult", error);
  }
});

/* ---------------- OBJECT VALIDATION ---------------- */

document.getElementById("objectBtn").addEventListener("click", async () => {
  const data = {
    name: document.getElementById("objectName").value.trim(),
    email: document.getElementById("objectEmail").value.trim(),
    phone: document.getElementById("objectPhone").value.trim(),
  };

  try {
    const result = await apiRequest("/api/object", {
      data,
    });

    showResult(
      "objectResult",
      "🧩 Object Validation Result",
      result,
      "neutral",
    );
  } catch (error) {
    showError("objectResult", error);
  }
});

/* ---------------- NESTED OBJECT VALIDATION ---------------- */

document.getElementById("nestedBtn").addEventListener("click", async () => {
  const input = document.getElementById("nestedInput").value;

  let data;

  try {
    data = JSON.parse(input);
  } catch {
    showResult(
      "nestedResult",
      "❌ Invalid JSON",
      "Please enter valid JSON data.",
      "error",
    );
    return;
  }

  try {
    const result = await apiRequest("/api/nested", {
      data,
    });

    showResult(
      "nestedResult",
      "🌳 Nested Validation Result",
      result,
      "neutral",
    );
  } catch (error) {
    showError("nestedResult", error);
  }
});

/* ---------------- FILE VALIDATION ---------------- */

document.getElementById("fileBtn").addEventListener("click", async () => {
  const file = {
    name: document.getElementById("fileName").value.trim(),
    type: document.getElementById("fileType").value.trim(),
    size: Number(document.getElementById("fileSize").value),
  };

  if (!file.name || !file.type || !file.size) {
    showResult(
      "fileResult",
      "⚠️ Input Required",
      "Please fill in all file metadata fields.",
      "warning",
    );
    return;
  }

  try {
    const result = await apiRequest("/api/file", {
      file,
    });

    showResult("fileResult", "📁 File Validation Result", result, "neutral");
  } catch (error) {
    showError("fileResult", error);
  }
});

/* ---------------- ENTER KEY SUPPORT ---------------- */

document
  .getElementById("validatorValue")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.getElementById("validateBtn").click();
    }
  });

document.getElementById("customValue").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.getElementById("customBtn").click();
  }
});

console.log("Quick Validate frontend loaded successfully.");
