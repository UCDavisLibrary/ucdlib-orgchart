import { LitElement,html } from 'lit';
import {render, styles} from "./ucdlib-d3-orgchart.tpl.js";
import { OrgChart } from 'd3-org-chart';
import {json} from 'd3';
import * as d3 from 'd3';

/**
 * @description Organizational Chart Render
 */
export default class UcdlibD3OrgChart extends LitElement {

  static get properties() {
    return {
      src: { type: String, attribute: 'src' },
      csvData: {
        type: Array,
        attribute: 'csv-data',
        converter: {
          fromAttribute(value) {
            try {
              return JSON.parse(value); // Parse the JSON string into an array
            } catch (error) {
              console.error('Error parsing csv-data:', error);
              return [];
            }
          },
          toAttribute(value) {
            return JSON.stringify(value); // Serialize the array back to JSON
          }
        }
      }
    };
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.csvData = [];
    this.src = '';
    this.container = '';
    this.orgChart = null; // Reference to the OrgChart instance
    this.icons = {
      expand: html`<svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 80c0-26.5 21.5-48 48-48l64 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-8 0 0 40 152 0c30.9 0 56 25.1 56 56l0 32 8 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-64 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l8 0 0-32c0-4.4-3.6-8-8-8l-152 0 0 40 8 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-64 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l8 0 0-40-152 0c-4.4 0-8 3.6-8 8l0 32 8 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-64 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l8 0 0-32c0-30.9 25.1-56 56-56l152 0 0-40-8 0c-26.5 0-48-21.5-48-48l0-64z"/></svg>`,
      collapse: html`<svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M456 224l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l40 40L442.3 5.7C446 2 450.9 0 456 0s10 2 13.7 5.7l36.7 36.7C510 46 512 50.9 512 56s-2 10-5.7 13.7L433 143l40 40c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8zm0 64c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-40 40 73.4 73.4c3.6 3.6 5.7 8.5 5.7 13.7s-2 10-5.7 13.7l-36.7 36.7C466 510 461.1 512 456 512s-10-2-13.7-5.7L369 433l-40 40c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2l0-144c0-13.3 10.7-24 24-24l144 0zm-256 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-40-40L69.7 506.3C66 510 61.1 512 56 512s-10-2-13.7-5.7L5.7 469.7C2 466 0 461.1 0 456s2-10 5.7-13.7L79 369 39 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8l144 0zM56 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l40-40L5.7 69.7C2 66 0 61.1 0 56s2-10 5.7-13.7L42.3 5.7C46 2 50.9 0 56 0s10 2 13.7 5.7L143 79l40-40c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 144c0 13.3-10.7 24-24 24L56 224z"/></svg>`,
      zoomIn: html`<svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>`,
      zoomOut: html`<svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>`,
      fit: html`<svg class="icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>`,
      chevronUp: `<svg class="small-icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/></svg>`,
      chevronDown: `<svg class="small-icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`,

    };
  }

  /**
   * @description Runs the render options
   */
  runRender() {
    if (this.csvData.length !== 0) {
      this.renderOrgChart(this.csvData);
    } else if (this.src !== ''){
      json(this.src)
        .then((data) => {
          this.renderOrgChart(data);
        })
        .catch((error) => {
          console.error('Error loading JSON data:', error);
        });
    }
  }

  /**
   * @description On first update
   */
  firstUpdated(){
    // Initialize the org chart after the component has been rendered
    this.runRender(); 
  }

  /**
   * @description Update Properties
   * @param {Object} changedProperties changedProperties
   */
  updated(changedProperties){
    if (changedProperties.has('csvData')) {
      this.runRender();
    }
  }


  /**
   * @description Expand the Org Chart
   */
  expandOrg(){
    this.orgChart.expandAll().fit();

  }
  /**
   * @description Collapse the Org Chart
   */
  collapseOrg(){
    this.orgChart.collapseAll().fit();

  }

  /**
   * @description Zoom Out the Org Chart
   */
  zoomOut(){
    this.orgChart.zoomOut();

  }

  /**
   * @description Zoom In the Org Chart
   */
  zoomIn(){
    this.orgChart.zoomIn();

  }


