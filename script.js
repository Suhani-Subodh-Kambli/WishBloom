const modal = document.getElementById('modal');
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const form = document.getElementById('gift-form');
const wishlist = document.getElementById('wishlist');

openModal.onclick = () => modal.style.display = 'block';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

function loadWishlist() {
  const items = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    const badgeClass = item.priority === 'High' ? 'high' :
                       item.priority === 'Medium' ? 'medium' : 'low';
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <em>${item.occasion}</em><br>
        <span class="badge ${badgeClass}">${item.priority}</span>
      </div>
      <button onclick="deleteItem(${index})">❌</button>
    `;
    wishlist.appendChild(li);
  });
}

function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem('wishlist')) || [];
  items.splice(index, 1);
  localStorage.setItem('wishlist', JSON.stringify(items));
  loadWishlist();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('gift-name').value;
  const occasion = document.getElementById('occasion').value;
  const priority = document.getElementById('priority').value;

  const newItem = { name, occasion, priority };
  const items = JSON.parse(localStorage.getItem('wishlist')) || [];
  items.push(newItem);
  localStorage.setItem('wishlist', JSON.stringify(items));
  form.reset();
  modal.style.display = 'none';
  loadWishlist();
});

loadWishlist();