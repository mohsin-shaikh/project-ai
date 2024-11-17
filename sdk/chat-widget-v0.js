class ChatWidget extends HTMLElement {
  // Getter for readiness status
  get isReady() {
    return checkReadyState(this, readySymbol);
  }

  // Getter for readiness promise
  get readyPromise() {
    return new Promise((resolve) => {
      checkReadyState(this, readySymbol)
        ? resolve(true)
        : this.addEventListener('ready', () => resolve(true));
    });
  }

  // Getter and setter for messages
  get messages() {
    return checkReadyState(this, messagesSymbol)
      ? cloneData(checkReadyState(this, messagesSymbol))
      : this.isReady
      ? cloneData([])
      : null;
  }
  set messages(value) {
    if (!this.isReady) {
      logWarning('Widget is not ready. Messages will be set later.');
    }
    setData(this, messagesSymbol, value);
    handleMessagesChange.call(this);
  }

  // Getter and setter for functions
  get functions() {
    return checkReadyState(this, functionsSymbol)
      ? cloneData(
          Object.fromEntries(checkReadyState(this, functionsSymbol).entries())
        )
      : this.isReady
      ? cloneData({})
      : null;
  }
  set functions(value) {
    if (!this.isReady) {
      logWarning('Widget is not ready. Functions will be set later.');
    }
    setData(
      this,
      functionsSymbol,
      value ? new Map(Object.entries(value).filter(([, fn]) => !!fn)) : null
    );
    handleFunctionsChange.call(this);
  }

  // Getter and setter for contact
  get contact() {
    return checkReadyState(this, contactSymbol)
      ? cloneData(checkReadyState(this, contactSymbol))
      : null;
  }
  set contact(value) {
    if (!this.isReady) {
      logWarning('Widget is not ready. Contact will be set later.');
    }
    setData(this, contactSymbol, value);
    handleContactChange.call(this);
  }

  // Getter and setter for meta information
  get meta() {
    return checkReadyState(this, metaSymbol)
      ? cloneData(checkReadyState(this, metaSymbol))
      : this.isReady
      ? cloneData({})
      : null;
  }
  set meta(value) {
    if (!this.isReady) {
      logWarning('Widget is not ready. Meta will be set later.');
    }
    setData(this, metaSymbol, value);
    handleMetaChange.call(this);
  }

  // Getter and setter for notifications
  get notifications() {
    return cloneData(
      Object.fromEntries(checkReadyState(this, notificationsSymbol).entries())
    );
  }
  set notifications(value) {
    setData(
      this,
      notificationsSymbol,
      new Map(Object.entries(value || {}).filter(([, val]) => !!val))
    );
    handleNotificationsChange.call(this);
  }

  // Various attribute getters and setters
  // Boolean attributes
  get isOpen() {
    return this.getAttribute('open') === 'true';
  }
  set isOpen(value) {
    if (value == null) throw new Error('Unexpected value');
    this.setAttribute('open', value ? 'true' : 'false');
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
          `https://static.chatbotkit.com/integrations/widget/${this.widget}/frame`
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

  // Methods to control the widget
  rebuild() {
    logInfo('Rebuilding');
    if (!this.widget) {
      logInfo('Widget not set - skipping rebuild');
      return;
    }
    let url = this.url.toString();
    if (this.frame.src === url) {
      logInfo('URL not changed - skipping rebuild');
      return;
    }
    this.frame.src = url;
  }

  // Lifecycle callbacks
  connectedCallback() {
    logInfo('Connected');
    window.addEventListener('message', this.handleMessage);
    this.mediaQuery.addEventListener('change', this.handleMediaChange);
    this.rebuild();
    this.triggerEvent('connect', {});
  }

  disconnectedCallback() {
    logInfo('Disconnected');
    window.removeEventListener('message', this.handleMessage);
    this.mediaQuery.removeEventListener('change', this.handleMediaChange);
    this.triggerEvent('disconnect', {});
  }

  // Method to post a message to the iframe
  postMessage(message) {
    logInfo('Sending message', message);
    if (message.type.startsWith('get')) {
      let channel = new MessageChannel();
      let port1 = channel.port1;
      let port2 = channel.port2;
      return {
        await: () =>
          new Promise((resolve) => {
            port1.onmessage = (event) => resolve(event.data);
          }),
        close: () => {
          port1.close();
          port2.close();
        },
      };
    }
    this.frame.contentWindow.postMessage(message, '*');
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
    this.mediaQuery = window.matchMedia('screen and (max-width:640px)');
  }

  initializeDOM() {
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.frame = document.createElement('iframe');
    this.shadowRoot.appendChild(this.frame);
  }
}
