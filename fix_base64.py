with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "r", encoding="utf-8") as f:
    js = f.read()

# Replace the base64 decoding with the clean, perfectly valid string
bad_code = """      // Decode obfuscated email string dynamically
      const emailParts = ["eW9odW5iYWxh", "amk=", "QGdtYWlsLmNvbQ=="];
      const decodedEmail = atob(emailParts[0] + emailParts[1] + emailParts[2]);"""

good_code = """      // Decode obfuscated email string dynamically
      const decodedEmail = atob("eW9odW5iYWxhamlAZ21haWwuY29t");"""

js = js.replace(bad_code, good_code)

with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Replaced base64 with valid string")
