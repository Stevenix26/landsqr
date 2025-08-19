// Simple test to check API response
const API_URL = "https://api.json-generator.com/templates/rSJrCF7PA-8B/data";
const API_TOKEN = "ci6y14wdnw7vgpo2htjbycyydxqibybdzoy0ttf4";

fetch(API_URL, {
  headers: { Authorization: `Bearer ${API_TOKEN}` },
})
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("Data type:", Array.isArray(data) ? "Array" : typeof data);
    console.log("Data length:", Array.isArray(data) ? data.length : "Not an array");
    if (Array.isArray(data) && data.length > 0) {
      console.log("First item structure:", Object.keys(data[0]));
    }
  })
  .catch(err => console.error("Error:", err));
