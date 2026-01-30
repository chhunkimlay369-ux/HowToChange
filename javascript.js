const oils = [
  { name: "Olive Oil", sap: 0.134, faceSafe: true },
  { name: "Coconut Oil", sap: 0.183, faceSafe: false },
  { name: "Palm Oil", sap: 0.141, faceSafe: false },
  { name: "Shea Butter", sap: 0.128, faceSafe: true },
  { name: "Castor Oil", sap: 0.128, faceSafe: true },
  { name: "Sunflower Oil", sap: 0.135, faceSafe: true },
  { name: "Sweet Almond Oil", sap: 0.136, faceSafe: true },
  { name: "Avocado Oil", sap: 0.133, faceSafe: true },
  { name: "Rice Bran Oil", sap: 0.128, faceSafe: true },
  { name: "Grapeseed Oil", sap: 0.135, faceSafe: true },
  { name: "Canola Oil", sap: 0.124, faceSafe: true },
  { name: "Soybean Oil", sap: 0.135, faceSafe: true },
  { name: "Corn Oil", sap: 0.137, faceSafe: true },
  { name: "Safflower Oil", sap: 0.136, faceSafe: true },
  { name: "Sesame Oil", sap: 0.133, faceSafe: true },
  { name: "Walnut Oil", sap: 0.135, faceSafe: true },
  { name: "Hazelnut Oil", sap: 0.136, faceSafe: true },
  { name: "Macadamia Oil", sap: 0.139, faceSafe: true },
  { name: "Palm Kernel Oil", sap: 0.156, faceSafe: false },
  { name: "Babassu Oil", sap: 0.175, faceSafe: false },
  { name: "Cocoa Butter", sap: 0.137, faceSafe: true },
  { name: "Mango Butter", sap: 0.128, faceSafe: true },
  { name: "Lard", sap: 0.138, faceSafe: false },
  { name: "Tallow", sap: 0.141, faceSafe: false },
  { name: "Neem Oil", sap: 0.139, faceSafe: true },
  { name: "Hemp Seed Oil", sap: 0.136, faceSafe: true },
  { name: "Jojoba Oil", sap: 0.066, faceSafe: true },
  { name: "Apricot Kernel Oil", sap: 0.135, faceSafe: true },
  { name: "Pumpkin Seed Oil", sap: 0.135, faceSafe: true },
  { name: "Camellia Oil", sap: 0.136, faceSafe: true },

  // Added oils
  { name: "Plai Oil", sap: 0.120, faceSafe: false },
  { name: "Galanga Oil", sap: 0.125, faceSafe: false }
];


const fragrances = [
  // Face-safe
  { name: "Lavender", level: "face" }, { name: "Rose", level: "face" }, { name: "Chamomile", level: "face" },
  { name: "Geranium", level: "face" }, { name: "Sandalwood", level: "face" }, { name: "Frankincense", level: "face" },
  { name: "Myrrh", level: "face" }, { name: "Vanilla", level: "face" }, { name: "Honey", level: "face" },
  { name: "Milk Flavor", level: "face" }, { name: "Olive", level: "face" }, { name: "Aloe vera", level: "face" },
  { name: "Pure White", level: "face" }, { name: "Floral Harmony", level: "face" }, { name: "None", level: "face" },

  // Body-safe
  { name: "Lemon", level: "body" }, { name: "Orange", level: "body" }, { name: "Orange Sweet", level: "body" },
  { name: "Grapefruit", level: "body" }, { name: "Rosemary", level: "body" }, { name: "Cedarwood", level: "body" },
  { name: "Fir", level: "body" }, { name: "Pine", level: "body" }, { name: "Verbena", level: "body" },
  { name: "Kumquats", level: "body" }, { name: "Pineapple", level: "body" }, { name: "Grape", level: "body" },
  { name: "Strawberry", level: "body" }, { name: "Apple", level: "body" }, { name: "Mango", level: "body" },
  { name: "Peach", level: "body" }, { name: "Tea", level: "body" }, { name: "Coffee", level: "body" },
  { name: "Chocolate", level: "body" }, { name: "Coconut", level: "body" },

  // Strong / perfume
  { name: "Mint", level: "strong" }, { name: "Peppermint", level: "strong" }, { name: "Spearmint", level: "strong" },
  { name: "Tea Tree", level: "strong" }, { name: "Eucalyptus", level: "strong" }, { name: "Ylang Ylang", level: "strong" },
  { name: "Patchouli", level: "strong" }, { name: "Clove", level: "strong" }, { name: "Cinnamon", level: "strong" },
  { name: "Ginger", level: "strong" }, { name: "Cotronella", level: "strong" }, { name: "Aldehydic Floral", level: "strong" },
  { name: "Leau Dissey", level: "strong" }, { name: "BlueBell", level: "strong" }
];


