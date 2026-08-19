/* =========================================================================
   Sample data sets for the Medical & Travel Expense Request form.

   Three datasets are provided to demonstrate DATA-DRIVEN behaviour:

   - standard: mirrors the supplied source PDF
   - empty: editable blank form
   - large: demonstrates multiple rows and pagination
   ========================================================================= */

window.EXPENSE_DATASETS = {
  standard: {
    requesterName: "Madeleine Willson",
    claimNo: "20042047",
    workerAppId: "712041",
    submittedAt: "March 28, 2024 20:43",
    privacyAccepted: true,

    prescriptionDrugs: [
      {
        drugName: "Naproxen",
        prescriptionDate: "February 28, 2024",
        datePurchased: "February 29, 2024",
        provider: "Dr. Best",
        paidAmount: "$20.00"
      }
    ],

    otcDrugs: [
      {
        drugName: "Advil",
        datePurchased: "March 28, 2024",
        paidAmount: "$8.00",
        sellerName: "Shoppers Drug Mart",
        reason: "Pain"
      }
    ],

    medicalSupplies: [
      {
        item: "Tensor",
        datePurchased: "February 28, 2024",
        wasPrescribed: "Yes",
        provider: "Dr. Best",
        paidAmount: "$10.00",
        sellerName: "Shoppers DrugMart"
      }
    ],

    parking: [
      {
        address: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada",
        date: "March 28, 2024",
        paidAmount: "$10.00",
        meterUsed: "yes",
        meterNumber: "12245"
      }
    ],

    mileage: [
      {
        appointmentDate: "March 28, 2024",
        providerAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
        workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada",
        km: "20 km"
      }
    ],

    busTaxi: [
      {
        appointmentDate: "March 28, 2024",
        startAddress: "",
        providerAddress:
          "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
        mode: "Bus",
        fare: "$3.00"
      },
      {
        appointmentDate: "March 27, 2024",
        startAddress: "25 Furby St, Winnipeg MB R3C2A2, Canada",
        providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada",
        mode: "Taxi",
        fare: "$15.00"
      }
    ]
  },

  empty: {
    requesterName: "",
    claimNo: "",
    workerAppId: "",
    submittedAt: "",
    privacyAccepted: false,

    prescriptionDrugs: [],
    otcDrugs: [],
    medicalSupplies: [],
    parking: [],
    mileage: [],
    busTaxi: []
  },

  large: {
    requesterName: "Priya Natarajan",
    claimNo: "20155872",
    workerAppId: "755430",
    submittedAt: "August 18, 2026 16:47",
    privacyAccepted: true,

    prescriptionDrugs: [
      {
        drugName: "Naproxen",
        prescriptionDate: "Jan 4, 2026",
        datePurchased: "Jan 5, 2026",
        provider: "Dr. Best",
        paidAmount: "$20.00"
      },
      {
        drugName: "Cyclobenzaprine",
        prescriptionDate: "Jan 18, 2026",
        datePurchased: "Jan 19, 2026",
        provider: "Dr. Best",
        paidAmount: "$32.50"
      },
      {
        drugName: "Gabapentin",
        prescriptionDate: "Feb 2, 2026",
        datePurchased: "Feb 3, 2026",
        provider: "Dr. Chowdhury",
        paidAmount: "$45.10"
      },
      {
        drugName: "Naproxen (refill)",
        prescriptionDate: "Feb 20, 2026",
        datePurchased: "Feb 21, 2026",
        provider: "Dr. Best",
        paidAmount: "$20.00"
      },
      {
        drugName: "Diclofenac gel",
        prescriptionDate: "Mar 3, 2026",
        datePurchased: "Mar 4, 2026",
        provider: "Dr. Best",
        paidAmount: "$18.75"
      },
      {
        drugName: "Naproxen (refill)",
        prescriptionDate: "Mar 20, 2026",
        datePurchased: "Mar 21, 2026",
        provider: "Dr. Best",
        paidAmount: "$20.00"
      }
    ],

    otcDrugs: [
      {
        drugName: "Advil",
        datePurchased: "Jan 6, 2026",
        paidAmount: "$8.00",
        sellerName: "Shoppers Drug Mart",
        reason: "Pain"
      },
      {
        drugName: "Tylenol Extra Strength",
        datePurchased: "Jan 22, 2026",
        paidAmount: "$9.49",
        sellerName: "Shoppers Drug Mart",
        reason: "Pain"
      },
      {
        drugName: "Robax Platinum",
        datePurchased: "Feb 8, 2026",
        paidAmount: "$14.29",
        sellerName: "Rexall",
        reason: "Muscle spasm"
      }
    ],

    medicalSupplies: [
      {
        item: "Tensor bandage",
        datePurchased: "Jan 5, 2026",
        wasPrescribed: "Yes",
        provider: "Dr. Best",
        paidAmount: "$10.00",
        sellerName: "Shoppers Drug Mart"
      },
      {
        item: "Lumbar support brace",
        datePurchased: "Jan 19, 2026",
        wasPrescribed: "Yes",
        provider: "Dr. Best",
        paidAmount: "$54.00",
        sellerName: "Wellwise"
      },
      {
        item: "Ice pack wrap",
        datePurchased: "Feb 3, 2026",
        wasPrescribed: "No",
        provider: "",
        paidAmount: "$16.99",
        sellerName: "London Drugs"
      },
      {
        item: "TENS unit pads",
        datePurchased: "Mar 4, 2026",
        wasPrescribed: "Yes",
        provider: "Dr. Chowdhury",
        paidAmount: "$21.50",
        sellerName: "Wellwise"
      }
    ],

    parking: [
      {
        address: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada",
        date: "Jan 5, 2026",
        paidAmount: "$10.00",
        meterUsed: "yes",
        meterNumber: "12245"
      },
      {
        address: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
        date: "Jan 19, 2026",
        paidAmount: "$12.00",
        meterUsed: "yes",
        meterNumber: "38810"
      },
      {
        address: "409 Tache Ave, Winnipeg MB R2H 2A6, Canada",
        date: "Feb 3, 2026",
        paidAmount: "$8.00",
        meterUsed: "no",
        meterNumber: ""
      },
      {
        address: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
        date: "Mar 4, 2026",
        paidAmount: "$12.00",
        meterUsed: "yes",
        meterNumber: "38810"
      }
    ],

    mileage: Array.from({ length: 9 }).map((_, i) => ({
      appointmentDate: `Q${Math.floor(i / 3) + 1} visit ${i + 1}, 2026`,
      providerAddress:
        "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
      workplaceAddress:
        "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada",
      km: `${18 + i} km`
    })),

    busTaxi: Array.from({ length: 7 }).map((_, i) => ({
      appointmentDate: `Visit ${i + 1}, 2026`,
      startAddress:
        i % 2 === 0
          ? ""
          : "25 Furby St, Winnipeg MB R3C2A2, Canada",
      providerAddress:
        "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
      mode: i % 2 === 0 ? "Bus" : "Taxi",
      fare: i % 2 === 0 ? "$3.00" : "$15.00"
    }))
  }
};