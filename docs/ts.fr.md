title: Décodage de l'horodatage

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-third">
    <label for="timestamp">Horodatage</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="timestamp" id="timestamp" type="number" min="0" max="4294967295" onchange="genTs();">
  </div>
  <div class="w3-third">
    <label for="offset">Décalage (heures)</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="offset" id="offset" type="number" min="-12" max="12" onchange="genTs();">
  </div>
</div>

<div class="w3-row-padding w3-margin-top" style="padding-left: 0px;">
  <div class="w3-third">
    <label for="ts-utc-iso">Format ISO</label>
    <pre style="margin-top: 0px !important;"><code id="ts-utc-iso" name="ts-utc-iso" onclick="copyToClipboard('ts-utc-iso');" style="cursor: copy;"></code></pre>
  </div>
  <div class="w3-third">
    <label for="ts-utc">Format localisé (UTC)</label>
    <pre style="margin-top: 0px !important;"><code id="ts-utc" name="ts-utc" onclick="copyToClipboard('ts-utc');" style="cursor: copy;"></code></pre>
  </div>
  <div class="w3-third">
    <label for="ts-local">Format localisé (heure locale)</label>
    <pre style="margin-top: 0px !important;"><code id="ts-local" name="ts-local" onclick="copyToClipboard('ts-local');" style="cursor: copy;"></code></pre>
  </div>
</div>

Toutes les données sont sans garantie.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

<script>
genTs();

function getLang()
{
  if (navigator.languages != undefined) {
    return navigator.languages[0]; 
  } else {
    return navigator.language;
  }
}

function genTs() {
  let curtimestamp;
  let timestamp = document.getElementById('timestamp');
  let offset = document.getElementById('offset');
  let ts_utc_iso = document.getElementById('ts-utc-iso');
  let ts_utc = document.getElementById('ts-utc');
  let ts_local = document.getElementById('ts-local');
  
  if (offset.value < -12 || offset.value > 12 || isNaN(offset.value) || offset.value == '') {
    offset.value = 0;
  }
  if (timestamp.value < 0 || timestamp.value > 4294967295 || isNaN(timestamp.value) || timestamp.value == '') {
    timestamp.value = Math.floor(Date.now() / 1000);
  }
  curtimestamp = (parseInt(offset.value) * 3600) + parseInt(timestamp.value);
  
  ts_utc_iso.textContent = new Date(curtimestamp * 1000).toISOString()
  ts_utc.textContent = new Date(curtimestamp * 1000).toLocaleString(getLang(), {timeZone: "UTC"});
  ts_local.textContent = new Date(curtimestamp * 1000).toLocaleString(getLang());
}

function copyToClipboard(id) {
  let ip = document.getElementById(id);
  navigator.clipboard.writeText(ip.textContent);
}
</script>