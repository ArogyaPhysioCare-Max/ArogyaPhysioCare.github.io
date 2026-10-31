/* ==========================================================================
   AROGYA PHYSIO CARE - INTERACTIVE LOGIC & DIRECT WHATSAPP/CALL/SMS ENGINE
   ========================================================================== */

// Official Clinic Configuration
const CLINIC_CONFIG = {
  name: "Arogya Physio Care",
  tagline: "Mission Health First",
  location: "Arogya Physio Care, Adani Shantigram Mall, Shantigram, Gujarat 382501",
  phoneDisplay: "+91 8511210788",
  phoneRaw: "+918511210788",
  whatsappNumber: "918511210788", // Primary Official WhatsApp line
};

// Body Map Treatment Database
const PAIN_DATA = {
  neck: {
    title: "Cervical Spine & Neck Relief",
    desc: "Targeted therapy for Cervical Spondylosis, Trapezius Spasm, and Tech-Neck Stiffness.",
    treatments: [
      "Manual Cervical Decompression & Mobilization",
      "Trigger Point Dry Needling for Trapezius",
      "Ergonomic Posture Correction & Chin Tucks",
      "Therapeutic Ultrasound for Deep Muscle Relaxation"
    ],
    recommendedService: "Cervical Spine Care"
  },
  shoulder: {
    title: "Shoulder & Rotator Cuff Rehab",
    desc: "Complete recovery program for Frozen Shoulder (Adhesive Capsulitis), Impingement, and Tendonitis.",
    treatments: [
      "Maitland Joint Mobilization & Scapular PNF",
      "Myofascial Cupping & Soft Tissue Release",
      "Theraband Resistance Range-of-Motion Exercises",
      "IFT & Electro-analgesia Pain Relief"
    ],
    recommendedService: "Joint & Shoulder Rehab"
  },
  back: {
    title: "Lumbar & Sciatica Pain Solution",
    desc: "Advanced non-surgical rehabilitation for Sciatica, Herniated Disc, and Lumbar Spondylosis.",
    treatments: [
      "McKenzie Spine Extension Protocol",
      "Lumbar Mechanical Traction",
      "Deep Core Stability & Pelvic Alignment",
      "Kinesiology Taping for Lumbar Support"
    ],
    recommendedService: "Spine & Sciatica Rehabilitation"
  },
  hip: {
    title: "Hip Joint & Pelvic Mobility",
    desc: "Relief for Hip Bursitis, Piriformis Syndrome, and Post-Surgical Hip Rehab.",
    treatments: [
      "Pelvic Girdle Realignment",
      "Gluteal Activation & Functional Strengthening",
      "Myofascial Trigger Point Release",
      "Gait & Balance Training"
    ],
    recommendedService: "Hip & Pelvic Care"
  },
  knee: {
    title: "Knee Osteoarthritis & ACL Recovery",
    desc: "Evidence-based therapy for Knee Osteoarthritis, ACL/Ligament Tears, and Patellofemoral Pain.",
    treatments: [
      "Quadriceps Muscle Retraining & VMO Strengthening",
      "Laser & IFT Modality for Joint Inflammation",
      "Post-TKR (Total Knee Replacement) Rehabilitation",
      "Proprioception & Wobble Board Balance Training"
    ],
    recommendedService: "Knee & Post-Op Rehab"
  },
  ankle: {
    title: "Ankle Sprain & Plantar Fasciitis",
    desc: "Targeted rehab for Chronic Ankle Instability, Achilles Tendonitis, and Heel Pain.",
    treatments: [
      "Myofascial Scraping & Plantar Fascia Release",
      "Ankle Joint Mobilization & Balance Retraining",
      "Theraband Ankle Eversion & Dorsiflexion Exercises",
      "Custom Footwear & Orthotic Guidance"
    ],
    recommendedService: "Foot & Ankle Care"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initPainMap();
  initWhatsAppBooking();
  initGalleryFilters();
  initCounters();
  initMobileMenu();
});

