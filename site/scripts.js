document.addEventListener('DOMContentLoaded', () => {
  AOS.init();
  const swiper = new Swiper('.mySwiper', { pagination: { el: '.swiper-pagination' } });
  const lightbox = GLightbox();

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      navigator.clipboard.writeText(target.value);
    });
  });

  const revenueInput = document.getElementById('revenue');
  const expenseInput = document.getElementById('expense');
  const profitSpan = document.getElementById('profit');
  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Revenue', 'Expense', 'Profit'],
      datasets: [{
        label: 'Amount',
        data: [0, 0, 0],
        backgroundColor: ['#16a34a', '#dc2626', '#2563eb']
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });

  function update() {
    const revenue = parseFloat(revenueInput.value) || 0;
    const expense = parseFloat(expenseInput.value) || 0;
    const profit = revenue - expense;
    profitSpan.textContent = profit;
    chart.data.datasets[0].data = [revenue, expense, profit];
    chart.update();
  }

  revenueInput.addEventListener('input', update);
  expenseInput.addEventListener('input', update);

  const map = L.map('map').setView([39.1031, -84.5120], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const modal = document.getElementById('modal');
  document.getElementById('openModal').addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  document.getElementById('closeModal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
});
