(() => {
  const buttons = document.querySelectorAll("[data-copy]");

  if (!buttons.length) return;

  const fallbackCopy = (value) => {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    field.remove();
    return copied;
  };

  buttons.forEach((button) => {
    const status = button.closest(".contact-value")?.querySelector(".copy-status");
    const label = button.textContent;
    let resetTimer;

    const announce = (message) => {
      if (status) status.textContent = message;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        if (status) status.textContent = "";
        button.textContent = label;
      }, 2600);
    };

    button.addEventListener("click", async () => {
      const value = button.dataset.copy;

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "Copied";
        announce("Copied to the clipboard.");
      } catch {
        if (fallbackCopy(value)) {
          button.textContent = "Copied";
          announce("Copied to the clipboard.");
        } else {
          announce("Copy failed. Select the address instead.");
        }
      }
    });
  });
})();
