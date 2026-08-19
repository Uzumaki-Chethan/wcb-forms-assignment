/* Worker Progress Report - editable data-driven form */

function el(tag, attrs, children) {
  const node = document.createElement(tag);

  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === "text") {
      node.textContent = v;
    } else if (k === "html") {
      node.innerHTML = v;
    } else if (v !== undefined && v !== null) {
      node.setAttribute(k, v);
    }
  });

  (children || []).forEach((c) =>
    node.appendChild(c)
  );

  return node;
}

function textInput(value, placeholder = "") {
  return el("input", {
    type: "text",
    class: "form-input",
    value: value || "",
    placeholder
  });
}

function textArea(value, small = false) {
  return el(
    "textarea",
    {
      class: `form-textarea${small ? " small" : ""}`,
      rows: small ? "2" : "4"
    },
    [
      document.createTextNode(
        value || ""
      )
    ]
  );
}

function checkboxGroup(
  options,
  selectedKey,
  editable = false,
  name = "group"
) {
  const box = el("div", {
    class: "group-box"
  });

  box.appendChild(
    el("div", {
      class: "select-one-label",
      text: "Select one:"
    })
  );

  const row = el("div", {
    class: "opt-row"
  });

  options.forEach((opt) => {
    const selected =
      opt.key === selectedKey;

    const label = el("label", {
      class: `opt${selected ? " selected" : ""}`
    });

    const radio = el("input", {
      type: "radio",
      name,
      value: opt.key,
      ...(selected
        ? { checked: "checked" }
        : {})
    });

    if (!editable) {
      radio.disabled = true;
    }

    label.appendChild(radio);

    label.appendChild(
      el("span", {
        class: "opt-text",
        text: opt.label
      })
    );

    if (selected && opt.inline) {
      label.appendChild(
        el("span", {
          class: "answer-inline",
          text: opt.inline
        })
      );
    }

    row.appendChild(label);
  });

  box.appendChild(row);

  return box;
}

function questionLine(
  prefix,
  value,
  suffix,
  editable = false,
  placeholder = ""
) {
  const wrap = el("div", {
    class: "q-label"
  });

  wrap.appendChild(
    document.createTextNode(
      prefix + " "
    )
  );

  wrap.appendChild(
    editable
      ? textInput(
          value,
          placeholder
        )
      : el("span", {
          class: "field-line",
          text:
            value ||
            "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
        })
  );

  if (suffix) {
    wrap.appendChild(
      document.createTextNode(
        " " + suffix
      )
    );
  }

  return wrap;
}

function answerBox(
  label,
  value,
  opts = {}
) {
  const wrap = el("div", {
    class: "q-block"
  });

  wrap.appendChild(
    el("div", {
      class: "q-label",
      text: label
    })
  );

  if (opts.editable) {
    wrap.appendChild(
      textArea(
        value,
        opts.small
      )
    );
  } else {
    wrap.appendChild(
      el("div", {
        class: `answer-box${opts.small ? " small" : ""}`,
        text: value || ""
      })
    );
  }

  return wrap;
}

function painScale(
  value,
  editable
) {
  const wrap = el("div", {
    class: "pain-scale q-block"
  });

  wrap.appendChild(
    el("div", {
      class: "q-label",
      text:
        "I rate my current pain/discomfort on a scale of 1-10, where 1 is no pain and 10 is severe pain out of 10."
    })
  );

  const nums = el("div", {
    class: "scale-numbers"
  });

  for (let i = 1; i <= 10; i++) {
    const label = el("label", {
      class:
        `pain-option${value === i ? " selected" : ""}`
    });

    const radio = el("input", {
      type: "radio",
      name: "painScale",
      value: String(i),
      ...(value === i
        ? { checked: "checked" }
        : {})
    });

    if (!editable) {
      radio.disabled = true;
    }

    label.appendChild(radio);

    label.appendChild(
      document.createTextNode(
        String(i)
      )
    );

    nums.appendChild(label);
  }

  wrap.appendChild(nums);

  return wrap;
}

