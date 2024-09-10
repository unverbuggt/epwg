title: Binärdarstellung von Zahlen

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-half">
    <label for="num">Zahl</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="num" id="num" type="text" onchange="changeNum();" ondblclick="changeNum();">
  </div>
  <div class="w3-half">
    <input class="w3-radio" type="radio" name="endian" id="bendian" onclick="changeNum();" checked>
    <label for="bendian">Big-endian</label>
    <input class="w3-radio" type="radio" name="endian" id="lendian" onclick="changeNum();">
    <label for="lendian">Little-endian</label>
  </div>
</div>

<div class="w3-row-padding w3-margin-top" style="padding-left: 0px;">
  <div class="w3-half">
  <label for="int32">Integer 16-Bit</label>
  <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="int16" id="int16" type="text" onchange="changeInt16();" ondblclick="changeInt16();">
  </div>
  <div class="w3-half">
    <input class="w3-check" type="checkbox" id="signed16" onclick="changeInt16();" checked>
    <label for="signed16">mit Vorzeichen</label>
  </div>
</div>

<div class="w3-row-padding w3-margin-top" style="padding-left: 0px;">
  <div class="w3-half">
  <label for="int32">Integer 32-Bit</label>
  <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="int32" id="int32" type="text" onchange="changeInt32();" ondblclick="changeInt32();">
  </div>
  <div class="w3-half">
    <input class="w3-check" type="checkbox" id="signed32" onclick="changeInt32();" checked>
    <label for="signed32">mit Vorzeichen</label>
  </div>
</div>

<div class="w3-row-padding w3-margin-top" style="padding-left: 0px;">
  <div class="w3-half">
    <label for="float32">Float 32-Bit</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="float32" id="float32" type="text" onchange="changeFloat32();" ondblclick="changeFloat32();">
  </div>
  <div class="w3-half">
    <div class="w3-badge w3-theme-l1" id="f32info"></div>
  </div>
</div>

<div class="w3-row-padding w3-margin-top" style="padding-left: 0px;">
  <div class="w3-half">
    <label for="float64">Float 64-Bit</label>
    <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="float64" id="float64" type="text" onchange="changeFloat64();" ondblclick="changeFloat64();">
  </div>
  <div class="w3-half">
    <div class="w3-badge w3-theme-l1" id="f64info"></div>
  </div>
</div>

Doppelklick auf ein Feld um den Rest neu zu berechnen.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-green }

Alle Angaben ohne Gewähr.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

## Hexadezimaldarstellung

Die kleinste Informationseinheit in EDV-Systemen ist i. d. R. ein Bit. Dieses kann entweder den Zustand `1` oder `0` annehmen. Acht Bits werden zu einem Byte zusammengefasst, das haben die meisten Prozessor- und Speicherarchitekturen gemein.
Analog zum Zehnersystem (`123` dezimal bedeutet `1 * 10^2(=100) + 2 * 10^1(=10) + 3 * 10^0(=1) = 100 + 20 + 3`) ist innerhalb eines Bytes die Wertigkeit der Bits in Zweierpotenzen definiert (`1010` binär entspricht `1 * 2^3(=8) + 0 * 2^2(=4) + 1 * 2^1(=2) + 0 * 2^0(=1) = 8 + 2 = 10` in dezimal).

Um ein Byte einfacher darzustellen wird es normalerweise in Hexadezimalschreibweise dargestellt. Und zwar werden dazu die acht Bits in zwei Hälften zu vier Bits unterteilt. Vier Bits können können die Zahlen zwischen `0000 = 0 dezimal` und `1111 = 15 dezimal` darstellen, es gibt also 16 Zustände. Dabei werden zusätzlich zu den Zahlen `0-9` auch die Buchstaben `A-F` (entsprechen den Zahlen 10 bis 15) verwendet um 16 Symbole zu erhalten (Hexadezimal meint das Zahlensystem mit der Basis 16). 
Ein Byte kann also als binär `1010 1111` oder einfacher als Hexadezimal `AF` dargestellt werden (`AF` hexadezimal entspricht `10(=A) * 16^1(=16) + 15(=F) * 16^0(=1) = 160 + 15 = 175` dezimal). Ein Byte ist so immer zwei Zeichen lang und nicht wie bei dezimal zwischen einem und dreien. Wenn die oberen vier Bits dabei Null sind werden sie normalerweise als `0` vorangestellt, so entspricht `0F` der Dezimalzahl `15`.


## Byte-Reihenfolge (Endianness)

Innerhalb eines Bytes ist die Wertigkeit der Bits definiert. Da ein Byte aber nur Zahlen zwischen 0 `00` und 255 `FF` darstellen kann ist nun die Frage wie mehrere Bytes angeordnet werden sollen um größere Zahlen darzustellen.

Ein Prozessor rechnet intern meist entweder mit 8-Bit, 16-Bit (Microcontroller), 32-Bit oder 64-Bit (moderne Prozessoren). Dies entspricht einem, zwei, vier oder acht Bytes. Zwei Bytes bezeichnet man als Wort(Word), vier als Doppelwort(DWord) und acht als QWord.

