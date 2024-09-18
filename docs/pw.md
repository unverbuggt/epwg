title: Passwort Entropie

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-half">
    <label for="pw">Passwort</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="pw" id="pw" type="password" value="JooC8zoh" onchange="getEntropy();">
    <input class="w3-check" type="checkbox" onchange="changeHidden(this);" id="pw-hidden" checked>
    <label for="pw-hidden">verdeckt</label>
  </div>
  <div class="w3-half">
    <label>Entropie</label><br>
    <code class="w3-codespan" id="ent-spied-on">-</code> Bits (wenn jemand zugeguckt hat)<br>
    sonst maximal <code class="w3-codespan" id="ent-secret">-</code> Bits
  </div>
</div>
<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-quarter">
    <label for="hash-rate">Versuche</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" id="hash-rate" type="number" value="5" onchange="getEntropy();">
  </div>
  <div class="w3-quarter">
    <label for="hash-exp">pro Sekunde</label>
    <select class="w3-select w3-border w3-theme-l1" id="hash-exp" onchange="getEntropy();">
      <option value="1e3">kilohash</option>
      <option value="1e6">Megahash</option>
      <option value="1e9" selected>Gigahash</option>
      <option value="1e12">Terahash</option>
      <option value="1e15">Petahash</option>
    </select>
  </div>
  <div class="w3-half">
    <label>Zeit um alle Möglichkeiten durchzuprobieren</label><br>
    <code class="w3-codespan" id="tim-spied-on">-</code> (wenn jemand zugeguckt hat)<br>
    sonst maximal <code class="w3-codespan" id="tim-secret">-</code>
  </div>
</div>

Alle Angaben ohne Gewähr.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }


## Wie stark ist ein Passwort?

Man kann die Stärke eines Passwortes in dessen Entropie oder "Zeichenkombinationen die man durchprobieren muss" (bei einem Brute Force Angriff) ausdrücken.

E = C^L

**E** ist die Ethropie des Passwortes, **C** die Anzahl der unterschiedlichen Symbole aus denen es besteht und **L** die Länge des Passwortes. Die Entropie wird normalerweise logarithmisch zur Basis Zwei angegeben (Jedes Bit verdoppelt die Möglichkeiten).

S = E * T

**S** ist die Zeit die man benötigt um alle Möglichkeiten durchzuprobieren (im Schnitt wird das Passwort nach der **Hälfte** dieser Zeit gefunden),
**E** ist wieder die Entropie oder mögliche Kombinationen
und **T** ist die Zeit die man benötigt um ein Passwort zu testen. Die Zeit hängt von dem Hash Algorithmus und der Hash Geschwindigkeit der Hardware ab.

Nehmen wir als Beispiel ein Passwort das nur aus drei Kleinbuchstaben besteht, wie "abc".
Die Anzahl der Kleinbuchstaben ist 26, also führt ein solches Passwort zu 26 * 26 * 26 = 17 576 (oder 14,1 Bits) Möglichkeiten die getestet werden müssen.

Als nächstes fügen wir auch Großbuchstaben in das Passwort ein, z.B. "aBc".
Die Anzahl der verschiedenen Symbole verdoppelt sich auf 52, also führt ein Passwort aus drei Zeichen zu 52 * 52 * 52 = 140 608 (oder 17,1 Bits) Kombinationen.
Verglichen mit "abc" erhöht sich die Entropie somit um den Faktor **Acht**.

Nun, was passiert, wenn wir es ein Zeichen länger machen und bei Kleinbuchstaben bleiben, wie "abcd"?
Bei einem Passwort aus vier Kleinbuchstaben kommt 26^4 = 456 976 (oder 18,8 Bits) heraus, das ist **sechsundzwanzigmal** mehr Entropie im Vergleich zu nur drei Kleinbuchstaben.

Es ist also einfacher die Entropie zu erhöhen indem man die Länge des Passwortes verlängert als wenn man zusätzliche Symbole einfügt.
Ein Angreifer könnte bei der Passworteingabe auch zugeschaut (oder zugehört) haben (und dabei besonders auf den Anschlag der Shift Taste, Leertaste oder Numpad geachtet haben) und dadurch wissen welche Symbole bestimmt nicht verwendet wurden.

