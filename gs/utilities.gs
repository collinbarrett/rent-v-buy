function dict2dArrayLookup(key, dict2dArray) {
    for (var i = 0, dict2dArrayHeight = dict2dArray[0].length; i < dict2dArrayHeight; i++) {
        if (dict2dArray[0][i] == key) {
            return i;
        }
    }
}

function getVariableIndex(variable) {
    var variableRange = sVariables.getRange("C2:C").getValues();
    for (var i = 0, headerDataLength = headerData[0].length; i < headerDataLength; i++) {
        if (headerData[0][i] == colHeader) {
            return String.fromCharCode(65 + i);
        }
    }
    return null;
}