function pageFactory(data) {
  return function(
    pageNumber,
    isFirstPage
  ) {
    const page = el("div", {
      class: "page"
    });

    if (isFirstPage) {
      page.appendChild(
        buildHeader(data)
      );
    } else {
      page.appendChild(
        el("div", {
          class:
            "sec-title continuation-title",
          html:
            `Worker Progress Report — <span>Claim No. ${data.claimNo}</span> <em>(continued)</em>`
        })
      );
    }

    const contentHeight =
      isFirstPage
        ? `calc(var(--page-height) - var(--page-pad-top) - var(--page-pad-bottom) - var(--header-h) - var(--footer-h) - 8mm)`
        : `calc(var(--page-height) - var(--page-pad-top) - var(--page-pad-bottom) - var(--footer-h) - 10mm)`;

    const content = el("div", {
      class: "page-content",
      style: `height:${contentHeight};`
    });

    page.appendChild(content);

    const footer = el("div", {
      class: "page-footer"
    }, [
      el("div", {
        text:
          `Worker App ID: ${data.workerAppId}`
      }),

      el("div", {
        class: "footer-right"
      })
    ]);

    page.appendChild(footer);

    return {
      pageEl: page,
      contentEl: content,

      setFooter(current, total) {
        footer.querySelector(
          ".footer-right"
        ).innerHTML =
          `Submitted: ${data.submittedAt}<br>Page ${current} of ${total}`;
      }
    };
  };
}

function buildLogo() {
  return el("img", {
    class: "wcb-logo",
    src: "../exercise1-medical-travel-expense/images/wcb-logo.png",
    alt:
      "Workers Compensation Board of Manitoba"
  });
}

function buildHeader(data) {
  const header = el("div", {
    class: "page-header"
  });

  const brand = el("div", {
    class: "brand-block"
  }, [
    buildLogo(),

    el("div", {
      class: "org-address",
      html:
        "333 Broadway<br>" +
        "Winnipeg, MB R3C 4W3<br>" +
        "Phone: (204) 954-4321<br>" +
        "Toll Free: 1-855-954-4321<br>" +
        "wcb.mb.ca"
    })
  ]);

  const titleBlock = el("div", {
    class: "doc-title-block"
  }, [
    el("h1", {
      text: "Worker Progress Report"
    }),

    el("div", {
      class: "claim-boxes"
    }, [
      el("div", {
        class: "claim-box"
      }, [
        document.createTextNode(
          "Claim No. "
        ),

        textInput(
          data.claimNo
        )
      ]),

      el("div", {
        class: "wp-badge",
        text: "WP"
      })
    ])
  ]);

  header.appendChild(brand);
  header.appendChild(titleBlock);

  return header;
}

