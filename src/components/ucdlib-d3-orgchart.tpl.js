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
      min-width: 2.5em;
      min-height: 2.5em;
      margin: 5px 0;
      padding: 9.5px;
      border: 1px solid #b0d0ed;
      background-color: transparent;
      color: #022851;
      cursor: pointer;
      font-family: inherit;
      font-weight: 1100;
      line-height: 1.1;
      text-align: center;
      text-decoration: none;
      transition: 0.2s;
      border-color: transparent;
      background-color: #CCE0F3;
      font-size: 1.2rem;
    }
    .btn--options:hover, .btn--options:focus {
      text-decoration: none;
      background-color: #FFBF00;
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

    .btn--options:hover {
      opacity: 1
    }

    .icon-size {
      width: 20px;
      height: 20px;
    }

    .small-icon-size {
      width: 6px;
      height: 6px;
    }

    .chart-container{
      padding-top:10px; 
      margin:0;
      background-color:#EBF3FA;
      height:600px;
    }

    .top-options {
      margin:9.5px 0;
    }
    .svg-chart-container {
      height:600px;
    }
    .bottom-options {
      margin-top:9.5px;
      padding-top:9.5px;
      padding-right:9.5px;

      background-color: #EBF3FA;
    }
    @media (max-width: 800px) {
      .top-options {
        text-align:center;
      }
    }



  `;

  return [elementStyles];
}

export function render() { 
return html`
 <div class="orgChart">
        <div class="org-options" style="text-align:right;margin-top:38px">
            <div class="top-options">
              <button title="Expand Out Chart" class="btn--options" @click="${this.expandOrg}">${this.icons.expand} &nbsp; Expand All</button>
              <button title="Collapse Chart" class="btn--options" @click="${this.collapseOrg}">${this.icons.collapse} &nbsp; Collapse All</button>
              <button title="Fit Screen" class="btn--options" @click=${this.fitOrg}>${this.icons.fit} &nbsp; Fit Screen</button>
              <button title="Export PDF" class="btn--options" @click="${e => this.exportPDF(false)}">${this.icons.exportPdf} &nbsp; Export PDF</button> 
            </div>
        </div>


        <div class='chart-container' id="chart-container" ></div>
    </div>
`;}

