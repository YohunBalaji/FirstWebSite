with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "r", encoding="utf-8") as f:
    js = f.read()

target = "if (userVal === currentAnswer) {"
replacement = """if (userVal === currentAnswer) {
      console.log("MATCH! currentAnswer matched userVal! Decoding email...");"""

js = js.replace(target, replacement)

with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "w", encoding="utf-8") as f:
    f.write(js)