/* --------------------------------------------------
   1. Interactive Body Map Handler
-------------------------------------------------- */
function initPainMap() {
  const nodes = document.querySelectorAll('.pain-node');
  const titleEl = document.getElementById('pain-title');
  const descEl = document.getElementById('pain-desc');
  const listEl = document.getElementById('pain-treatments');
  const bookBtn = document.getElementById('pain-book-btn');

  if (!nodes.length) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const spot = node.dataset.spot;
      const data = PAIN_DATA[spot];

      if (data) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        
        listEl.innerHTML = data.treatments.map(t => 
          `<li><i class="fas fa-check-circle"></i> ${t}</li>`
        ).join('');

        if (bookBtn) {
          bookBtn.setAttribute('onclick', `openWhatsAppModal('${data.recommendedService}')`);
        }
      }
    });
  });
}

/* --------------------------------------------------
   2. Direct WhatsApp Generator & Modal
-------------------------------------------------- */
function openWhatsAppModal(serviceName = '') {
  const modal = document.getElementById('whatsapp-modal');
  const serviceSelect = document.getElementById('modal-service');
  
  if (serviceName && serviceSelect) {
    for (let option of serviceSelect.options) {
      if (option.value.toLowerCase().includes(serviceName.toLowerCase()) || option.text.toLowerCase().includes(serviceName.toLowerCase())) {
        option.selected = true;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('active');
  }
}

function closeWhatsAppModal() {
  const modal = document.getElementById('whatsapp-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function sendWhatsAppAppointment(event) {
  event.preventDefault();
  
  const name = document.getElementById('modal-name')?.value.trim() || 'Patient';
  const service = document.getElementById('modal-service')?.value || 'General Consultation';
  const date = document.getElementById('modal-date')?.value || 'Earliest Available';
  const time = document.getElementById('modal-time')?.value || 'Morning Session';
  const notes = document.getElementById('modal-notes')?.value.trim() || 'None';

  const message = `*Namaste Arogya Physio Care!* 🌿\n\nI would like to book a Physiotherapy Appointment at your *Adani Shantigram Mall Clinic*.\n\n👤 *Patient Name:* ${name}\n🏥 *Service Required:* ${service}\n📅 *Preferred Date:* ${date}\n⏰ *Preferred Time:* ${time}\n📝 *Symptoms/Notes:* ${notes}\n\nPlease confirm slot availability (+91 8511210788). Thank you!`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodedMsg}`;

  // Open WhatsApp directly
  window.open(waUrl, '_blank');
  closeWhatsAppModal();
}

// Global direct WhatsApp trigger
function triggerDirectWhatsApp(customService = 'Physiotherapy Consultation') {
  const message = `*Namaste Arogya Physio Care!* 🌿\n\nI am contacting you from your website to book an appointment for *${customService}* at your Adani Shantigram Mall clinic. Please guide me with available time slots.`;
  const waUrl = `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// Direct Call & SMS Triggers
function triggerDirectCall() {
  window.location.href = `tel:${CLINIC_CONFIG.phoneRaw}`;
}

function triggerDirectSMS(customService = 'Physiotherapy Consultation') {
  const bodyText = `Namaste Arogya Physio Care! I want to book an appointment for ${customService} at Adani Shantigram Mall. Phone: +91 8511210788`;
  window.location.href = `sms:${CLINIC_CONFIG.phoneRaw}?body=${encodeURIComponent(bodyText)}`;
}

/* --------------------------------------------------
   3. Mobility & Exercise Gallery Filters
-------------------------------------------------- */
function initGalleryFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.gallery-card');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------
   4. Stat Counter Animation
-------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const handleScroll = () => {
    const section = document.querySelector('.hero-stats');
    if (!section || animated) return;

    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 100) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const speed = target / 50;

        const update = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(update, 30);
          } else {
            counter.innerText = target + (counter.dataset.suffix || '');
          }
        };
        update();
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* --------------------------------------------------
   5. Mobile Menu Toggle
-------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      if (links.style.display === 'flex') {
        links.style.display = 'none';
      } else {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '80px';
        links.style.left = '0';
        links.style.width = '100%';
        links.style.background = '#03120D';
        links.style.padding = '1.5rem';
        links.style.borderBottom = '1px solid var(--glass-border)';
      }
    });
  }
}
