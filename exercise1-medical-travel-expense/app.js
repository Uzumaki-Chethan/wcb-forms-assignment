/* Medical & Travel Expense Request - data-driven editable form */

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

  (children || []).forEach((c) => node.appendChild(c));

  return node;
}

function input(value, placeholder = "") {
  return el("input", {
    class: "form-input",
    type: "text",
    value: value || "",
    placeholder
  });
}

const TABLE_FIELDS = {
  prescriptionDrugs: [
    "drugName",
    "prescriptionDate",
    "datePurchased",
    "provider",
    "paidAmount"
  ],

  otcDrugs: [
    "drugName",
    "datePurchased",
    "paidAmount",
    "sellerName",
    "reason"
  ],

  medicalSupplies: [
    "item",
    "datePurchased",
    "wasPrescribed",
    "provider",
    "paidAmount",
    "sellerName"
  ],

  parking: [
    "address",
    "date",
    "paidAmount",
    "meterUsed",
    "meterNumber"
  ],

  mileage: [
    "appointmentDate",
    "providerAddress",
    "workplaceAddress",
    "km"
  ],

  busTaxi: [
    "appointmentDate",
    "startAddress",
    "providerAddress",
    "mode",
    "fare"
  ]
};

function makeTableSection(title, headers, rows, rowToCells, opts) {
  opts = opts || {};

  return {
    type: "table",
    rows,

    buildShell({ continued }) {
      const wrap = el("div", {});

      if (!continued) {
        wrap.appendChild(
          el("div", {
            class: "sec-title",
            text: title
          })
        );

        (opts.preNote ? opts.preNote() : []).forEach((n) =>
          wrap.appendChild(n)
        );
      } else {
        wrap.appendChild(
          el("div", {
            class: "continued-heading",
            html: `${title} <span class="continued-tag">(continued)</span>`
          })
        );
      }

      const table = el("table", {
        class: "data-table"
      });

      table.appendChild(
        el("thead", {}, [
          el(
            "tr",
            {},
            headers.map((h) =>
              el("th", {
                text: h
              })
            )
          )
        ])
      );

      const tbody = el("tbody", {});

      table.appendChild(tbody);
      wrap.appendChild(table);

      if (!continued && opts.editable) {
        const add = el("button", {
          class: "add-row no-print",
          type: "button",
          text: "+ Add row"
        });

        add.addEventListener("click", () => {
          const blank = {};

          (opts.fields || []).forEach((f) => {
            blank[f] = "";
          });

          rows.push(blank);

          tbody.appendChild(
            renderEditableRow(blank, opts.fields)
          );
        });

        wrap.appendChild(add);
      }

      return {
        tableEl: wrap,
        tbody
      };
    },

    renderRow(row) {
      return opts.editable
        ? renderEditableRow(row, opts.fields)
        : el(
            "tr",
            {},
            rowToCells(row).map((c) =>
              el("td", {
                class: "answer",
                text: c || ""
              })
            )
          );
    },

    renderEmptyRow() {
      if (opts.editable) {
        const blank = {};

        (opts.fields || []).forEach((f) => {
          blank[f] = "";
        });

        rows.push(blank);

        return renderEditableRow(
          blank,
          opts.fields
        );
      }

      return el("tr", {}, [
        el("td", {
          class: "empty-row",
          colspan: String(headers.length),
          text: "No entries submitted for this section."
        })
      ]);
    }
  };
}

function renderEditableRow(row, fields) {
  return el(
    "tr",
    {},
    fields.map((field) => {
      const cell = el("td", {
        class: "answer"
      });

      cell.appendChild(
        input(row[field])
      );

      return cell;
    })
  );
}

function pageFactory(data) {
  return function(pageNumber, isFirstPage) {
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
          class: "sec-title continuation-title",
          html: `Medical &amp; Travel Expense Request — <span>Claim No. ${data.claimNo}</span> <em>(continued)</em>`
        })
      );
    }

    const contentHeight = isFirstPage
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
        text: `Worker App ID: ${data.workerAppId}`
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
    src: "images/wcb-logo.png",
    alt: "Workers Compensation Board of Manitoba"
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
      text: "Medical & Travel Expense Request"
    }),

    el("div", {
      class: "claim-box"
    }, [
      document.createTextNode("Claim No. "),
      input(data.claimNo)
    ])
  ]);

  header.appendChild(brand);
  header.appendChild(titleBlock);

  return header;
}

