'use strict';

// Step 1: Create a class that extends HTMLElement
class ChatbotWidget extends HTMLElement {
    // Step 2: Define the observed attributes
    static get observedAttributes() {
        // id="chatbot-widget-clzlfslj349xysfp8r17xewap"
        // host="chatbot.com"
        // widget="clzlfslj349xysfp8r17xewap"
        // layout="default"
        // position="bottom-right"
        // open="false"
        return [
            'title',
            'content',
            'id',
            'host',
            'widget',
            'layout',
            'position',
            'open',
        ];
    }

    constructor() {
        super(); // Always call super() first in the constructor.

        // Step 3: Attach a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Step 4: Create the initial structure
        this.shadowRoot.innerHTML = `
        <style>
        :host {
          display: block;

          contain: paint;
        }

        .wrapper {
          display: flex;

          width: 100%;
          height: 100%;
        }

        .frame {
          max-width: 100vw;
          max-height: 100vh;

          border: 0px;
          margin: 0px;
          padding: 0px;

          transform: translate3d(0, 0, 0);

          background: transparent;

          color-scheme: normal;

          /*
            outline: 2px solid red;
            background: yellow;
          */
        }

        @media only screen and (max-width: 640px) {
          .frame[data-open='true'] {
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        </style>
        <div class="wrapper"></div>
        <a href="https://chatbot.com" title="Train ChatGPT on your own data">AI Widget</a>
      `;

        // this.updateComponent();
        this.frame = document.createElement('iframe');
        this.shadowRoot.appendChild(this.frame);

        this.shadowRoot({ mode: 'closed' });
    }

    // Step 5: Handle attribute changes
    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (oldValue !== newValue) {
    //         this.updateComponent();
    //     }
    // }

    // Step 6: Update the component's content
    // updateComponent() {
    //     const title = this.getAttribute('title');
    //     const content = this.getAttribute('content');

    //     this.shadowRoot.querySelector('h1').textContent = title;
    //     this.shadowRoot.querySelector('p').textContent = content;
    // }
}

// Register Custom Element
if (!window.customElements.get('chatbot-widget')) {
    window.customElements.define('chatbot-widget', ChatbotWidget);
}

// Initialize the widget
function initializeChatBotWidget() {
    const widgetElement = document.createElement('chatbot-widget');
    // ... set attributes and append to body
    document.body.appendChild(widgetElement);

    // Expose widget to global scope
    window.chatbotWidget = widgetElement;
}

// Call initialization when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatBotWidget);
} else {
    initializeChatBotWidget();
}
