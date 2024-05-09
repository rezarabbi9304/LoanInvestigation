# Loan Investigation Documentation

1. Get logged-in user assigned area information
2. Get loan applications (In Investigation State) by area (Present Address or Permanent Address) (Applicant Name, LoanId, LoanNumber)
3. Get loan application details

```json
{
  "ApplicationId": 106656,
  "LoanNumber": "D20240220106656",
  "FullName": "BAPPY BESRA",
  "PersonId": 64025,
  "ProductTypeId": 2,
  "LoanProductCode": "20 ",
  "LoanProductName": "Loan against M.S.P",
  "InterestRate": 11,
  "TotalInstallment": 12,
  "AppliedLoanAmount": 1000,
  "LoanApplicationDate": "2024-02-20T00:00:00",
  "LoanStatus": "",
  "CurrentStageName": "Sent for Investigation",
  "BranchName": "Head Office",
  "EntryBranchName": "Head Office",
  "BranchCode": "01",
  "PresentAddress": {
    "id": 1,
    "InvestigatedInfo": " GP,GHA-193/2, MONIPURI PARA, 1215, JGAON, DHAKA",
    "IsInformationCorrect": false,
    "FindingsByInvestigator": "Correct",
    "Informer": {
      "AccountNumber": "",
      "Name": "",
      "Designation": "",
      "PhoneNumber": ""
    }
  },
  "PermanentAddress": {
    "id": 2,
    "InvestigatedInfo": " BELPUKUR, BELBARI, 5200, DINAJPUR DAR, DINAJPUR",
    "IsInformationCorrect": false,
    "FindingsByInvestigator": "Correct",
    "Informer": {
      "AccountNumber": "",
      "Name": "",
      "Designation": "",
      "PhoneNumber": ""
    }
  },
  "WorkAddress": {
    "id": 3,
    "InvestigatedInfo": " BELPUKUR, BELBARI, 5200, DINAJPUR DAR, DINAJPUR",
    "IsInformationCorrect": false,
    "FindingsByInvestigator": "Correct",
    "Informer": {
      "AccountNumber": "",
      "Name": "",
      "Designation": "",
      "PhoneNumber": ""
    }
  },
  "PurposeOfLoan": {
    "id": 4,
    "InvestigatedInfo": "Business",
    "IsInformationCorrect": false,
    "FindingsByInvestigator": "Correct",
    "Informer": {
      "AccountNumber": "",
      "Name": "",
      "Designation": "",
      "PhoneNumber": ""
    }
  },
  "Attachments": [
    {
      "id": 4,
      "InvestigatedInfo": "Bank Statement",
      "IsInformationCorrect": false,
      "FindingsByInvestigator": "Correct",
      "Informer": {
        "AccountNumber": "",
        "Name": "",
        "Designation": "",
        "PhoneNumber": ""
      }
    }
  ],
  "Incomes": [
    {
      "id": 5,
      "InvestigatedInfo": {
        "Name": "",
        "Relation": "",
        "Occupation": "",
        "IncomeAmount": 50000
      },
      "IsInformationCorrect": false,
      "FindingsByInvestigator": "Correct",
      "Informer": {
        "AccountNumber": "",
        "Name": "",
        "Designation": "",
        "PhoneNumber": ""
      }
    },
    {
      "id": 6,
      "InvestigatedInfo": "Non-Declared",
      "IsInformationCorrect": false,
      "FindingsByInvestigator": "Correct",
      "Informer": {
        "AccountNumber": "",
        "Name": "",
        "Designation": "",
        "PhoneNumber": ""
      }
    }
  ],
  "Expenses": [
    {
      "id": 7,
      "InvestigatedInfo": "Gas Bill",
      "IsInformationCorrect": false,
      "FindingsByInvestigator": "Correct",
      "Informer": {
        "AccountNumber": "",
        "Name": "",
        "Designation": "",
        "PhoneNumber": ""
      }
    },
    {
      "id": 8,
      "InvestigatedInfo": "Non-Declared",
      "IsInformationCorrect": false,
      "FindingsByInvestigator": "3000",
      "Informer": {
        "AccountNumber": "",
        "Name": "",
        "Designation": "",
        "PhoneNumber": ""
      }
    }
  ],
  "ExistingFamilyLoans": [
    {
      "id": 9,
      "InvestigatedInfo": {
        "Name": "",
        "Relation": "",
        "LoanTakenFrom": "",
        "LoanNumber": "",
        "LoanAmount": 50000
      },
      "IsInformationCorrect": false,
      "FindingsByInvestigator": "Correct",
      "Informer": {
        "AccountNumber": "",
        "Name": "",
        "Designation": "",
        "PhoneNumber": ""
      }
    }
  ]
}
```
