function openTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function uploadImage() {
    // Implement image upload logic
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
}

function editProfile() {
    // Implement profile editing logic
    alert('Edit Profile clicked');
}

// Close profile menu when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-section')) {
        const menus = document.getElementsByClassName("profile-menu");
        for (let i = 0; i < menus.length; i++) {
            menus[i].style.display = 'none';
        }
    }
}