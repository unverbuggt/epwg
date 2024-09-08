title: Binärdarstellung

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

Alle Angaben ohne Gewähr.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

<script>
var sGetLocation = "Standort ermitteln";

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