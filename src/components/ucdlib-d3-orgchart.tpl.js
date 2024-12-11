import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    .btn--options {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: auto;
      min-width: 10ch;
      min-height: 2.5em;
      margin-bottom: 0;
      padding: 0.625em 1em;
      border: 1px solid #b0d0ed;
      background-color: transparent;
      color: #022851;
      cursor: pointer;
      font-family: inherit;
      font-weight: 1100;
      line-height: 1.1;
      text-align: center;
      text-decoration: none;
      padding-right: 1.5em;
      padding-left: 0.75em;
      transition: 0.2s;
      border-color: transparent;
      background-color: #dbeaf7;
      font-size: 1.2rem;
    }
    .btn--options:hover, .btn--options:focus {
      color: #ffbf00;
      text-decoration: none;
      background-color: #ffbf00;
    }
    .btn--options:focus {
      border-color: transparent;
      box-shadow: 0 0 0 3px #022851;
      outline-color: transparent;
      outline-style: solid;
    }
    .category-brand__background .btn--alt3, .dark-background .btn--alt3 {
      border-color: var(--category-brand-contrast-color);
      color: var(--category-brand-contrast-color);
    }
    .btn--options:before {
      width: 1em;
      color: var(--btn-arrow-color);
      content: "\F054";
      font-family: "Font Awesome 5 Free";
      font-size: 0.75em;
      font-weight: 1100;
      opacity: 0;
      transform: translateX(-100%);
      transition: 0.2s all ease-out;
    }
    .btn--options:hover {
      opacity: 1
    }

    .icon-size {
      width: 20px;
      height: 20px;
    }

  `;

  return [elementStyles];
}

export function render() { 
return html`
 <div class="orgChart">
        <div class="org-options" style="text-align:center;margin:50px 0">
                <button title="Fit to Screen" class="btn--options" @click=${this.fitOrg}><svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></button>
                <button title="Expand Out Chart" class="btn--options" @click="${this.expandOrg}"><svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg></button>
                <button title="Collapse Chart" class="btn--options" @click="${this.collapseOrg}"><svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg></button>
                <button title="Zoom In" class="btn--options" @click="${this.zoomIn}"><svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z"/></svg></button>
                <button title="Zoom Out" class="btn--options" @click="${this.zoomOut}"><svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0z"/></svg></button>
        </div>


        <div class='chart-container' style="padding-top:10px; margin:0;"></div>
    </div>
`;}

