
// Oils & Fragrances (Cold Process + Melt & Pour)
const oils = [
  {name:"Olive Oil", sap:0.134, faceSafe:true}, 
  {name:"Coconut Oil", sap:0.183, faceSafe:false},
  {name:"Palm Oil", sap:0.141, faceSafe:false},
  {name:"Shea Butter", sap:0.128, faceSafe:true},
  {name:"Castor Oil", sap:0.128, faceSafe:true},
  {name:"Sunflower Oil", sap:0.135, faceSafe:true},
  {name:"Sweet Almond Oil", sap:0.136, faceSafe:true},
  {name:"Avocado Oil", sap:0.133, faceSafe:true},
  {name:"Rice Bran Oil", sap:0.128, faceSafe:true},
  {name:"Grapeseed Oil", sap:0.135, faceSafe:true},
  {name:"Canola Oil", sap:0.124, faceSafe:true},
  {name:"Soybean Oil", sap:0.135, faceSafe:true},
  {name:"Corn Oil", sap:0.137, faceSafe:true},
  {name:"Safflower Oil", sap:0.136, faceSafe:true},
  {name:"Sesame Oil", sap:0.133, faceSafe:true},
  {name:"Walnut Oil", sap:0.135, faceSafe:true},
  {name:"Hazelnut Oil", sap:0.136, faceSafe:true},
  {name:"Macadamia Oil", sap:0.139, faceSafe:true},
  {name:"Palm Kernel Oil", sap:0.156, faceSafe:false},
  {name:"Babassu Oil", sap:0.175, faceSafe:false},
  {name:"Cocoa Butter", sap:0.137, faceSafe:true},
  {name:"Mango Butter", sap:0.128, faceSafe:true},
  {name:"Lard", sap:0.138, faceSafe:false},
  {name:"Tallow", sap:0.141, faceSafe:false},
  {name:"Neem Oil", sap:0.139, faceSafe:true},
  {name:"Hemp Seed Oil", sap:0.136, faceSafe:true},
  {name:"Jojoba Oil", sap:0.066, faceSafe:true},
  {name:"Apricot Kernel Oil", sap:0.135, faceSafe:true},
  {name:"Pumpkin Seed Oil", sap:0.135, faceSafe:true},
  {name:"Camellia Oil", sap:0.136, faceSafe:true}
];

const fragrances = [
  "Lavender","Rose","Lemon","Orange","Mint","Tea Tree","Jasmine","Ylang Ylang",
  "Eucalyptus","Peppermint","Spearmint","Patchouli","Sandalwood","Vanilla",
  "Chamomile","Geranium","Clary Sage","Lemongrass","Orange Sweet","Grapefruit",
  "Rosemary","Cedarwood","Fir","Pine","Clove","Cinnamon","Ginger","Frankincense",
  "Myrrh","Tea","Coffee","Coconut","Chocolate","Strawberry","Apple","Mango","Peach","None"
];

// Populate Cold Process oils
const oilList = document.getElementById("oilList");
oils.forEach((oil,i)=>{
  let className = oil.faceSafe ? "face-safe" : "non-face-safe";
  oilList.innerHTML += `<label class="${className}"><input type="checkbox" value="${i}"> ${oil.name}</label>`;
});
 const name = document.getElementById("name1").value;
// Populate Cold & Melt Fragrances
const fragranceList = document.getElementById("fragranceList");
const meltFragranceList = document.getElementById("meltFragranceList");
fragrances.forEach((f,i)=>{
  const html = `<label><input type="checkbox" value="${i}"> ${f}</label>`;
  fragranceList.innerHTML += html;
  meltFragranceList.innerHTML += html;
});

// Populate Melt & Pour Oils
const meltOilListContainer = document.createElement('div');
meltOilListContainer.className = 'grid';
meltOilListContainer.id = 'meltOilList';
document.querySelector('#melt .section:nth-of-type(2)').insertAdjacentHTML('beforeend','<h3>Select Oils (Optional)</h3>');
document.querySelector('#melt .section:nth-of-type(2)').appendChild(meltOilListContainer);

const meltOilList = document.getElementById("meltOilList");
oils.forEach((oil,i)=>{
  if(oil.faceSafe){ // only safe oils for Melt & Pour
    meltOilList.innerHTML += `<label class="face-safe">
      <input type="checkbox" value="${i}"> ${oil.name}
    </label>`;
  }
});

// Enforce face-safe oils for Cold Process
document.querySelectorAll('input[name="soapType"]').forEach(radio=>{
  radio.addEventListener('change', ()=>{
    const soapType = document.querySelector('input[name="soapType"]:checked').value;
    document.querySelectorAll('#oilList label').forEach(label=>{
      const idx = label.querySelector('input').value;
      if((soapType==='face'||soapType==='both') && !oils[idx].faceSafe){
        label.style.display='none';
        label.querySelector('input').checked=false;
      } else label.style.display='block';
    });
  });
});