  /**
   * @description fits to screen without centering in the middle
   */
  newCenter(){
    setTimeout(() => {
      
      let container = this.renderRoot.querySelector('.chart-container');
      const con = d3.select(container);
      const svg = con.select("svg");
      const containerG = svg.select("g");

      const bbox = containerG.node().getBBox();
      const rect = container.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      let translateX;
      let translateY;
      let scale;

      scale = containerWidth / bbox.width;


      translateX = (containerWidth - bbox.width * scale) / 2 - bbox.x * scale;
      translateY = 15; // Top padding (10px)


      containerG
      .transition()
      .duration(1000) // Duration of 1 second
      .ease(d3.easeCubicOut) // Smooth easing function
      .attr(
        "transform",
        `translate(${translateX}, ${translateY}) scale(${scale})`
      );

    }, 200);
  }



  /**
   * @description Fit the Org Chart to Screen
   */
   fitOrg(){
    this.orgChart.fit({
      onCompleted: function () {
        this.newCenter();
      }.bind(this) // Bind 'this' to the current instance
    });


  }




  /**
   * @description Render org chart 
   * @param {Object} jsonData org json data
   */
  renderOrgChart(jsonData) {
    this.container = this.renderRoot.querySelector('.chart-container');

    if (!this.orgChart) {
      this.orgChart = new OrgChart();
    }

    /**
     * @description Render org chart 
     * @param {Object} item
     * @returns 
     */
    function assignColorToTopLevel(item){

      // Assign the found color to the original item
      const color = findColor(item);
      if (color) {
        item.color = color;
      }
      return item;
    }
  
    /**
     * @description Render org chart 
     * @param {Node} node
     * @returns 
    */
    function findColor(node){
      // Recursive function to find the color in the hierarchy
      if (node.color) {
        return node.color;
      }
      if (node.parent) {
        return findColor(node.parent);
      }
      return null; // No color found
    }
  
    // Bind the org chart to the container
    this.orgChart
      .container(this.container)
      .data(jsonData)
      .rootMargin(40)
      .compact(false)
      .nodeWidth(() => 250)
      .nodeHeight(() => 80)
      .childrenMargin(() => 125)
      .compactMarginBetween(() => 75)
      .linkUpdate(function (d, i, arr) {
        d3.select(this)
        .attr('stroke', (d) =>
          d.data._upToTheRootHighlighted ? '#B0D0ED' : '#B0D0ED'
        )
      })
      .setActiveNodeCentered(true)
      .onZoom((e) => {
        let y = e.transform.y;

        if(y >= 15 ) {
          e.transform.y = 15;
        }
        
      })
      .compactMarginPair(() => 80)
      .buttonContent(({ node }) => {
        return `<div style="min-width:34px;height:17px;text-align:center;border-radius:3px;padding:8px 8px 6px 8px;font-size:10px;margin-top:${node.depth == 0 ? '23px' : '5px'};color:#022851;background-color:${node.color}"> <span style="font-size:9px">${
          node.children
            ? `<i>${this.icons.chevronUp}</i>`
            : `${this.icons.chevronDown}`
        }</span> ${node.data._totalSubordinates}  </div>`;
      })
      .nodeContent(function (d) {

        const departmentColor = 
          {
            "Online Strategy" : '#6CCA98',
            "Research and Learning": '#6FCFEB',
            "Scholarly Resources": '#FFBF00',
            "Library External Relations": '#F095CD',
            "DataLab": '#AADA91',
            "Library Finance and Administration": '#FF8189',
            "Office of the University Librarian": '#00C4B3'
          };


        if(d.depth == 0){
          d.color = '#73ABDD';
        }
        else if(d.depth == 1) {
          d.color = departmentColor[d.data.departmentName];          
        } else {
          assignColorToTopLevel(d);
        }

  
        return `
                  <div style="position:absolute;width:${d.width}px;height:${d.height}px;">
  
                        <div style="position:absolute;top:-20px;width:${d.width}px;text-align:center;color:#022851;">
                              <div style="margin:-25px 0px 0px auto;display:inline-block;height:18px;padding:8px;padding-bottom:0px;border-radius:5px"> ${d.data.departmentName}</div>
                        </div>
                        <div style="background-color:${d.color};height:fit-content;text-align:center;padding:12px;color:#022851;font-weight:bold;font-size:16px;border-radius:5px;">
                            <span>${d.data.fullName}<span><br />
                            <span style="font-size:12px;">${d.data.title}</span>
                        </div>
                     </div>
                 </div>
          `;
      })
      .render();
  }

}

customElements.define('ucdlib-d3-orgchart', UcdlibD3OrgChart);