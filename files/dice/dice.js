var dictwords;
var dicttype;
var characters;

var dropdown = document.getElementById('wordlist-dropdown'); //dropdown to choose the wordlists from
dropdown.length = 0;

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

var wordlist_info = document.getElementById('wordlist-info'); //link to source of wordlist (which was converted to JSON)
var generate_button = document.getElementById('generate-button'); //button to generate new set of passwords
var text_dicerolls = document.getElementById('text-dicerolls'); //sDiceRolls = "Dice rolls:";
var result_dicerolls = document.getElementById('result-dicerolls'); //five generated dice rolls with desired word count
var text_password = document.getElementById('text-password'); //sPasswords = "Passwords:";
var result_password = document.getElementById('result-password'); //five generated passwords with desired word count
var words_slider = document.getElementById('words-slider'); //slider to choose word count
var dicerolls_input = document.getElementById('dicerolls-input'); //input for real dice rolls (still prefilled with pseudo-random number)
var rollsword_output = document.getElementById('rollsword-output'); //lookup of real dice rolls.

//get characters for random password as comparison
fetch(dicepath + 'characters.json')
.then(
  function(response) {
    if (response.status !== 200) {
      characters = null;
      return;
    }
    response.json().then(
      function(data) {
        characters = data;
      }
    );
  }
)
.catch(
  function(err) {
    characters = null;
  }
);

let selectpref;
fetch(dicepath + 'wordlists.json')
.then(
  function(response) {
    if (response.status !== 200) {
      defaultOption.text = sErrWordlists404;
      return;
    }

    let option;
    response.json().then(
      function(data) {
        for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
          option.text = data[i].name;
          option.value = data[i].name + '|' + data[i].type + '|' + data[i].from;
          if ("pref" in data[i] && data[i].pref == lang) {
            selectpref = option;
          }
          dropdown.add(option);
        }
        if (selectpref) {
          selectpref.setAttribute("selected", "selected");
          changeWordlist();
        }
      }
    );
  }
)
.catch(
  function(err) {
    defaultOption.text = sErrWordlists;
  }
);

function changeWordlist() {
  let dwinfo = dropdown.value.split("|");
  
  fetch(dicepath + 'wordlist/' + dwinfo[0] + '.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        wordlist_info.innerHTML = sErrWordlist404;
        words_slider.style.display = "none";
        generate_button.innerHTML = '';
        text_dicerolls.innerHTML = '';
        result_dicerolls.innerHTML = '';
        text_password.innerHTML = '';
        result_password.innerHTML = '';
        return;
      }
      wordlist_info.innerHTML = '<a href="' + dwinfo[2] + '" target="_blank">' + sSource + '</a>';
      words_slider.style.display = "block";
      generate_button.innerHTML = '<button class="w3-button w3-round-xlarge w3-theme-l1 w3-hover-theme w3-margin-bottom" onClick="generatePassword();">' + sGenerate + '</button>';
      dicttype = dwinfo[1];
      if (dicttype == 'd5') { //d5: five rolls of dice per word
        words_slider.value = 6;
      }
      else if (dicttype == 'd4') { //d4: four rolls of dice per word
        words_slider.value = 8;
      }
      else if (dicttype.startsWith('r')) { //random number to choose word
        words_slider.value = 7;
      }
      response.json().then(
        function(data) {
          dictwords = data;
          generatePassword();
          getWordFromList();
        }
      );
    }
  )
  .catch(
    function(err) {
      wordlist_info.innerHTML = sErrWordlist;
      generate_button.innerHTML = '';
      words_slider.style.display = "none";
    }
  );
}

function generatePassword() {
  let dicerolls;
  let numwords = words_slider.value;
  let dword;
  let all_dicerolls = '';
  let all_password = '';
  
  for(let c = 1; c < 5; c++) {
    if (dicttype == 'd5') {
      diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
      dicerolls = diceroll;
      dword = dictwords[diceroll];
      for(let i = 1; i < numwords; i++) {
        diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
        dicerolls = dicerolls + ', ' + diceroll;
        dword = dword + ' ' + dictwords[diceroll];
      }
    }
    else if (dicttype == 'd4') {
      diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
      dicerolls = diceroll;
      dword = dictwords[diceroll];
      for(let i = 1; i < numwords; i++) {
        diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
        dicerolls = dicerolls + ', ' + diceroll;
        dword = dword + ' ' + dictwords[diceroll];
      }
    }
    else if (dicttype.startsWith('r')) {
      diceroll = getRandomNumberString(parseInt(dicttype.substr(1)));
      dicerolls = diceroll;
      dword = dictwords[diceroll];
      for(let i = 1; i < numwords; i++) {
        diceroll = getRandomNumberString(parseInt(dicttype.substr(1)));
        dicerolls = dicerolls + ', ' + diceroll;
        dword = dword + ' ' + dictwords[diceroll];
      }
    }
    all_dicerolls = all_dicerolls + dicerolls + '<br>';
    all_password = all_password + '<p>' +dword + '</p>';
  }
  
  text_dicerolls.innerHTML = sDiceRolls;
  result_dicerolls.innerHTML = all_dicerolls;
  text_password.innerHTML = sPasswords;
  result_password.innerHTML = '<pre class="w3-code">' + all_password + '</pre>';
  generateComparison();
}

