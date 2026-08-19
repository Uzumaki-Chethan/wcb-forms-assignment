/* =========================================================================
   Sample data sets for the Worker Progress Report form.

   - standard: mirrors the supplied PDF
   - minimal: completely blank editable form
   - detailed: demonstrates longer answers and additional content
   ========================================================================= */

window.PROGRESS_DATASETS = {
  standard: {
    requesterName: "Madeleine Willson",
    claimNo: "20042047",
    workerAppId: "712041",
    submittedAt: "March 19, 2024 19:21",

    returnToWork: {
      status: "returned",
      returnDate: "March 15, 2024"
    },

    workingType: {
      type: "modified-reduced",
      otherText: ""
    },

    returnGoing: "Terrible. Testing Testing",

    expectedReturnDate: "",

    concerns: "",

    lastContact: {
      name: "",
      date: ""
    },

    recovery: {
      status: "recovered"
    },

    recoveryComments: "",

    painScale: null,

    medicalTreatment: {
      status: "unspecified",
      providerType: ""
    },

    lastTreatment: {
      providerName: "",
      date: ""
    },

    nextTreatment: {
      providerName: "",
      date: ""
    },

    chiroFrequency: "",

    medication: {
      status: "unspecified",
      medName: ""
    },

    homeExercises: {
      status: "unspecified",
      exercisesText: ""
    },

    otherInfo: "No info Testing Testing",

    certifyAccepted: true,

    privacyAccepted: true
  },

  minimal: {
    requesterName: "",
    claimNo: "",
    workerAppId: "",
    submittedAt: "",

    returnToWork: {
      status: "",
      returnDate: ""
    },

    workingType: {
      type: "unspecified",
      otherText: ""
    },

    returnGoing: "",

    expectedReturnDate: "",

    concerns: "",

    lastContact: {
      name: "",
      date: ""
    },

    recovery: {
      status: ""
    },

    recoveryComments: "",

    painScale: null,

    medicalTreatment: {
      status: "",
      providerType: ""
    },

    lastTreatment: {
      providerName: "",
      date: ""
    },

    nextTreatment: {
      providerName: "",
      date: ""
    },

    chiroFrequency: "",

    medication: {
      status: "",
      medName: ""
    },

    homeExercises: {
      status: "",
      exercisesText: ""
    },

    otherInfo: "",

    certifyAccepted: false,

    privacyAccepted: false
  },

  detailed: {
    requesterName: "Priya Natarajan",
    claimNo: "20155872",
    workerAppId: "755430",
    submittedAt: "August 18, 2026 16:47",

    returnToWork: {
      status: "not-returned",
      returnDate: ""
    },

    workingType: {
      type: "unspecified",
      otherText: ""
    },

    returnGoing: "",

    expectedReturnDate: "September 8, 2026",

    concerns:
      "I'm worried about repetitive lifting on the loading dock aggravating my lower back again. My physiotherapist has recommended a graduated return with a 10lb lifting cap for the first three weeks, and I'd like that reflected in whatever modified duties plan is arranged with my supervisor before I come back.",

    lastContact: {
      name: "Ravi Prasad (Shift Supervisor)",
      date: "August 15, 2026"
    },

    recovery: {
      status: "not-recovered"
    },

    recoveryComments:
      "Range of motion in my lower back has improved significantly since my last report, from roughly 40% to about 75% of normal according to my physiotherapist's assessment. I'm still experiencing stiffness in the mornings and after long periods of sitting, which is what my current course of physiotherapy is targeting.",

    painScale: 4,

    medicalTreatment: {
      status: "continuing",
      providerType: "Physiotherapist"
    },

    lastTreatment: {
      providerName: "Dr. Chowdhury",
      date: "August 11, 2026"
    },

    nextTreatment: {
      providerName: "Dr. Chowdhury",
      date: "August 25, 2026"
    },

    chiroFrequency: "Twice weekly",

    medication: {
      status: "taking",
      medName: "Naproxen 500mg, as needed"
    },

    homeExercises: {
      status: "doing",
      exercisesText:
        "Daily: pelvic tilts (3x15), cat-cow stretch (3x10), glute bridges (3x12), and a 20-minute walk. Twice weekly: supervised core-stability session over video call with my physiotherapist."
    },

    otherInfo:
      "I've also started a phased ergonomic assessment of my workstation with our EHS coordinator, and I'd appreciate an updated copy of my claim timeline for my own records when convenient.",

    certifyAccepted: true,

    privacyAccepted: true
  }
};