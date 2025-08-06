const supa = supabase.createClient(
  "https://vflvhmdpsivnrenuqgzs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbHZobWRwc2l2bnJlbnVxZ3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODEyMzcsImV4cCI6MjA2OTU1NzIzN30.lxCXZaqZm2aWzmyDWBNc5CEhYtb-6lxn_zvECVv6t8c"
);

const appsDiv = document.getElementById("apps");
const search = document.getElementById("search");

let allApps = [];

async function loadApps() {
  const { data, error } = await supa.from("apps").select("*");
  if (error) return console.error("Fetch error:", error.message);

  allApps = data;
  appsDiv.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const app = data[i];
    const row = document.createElement("div");
    row.className = "app";
    row.innerHTML = `<img loading="lazy" src="${app.icon_url}" alt="${app.name}"><span>${app.name}</span>`;
    row.onclick = () => {
      location.href = `app.html?app=${encodeURIComponent(app.name)}`;
    };
    appsDiv.appendChild(row);
    await new Promise(res => setTimeout(res, 50));
  }
}

function searchApps() {
  const query = search.value.trim().toLowerCase();
  const apps = appsDiv.querySelectorAll(".app");
  let found = false;

  apps.forEach(app => {
    const name = app.querySelector("span").innerText.toLowerCase();
    const match = name.startsWith(query);
    app.style.display = match ? "flex" : "none";
    if (match) found = true;
  });

  if (!found) {
    appsDiv.innerHTML = "<p>No results found.</p>";
  } else if (appsDiv.innerHTML.includes("No results")) {
    loadApps();
  }
}

search.addEventListener("input", searchApps);
appsDiv.innerText = "Loading apps";
loadApps();