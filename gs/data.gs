function getDefaultInflationRate(quandlApiKey) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true) {
        try {
            var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FRED/T10YIE.json?api_key=" + quandlApiKey);
        } catch (err) {
            return "Data N/A";
        }
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) / 100 : "Data N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultAppreciationRate(zipCode) {
    //ZHVF is unavailable via API, so resort to scraping
    var zillowScrape = UrlFetchApp.fetch("https://www.zillow.com/" + getCityAndStateSlug(zipCode) + "-" + zipCode + "/home-values/").toString();
    zillowScrape = zillowScrape.substr(0, zillowScrape.indexOf("1-yr forecast"));
    zillowScrape = zillowScrape.substr(zillowScrape.length - 100, 100);
    var appreciationRate = parseFloat(zillowScrape.substr(zillowScrape.indexOf("%") - 5, 5).trim()) / 100;
    return (appreciationRate) ? appreciationRate : "Data for " + zipCode + " N/A";
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

function getDefaultPriceToRentRatio(quandlApiKey, zipCode) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && zipCode) {
        try {
            var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/ZILL/Z" + zipCode + "_PRR.json?api_key=" + quandlApiKey);
        } catch (err) {
            return "Data for " + zipCode + " N/A";
        }
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) : "Data for " + zipCode + " N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultSalePrice(quandlApiKey, zipCode) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && zipCode) {
        try {
            var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/ZILL/Z" + zipCode + "_MSP.json?api_key=" + quandlApiKey);
        } catch (err) {
            return "Data for " + zipCode + " N/A";
        }
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) : "Data for " + zipCode + " N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultInterestRate(quandlApiKey, term) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && (term == 15 || term == 30)) {
        try {
            var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        } catch (err) {
            return "Data for " + term + " N/A";
        }
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[1]) / 100 : "Data N/A";
    } else {
        return quandlApiKeyValidation;
    }
}

function getDefaultFeesAndPoints(quandlApiKey, term) {
    var quandlApiKeyValidation = validateQuandlApiKey(quandlApiKey);
    if (quandlApiKeyValidation == true && (term == 15 || term == 30)) {
        try {
            var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        } catch (err) {
            return "Data for " + term + " N/A";
        }
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        return (jsonArray[1][dataIndex]) ? parseFloat((jsonArray[1][dataIndex].split(','))[2]) / 100 : "Data N/A";
    } else {
        return quandlApiKeyValidation;
    }
}