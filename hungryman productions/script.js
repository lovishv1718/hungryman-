document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.accordion-column');
  const centerpiece = document.querySelector('.centerpiece');

  // --- COLUMN BACKGROUND PARALLAX ---
  columns.forEach(col => {
    const bg = col.querySelector('.column-bg');
    
    col.addEventListener('mousemove', (e) => {
      const rect = col.getBoundingClientRect();
      // Calculate mouse position relative to column center (-1 to 1 range)
      const relX = ((e.clientX - rect.left) / rect.width) - 0.5;
      const relY = ((e.clientY - rect.top) / rect.height) - 0.5;
      
      // Compute displacement (subtle, e.g., max 15px)
      const moveX = relX * 25;
      const moveY = relY * 25;

      // Apply transform (adding extra scale on hover)
      bg.style.transform = `scale(1.12) translate(${moveX}px, ${moveY}px)`;
      bg.style.transition = 'transform 0.1s ease-out'; // Fast tracking when inside
    });

    col.addEventListener('mouseleave', () => {
      // Return to original state with smooth transition
      bg.style.transform = 'scale(1.0) translate(0px, 0px)';
      bg.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.3, 1)';
    });
    
    col.addEventListener('mouseenter', () => {
      // Just start scaling up immediately when entering
      bg.style.transform = 'scale(1.12) translate(0px, 0px)';
      bg.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.3, 1)';
    });
  });

  // --- ENTER STUDIO TRANSITION EFFECT ---
  const enterBtn = document.getElementById('enter-studio');
  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create flash / fade overlay element dynamically
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.backgroundColor = '#FFFFFF';
    flash.style.zIndex = '99999';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.6s ease-in-out';
    document.body.appendChild(flash);

    // Trigger transition
    setTimeout(() => {
      flash.style.opacity = '1';
    }, 50);

    // Redirect or trigger action after transition
    setTimeout(() => {
      alert("Welcome to the Studio of Hungryman Productions.");
      flash.style.transition = 'opacity 0.8s ease-in-out';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 800);
    }, 700);
  });

});
