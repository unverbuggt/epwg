title: Quelle est mon adresse IP?

<p>&nbsp;</p>
<p>
  <strong class="w3-large">IPv6:</strong> 
  <code class="w3-large w3-responsive" id="ip6" onclick="copyToClipboard('ip6');" style="cursor: copy;">Chargement en cours...</code>
</p>
<p>
  <strong class="w3-large">IPv4:</strong> 
  <code class="w3-large w3-responsive" id="ip4" onclick="copyToClipboard('ip4');" style="cursor: copy;">Chargement en cours...</code>
</p>
<div>
  <strong>l'emplacement:</strong>
  <span id="iploc"></span>
</div>
<div class="w3-small">
  <strong>fournisseur d'accès:</strong>
  <span id="ipasn"></span>
</div>


*inspiré par:* Parce que tous les autres sites "Whats my IP?" sont de la merde. [Host yourself :3](https://git.clerie.de/clerie/ip.clerie.de){ target="_blank" }
{: .w3-small }

Ce produit inclut les données GeoLite2 créées par MaxMind, disponibles sur [https://www.maxmind.com](https://www.maxmind.com){ target="_blank" }
{: .w3-small }

Cette page n'a pas encore été entièrement traduite. Voir la version [anglaise](../../en/ip)

Toutes les données sont sans garantie.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

<script>
var lang = "fr";
var sErr404 = "Erreur: erreur interne.";
var sErr = "Erreur : Impossible d'obtenir l'IP.";

function copyToClipboard(id) {
  let ip = document.getElementById(id);
  navigator.clipboard.writeText(ip.textContent);
}

function GetLangString(dict) {
  if (lang in dict) {
    return dict[lang];
  }
  else if ("en" in dict) {
    return dict["en"];
  }
  else {
    return dict[0];
  }
}

var gettingLoc = false;
function getLoc(ip_id) {
  if (gettingLoc) {
    return;
  }
  gettingLoc = true;
  let loc = document.getElementById("iploc");
  fetch('https://wie-lautet-' + ip_id + '.epwg.de/?city')
  .then(
    function(response) {
      if (response.status == 200) {
        response.json().then(
          function(data) {
            let locstr = "";
            if ("continent" in data) {
              locstr += GetLangString(data["continent"]["names"])
            }
            if ("country" in data) {
              locstr += " / " + GetLangString(data["country"]["names"])
            }
            if ("subdivisions" in data) {
              locstr += " / " + GetLangString(data["subdivisions"][0]["names"])
            }
            if ("city" in data) {
              locstr += " / " + GetLangString(data["city"]["names"])
            }
            loc.textContent = locstr;
          }
        );
      }
    }
  );
}

var gettingAsn = false;
function getAsn(ip_id) {
  if (gettingAsn) {
    return;
  }
  gettingAsn = true;
  let asn = document.getElementById("ipasn");
  fetch('https://wie-lautet-' + ip_id + '.epwg.de/?asn')
  .then(
    function(response) {
      if (response.status == 200) {
        response.json().then(
          function(data) {
            asn.textContent = data["autonomous_system_organization"];
          }
        );
      }
    }
  );
}

function getIp(ip_id) {
  let ip = document.getElementById(ip_id);
  fetch('https://wie-lautet-' + ip_id + '.epwg.de/')
  .then(
    function(response) {
      if (response.status !== 200) {
        ip.textContent = sErr404;
        return;
      }
      response.text().then(function(text) {
        ip.textContent = text;
        getLoc(ip_id);
        getAsn(ip_id);
      });
    }
  )
  .catch(
    function(err) {
      ip.textContent = sErr;
    }
  );
}

getIp("ip4");
getIp("ip6");
</script>