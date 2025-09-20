// IntersectionObserver reveal animations
(function(){
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  var revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(function(el){ observer.observe(el); });
})();

// Mouse interaction for live background
document.addEventListener('mousemove', function(e){
  var particles = document.querySelectorAll('.particle');
  var mouseX = e.clientX / window.innerWidth;
  var mouseY = e.clientY / window.innerHeight;
  
  particles.forEach(function(particle, index){
    var speed = (index % 3 + 1) * 0.5;
    var x = (mouseX - 0.5) * speed * 20;
    var y = (mouseY - 0.5) * speed * 20;
    
    particle.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// -------------------------
// Simple Task List (LocalStorage)
// -------------------------
(function(){
  var listEl = document.getElementById('taskList');
  var formEl = document.getElementById('taskForm');
  var inputEl = document.getElementById('taskInput');
  if(!listEl || !formEl || !inputEl) return;

  var STORAGE_KEY = 'taskflow.tasks';
  var SEED_VERSION_KEY = 'taskflow.seedVersion';
  var CURRENT_SEED_VERSION = 2;

  function readTasks(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(_){ return []; }
  }
  function writeTasks(tasks){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function render(){
    var tasks = readTasks();
    listEl.innerHTML = '';
    tasks.forEach(function(task, idx){
      var li = document.createElement('li');
      var left = document.createElement('div');
      left.style.display = 'flex';
      left.style.alignItems = 'center';
      left.style.gap = '12px';

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!task.done;
      cb.addEventListener('change', function(){
        var t = readTasks();
        if(t[idx]){ t[idx].done = cb.checked; writeTasks(t); }
      });
      var span = document.createElement('span');
      span.textContent = task.text;
      left.appendChild(cb);
      left.appendChild(span);

      var removeBtn = document.createElement('button');
      removeBtn.className = 'task-remove';
      removeBtn.setAttribute('aria-label','Remove task');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', function(){
        var t = readTasks();
        t.splice(idx,1);
        writeTasks(t);
        render();
      });

      li.appendChild(left);
      li.appendChild(removeBtn);
      listEl.appendChild(li);
    });
  }

  formEl.addEventListener('submit', function(e){
    e.preventDefault();
    var text = (inputEl.value || '').trim();
    if(!text) return;
    var tasks = readTasks();
    tasks.unshift({ text: text, done: false });
    writeTasks(tasks);
    inputEl.value = '';
    render();
  });

  // Seed or migrate default tasks
  (function seedOrMigrate(){
    var tasks = readTasks();
    var seedVersion = parseInt(localStorage.getItem(SEED_VERSION_KEY) || '0', 10);
    var newSeed = [
      { text: 'Go for Morning Walk at 7 am', done: false },
      { text: 'Plan Groceries for the week', done: false }
    ];

    // Fresh install → seed
    if(tasks.length === 0){
      writeTasks(newSeed);
      localStorage.setItem(SEED_VERSION_KEY, String(CURRENT_SEED_VERSION));
      return;
    }

    // Migrate from older demo seed only if it looks like the previous defaults
    var looksLikeOldSeed = tasks.length >= 3 && tasks.some(function(t){ return (t.text||'').indexOf('Morning standup at 9:30') !== -1; });
    if(seedVersion < CURRENT_SEED_VERSION && looksLikeOldSeed){
      writeTasks(newSeed);
      localStorage.setItem(SEED_VERSION_KEY, String(CURRENT_SEED_VERSION));
    }
  })();
  render();
})();

// Simple navigation handler
document.addEventListener('DOMContentLoaded', function(){
  // Handle all navigation links
  var navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var href = this.getAttribute('href');
      var target = document.querySelector(href);
      if(target){
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// -------------------------
// Pricing selection
// -------------------------
(function(){
  var planEls = document.querySelectorAll('.price-card.selectable');
  if(!planEls.length) return;

  function select(el){
    planEls.forEach(function(p){
      p.classList.remove('selected');
      p.classList.remove('highlight');
      p.setAttribute('aria-pressed','false');
      var btn = p.querySelector('.btn');
      if(btn){ btn.classList.remove('btn-primary'); btn.className = btn.className.replace(/\bbtn-primary\b/g,'btn-ghost'); }
    });
    el.classList.add('selected');
    el.setAttribute('aria-pressed','true');
    var btn2 = el.querySelector('.btn');
    if(btn2){ btn2.className = btn2.className.replace(/\bbtn-ghost\b/g,'btn-primary'); }
  }

  planEls.forEach(function(el){
    el.addEventListener('click', function(e){
      // Don't interfere with links inside the card
      if(e.target.tagName === 'A') return;
      select(el);
    });
    el.addEventListener('keydown', function(ev){
      if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); select(el); }
    });
  });
})();


