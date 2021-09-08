const chai = require('chai');
const expect = require('chai').expect;
const premiumRecords = require('./data/testData').sampleBPFlatPremiumRecords
const lossRecords = require('./data/testData').sampleBPFlatLossRecords
const lobProcessor = require('../LOBProcessor')

describe('Testing BP Processor', () => {
    var batchId = '1111'
    var batchHash = '1111'
    it ('should map BP Coverage Premiums correctly', () => {
        var hdsResult = lobProcessor.convertFlatToHDS(premiumRecords[1], batchId, batchHash)
        expect(hdsResult.policy.company.code, 'Premium company code').to.equal('9999')
        expect(hdsResult.policy.lineOfInsurance.legacyCode, 'Premium Line of Insurance code').to.equal('49')
        expect(hdsResult.policy.lineOfInsurance.name, 'Premium LOB Name').to.equal('Businessowners')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType, 'Premium Transaction type').to.equal('Limited Coding')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode, 'Premium Transaction code').to.equal('8')
        expect(hdsResult.policy.currencyPayment[0].currencyPaymentAmount, 'Premium amount').to.equal(13.45)
        expect(hdsResult.policy.policyStructure[0].coverages[0].exposureAmount, 'Premium Exposure amount').to.equal(2)
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].periodStartDate, 'Premium Accounting Date').to.equal('2010-07-01')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode, 'Premium State code').to.equal('54')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateName, 'Premium State Name').to.equal('Alaska')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateAbbreviation, 'Premium State Abbreviation').to.equal('AK')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.legacyCode, 'Premium Policy Form code').to.equal('64')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.description, 'Premium Policy Form description').to.equal('Money and securities')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.versionNumber, 'Premium Policy Form Version Number').to.equal('??')
        expect(hdsResult.policy.policyStructure[0].riskClassification.legacyCode, 'Premium Risk Classification code').to.equal('99909')
        expect(hdsResult.policy.policyStructure[0].riskClassification.description, 'Premium Risk Classification description').to.equal("Optical and Hearing Aid Establishments")
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.postalCode, 'Premium Postal code').to.equal('06042')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryLegacyCode, 'Premium Country code').to.equal(undefined)
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryName, 'Premium Country Name').to.equal('TODO: need reference data')
        expect(hdsResult.policy.commercialPolicy.policyNumber, 'Premium Policy Number').to.equal('BP123456789124')
        expect(hdsResult.policy.location[0].address, 'Premium Address').to.equal('90 Slate Venue')
        expect(hdsResult.policy.taxID, 'Premium Tax ID').to.equal('123456789')
        expect(hdsResult.policy.businessClassification[0].industryCode, 'Premium SIC code').to.equal('1234')
        expect(hdsResult.policy.businessClassification[0].description, 'Premium SIC description').to.equal(undefined)
        expect(hdsResult.policy.limits[0].type, 'Premium Limit type').to.equal("Business Interruption Limit")
        expect(hdsResult.policy.limits[0].amount, 'Premium Limit amount').to.equal(null)
        expect(hdsResult.policy.numberOfEmployees, 'Premium Number of Employees').to.equal(40)
        expect(hdsResult.policy.policyForm.policyFormEdition, 'Premiium Policy Form Edition').to.equal('PFE123456')
        expect(hdsResult.policy.policyForm.businessInterruptionFlag, 'Premium BI Flag').to.equal(false)
        expect(hdsResult.policy.policyForm.physicalDamageRequirement, 'Premium PD Requirement').to.equal(false)
        expect(hdsResult.policy.policyForm.viralExclusion, 'Premium Viral Exclusion').to.equal(false)
        expect(hdsResult.policy.annualStatementLineOfBusiness.code, "Premium Annual statement line of business code").to.equal('021')
        expect(hdsResult.policy.annualStatementLineOfBusiness.description, 'Premium Annual statement line of business').to.equal('Allied Lines, including Glass')
    });

    it ('should map BP Policy Premiums correctly', () => {
        var hdsResult = lobProcessor.convertFlatToHDS(premiumRecords[0], batchId, batchHash)
        expect(hdsResult.policy.currencyPayment[0].accountStatement.periodStartDate, 'Premium Accounting Date').to.equal('2009-01-01')
        expect(hdsResult.policy.currencyPayment[0].transactionType, 'Premium Transaction type').to.equal('Premium or Cancellation')
        expect(hdsResult.policy.currencyPayment[0].transactionCode, 'Premium Transaction code').to.equal('1')
    });

    it ('should map BP Paid Losses correctly', () => {
        var hdsResult = lobProcessor.convertFlatToHDS(lossRecords[0], batchId, batchHash)
        expect(hdsResult.policy.lineOfInsurance.legacyCode, 'Loss Line of Insurance code').to.equal('49')
        expect(hdsResult.policy.lineOfInsurance.name, 'Loss LOB Name').to.equal('Businessowners')
        expect(hdsResult.policy.company.code, 'Loss company code').to.equal('7777')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode, 'Loss State code').to.equal('01')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateName, 'Loss State Name').to.equal('Alabama')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.stateAbbreviation, 'Loss State Abbreviation').to.equal('AL')
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryLegacyCode, 'Loss Country code').to.equal(undefined)
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.countryName, 'Loss Country Name').to.equal('TODO: need reference data')
        expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement.periodStartDate, 'Loss Accounting Date').to.equal('2009-01-01')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType, 'Loss Transaction type').to.equal('Paid loss')
        expect(hdsResult.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode, 'Loss Transaction code').to.equal('2')
        expect(hdsResult.claim.claimFolder.claimComponent[0].causeOfLoss.legacyCode, 'Loss Cause of loss code').to.equal('50')
        expect(hdsResult.claim.claimFolder.claimComponent[0].causeOfLoss.category, 'Loss Cause of loss category').to.equal('Liability Coverage')
        expect(hdsResult.claim.claimFolder.claimComponent[0].causeOfLoss.name, 'Loss Cause of loss name').to.equal('Products liability,Cause of Loss')
        expect(hdsResult.claim.claimFolder.eventStartDate, 'Loss Accident Date').to.equal('2009-02-03')
        expect(hdsResult.claim.claimFolder.claimNumber, 'Loss Claim Number').to.equal('BP1234567891  ')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.legacyCode, 'Loss Policy Form code').to.equal('14')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.description, 'Loss Policy Form description').to.equal('Standard form')
        expect(hdsResult.policy.policyStructure[0].coverages[0].policyForm.versionNumber, 'Loss Policy Form Version Number').to.equal('??')
        expect(hdsResult.policy.policyStructure[0].riskClassification.legacyCode, 'Loss Risk Classification code').to.equal('99903')
        expect(hdsResult.policy.policyStructure[0].riskClassification.description, 'Loss Risk Classification description').to.equal("Cosmetologists' Liability")
        expect(hdsResult.policy.policyStructure[0].location[0].geographicLocation.postalCode, 'Loss Postal code').to.equal('06040')
        expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].transactionType, 'Loss Transaction type').to.equal('Paid loss')
        expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].transactionCode, 'Loss Transaction code').to.equal('2')
        expect(hdsResult.claim.claimFolder.claimStatus, 'Loss Claim Status').to.equal(' ')
        expect(hdsResult.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].type, 'Loss amount type').to.equal('Loss amount')
        expect(hdsResult.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].amount, 'Loss amount').to.equal(95.67)
        expect(hdsResult.policy.annualStatementLineOfBusiness.code, "Loss Annual statement line of business code").to.equal('010')
        expect(hdsResult.policy.annualStatementLineOfBusiness.description, 'Loss Annual statement line of business').to.equal('Fire')
    });

    it ('should map BP Reserved Losses correctly', () => {
        var hdsResult = lobProcessor.convertFlatToHDS(lossRecords[1], batchId, batchHash)
        expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].type, 'Reserved Loss amount type').to.equal('Reserve for Claim')
        expect(hdsResult.claim.claimFolder.claimComponent[0].currencyPayment[0].currencyPaymentAmount, 'Reserved Loss amount').to.equal(13.45)
    });
})

