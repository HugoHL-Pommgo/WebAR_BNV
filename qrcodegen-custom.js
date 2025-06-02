/*
 * QR Code generator library (JavaScript) - Custom build for AR Editor
 * Based on qrcodegen by Project Nayuki (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 */

"use strict";

// QR Code generator namespace
var qrcodegen = (function() {
    
    // Error correction levels
    var Ecc = {
        LOW: { ordinal: 0, formatBits: 1 },
        MEDIUM: { ordinal: 1, formatBits: 0 },
        QUARTILE: { ordinal: 2, formatBits: 3 },
        HIGH: { ordinal: 3, formatBits: 2 }
    };
    
    // Segment modes
    var Mode = {
        NUMERIC: { modeBits: 0x1, numBitsCharCount: [10, 12, 14] },
        ALPHANUMERIC: { modeBits: 0x2, numBitsCharCount: [9, 11, 13] },
        BYTE: { modeBits: 0x4, numBitsCharCount: [8, 16, 16] },
        KANJI: { modeBits: 0x8, numBitsCharCount: [8, 10, 12] },
        ECI: { modeBits: 0x7, numBitsCharCount: [0, 0, 0] }
    };
    
    // QR Code class
    function QrCode(version, errorCorrectionLevel, dataCodewords, mask) {
        // Validation
        if (version < 1 || version > 40) throw new RangeError("Version out of range");
        if (mask < -1 || mask > 7) throw new RangeError("Mask out of range");
        
        this.version = version;
        this.errorCorrectionLevel = errorCorrectionLevel;
        this.size = version * 4 + 17;
        this.mask = mask;
        
        // Initialize modules grid
        this.modules = [];
        this.isFunction = [];
        for (var i = 0; i < this.size; i++) {
            this.modules[i] = [];
            this.isFunction[i] = [];
            for (var j = 0; j < this.size; j++) {
                this.modules[i][j] = false;
                this.isFunction[i][j] = false;
            }
        }
        
        // Generate QR code
        this.drawFunctionPatterns();
        var allCodewords = this.addEccAndInterleave(dataCodewords);
        this.drawCodewords(allCodewords);
        
        if (mask == -1) {
            var minPenalty = Number.MAX_VALUE;
            for (var i = 0; i < 8; i++) {
                this.applyMask(i);
                this.drawFormatBits(i);
                var penalty = this.getPenaltyScore();
                if (penalty < minPenalty) {
                    mask = i;
                    minPenalty = penalty;
                }
                this.applyMask(i); // Undo mask
            }
        }
        
        this.mask = mask;
        this.applyMask(mask);
        this.drawFormatBits(mask);
    }
    
    // Static factory method to encode text
    QrCode.encodeText = function(text, ecl) {
        var segs = QrSegment.makeSegments(text);
        return QrCode.encodeSegments(segs, ecl);
    };
    
    // Static factory method to encode segments
    QrCode.encodeSegments = function(segs, ecl, minVersion, maxVersion, mask, boostEcl) {
        minVersion = minVersion || 1;
        maxVersion = maxVersion || 40;
        mask = mask || -1;
        boostEcl = boostEcl !== false;
        
        // Find minimum version
        var version, dataUsedBits;
        for (version = minVersion; version <= maxVersion; version++) {
            var dataCapacityBits = QrCode.getNumDataCodewords(version, ecl) * 8;
            var usedBits = QrSegment.getTotalBits(segs, version);
            if (usedBits <= dataCapacityBits) {
                dataUsedBits = usedBits;
                break;
            }
        }
        if (version > maxVersion) throw new RangeError("Data too long");
        
        // Boost error correction level
        if (boostEcl) {
            var eccLevels = [Ecc.MEDIUM, Ecc.QUARTILE, Ecc.HIGH];
            for (var i = 0; i < eccLevels.length; i++) {
                if (dataUsedBits <= QrCode.getNumDataCodewords(version, eccLevels[i]) * 8) {
                    ecl = eccLevels[i];
                }
            }
        }
        
        // Create data bit string
        var bb = [];
        for (var i = 0; i < segs.length; i++) {
            var seg = segs[i];
            appendBits(seg.mode.modeBits, 4, bb);
            appendBits(seg.numChars, seg.mode.numBitsCharCount[Math.floor((version + 7) / 17)], bb);
            var data = seg.getData();
            for (var j = 0; j < data.length; j++) {
                bb.push(data[j]);
            }
        }
        
        // Add padding
        var dataCapacityBits = QrCode.getNumDataCodewords(version, ecl) * 8;
        appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
        appendBits(0, (8 - bb.length % 8) % 8, bb);
        
        for (var padByte = 0xEC; bb.length < dataCapacityBits; padByte ^= 0xEC ^ 0x11) {
            appendBits(padByte, 8, bb);
        }
        
        // Pack bits into bytes
        var dataCodewords = [];
        while (dataCodewords.length * 8 < bb.length) {
            dataCodewords.push(0);
        }
        for (var i = 0; i < bb.length; i++) {
            dataCodewords[Math.floor(i / 8)] |= bb[i] << (7 - (i % 8));
        }
        
        return new QrCode(version, ecl, dataCodewords, mask);
    };
    
    // Get module at coordinates
    QrCode.prototype.getModule = function(x, y) {
        return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
    };
    
    // Draw function patterns (finder patterns, separators, etc.)
    QrCode.prototype.drawFunctionPatterns = function() {
        // Draw finder patterns
        for (var i = 0; i < this.size; i++) {
            this.setFunctionModule(6, i, i % 2 == 0);
            this.setFunctionModule(i, 6, i % 2 == 0);
        }
        
        this.drawFinderPattern(3, 3);
        this.drawFinderPattern(this.size - 4, 3);
        this.drawFinderPattern(3, this.size - 4);
        
        // Draw alignment patterns
        var alignPatPos = this.getAlignmentPatternPositions();
        for (var i = 0; i < alignPatPos.length; i++) {
            for (var j = 0; j < alignPatPos.length; j++) {
                if (i == 0 && j == 0 || i == 0 && j == alignPatPos.length - 1 || i == alignPatPos.length - 1 && j == 0) {
                    continue;
                }
                this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
            }
        }
        
        this.drawFormatBits(0);
        this.drawVersion();
    };
    
    // Draw finder pattern
    QrCode.prototype.drawFinderPattern = function(x, y) {
        for (var dy = -4; dy <= 4; dy++) {
            for (var dx = -4; dx <= 4; dx++) {
                var dist = Math.max(Math.abs(dx), Math.abs(dy));
                var xx = x + dx, yy = y + dy;
                if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) {
                    this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
                }
            }
        }
    };
    
    // Draw alignment pattern
    QrCode.prototype.drawAlignmentPattern = function(x, y) {
        for (var dy = -2; dy <= 2; dy++) {
            for (var dx = -2; dx <= 2; dx++) {
                this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
            }
        }
    };
    
    // Set function module
    QrCode.prototype.setFunctionModule = function(x, y, isDark) {
        this.modules[y][x] = isDark;
        this.isFunction[y][x] = true;
    };
    
    // Add error correction and interleave
    QrCode.prototype.addEccAndInterleave = function(data) {
        var version = this.version;
        var ecl = this.errorCorrectionLevel;
        if (data.length != QrCode.getNumDataCodewords(version, ecl)) {
            throw new Error("Invalid argument");
        }
        
        // Calculate parameter numbers
        var numBlocks = QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][version];
        var blockEccLen = QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][version];
        var rawCodewords = Math.floor(QrCode.getNumRawDataModules(version) / 8);
        var numShortBlocks = numBlocks - rawCodewords % numBlocks;
        var shortBlockLen = Math.floor(rawCodewords / numBlocks);
        
        // Split data into blocks and add ECC to each block
        var blocks = [];
        var rsDiv = QrCode.reedSolomonComputeDivisor(blockEccLen);
        for (var i = 0, k = 0; i < numBlocks; i++) {
            var datLen = shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1);
            var dat = data.slice(k, k + datLen);
            k += datLen;
            var ecc = QrCode.reedSolomonComputeRemainder(dat, rsDiv);
            if (i < numShortBlocks) {
                dat.push(0);
            }
            blocks.push(dat.concat(ecc));
        }
        
        // Interleave
        var result = [];
        for (var i = 0; i < blocks[0].length; i++) {
            for (var j = 0; j < blocks.length; j++) {
                if (i != shortBlockLen - blockEccLen || j >= numShortBlocks) {
                    result.push(blocks[j][i]);
                }
            }
        }
        return result;
    };
    
    // Draw codewords
    QrCode.prototype.drawCodewords = function(data) {
        if (data.length != Math.floor(QrCode.getNumRawDataModules(this.version) / 8)) {
            throw new Error("Invalid argument");
        }
        
        var i = 0;
        for (var right = this.size - 1; right >= 1; right -= 2) {
            if (right == 6) right = 5;
            for (var vert = 0; vert < this.size; vert++) {
                for (var j = 0; j < 2; j++) {
                    var x = right - j;
                    var upward = ((right + 1) & 2) == 0;
                    var y = upward ? this.size - 1 - vert : vert;
                    if (!this.isFunction[y][x] && i < data.length * 8) {
                        this.modules[y][x] = getBit(data[Math.floor(i / 8)], 7 - (i & 7));
                        i++;
                    }
                }
            }
        }
    };
    
    // Apply mask
    QrCode.prototype.applyMask = function(mask) {
        if (mask < 0 || mask > 7) throw new RangeError("Mask value out of range");
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                var invert;
                switch (mask) {
                    case 0: invert = (x + y) % 2 == 0; break;
                    case 1: invert = y % 2 == 0; break;
                    case 2: invert = x % 3 == 0; break;
                    case 3: invert = (x + y) % 3 == 0; break;
                    case 4: invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0; break;
                    case 5: invert = (x * y) % 2 + (x * y) % 3 == 0; break;
                    case 6: invert = ((x * y) % 2 + (x * y) % 3) % 2 == 0; break;
                    case 7: invert = ((x + y) % 2 + (x * y) % 3) % 2 == 0; break;
                    default: throw new Error("Unreachable");
                }
                if (!this.isFunction[y][x] && invert) {
                    this.modules[y][x] = !this.modules[y][x];
                }
            }
        }
    };
    
    // Draw format bits
    QrCode.prototype.drawFormatBits = function(mask) {
        var data = this.errorCorrectionLevel.formatBits << 3 | mask;
        var rem = data;
        for (var i = 0; i < 10; i++) {
            rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
        }
        var bits = (data << 10 | rem) ^ 0x5412;
        
        // Draw first copy
        for (var i = 0; i <= 5; i++) {
            this.setFunctionModule(8, i, getBit(bits, i));
        }
        this.setFunctionModule(8, 7, getBit(bits, 6));
        this.setFunctionModule(8, 8, getBit(bits, 7));
        this.setFunctionModule(7, 8, getBit(bits, 8));
        for (var i = 9; i < 15; i++) {
            this.setFunctionModule(14 - i, 8, getBit(bits, i));
        }
        
        // Draw second copy
        for (var i = 0; i < 8; i++) {
            this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
        }
        for (var i = 8; i < 15; i++) {
            this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
        }
        this.setFunctionModule(8, this.size - 8, true);
    };
    
    // Draw version
    QrCode.prototype.drawVersion = function() {
        if (this.version < 7) return;
        
        var rem = this.version;
        for (var i = 0; i < 12; i++) {
            rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
        }
        var bits = this.version << 12 | rem;
        
        for (var i = 0; i < 18; i++) {
            var bit = getBit(bits, i);
            var a = this.size - 11 + i % 3;
            var b = Math.floor(i / 3);
            this.setFunctionModule(a, b, bit);
            this.setFunctionModule(b, a, bit);
        }
    };
    
    // Get penalty score
    QrCode.prototype.getPenaltyScore = function() {
        var result = 0;
        
        // Adjacent modules in row/column
        for (var y = 0; y < this.size; y++) {
            var runColor = false;
            var runX = 0;
            var runHistory = [0, 0, 0, 0, 0, 0, 0];
            for (var x = 0; x < this.size; x++) {
                if (this.modules[y][x] == runColor) {
                    runX++;
                    if (runX == 5) result += 3;
                    else if (runX > 5) result++;
                } else {
                    this.finderPenaltyAddHistory(runX, runHistory);
                    if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * 40;
                    runColor = this.modules[y][x];
                    runX = 1;
                }
            }
            result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * 40;
        }
        
        for (var x = 0; x < this.size; x++) {
            var runColor = false;
            var runY = 0;
            var runHistory = [0, 0, 0, 0, 0, 0, 0];
            for (var y = 0; y < this.size; y++) {
                if (this.modules[y][x] == runColor) {
                    runY++;
                    if (runY == 5) result += 3;
                    else if (runY > 5) result++;
                } else {
                    this.finderPenaltyAddHistory(runY, runHistory);
                    if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * 40;
                    runColor = this.modules[y][x];
                    runY = 1;
                }
            }
            result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * 40;
        }
        
        // 2×2 blocks of modules
        for (var y = 0; y < this.size - 1; y++) {
            for (var x = 0; x < this.size - 1; x++) {
                var color = this.modules[y][x];
                if (color == this.modules[y][x + 1] &&
                    color == this.modules[y + 1][x] &&
                    color == this.modules[y + 1][x + 1]) {
                    result += 3;
                }
            }
        }
        
        // Balance of dark and light modules
        var dark = 0;
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                if (this.modules[y][x]) dark++;
            }
        }
        var total = this.size * this.size;
        var k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
        result += k * 10;
        
        return result;
    };
    
    // Get alignment pattern positions
    QrCode.prototype.getAlignmentPatternPositions = function() {
        if (this.version == 1) return [];
        else {
            var numAlign = Math.floor(this.version / 7) + 2;
            var step = (this.version == 32) ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
            var result = [6];
            for (var pos = this.size - 7; result.length < numAlign; pos -= step) {
                result.splice(1, 0, pos);
            }
            return result;
        }
    };
    
    // Finder penalty methods
    QrCode.prototype.finderPenaltyCountPatterns = function(runHistory) {
        var n = runHistory[1];
        var core = n > 0 && runHistory[2] == n && runHistory[3] == 3 * n && runHistory[4] == n && runHistory[5] == n;
        return (core && runHistory[0] >= 4 * n && runHistory[6] >= n ? 1 : 0) +
               (core && runHistory[6] >= 4 * n && runHistory[0] >= n ? 1 : 0);
    };
    
    QrCode.prototype.finderPenaltyTerminateAndCount = function(currentRunColor, currentRunLength, runHistory) {
        if (currentRunColor) {
            this.finderPenaltyAddHistory(currentRunLength, runHistory);
            currentRunLength = 0;
        }
        currentRunLength += this.size;
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        return this.finderPenaltyCountPatterns(runHistory);
    };
    
    QrCode.prototype.finderPenaltyAddHistory = function(currentRunLength, runHistory) {
        if (runHistory[0] == 0) runHistory[0] = currentRunLength;
        else {
            runHistory.pop();
            runHistory.unshift(currentRunLength);
        }
    };
    
    // Static data
    QrCode.getNumRawDataModules = function(ver) {
        if (ver < 1 || ver > 40) throw new RangeError("Version number out of range");
        var result = (16 * ver + 128) * ver + 64;
        if (ver >= 2) {
            var numAlign = Math.floor(ver / 7) + 2;
            result -= (25 * numAlign - 10) * numAlign - 55;
            if (ver >= 7) result -= 36;
        }
        return result;
    };
    
    QrCode.getNumDataCodewords = function(ver, ecl) {
        return Math.floor(QrCode.getNumRawDataModules(ver) / 8) - QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    };
    
    QrCode.reedSolomonComputeDivisor = function(degree) {
        if (degree < 1 || degree > 255) throw new RangeError("Degree out of range");
        var result = [];
        for (var i = 0; i < degree - 1; i++) {
            result.push(0);
        }
        result.push(1);
        
        var root = 1;
        for (var i = 0; i < degree; i++) {
            for (var j = 0; j < result.length; j++) {
                result[j] = QrCode.reedSolomonMultiply(result[j], root);
                if (j + 1 < result.length) {
                    result[j] ^= result[j + 1];
                }
            }
            root = QrCode.reedSolomonMultiply(root, 0x02);
        }
        return result;
    };
    
    QrCode.reedSolomonComputeRemainder = function(data, divisor) {
        var result = [];
        for (var i = 0; i < divisor.length; i++) {
            result.push(0);
        }
        for (var i = 0; i < data.length; i++) {
            var factor = data[i] ^ result.shift();
            result.push(0);
            for (var j = 0; j < result.length; j++) {
                result[j] ^= QrCode.reedSolomonMultiply(divisor[j], factor);
            }
        }
        return result;
    };
    
    QrCode.reedSolomonMultiply = function(x, y) {
        if (x >>> 8 != 0 || y >>> 8 != 0) throw new RangeError("Byte out of range");
        var z = 0;
        for (var i = 7; i >= 0; i--) {
            z = (z << 1) ^ ((z >>> 7) * 0x11D);
            z ^= ((y >>> i) & 1) * x;
        }
        return z;
    };
    
    // Static tables
    QrCode.ECC_CODEWORDS_PER_BLOCK = [
        [null, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        [null, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
        [null, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        [null, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    ];
    
    QrCode.NUM_ERROR_CORRECTION_BLOCKS = [
        [null, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
        [null, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
        [null, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
        [null, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
    ];
    
    // QR Segment class
    function QrSegment(mode, numChars, bitData) {
        this.mode = mode;
        this.numChars = numChars;
        this.bitData = bitData;
    }
    
    QrSegment.prototype.getData = function() {
        return this.bitData.slice();
    };
    
    QrSegment.makeBytes = function(data) {
        var bb = [];
        for (var i = 0; i < data.length; i++) {
            appendBits(data[i], 8, bb);
        }
        return new QrSegment(Mode.BYTE, data.length, bb);
    };
    
    QrSegment.makeSegments = function(text) {
        if (text == "") return [];
        
        // Check if all numeric
        if (/^[0-9]*$/.test(text)) {
            return [QrSegment.makeNumeric(text)];
        }
        
        // Check if all alphanumeric
        if (/^[A-Z0-9 $%*+.\/:_-]*$/.test(text)) {
            return [QrSegment.makeAlphanumeric(text)];
        }
        
        // Default to byte mode
        return [QrSegment.makeBytes(toUtf8ByteArray(text))];
    };
    
    QrSegment.makeNumeric = function(digits) {
        if (!/^[0-9]*$/.test(digits)) throw new RangeError("String contains non-numeric characters");
        var bb = [];
        for (var i = 0; i < digits.length; ) {
            var n = Math.min(digits.length - i, 3);
            appendBits(parseInt(digits.substr(i, n), 10), n * 3 + 1, bb);
            i += n;
        }
        return new QrSegment(Mode.NUMERIC, digits.length, bb);
    };
    
    QrSegment.makeAlphanumeric = function(text) {
        if (!/^[A-Z0-9 $%*+.\/:_-]*$/.test(text)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
        var bb = [];
        var i;
        for (i = 0; i <= text.length - 2; i += 2) {
            var temp = QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
            temp += QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
            appendBits(temp, 11, bb);
        }
        if (i < text.length) {
            appendBits(QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
        }
        return new QrSegment(Mode.ALPHANUMERIC, text.length, bb);
    };
    
    QrSegment.getTotalBits = function(segs, version) {
        var result = 0;
        for (var i = 0; i < segs.length; i++) {
            var seg = segs[i];
            var ccbits = seg.mode.numBitsCharCount[Math.floor((version + 7) / 17)];
            if (seg.numChars >= (1 << ccbits)) return Number.MAX_VALUE;
            result += 4 + ccbits + seg.bitData.length;
        }
        return result;
    };
    
    QrSegment.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
    
    // Helper functions
    function appendBits(val, len, bb) {
        if (len < 0 || len > 31 || val >>> len != 0) throw new RangeError("Value out of range");
        for (var i = len - 1; i >= 0; i--) {
            bb.push((val >>> i) & 1);
        }
    }
    
    function getBit(x, i) {
        return ((x >>> i) & 1) != 0;
    }
    
    function toUtf8ByteArray(str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 0x80) {
                result.push(c);
            } else if (c < 0x800) {
                result.push(0xC0 | (c >>> 6));
                result.push(0x80 | (c & 0x3F));
            } else if (c < 0xD800 || c >= 0xE000) {
                result.push(0xE0 | (c >>> 12));
                result.push(0x80 | ((c >>> 6) & 0x3F));
                result.push(0x80 | (c & 0x3F));
            } else {
                i++;
                var c2 = str.charCodeAt(i);
                var codepoint = 0x10000 + (((c & 0x3FF) << 10) | (c2 & 0x3FF));
                result.push(0xF0 | (codepoint >>> 18));
                result.push(0x80 | ((codepoint >>> 12) & 0x3F));
                result.push(0x80 | ((codepoint >>> 6) & 0x3F));
                result.push(0x80 | (codepoint & 0x3F));
            }
        }
        return result;
    }
    
    // Canvas drawing function
    function toCanvas(qr, canvas, lightColor, darkColor, scale, border) {
        if (scale === undefined) scale = 8;
        if (border === undefined) border = 4;
        if (lightColor === undefined) lightColor = '#FFFFFF';
        if (darkColor === undefined) darkColor = '#000000';
        
        var width = (qr.size + border * 2) * scale;
        canvas.width = width;
        canvas.height = width;
        var ctx = canvas.getContext('2d');
        
        for (var y = -border; y < qr.size + border; y++) {
            for (var x = -border; x < qr.size + border; x++) {
                ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
                ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
            }
        }
    }
    
    // SVG drawing function
    function toSvgString(qr, border, lightColor, darkColor) {
        if (border === undefined) border = 4;
        if (lightColor === undefined) lightColor = '#FFFFFF';
        if (darkColor === undefined) darkColor = '#000000';
        
        var parts = [];
        for (var y = 0; y < qr.size; y++) {
            for (var x = 0; x < qr.size; x++) {
                if (qr.getModule(x, y)) {
                    parts.push('M' + (x + border) + ',' + (y + border) + 'h1v1h-1z');
                }
            }
        }
        
        return '<?xml version="1.0" encoding="UTF-8"?>\n' +
               '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
               '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + (qr.size + border * 2) + ' ' + (qr.size + border * 2) + '" stroke="none">\n' +
               '\t<rect width="100%" height="100%" fill="' + lightColor + '"/>\n' +
               '\t<path d="' + parts.join(' ') + '" fill="' + darkColor + '"/>\n' +
               '</svg>\n';
    }
    
    // Public API
    return {
        QrCode: QrCode,
        QrSegment: QrSegment,
        Ecc: Ecc,
        Mode: Mode,
        toCanvas: toCanvas,
        toSvgString: toSvgString
    };
})();

// Compatibility layer for existing code
var QRCodeGen = qrcodegen; 