// ===== Powders Array =====
const powders = [
  { name: "Beetroot Powder", faceSafe: true, bodySafe: true },
  { name: "Carrot Powder", faceSafe: true, bodySafe: true },
  { name: "Cassava Powder", faceSafe: true, bodySafe: true },
  { name: "Sweet Potato Powder", faceSafe: true, bodySafe: true },
  { name: "Ube Powder", faceSafe: true, bodySafe: true },
  { name: "Taro Powder", faceSafe: true, bodySafe: true }
];

// ===== Populate Oil, Fragrance & Powder Lists =====
function populateLists() {
  const oilList = document.getElementById("oilList");
  const meltOilList = document.getElementById("meltOilList");
  const fragranceList = document.getElementById("fragranceList");
  const meltFragranceList = document.getElementById("meltFragranceList");
  const powderList = document.getElementById("powderList");         // Cold Process powders
  const meltPowderList = document.getElementById("meltPowderList"); // Melt & Pour powders

  // ===== Oils =====
  oils.forEach((oil, i) => {
    let safetyText = oil.faceSafe && oil.bodySafe ? "Safe for Face & Body" :
                     oil.faceSafe ? "Face Safe" :
                     "Body Safe";

    const label = `<label class="${oil.faceSafe ? 'face-safe' : 'body-safe'}">
                     <input type="checkbox" value="${i}"> ${oil.name} — <em>${safetyText}</em>
                   </label>`;
    oilList.innerHTML += label;
    meltOilList.innerHTML += label;
  });

  // ===== Fragrances =====
  fragrances.forEach((f, i) => {
    let safetyText = f.level === "face" ? "Face Safe" :
                     f.level === "body" ? "Body Safe" :
                     "Strong / Perfume";

    const label = `<label class="${f.level}">
                     <input type="checkbox" value="${i}"> ${f.name} — <em>${safetyText}</em>
                   </label>`;
    fragranceList.innerHTML += label;
    meltFragranceList.innerHTML += label;
  });

  // ===== Powders =====
  powders.forEach((p, i) => {
    let safetyText = p.faceSafe && p.bodySafe ? "Safe for Face & Body" :
                     p.faceSafe ? "Face Safe" :
                     "Body Safe";

    const label = `<label class="${p.faceSafe ? 'face-safe' : 'body-safe'}">
                     <input type="checkbox" value="${i}"> ${p.name} — <em>${safetyText}</em>
                   </label>`;
    if (powderList) powderList.innerHTML += label;
    if (meltPowderList) meltPowderList.innerHTML += label;
  });
}

// Call once to populate all lists
populateLists();

// ===== Filter Oils & Fragrances by Soap Type =====
function filterBySoapType() {
  const soapType = document.querySelector('input[name="soapType"]:checked').value;

  // Oils
  document.querySelectorAll('#oilList label').forEach(label => {
    const idx = label.querySelector('input').value;
    if (soapType === "face" && !oils[idx].faceSafe) {
      label.style.display = "none";
      label.querySelector('input').checked = false;
    } else {
      label.style.display = "block";
    }
  });

  // Fragrances
  document.querySelectorAll('#fragranceList label').forEach(label => {
    const idx = label.querySelector('input').value;
    const level = fragrances[idx].level;
    if ((soapType === "face" && (level === "body" || level === "strong")) ||
      (soapType === "body" && level === "strong")) {
      label.style.display = "none";
      label.querySelector('input').checked = false;
    } else {
      label.style.display = "block";
    }
  });
}

// ===== Event Listener =====
document.querySelectorAll('input[name="soapType"]').forEach(radio => {
  radio.addEventListener('change', filterBySoapType);
});

// Call once on load
filterBySoapType();