// Dynamic Time Calculators
function estimateColdTime(amount, oilsSelected) {
  // Trace time (depends on fast-trace oils)
  let fastTraceOils = oilsSelected.filter(i => ["Coconut Oil","Palm Oil","Palm Kernel Oil","Babassu Oil"].includes(oils[i].name));
  let baseTrace = 20; // 20 min base
  let trace = baseTrace - fastTraceOils.length * 5;
  if(trace < 5) trace = 5;
  trace *= amount/500; // scale with batch size

  // Set time
  let setTime = 24 + (amount/500)*12; // hours

  // Cure time
  let cureTime = 28 + (amount/500)*2; // days

  return {trace: Math.round(trace), set: Math.round(setTime), cure: Math.round(cureTime)};
}

function estimateMeltTime(amount) {
  let melt = 0;
  let cool = 0;
  if(amount < 100){ melt = 1; cool = 10; }
  else if(amount < 300){ melt = 2; cool = 15; }
  else if(amount < 500){ melt = 3; cool = 20; }
  else { melt = 5; cool = 30; }
  return {melt: melt, cool: cool};
}

// Cold Process Calculator

function generate(){
  let amount = parseFloat(document.getElementById("amount").value);
  const unit = document.getElementById("unit").value;
  if(!amount || amount<=0) return alert("Enter valid amount");
  if(unit==="kg") amount *=1000;
  if(unit==="bar") amount *=100;

  const soapType = document.querySelector('input[name="soapType"]:checked').value;
  let superfat = (soapType==='face'||soapType==='both') ? 0.08 : 0.05;
  let fragrancePercent = (soapType==='face'||soapType==='both') ? 0.015 : 0.025;

  const selectedOils = [...document.querySelectorAll('#oilList input:checked')];
  if(selectedOils.length===0) return alert("Select at least one oil");

  if(soapType==='face'||soapType==='both'){
    const invalid = selectedOils.filter(box=>!oils[box.value].faceSafe);
    if(invalid.length>0) return alert("⚠️ Some selected oils are NOT safe for face soap!");
  }

  const oilWeight = amount/selectedOils.length;
  let lye=0, oilText="";
  selectedOils.forEach(box=>{
    const oil = oils[box.value];
    lye += oilWeight*oil.sap;
    oilText += `${oil.name}: ${oilWeight.toFixed(1)} g<br>`;
  });
  lye *= (1-superfat);
  const water = amount*0.33;

  const selectedFragrances = [...document.querySelectorAll('#fragranceList input:checked')];
  let fragranceText="", fragranceAmount = amount*fragrancePercent;
  if(selectedFragrances.length>0){
    const perF = fragranceAmount/selectedFragrances.length;
    selectedFragrances.forEach(box=>{
      fragranceText += `${fragrances[box.value]}: ${perF.toFixed(1)} g<br>`;
    });
  } else fragranceText="None";

  const times = estimateColdTime(amount, selectedOils.map(b=>b.value));
 const name1 = document.getElementById("name1").value;
  document.getElementById("result").innerHTML=`
    <strong>Title Soap:</strong> ${name1}<br><br>
    <strong>Total Soap:</strong> ${amount.toFixed(1)} g<br><br>
    <strong>Oils Used:</strong><br>${oilText}<br>
    <strong>Lye (NaOH):</strong> ${lye.toFixed(1)} g<br>
    <strong>Water:</strong> ${water.toFixed(1)} g<br>
    <strong>Fragrances:</strong><br>${fragranceText}<br>
    <strong>Superfat:</strong> ${(superfat*100).toFixed(1)}%<br>
    <strong>Soap Type:</strong> ${soapType.charAt(0).toUpperCase()+soapType.slice(1)}<br>
    <strong>Estimated Trace Time:</strong> ${times.trace} min<br>
    <strong>Estimated Set Time:</strong> ${times.set} h<br>
    <strong>Estimated Cure Time:</strong> ${times.cure} days<br>
  `;
}

function copyResult(){
  const text = document.getElementById("result").innerText;
  const btncopy = document.getElementById("btncopy");
  navigator.clipboard.writeText(text);
  btncopy.innerHTML=" ✅";
  setTimeout(()=>{btncopy.innerHTML=" 📋";},2000);
}

function clearForm(){
  document.getElementById("name1").value="";
  document.getElementById("amount").value="";
  document.getElementById("unit").value="g";
  document.querySelector('input[name="soapType"][value="face"]').checked=true;
  document.querySelectorAll('#oilList input').forEach(box=>box.checked=false);
  document.querySelectorAll('#fragranceList input').forEach(box=>box.checked=false);
  document.getElementById("result").innerHTML="No calculation yet.";
  document.querySelectorAll('#oilList label').forEach(label=>label.style.display='block');
}

