title: Password Entropy

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-half">
    <label for="pw">Password</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" id="pw" type="password" value="JooC8zoh" onchange="getEntropy();">
    <input class="w3-check" type="checkbox" onchange="changeHidden(this);" id="pw-hidden" checked>
    <label for="pw-hidden">hidden</label>
  </div>
  <div class="w3-half">
    <label>Entropy</label><br>
    <code class="w3-codespan" id="ent-spied-on">-</code> Bits (if somebody watched)<br>
    or else <code class="w3-codespan" id="ent-secret">-</code> Bits maximum
  </div>
</div>
<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-quarter">
    <label for="hash-rate">Tries</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" id="hash-rate" type="number" value="5" onchange="getEntropy();">
  </div>
  <div class="w3-quarter">
    <label for="hash-exp">per second</label>
    <select class="w3-select w3-border w3-theme-l1" id="hash-exp" onchange="getEntropy();">
      <option value="1e3">kilohash</option>
      <option value="1e6">Megahash</option>
      <option value="1e9" selected>Gigahash</option>
      <option value="1e12">Terahash</option>
      <option value="1e15">Petahash</option>
    </select>
  </div>
  <div class="w3-half">
    <label>Time it takes to try all possibilities</label><br>
    <code class="w3-codespan" id="tim-spied-on">-</code> (if somebody watched)<br>
    or else <code class="w3-codespan" id="tim-secret">-</code> maximum
  </div>
</div>

All information is given without warranty.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }


## A word on password strength

The strength of a password can be measured in entropy or "possibilities to try" (for a brute force attacker).

E = C^L

**E** is the entropy of the password, **C** being the number of different characters the password is made of and **L** being the length of the password. The entropy is usually expressed logarithmic to the base of two (each Bit doubles the possibilities).

S = E * T

**S** is the time it takes to try all possibilities (on average a password is found after trying **half** the possibilities),
**E** being the number of possible character combinations or entropy
and **T** the time it takes to try one password. The time is depending on the hash algorithm used and the hash rate of the hardware.

For example take a tree character password with just lower case letters like "abc".  
The number of lower case letters is 26, so a three character password leads to 26 * 26 * 26 = 17 576 (or 14,1 Bits) possibilities to try.

Now take a three character password which also includes upper case letters like "aBc".  
The number of possibilities per character doubles to 52, so the three character password leads to 52 * 52 * 52 = 140 608 (or 17,1 Bits) possibilities.
So compared to "abc" we got **eight times** more entropy in this case.

So what happens if we add one character and still only use lower case letters, like "abcd"?  
It's 26^4 = 456 976 (or 18,8 Bits) with a four character password, that's **26 times** more entropy compared to only using three lower case characters.

It's easier to get higher entropy by increasing password size, than with adding more different characters or symbols.
An attacker could also have watched (or heard) you type the password (paying attention to the use of the shift key,
space bar or numeric keypad) and this way cross out character that you couldn't possibly have used.

So, to put it mildly: Every web page that forces you to use at least lower/upper case AND a number AND a symbol,
BUT only forces you to use eight characters of password size is not steering you to the right measures to gain entropy.

<script>
function secondsToString(number) {
    let numlog10 = Math.log(number) / Math.log(10);
    let numlog60 = Math.log(number) / Math.log(60);
    if (numlog10 < -3) {
        return (number * 1e6).toLocaleString(undefined,{maximumFractionDigits: 0}) + " nanoseconds";
    } else if (numlog10 < 0) {
        return (number * 1e3).toLocaleString(undefined,{maximumFractionDigits: 0}) + " milliseconds";
    } else if (numlog60 < 1) {
        return (number).toLocaleString(undefined,{maximumFractionDigits: 0}) + " seconds";
    } else if (numlog60 < 2) {
        return (number / 60).toLocaleString(undefined,{maximumFractionDigits: 1}) + " minutes";
    } else if (numlog60 < 2.78) {
        return (number / 3600).toLocaleString(undefined,{maximumFractionDigits: 1}) + " hours";
    } else if (numlog60 < 3.25) {
        return (number / 86400).toLocaleString(undefined,{maximumFractionDigits: 1}) + " days";
    } else if (numlog60 < 3.61) {
        return (number / 604800).toLocaleString(undefined,{maximumFractionDigits: 1}) + " weeks";
    } else if (numlog60 < 4.22) {
        return (number / 2628000).toLocaleString(undefined,{maximumFractionDigits: 1}) + " months";
    } else {
        return (number / 31536000).toLocaleString(undefined,{maximumFractionDigits: 1}) + " years";
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