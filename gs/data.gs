function refreshDefaultValues() {
    getDefaultInflationRate();
    getDefaultAppreciationRate();
    getDefaultSalePrice();
    getDefaultInterestRate();
    getDefaultFeesAndPoints();
}

function getDefaultInflationRate() {
    var defaultInflationRateCell = sVariables.getRange(getVariableCellDefault("Inflation Rate"));
    defaultInflationRateCell.setValue("");
    var quandlApiKey = getVariableValue("Quandl API Key");
    if (quandlApiKey) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FRED/T10YIE.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[1]) / 100;
            defaultInflationRateCell.setValue(dataNewest);
            defaultInflationRateCell.setNumberFormat("0.00%");
        } else {
            defaultInflationRateCell.setValue("Data N/A");
        }
    } else {
        defaultInflationRateCell.setValue("Invalid Quandl API Key");
    }
}

function getDefaultAppreciationRate() {
    var zipCode = getVariableValue("Zip Code");
    var defaultAppreciationRateCell = sVariables.getRange(getVariableCellDefault("Appreciation Rate"));
    defaultAppreciationRateCell.setValue("");
    var cityAndStateSlug = getCityAndStateSlug(zipCode);
    var zillowScrape = UrlFetchApp.fetch("https://www.zillow.com/" + cityAndStateSlug + "-" + zipCode + "/home-values/").toString();
    var indexForecast = zillowScrape.indexOf("1-yr forecast");
    var zillowScrape1stHalf = zillowScrape.substr(0, indexForecast);
    var zillowScrapeAppreciationRateFuzzy = zillowScrape1stHalf.substr(zillowScrape1stHalf.length - 100, 100);
    var indexAppreciationRatePercent = zillowScrapeAppreciationRateFuzzy.indexOf("%");
    var appreciationRate = parseFloat(zillowScrapeAppreciationRateFuzzy.substr(indexAppreciationRatePercent - 5, 5).trim()) / 100;
    if (appreciationRate) {
        defaultAppreciationRateCell.setValue(appreciationRate);
        defaultAppreciationRateCell.setNumberFormat("0.0%");
    } else {
        defaultAppreciationRateCell.setValue("Data N/A");
    }
}

function getCityAndStateSlug(zipCode) {
    var geocodeJson = UrlFetchApp.fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode).toString();
    var indexFormattedAddress = geocodeJson.indexOf("formatted_address");
    var geocodeJson2ndHalf = geocodeJson.substr(indexFormattedAddress + 22);
    var geocodeJsonArray = geocodeJson2ndHalf.split(',');
    var city = geocodeJsonArray[0].toString().toLowerCase();
    var stateAndZip = geocodeJsonArray[1].toString().substr(1);
    var state = stateAndZip.substr(0, stateAndZip.length - 6).toLowerCase();
    var cityAndStateSlug = city + "-" + state;
    return cityAndStateSlug;
}

function getDefaultSalePrice() {
    var zipCode = getVariableValue("Zip Code");
    var defaultSalePriceCell = sVariables.getRange(getVariableCellDefault("Sale Price"));
    defaultSalePriceCell.setValue("");
    var quandlApiKey = getVariableValue("Quandl API Key");
    if (quandlApiKey && zipCode) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/ZILL/Z" + zipCode + "_MSP.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[1]);
            defaultSalePriceCell.setValue(dataNewest);
            defaultSalePriceCell.setNumberFormat("$0,000.00");
        } else {
            defaultSalePriceCell.setValue("Data for " + zipCode + " N/A");
        }
    } else {
        defaultSalePriceCell.setValue("Invalid Quandl API Key or Zip Code");
    }
}

function getDefaultInterestRate() {
    var term = getVariableValue("Term");
    var defaultInterestRateCell = sVariables.getRange(getVariableCellDefault("Interest Rate"));
    defaultInterestRateCell.setValue("");
    var quandlApiKey = getVariableValue("Quandl API Key");
    if (quandlApiKey && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[1]) / 100;
            defaultInterestRateCell.setValue(dataNewest);
            defaultInterestRateCell.setNumberFormat("0.00%");
        } else {
            defaultInterestRateCell.setValue("Data N/A");
        }
    } else {
        defaultInterestRateCell.setValue("Invalid Quandl API Key or Term");
    }
}

function getDefaultFeesAndPoints() {
    var term = getVariableValue("Term");
    var defaultFeesAndPointsCell = sVariables.getRange(getVariableCellDefault("Fees & Points"));
    defaultFeesAndPointsCell.setValue("");
    var quandlApiKey = getVariableValue("Quandl API Key");
    if (quandlApiKey && (term == 15 || term == 30)) {
        var jsonArray = ImportJSON("https://www.quandl.com/api/v3/datasets/FMAC/FIX" + term + "YR.json?api_key=" + quandlApiKey);
        var dataIndex = dict2dArrayLookup("Data", jsonArray);
        if (jsonArray[1][dataIndex]) {
            var data = jsonArray[1][dataIndex].split(',');
            var dataNewest = parseFloat(data[2]) / 100;
            defaultFeesAndPointsCell.setValue(dataNewest);
            defaultFeesAndPointsCell.setNumberFormat("0.00%");
        } else {
            defaultFeesAndPointsCell.setValue("Data N/A");
        }
    } else {
        defaultFeesAndPointsCell.setValue("Invalid Quandl API Key or Term");
    }
}