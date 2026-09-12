with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "r", encoding="utf-8") as f:
    js = f.read()

target = "if (userVal === currentAnswer) {"
replacement = """if (userVal === currentAnswer) {
      console.log("MATCH! currentAnswer matched userVal! Decoding email...");
      console.log("captchaChallenge element:", captchaChallenge);
      console.log("emailRevealed element:", emailRevealed);
      console.log("revealedEmailContainer element:", revealedEmailContainer);
      try {"""

# Also add catch before the closing of if
target_close = """      if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(decodedEmail).then(() => {
            if (copySuccess) {
              copySuccess.style.display = "block";
              setTimeout(() => {
                copySuccess.style.display = "none";
              }, 3500);
            }
          }).catch(() => {
            alert(`Email address: ${decodedEmail}`);
          });
        });
      }"""

replacement_close = target_close + """
      } catch (err) {
        console.log("ERROR IN REVEAL BLOCK:", err.message, err.stack);
      }"""

js = js.replace(target, replacement)
js = js.replace(target_close, replacement_close)

with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "w", encoding="utf-8") as f:
    f.write(js)
