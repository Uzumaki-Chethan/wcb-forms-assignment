/* =========================================================================
   shared/paginate.js

   A small, dependency-free pagination engine.

   It creates fixed-size A4 pages and moves overflowing sections/table rows
   to subsequent pages while repeating table headers.

   This allows the same document to render different numbers of pages
   depending on the amount of dynamic data.
   ========================================================================= */

(function (global) {
  function isOverflowing(el) {
    return el.scrollHeight > el.clientHeight + 1;
  }

  function paginate(
    sections,
    pageFactory,
    root
  ) {
    let pageNumber = 1;

    let current =
      pageFactory(
        pageNumber,
        true
      );

    root.appendChild(
      current.pageEl
    );

    const pages = [
      current
    ];

    function newPage() {
      pageNumber += 1;

      current =
        pageFactory(
          pageNumber,
          false
        );

      root.appendChild(
        current.pageEl
      );

      pages.push(current);

      return current;
    }

    sections.forEach(
      (section) => {
        if (section.type === "block") {
          const element =
            section.render();

          current.contentEl.appendChild(
            element
          );

          if (
            isOverflowing(
              current.contentEl
            )
          ) {
            current.contentEl.removeChild(
              element
            );

            newPage();

            current.contentEl.appendChild(
              element
            );
          }

          return;
        }

        if (section.type === "table") {
          let shell =
            section.buildShell({
              continued: false
            });

          current.contentEl.appendChild(
            shell.tableEl
          );

          if (
            isOverflowing(
              current.contentEl
            )
          ) {
            current.contentEl.removeChild(
              shell.tableEl
            );

            newPage();

            shell =
              section.buildShell({
                continued: false
              });

            current.contentEl.appendChild(
              shell.tableEl
            );
          }

          const rows =
            section.rows || [];

          if (rows.length === 0) {
            const emptyRow =
              section.renderEmptyRow
                ? section.renderEmptyRow()
                : null;

            if (emptyRow) {
              shell.tbody.appendChild(
                emptyRow
              );
            }

            return;
          }

          rows.forEach(
            (row) => {
              const tr =
                section.renderRow(row);

              shell.tbody.appendChild(
                tr
              );

              if (
                isOverflowing(
                  current.contentEl
                )
              ) {
                shell.tbody.removeChild(
                  tr
                );

                newPage();

                shell =
                  section.buildShell({
                    continued: true
                  });

                current.contentEl.appendChild(
                  shell.tableEl
                );

                shell.tbody.appendChild(
                  tr
                );
              }
            }
          );

          return;
        }
      }
    );

    const total =
      pages.length;

    pages.forEach(
      (page, index) => {
        page.setFooter(
          index + 1,
          total
        );
      }
    );

    return total;
  }

  global.DionaPaginate = {
    paginate
  };
})(window);