// ===== Cold Process Calculator =====
function generate() {
  let amount = parseFloat(document.getElementById("amount").value);
  const unit = document.getElementById("unit").value;
  if (!amount || amount <= 0) return alert("Enter valid amount");
  if (unit === "kg") amount *= 1000;
  if (unit === "bar") amount *= 100;

  const soapType = document.querySelector('input[name="soapType"]:checked').value;
  let superfat = (soapType === 'face' || soapType === 'both') ? 0.08 : 0.05;
  let fragrancePercent = (soapType === 'face' || soapType === 'both') ? 0.015 : 0.025;

  const selectedOils = [...document.querySelectorAll('#oilList input:checked')];
  if (selectedOils.length === 0) return alert("Select at least one oil");
  if (soapType === 'face' || soapType === 'both') {
    const invalidOils = selectedOils.filter(box => !oils[box.value].faceSafe);
    if (invalidOils.length > 0) return alert("⚠️ Some selected oils are NOT safe for face soap!");
  }

  const selectedFragrances = [...document.querySelectorAll('#fragranceList input:checked')];
  if (soapType === 'face' || soapType === 'both') {
    const invalidFrags = selectedFragrances.filter(box => fragrances[box.value].level === 'body' || fragrances[box.value].level === 'strong');
    if (invalidFrags.length > 0) return alert("⚠️ Some selected fragrances are NOT safe for face soap!");
  }

  const selectedPowders = [...document.querySelectorAll('#powderList input:checked')];

  const oilWeight = amount / selectedOils.length;
  let lye = 0, oilText = "";
  selectedOils.forEach(box => {
    const oil = oils[box.value];
    lye += oilWeight * oil.sap;
    oilText += `${oil.name}: ${oilWeight.toFixed(1)} g<br>`;
  });
  lye *= (1 - superfat);
  const water = amount * 0.33;

  let fragranceText = "", fragranceAmount = amount * fragrancePercent;
  if (selectedFragrances.length > 0) {
    const perF = fragranceAmount / selectedFragrances.length;
    selectedFragrances.forEach(box => fragranceText += `${fragrances[box.value].name}: ${perF.toFixed(1)} g<br>`);
  } else fragranceText = "None";

  let powderText = "";
  if (selectedPowders.length > 0) {
    const perP = amount * 0.02 / selectedPowders.length; // Example: 2% each powder
    selectedPowders.forEach(box => powderText += `${powders[box.value].name}: ${perP.toFixed(1)} g<br>`);
  } else powderText = "None";

  const times = estimateColdTime(amount, selectedOils.map(b => b.value));
  const name1 = document.getElementById("name1").value;

  document.getElementById("result").innerHTML = `
    <strong>Title Soap:</strong> ${name1}<br><br>
    <strong>Total Soap:</strong> ${amount.toFixed(1)} g<br><br>
    <strong>Oils Used:</strong><br>${oilText}<br>
    <strong>Lye (NaOH):</strong> ${lye.toFixed(1)} g<br>
    <strong>Water:</strong> ${water.toFixed(1)} g<br>
    <strong>Fragrances:</strong><br>${fragranceText}<br>
    <strong>Powders:</strong><br>${powderText}<br>
    <strong>Superfat:</strong> ${(superfat * 100).toFixed(1)}%<br>
    <strong>Soap Type:</strong> ${soapType.charAt(0).toUpperCase() + soapType.slice(1)}<br>
    <strong>Estimated Trace Time:</strong> ${times.trace} min<br>
    <strong>Estimated Set Time:</strong> ${times.set} h<br>
    <strong>Estimated Cure Time:</strong> ${times.cure} days<br>
  `;
}

