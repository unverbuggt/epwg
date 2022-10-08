title: La résistance d'un conducteur

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-quarter">
    <label for="material">Matériel</label>
    <select class="w3-select w3-border w3-theme-l1" name="materials" id="materials" onChange="calcWireResistance();"></select>
  </div>
  <div class="w3-quarter">
    <label for="temperature">Température (°C)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="temperature" id="temperature" type="number" min="0" max="100" value="20" onChange="calcWireResistance();">
  </div>
  <div class="w3-quarter">
    <label for="wire-length">Longueur (m)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="wire-length" id="wire-length" type="number" min="0.01" value="10" onChange="calcWireResistance();">
  </div>
  <div class="w3-quarter">
    <label for="cross-section">Coupe transversale (mm²)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="cross-section" id="cross-section" type="number" min="0.1" value="1.5" onChange="calcWireResistance();">
  </div>
</div>

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-quarter">
    <label for="wire-load">Charge</label>
    <select class="w3-select w3-border w3-theme-l1" name="wire-load" id="wire-load" onChange="changeLoad();">
      <option value="1">Seul conducteur</option>
      <option value="2">Courant continu</option>
      <option value="2" selected>Courant alternatif</option>
      <option value="1.732">Courant triphasé</option>
    </select>
  </div>
  <div class="w3-quarter">
    <label for="wire-resist">Résistance (Ohm)</label>
    <pre style="margin-top: 0px !important; margin-bottom: 0px !important;"><code id="wire-resist" name="wire-resist"></code></pre>
  </div>
</div>

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-quarter">
    <label for="current">Courant (A)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="current" id="current" type="number" min="0" value="12.1" onChange="calcPower();">
  </div>
  <div class="w3-quarter">
    <label for="voltage">Tension (V)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="voltage" id="voltage" type="number" min="0" value="230" onChange="calcPower();">
  </div>
  <div class="w3-quarter">
    <label for="power">Puissance (kW)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="power" id="power" type="number" min="0" value="2.5" onChange="calcCurrent();">
  </div>
  <div class="w3-quarter" id="cosphi-input">
    <label for="cosphi">cos(phi)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="cosphi" id="cosphi" type="number" min="0.8" max="1" value="0.9" onChange="calcCurrent();">
  </div>
</div>

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-quarter">
    <label for="wire-voltage-drop">Chute de tension (V)</label>
    <pre style="margin-top: 0px !important; margin-bottom: 0px !important;"><code id="wire-voltage-drop" name="wire-voltage-drop"></code></pre>
  </div>
  <div class="w3-quarter">
    <label for="wire-vpercent-drop">Chute de tension (%)</label>
    <select class="w3-select w3-border w3-theme-l1" name="wire-vpercent-drop" id="wire-vpercent-drop" onclick="calculateCrossSection();">
      <option value="0" disabled selected>-</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
  <div class="w3-quarter">
    <label for="wire-losses">Pertes (W)</label>
    <pre style="margin-top: 0px !important; margin-bottom: 0px !important;"><code id="wire-losses" name="wire-losses"></code></pre>
  </div>
  <div class="w3-quarter">
    <label for="wire-losses-perm">Pertes (W/m)</label>
    <pre style="margin-top: 0px !important; margin-bottom: 0px !important;"><code id="wire-losses-perm" name="wire-losses-perm"></code></pre>
  </div>
</div>

Toutes les données sont sans garantie.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

Cette page n'a pas encore été entièrement traduite. Voir la version [anglaise](../../en/wire)

<script>
var materials = [
  {"name": "Cuivre", "roh20": "0.0178", "alpha": "3.9"},
  {"name": "Aluminium", "roh20": "0.0287", "alpha": "3.8"},
  {"name": "Fer", "roh20": "0.10", "alpha": "6.1"},
  {"name": "Or", "roh20": "0.022", "alpha": "3.9"}
];
</script>
<script type="text/javascript" src="../../wire/wire.js"></script>
