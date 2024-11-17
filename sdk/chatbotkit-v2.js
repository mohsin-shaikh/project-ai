!(function (t, e) {
    'object' == typeof module && 'object' == typeof module.exports
        ? e()
        : 'function' == typeof define && define.amd
        ? define([], e)
        : (t = 'undefined' != typeof globalThis ? globalThis : t || self) &&
          e();
})(this, function () {
    'use strict';
    function t(t, e) {
        if (e.has(t))
            throw TypeError(
                'Cannot initialize the same private elements twice on an object'
            );
    }
    function e(t, e, i) {
        if (!e.has(t))
            throw TypeError(
                'attempted to ' + i + ' private field on non-instance'
            );
        return e.get(t);
    }
    function i(t, i) {
        var s = e(t, i, 'get');
        return s.get ? s.get.call(t) : s.value;
    }
    function s(e, i, s) {
        t(e, i), i.set(e, s);
    }
    function a(t, i, s) {
        var a = e(t, i, 'set');
        return (
            !(function (t, e, i) {
                if (e.set) e.set.call(t, i);
                else {
                    if (!e.writable)
                        throw TypeError(
                            'attempted to set read only private field'
                        );
                    e.value = i;
                }
            })(t, a, s),
            s
        );
    }
    function o(t, e, i) {
        if (!e.has(t))
            throw TypeError('attempted to get private field on non-instance');
        return i;
    }
    function n(e, i) {
        t(e, i), i.add(e);
    }
    !(function () {
        let t, e, r;
        let l = (...t) => {
                (window.CHATBOTKIT_LOG_WARNING ||
                    window.CHATBOTKIT_WARNING_LOG) &&
                    console.warn('[ChatBotKit Widget]', ...t);
            },
            h = (...t) => {
                (window.CHATBOTKIT_LOG_DEBUG || window.CHATBOTKIT_DEBUG_LOG) &&
                    console.log('[ChatBotKit Widget]', ...t);
            },
            d = (...t) => {
                console.error('[ChatBotKit Widget]', ...t);
            },
            c = (t) => {
                let e = 0;
                if (0 === t.length) return e;
                for (var i = 0; i < t.length; i++)
                    (e = (e << 5) - e + t.charCodeAt(i)), (e &= e);
                return Math.abs(e);
            },
            u = (t) =>
                new Proxy(t, {
                    set(t, e, i, s) {
                        throw Error(
                            `Cannot modify property '${e}' of a frozen object.`
                        );
                    },
                    deleteProperty(t, e) {
                        throw Error(
                            `Cannot delete property '${e}' of a frozen object.`
                        );
                    },
                    defineProperty(t, e, i) {
                        throw Error(
                            `Cannot redefine property '${e}' of a frozen object.`
                        );
                    },
                    get(t, e, i) {
                        let s = Reflect.get(t, e, i);
                        return Array.isArray(t) &&
                            'function' == typeof s &&
                            [
                                'push',
                                'pop',
                                'shift',
                                'unshift',
                                'splice',
                                'sort',
                                'reverse',
                            ].includes(e)
                            ? () => {
                                  throw Error(
                                      `Cannot modify a frozen array using '${e}'.`
                                  );
                              }
                            : 'object' == typeof s && null !== s
                            ? u(s)
                            : s;
                    },
                }),
            p = (t) => JSON.parse(JSON.stringify(t));
        {
            let i = (t) => {
                    let e = t || Math.floor(2147483647 * Math.random());
                    return () =>
                        (e = (1103515245 * e + 12345) % 2147483648) /
                        2147483647;
                },
                s = (t, e) => {
                    let s = Math.floor(
                        i((e = 'number' == typeof e ? e : c(String(e))))() *
                            t.length
                    );
                    return t[s];
                },
                a = [
                    'AI Widget',
                    'Custom Chat GPT',
                    'Custom GPT API',
                    'AI Widget',
                    'AI Web Bot',
                    'Chatbot Widget',
                ];
            t = () => s(a.slice().sort(), window.location.pathname);
            let o = ['Train ChatGPT on your own data'];
            e = () => s(o.slice().sort(), window.location.pathname);
            let n = ['https://chatbotkit.com'];
            r = () => s(n.slice().sort(), window.location.pathname);
        }
        if (!window.customElements.get('chatbotkit-widget')) {
            let e = c(window.location.pathname),
                r = () => {
                    t: {
                        let t = `chatbotkit-mobile-style-${e}`;
                        if (document.getElementById(t)) break t;
                        let i = document.createElement('style');
                        i.setAttribute('id', t),
                            i.appendChild(
                                document.createTextNode(`
            .chatbotkit-mobile-documentElement-open-${e} {}

            .chatbotkit-mobile-body-open-${e} {
              position: fixed;
              width: 100%;
              height: 100%;
              overflow: auto;
            }

            .chatbotkit-mobile-body-open-${e} chatbotkit-widget[open="true"] {
              height: -webkit-fill-available;
              height: -moz-available;
            }
          `)
                            ),
                            document.body.appendChild(i);
                    }
                };
            'loading' !== document.readyState
                ? r()
                : document.addEventListener('DOMContentLoaded', () => {
                      r();
                  });
            let ta =
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                        navigator.userAgent
                    ) && navigator.maxTouchPoints > 1,
                to = /webkit/i.test(navigator.userAgent),
                tn = /firefox/i.test(navigator.userAgent);
            var b = new WeakMap(),
                m = new WeakMap(),
                w = new WeakMap(),
                g = new WeakMap(),
                f = new WeakMap(),
                v = new WeakMap(),
                y = new WeakMap(),
                k = new WeakSet(),
                A = new WeakSet(),
                M = new WeakSet(),
                E = new WeakSet(),
                C = new WeakSet(),
                W = new WeakSet(),
                x = new WeakSet(),
                S = new WeakSet(),
                I = new WeakSet(),
                T = new WeakSet(),
                O = new WeakSet(),
                $ = new WeakSet(),
                L = new WeakSet(),
                B = new WeakSet(),
                z = new WeakSet(),
                U = new WeakSet(),
                j = new WeakMap(),
                P = new WeakMap(),
                N = new WeakMap(),
                G = new WeakMap(),
                R = new WeakMap(),
                _ = new WeakMap(),
                K = new WeakMap(),
                J = new WeakMap(),
                D = new WeakMap();
            class tr extends HTMLElement {
                get ready() {
                    return i(this, b);
                }
                get readyPromise() {
                    return new Promise((t) => {
                        i(this, b)
                            ? t(!0)
                            : this.addEventListener('ready', () => {
                                  t(!0);
                              });
                    });
                }
                get messages() {
                    return i(this, m)
                        ? u(i(this, m))
                        : this.ready
                        ? u([])
                        : null;
                }
                set messages(t) {
                    this.ready ||
                        l(
                            'The widget is not ready yet but we will attempt to set the messages later.'
                        ),
                        a(this, m, t),
                        o(this, M, q).call(this);
                }
                get functions() {
                    return i(this, w)
                        ? u(Object.fromEntries(i(this, w).entries()))
                        : this.ready
                        ? u({})
                        : null;
                }
                set functions(t) {
                    this.ready ||
                        l(
                            'The widget is not ready yet but we will attempt to set the functions later.'
                        ),
                        a(
                            this,
                            w,
                            t
                                ? new Map(
                                      Object.entries(t).filter(([, t]) => !!t)
                                  )
                                : null
                        ),
                        o(this, C, Q).call(this);
                }
                get contact() {
                    return i(this, v) ? u(i(this, v)) : null;
                }
                set contact(t) {
                    this.ready ||
                        l(
                            'The widget is not ready yet but we will attempt to set the meta later.'
                        ),
                        a(this, v, t),
                        o(this, x, V).call(this);
                }
                get meta() {
                    return i(this, g)
                        ? u(i(this, g))
                        : this.ready
                        ? u({})
                        : null;
                }
                set meta(t) {
                    this.ready ||
                        l(
                            'The widget is not ready yet but we will attempt to set the meta later.'
                        ),
                        a(this, g, t),
                        o(this, I, X).call(this);
                }
                get notifications() {
                    return u(Object.fromEntries(i(this, f).entries()));
                }
                set notifications(t) {
                    a(
                        this,
                        f,
                        new Map(Object.entries(t || {}).filter(([, t]) => !!t))
                    ),
                        o(this, O, Y).call(this);
                }
                get open() {
                    return 'true' === this.getAttribute('open');
                }
                set open(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute(
                        'open',
                        { true: !0, false: !1 }[t.toString() || 'false'] ||
                            'false'
                    );
                }
                get session() {
                    return this.getAttribute('session');
                }
                set session(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('session', t);
                }
                get widget() {
                    return this.getAttribute('widget');
                }
                set widget(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('widget', t);
                }
                get layout() {
                    return this.getAttribute('layout');
                }
                set layout(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('layout', t);
                }
                get position() {
                    return this.getAttribute('position');
                }
                set position(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('position', t);
                }
                get barIcon() {
                    return this.getAttribute('baricon');
                }
                set barIcon(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('baricon', t);
                }
                get barTitle() {
                    return this.getAttribute('bartitle');
                }
                set barTitle(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('bartitle', t);
                }
                get botIcon() {
                    return this.getAttribute('boticon');
                }
                set botIcon(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('boticon', t);
                }
                get userIcon() {
                    return this.getAttribute('usericon');
                }
                set userIcon(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('usericon', t);
                }
                get buttonIcon() {
                    return this.getAttribute('buttonicon');
                }
                set buttonIcon(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('buttonicon', t);
                }
                get placeholder() {
                    return this.getAttribute('placeholder');
                }
                set placeholder(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('placeholder', t);
                }
                get hideBar() {
                    return (
                        this.hasAttribute('hidebar') ||
                        ['true', 'on'].includes(
                            this.getAttribute('hidebar') || ''
                        )
                    );
                }
                set hideBar(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute(
                        'hidebar',
                        { true: !0, false: !1, on: !0, off: !1 }[
                            t.toString() || 'false'
                        ] || 'false'
                    );
                }
                get hideButton() {
                    return (
                        this.hasAttribute('hidebutton') ||
                        ['true', 'on'].includes(
                            this.getAttribute('hidebutton') || ''
                        )
                    );
                }
                set hideButton(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute(
                        'hidebutton',
                        { true: !0, false: !1, on: !0, off: !1 }[
                            t.toString() || 'false'
                        ] || 'false'
                    );
                }
                get host() {
                    return this.getAttribute('host');
                }
                set host(t) {
                    if (null == t) throw Error('Unexpected value');
                    this.setAttribute('host', t);
                }
                get url() {
                    if (!this.widget) throw Error('No widget specified');
                    let t = /^(?:https?:\/\/|\/)/.test(this.widget)
                        ? new URL(this.widget, window.location.toString())
                        : new URL(
                              `https://static.chatbotkit.com/integrations/widget/${this.widget}/frame`
                          );
                    for (let [e, i] of (this.host && (t.host = this.host),
                    Object.entries({
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
                    })))
                        null != i && '' !== i && t.searchParams.append(e, i);
                    return t;
                }
                rebuild() {
                    if ((h('rebuilding'), !this.widget)) {
                        h('widget not set - skipping rebuild');
                        return;
                    }
                    let t = this.url.toString();
                    if (this.frame.src === t) {
                        h('url not changed - skipping rebuild');
                        return;
                    }
                    this.frame.src = t;
                }
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
                attributeChangedCallback(t, e, s) {
                    if ('open' === t) {
                        this.postMessage({
                            type: 'media',
                            props: {
                                media: i(this, y).media,
                                matches: i(this, y).matches,
                            },
                        });
                        let t = 'true' === s;
                        this.postMessage({
                            type: 'setOpen',
                            props: { value: t },
                        }),
                            (this.frame.dataset.open = t ? 'true' : 'false');
                    } else this.rebuild();
                }
                connectedCallback() {
                    h('connected'),
                        window.addEventListener('message', i(this, J)),
                        i(this, y).addEventListener('change', i(this, D)),
                        this.rebuild(),
                        o(this, U, ts).call(this, 'connect', {});
                }
                disconnectedCallback() {
                    h('disconnected'),
                        window.removeEventListener('message', i(this, J)),
                        i(this, y).removeEventListener('change', i(this, D)),
                        o(this, U, ts).call(this, 'disconnect', {});
                }
                postMessage(t) {
                    var e;
                    let i, s;
                    if ((h('sending message', t), t.type.startsWith('get'))) {
                        let t = new MessageChannel(),
                            e = t.port1,
                            a = t.port2;
                        (i = [a]),
                            (s = {
                                await: async () =>
                                    new Promise((t) => {
                                        e.onmessage = (e) => {
                                            t(e.data);
                                        };
                                    }),
                                close: () => {
                                    e.close(), a.close();
                                },
                            });
                    }
                    return (
                        null === (e = this.frame.contentWindow) ||
                            void 0 === e ||
                            e.postMessage(t, '*', i),
                        s
                    );
                }
                hide() {
                    this.style.visibility = 'hidden';
                }
                show() {
                    this.style.visibility = 'visible';
                }
                restartConversation() {
                    this.postMessage({
                        type: 'restartConversation',
                        props: {},
                    });
                }
                initiateMessage(t) {
                    this.postMessage({ type: 'initiateMessage', props: t });
                }
                sendMessage(t) {
                    this.postMessage({ type: 'sendMessage', props: t });
                }
                maximize() {
                    this.postMessage({
                        type: 'setMaximize',
                        props: { value: !0 },
                    });
                }
                minimize() {
                    this.postMessage({
                        type: 'setMaximize',
                        props: { value: !1 },
                    });
                }
                assignContact(t) {
                    this.contact = t;
                }
                constructor() {
                    super(),
                        n(this, k),
                        n(this, A),
                        n(this, M),
                        n(this, E),
                        n(this, C),
                        n(this, W),
                        n(this, x),
                        n(this, S),
                        n(this, I),
                        n(this, T),
                        n(this, O),
                        n(this, $),
                        n(this, L),
                        n(this, B),
                        n(this, z),
                        n(this, U),
                        s(this, b, { writable: !0, value: void 0 }),
                        s(this, m, { writable: !0, value: void 0 }),
                        s(this, w, { writable: !0, value: void 0 }),
                        s(this, g, { writable: !0, value: void 0 }),
                        s(this, f, { writable: !0, value: void 0 }),
                        s(this, v, { writable: !0, value: void 0 }),
                        s(this, y, { writable: !0, value: void 0 }),
                        s(this, j, {
                            writable: !0,
                            value: (t) => {
                                var e, s, n;
                                a(this, b, !0),
                                    this.postMessage({
                                        type: 'media',
                                        props: {
                                            media: i(this, y).media,
                                            matches: i(this, y).matches,
                                        },
                                    }),
                                    (null === (e = i(this, m)) || void 0 === e
                                        ? void 0
                                        : e.length) && o(this, M, q).call(this),
                                    (null === (s = i(this, w)) || void 0 === s
                                        ? void 0
                                        : s.size) && o(this, C, Q).call(this),
                                    i(this, v) && o(this, x, V).call(this),
                                    i(this, g) && o(this, I, X).call(this),
                                    (null === (n = i(this, f)) || void 0 === n
                                        ? void 0
                                        : n.size) && o(this, O, Y).call(this);
                                {
                                    let t = this.open;
                                    this.postMessage({
                                        type: 'setOpen',
                                        props: { value: t },
                                    }),
                                        (this.frame.dataset.open = t
                                            ? 'true'
                                            : 'false');
                                }
                                o(this, U, ts).call(
                                    this,
                                    'ready',
                                    t.data.props
                                );
                            },
                        }),
                        s(this, P, {
                            writable: !0,
                            value: (t) => {
                                (this.open = t.data.props.open),
                                    i(this, y).matches && t.data.props.open
                                        ? o(this, L, tt).call(this)
                                        : o(this, B, te).call(this);
                            },
                        }),
                        s(this, N, {
                            writable: !0,
                            value: (t) => {
                                let e = t.data.props.width.toString(),
                                    i = t.data.props.height.toString();
                                (this.frame.style.width = e.replace(
                                    /!(?:important)?/,
                                    ''
                                )),
                                    (this.frame.style.height = i.replace(
                                        /!(?:important)?/,
                                        ''
                                    )),
                                    !0 == ('100vh' === i) &&
                                        (to &&
                                            (this.frame.style.height =
                                                '-webkit-fill-available'),
                                        tn &&
                                            (this.frame.style.height =
                                                '-moz-available'));
                            },
                        }),
                        s(this, G, {
                            writable: !0,
                            value: async (t) => {
                                if (
                                    'waitForChannelMessageBegin' ===
                                    t.data.props.item.type
                                ) {
                                    let { channel: e, function: s } =
                                        t.data.props.item.data;
                                    if (s) {
                                        let t, a;
                                        let { name: o, args: n } = s,
                                            { handler: r } =
                                                i(this, w).get(o) || {};
                                        r ||
                                            (r = () => {
                                                throw Error(
                                                    `No handler found for function ${o}`
                                                );
                                            });
                                        try {
                                            t = await r(n);
                                        } catch (e) {
                                            d('function error', e),
                                                (t = e.message || e.toString());
                                        }
                                        try {
                                            a = JSON.stringify(t);
                                        } catch (t) {
                                            d('function message error', t),
                                                (a = t.message || t.toString());
                                        }
                                        this.postMessage({
                                            type: 'publishChannelMessage',
                                            props: { channel: e, message: a },
                                        });
                                    }
                                }
                                o(this, U, ts).call(this, 'item', t.data.props);
                            },
                        }),
                        s(this, R, {
                            writable: !0,
                            value: (t) => {
                                o(this, U, ts).call(this, 'send', t.data.props);
                            },
                        }),
                        s(this, _, {
                            writable: !0,
                            value: (t) => {
                                o(this, U, ts).call(
                                    this,
                                    'receive',
                                    t.data.props
                                );
                            },
                        }),
                        s(this, K, {
                            writable: !0,
                            value: (t) => {
                                var e;
                                (null === (e = i(this, w)) || void 0 === e
                                    ? void 0
                                    : e.size) && o(this, C, Q).call(this),
                                    i(this, v) && o(this, x, V).call(this),
                                    i(this, g) && o(this, I, X).call(this),
                                    o(this, U, ts).call(
                                        this,
                                        'onRestartConversation',
                                        t.data.props
                                    );
                            },
                        }),
                        s(this, J, {
                            writable: !0,
                            value: (t) => {
                                if (
                                    (h('received message', t.data),
                                    t.source === this.frame.contentWindow)
                                )
                                    switch (t.data.type) {
                                        case 'onReady':
                                            i(this, j).call(this, t);
                                            break;
                                        case 'reset':
                                            i(this, P).call(this, t);
                                            break;
                                        case 'resize':
                                            i(this, N).call(this, t);
                                            break;
                                        case 'onItem':
                                            i(this, G).call(this, t);
                                            break;
                                        case 'onSend':
                                            i(this, R).call(this, t);
                                            break;
                                        case 'onReceive':
                                            i(this, _).call(this, t);
                                            break;
                                        case 'onMessagesChange':
                                            o(this, E, Z).call(this, t);
                                            break;
                                        case 'onFunctionsChange':
                                        case 'onContactChange':
                                        case 'onMetaChange':
                                            break;
                                        case 'onRestartConversation':
                                            i(this, K).call(this, t);
                                    }
                            },
                        }),
                        s(this, D, {
                            writable: !0,
                            value: (t) => {
                                this.postMessage({
                                    type: 'media',
                                    props: {
                                        media: t.media,
                                        matches: t.matches,
                                    },
                                }),
                                    t.matches && this.open
                                        ? o(this, L, tt).call(this)
                                        : o(this, B, te).call(this);
                            },
                        }),
                        a(this, b, !1),
                        a(this, m, null),
                        a(this, w, null),
                        a(this, v, null),
                        a(this, g, null),
                        a(this, f, new Map()),
                        a(
                            this,
                            y,
                            window.matchMedia('screen and (max-width:640px)')
                        );
                    let e = document.createElement('style');
                    e.appendChild(
                        document.createTextNode(`
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
                ${ta && to ? 'max-height: -webkit-fill-available;' : ''}
                ${ta && tn ? 'max-height: -moz-available;' : ''}

                border: 0px;
                margin: 0px;
                padding: 0px;

                transform: translate3d(0,0,0);

                background: transparent;

                color-scheme: normal;

                /*
                outline: 2px solid red;
                background: yellow;
                */
              }

              @media only screen and (max-width:640px) {
                .frame[data-open="true"] {
                  width: 100vw ! important;
                  height: 100vh ! important;
                  ${
                      ta && to
                          ? 'height: -webkit-fill-available ! important;'
                          : ''
                  }
                  ${ta && tn ? 'height: -moz-available ! important;' : ''}
                }
              }
            `)
                    );
                    let r = document.createElement('iframe');
                    r.setAttribute('class', 'frame'),
                        r.setAttribute('allow', 'clipboard-write'),
                        r.setAttribute('title', t());
                    let l = document.createElement('div');
                    l.setAttribute('class', 'wrapper'), l.appendChild(r);
                    let c = this.attachShadow({ mode: 'closed' });
                    c.appendChild(e), c.appendChild(l), (this.frame = r);
                }
            }
            function H() {
                try {
                    return crypto.randomUUID();
                } catch (t) {
                    return [, , , , ,]
                        .fill(null)
                        .map(() => Math.random().toString(36).slice(2))
                        .join('-');
                }
            }
            function F(t) {
                return `${o(this, k, H).call(this)}-${t}`;
            }
            function q() {
                this.postMessage({
                    type: 'setMessages',
                    props: { value: p(i(this, m) || []) },
                });
            }
            function Z(t) {
                a(this, m, t.data.props.value);
            }
            function Q() {
                this.postMessage({
                    type: 'setFunctions',
                    props: {
                        value: i(this, w)
                            ? p(
                                  Array.from(
                                      i(this, w)
                                          .entries()
                                          .map(
                                              ([
                                                  t,
                                                  {
                                                      description: e,
                                                      parameters: i,
                                                      result: s,
                                                      handler: a,
                                                  },
                                              ]) => (
                                                  a &&
                                                      (s = {
                                                          channel: o(
                                                              this,
                                                              A,
                                                              F
                                                          ).call(
                                                              this,
                                                              `${t}-function-result`
                                                          ),
                                                      }),
                                                  {
                                                      name: t,
                                                      description: e,
                                                      parameters: i,
                                                      result: s,
                                                  }
                                              )
                                          )
                                  )
                              )
                            : null,
                    },
                });
            }
            function V() {
                this.postMessage({
                    type: 'setContact',
                    props: { value: p(i(this, v) || null) },
                });
            }
            function X() {
                this.postMessage({
                    type: 'setMeta',
                    props: { value: p(i(this, g) || null) },
                });
            }
            function Y() {
                if (!this.ready) return;
                let t = this.messages || [],
                    e = new Set(t.map(({ id: t }) => t)),
                    s = Array.from(i(this, f).entries()).map(
                        ([t, { text: e }]) => ({
                            id: `notification-${t}`,
                            type: 'input',
                            text: e,
                        })
                    ),
                    a = new Set(s.map(({ id: t }) => t));
                this.messages = [
                    ...t.filter(
                        ({ id: t }) =>
                            !t.startsWith('notification-') || a.has(t)
                    ),
                    ...s.filter(({ id: t }) => !e.has(t)),
                ];
            }
            function tt() {
                document.documentElement.classList.add(
                    `chatbotkit-mobile-documentElement-open-${e}`
                ),
                    document.body.classList.add(
                        `chatbotkit-mobile-body-open-${e}`
                    );
                let t = document.querySelector('meta[name="viewport"]');
                t ||
                    ((t = document.createElement('meta')).setAttribute(
                        'name',
                        'viewport'
                    ),
                    (t.dataset.chatbotkitSavedContent = ''),
                    document.head.appendChild(t)),
                    (t.dataset.chatbotkitSavedContent =
                        t.getAttribute('content')),
                    t.setAttribute(
                        'content',
                        'width=device-width, initial-scale=1, maximum-scale=1'
                    );
            }
            function te() {
                var t;
                document.documentElement.classList.remove(
                    `chatbotkit-mobile-documentElement-open-${e}`
                ),
                    document.body.classList.remove(
                        `chatbotkit-mobile-body-open-${e}`
                    );
                let i = document.querySelector('meta[name="viewport"]');
                (null == i
                    ? void 0
                    : null === (t = i.dataset) || void 0 === t
                    ? void 0
                    : t.chatbotkitSavedContent) &&
                    i.setAttribute('content', i.dataset.chatbotkitSavedContent);
            }
            function ti(t, e) {
                let i = new Event(t);
                return (i.data = e), i;
            }
            function ts(t, e) {
                let i = o(this, z, ti).call(this, t, e);
                this.dispatchEvent(i);
            }
            window.customElements.define('chatbotkit-widget', tr);
        }
        e: {
            let o = document.currentScript;
            if (!o) break e;
            var ta = new WeakMap(),
                to = new WeakMap(),
                tn = new WeakMap();
            class n {
                get instance() {
                    return i(this, ta);
                }
                get instancePromise() {
                    return i(this, to);
                }
                constructor(t, e) {
                    s(this, ta, { writable: !0, value: void 0 }),
                        s(this, to, { writable: !0, value: void 0 }),
                        s(this, tn, { writable: !0, value: void 0 }),
                        t
                            ? (a(this, ta, i(t, ta)),
                              a(this, to, i(t, to)),
                              a(this, tn, i(t, tn)))
                            : (a(this, ta, null),
                              a(
                                  this,
                                  to,
                                  new Promise((t) => {
                                      a(this, tn, t);
                                  })
                              )),
                        e && (a(this, ta, e), i(this, tn).call(this, e));
                }
            }
            window.chatbotkitWidget = new n();
            let l = (t, e) => Object.prototype.hasOwnProperty.call(t, e),
                h = (t, ...e) => {
                    if (!e.length) return t;
                    let i = e.shift();
                    if (null === i || 'object' != typeof i) return t;
                    for (let e in i)
                        i.hasOwnProperty(e) &&
                            ('object' == typeof t[e] && 'object' == typeof i[e]
                                ? h(t[e], i[e])
                                : (t[e] = i[e]));
                    return h(t, ...e);
                },
                d = (t, e = '') => {
                    let i = [];
                    return (
                        Object.entries(t).forEach(([t, e]) => {
                            t.startsWith(':') ||
                                i.push(
                                    `${t.replace(
                                        /([A-Z])/g,
                                        (t) => `-${t.toLowerCase()}`
                                    )}: ${e};`
                                );
                        }),
                        i.join(e)
                    );
                },
                u = () => {
                    let i = h(
                        {
                            params: {
                                layout: 'default',
                                position: 'bottom-right',
                                ...Object.fromEntries(
                                    new URLSearchParams(
                                        (null == o
                                            ? void 0
                                            : o.src.replace(
                                                  /^.*?(\?|#|$)/,
                                                  ''
                                              )) || ''
                                    )
                                ),
                                ...Object.assign(
                                    {},
                                    (null == o ? void 0 : o.dataset) || {}
                                ),
                            },
                            style: { widget: {} },
                        },
                        window.chatbotkitWidgetConfiguration
                    );
                    if (!i.params.widget) return;
                    let s =
                            (i = h(i, {
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
                                        }[i.params.position],
                                    },
                                },
                            })).params.widget
                                .replace(/\W+/g, '-')
                                .replace(/-+/g, '-')
                                .toLowerCase()
                                .trim() || c(window.location.pathname),
                        a = `chatbotkit-widget-${s}`;
                    if (document.getElementById(a)) return;
                    let u = document.createElement('style');
                    u.setAttribute('id', `chatbotkit-widget-style-${s}`),
                        u.appendChild(
                            document.createTextNode(`
            #${a} {
              ${d(i.style.widget, '\n')}
            }
          `)
                        ),
                        document.body.appendChild(u);
                    let p = document.createElement('a');
                    p.setAttribute('href', r()),
                        p.setAttribute('title', e()),
                        (p.textContent = t());
                    let b = document.createElement('chatbotkit-widget');
                    {
                        let t;
                        b.setAttribute('id', a),
                            l(i.params, 'host')
                                ? (t = i.params.host)
                                : /^(https?:)?\/\/.+/i.test(o.src) &&
                                  (t = new URL(
                                      o.src.replace(/^\/\//, 'https://')
                                  ).host),
                            b.setAttribute('host', t),
                            l(i.params, 'open') &&
                                b.setAttribute('open', i.params.open),
                            l(i.params, 'session') &&
                                b.setAttribute('session', i.params.session),
                            l(i.params, 'widget') &&
                                b.setAttribute('widget', i.params.widget),
                            l(i.params, 'layout') &&
                                b.setAttribute('layout', i.params.layout),
                            l(i.params, 'position') &&
                                b.setAttribute('position', i.params.position),
                            l(i.params, 'baricon') &&
                                b.setAttribute('barIcon', i.params.baricon),
                            l(i.params, 'bartitle') &&
                                b.setAttribute('barTitle', i.params.bartitle),
                            l(i.params, 'boticon') &&
                                b.setAttribute('botIcon', i.params.boticon),
                            l(i.params, 'usericon') &&
                                b.setAttribute('userIcon', i.params.usericon),
                            l(i.params, 'buttonicon') &&
                                b.setAttribute(
                                    'buttonIcon',
                                    i.params.buttonicon
                                ),
                            l(i.params, 'hidebar') &&
                                b.setAttribute('hideBar', i.params.hidebar),
                            l(i.params, 'hidebutton') &&
                                b.setAttribute(
                                    'hideButton',
                                    i.params.hidebutton
                                ),
                            l(i.params, 'messages') &&
                                (b.messages = JSON.parse(i.params.messages)),
                            l(i.params, 'notifications') &&
                                (b.notifications = JSON.parse(
                                    i.params.notifications
                                )),
                            l(i.params, 'meta') &&
                                (b.meta = JSON.parse(i.params.meta)),
                            b.appendChild(p),
                            document.body.appendChild(b);
                    }
                    window.chatbotkitWidget = new n(window.chatbotkitWidget, b);
                    let m = !1;
                    window.chatbotkitWidget.instance.addEventListener(
                        'ready',
                        (t) => {
                            if (!m) {
                                if (
                                    ((m = !0),
                                    window.dispatchEvent(
                                        new CustomEvent(
                                            'chatbotkitWidgetInit',
                                            t
                                        )
                                    ),
                                    window.chatbotkitWidgetInit)
                                )
                                    try {
                                        window.chatbotkitWidgetInit(t.data);
                                    } catch (t) {
                                        console.error(t);
                                    }
                                b.open ||
                                    setTimeout(() => {
                                        try {
                                            b.open =
                                                'true' ===
                                                window.sessionStorage[
                                                    'chatbotkit-widget-open'
                                                ];
                                        } catch (t) {}
                                    }, 1e3),
                                    window.addEventListener(
                                        'beforeunload',
                                        () => {
                                            try {
                                                window.sessionStorage[
                                                    'chatbotkit-widget-open'
                                                ] = b.open ? 'true' : 'false';
                                            } catch (t) {}
                                        }
                                    );
                            }
                        }
                    );
                };
            'loading' !== document.readyState
                ? u()
                : document.addEventListener('DOMContentLoaded', () => {
                      u();
                  });
        }
    })();
});
