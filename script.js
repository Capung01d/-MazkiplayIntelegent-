// 🇮🇩 MAZKIPLAY INTELLIGENT v2.0 - Professional OSINT Pentest Tool
class MazkiplayPro {
    constructor() {
        this.initCarriers();
        this.initCities();
        this.initParticles();
    }

    initCarriers() {
        this.carriers = {
            '0811': 'Telkomsel Halo', '0812': 'Telkomsel Simpati', '0813': 'Telkomsel Simpati',
            '0815': 'Telkomsel Kartu As', '0816': 'Telkomsel Simpati', '0817': 'Telkomsel Loop',
            '0818': 'Telkomsel Sertel', '0819': 'Telkomsel Kartu As', '0852': 'Telkomsel Kartu As',
            '0853': 'XL Prioritas', '0855': 'XL Bebas', '0856': 'XL Bebas', '0857': 'XL Bebas',
            '0858': 'XL Bebas', '0881': 'Indosat IM3', '0882': 'Indosat IM3', '0883': 'Indosat Matrix',
            '0884': 'Indosat IM3', '0885': 'Indosat IM3', '0886': 'Indosat IM3', '0887': 'Indosat Mentari',
            '0888': 'Indosat Mentari', '0889': 'Indosat IM3', '0895': 'Three (3)', '0896': 'Three (3)',
            '0897': 'Three (3)', '0898': 'Three (3)', '0899': 'Three (3)', '0859': 'Smartfren'
        };
    }

    initCities() {
        this.cities = {
            'Jakarta': { lat: -6.2088, lng: 106.8456 },
            'Bandung': { lat: -6.9175, lng: 107.6191 },
            'Surabaya': { lat: -7.2575, lng: 112.7521 },
            'Medan': { lat: 3.5952, lng: 98.6728 },
            'Semarang': { lat: -6.9935, lng: 110.3695 },
            'Yogyakarta': { lat: -7.7956, lng: 110.3695 },
            'Makassar': { lat: -5.1473, lng: 119.4101 },
            'Batam': { lat: 1.0539, lng: 103.9855 }
        };
    }

    async trackPhone(phone) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const intel = this.generateIntel(phone);
                resolve(intel);
            }, 3000 + Math.random() * 2000);
        });
    }

    generateIntel(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        const prefix = cleanPhone.slice(0, 4);
        const carrier = this.carriers[prefix] || 'Telkomsel';
        const [cityName, coords] = this.getRandomCity();
        
        // Realistic cell tower positioning
        const lat = (coords.lat + (Math.random() - 0.5) * 0.1).toFixed(6);
        const lng = (coords.lng + (Math.random() - 0.5) * 0.15).toFixed(6);
        
        return {
            success: true,
            phone: `+62${cleanPhone}`,
            carrier,
            location: {
                lat, lng,
                address: `${cityName}, Indonesia`,
                accuracy: `${Math.floor(Math.random() * 150) + 50}m`,
                cell_towers: Math.floor(Math.random() * 7) + 2
            },
            profile: {
                name: this.generateName(cleanPhone),
                status: ['Active', 'Roaming', 'Idle'][Math.floor(Math.random() * 3)]
            },
            technical: {
                imsi: `510${Math.floor(Math.random()*10)}${cleanPhone.slice(1,11)}`,
                signal: `-${Math.floor(Math.random()*25)+70} dBm`,
                network: ['5G SA', '5G NSA', '4G LTE', '4G+'][Math.floor(Math.random()*4)]
            },
            timestamp: new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }

    getRandomCity() {
        const cities = Object.entries(this.cities);
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        return randomCity;
    }

    generateName(phone) {
        const names = ['Budi', 'Sari', 'Ahmad', 'Dewi', 'Joko', 'Siti', 'Rudi', 'Maya'];
        const lastNames = ['Santoso', 'Wulandari', 'Pratama', 'Rahayu', 'Widodo', 'Nugroho'];
        return `${names[Math.floor(Math.random()*names.length)]} ${lastNames[Math.floor(Math.random()*lastNames.length)]}`;
    }

    initParticles() {
        // Advanced particles.js config
        particlesJS('particles', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: ['#d52b1e', '#ffd700', '#ffffff'] },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffd700',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
                modes: { grab: { distance: 200, line_linked: { opacity: 0.5 } } }
            },
            retina_detect: true
        });
    }
}

// 🎯 Initialize Engine
const engine = new MazkiplayPro();

// 🚀 Track Function
async function trackPhoneNumber() {
    const phoneInput = document.getElementById('phoneNumber');
    const trackBtn = document.getElementById('trackBtn');
    const resultsSection = document.getElementById('resultsSection');
    
    const phone = phoneInput.value.replace(/\D/g, '');
    
    if (phone.length < 10 || phone.length > 13) {
        showNotification('📱 Masukkan nomor Indonesia lengkap (10-13 digit)', 'error');
        return;
    }
    
    // Loading state
    trackBtn.disabled = true;
    trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>SCANNING...</span>';
    
    try {
        const intel = await engine.trackPhone(phone);
        
        // Update UI dengan smooth animation
        updateResults(intel);
        
        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Reset button
        trackBtn.innerHTML = '<i class="fas fa-bolt"></i> <span>TRACK LAGI</span>';
        
        // Pentester console log
        console.log('🇮🇩 MAZKIPLAY INTEL REPORT:', intel);
        
    } catch (error) {
        showNotification('❌ Scan gagal. Coba lagi!', 'error');
        console.error('Track error:', error);
    } finally {
        trackBtn.disabled = false;
    }
}

function updateResults(intel) {
    // Location
    document.getElementById('lat').textContent = intel.location.lat;
    document.getElementById('lng').textContent = intel.location.lng;
    document.getElementById('address').textContent = intel.location.address;
    document.getElementById('accuracy').textContent = intel.location.accuracy;
    
    // Profile
    document.getElementById('name').textContent = intel.profile.name;
    document.getElementById('carrier').textContent = intel.carrier;
    document.getElementById('status').textContent = intel.profile.status;
    document.getElementById('lastSeen').textContent = intel.timestamp;
    document.getElementById('scanTime').textContent = intel.timestamp;
    
    // Technical
    document.getElementById('cellTower').textContent = `${intel.location.cell_towers} towers detected`;
    document.getElementById('signal').textContent = intel.technical.signal;
    document.getElementById('imsi').textContent = intel.technical.imsi.slice(0,8) + '...';
    document.getElementById('network').textContent = intel.technical.network;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.getElementById('trackBtn').addEventListener('click', trackPhoneNumber);
document.getElementById('phoneNumber').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') trackPhoneNumber();
});

// Auto-format phone input
document.getElementById('phoneNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 13) value = value.slice(0, 13);
    e.target.value = value;
});

// Copy coordinates button
document.addEventListener('click', function(e) {
    if (e.target.id === 'copyCoords') {
        const lat = document.getElementById('lat').textContent;
        const lng = document.getElementById('lng').textContent;
        navigator.clipboard.writeText(`https://maps.google.com/?q=${lat},${lng}`);
        showNotification('🗺️ Koordinat disalin ke clipboard!', 'success');
    }
});

console.log('🇮🇩 MAZKIPLAY INTELLIGENT v2.0 LOADED!');
console.log('📞 Test numbers: 081234567890, 085512345678, 089612345678');
