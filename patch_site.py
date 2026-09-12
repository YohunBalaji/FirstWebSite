import re

path = r"C:\Users\B2877225\.gemini\antigravity\scratch\portfolio\index.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('href="css/style.css"', 'href="css/style.css?v=2"')
html = html.replace('src="js/script.js"', 'src="js/script.js?v=2"')

inline_script = """
  <!-- Self-contained CAPTCHA Handler (immune to external file caching) -->
  <script>
  (function() {
    var mathNum1 = document.getElementById("mathNum1");
    var mathNum2 = document.getElementById("mathNum2");
    var captchaInput = document.getElementById("captchaInput");
    var captchaVerifyBtn = document.getElementById("captchaVerifyBtn");
    var captchaRefreshBtn = document.getElementById("captchaRefreshBtn");
    var captchaError = document.getElementById("captchaError");
    var captchaChallenge = document.getElementById("captchaChallenge");
    var emailRevealed = document.getElementById("emailRevealed");
    var revealedEmailContainer = document.getElementById("revealedEmailContainer");
    var emailMailtoBtn = document.getElementById("emailMailtoBtn");
    var copyEmailBtn = document.getElementById("copyEmailBtn");
    var copySuccess = document.getElementById("copySuccess");

    var currentAnswer = 0;

    function genCaptcha() {
      var n1 = Math.floor(Math.random() * 7) + 2;
      var n2 = Math.floor(Math.random() * 7) + 2;
      currentAnswer = n1 + n2;
      if (mathNum1) mathNum1.textContent = n1;
      if (mathNum2) mathNum2.textContent = n2;
      if (captchaInput) captchaInput.value = "";
      if (captchaError) {
        captchaError.style.display = "none";
        captchaError.textContent = "";
      }
    }

    genCaptcha();

    if (captchaRefreshBtn) {
      captchaRefreshBtn.onclick = function(e) {
        e.preventDefault();
        genCaptcha();
      };
    }

    function doVerify(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (!captchaInput) return;
      var val = parseInt(captchaInput.value.trim(), 10);
      if (isNaN(val)) {
        if (captchaError) {
          captchaError.textContent = "Please enter your answer in the box.";
          captchaError.style.display = "block";
        }
        return;
      }

      if (val === currentAnswer) {
        var email = atob("eW9odW5iYWxh" + "amk=" + "QGdtYWlsLmNvbQ==");
        if (captchaChallenge) captchaChallenge.style.display = "none";
        if (emailRevealed) {
          emailRevealed.style.display = "flex";
        }
        if (revealedEmailContainer) {
          revealedEmailContainer.innerHTML = '<a href="mailto:' + email + '" style="color:#00ffc2; text-decoration:underline; font-weight:700; font-size:28px;">' + email + '</a>';
        }
        if (emailMailtoBtn) emailMailtoBtn.href = "mailto:" + email;
        if (copyEmailBtn) {
          copyEmailBtn.onclick = function(ev) {
            ev.preventDefault();
            navigator.clipboard.writeText(email).then(function() {
              if (copySuccess) {
                copySuccess.style.display = "block";
                setTimeout(function() { copySuccess.style.display = "none"; }, 3500);
              }
            }).catch(function() {
              prompt("Copy email address:", email);
            });
          };
        }
      } else {
        if (captchaError) {
          captchaError.textContent = "Incorrect answer (" + val + "). Try again!";
          captchaError.style.display = "block";
        }
        genCaptcha();
      }
    }

    if (captchaVerifyBtn) captchaVerifyBtn.onclick = doVerify;
    if (captchaInput) {
      captchaInput.onkeydown = function(e) {
        if (e.key === "Enter") doVerify(e);
      };
    }
  })();
  </script>
</body>"""

if "<!-- Self-contained CAPTCHA Handler" not in html:
    html = html.replace("</body>", inline_script)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)
print("Successfully written inline script and cache busters to index.html")