function buildSections(
  data,
  editable
) {
  const blocks = [];

  const add = (fn) =>
    blocks.push({
      type: "block",
      render: fn
    });

  add(() =>
    el("p", {
      class: "intro-line"
    }, [
      editable
        ? textInput(
            data.requesterName,
            "Worker name"
          )
        : el("span", {
            class: "answer",
            text: data.requesterName
          }),

      document.createTextNode(
        " provided the following updates in relation to their claim:"
      )
    ])
  );

  add(() =>
    el("div", {
      class: "sec-title",
      text: "Return to Work"
    })
  );

  add(() =>
    checkboxGroup(
      [
        {
          key: "not-missed",
          label:
            "I have not missed time from work"
        },

        {
          key: "not-returned",
          label:
            "I have not returned to work"
        },

        {
          key: "returned",
          label:
            "I returned to work on:"
        }
      ],
      data.returnToWork.status,
      editable,
      "returnStatus"
    )
  );

  add(() =>
    questionLine(
      "Return to work date:",
      data.returnToWork.returnDate,
      "",
      editable,
      "Date"
    )
  );

  add(() =>
    checkboxGroup(
      [
        {
          key: "full-regular",
          label:
            "Full duties, regular hours"
        },

        {
          key: "full-reduced",
          label:
            "Full duties, reduced hours"
        },

        {
          key: "modified-regular",
          label:
            "Modified duties, regular hours"
        },

        {
          key: "modified-reduced",
          label:
            "Modified duties, reduced hours"
        },

        {
          key: "other",
          label: "Other:"
        }
      ],
      data.workingType.type,
      editable,
      "workingType"
    )
  );

  add(() =>
    questionLine(
      "Other work arrangement:",
      data.workingType.otherText,
      "",
      editable
    )
  );

  add(() =>
    answerBox(
      "My return to work is going:",
      data.returnGoing,
      { editable }
    )
  );

  add(() =>
    questionLine(
      "I expect to return to work on:",
      data.expectedReturnDate,
      "",
      editable,
      "Date"
    )
  );

  add(() =>
    answerBox(
      "I have the following concerns about returning to work:",
      data.concerns,
      { editable }
    )
  );

  add(() =>
    questionLine(
      "I was most recently in contact with:",
      data.lastContact.name,
      data.lastContact.date
        ? `on ${data.lastContact.date}`
        : "",
      editable
    )
  );

  add(() =>
    el("div", {
      class: "sec-title",
      text: "Recovery"
    })
  );

  add(() =>
    checkboxGroup(
      [
        {
          key: "not-recovered",
          label:
            "I have not fully recovered from my workplace injury."
        },

        {
          key: "recovered",
          label:
            "I have fully recovered from my workplace injury."
        }
      ],
      data.recovery.status,
      editable,
      "recoveryStatus"
    )
  );

  add(() =>
    answerBox(
      "I have provided the following comments about my recovery:",
      data.recoveryComments,
      { editable }
    )
  );

  add(() =>
    painScale(
      data.painScale,
      editable
    )
  );

  add(() =>
    checkboxGroup(
      [
        {
          key: "not-continuing",
          label:
            "I am not continuing to receive medical treatment for my workplace injury."
        },

        {
          key: "continuing",
          label:
            "I am continuing to receive medical treatment for my workplace injury from:"
        }
      ],
      data.medicalTreatment.status,
      editable,
      "treatmentStatus"
    )
  );

  add(() =>
    questionLine(
      "Medical provider type:",
      data.medicalTreatment.providerType,
      "",
      editable
    )
  );

  add(() =>
    questionLine(
      "My last medical treatment was from:",
      data.lastTreatment.providerName,
      data.lastTreatment.date
        ? `on ${data.lastTreatment.date}`
        : "",
      editable
    )
  );

  add(() =>
    questionLine(
      "My next medical treatment is from:",
      data.nextTreatment.providerName,
      data.nextTreatment.date
        ? `on ${data.nextTreatment.date}`
        : "",
      editable
    )
  );

  add(() =>
    questionLine(
      "I am attending a Chiropractor or Physiotherapist (frequency):",
      data.chiroFrequency,
      "",
      editable
    )
  );

  add(() =>
    checkboxGroup(
      [
        {
          key: "not-taking",
          label:
            "I am not taking medication for my workplace injury."
        },

        {
          key: "taking",
          label:
            "I am taking medication for my workplace injury:"
        }
      ],
      data.medication.status,
      editable,
      "medicationStatus"
    )
  );

  add(() =>
    questionLine(
      "Medication name:",
      data.medication.medName,
      "",
      editable
    )
  );

  add(() =>
    checkboxGroup(
      [
        {
          key: "not-doing",
          label:
            "I am not doing home exercises for my workplace injury."
        },

        {
          key: "doing",
          label:
            "I am doing home exercises for my workplace injury."
        }
      ],
      data.homeExercises.status,
      editable,
      "exerciseStatus"
    )
  );

  add(() =>
    answerBox(
      "List the exercises you are doing:",
      data.homeExercises.exercisesText,
      { editable }
    )
  );

  add(() =>
    el("div", {
      class: "sec-title",
      text: "Other Information"
    })
  );

  add(() =>
    answerBox(
      "I would like to provide the following additional information about my claim/injury:",
      data.otherInfo,
      { editable }
    )
  );

  add(() =>
    el("p", {
      class: "certify-block",
      text:
        "I certify that the information given on this form is true, correct and complete to the best of my knowledge. I agree to notify the Workers Compensation Board of Manitoba (WCB) immediately once I return to any form of work and/or employment. I understand that it is an offence to knowingly make a false statement to the WCB. I also understand that it is an offence to withhold information from WCB which affects my entitlement to compensation (e.g., full or partial recovery from injury, ability to return to work, sources of additional income, etc.). I understand that refusing to co-operate with, or follow my treatment, may result in the WCB reducing or suspending my benefits."
    })
  );

  add(() =>
    el("label", {
      class: "privacy-line"
    }, [
      el("input", {
        type: "checkbox",
        ...(data.privacyAccepted
          ? { checked: "checked" }
          : {})
      }),

      el("span", {
        text:
          "I understand that the Privacy Notice applies to the personal information collected in this document."
      })
    ])
  );

  return blocks;
}

function renderProgressReport(
  datasetKey
) {
  const source =
    window.PROGRESS_DATASETS[
      datasetKey
    ];

  const data =
    JSON.parse(
      JSON.stringify(source)
    );

  const editable =
    datasetKey === "minimal";

  const root =
    document.getElementById(
      "pages-root"
    );

  root.innerHTML = "";

  const total =
    DionaPaginate.paginate(
      buildSections(
        data,
        editable
      ),
      pageFactory(data),
      root
    );

  document.getElementById(
    "page-count-hint"
  ).textContent =
    `Rendered ${total} page${total > 1 ? "s" : ""} from the "${datasetKey}" dataset.`;
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const buttons =
      document.querySelectorAll(
        "[data-dataset]"
      );

    buttons.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          buttons.forEach((b) =>
            b.classList.remove("active")
          );

          btn.classList.add("active");

          renderProgressReport(
            btn.dataset.dataset
          );
        }
      );
    });

    document
      .getElementById("print-btn")
      .addEventListener(
        "click",
        () => window.print()
      );

    renderProgressReport(
      "standard"
    );
  }
);