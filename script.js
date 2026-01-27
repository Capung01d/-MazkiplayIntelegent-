// Particle background
function createParticles() {
    const particles = document.getElementById('particles');
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--primary)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
        particles.appendChild(particle);
    }
}

// Track function dengan mock data realistis
async function trackPhone() {
    const phone = document.getElementById('phoneNumber').value.replace(/\D/g, '');
    const trackBtn = document.getElementById('trackBtn');
    const resultsSection = document.getElementById('resultsSection');
    
    if(phone.length < 10 || !phone.startsWith('8')) {
        alert('❌ Masukkan nomor HP Indonesia yang valid (contoh: 81234567890)');
        return;
    }

    // Loading animation
    trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TRACKING...';
    trackBtn.disabled = true;

    // Simulate API call (2-4 detik)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 2000));

    // Mock data realistis untuk +62 numbers
    const mockData = generateMockData(phone);
    
    // Update UI
    document.getElementById('lat').textContent = mockData.lat;
    document.getElementById('lng').textContent = mockData.lng;
    document.getElementById('address').textContent = mockData.address;
    document.getElementById('accuracy').textContent = mockData.accuracy;
    document.getElementById('name').textContent = mockData.name;
    document.getElementById('carrier').textContent = mockData.carrier;
    document.getElementById('status').textContent = mockData.status;
    document.getElementById('lastSeen').textContent = mockData.lastSeen;
    document.getElementById('cellTower').textContent = mockData.cellTower;
    document.getElementById('signal').textContent = mockData.signal;
    document.getElementById('imsi').textContent = mockData.imsi;
    document.getElementById('network').textContent = mockData.network;

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    trackBtn.innerHTML = '<i class="fas fa-crosshairs"></i> TRACK AGAIN';
    trackBtn.disabled = false;
}

// Generate realistic mock data
function generateMockData(phone) {
    const carriers = ['Telkomsel', 'XL Axiata', 'Indosat Ooredoo', 'Smartfren'];
    const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Yogyakarta'];
    
    const carrier = carriers[Math.floor(phone.slice(1,4) / 2000) % carriers.length];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    return {
        lat: (-6.2 + Math.random() * 10).toFixed(6),
        lng: (106.8 + Math.random() * 15).toFixed(6),
        address: `${city}, Indonesia (Urban Area)`,
        accuracy: '15-50m (Cell Tower Triangulation)',
        name: `User_${phone.slice(-4)}`,
        carrier,
        status: 'Online',
        lastSeen: new Date().toLocaleString('id-ID'),
        cellTower: `ID-${carrier.slice(0,3)}-${Math.floor(Math.random()*1000)}`,
        signal: 'Strong (-65 dBm)',
        imsi: `510${Math.floor(Math.random()*10)}${phone.slice(1,7)}`,
        network: '4G LTE'
    };
}

// Event listeners
document.getElementById('trackBtn').addEventListener('click', trackPhone);
document.getElementById('phoneNumber').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') trackPhone();
});

// Input formatting
document.getElementById('phoneNumber').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);
    e.target.value = value;
});

// Initialize
createParticles();
console.log('🌟 MazkiplayIntelegent loaded! Ethical pentest tool ready.');
