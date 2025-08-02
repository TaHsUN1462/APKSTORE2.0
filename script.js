
  const supa = supabase.createClient(
    "https://vflvhmdpsivnrenuqgzs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbHZobWRwc2l2bnJlbnVxZ3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODEyMzcsImV4cCI6MjA2OTU1NzIzN30.lxCXZaqZm2aWzmyDWBNc5CEhYtb-6lxn_zvECVv6t8c"
  );

    const appsDiv = document.getElementById("apps");
    const search = document.getElementById("search");
    const appPage = document.getElementById("apppage");

    async function loadApps() {
      const { data, error } = await supa.from("apps").select("*");
      if (error) return console.error("Fetch error:", error.message);

      appsDiv.innerHTML = "";
      data.forEach(app => {
        const row = document.createElement("div");
        row.className = "app";
        row.innerHTML = `<img loading="lazy" src="${app.icon_url}" alt="${app.name}"><span>${app.name}</span>`;
        row.onclick = () => showApp(app);
        appsDiv.appendChild(row);
      });
    }

    function showApp(app) {
      search.style.opacity = "0";
      search.style.pointerEvents = "none";
      appsDiv.style.opacity = "0";
      appsDiv.style.pointerEvents = "none";
      appPage.style.display = "flex";
      appPage.style.transform = "translateX(120%)";
      appPage.style.pointerEvents = "none";

      icon.src = app.icon_url;
      title.innerText = app.name;
      desc.innerText = app.description;
      apk.href = app.apk_url;

      setTimeout(() => {
      appPage.style.transform = "translateX(0)";
        appPage.style.pointerEvents = "auto";
      }, 50);
    }

    function back() {
      appPage.style.transform = "translateX(120%)";
      appPage.style.pointerEvents = "none";
      setTimeout(() => {
        appPage.style.display = "none";
        search.style.opacity = "1";
      search.style.pointerEvents = "auto";
      appsDiv.style.opacity = "1";
      appsDiv.style.pointerEvents = "auto";
      }, 200);
    }
search.addEventListener("input", searchApps);

function searchApps() {
  const query = search.value.trim().toLowerCase();
  const apps = appsDiv.querySelectorAll(".app");

  apps.forEach(app => {
    const name = app.querySelector("span").innerText.toLowerCase();
    app.style.display = name.startsWith(query) ? "flex" : "none";
  });
}
appsDiv.innerText = "Loading apps"
    loadApps();
  