// ===== Melt & Pour Calculator =====
function generateMelt() {
  let amount = parseFloat(document.getElementById("meltAmount").value);
  const unit = document.getElementById("meltUnit").value;
  if (!amount || amount <= 0) return alert("Enter a valid soap base amount");
  if (unit === "kg") amount *= 1000;
  if (unit === "bar") amount *= 100;

  const soapType = document.querySelector('input[name="meltSoapType"]:checked').value;
  const fragrancePercent = (soapType === 'face' || soapType === 'both') ? 0.01 : 0.02;

  const selectedFragrances = [...document.querySelectorAll('#meltFragranceList input:checked')];
  if (soapType === 'face' || soapType === 'both') {
    const invalidFrags = selectedFragrances.filter(box => fragrances[box.value].level === 'body' || fragrances[box.value].level === 'strong');
    if (invalidFrags.length > 0) return alert("⚠️ Some selected fragrances are NOT safe for face soap!");
  }

  const selectedOils = [...document.querySelectorAll('#meltOilList input:checked')];
  const selectedPowders = [...document.querySelectorAll('#meltPowderList input:checked')];

  let oilText = "";
  const oilPercent = 0.03;
  if (selectedOils.length > 0) {
    selectedOils.forEach(box => {
      const oil = oils[box.value];
      const oilWeight = amount * oilPercent;
      oilText += `${oil.name}: ${oilWeight.toFixed(1)} g<br>`;
    });
  } else oilText = "None";

  let powderText = "";
  const powderPercent = 0.02; // Example: 2% of base per powder
  if (selectedPowders.length > 0) {
    selectedPowders.forEach(box => {
      const powderWeight = amount * powderPercent;
      powderText += `${powders[box.value].name}: ${powderWeight.toFixed(1)} g<br>`;
    });
  } else powderText = "None";

  let fragranceText = "";
  if (selectedFragrances.length > 0) {
    const perF = (amount * fragrancePercent) / selectedFragrances.length;
    selectedFragrances.forEach(box => fragranceText += `${fragrances[box.value].name}: ${perF.toFixed(1)} g<br>`);
  } else fragranceText = "None";

  const { meltTime, coolTime } = estimateMeltTimes(amount);
  const name1 = document.getElementById("name1").value;

  document.getElementById("meltResult").innerHTML = `
    <strong>Title Soap :</strong> ${name1}<br>
    <strong>Total Soap Base:</strong> ${amount.toLocaleString()} g<br>
    <strong>Soap Type:</strong> ${soapType.charAt(0).toUpperCase() + soapType.slice(1)}<br>
    <strong>Add-in Oils (~3% each):</strong><br>${oilText}<br>
    <strong>Add-in Powders (~2% each):</strong><br>${powderText}<br>
    <strong>Fragrances (safe max ${(fragrancePercent * 100).toFixed(1)}%):</strong><br>${fragranceText}<br>
    <strong>Estimated Melt Time:</strong> ${meltTime}<br>
    <strong>Estimated Cooling Time:</strong> ${coolTime}<br>
    <em>Melt & Pour is already saponified</em>
  `;
}

// ===== Filter Melt Oils & Fragrances =====
function filterMeltBySoapType() {
  const soapType = document.querySelector('input[name="meltSoapType"]:checked').value;

  document.querySelectorAll('#meltOilList label').forEach(label => {
    const idx = label.querySelector('input').value;
    if (soapType === "face" && !oils[idx].faceSafe) {
      label.style.display = "none";
      label.querySelector('input').checked = false;
    } else {
      label.style.display = "block";
    }
  });

  document.querySelectorAll('#meltFragranceList label').forEach(label => {
    const idx = label.querySelector('input').value;
    const level = fragrances[idx].level;
    if ((soapType === "face" && (level === "body" || level === "strong")) ||
        (soapType === "body" && level === "strong")) {
      label.style.display = "none";
      label.querySelector('input').checked = false;
    } else {
      label.style.display = "block";
    }
  });
}

// ===== Event Listeners =====
document.querySelectorAll('input[name="meltSoapType"]').forEach(radio => {
  radio.addEventListener('change', filterMeltBySoapType);
});

// Call once on load
filterMeltBySoapType();

