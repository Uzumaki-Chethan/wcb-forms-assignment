# AI Assistance Disclosure & Prompt History

This project was developed with AI assistance. The assignment instructions require AI usage to be disclosed and the prompt history to be included in the repository.

## AI Tools Used

- Claude (Anthropic) — used for the initial implementation and project structure.
- ChatGPT — used for reviewing the generated implementation, identifying issues, debugging, and making additional changes.

---

## 1. Initial Assignment Prompt Given to Claude

The assignment requirements and the two WCB Manitoba reference PDFs were provided to Claude.

The main request was to:

- Analyse both supplied PDFs.
- Recreate both documents using HTML, CSS and vanilla JavaScript.
- Match the visual structure of the PDFs as closely as possible.
- Include the header and footer.
- Include the WCB Manitoba branding/logo.
- Include page numbers.
- Identify which information is dynamic.
- Generate the documents from JavaScript data rather than hardcoding the content.
- Support different amounts of table data.
- Support pagination when content exceeds one page.
- Create demo datasets for demonstrating dynamic behaviour.
- Create a README and AI disclosure file.

---

## 2. Claude's Initial Implementation

Claude generated the initial project structure and implementation for both exercises.

The generated implementation included:

- HTML document structures.
- CSS styling.
- JavaScript rendering.
- Sample datasets.
- Dynamic table generation.
- Pagination.
- Header and footer.
- Page numbering.
- README documentation.
- AI disclosure documentation.

---

## 3. Review and Changes Made After Receiving Claude's Files

After receiving the generated files, the implementation was manually reviewed against the supplied PDFs and assignment requirements.

The following issues were identified and addressed:

### Exercise 1

1. The supplied reference document contains multiple pages, so the implementation needed to support dynamic pagination rather than assuming a fixed single-page output.

2. The original implementation used a placeholder graphic instead of the supplied WCB Manitoba logo.

3. The supplied WCB Manitoba logo was added at:

`assets/wcb-logo.png`

4. The expense sections were kept data-driven so that different numbers of rows can be demonstrated.

5. The Empty/Form mode was made editable so that data can be entered during the demonstration.

6. Additional table rows can be added dynamically using the `+ Add row` controls.

### Exercise 2

1. The original Minimal dataset displayed blank output but did not provide a proper way for the user to enter answers.

2. A fillable form editor was added for the Minimal/Form dataset.

3. The form supports:

   - Worker information
   - Claim information
   - Return-to-work selections
   - Dates
   - Working arrangement
   - Comments
   - Concerns
   - Recovery information
   - Pain scale
   - Medical treatment
   - Medication
   - Home exercises
   - Other information
   - Certification
   - Privacy acceptance

4. The entered values are converted into the same JavaScript data structure used by the document renderer.

5. Clicking `Generate Report` generates the PDF-style report using the entered information.

6. Blank fields remain visible in the generated report where appropriate instead of disappearing completely.

---

## 4. ChatGPT Review and Assistance

ChatGPT was used after the initial Claude-generated implementation to:

- Review the implementation against the assignment requirements.
- Check the README and project structure.
- Identify missing or incomplete functionality.
- Review the dynamic dataset requirements.
- Identify the need for the supplied WCB logo.
- Identify the need for an editable Minimal/Form mode in Exercise 2.
- Review the JavaScript implementation.
- Check JavaScript syntax.
- Help prepare the project for the required demonstration videos.
- Help prepare the repository documentation.

The final implementation was manually reviewed and modified rather than being submitted unchanged from the initial AI-generated output.

---

## 5. Verification

JavaScript syntax was checked using Node.js `node --check`.

Before final submission, the application should be verified in Chrome for:

### Exercise 1

- Standard dataset
- Empty/Form dataset
- Large dataset
- Dynamic table rows
- Pagination
- Header and footer
- Page numbering
- WCB logo

### Exercise 2

- Standard dataset
- Minimal/Form dataset
- Detailed dataset
- Form input functionality
- Radio selections
- Pain-scale selection
- Text fields
- Checkboxes
- Generate Report functionality
- Conditional sections
- Header and footer
- Page numbering
- WCB logo

### Print behaviour

The browser print / Save as PDF functionality should also be checked to confirm that:

- Demo controls are hidden.
- The document is formatted as A4 pages.
- Headers and footers appear correctly.
- Page numbering is correct.

---

## 6. Video Disclosure

The required screening videos will explicitly mention that AI assistance was used.

The videos will also point to this `PROMPTS.md` file and explain the parts of the implementation that were generated, reviewed and modified.

I will be able to explain the HTML, CSS and JavaScript implementation, including:

- Data structures
- Rendering functions
- Dynamic tables
- Pagination
- Form inputs
- Conditional rendering
- Header/footer generation