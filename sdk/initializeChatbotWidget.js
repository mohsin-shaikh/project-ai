const initializeChatbotWidget = () => {
    // Build widget configuration by merging default and custom parameters
    let widgetConfig = mergeConfigurations(
        {
            params: {
                layout: 'default',
                position: 'bottom-right',
                ...Object.fromEntries(
                    new URLSearchParams(
                        widgetScriptElement?.src.replace(/^.*?(\?|#|$)/, '') ||
                            ''
                    )
                ),
                ...Object.assign({}, widgetScriptElement?.dataset || {}),
            },
            style: { widget: {} },
        },
        window.chatbotkitWidgetConfiguration
    );

    // Check if widget parameter is available, if not, exit
    if (!widgetConfig.params.widget) return;

    // Generate a unique widget ID based on configuration or fallback to the current pathname
    let widgetId =
        (widgetConfig = mergeConfigurations(widgetConfig, {
            style: {
                widget: {
                    ...{
                        'bottom-right': {
                            zIndex: 2147483647,
                            position: 'fixed',
                            bottom: '0',
                            right: '0',
                        },
                        'bottom-left': {
                            zIndex: 2147483647,
                            position: 'fixed',
                            bottom: '0',
                            left: '0',
                        },
                        'top-right': {
                            zIndex: 2147483647,
                            position: 'fixed',
                            top: '0',
                            right: '0',
                        },
                        'top-left': {
                            zIndex: 2147483647,
                            position: 'fixed',
                            top: '0',
                            left: '0',
                        },
                        fullscreen: {
                            zIndex: 2147483647,
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100vw',
                            height: '100vh',
                        },
                    }[widgetConfig.params.position],
                },
            },
        })).params.widget
            .replace(/\W+/g, '-')
            .replace(/-+/g, '-')
            .toLowerCase()
            .trim() || sanitize(window.location.pathname);

    let elementId = `chatbotkit-widget-${widgetId}`;
    if (document.getElementById(elementId)) return; // Exit if widget is already present

    // Create and append style element for the widget
    let styleElement = document.createElement('style');
    styleElement.setAttribute('id', `chatbotkit-widget-style-${widgetId}`);
    styleElement.appendChild(
        document.createTextNode(`
            #${elementId} {
              ${generateStyleString(widgetConfig.style.widget, '\n')}
            }
        `)
    );
    document.body.appendChild(styleElement);

    // Create the anchor element for the widget
    let anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', getWidgetUrl());
    anchorElement.setAttribute('title', getWidgetTitle());
    anchorElement.textContent = getWidgetText();

    // Create the main widget element
    let widgetElement = document.createElement('chatbotkit-widget');
    {
        let host;
        widgetElement.setAttribute('id', elementId);

        // Set the host attribute if specified
        if (hasParameter(widgetConfig.params, 'host')) {
            host = widgetConfig.params.host;
        } else if (/^(https?:)?\/\/.+/i.test(widgetScriptElement.src)) {
            host = new URL(widgetScriptElement.src.replace(/^\/\//, 'https://'))
                .host;
        }
        widgetElement.setAttribute('host', host);

        // Set other widget attributes based on configuration
        setAttributeIfExists(widgetElement, 'open', widgetConfig.params.open);
        setAttributeIfExists(
            widgetElement,
            'session',
            widgetConfig.params.session
        );
        setAttributeIfExists(
            widgetElement,
            'widget',
            widgetConfig.params.widget
        );
        setAttributeIfExists(
            widgetElement,
            'layout',
            widgetConfig.params.layout
        );
        setAttributeIfExists(
            widgetElement,
            'position',
            widgetConfig.params.position
        );
        setAttributeIfExists(
            widgetElement,
            'barIcon',
            widgetConfig.params.baricon
        );
        setAttributeIfExists(
            widgetElement,
            'barTitle',
            widgetConfig.params.bartitle
        );
        setAttributeIfExists(
            widgetElement,
            'botIcon',
            widgetConfig.params.boticon
        );
        setAttributeIfExists(
            widgetElement,
            'userIcon',
            widgetConfig.params.usericon
        );
        setAttributeIfExists(
            widgetElement,
            'buttonIcon',
            widgetConfig.params.buttonicon
        );
        setAttributeIfExists(
            widgetElement,
            'hideBar',
            widgetConfig.params.hidebar
        );
        setAttributeIfExists(
            widgetElement,
            'hideButton',
            widgetConfig.params.hidebutton
        );

        if (hasParameter(widgetConfig.params, 'messages')) {
            widgetElement.messages = JSON.parse(widgetConfig.params.messages);
        }
        if (hasParameter(widgetConfig.params, 'notifications')) {
            widgetElement.notifications = JSON.parse(
                widgetConfig.params.notifications
            );
        }
        if (hasParameter(widgetConfig.params, 'meta')) {
            widgetElement.meta = JSON.parse(widgetConfig.params.meta);
        }

        widgetElement.appendChild(anchorElement);
        document.body.appendChild(widgetElement);
    }

    // Initialize the chatbot widget
    window.chatbotkitWidget = new ChatbotKitWidget(
        window.chatbotkitWidget,
        widgetElement
    );

    let initialized = false;
    window.chatbotkitWidget.instance.addEventListener('ready', (event) => {
        if (!initialized) {
            initialized = true;
            window.dispatchEvent(
                new CustomEvent('chatbotkitWidgetInit', event)
            );

            // Call the custom initialization function if it exists
            if (window.chatbotkitWidgetInit) {
                try {
                    window.chatbotkitWidgetInit(event.data);
                } catch (error) {
                    console.error(error);
                }
            }

            // Open the widget if it was open in the last session
            if (!widgetElement.open) {
                setTimeout(() => {
                    try {
                        widgetElement.open =
                            'true' ===
                            window.sessionStorage['chatbotkit-widget-open'];
                    } catch (error) {}
                }, 1000);

                // Save the open state in session storage before the page unloads
                window.addEventListener('beforeunload', () => {
                    try {
                        window.sessionStorage['chatbotkit-widget-open'] =
                            widgetElement.open ? 'true' : 'false';
                    } catch (error) {}
                });
            }
        }
    });
};

// Utility functions for setting attributes and checking parameters
function setAttributeIfExists(element, attributeName, value) {
    if (value) {
        element.setAttribute(attributeName, value);
    }
}

function hasParameter(params, key) {
    return Object.prototype.hasOwnProperty.call(params, key);
}

function mergeConfigurations(baseConfig, additionalConfig) {
    return { ...baseConfig, ...additionalConfig };
}

function sanitize(path) {
    return path.replace(/\W+/g, '-').replace(/-+/g, '-').toLowerCase().trim();
}

function generateStyleString(styles, separator) {
    return Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join(separator);
}
