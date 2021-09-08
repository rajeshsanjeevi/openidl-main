const hdsProcessor = require('./HDSProcessor')

module.exports.convertRecordToFlatJson = (record) => {
  return hdsProcessor.convertRecordToFlatJson(record, schemas)
}

module.exports.convertFlatJsonToHdsJson = (flatJson, batchId, batchHash) => {
  var mapping = hdsProcessor.baseMapping(flatJson, batchId, batchHash)
  addHOMapping(flatJson, batchId, batchHash, mapping)
  var baseMapped = hdsProcessor.convertToHDSJson(flatJson, batchId, batchHash, mapping)
  mapped = convertHOToHDSJson(flatJson, batchId, batchHash, mapping, baseMapped)
  return mapped

}

addHOMapping = (flatJson, batchId, batchHash, mapping) => {
  mapping.mapPremiumLevel = () => { return 'Policy' }
}

convertHOToHDSJson = (flatJson, batchId, batchHash, mapping, alreadyMapped) => {
  return alreadyMapped
}

const schemas = {
  "Premium": {
    "type": "record", "name": "premiumrecord",
    "fields": [
      { "name": "lineOfInsurance", "type": "string", "start": 0, "length": 2 },
      { "name": "accountingDate", "type": "string", "start": 2, "length": 4 },
      { "name": "companyCode", "type": "string", "start": 6, "length": 4 },
      { "name": "stateCode", "type": "string", "start": 10, "length": 2 },
      { "name": "reserved1", "type": "string", "start": 12, "length": 7 },
      { "name": "transactionCode", "type": "string", "start": 19, "length": 1 },
      { "name": "premiumLossAmount", "type": "string", "start": 20, "length": 10 },
      { "name": "exposureClaimCount", "type": "string", "start": 30, "length": 5 },
      { "name": "annualStatementLineOfBusiness", "type": "string", "start": 35, "length": 3 },
      { "name": "reserved2", "type": "string", "start": 38, "length": 1 },
      { "name": "policyForm", "type": "string", "start": 39, "length": 2 },
      { "name": "reserved3", "type": "string", "start": 41, "length": 13 },
      { "name": "classCode", "type": "string", "start": 54, "length": 5 },
      { "name": "reserved4", "type": "string", "start": 59, "length": 42 },
      { "name": "zipCode", "type": "string", "start": 101, "length": 5 },
      { "name": "reserved5", "type": "string", "start": 106, "length": 20 },
      { "name": "policyNumberClaimNumberIdentifier", "type": "string", "start": 126, "length": 14 },
      { "name": "reserved6", "type": "string", "start": 140, "length": 10 },
      { "name": "sicCode", "type": "string", "start": 150, "length": 4 },
      { "name": "taxID", "type": "string", "start": 154, "length": 9 },
      { "name": "numberOfEmployees", "type": "string", "start": 163, "length": 6 },
      { "name": "policyFormEdition", "type": "string", "start": 169, "length": 25 },
      { "name": "address", "type": "string", "start": 194, "length": 150 }
    ]
  },
  "Loss": {
    "type": "record", "name": "lossesrecord",
    "fields": [
      { "name": "lineOfInsurance", "type": "string", "start": 0, "length": 2 },
      { "name": "accountingDate", "type": "string", "start": 2, "length": 4 },
      { "name": "companyCode", "type": "string", "start": 6, "length": 4 },
      { "name": "stateCode", "type": "string", "start": 10, "length": 2 },
      { "name": "reserved1", "type": "string", "start": 12, "length": 7 },
      { "name": "transactionCode", "type": "string", "start": 19, "length": 1 },
      { "name": "premiumLossAmount", "type": "string", "start": 20, "length": 10 },
      { "name": "exposureClaimCount", "type": "string", "start": 30, "length": 5 },
      { "name": "annualStatementLineOfBusiness", "type": "string", "start": 35, "length": 3 },
      { "name": "reserved2", "type": "string", "start": 38, "length": 1 },
      { "name": "policyForm", "type": "string", "start": 39, "length": 2 },
      { "name": "reserved3", "type": "string", "start": 41, "length": 13 },
      { "name": "classCode", "type": "string", "start": 54, "length": 5 },
      { "name": "reserved4", "type": "string", "start": 59, "length": 33 },
      { "name": "monthsCoveredCauseOfLoss", "type": "string", "start": 92, "length": 2 },
      { "name": "claimStatus", "type": "string", "start": 94, "length": 1 },
      { "name": "accidentDate", "type": "string", "start": 95, "length": 6 },
      { "name": "zipCode", "type": "string", "start": 101, "length": 5 },
      { "name": "reserved5", "type": "string", "start": 106, "length": 20 },
      { "name": "policyNumberClaimNumberIdentifier", "type": "string", "start": 126, "length": 14 },
      { "name": "reserved6", "type": "string", "start": 140, "length": 10 },
      { "name": "sicCode", "type": "string", "start": 150, "length": 4 },
      { "name": "taxID", "type": "string", "start": 154, "length": 9 },
      { "name": "numberOfEmployees", "type": "string", "start": 163, "length": 6 },
      { "name": "policyFormEdition", "type": "string", "start": 169, "length": 25 },
      { "name": "address", "type": "string", "start": 194, "length": 150 }
    ]
  }
}