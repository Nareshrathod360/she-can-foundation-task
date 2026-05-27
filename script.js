// ── MOBILE MENU TOGGLE ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// ── PILL TOGGLE ──
function togglePill(el) {
  el.classList.toggle('active');
}

// ── HELPERS ──
function getVal(id) {
  return document.getElementById(id).value.trim();
}

function setError(fieldId, errId, show) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  if (show) {
    field.classList.add('error');
    err.classList.add('show');
  } else {
    field.classList.remove('error');
    err.classList.remove('show');
  }
}

// ── VALIDATION ──
function validate() {
  let valid = true;

  // First name
  if (!getVal('fname')) {
    setError('fname', 'fname-err', true);
    valid = false;
  } else {
    setError('fname', 'fname-err', false);
  }

  // Email
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(getVal('email'))) {
    setError('email', 'email-err', true);
    valid = false;
  } else {
    setError('email', 'email-err', false);
  }

  // Message
  if (getVal('message').length < 10) {
    setError('message', 'msg-err', true);
    valid = false;
  } else {
    setError('message', 'msg-err', false);
  }

  return valid;
}

// ── LIVE CLEAR ON INPUT ──
['fname', 'email', 'message'].forEach(function(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', function() {
    el.classList.remove('error');
    var errMap = { fname: 'fname-err', email: 'email-err', message: 'msg-err' };
    var errEl = document.getElementById(errMap[id]);
    if (errEl) errEl.classList.remove('show');
  });
});

// ── FORM SUBMIT ──
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validate()) return;

    // Collect selected interests
    var activePills = document.querySelectorAll('.pill.active');
    var interests = Array.from(activePills).map(function(p) { return p.textContent; });

    // Save name + email to sessionStorage so success page can read them
    var firstName  = getVal('fname');
    var lastName   = getVal('lname');
    var fullName   = (firstName + ' ' + lastName).trim();
    var email      = getVal('email');

    sessionStorage.setItem('scf_name',      fullName);
    sessionStorage.setItem('scf_email',     email);
    sessionStorage.setItem('scf_interests', interests.join(', '));

    // Show loading spinner
    var btn     = document.getElementById('submitBtn');
    var btnText = btn.querySelector('.btn-text');
    var spinner = document.getElementById('spinner');

    btn.disabled        = true;
    btnText.style.display = 'none';
    spinner.style.display = 'block';

    // Simulate a short network delay then redirect
    setTimeout(function() {
      window.location.href = 'success.html';
    }, 1400);
  });
}