Innerhalb dieser Gruppen könnte man zum einen die Bytes in der Reihenfolge anordnen wie sie auch in den Bits stehen. Also diese von links nach rechts absteigend als die Potenzen zur Basis 256 interpretieren. Diese Reihenfolge wird als "Big Endian" bezeichnet. Obwohl sie scheinbar logischer anmutet, ist sie bei Prozessoren nicht übermäßig verbreitet (zu finden bei SPARC und PowerPC).

Zum anderen könnte man die die Bytes auch von der niedrigsten zur höchsten Potenz anordnen. Also von links nach rechts aufsteigend die Potenzen zur Basis 256 anordnen. Diese Reihenfolge wird als "Little Endian" bezeichnet. Sie wird z.B. bei x86 und ARM Prozessoren verwendet.

Zahlen die man Speicher findet können dort auch in der jeweils anderen Form auftreten und auch Mischformen sind möglich, z.B. wortweise verdreht.

## Ganzzahlen (Integer)

Eine Ganzzahl kann keine Nachkommastellen enthalten, daher werden sie in diesem Programm einfach abgeschnitten (statt `23.5` werden nur `23` als Integer kodiert).

Ganzzahlen ohne Vorzeichen können Zahlen `0` bis `2^[Anzahl der Bits] - 1` darstellen, also 16-Bit `00 00` bis `FF FF = 2^16 - 1 = 65535` und 32-Bit `00 00  00 00` bis `FF FF  FF FF = 2^32 - 1 = 4294967295`.

Ist eine Ganzzahl `mit Vorzeichen`, dann kann sie auch negative Zahlen darstellen. Dabei wird die negative Zahl also sog. Zweierkomplement kodiert (alle Bits invertieren und "1" addieren). Diese Darstellung bietet den Vorteil, dass man durch einfache Logikschaltungen neben Addition genauso auch Subtraktion durchführen kann. Das Vorzeichen ist am höchstwertigen Bit (MSB) erkennbar, also wenn das Byte mit der höchsten Potenz mit mit `8-F` an erster Stelle beginnt. Die Zahl `0` hat in dieser Darstellung kein Vorzeichen und der Wertebereich geht um eins weiter ins negative: 16-Bit `80 00 = -32768` bis `7F FF = 32767` und 32-Bit `80 00  00 00 = -2147483648` bis `7F FF  FF FF = 2147483647`.

Größere Zahlen sind z.B. auch als 64-Bit Ganzzahlen darstellbar, der Einfachheit halber werden sie durch dieses Programm aktuell aber nicht angezeigt. Wann immer die "Zahl" den Wertebereich `mit Vorzeichen` verlässt wird dies automatisch angepasst. Ist die "Zahl" nicht als 16-Bit bzw. 32-Bit Ganzzahl darstellbar wird `undefined` angezeigt.

## Gleitkommezahlen (Float)

