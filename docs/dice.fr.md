title: Bon générateur de mot de passe

<link rel="stylesheet" type="text/css" href="../../dice/slider.css">

<div class="w3-cell-row w3-margin-bottom">
  <div class="w3-cell">
    <select class="w3-select w3-border w3-theme-l1" name="wordlist" id="wordlist-dropdown" onchange="changeWordlist()"></select>
  </div>
  <div class="w3-cell">&nbsp;</div>
  <div class="w3-cell" id="wordlist-info"></div>
</div>
<input id="words-slider" class="slider w3-theme-l4" style="display: none;" type="range" min="2" max="10" onChange="generatePassword();">
<div class="w3-margin-bottom" id="generate-button"></div>
<div class="w3-row">
  <div id="text-password"></div>
  <div class="w3-twothird">
    <div id="result-password"></div>
  </div>
  <div class="w3-third w3-container">
    <div class="w3-small" id="text-dicerolls"></div>
    <div class="w3-small" id="result-dicerolls"></div>
  </div>
</div>

Les mots de passe générés ne devraient **jamais** être copiés et utilisés exactement de la même manière. Ils ont simplement été générés par un générateur pseudo-aléatoire.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-red }

Ces mots de passe sont générés dans votre navigateur. Ce serveur web ne sait rien à leur sujet.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

Le mieux est de lancer soi-même les [dés](https://fr.wikipedia.org/wiki/Diceware){ target="_blank" }, de modifier les mots, d'adapter les majuscules et les minuscules et d'insérer des caractères spéciaux pour augmenter considérablement la sécurité.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-green }

## Lancer soi-même les dés

<div class="w3-cell-row">
  <div id="dicerolls-input" class="w3-cell" style="width:50%"></div>
  <div class="w3-cell w3-cell-middle">&nbsp;</div>
  <div id="rollsword-output" class="w3-cell w3-cell-middle" style="width:47%"></div>
</div>

## Comparaison avec des caractères aléatoires

Si l'on connaît la méthode et qu'on ne la modifie pas, ces mots de passe sont au moins aussi sûrs que:  
`-`{ #lcase } (lettres minuscules uniquement)  
`-`{ #ulcase } (Lettres minuscules et majuscules)  
`-`{ #ulcasenum } (Lettres minuscules/majuscules et chiffres)  
`-`{ #ulcasenumspec } (Lettres minuscules/majuscules, chiffres et caractères spéciaux)  
ou `-`{ #bits } Bits  
**Si** ils avaient vraiment été jetés aux dés...

Toutes les données sont sans garantie.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

<script>
var lang = "fr";
var sSource = "Source";
var sErrWordlists404 = "Erreur : Liste des dictionnaires introuvable.";
var sErrWordlists = "Erreur : impossible de télécharger la liste des listes de mots.";
var sErrWordlist404 = "Erreur : Impossible de trouver la liste de mots.";
var sErrWordlist = "Erreur : Impossible de télécharger la liste de mots.";
var sGenerate = "Produire";
var sPasswords = "Mots de passe:";
var sDiceRolls = "lancers de dés:";
var sRollNotFound = "Les lancers de dés n'ont pas été trouvés dans la liste de mots.";

let defaultOption = document.createElement('option');
defaultOption.text = 'Sélectionnez la liste de mots';
defaultOption.setAttribute('disabled', 'disabled');

var dicepath = base_url+"/dice/";
</script>

<script type="text/javascript" src="../../dice/dice.js"></script>