Um es milde auszudrücken: Jede Webseite, die einen zwingt Kleinbuchstaben, Großbuchstaben UND Zahlen UND Sonderzeichen einzusetzen, ABER im Gegenzug nur eine Passwortlänge von acht Zeichen vorschreibt, wendet so nicht unbedingt Maßnahmen an um einfach eine hohe Entropie zu erzeugen.

<script>
function secondsToString(number) {
    let numlog10 = Math.log(number) / Math.log(10);
    let numlog60 = Math.log(number) / Math.log(60);
    if (numlog10 < -3) { //<0,0001
        return (number * 1e6).toLocaleString(undefined,{maximumFractionDigits: 0}) + " Nanosekunden";
    } else if (numlog10 < 0) {
        return (number * 1e3).toLocaleString(undefined,{maximumFractionDigits: 0}) + " Millisekunden";
    } else if (numlog60 < 1) {
        return (number).toLocaleString(undefined,{maximumFractionDigits: 0}) + " Sekunden";
    } else if (numlog60 < 2) {
        return (number / 60).toLocaleString(undefined,{maximumFractionDigits: 1}) + " Minuten";
    } else if (numlog60 < 2.8) {
        return (number / 3600).toLocaleString(undefined,{maximumFractionDigits: 1}) + " Stunden";
    } else if (numlog60 < 4.2) {
        return (number / 86400).toLocaleString(undefined,{maximumFractionDigits: 1}) + " Tage";
    } else {
        return (number / 31536000).toLocaleString(undefined,{maximumFractionDigits: 1}) + " Jahre";
    }
}

var pw = document.getElementById('pw');
var ent_spied_on = document.getElementById('ent-spied-on');
var ent_secret = document.getElementById('ent-secret');
var hash_rate = document.getElementById('hash-rate');
var hash_exp = document.getElementById('hash-exp');
var tim_spied_on = document.getElementById('tim-spied-on');
var tim_secret = document.getElementById('tim-secret');

getEntropy();

function changeHidden(el) {
    if (el.checked) {
        pw.type = "password";
    } else {
        pw.type = "text";
    }
}

function getEntropy() {
    //             123456789012345678901234567890
    let lcase =   "abcdefghijklmnopqrstuvwxyz";
    let ucase =   "ABCDEFGHIJKLMNOPQRTSUVWXYZ";
    let number =  "0123456789";
    let special = "!*#,;?+-_.=~^%()[]{}|:/";
    let other = "";
    let lcase_used = false;
    let ucase_used = false;
    let number_used = false;
    let special_used = false;
    let other_used = 0;
    let passw = pw.value;
    let hash_t = 1 / (hash_rate.value * hash_exp.value);
    let ent, ent_max, enttropy_spied_on, enttropy_secret, time_spied_on, time_secret;
    
    for (let i = 0; i < passw.length; i++) {
        let char = passw.substr(i,1);
        if (lcase.includes(char)) {
            lcase_used = true;
        } else if (ucase.includes(char)) {
            ucase_used = true;
        } else if (number.includes(char)) {
            number_used = true;
        } else if (special.includes(char)) {
            special_used = true;
        } else if (!other.includes(char)) {
            other_used++;
            other = other + char;
        }
    }

    ent = 0;
    if (lcase_used) {
        ent = ent + lcase.length;
    }
    if (ucase_used) {
        ent = ent + ucase.length;
    }
    if (number_used) {
        ent = ent + number.length;
    }
    if (special_used) {
        ent = ent + special.length;
    }
    ent = ent + other_used;
    ent_max = lcase.length + ucase.length + number.length + special.length;
    enttropy_spied_on = Math.log( Math.pow(ent, passw.length) ) / Math.log(2);
    enttropy_secret = Math.log( Math.pow(ent_max, passw.length) ) / Math.log(2);
    ent_spied_on.textContent = enttropy_spied_on.toLocaleString(undefined,{maximumFractionDigits: 1});
    ent_secret.textContent = enttropy_secret.toLocaleString(undefined,{maximumFractionDigits: 1});
    time_spied_on = Math.pow(ent, passw.length) * hash_t;
    time_secret = Math.pow(ent_max, passw.length) * hash_t;
    tim_spied_on.textContent = secondsToString(time_spied_on);
    tim_secret.textContent = secondsToString(time_secret);
}

</script>