// Melt & Pour Calculator

function generateMelt() {
  let amount = parseFloat(document.getElementById("meltAmount").value);
  const unit = document.getElementById("meltUnit").value;
  if (!amount || amount <= 0) return alert("Enter a valid soap base amount");

  if (unit === "kg") amount *= 1000;
  if (unit === "bar") amount *= 100;

  const soapType = document.querySelector('input[name="meltSoapType"]:checked').value;
  const fragrancePercent = (soapType === 'face' || soapType === 'both') ? 0.01 : 0.02; // safe max 1% face, 2% body

  // Fragrance calculation
  const selectedFragrances = [...document.querySelectorAll('#meltFragranceList input:checked')];
  let fragranceText = "", fragranceAmount = amount * fragrancePercent;
  if (selectedFragrances.length > 0) {
    const perF = fragranceAmount / selectedFragrances.length;
    selectedFragrances.forEach(box => {
      fragranceText += `${fragrances[box.value]}: ${perF.toFixed(1)} g<br>`;
    });
  } else fragranceText = "None";

  // Oils calculation
  const selectedOils = [...document.querySelectorAll('#meltOilList input:checked')];
  let oilText = "";
  const oilPercent = 0.03; // 3% per oil
  if (selectedOils.length > 0) {
    selectedOils.forEach(box => {
      const oil = oils[box.value];
      const oilWeight = amount * oilPercent;
      oilText += `${oil.name}: ${oilWeight.toFixed(1)} g<br>`;
    });
  } else oilText = "None";

  // Dynamic melt and cooling times
  let meltTime = "";
  let coolTime = "";

  if (amount < 100) {           // tiny batch < 100 g
    meltTime = "20–30 sec per interval, total ~20–60 sec";
    coolTime = "10–20 min";
  } else if (amount < 500) {    // small batch 100–500 g
    meltTime = "30–60 sec per interval";
    coolTime = "15–30 min";
  } else if (amount < 5000) {   // 0.5–5 kg
    meltTime = "5–10 min (double boiler)";
    coolTime = "30–60 min";
  } else if (amount < 50000) {  // 5–50 kg
    meltTime = "15–30 min (double boiler, stir often)";
    coolTime = "1–2 hours";
  } else if (amount < 500000) { // 50–500 kg
    meltTime = "30–60 min (industrial double boiler)";
    coolTime = "2–4 hours";
  } else if (amount < 5000000) { // 0.5–5 tons
    meltTime = "1–3 hours (industrial setup)";
    coolTime = "4–8 hours";
  } else if (amount < 50000000) { // 5–50 tons
    meltTime = "3–6 hours (industrial, stir continuously)";
    coolTime = "8–24 hours";
  } else {                       // >50 tons
    meltTime = "⚠️ Extremely large batch, use specialized industrial equipment";
    coolTime = "⚠️ Cooling time depends on equipment, could take 1+ days";
  }

  // Render results
  const name1 = document.getElementById("name1").value;
  document.getElementById("meltResult").innerHTML = `
  <strong>Title Soap :</strong> ${name1} <br>
    <strong>Total Soap Base:</strong> ${amount.toLocaleString()} g<br>
    <strong>Soap Type:</strong> ${soapType.charAt(0).toUpperCase() + soapType.slice(1)}<br>
    <strong>Add-in Oils (~3% each):</strong><br>${oilText}<br>
    <strong>Fragrances (safe max ${fragrancePercent*100}%):</strong><br>${fragranceText}<br>
    <strong>Estimated Melt Time:</strong> ${meltTime}<br>
    <strong>Estimated Cooling Time:</strong> ${coolTime}<br>
    <em>Melt & Pour is already saponified</em>
  `;
}


function copyMeltResult() {
  const text = document.getElementById("meltResult").innerText;
  const btn = document.getElementById("meltBtnCopy");
  navigator.clipboard.writeText(text);
  btn.innerHTML = " ✅";
  setTimeout(() => { btn.innerHTML = " 📋"; }, 2000);
}

function clearMeltForm() {
  document.getElementById("meltAmount").value = "";
  document.getElementById("meltUnit").value = "g";
  document.querySelector('input[name="meltSoapType"][value="face"]').checked = true;
  document.querySelectorAll('#meltFragranceList input').forEach(box => box.checked = false);
  document.querySelectorAll('#meltOilList input').forEach(box => box.checked = false);
  document.getElementById("meltResult").innerHTML = "No calculation yet.";
}


// Toggle Process
function showProcess(type,event){
  document.querySelectorAll(".process").forEach(p=>p.classList.remove("active"));
  document.querySelectorAll(".toggle").forEach(b=>b.classList.remove("active"));
  document.getElementById(type).classList.add("active");
  event.target.classList.add("active");
}
