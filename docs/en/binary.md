title: Binary coding of numbers

<div class="w3-row-padding" style="padding-left: 0px;">
  <div class="w3-half">
    <label for="num">Number</label>
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
    <label for="signed16">signed</label>
  </div>
</div>

<div class="w3-row-padding w3-margin-top" style="padding-left: 0px;">
  <div class="w3-half">
  <label for="int32">Integer 32-Bit</label>
  <input class="w3-input w3-border w3-hover-theme w3-theme-l1" name="int32" id="int32" type="text" onchange="changeInt32();" ondblclick="changeInt32();">
  </div>
  <div class="w3-half">
    <input class="w3-check" type="checkbox" id="signed32" onclick="changeInt32();" checked>
    <label for="signed32">signed</label>
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

Doubleclick to recalculate from an input field.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-green }

All information is given without warranty.
{: .w3-panel .w3-theme-l3 .w3-leftbar .w3-rightbar .w3-border-orange }

## Hexadecimal notation

The smallest unit of information in a computer system is usually a bit. A bit can only hold the numbers `0` and `1`. Eight bits are called a byte, that is common in most processor or memory architectures.
As we know from the decade system (were `123` is valued as  `1 * 10^2(=100) + 2 * 10^1(=10) + 3 * 10^0(=1) = 100 + 20 + 3`) the value of a bit in a byte is defined by the power of two (`1010` in binary corresponds to `1 * 2^3(=8) + 0 * 2^2(=4) + 1 * 2^1(=2) + 0 * 2^0(=1) = 8 + 2 = 10` in decimal).

We usually use the hexadecimal notation to simplify the display of a byte. In fact the byte is divided in two halves with four bits each. Four bits can display numbers between `0000 = 0 decimal` and `1111 = 15 decimal`, so there are 16 different states. In addition to the numbers `0-9` the letters `A-F` (they represent the numbers 10 to 15) are used to get 16 symbols (Hexadecimal is a numbers system to the base of sixteen).
So a byte can be displayed in binary `1010 1111` or simpler as hexadecimal `AF` (`AF` corresponds to `10(=A) * 16^1(=16) + 15(=F) * 16^0(=1) = 160 + 15 = 175` in decimal).


## Byte order (Endianness)

The value of each bit in a byte is typically fixed. But a byte can only hold numbers between 0 `00` and 255 `FF`. So the question is how to order multiple bytes to increase the value range.

Internally a processor will mostly calculate with 8-bit, 16-bit (microcontroller), 32-bit or 64-bit (modern processors). This would mean using one, two, four or eight bytes together. Two bytes are called a word, four a dword (double word) and eight a qword.

On the one hand the order of the bytes could be the same as the bits inside a byte. So the leftmost byte would be in the highest power of 256 and the power would decrease from left to right. This order is called "big-endian". Although it seems more logical, it is not overly common in processors (found in SPARC and PowerPC).

On the other hand the bytes could be ordered from the lowest to the highest power of 256 (increase from left to right). This byte order is called "litte-endian" (found in x86 and ARM processors).

But numbers in memory can appear in both byte orders and mixed orders are also possible (e. g. rotated word-wise).

## Integers

Integers cannot contain fractions, that's why this program will simply truncate them (instead of `23.5` only `23` will be encoded as integer).

Unsigned integers can represent the numbers `0` to `2^[number of bits] - 1`, so 16-bit range from `00 00` to `FF FF = 2^16 - 1 = 65535` and 32-bit from `00 00  00 00` to `FF FF  FF FF = 2^32 - 1 = 4294967295`.

If an integer is `signed` then it can describe negative numbers. This is done by encoding negative numbers as two's complement (invert all bits and add "1"). This encoding brings the advantage that simple logic circuits can be used to add or subtract numbers. The sign is visible in the bit with the highest value (MSB), so if the byte with the highest power starts with `8-F` it is a negative number. The number `0` has got no sign and the value range goes one furter to the negative numbers: 16-Bit `80 00 = -32768` to `7F FF = 32767` and 32-Bit `80 00  00 00 = -2147483648` to `7F FF  FF FF = 2147483647`.

Larger numbers can also be represented as 64-bit integers, for example, but for the sake of simplicity they are not currently displayed by this program. Whenever the "number" leaves the value range `signed`, this is automatically adjusted. If the "number" cannot be represented as a 16-bit or 32-bit integer, `undefined` is displayed.

## Floats

In most calculations, however, floating point numbers are used instead of integers. These are usually coded in the IEEE-745 representation. The number is divided by two until there is a zero in front of the decimal point. The part after the decimal point is then called the mantissa and the number of times it was divided by two is stored in the exponent. The mantissa and exponent are each coded with a certain number of bits together with a bit for the sign (more on this [here](https://www.h-schmidt.net/FloatConverter/IEEE754.html)).

A real number can only be represented as accurately as the significant digits in the mantissa can be encoded (how many bits are available for this), which results in a rounding error. The use of 32-bit floats is not recommended, as this rounding error becomes apparent very quickly (e.g. double-clicking on the 32-bit float for the number "0.2"). There is also a problem when a small floating point number is to be added to a large one: To do this, the numbers must be brought to the same exponent and additional bits in the mantissa are lost because these also have to be multiplied or divided by two.

Floating point numbers can encode the number `+0` and `-0` (even if that doesn't make sense). In addition positive `Infinity`, negative `-Infinity` and "Not a number" `NaN` (results from the interpretation of invalid strings and by calculating `0/0`). You can continue calculating with infinity directly, so `999 / Infinity` calculates to `0`, but every calculation with `NaN` will result in `NaN` again.

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