// MazkiplayIntelegent - FULL STATIC VERSION (GitHub Pages Ready!)
class MazkiplayEngine {
    constructor() {
        this.carriers = {
            '81': 'Telkomsel', '82': 'Telkomsel', '83': 'Telkomsel', '85': 'XL',
            '86': 'Indosat', '87': 'Indosat', '88': 'Smartfren', '89': 'Three'
        };
        this.cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Yogyakarta'];
    }

    trackPhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        const prefix = cleanPhone.slice(0, 2);
        const carrier = this.carriers[prefix] || 'Telkomsel';
        const city = this.cities[Math.floor(Math.random() * this.cities.length)];
        
        // GPS Simulation (realistic Indonesia)
        const jakartaLat = -6.2088;
        const jakartaLng = 106.8456;
        const lat = (jakartaLat + (Math.random() - 0.5) * 8).toFixed(6);
        const lng = (jakartaLng + (Math.random() - 0.5) * 12).toFixed(6);
        
        // OSINT Intel
        const emails = [
            `${cleanPhone.slice(1,4)}${cleanPhone.slice(5,9)}@gmail.com`,
            `user${cleanPhone.slice(-4)}@yahoo.co.id`
        ];
        
        const breaches = ['Tokopedia 2020', 'BRI 2021', 'Shopee 2022'].sort(() => 0.5 - Math.random()).slice(0, 2);
        
        // NIK Simulation (pentest demo)
        const nik = `12${Math.floor(Math.random()*12)+1}${(new Date().getMonth()+1).toString().padStart(2,'0')}${Math.floor(Math.random()*28)+1}${(Math.floor(Math.random()*10000)).toString().padStart(4,'0')}${Math.floor(Math.random()*10)}`;
        
        return {
            success: true,
            phone: `+62${cleanPhone}`,
            carrier,
            location: {
                lat, lng,
                address: `${city}, Jawa ${city.includes('Jakarta') ? 'DKI' : 'Tengah/Barat/Timur'}, Indonesia`,
                accuracy: `${Math.floor(Math.random()*100)+20}m`,
                cell_towers: Math.floor(Math.random()*5)+3
            },
            identity: {
                nik,
                name: `Budi Santoso ${cleanPhone.slice(-4)}`,
                ktp_status: "Valid (Simulation)"
            },
            social: {
                whatsapp: "✅ Verified",
                instagram: `@user${cleanPhone.slice(-4)}`,
                telegram: `t.me/phone${cleanPhone.slice(1,5)}`
            },
            emails: emails,
            breaches: {
                found: breaches.length,
                details: breaches
            },
            technical: {
                imsi: `510${Math.floor(Math.random()*10)}${cleanPhone.slice(1,10)}`,
                signal: `-${Math.floor(Math.random()*30)+60} dBm`,
                network: ['4G LTE', '5G', '3G'][Math.floor(Math.random()*3)]
            },
            scan_time: new Date().toLocaleString('id-ID')
        };
    }
}

const engine = new MazkiplayEngine();

async function trackPhone() {
    const phoneInput = document.getElementById('phoneNumber');
    const phone = phoneInput.value.replace(/\D/g, '');
    const trackBtn = document.getElementById('trackBtn');
    const results = document.getElementById('resultsSection');
    
    if(phone.length < 10) {
        alert('📱 Masukkan nomor lengkap (10-13 digit)');
        return;
    }
    
    // Loading
    trackBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> TRACKING...';
    trackBtn.disabled = true;
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 2500));
    
    const intel = engine.trackPhone(phone);
    
    // UPDATE UI dengan data lengkap!
    document.getElementById('lat').textContent = intel.location.lat;
    document.getElementById('lng').textContent = intel.location.lng;
    document.getElementById('address').textContent = intel.location.address;
    document.getElementById('accuracy').textContent = intel.location.accuracy;
    
    document.getElementById('name').textContent = intel.identity.name;
    document.getElementById('carrier').textContent = intel.carrier;
    document.getElementById('status').textContent = 'Active';
    document.getElementById('lastSeen').textContent = intel.scan_time;
    
    document.getElementById('cellTower').textContent = `${intel.location.cell_towers} towers`;
    document.getElementById('signal').textContent = intel.technical.signal;
    document.getElementById('imsi').textContent = intel.technical.imsi;
    document.getElementById('network').textContent = intel.technical.network;
    
    // Show extra intel di console (pentester view)
    console.log('🔥 FULL INTEL REPORT:', intel);
    console.log('🆔 NIK:', intel.identity.nik);
    console.log('📧 Emails:', intel.emails);
    console.log('💥 Breaches:', intel.breaches.details);
    
    results.style.display = 'block';
    results.scrollIntoView({behavior: 'smooth'});
    
    trackBtn.innerHTML = '<i class="fas fa-bolt"></i> TRACK LAGI';
    trackBtn.disabled = false;
    
    // Auto-clear input
    phoneInput.value = '';
}

// Particles & Init
function initParticles() {
    const particles = document.getElementById('particles');
    for(let i = 0; i < 80; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed; width: 3px; height: 3px; 
            background: linear-gradient(45deg, #00ff88, #ff0080);
            border-radius: 50%; left: ${Math.random()*100}vw; 
            top: ${Math.random()*100}vh; animation: float ${10+Math.random()*20}s infinite linear;
            box-shadow: 0 0 10px #00ff88;
        `;
        particles.appendChild(dot);
    }
}

document.getElementById('trackBtn').onclick = trackPhone;
document.getElementById('phoneNumber').onkeypress = (e) => e.key === 'Enter' && trackPhone();

initParticles();
console.log('🌟 MazkiplayIntelegent FULLY LOADED! Test: 81234567890');
