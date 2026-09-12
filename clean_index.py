import re

# 1. Clean index.html (remove duplicate inline script, update script to ?v=3)
path = r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\index.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove the inline script block
html = re.sub(r'<!-- Self-contained CAPTCHA Handler.*?<\/script>', '', html, flags=re.DOTALL)
html = html.replace('src="js/script.js?v=2"', 'src="js/script.js?v=3"')
html = html.replace('href="css/style.css?v=2"', 'href="css/style.css?v=3"')

with open(path, "w", encoding="utf-8") as f:
    f.write(html)

print("Cleaned index.html")
