/** Ensures flex:1 layouts work in the browser (blank screen fix). */
export function setupWebLayout() {
  if (typeof document === 'undefined') {
    return;
  }

  const styleId = 'khana-khazana-web-layout';
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    html, body {
      height: 100%;
      margin: 0;
      width: 100%;
    }
    #root {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      height: 100%;
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}
