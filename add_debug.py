with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "r", encoding="utf-8") as f:
    js = f.read()

target = "const verifyCaptcha = () => {"
replacement = """const verifyCaptcha = (e) => {
    console.log(">>> verifyCaptcha CALLED! input val:", captchaInput ? captchaInput.value : "NO INPUT", "currentAnswer:", currentAnswer);"""

js = js.replace(target, replacement)

with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Added debug log to script.js")
