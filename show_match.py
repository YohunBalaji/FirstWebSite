with open(r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\js\script.js", "r", encoding="utf-8") as f:
    js = f.read()

import re
m = re.search(r'MATCH!.*?(?=showError|\}\s*else)', js, re.DOTALL)
if m:
    print(m.group(0))
