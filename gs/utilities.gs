function dict2dArrayLookup(key, dict2dArray) {
    for (var i = 0, dict2dArrayHeight = dict2dArray[0].length; i < dict2dArrayHeight; i++) {
        if (dict2dArray[0][i] == key) {
            return i;
        }
    }
}

function validateQuandlApiKey(quandlApiKey) {
    //TODO: further api/regex validation
    return (quandlApiKey) ? true : "Invalid Quandl API Key";
}