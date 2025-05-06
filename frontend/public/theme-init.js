// This script runs before React loads to prevent flash of wrong theme
(function() {
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('color-theme');
  
  if (savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
