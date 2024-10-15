(async () => {
  const baseURL = "http://localhost:2000";
  const isActive = await chrome.storage.local.get(["toggleVariable"]);
  if (!isActive.toggleVariable) return;

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
    body: JSON.stringify({
      answer,
    }),
    mode: 'no-cors'
  });
})();
