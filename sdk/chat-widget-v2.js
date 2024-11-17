// Define the ChatBot Widget as a Web Component
class ChatBotWidget extends HTMLElement {
    static get observedAttributes() {
        return [
            'open',
            'session',
            'widget',
            'layout',
            'position',
            'baricon',
            'bartitle',
            'botIcon',
            'usericon',
            'buttonicon',
            'placeholder',
            'hidebar',
            'hidebutton',
        ];
    }

    // Various attribute getters and setters
    // Boolean attributes
    get isOpen() {
        return this.getAttribute('open') === 'true';
    }
    set isOpen(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('open', value);
    }

    get hideBar() {
        return (
            this.hasAttribute('hidebar') ||
            ['true', 'on'].includes(this.getAttribute('hidebar') || '')
        );
    }
    set hideBar(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('hidebar', value ? 'true' : 'false');
    }

    get hideButton() {
        return (
            this.hasAttribute('hidebutton') ||
            ['true', 'on'].includes(this.getAttribute('hidebutton') || '')
        );
    }
    set hideButton(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('hidebutton', value ? 'true' : 'false');
    }

    // String attributes
    get session() {
        return this.getAttribute('session');
    }
    set session(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('session', value);
    }

    get widget() {
        return this.getAttribute('widget');
    }
    set widget(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('widget', value);
    }

    get layout() {
        return this.getAttribute('layout');
    }
    set layout(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('layout', value);
    }

    get position() {
        return this.getAttribute('position');
    }
    set position(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('position', value);
    }

    get barIcon() {
        return this.getAttribute('baricon');
    }
    set barIcon(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('baricon', value);
    }

    get barTitle() {
        return this.getAttribute('bartitle');
    }
    set barTitle(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('bartitle', value);
    }

    get botIcon() {
        return this.getAttribute('boticon');
    }
    set botIcon(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('boticon', value);
    }

    get userIcon() {
        return this.getAttribute('usericon');
    }
    set userIcon(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('usericon', value);
    }

    get buttonIcon() {
        return this.getAttribute('buttonicon');
    }
    set buttonIcon(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('buttonicon', value);
    }

    get placeholder() {
        return this.getAttribute('placeholder');
    }
    set placeholder(value) {
        if (value == null) throw new Error('Unexpected value');
        this.setAttribute('placeholder', value);
    }

    // URL construction logic
    get url() {
        if (!this.widget) throw new Error('No widget specified');
        let url = /^(?:https?:\/\/|\/)/.test(this.widget)
            ? new URL(this.widget, window.location.toString())
            : new URL(
                  `http://localhost:3000/integrations/widget/${this.widget}/frame`
              );

        for (let [key, val] of Object.entries({
            cache: 'true',
            session: this.session,
            layout: this.layout,
            position: this.position,
            barIcon: this.barIcon,
            barTitle: this.barTitle,
            botIcon: this.botIcon,
            userIcon: this.userIcon,
            buttonIcon: this.buttonIcon,
            placeholder: this.placeholder,
            hideBar: this.hideBar ? 'true' : 'false',
            hideButton: this.hideButton ? 'true' : 'false',
            origin: window.location.origin,
        })) {
            if (val != null && val !== '') url.searchParams.append(key, val);
        }
        return url;
    }

    // Other utility methods (e.g., hide, show, sendMessage, etc.)
    hide() {
        this.style.visibility = 'hidden';
    }
    show() {
        this.style.visibility = 'visible';
    }
    restartConversation() {
        this.postMessage({ type: 'restartConversation', props: {} });
    }
    initiateMessage(data) {
        this.postMessage({ type: 'initiateMessage', props: data });
    }
    sendMessage(data) {
        this.postMessage({ type: 'sendMessage', props: data });
    }
    maximize() {
        this.postMessage({ type: 'setMaximize', props: { value: true } });
    }
    minimize() {
        this.postMessage({ type: 'setMaximize', props: { value: false } });
    }
    assignContact(contact) {
        this.contact = contact;
    }

    handleMessage(event) {
        if (event.source !== this.frame.contentWindow) return;

        switch (event.data.type) {
            case 'onReady':
                this.handleReady(event.data);
                break;
            case 'resize':
                this.handleResize(event.data);
                break;
            // ... other message handlers
        }
    }

    handleReady(data) {
        this.ready = true;
        this.dispatchEvent(new CustomEvent('ready', { detail: data }));
    }

    handleResize(data) {
        this.frame.width = data.props.width;
        this.frame.height = data.props.height;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            this.updateOpenState(newValue === 'true');
        }
        // ... handle other attribute changes
    }

    updateOpenState(isOpen) {
        this.frame.dataset.open = isOpen ? 'true' : 'false';
        this.postMessage({ type: 'setOpen', props: { value: isOpen } });
    }

    postMessage(message) {
        this.frame.contentWindow.postMessage(message, '*');
    }

    // Methods to control the widget
    rebuild() {
        console.info('Rebuilding');
        if (!this.widget) {
            console.info('Widget not set - skipping rebuild');
            return;
        }
        let url = this.url.toString();
        if (this.frame.src === url) {
            console.info('URL not changed - skipping rebuild');
            return;
        }
        this.frame.src = url;
    }

    // Lifecycle callbacks
    connectedCallback() {
        console.info('Connected');
        window.addEventListener('message', this.handleMessage.bind(this));
        // this.mediaQuery.addEventListener('change', this.handleMediaChange);
        this.rebuild();
        // this.triggerEvent('connect', {});
    }

    disconnectedCallback() {
        console.info('Disconnected');
        window.removeEventListener('message', this.handleMessage.bind(this));
        // this.mediaQuery.removeEventListener('change', this.handleMediaChange);
        // this.triggerEvent('disconnect', {});
    }

    // Constructor
    constructor() {
        super();
        this.setupProperties();
        this.initializeDOM();
    }

    setupProperties() {
        this.readyState = false;
        this.messagesSymbol = null;
        this.functionsSymbol = null;
        this.contactSymbol = null;
        this.metaSymbol = null;
        this.notificationsSymbol = new Map();
        // this.mediaQuery = window.matchMedia('screen and (max-width:640px)');
    }

    initializeDOM() {
        this.attachShadow({ mode: 'open' });
        // this.frame = document.createElement('iframe');
        // this.shadowRoot.appendChild(this.frame);
        this.createStyles();
        this.createFrame();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
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
        `;
        this.shadowRoot.appendChild(style);
    }

    createFrame() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';

        this.frame = document.createElement('iframe');
        this.frame.className = 'frame';
        this.frame.setAttribute('allow', 'clipboard-write');
        this.frame.setAttribute('title', 'ChatBot Widget');
        // this.frame.width = 400;
        // this.frame.height = 750;
        // this.frame.setAttribute(
        //     'src',
        //     'http://localhost:3000/integrations/widget/clzlfslj349xysfp8r17xewap/frame'
        // );

        wrapper.appendChild(this.frame);
        this.shadowRoot.appendChild(wrapper);
    }
}

// Register the custom element
customElements.define('chatbot-widget', ChatBotWidget);

// Initialize the widget
function initializeChatBotWidget() {
    const widgetElement = document.createElement('chatbot-widget');
    widgetElement.style.zIndex = 2147483647;
    widgetElement.style.position = 'fixed';
    widgetElement.style.bottom = 0;
    widgetElement.style.right = 0;
    widgetElement.setAttribute('widget', 'secret');
    widgetElement.setAttribute('position', 'bottom-left');
    // widgetElement.open = true;
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