function getWordFromList() {
  let dice_rolls = document.getElementById('dice-rolls');
  let diceroll = '';
  
  if (!dice_rolls) { //if dice-rolls doesn't exist yet
    //generate numbers according to dicttype
    if (dicttype == 'd5') {
      diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
    }
    else if (dicttype == 'd4') {
      diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
    }
    else if (dicttype.startsWith('r')) {
      diceroll = getRandomNumberString(parseInt(dicttype.substr(1)));
    }
  } else { //if dice-rolls was already created
    diceroll = dice_rolls.value; //use that value
    //and check whether dicttype changed in a way where the previous value would lead to key not found
    if (dicttype == 'd5' && diceroll.length < 5) {
      diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
    }
    else if (dicttype == 'd4' && diceroll.length > 4) {
      diceroll = getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6) + getRandomNumberString(6);
    }
    else if (dicttype.startsWith('r') && diceroll > parseInt(dicttype.substr(1))) {
      diceroll = getRandomNumberString(parseInt(dicttype.substr(1)));
    }
  }

  if (dicttype == 'd5') {
    dicerolls_input.innerHTML = '<input id="dice-rolls" class="w3-input w3-border w3-theme-l1" type="number" min="11111" max="66666" value="' + diceroll + '" onchange="getWordFromList();">';
  }
  else if (dicttype == 'd4') {
    dicerolls_input.innerHTML = '<input id="dice-rolls" class="w3-input w3-border w3-theme-l1" type="number" min="1111" max="6666" value="' + diceroll + '" onchange="getWordFromList();">';
  }
  else if (dicttype.startsWith('r')) {
    dicerolls_input.innerHTML = '<input id="dice-rolls" class="w3-input w3-border w3-theme-l1" type="number" min="1" max="' + parseInt(dicttype.substr(1)) + '" value="' + diceroll + '" onchange="getWordFromList();">';
  }

  if(diceroll in dictwords) {
    rollsword_output.innerHTML = '<code id="wordfromlist" onclick="copyToClipboard(\'wordfromlist\');" style="cursor: copy;">' + dictwords[diceroll] + '</code>';
  } else {
    rollsword_output.innerHTML = sRollNotFound;
  }
}

function generateComparison() {
  let code_lcase = document.getElementById('lcase'); //26 only lower case
  let code_culcase = document.getElementById('ulcase'); //52 upper and lower case
  let code_culcasenum = document.getElementById('ulcasenum'); //62 + numbers
  let code_culcasenumspec = document.getElementById('ulcasenumspec'); //85 + special characters
  let code_bits = document.getElementById('bits'); 
  
  let entropy;
  let numwords = words_slider.value;
  if (dicttype == 'd5') {
    entropy = Math.pow(6, 5 * numwords);
  }
  else if (dicttype == 'd4') {
    entropy = Math.pow(6, 4 * numwords);
  }
  else if (dicttype.startsWith('r')) {
    entropy = Math.pow(parseInt(dicttype.substr(1)), numwords);
  }
  
  let chars_lcase = parseInt(Math.log(entropy) / Math.log(26));
  let chars_ulcase = parseInt(Math.log(entropy) / Math.log(52));
  let chars_ulcasenum = parseInt(Math.log(entropy) / Math.log(62));
  let chars_ulcasenumspec = parseInt(Math.log(entropy) / Math.log(85));
  
  code_lcase.textContent = getRandomPassword(26, chars_lcase);
  code_culcase.textContent = getRandomPassword(52, chars_ulcase);
  code_culcasenum.textContent = getRandomPassword(62, chars_ulcasenum);
  code_culcasenumspec.textContent = getRandomPassword(85, chars_ulcasenumspec);
  code_bits.textContent = parseInt(Math.log(entropy) / Math.log(2));
}

function getRandomNumberString(max) {
  return (Math.floor(Math.random() * max)+1).toString();
}

function getRandomPassword(usechars, characters_count) {
  let randompassword = '';
  if (characters) {
    for(let i = 1; i < characters_count; i++) {
      randompassword = randompassword + characters[getRandomNumberString(usechars)];
    }
  }
  return randompassword;
}

function copyToClipboard(id) {
  let ip = document.getElementById(id);
  navigator.clipboard.writeText(ip.textContent);
}