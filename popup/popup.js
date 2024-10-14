const statusDiv = document.getElementById("status");

function updateStatus() {
  chrome.storage.local.get(["toggleVariable"], (result) => {
    statusDiv.textContent = `Value: ${
      result.toggleVariable ? "ON" : "OFF"
    }`;
  });
}

document.getElementById("toggleButton").addEventListener("click", () => {
  chrome.storage.local.get(["toggleVariable"], (result) => {
    let newValue = !result.toggleVariable;
    chrome.storage.local.set({ toggleVariable: newValue }, updateStatus);
  });

  updateStatus();
});

// Initial status update
updateStatus();
