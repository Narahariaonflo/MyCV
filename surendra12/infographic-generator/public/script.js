/**
 * Smartphone Infographic Generator — Frontend Controller
 * Handles phone selection, API call, and result display.
 */
(function () {
  'use strict';

  const phoneCards = document.querySelectorAll('.phone-card');
  const generateBtn = document.getElementById('generateBtn');
  const resultEl = document.getElementById('result');

  let selected = { phone1: null, phone2: null };

  // --------------- Selection handling ---------------
  phoneCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const id = card.dataset.id;
      const role = card.dataset.role;

      // Toggle: if this card is already selected for its role, deselect
      if (selected[role] === id) {
        selected[role] = null;
        card.classList.remove('selected', 'phone2');
      } else {
        // If the other role has the same id, swap roles
        const otherRole = role === 'phone1' ? 'phone2' : 'phone1';
        if (selected[otherRole] === id) {
          selected[otherRole] = null;
          const otherCard = document.querySelector('[data-role="' + otherRole + '"]');
          if (otherCard) otherCard.classList.remove('selected', 'phone2');
        }
        selected[role] = id;
        card.classList.add('selected');
        if (role === 'phone2') card.classList.add('phone2');
      }

      updateUI();
    });
  });

  // --------------- UI update ---------------
  function updateUI() {
    // Update card styles and labels
    phoneCards.forEach(function (card) {
      const id = card.dataset.id;
      const role = card.dataset.role;
      const indicator = card.querySelector('.selector-indicator');

      if (selected[role] === id) {
        card.classList.add('selected');
        if (role === 'phone2') card.classList.add('phone2');
        indicator.textContent = role === 'phone1' ? 'Phone 1 (Left)' : 'Phone 2 (Right)';
      } else {
        card.classList.remove('selected', 'phone2');
        indicator.textContent = 'Select as ' + (role === 'phone1' ? 'Phone 1' : 'Phone 2');
      }
    });

    // Update generate button state
    if (selected.phone1 && selected.phone2) {
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate Infographic';
    } else {
      generateBtn.disabled = true;
      if (!selected.phone1 && !selected.phone2) {
        generateBtn.textContent = 'Select a phone for each column to begin';
      } else {
        generateBtn.textContent = 'Select one more phone to continue';
      }
    }
  }

  // --------------- Generate button click ---------------
  generateBtn.addEventListener('click', async function () {
    if (!selected.phone1 || !selected.phone2) return;

    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="spinner"></span> Generating...';
    resultEl.innerHTML = '';

    try {
      const res = await fetch('/generate-infographic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone1: selected.phone1, phone2: selected.phone2 }),
      });

      if (!res.ok) {
        var errData;
        try {
          errData = await res.json();
        } catch (_) {
          errData = {};
        }
        throw new Error(errData.error || 'Server error (' + res.status + ')');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      resultEl.innerHTML =
        '<img src="' + url + '" alt="Smartphone comparison infographic: ' +
        selected.phone1 + ' vs ' + selected.phone2 + '">' +
        '<p class="save-hint">Right-click or long-press the image to save as PNG</p>';
    } catch (err) {
      resultEl.innerHTML = '<div class="error-msg">' + escapeHtml(err.message) + '</div>';
    } finally {
      generateBtn.disabled = false;
      generateBtn.innerHTML = 'Generate Infographic';
    }
  });

  // --------------- Helpers ---------------
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

})();