In den meisten Berechnungen werden statt Ganzzahlen jedoch Gleitkommazahlen benutzt. Diese werden meist in der IEEE-745 Darstellung kodiert. Die Zahl wird dazu so oft durch zwei geteilt bis eine Null vor dem Komma steht. Der Teil nach dem Komma wird dann Mantisse genannt und die Anzahl wie oft durch 2 geteilt wurde wird im Exponenten gespeichert. Mantisse und Exponent werden jeweils mit einer gewissen Anzahl von Bits zusammen mit einem Bit für das Vorzeichen kodiert (mehr dazu [hier](https://www.h-schmidt.net/FloatConverter/IEEE754de.html)). 

Dabei kann eine reale Zahl nur so genau abgebildet werden wie signifikante Stellen in der Mantisse kodiert werden können (wie viele Bits dafür zur Verfügung stehen), dabei entsteht ein Rundungsfehler. Von der Verwendung von 32-Bit Floats wird eher abgeraten, da dieser Rundungsfehler recht schnell zu Tage tritt (z.B. Doppelklick auf den 32-Bit Float zur Zahl "0.2"). Des weiteren gibt es ein Problem wenn eine kleine Gleitkommazahl mit einer großen addiert werden soll: Dazu müssen die Zahlen auf denselben Exponenten gebracht werden und es gehen dabei zusätzlich Bits in der Mantisse verloren da diese dazu auch mal zwei oder durch zwei gerechnet werden müssen.

Gleitkommazahlen können die Zahl `+0` und `-0` kodieren (auch wenn das keinen direkten Sinn ergibt). Außerdem Kann Unendlich `Infinity`, minus Unendlich `-Infinity` und "garkeine Zahl" `NaN` (Entsteht bei der Interpretation ungültiger Zeichenketten und bei der Berechnung `0/0`). Mit Unendlich kann direkt weiter gerechnet werden, so ergibt `999 / Infinity` das Ergebnis `0`, jedoch ergibt jede Rechenoperation mit `NaN` erneut keine gültige Zahl.

<script>
var num = document.getElementById('num');
var lendian = document.getElementById('lendian');
var int16 = document.getElementById('int16');
var int32 = document.getElementById('int32');
var signed16 = document.getElementById('signed16');
var signed32 = document.getElementById('signed32');
var float32 = document.getElementById('float32');
var float64 = document.getElementById('float64');
var f32info = document.getElementById('f32info');
var f64info = document.getElementById('f64info');
var recalc = false;

const buffer = new ArrayBuffer(8);
const bview = new DataView(buffer);

if (num.value == '') {
  num.value = '23.5';
}

changeNum();

function byteToHex(byte) {
    return byte.toString(16).toUpperCase().padStart(2, '0');
}
function hexToByte(hex) {
    return parseInt(hex, 16);
}
function ToHex(bytes) {
    let hex='';
    for (let i=0; i < bytes; i++) {
        let h = byteToHex(bview.getUint8(i));
        if (i == bytes-1) {
            hex = hex + h;
        } else if (i % 2 == 1) {
            hex = hex + h + '  ';
        } else {
            hex = hex + h + ' ';
        }
    }
    return hex;
}

function fromHex(hexstr) {
    let hex = hexstr.replaceAll(' ','')
    if (hex.length % 2 == 0) {
        let k = 0;
        for (let i=0; i < hex.length; i = i + 2) {
            let byte = hexToByte(hex.substr(i,2));
            if (byte) {
                bview.setUint8(k, byte);
            } else {
                bview.setUint8(k, 0);
            }
            k = k + 1;
            if (k > 8) {
                break;
            }
        }
        if (k != 8) {
            for (let i=k; i < 8; i++) {
                bview.setUint8(k, 0);
            }
        }
        return true;
    } else {
        return false;
    }
}

function changeInt16() {
    let littleEndian = lendian.checked;
    if (!recalc && fromHex(int16.value)) {
        if (signed16.checked) {
            num.value = bview.getInt16(0, littleEndian).toString();
        } else {
            num.value = bview.getUint16(0, littleEndian).toString();
        }
        changeNum(1);
    }
}

function changeInt32() {
    let littleEndian = lendian.checked;
    if (!recalc && fromHex(int32.value)) {
        if (signed32.checked) {
            num.value = bview.getInt32(0, littleEndian).toString();
        } else {
            num.value = bview.getUint32(0, littleEndian).toString();
        }
        changeNum(2);
    }
}

function changeFloat32() {
    let littleEndian = lendian.checked;
    if (!recalc && fromHex(float32.value)) {
        num.value = bview.getFloat32(0, littleEndian).toString();
        changeNum(3);
    }
}

function changeFloat64() {
    let littleEndian = lendian.checked;
    if (!recalc && fromHex(float64.value)) {
        num.value = bview.getFloat64(0, littleEndian).toString();
        changeNum(4);
    }
}

function changeNum(i=0) {
    let ival = Math.trunc(num.value);
    let fval = parseFloat(num.value);
    let littleEndian = lendian.checked;
    recalc = true;
    if (ival || ival == 0) {
        if (i != 1) {
            if (ival > 32767 && ival <= 65535) {
                bview.setUint16(0, ival, littleEndian);
                int16.value = ToHex(2);
                signed16.checked = false;
            } else if (ival > -32768 && ival <= 32767) {
                bview.setInt16(0, ival, littleEndian);
                int16.value = ToHex(2);
                signed16.checked = true;
            } else {
                int16.value = 'undefined';
            }
        }
        if (i != 2) {
            if (ival > 2147483647 && ival <= 4294967295) {
                bview.setUint32(0, ival, littleEndian);
                int32.value = ToHex(4);
                signed32.checked = false;
            } else if (ival > -2147483648 && ival <= 2147483647) {
                bview.setInt32(0, ival, littleEndian);
                int32.value = ToHex(4);
                signed32.checked = true;
            } else {
                int32.value = 'undefined';
            }
        }
    } else {
        int16.value = 'undefined';
        int32.value = 'undefined';
    }
    if (fval || isNaN(fval) || fval == 0) {
        if (i != 3) {
            bview.setFloat32(0, fval, littleEndian);
            float32.value = ToHex(4);
        }
        if (i != 4) {
            bview.setFloat64(0, fval, littleEndian);
            float64.value = ToHex(8);
        }
        if (fromHex(float32.value)) {
            let f32 = bview.getFloat32(0, littleEndian)
            if (isNaN(f32)) {
                f32info.textContent = 'NaN';
            } else if (f32 == Infinity) {
                f32info.textContent = 'Infinity';
            } else if (f32 == -Infinity) {
                f32info.textContent = '-Infinity';
            } else {
                f32info.textContent = '';
            }
        }
        if (fromHex(float64.value)) {
            let f64 = bview.getFloat64(0, littleEndian)
            if (isNaN(f64)) {
                f64info.textContent = 'NaN';
            } else if (f64 == Infinity) {
                f64info.textContent = 'Infinity';
            } else if (f64 == -Infinity) {
                f64info.textContent = '-Infinity';
            } else {
                f64info.textContent = '';
            }
        }
    } else {
        float32.value = 'undefined';
        float64.value = 'undefined';
    }
    recalc = false;
}

</script>