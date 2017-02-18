function getDefaultInflationRate(quandlApiKey) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FRED/T10YIE.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) / 100 : "Data N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultAppreciationRate(quandlApiKey, zipCode) {
    var zillowScrape = UrlFetchApp.fetch("https://www.zillow.com/" + getCityAndStateSlug(zipCode) + "-" + zipCode + "/home-values/").toString();
    zillowScrape = zillowScrape.substr(0, zillowScrape.indexOf("1-yr forecast"));
    zillowScrape = zillowScrape.substr(zillowScrape.length - 100, 100);
    var appreciationRate = parseFloat(zillowScrape.substr(zillowScrape.indexOf("%") - 5, 5).trim()) / 100;
    return (appreciationRate) ? appreciationRate : "Data N/A";
}

function getCityAndStateSlug(zipCode) {
    //TEMP: retry loop to get around free Google API limits, could rapidly expire daily quota, needs refactor
    var geocodeJson = "exceeded";
    while (geocodeJson.indexOf("exceeded") > -1) {
        geocodeJson = UrlFetchApp.fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode).toString();
    }
    var geocodeJsonArray = geocodeJson.substr(geocodeJson.indexOf("formatted_address") + 22).split(',');
    var city = geocodeJsonArray[0].toString().toLowerCase();
    var stateAndZip = geocodeJsonArray[1].toString().substr(1);
    var state = stateAndZip.substr(0, stateAndZip.length - 6).toLowerCase();
    return city + "-" + state;
}

function getDefaultSalePrice(quandlApiKey, zipCode) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && zipCode) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/ZILL/Z" + zipCode + "_MSP.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) : "Data for " + zipCode + " N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultInterestRate(quandlApiKey, term) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) / 100 : "Data N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultFeesAndPoints(quandlApiKey, term) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[2]) / 100 : "Data N/A";
    } else {
        return quandlApiKeyValidation;
    }
}