function buildSections(data, editable) {
  const sections = [];

  sections.push({
    type: "block",

    render: () =>
      el("p", {
        class: "intro-line"
      }, [
        editable
          ? input(data.requesterName, "Worker name")
          : el("span", {
              class: "answer",
              text: data.requesterName
            }),

        document.createTextNode(
          " requested reimbursement for the following medical and/or travel expenses:"
        )
      ])
  });

  sections.push(
    makeTableSection(
      "Prescription Drugs",
      [
        "Drug Name",
        "Prescription Date",
        "Date Purchased",
        "Healthcare Provider Name",
        "Paid Amount"
      ],
      data.prescriptionDrugs,
      (r) => [
        r.drugName,
        r.prescriptionDate,
        r.datePurchased,
        r.provider,
        r.paidAmount
      ],
      {
        editable,
        fields: TABLE_FIELDS.prescriptionDrugs
      }
    )
  );

  sections.push(
    makeTableSection(
      "Over-the-Counter Drugs",
      [
        "Drug Name",
        "Date Purchased",
        "Paid Amount",
        "Seller's Name",
        "Reason for Purchasing"
      ],
      data.otcDrugs,
      (r) => [
        r.drugName,
        r.datePurchased,
        r.paidAmount,
        r.sellerName,
        r.reason
      ],
      {
        editable,
        fields: TABLE_FIELDS.otcDrugs
      }
    )
  );

  sections.push(
    makeTableSection(
      "Bandages, Braces or Other Medical Supplies",
      [
        "Item Purchased",
        "Date Purchased",
        "Was this Prescribed?",
        "Healthcare Provider Name",
        "Paid Amount",
        "Seller's Name"
      ],
      data.medicalSupplies,
      (r) => [
        r.item,
        r.datePurchased,
        r.wasPrescribed,
        r.provider,
        r.paidAmount,
        r.sellerName
      ],
      {
        editable,
        fields: TABLE_FIELDS.medicalSupplies
      }
    )
  );

  sections.push(
    makeTableSection(
      "Parking for Medical Appointments",
      [
        "Address of Healthcare Provider/Medical Facility",
        "Date",
        "Paid Amount",
        "Meter Used?",
        "Meter Number"
      ],
      data.parking,
      (r) => [
        r.address,
        r.date,
        r.paidAmount,
        r.meterUsed,
        r.meterNumber
      ],
      {
        editable,
        fields: TABLE_FIELDS.parking
      }
    )
  );

  sections.push(
    makeTableSection(
      "Mileage to Medical Appointments",
      [
        "Appointment Date",
        "Address of Healthcare Provider/Medical Facility",
        "Address of Workplace",
        "Number of km (Round Trip)"
      ],
      data.mileage,
      (r) => [
        r.appointmentDate,
        r.providerAddress,
        r.workplaceAddress,
        r.km
      ],
      {
        editable,
        fields: TABLE_FIELDS.mileage,

        preNote: () => [
          el("p", {
            class: "mileage-note",
            text:
              "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work."
          })
        ]
      }
    )
  );

  sections.push(
    makeTableSection(
      "Bus or Taxi Fare for Medical Appointments *",
      [
        "Appointment Date",
        "Address of Starting Point",
        "Address of Healthcare Provider/Medical Facility",
        "Bus or Taxi (indicate one)",
        "Total Fare Paid"
      ],
      data.busTaxi,
      (r) => [
        r.appointmentDate,
        r.startAddress,
        r.providerAddress,
        r.mode,
        r.fare
      ],
      {
        editable,
        fields: TABLE_FIELDS.busTaxi,

        preNote: () => [
          el("p", {
            class: "taxi-note",
            text:
              "* Pre-approval is required from your WCB representative to claim taxi fare(s)."
          })
        ]
      }
    )
  );

  sections.push({
    type: "block",

    render: () =>
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
  });

  return sections;
}

function renderExpenseForm(datasetKey) {
  const source =
    window.EXPENSE_DATASETS[datasetKey];

  const data =
    JSON.parse(JSON.stringify(source));

  const editable =
    datasetKey === "empty";

  const root =
    document.getElementById("pages-root");

  root.innerHTML = "";

  const total =
    DionaPaginate.paginate(
      buildSections(data, editable),
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

          renderExpenseForm(
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

    renderExpenseForm("standard");
  }
);