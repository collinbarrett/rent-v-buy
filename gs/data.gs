function getMedianSalePrice(quandlApiKey, zipCode) {
    if (quandlApiKey && zipCode) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/ZILL/Z" + zipCode + "_MSP.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var mspData = jsonArray[1][dataIndex].split(',');
            var mspNewest = parseFloat(mspData[1]);
            return mspNewest;
        } else {
            return "Data for " + zipCode + " N/A";
        }
    } else {
        return "Invalid Quandl API Key or Zip Code";
    }
}

function getMortgageRate(quandlApiKey, term) {
    if (quandlApiKey && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var mrData = jsonArray[1][dataIndex].split(',');
            var mrNewest = parseFloat(mrData[1]) / 100;
            return mrNewest;
        } else {
            return "Data N/A";
        }
    } else {
        return "Invalid Quandl API Key or Term";
    }
}

function getMortgageFeesAndPoints(quandlApiKey, term) {
    if (quandlApiKey && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var mrData = jsonArray[1][dataIndex].split(',');
            var mrNewest = parseFloat(mrData[2]) / 100;
            return mrNewest;
        } else {
            return "Data N/A";
        }
    } else {
        return "Invalid Quandl API Key or Term";
    }
}

function getInflationRate10YrExpected(quandlApiKey) {
    if (quandlApiKey) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FRED/T10YIE.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var irData = jsonArray[1][dataIndex].split(',');
            var irNewest = parseFloat(irData[1]) / 100;
            return irNewest;
        } else {
            return "Data N/A";
        }
    } else {
        return "Invalid Quandl API Key";
    }
}