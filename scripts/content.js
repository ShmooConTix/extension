(async () => {
  const baseURL = "http://localhost:3000";
  const isActive = await chrome.storage.local.get(["toggleVariable"])
    .toggleVariable;
  if (!isActive) return;

  if (!window.location.pathname.startsWith("/hold_"))
    return console.log(
      "URL does not contain hold: ",
      window.location.toString()
    );

  const answer = new URLSearchParams(window.location.search)
    .values()
    .next().value;

  // send answer to backend
  await fetch(baseURL + "/acceptExtensionAnswer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      answer,
    },
  });
})();
