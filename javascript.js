// Oils with face-safe property
const oils = [
  {name:"Olive Oil", sap:0.134, faceSafe:true}, {name:"Coconut Oil", sap:0.183, faceSafe:false}, {name:"Palm Oil", sap:0.141, faceSafe:false},
  {name:"Shea Butter", sap:0.128, faceSafe:true}, {name:"Castor Oil", sap:0.128, faceSafe:true}, {name:"Sunflower Oil", sap:0.135, faceSafe:true},
  {name:"Sweet Almond Oil", sap:0.136, faceSafe:true}, {name:"Avocado Oil", sap:0.133, faceSafe:true}, {name:"Rice Bran Oil", sap:0.128, faceSafe:true},
  {name:"Grapeseed Oil", sap:0.135, faceSafe:true}, {name:"Canola Oil", sap:0.124, faceSafe:true}, {name:"Soybean Oil", sap:0.135, faceSafe:true},
  {name:"Corn Oil", sap:0.137, faceSafe:true}, {name:"Safflower Oil", sap:0.136, faceSafe:true}, {name:"Sesame Oil", sap:0.133, faceSafe:true},
  {name:"Walnut Oil", sap:0.135, faceSafe:true}, {name:"Hazelnut Oil", sap:0.136, faceSafe:true}, {name:"Macadamia Oil", sap:0.139, faceSafe:true},
  {name:"Palm Kernel Oil", sap:0.156, faceSafe:false}, {name:"Babassu Oil", sap:0.175, faceSafe:false}, {name:"Cocoa Butter", sap:0.137, faceSafe:true},
  {name:"Mango Butter", sap:0.128, faceSafe:true}, {name:"Lard", sap:0.138, faceSafe:false}, {name:"Tallow", sap:0.141, faceSafe:false},
  {name:"Neem Oil", sap:0.139, faceSafe:true}, {name:"Hemp Seed Oil", sap:0.136, faceSafe:true}, {name:"Jojoba Oil", sap:0.066, faceSafe:true},
  {name:"Apricot Kernel Oil", sap:0.135, faceSafe:true}, {name:"Pumpkin Seed Oil", sap:0.135, faceSafe:true}, {name:"Camellia Oil", sap:0.136, faceSafe:true}
];

// Fragrances
const fragrances = [
  "Lavender","Rose","Lemon","Orange","Mint","Tea Tree","Jasmine","Ylang Ylang",
  "Eucalyptus","Peppermint","Spearmint","Patchouli","Sandalwood","Vanilla",
  "Chamomile","Geranium","Clary Sage","Lemongrass","Orange Sweet","Grapefruit",
  "Rosemary","Cedarwood","Fir","Pine","Clove","Cinnamon","Ginger","Frankincense",
  "Myrrh","Tea","Coffee","Coconut","Chocolate","Strawberry","Apple","Mango","Peach","None"
];

// Populate oil list
const oilList = document.getElementById("oilList");
oils.forEach((oil, i) => {
  let className = oil.faceSafe ? "face-safe" : "non-face-safe";
  oilList.innerHTML += `<label class="${className}"><input type="checkbox" value="${i}"> ${oil.name}</label>`;
});

// Populate fragrance list
const fragranceList = document.getElementById("fragranceList");
fragrances.forEach((fragrance, i) => {
  fragranceList.innerHTML += `<label><input type="checkbox" value="${i}"> ${fragrance}</label>`;
});

// Enforce face-safe oils dynamically
document.querySelectorAll('input[name="soapType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const soapType = document.querySelector('input[name="soapType"]:checked').value;
    document.querySelectorAll('#oilList label').forEach(label => {
      const idx = label.querySelector('input').value;
      if((soapType === 'face' || soapType === 'both') && !oils[idx].faceSafe) {
        label.style.display = 'none'; // hide unsafe oils
        label.querySelector('input').checked = false; // uncheck if previously selected
      } else {
        label.style.display = 'block';
      }
    });
  });
});

// Generate soap recipe
function generate() {
  let amount = parseFloat(document.getElementById("amount").value);
  const unit = document.getElementById("unit").value;
  if (!amount || amount <= 0) return alert("Enter a valid soap amount");

  if(unit==="kg") amount *=1000;
  if(unit==="bar") amount *=100;

  const soapType = document.querySelector('input[name="soapType"]:checked').value;
  let superfat = (soapType === "face" || soapType === "both") ? 0.08 : 0.05;
  let fragrancePercent = (soapType === "face" || soapType === "both") ? 0.015 : 0.025;

  const selectedOils = [...document.querySelectorAll('#oilList input:checked')];
  if(selectedOils.length === 0) return alert("Select at least one oil");

  // Extra safety check (in case JS disabled hiding)
  if(soapType === "face" || soapType === "both") {
    const invalidOils = selectedOils.filter(box => !oils[box.value].faceSafe);
    if(invalidOils.length > 0) {
      return alert("⚠️ Some selected oils are NOT safe for face soap!");
    }
  }

  const oilWeight = amount / selectedOils.length;
  let lye = 0, oilText = "";
  selectedOils.forEach(box => {
    const oil = oils[box.value];
    lye += oilWeight * oil.sap;
    oilText += `${oil.name}: ${oilWeight.toFixed(1)} g<br>`;
  });
  lye *= (1 - superfat);
  const water = amount * 0.33;

  // Fragrance
  const selectedFragrances = [...document.querySelectorAll('#fragranceList input:checked')];
  let fragranceText = "", fragranceAmount = amount * fragrancePercent;
  if(selectedFragrances.length > 0) {
    const perFragrance = fragranceAmount / selectedFragrances.length;
    selectedFragrances.forEach(box => {
      fragranceText += `${fragrances[box.value]}: ${perFragrance.toFixed(1)} g<br>`;
    });
  } else fragranceText = "None";

  // Display result
  document.getElementById("result").innerHTML = `
    <strong>Total Soap:</strong> ${amount.toFixed(1)} g<br><br>
    <strong>Oils Used:</strong><br>${oilText}<br>
    <strong>Lye (NaOH):</strong> ${lye.toFixed(1)} g<br>
    <strong>Water:</strong> ${water.toFixed(1)} g<br>
    <strong>Fragrances:</strong><br>${fragranceText}<br>
    <strong>Superfat:</strong> ${(superfat*100).toFixed(1)}%<br>
    <strong>Soap Type:</strong> ${soapType.charAt(0).toUpperCase()+soapType.slice(1)}
  `;
}

// Clear form
function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("unit").value = "g";
  document.querySelector('input[name="soapType"][value="face"]').checked = true;
  document.querySelectorAll('#oilList input').forEach(box => box.checked = false);
  document.querySelectorAll('#fragranceList input').forEach(box => box.checked = false);
  document.getElementById("result").innerHTML = "No calculation yet.";

  // Reset oil visibility
  document.querySelectorAll('#oilList label').forEach(label => label.style.display = 'block');
}
