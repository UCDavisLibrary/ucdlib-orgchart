import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      font-family: "Proxima Nova", sans-serif;
      font-weight: lighter;

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
      line-height: 1.1;
      text-align: center;
      text-decoration: none;
      transition: 0.2s;
      border-color: transparent;
      background-color: #CCE0F3;
      font-size: 0.875rem;
      height:45px;
    }
    .btn--options:hover, .btn--options:focus {
      text-decoration: none;
      background-color: #FFBF00;
    }
    .btn--options:focus {
      border-color: transparent;
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
      height:860px;
      overflow: hidden;
      transition: height 0.3s ease-in-out; /* Smooth transition */

    }

    .top-options {
      margin:9.5px 0;
    }
    .svg-chart-container {
      height:600px;
      width: 100%;
    }
    .chart {
      height:500px;
    }

    svg {
      overflow: visible; /* Prevent clipping */
    }

    .search-bar { 
      width: 200px;
      height: 45px;
      padding: 10px;
      background-color:white;
      color: #13639E;
      font-size: 16px;
      border: 1px solid #CCE0F3;
      border-radius: 1px;
      margin-right: 10px;
      margin-left: 10px;
    }

    .search-bar::-ms-clear {
      display: none;
    }

    input[type=search] {
      background-image: url('data:image/svg+xml;utf8,<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path  fill="%2373abdd" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>');
      background-position: right 10px top 10px;     
      background-repeat: no-repeat;
    }

    input[type="search"]::-webkit-search-cancel-button {
      display: none;
    }
    
    /* Remove "X" button in Firefox */
    input[type="search"]::-moz-search-clear-button {
      display: none;
    }
    
    /* Remove "X" button in Microsoft Edge (older versions) */
    input[type="search"]::-ms-clear {
      display: none;
    }

    .node-rect {
      stroke:none;
    }

    .bottom-item {
      display: inline-block;
    }

    .top-item {
      display: inline-block;
    }
    
    .top-item.display{
      display: inline-flex;
      align-items: center;    
    }

    .top-item.btn-options {
      float:right;
      font-weight: lighter;
    }
    
    .bottom-options {
      margin-top:9.5px;
      padding-top:9.5px;
      background-color: #EBF3FA;
      width: 100%;
      display:inline-block;
    }

    .btn--options.zoom{
      margin-top:0;
      margin-left:0;
      height: 45px;
      width:45px;
      padding:10px;
    }

    .btn--options.layout{
      margin-left:2px;
      min-height: 47px;
      min-width: 47px;
      padding:0px;
      background-color:transparent;
    }

    .btn--options.layout:hover{
      border: 2px solid #73ABDD;
    }



    .btn--options.layout.active {
      border: 2px solid #73ABDD; /* Active state */
    }

    .org-options {
      margin-top:38px;

    }

    .btn--options.smScreenView {
      display:none;
    }

    .btn--options.lgScreenView {
      display:inline-flex;
      vertical-align: middle;
    }

    @media (max-width: 800px) {
      .top-options {
      }
    }

    @media (max-width: 650px) {
      .top-item.display {
        display: flex;
        align-items: center; 
      }

      .top-item.btn-options {
        float:left;
      }
    }

    @media (max-width: 480px) {
      .top-item.display {
        display: flex;
        align-items: center; 
      }

      .top-item.btn-options {
        float:left;
      }
      
      .btn--options.smScreenView {
        display:inline-flex;
        vertical-align: middle;
      }

      .btn--options.lgScreenView {
        display:none;
      }
    }

  `;

  return [elementStyles];
}

export function render() { 
return html`
 <div class="orgChart">
        <div class="org-options">
            <div class="top-options">
              <div class="top-item display" style="font-size: 16.62px;color:#022851; ">
                Display: 
                <button title="Vertical Layout" style="margin-left:8px;" class="btn--options layout" @click="${this.changeVertical}">${this.icons.vertical}</button>
                <button title="Horizontal Layout" class="btn--options layout" @click="${this.changeHorizontal}">${this.icons.horizontal}</button>
              </div>
              <div class="top-item btn-options">
                <button title="Expand Out Chart" class="btn--options lgScreenView" @click="${this.expandOrg}">${this.icons.expand} &nbsp; Expand All</button>
                <button title="Collapse Chart" class="btn--options lgScreenView" @click="${this.collapseOrg}">${this.icons.collapse} &nbsp; Collapse All</button>
                <button title="Fit Screen" class="btn--options lgScreenView" @click=${this.fitOrg}>${this.icons.fit} &nbsp; Fit Screen</button>

                <button title="Expand Out Chart" class="btn--options smScreenView" @click="${this.expandOrg}">${this.icons.expand} &nbsp; Expand</button>
                <button title="Collapse Chart" class="btn--options smScreenView" @click="${this.collapseOrg}">${this.icons.collapse} &nbsp; Collapse</button>
                <button title="Fit Screen" class="btn--options smScreenView" @click=${this.fitOrg}>${this.icons.fit} &nbsp; Fit </button>
              </div>
            </div>
            <div class="bottom-options">
              <!-- <button title="Export PDF" class="btn--options" @click="${e => this.exportPDF(false)}">${this.icons.exportPdf} &nbsp; Export PDF</button>  -->
                <div class="bottom-item">
                  <input
                    class="search-bar"
                    type="search"
                    placeholder="Find a name..."
                    @input=${(e) => this.filterChart(e)}
                  />
                </div>

                <div class="bottom-item" style="float:right;margin-right:10px;gap:10px;">
                  <button title="Zoom Out" style="margin-right:7px;" class="btn--options zoom" @click="${this.zoomOut}">${this.icons.zoomOut}</button>
                  <button title="Zoom In" class="btn--options zoom" @click="${this.zoomIn}">${this.icons.zoomIn}</button>
                </div>

            </div>
        </div>




        <div class='chart-container' id="chart-container" ></div>
    </div>
`;}