// ===== Cold Process Powder Search =====
function searchColdPowders() {
  const query = document.getElementById("searchPowder").value.toLowerCase();
  document.querySelectorAll('#powderList label').forEach(label => {
    label.style.display = label.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
}

// ===== Melt & Pour Powder Search =====
function searchMeltPowders() {
  const query = document.getElementById("searchPowderMelt").value.toLowerCase();
  document.querySelectorAll('#meltPowderList label').forEach(label => {
    label.style.display = label.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
}


// ===== Helpers =====
function estimateColdTime(amount, oilsSelected) {
  let fastTraceOils = oilsSelected.filter(i => ["Coconut Oil", "Palm Oil", "Palm Kernel Oil", "Babassu Oil"].includes(oils[i].name));
  let trace = Math.max(5, 20 - fastTraceOils.length * 5) * amount / 500;
  let setTime = 24 + (amount / 500) * 12;
  let cureTime = 28 + (amount / 500) * 2;
  return { trace: Math.round(trace), set: Math.round(setTime), cure: Math.round(cureTime) };
}

function estimateMeltTimes(amount) {
  let meltTime = "", coolTime = "";
  if (amount < 100) { meltTime = "20–30 sec per interval, total ~20–60 sec"; coolTime = "10–20 min"; }
  else if (amount < 500) { meltTime = "30–60 sec per interval"; coolTime = "15–30 min"; }
  else if (amount < 5000) { meltTime = "5–10 min (double boiler)"; coolTime = "30–60 min"; }
  else if (amount < 50000) { meltTime = "15–30 min (double boiler, stir often)"; coolTime = "1–2 hours"; }
  else if (amount < 500000) { meltTime = "30–60 min (industrial double boiler)"; coolTime = "2–4 hours"; }
  else if (amount < 5000000) { meltTime = "1–3 hours (industrial setup)"; coolTime = "4–8 hours"; }
  else if (amount < 50000000) { meltTime = "3–6 hours (industrial, stir continuously)"; coolTime = "8–24 hours"; }
  else { meltTime = "⚠️ Extremely large batch, use industrial equipment"; coolTime = "⚠️ Cooling time varies, could take 1+ days"; }
  return { meltTime, coolTime };
}

// ===== Copy & Clear Functions =====
function copyResult() { const text = document.getElementById("result").innerText; navigator.clipboard.writeText(text); document.getElementById("btncopy").innerHTML = " ✅"; setTimeout(() => { document.getElementById("btncopy").innerHTML = " 📋"; }, 2000); }
function clearForm() { document.getElementById("name1").value = ""; document.getElementById("amount").value = ""; document.getElementById("unit").value = "g"; document.querySelector('input[name="soapType"][value="face"]').checked = true; document.querySelectorAll('#oilList input').forEach(box => box.checked = false); document.querySelectorAll('#fragranceList input').forEach(box => box.checked = false); document.getElementById("result").innerHTML = "No calculation yet."; document.querySelectorAll('#oilList label').forEach(label => label.style.display = 'block'); }

function copyMeltResult() { const text = document.getElementById("meltResult").innerText; navigator.clipboard.writeText(text); document.getElementById("meltBtnCopy").innerHTML = " ✅"; setTimeout(() => { document.getElementById("meltBtnCopy").innerHTML = " 📋"; }, 2000); }
function clearMeltForm() { document.getElementById("meltAmount").value = ""; document.getElementById("meltUnit").value = "g"; document.querySelector('input[name="meltSoapType"][value="face"]').checked = true; document.querySelectorAll('#meltFragranceList input').forEach(box => box.checked = false); document.querySelectorAll('#meltOilList input').forEach(box => box.checked = false); document.getElementById("meltResult").innerHTML = "No calculation yet."; }

// ===== Toggle Tabs =====
function showProcess(type, event) { document.querySelectorAll(".process").forEach(p => p.classList.remove("active")); document.querySelectorAll(".toggle").forEach(b => b.classList.remove("active")); document.getElementById(type).classList.add("active"); event.target.classList.add("active"); }

// ===== Search =====
function searchColdOils() { const query = document.getElementById("searchZZ").value.toLowerCase(); document.querySelectorAll('#oilList label').forEach(label => { label.style.display = label.textContent.toLowerCase().includes(query) ? 'block' : 'none'; }); }
function searchColdFragrances() { const query = document.getElementById("searchInput2").value.toLowerCase(); document.querySelectorAll('#fragranceList label').forEach(label => { label.style.display = label.textContent.toLowerCase().includes(query) ? 'block' : 'none'; }); }
function searchMeltOils() { const query = document.getElementById("searchZZMelt").value.toLowerCase(); document.querySelectorAll('#meltOilList label').forEach(label => { label.style.display = label.textContent.toLowerCase().includes(query) ? 'block' : 'none'; }); }
function searchMeltFragrances() { const query = document.getElementById("searchInput2Melt").value.toLowerCase(); document.querySelectorAll('#meltFragranceList label').forEach(label => { label.style.display = label.textContent.toLowerCase().includes(query) ? 'block' : 'none'; }); }


