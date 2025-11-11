document.addEventListener('DOMContentLoaded', () => {
  const summaryList = document.getElementById('summary-list');
  const subtotalEl = document.getElementById('subtotal');
  const deliveryFeeEl = document.getElementById('delivery-fee');
  const grandTotalEl = document.getElementById('grand-total');
  const orderTotalEl = document.getElementById('order-total');
  const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
  const qtyInputs = document.querySelectorAll('.qty-input');
  const checkoutForm = document.getElementById('checkout-form');
  const placeOrderBtn = document.getElementById('place-order');
  const messageEl = document.getElementById('form-message');

  function formatKsh(n){
    return 'KSh ' + n.toLocaleString('en-US');
  }

  function computeSubtotal(){
    let total = 0;
    document.querySelectorAll('.summary-item').forEach(li => {
      const price = Number(li.getAttribute('data-price')) || 0;
      const qty = Number(li.querySelector('.qty-input').value) || 0;
      total += price * qty;
    });
    return total;
  }

  function getDeliveryFee(){
    const sel = document.querySelector('input[name="delivery"]:checked').value;
    if(sel === 'express') return 800;
    return 0;
  }

  function updateTotals(){
    const subtotal = computeSubtotal();
    const delivery = getDeliveryFee();
    const grand = subtotal + delivery;
    subtotalEl.textContent = formatKsh(subtotal);
    deliveryFeeEl.textContent = formatKsh(delivery);
    grandTotalEl.textContent = formatKsh(grand);
    orderTotalEl.textContent = formatKsh(grand);
  }

  qtyInputs.forEach(inp => {
    inp.addEventListener('change', () => {
      if(inp.value < 1) inp.value = 1;
      updateTotals();
    });
  });

  deliveryRadios.forEach(r => r.addEventListener('change', updateTotals));

  updateTotals();

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageEl.textContent = '';

    const form = new FormData(checkoutForm);
    if(!form.get('fullname') || !form.get('phone') || !form.get('address') || !form.get('city')){
      messageEl.textContent = 'Please complete the required shipping fields.';
      return;
    }

    if(!checkoutForm.querySelector('#agree').checked){
      messageEl.textContent = 'Please agree to our Privacy Policy and Terms.';
      return;
    }

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';

    setTimeout(() => {
      const orderRef = 'SMT-' + Date.now().toString().slice(-6);
      messageEl.textContent = `Order placed — reference ${orderRef}. We will contact you shortly.`;
      placeOrderBtn.textContent = 'Place order — ' + grandTotalEl.textContent;
      placeOrderBtn.disabled = false;
      checkoutForm.reset();
      updateTotals();
      window.scrollTo({top:0,behavior:'smooth'});
    }, 1200);
  });

});

