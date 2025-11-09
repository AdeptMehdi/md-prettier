// DOM Elements
const markdownInput = document.getElementById('markdown-input');
const htmlPreview = document.getElementById('html-preview');
const renderBtn = document.getElementById('render-btn');
const copyMarkdownBtn = document.getElementById('copy-markdown-btn');
const copyHtmlBtn = document.getElementById('copy-html-btn');
const downloadHtmlBtn = document.getElementById('download-html-btn');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');
const infoBtn = document.getElementById('info-btn');
const wordCount = document.getElementById('word-count');
const lineCount = document.getElementById('line-count');

// Configure Marked
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false,
});

// Theme management
let isDarkMode = localStorage.getItem('darkMode') === 'true';
updateTheme();

function updateTheme() {
  document.documentElement.classList.toggle('dark', isDarkMode);
  const icon = themeToggle.querySelector('i');
  icon.className = isDarkMode ? 'fas fa-moon text-blue-400' : 'fas fa-sun text-yellow-500';
  localStorage.setItem('darkMode', isDarkMode);
}

// Render Markdown to HTML
function renderMarkdown() {
  const markdown = markdownInput.value;
  const html = marked.parse(markdown);
  htmlPreview.innerHTML = html;
  hljs.highlightAll();
  updateCounters();
}

function updateCounters() {
  const text = markdownInput.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  wordCount.textContent = `${words} words`;
  lineCount.textContent = `${lines} lines`;
}

// Copy to clipboard
async function copyToClipboard(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: successMessage,
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: successMessage,
      timer: 2000,
      showConfirmButton: false
    });
  }
}

// Download HTML
function downloadHTML() {
  const html = htmlPreview.innerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  Swal.fire({
    icon: 'success',
    title: 'Downloaded!',
    text: 'HTML file has been downloaded.',
    timer: 2000,
    showConfirmButton: false
  });
}

// Drag and Drop
function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900');
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        markdownInput.value = e.target.result;
        renderMarkdown();
      };
      reader.readAsText(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please drop a Markdown (.md) file.',
      });
    }
  }
}

// Event Listeners
renderBtn.addEventListener('click', renderMarkdown);

copyMarkdownBtn.addEventListener('click', () => {
  copyToClipboard(markdownInput.value, 'Markdown copied to clipboard!');
});

copyHtmlBtn.addEventListener('click', () => {
  copyToClipboard(htmlPreview.innerHTML, 'HTML copied to clipboard!');
});

downloadHtmlBtn.addEventListener('click', downloadHTML);

clearBtn.addEventListener('click', () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will clear all content.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, clear it!'
  }).then((result) => {
    if (result.isConfirmed) {
      markdownInput.value = '';
      htmlPreview.innerHTML = '';
      updateCounters();
      Swal.fire('Cleared!', 'Content has been cleared.', 'success');
    }
  });
});

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  updateTheme();
});

infoBtn.addEventListener('click', () => {
  Swal.fire({
    title: 'MD Prettier',
    html: `
      <p>A modern Markdown to HTML converter with live preview.</p>
      <p>Features:</p>
      <ul style="text-align: left;">
        <li>Live Markdown rendering</li>
        <li>Syntax highlighting</li>
        <li>Dark/Light theme</li>
        <li>Copy and download options</li>
        <li>Drag & drop .md files</li>
      </ul>
      <p>Version: 1.0.0</p>
      <p><a href="https://github.com/AdeptMehdi/md-prettier" target="_blank">View on GitHub</a></p>
    `,
    icon: 'info',
    confirmButtonText: 'Got it!'
  });
});

markdownInput.addEventListener('input', () => {
  renderMarkdown();
});

markdownInput.addEventListener('dragover', handleDragOver);
markdownInput.addEventListener('dragleave', handleDragLeave);
markdownInput.addEventListener('drop', handleDrop);

// Initialize
renderMarkdown();

// Initialize particles
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});
