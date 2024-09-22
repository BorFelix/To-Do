let ourForm = document.getElementById('ourForm');
let ourField = document.getElementById('ourField');
let ourList = document.getElementById('ourList');

ourForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createItem(ourField.value);
});

function createItem(item) {
    fetch('/create-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: item })
    }).then(response => response.json())
      .then(data => {
          let ourHTML = `<li>${item}<button onclick='deleteItem(this)'>Delete</button></li>`;
          ourList.insertAdjacentHTML('beforeend', ourHTML);
          ourField.value = '';
          ourField.focus();
      });
}

function deleteItem(elementToDelete) {
    let item = elementToDelete.parentElement.textContent.replace('Delete', '').trim();
    fetch('/delete-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: item })
    }).then(response => response.json())
      .then(data => {
          elementToDelete.parentElement.remove();
      });
}

// Fetch and display to-do items on page load
function fetchItems() {
    fetch('/items')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                let ourHTML = `<li>${item}<button onclick='deleteItem(this)'>Delete</button></li>`;
                ourList.insertAdjacentHTML('beforeend', ourHTML);
            });
        });
}

// Call fetchItems when the page loads
document.addEventListener('DOMContentLoaded', fetchItems);