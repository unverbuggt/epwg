var wireResistance = 1;
var roh = 1.0/56.0;

var ei_materials = document.getElementById('materials');
var ei_temperature = document.getElementById('temperature');
var ei_wire_length = document.getElementById('wire-length');
var eio_cross_section = document.getElementById('cross-section');
var ei_wire_count = document.getElementById('wire-load');
var eo_wire_resist = document.getElementById('wire-resist');
var eio_current = document.getElementById('current');
var ei_voltage = document.getElementById('voltage');
var eio_power = document.getElementById('power');
var e_cosphi_input = document.getElementById('cosphi-input');
var ei_cosphi = document.getElementById('cosphi');
var eo_wire_voltage_drop = document.getElementById('wire-voltage-drop');
var eio_vpercent_drop = document.getElementById('wire-vpercent-drop');
var eo_wire_losses = document.getElementById('wire-losses');
var eo_wire_losses_perm = document.getElementById('wire-losses-perm');

function assignMaterials() {
  let dropdown = ei_materials;
  let option;
  for (let i = 0; i < materials.length; i++) {
    option = document.createElement('option');
    option.text = materials[i].name;
    dropdown.add(option);
  }
  dropdown.selectedIndex = 0;
}

function getHash() {
  if (window.location.hash && window.location.hash.startsWith('#wire=')) {
    let values = window.location.hash.substr(6).split("/");
    ei_materials.selectedIndex = values[0];
    ei_temperature.value = values[1];
    ei_wire_length.value = values[2];
    eio_cross_section.value = values[3];
    ei_wire_count.selectedIndex = values[4];
    updateCosPhi();
    eio_current.value = values[5];
    ei_voltage.value = values[6];
    eio_power.value = values[7];
    ei_cosphi.value = values[8];
  }
}

function calcWireResistance() {
  let materialIndex = ei_materials.selectedIndex;
  let temperature = parseFloat(ei_temperature.value);
  let wire_length = parseFloat(ei_wire_length.value);
  let cross_section = parseFloat(eio_cross_section.value);
  let wire_count = parseFloat(ei_wire_count.value);
  let roh20 = materials[materialIndex].roh20;
  let alpha = materials[materialIndex].alpha;
  roh = roh20 * (1 + (alpha * (temperature - 20.0) / 1000.0));
  wireResistance = wire_count * roh * wire_length / cross_section;
  eo_wire_resist.textContent = wireResistance.toLocaleString(navigator.language, {maximumFractionDigits: 3});
  calcLosses();
}

function calcLosses() {
  let voltage = parseFloat(ei_voltage.value);
  let current = parseFloat(eio_current.value);
  let wire_length = parseFloat(ei_wire_length.value);
  let wire_vpercent_drop = eio_vpercent_drop
  let cosphi = parseFloat(ei_cosphi.value);
  
  let voltage_drop = wireResistance * current * cosphi;
  eo_wire_voltage_drop.textContent = 
    voltage_drop.toLocaleString(navigator.language, {maximumFractionDigits: 1});
  
  eio_vpercent_drop.options[0].text = 
    (voltage_drop / voltage * 100).toLocaleString(navigator.language, {maximumFractionDigits: 2});
  eio_vpercent_drop.selectedIndex = 0;
  
  eo_wire_losses.textContent = 
    (wireResistance * current * current).toLocaleString(navigator.language, {maximumFractionDigits: 0});

  eo_wire_losses_perm.textContent = 
    (wireResistance * current * current / wire_length).toLocaleString(navigator.language, {maximumFractionDigits: 0});
  
  setHash();
}

function calculateCrossSection() {
  let wire_length = parseFloat(ei_wire_length.value);
  let wire_count = parseFloat(ei_wire_count.value);
  let voltage = parseFloat(ei_voltage.value);
  let current = parseFloat(eio_current.value);
  let vpercent_drop = parseFloat(eio_vpercent_drop.value);
  if (vpercent_drop > 0) {
    eio_cross_section.value =
      (wire_count * wire_length * current * roh / vpercent_drop * 100 / voltage).toLocaleString(navigator.language, {maximumFractionDigits: 1});
  }
  calcWireResistance();
}

function updateCosPhi() {
  if (ei_wire_count.selectedIndex <= 1) { // DC
    e_cosphi_input.className += " w3-hide";
  }
  else { //AC
    e_cosphi_input.className = e_cosphi_input.className.replace(" w3-hide", "");
  }
}

function changeLoad() {
  let wire_load = ei_wire_count.selectedIndex;
  if (wire_load <= 1) { // DC
    voltage.value = 48;
    ei_cosphi.value = 1;
    ei_cosphi.disabled = true;
  }
  else if (wire_load == 2) { //AC
    voltage.value = 230;
    ei_cosphi.value = (0.9).toLocaleString(navigator.language, {maximumFractionDigits: 2});
    ei_cosphi.disabled = false;
  }
  else if (wire_load == 3) { //ThreePhase
    voltage.value = 400;
    ei_cosphi.value = (0.9).toLocaleString(navigator.language, {maximumFractionDigits: 2});
    ei_cosphi.disabled = false;
  }
  updateCosPhi();
  calcCurrent();
  calcWireResistance();
}

function calcCurrent() {
  let wire_load = ei_wire_count.selectedIndex;
  let voltage = parseFloat(ei_voltage.value);
  let cosphi = parseFloat(ei_cosphi.value);
  let power = parseFloat(eio_power.value);
  let current;
  
  if (wire_load <= 1) { // DC
    current = power * 1000.0 / voltage;
  }
  else if (wire_load == 2) { //AC
    current = power * 1000.0 / voltage / cosphi;
  }
  else if (wire_load == 3) { //ThreePhase
    current = power * 1000.0 / voltage / Math.sqrt(3) / cosphi;
  }
  eio_current.value = current.toLocaleString(navigator.language, {maximumFractionDigits: 2});
  calcLosses();
}

function calcPower() {
  let wire_load = ei_wire_count.selectedIndex;
  let voltage = parseFloat(ei_voltage.value);
  let current = parseFloat(eio_current.value);
  let cosphi = parseFloat(ei_cosphi.value);
  let power;
  
  if (wire_load <= 1) { // DC
    power = voltage * current / 1000.0;
  }
  else if (wire_load == 2) { //AC
    power = voltage * current * cosphi / 1000.0;
  }
  else if (wire_load == 3) { //ThreePhase
    power = voltage * Math.sqrt(3) * current * cosphi / 1000.0;
  }
  eio_power.value = power.toLocaleString(navigator.language, {maximumFractionDigits: 2});
  calcLosses();
}

function setHash() {
  window.location.hash = '#wire=' + ei_materials.selectedIndex 
    + '/'+ ei_temperature.value
    + '/'+ ei_wire_length.value
    + '/'+ eio_cross_section.value
    + '/'+ ei_wire_count.selectedIndex
    + '/'+ eio_current.value
    + '/'+ ei_voltage.value
    + '/'+ eio_power.value
    + '/'+ ei_cosphi.value;
}

assignMaterials();
getHash();
calcWireResistance();