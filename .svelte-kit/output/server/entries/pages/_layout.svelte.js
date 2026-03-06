import "clsx";
import { l as lifecycle_function_unavailable, d as derived, g as getAllContexts, p as props_id, a as attributes, b as bind_props, s as spread_props, r as run, c as attr, e as escape_html, f as attr_class, h as clsx, i as ensure_array_like, j as element } from "../../chunks/index.js";
import { r as resolve, a as asset } from "../../chunks/server2.js";
import { B as Button, b as buttonVariants } from "../../chunks/button.js";
import { c as cn } from "../../chunks/utils2.js";
import { i as isWritableSymbol, B as BoxSymbol, b as boxFrom, a as boxWith, c as boxFlatten, t as toReadonlyBox, d as isBox, e as isWritableBox, f as createSubscriber, g as defaultWindow, w as watch, C as Context, h as getDocument, j as createBitsAttrs, k as executeCallbacks, D as DOMContext, s as simpleBox, l as composeHandlers, m as contains, S as SvelteMap, n as attachRef, o as cssToStyleObj, p as styleToString, q as getWindow, r as mergeProps, u as boolToStrTrueOrUndef, v as createId, x as getDataOpenClosed, y as boolToStr, z as boolToEmptyStrOrUndef } from "../../chunks/create-id.js";
import { t } from "../../chunks/i18n.svelte.js";
import { L as Logo } from "../../chunks/logo.js";
import { o as on } from "../../chunks/root.js";
import { tv } from "tailwind-variants";
import { tabbable, focusable, isFocusable, isTabbable } from "tabbable";
import { computePosition, offset, shift, limitShift, flip, size, arrow, hide } from "@floating-ui/dom";
function mount() {
  lifecycle_function_unavailable("mount");
}
function unmount() {
  lifecycle_function_unavailable("unmount");
}
async function tick() {
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function isFunction(value) {
  return typeof value === "function";
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    const gotten = getter();
    if (gotten === void 0) return defaultValue;
    return gotten;
  }
  if (value === void 0) return defaultValue;
  return value;
}
function useDebounce(callback, wait) {
  let context = null;
  const wait$ = derived(() => extract(wait, 250));
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve2;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve2 = res;
        reject = rej;
      });
      context = { timeout: null, runner: null, promise, resolve: resolve2, reject };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, wait$());
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve2) => setTimeout(resolve2, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve2) => setTimeout(resolve2, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
function get$1(value) {
  if (isFunction(value)) {
    return value();
  }
  return value;
}
class ElementSize {
  // no need to use `$state` here since we are using createSubscriber
  #size = { width: 0, height: 0 };
  #observed = false;
  #options;
  #node;
  #window;
  // we use a derived here to extract the width so that if the width doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #width = derived(() => {
    this.#subscribe()?.();
    return this.getSize().width;
  });
  // we use a derived here to extract the height so that if the height doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #height = derived(() => {
    this.#subscribe()?.();
    return this.getSize().height;
  });
  // we need to use a derived here because the class will be created before the node is bound to the ref
  #subscribe = derived(() => {
    const node$ = get$1(this.#node);
    if (!node$) return;
    return createSubscriber();
  });
  constructor(node, options = { box: "border-box" }) {
    this.#window = options.window ?? defaultWindow;
    this.#options = options;
    this.#node = node;
    this.#size = { width: 0, height: 0 };
  }
  calculateSize() {
    const element2 = get$1(this.#node);
    if (!element2 || !this.#window) {
      return;
    }
    const offsetWidth = element2.offsetWidth;
    const offsetHeight = element2.offsetHeight;
    if (this.#options.box === "border-box") {
      return { width: offsetWidth, height: offsetHeight };
    }
    const style = this.#window.getComputedStyle(element2);
    const paddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const paddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const borderWidth = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const contentWidth = offsetWidth - paddingWidth - borderWidth;
    const contentHeight = offsetHeight - paddingHeight - borderHeight;
    return { width: contentWidth, height: contentHeight };
  }
  getSize() {
    return this.#observed ? this.#size : this.calculateSize() ?? this.#size;
  }
  get current() {
    this.#subscribe()?.();
    return this.getSize();
  }
  get width() {
    return this.#width();
  }
  get height() {
    return this.#height();
  }
}
class IsMounted {
  #isMounted = false;
  constructor() {
  }
  get current() {
    return this.#isMounted;
  }
}
class Previous {
  #previousCallback = () => void 0;
  #previous = derived(() => this.#previousCallback());
  constructor(getter, initialValue) {
    let actualPrevious = void 0;
    if (initialValue !== void 0) actualPrevious = initialValue;
    this.#previousCallback = () => {
      try {
        return actualPrevious;
      } finally {
        actualPrevious = getter();
      }
    };
  }
  get current() {
    return this.#previous();
  }
}
function afterSleep(ms, cb) {
  return setTimeout(cb, ms);
}
function afterTick(fn) {
  tick().then(fn);
}
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const HOME = "Home";
const SPACE = " ";
const TAB = "Tab";
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function getNextKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
    vertical: ARROW_DOWN
  }[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
    vertical: ARROW_UP
  }[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
  if (!["ltr", "rtl"].includes(dir))
    dir = "ltr";
  if (!["horizontal", "vertical"].includes(orientation))
    orientation = "horizontal";
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
}
const isBrowser = typeof document !== "undefined";
const isIOS = getIsIOS();
function getIsIOS() {
  return isBrowser && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
  window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isElement(element2) {
  return element2 instanceof Element;
}
function isElementOrSVGElement(element2) {
  return element2 instanceof Element || element2 instanceof SVGElement;
}
function isTouch(e) {
  return e.pointerType === "touch";
}
function isNotNull(value) {
  return value !== null;
}
class RovingFocusGroup {
  #opts;
  #currentTabStopId = box(null);
  constructor(opts) {
    this.#opts = opts;
  }
  getCandidateNodes() {
    return [];
  }
  focusFirstCandidate() {
    const items = this.getCandidateNodes();
    if (!items.length)
      return;
    items[0]?.focus();
  }
  handleKeydown(node, e, both = false) {
    const rootNode = this.#opts.rootNode.current;
    if (!rootNode || !node)
      return;
    const items = this.getCandidateNodes();
    if (!items.length)
      return;
    const currentIndex = items.indexOf(node);
    const dir = getElemDirection(rootNode);
    const { nextKey, prevKey } = getDirectionalKeys(dir, this.#opts.orientation.current);
    const loop = this.#opts.loop.current;
    const keyToIndex = {
      [nextKey]: currentIndex + 1,
      [prevKey]: currentIndex - 1,
      [HOME]: 0,
      [END]: items.length - 1
    };
    if (both) {
      const altNextKey = nextKey === ARROW_DOWN ? ARROW_RIGHT : ARROW_DOWN;
      const altPrevKey = prevKey === ARROW_UP ? ARROW_LEFT : ARROW_UP;
      keyToIndex[altNextKey] = currentIndex + 1;
      keyToIndex[altPrevKey] = currentIndex - 1;
    }
    let itemIndex = keyToIndex[e.key];
    if (itemIndex === void 0)
      return;
    e.preventDefault();
    if (itemIndex < 0 && loop) {
      itemIndex = items.length - 1;
    } else if (itemIndex === items.length && loop) {
      itemIndex = 0;
    }
    const itemToFocus = items[itemIndex];
    if (!itemToFocus)
      return;
    itemToFocus.focus();
    this.#currentTabStopId.current = itemToFocus.id;
    this.#opts.onCandidateFocus?.(itemToFocus);
    return itemToFocus;
  }
  getTabIndex(node) {
    const items = this.getCandidateNodes();
    const anyActive = this.#currentTabStopId.current !== null;
    if (node && !anyActive && items[0] === node) {
      this.#currentTabStopId.current = node.id;
      return 0;
    } else if (node?.id === this.#currentTabStopId.current) {
      return 0;
    }
    return -1;
  }
  setCurrentTabStopId(id) {
    this.#currentTabStopId.current = id;
  }
  focusCurrentTabStop() {
    const currentTabStopId = this.#currentTabStopId.current;
    if (!currentTabStopId)
      return;
    const currentTabStop = this.#opts.rootNode.current?.querySelector(`#${currentTabStopId}`);
    if (!currentTabStop || !isHTMLElement(currentTabStop))
      return;
    currentTabStop.focus();
  }
}
class AnimationsComplete {
  #opts;
  #currentFrame = null;
  constructor(opts) {
    this.#opts = opts;
  }
  #cleanup() {
    if (!this.#currentFrame)
      return;
    window.cancelAnimationFrame(this.#currentFrame);
    this.#currentFrame = null;
  }
  run(fn) {
    this.#cleanup();
    const node = this.#opts.ref.current;
    if (!node)
      return;
    if (typeof node.getAnimations !== "function") {
      this.#executeCallback(fn);
      return;
    }
    this.#currentFrame = window.requestAnimationFrame(() => {
      const animations = node.getAnimations();
      if (animations.length === 0) {
        this.#executeCallback(fn);
        return;
      }
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        this.#executeCallback(fn);
      });
    });
  }
  #executeCallback(fn) {
    const execute = () => {
      fn();
    };
    if (this.#opts.afterTick) {
      afterTick(execute);
    } else {
      execute();
    }
  }
}
class PresenceManager {
  #opts;
  #enabled;
  #afterAnimations;
  #shouldRender = false;
  constructor(opts) {
    this.#opts = opts;
    this.#shouldRender = opts.open.current;
    this.#enabled = opts.enabled ?? true;
    this.#afterAnimations = new AnimationsComplete({ ref: this.#opts.ref, afterTick: this.#opts.open });
    watch(() => this.#opts.open.current, (isOpen) => {
      if (isOpen) this.#shouldRender = true;
      if (!this.#enabled) return;
      this.#afterAnimations.run(() => {
        if (isOpen === this.#opts.open.current) {
          if (!this.#opts.open.current) {
            this.#shouldRender = false;
          }
          this.#opts.onComplete?.();
        }
      });
    });
  }
  get shouldRender() {
    return this.#shouldRender;
  }
}
function noop() {
}
const BitsConfigContext = new Context("BitsConfig");
function getBitsConfig() {
  const fallback = new BitsConfigState(null, {});
  return BitsConfigContext.getOr(fallback).opts;
}
class BitsConfigState {
  opts;
  constructor(parent, opts) {
    const resolveConfigOption = createConfigResolver(parent, opts);
    this.opts = {
      defaultPortalTo: resolveConfigOption((config) => config.defaultPortalTo),
      defaultLocale: resolveConfigOption((config) => config.defaultLocale)
    };
  }
}
function createConfigResolver(parent, currentOpts) {
  return (getter) => {
    const configOption = boxWith(() => {
      const value = getter(currentOpts)?.current;
      if (value !== void 0)
        return value;
      if (parent === null)
        return void 0;
      return getter(parent.opts)?.current;
    });
    return configOption;
  };
}
function createPropResolver(configOption, fallback) {
  return (getProp) => {
    const config = getBitsConfig();
    return boxWith(() => {
      const propValue = getProp();
      if (propValue !== void 0)
        return propValue;
      const option = configOption(config).current;
      if (option !== void 0)
        return option;
      return fallback;
    });
  };
}
const resolvePortalToProp = createPropResolver((config) => config.defaultPortalTo, "body");
function Portal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { to: toProp, children, disabled } = $$props;
    const to = resolvePortalToProp(() => toProp);
    getAllContexts();
    let target = derived(getTarget);
    function getTarget() {
      if (!isBrowser || disabled) return null;
      let localTarget = null;
      if (typeof to.current === "string") {
        const target2 = document.querySelector(to.current);
        localTarget = target2;
      } else {
        localTarget = to.current;
      }
      return localTarget;
    }
    let instance;
    function unmountInstance() {
      if (instance) {
        unmount();
        instance = null;
      }
    }
    watch([() => target(), () => disabled], ([target2, disabled2]) => {
      if (!target2 || disabled2) {
        unmountInstance();
        return;
      }
      instance = mount();
      return () => {
        unmountInstance();
      };
    });
    if (disabled) {
      $$renderer2.push("<!--[-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
class CustomEventDispatcher {
  eventName;
  options;
  constructor(eventName, options = { bubbles: true, cancelable: true }) {
    this.eventName = eventName;
    this.options = options;
  }
  createEvent(detail) {
    return new CustomEvent(this.eventName, {
      ...this.options,
      detail
    });
  }
  dispatch(element2, detail) {
    const event = this.createEvent(detail);
    element2.dispatchEvent(event);
    return event;
  }
  listen(element2, callback, options) {
    const handler = (event) => {
      callback(event);
    };
    return on(element2, this.eventName, handler, options);
  }
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
function isClickTrulyOutside(event, contentNode) {
  const { clientX, clientY } = event;
  const rect = contentNode.getBoundingClientRect();
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
function getTabbableCandidates(container) {
  const nodes = [];
  const doc = getDocument(container);
  const walker = doc.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // oxlint-disable-next-line no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
const defaultOptions = { afterMs: 1e4, onChange: noop };
function boxAutoReset(defaultValue, options) {
  const { afterMs, onChange, getWindow: getWindow2 } = { ...defaultOptions, ...options };
  let timeout = null;
  let value = defaultValue;
  function resetAfter() {
    return getWindow2().setTimeout(
      () => {
        value = defaultValue;
        onChange?.(defaultValue);
      },
      afterMs
    );
  }
  return boxWith(() => value, (v) => {
    value = v;
    onChange?.(v);
    if (timeout) getWindow2().clearTimeout(timeout);
    timeout = resetAfter();
  });
}
const CONTEXT_MENU_TRIGGER_ATTR = "data-context-menu-trigger";
const CONTEXT_MENU_CONTENT_ATTR = "data-context-menu-content";
createBitsAttrs({
  component: "menu",
  parts: [
    "trigger",
    "content",
    "sub-trigger",
    "item",
    "group",
    "group-heading",
    "checkbox-group",
    "checkbox-item",
    "radio-group",
    "radio-item",
    "separator",
    "sub-content",
    "arrow"
  ]
});
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
  static create(opts) {
    return new DismissibleLayerState(opts);
  }
  opts;
  #interactOutsideProp;
  #behaviorType;
  #interceptedEvents = { pointerdown: false };
  #isResponsibleLayer = false;
  #isFocusInsideDOMTree = false;
  #documentObj = void 0;
  #onFocusOutside;
  #unsubClickListener = noop;
  constructor(opts) {
    this.opts = opts;
    this.#behaviorType = opts.interactOutsideBehavior;
    this.#interactOutsideProp = opts.onInteractOutside;
    this.#onFocusOutside = opts.onFocusOutside;
    let unsubEvents = noop;
    const cleanup = () => {
      this.#resetState();
      globalThis.bitsDismissableLayers.delete(this);
      this.#handleInteractOutside.destroy();
      unsubEvents();
    };
    watch([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
      if (!this.opts.enabled.current || !this.opts.ref.current) return;
      afterSleep(1, () => {
        if (!this.opts.ref.current) return;
        globalThis.bitsDismissableLayers.set(this, this.#behaviorType);
        unsubEvents();
        unsubEvents = this.#addEventListeners();
      });
      return cleanup;
    });
  }
  #handleFocus = (event) => {
    if (event.defaultPrevented) return;
    if (!this.opts.ref.current) return;
    afterTick(() => {
      if (!this.opts.ref.current || this.#isTargetWithinLayer(event.target)) return;
      if (event.target && !this.#isFocusInsideDOMTree) {
        this.#onFocusOutside.current?.(event);
      }
    });
  };
  #addEventListeners() {
    return executeCallbacks(
      /**
       * CAPTURE INTERACTION START
       * mark interaction-start event as intercepted.
       * mark responsible layer during interaction start
       * to avoid checking if is responsible layer during interaction end
       * when a new floating element may have been opened.
       */
      on(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), { capture: true }),
      /**
       * BUBBLE INTERACTION START
       * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
       * to avoid prematurely checking if other events were intercepted.
       */
      on(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
      /**
       * HANDLE FOCUS OUTSIDE
       */
      on(this.#documentObj, "focusin", this.#handleFocus)
    );
  }
  #handleDismiss = (e) => {
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(e);
    }
    this.#interactOutsideProp.current(e);
  };
  #handleInteractOutside = debounce(
    (e) => {
      if (!this.opts.ref.current) {
        this.#unsubClickListener();
        return;
      }
      const isEventValid = this.opts.isValidEvent.current(e, this.opts.ref.current) || isValidEvent(e, this.opts.ref.current);
      if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
        this.#unsubClickListener();
        return;
      }
      let event = e;
      if (event.defaultPrevented) {
        event = createWrappedEvent(event);
      }
      if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
        this.#unsubClickListener();
        return;
      }
      if (e.pointerType === "touch") {
        this.#unsubClickListener();
        this.#unsubClickListener = on(this.#documentObj, "click", this.#handleDismiss, { once: true });
      } else {
        this.#interactOutsideProp.current(event);
      }
    },
    10
  );
  #markInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = true;
  };
  #markNonInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = false;
  };
  #markResponsibleLayer = () => {
    if (!this.opts.ref.current) return;
    this.#isResponsibleLayer = isResponsibleLayer(this.opts.ref.current);
  };
  #isTargetWithinLayer = (target) => {
    if (!this.opts.ref.current) return false;
    return isOrContainsTarget(this.opts.ref.current, target);
  };
  #resetState = debounce(
    () => {
      for (const eventType in this.#interceptedEvents) {
        this.#interceptedEvents[eventType] = false;
      }
      this.#isResponsibleLayer = false;
    },
    20
  );
  #isAnyEventIntercepted() {
    const i = Object.values(this.#interceptedEvents).some(Boolean);
    return i;
  }
  #onfocuscapture = () => {
    this.#isFocusInsideDOMTree = true;
  };
  #onblurcapture = () => {
    this.#isFocusInsideDOMTree = false;
  };
  props = {
    onfocuscapture: this.#onfocuscapture,
    onblurcapture: this.#onblurcapture
  };
}
function getTopMostDismissableLayer(layersArr = [...globalThis.bitsDismissableLayers]) {
  return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostDismissableLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].opts.ref.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.opts.ref.current === node;
}
function isValidEvent(e, node) {
  const target = e.target;
  if (!isElementOrSVGElement(target)) return false;
  const targetIsContextMenuTrigger = Boolean(target.closest(`[${CONTEXT_MENU_TRIGGER_ATTR}]`));
  if ("button" in e && e.button > 0 && !targetIsContextMenuTrigger) return false;
  if ("button" in e && e.button === 0 && targetIsContextMenuTrigger) return true;
  const nodeIsContextMenu = Boolean(node.closest(`[${CONTEXT_MENU_CONTENT_ATTR}]`));
  if (targetIsContextMenuTrigger && nodeIsContextMenu) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid = ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target) && isClickTrulyOutside(e, node);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    }
  });
  return wrappedEvent;
}
function Dismissible_layer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      interactOutsideBehavior = "close",
      onInteractOutside = noop,
      onFocusOutside = noop,
      id,
      children,
      enabled,
      isValidEvent: isValidEvent2 = () => false,
      ref
    } = $$props;
    const dismissibleLayerState = DismissibleLayerState.create({
      id: boxWith(() => id),
      interactOutsideBehavior: boxWith(() => interactOutsideBehavior),
      onInteractOutside: boxWith(() => onInteractOutside),
      enabled: boxWith(() => enabled),
      onFocusOutside: boxWith(() => onFocusOutside),
      isValidEvent: boxWith(() => isValidEvent2),
      ref
    });
    children?.($$renderer2, { props: dismissibleLayerState.props });
    $$renderer2.push(`<!---->`);
  });
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
  static create(opts) {
    return new EscapeLayerState(opts);
  }
  opts;
  domContext;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(this.opts.ref);
    let unsubEvents = noop;
    watch(() => opts.enabled.current, (enabled) => {
      if (enabled) {
        globalThis.bitsEscapeLayers.set(this, opts.escapeKeydownBehavior);
        unsubEvents = this.#addEventListener();
      }
      return () => {
        unsubEvents();
        globalThis.bitsEscapeLayers.delete(this);
      };
    });
  }
  #addEventListener = () => {
    return on(this.domContext.getDocument(), "keydown", this.#onkeydown, { passive: false });
  };
  #onkeydown = (e) => {
    if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
    const clonedEvent = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const behaviorType = this.opts.escapeKeydownBehavior.current;
    if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
    this.opts.onEscapeKeydown.current(clonedEvent);
  };
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      escapeKeydownBehavior = "close",
      onEscapeKeydown = noop,
      children,
      enabled,
      ref
    } = $$props;
    EscapeLayerState.create({
      escapeKeydownBehavior: boxWith(() => escapeKeydownBehavior),
      onEscapeKeydown: boxWith(() => onEscapeKeydown),
      enabled: boxWith(() => enabled),
      ref
    });
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
class FocusScopeManager {
  static instance;
  #scopeStack = simpleBox([]);
  #focusHistory = /* @__PURE__ */ new WeakMap();
  #preFocusHistory = /* @__PURE__ */ new WeakMap();
  static getInstance() {
    if (!this.instance) {
      this.instance = new FocusScopeManager();
    }
    return this.instance;
  }
  register(scope) {
    const current = this.getActive();
    if (current && current !== scope) {
      current.pause();
    }
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
      this.#preFocusHistory.set(scope, activeElement);
    }
    this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
    this.#scopeStack.current.unshift(scope);
  }
  unregister(scope) {
    this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
    const next = this.getActive();
    if (next) {
      next.resume();
    }
  }
  getActive() {
    return this.#scopeStack.current[0];
  }
  setFocusMemory(scope, element2) {
    this.#focusHistory.set(scope, element2);
  }
  getFocusMemory(scope) {
    return this.#focusHistory.get(scope);
  }
  isActiveScope(scope) {
    return this.getActive() === scope;
  }
  setPreFocusMemory(scope, element2) {
    this.#preFocusHistory.set(scope, element2);
  }
  getPreFocusMemory(scope) {
    return this.#preFocusHistory.get(scope);
  }
  clearPreFocusMemory(scope) {
    this.#preFocusHistory.delete(scope);
  }
}
class FocusScope {
  #paused = false;
  #container = null;
  #manager = FocusScopeManager.getInstance();
  #cleanupFns = [];
  #opts;
  constructor(opts) {
    this.#opts = opts;
  }
  get paused() {
    return this.#paused;
  }
  pause() {
    this.#paused = true;
  }
  resume() {
    this.#paused = false;
  }
  #cleanup() {
    for (const fn of this.#cleanupFns) {
      fn();
    }
    this.#cleanupFns = [];
  }
  mount(container) {
    if (this.#container) {
      this.unmount();
    }
    this.#container = container;
    this.#manager.register(this);
    this.#setupEventListeners();
    this.#handleOpenAutoFocus();
  }
  unmount() {
    if (!this.#container) return;
    this.#cleanup();
    this.#handleCloseAutoFocus();
    this.#manager.unregister(this);
    this.#manager.clearPreFocusMemory(this);
    this.#container = null;
  }
  #handleOpenAutoFocus() {
    if (!this.#container) return;
    const event = new CustomEvent("focusScope.onOpenAutoFocus", { bubbles: false, cancelable: true });
    this.#opts.onOpenAutoFocus.current(event);
    if (!event.defaultPrevented) {
      requestAnimationFrame(() => {
        if (!this.#container) return;
        const firstTabbable = this.#getFirstTabbable();
        if (firstTabbable) {
          firstTabbable.focus();
          this.#manager.setFocusMemory(this, firstTabbable);
        } else {
          this.#container.focus();
        }
      });
    }
  }
  #handleCloseAutoFocus() {
    const event = new CustomEvent("focusScope.onCloseAutoFocus", { bubbles: false, cancelable: true });
    this.#opts.onCloseAutoFocus.current?.(event);
    if (!event.defaultPrevented) {
      const preFocusedElement = this.#manager.getPreFocusMemory(this);
      if (preFocusedElement && document.contains(preFocusedElement)) {
        try {
          preFocusedElement.focus();
        } catch {
          document.body.focus();
        }
      }
    }
  }
  #setupEventListeners() {
    if (!this.#container || !this.#opts.trap.current) return;
    const container = this.#container;
    const doc = container.ownerDocument;
    const handleFocus = (e) => {
      if (this.#paused || !this.#manager.isActiveScope(this)) return;
      const target = e.target;
      if (!target) return;
      const isInside = container.contains(target);
      if (isInside) {
        this.#manager.setFocusMemory(this, target);
      } else {
        const lastFocused = this.#manager.getFocusMemory(this);
        if (lastFocused && container.contains(lastFocused) && isFocusable(lastFocused)) {
          e.preventDefault();
          lastFocused.focus();
        } else {
          const firstTabbable = this.#getFirstTabbable();
          const firstFocusable = this.#getAllFocusables()[0];
          (firstTabbable || firstFocusable || container).focus();
        }
      }
    };
    const handleKeydown = (e) => {
      if (!this.#opts.loop || this.#paused || e.key !== "Tab") return;
      if (!this.#manager.isActiveScope(this)) return;
      const tabbables = this.#getTabbables();
      if (tabbables.length === 0) return;
      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];
      if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };
    this.#cleanupFns.push(on(doc, "focusin", handleFocus, { capture: true }), on(container, "keydown", handleKeydown));
    const observer = new MutationObserver(() => {
      const lastFocused = this.#manager.getFocusMemory(this);
      if (lastFocused && !container.contains(lastFocused)) {
        const firstTabbable = this.#getFirstTabbable();
        const firstFocusable = this.#getAllFocusables()[0];
        const elementToFocus = firstTabbable || firstFocusable;
        if (elementToFocus) {
          elementToFocus.focus();
          this.#manager.setFocusMemory(this, elementToFocus);
        } else {
          container.focus();
        }
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    this.#cleanupFns.push(() => observer.disconnect());
  }
  #getTabbables() {
    if (!this.#container) return [];
    return tabbable(this.#container, { includeContainer: false, getShadowRoot: true });
  }
  #getFirstTabbable() {
    const tabbables = this.#getTabbables();
    return tabbables[0] || null;
  }
  #getAllFocusables() {
    if (!this.#container) return [];
    return focusable(this.#container, { includeContainer: false, getShadowRoot: true });
  }
  static use(opts) {
    let scope = null;
    watch([() => opts.ref.current, () => opts.enabled.current], ([ref, enabled]) => {
      if (ref && enabled) {
        if (!scope) {
          scope = new FocusScope(opts);
        }
        scope.mount(ref);
      } else if (scope) {
        scope.unmount();
        scope = null;
      }
    });
    return {
      get props() {
        return { tabindex: -1 };
      }
    };
  }
}
function Focus_scope($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      enabled = false,
      trapFocus = false,
      loop = false,
      onCloseAutoFocus = noop,
      onOpenAutoFocus = noop,
      focusScope,
      ref
    } = $$props;
    const focusScopeState = FocusScope.use({
      enabled: boxWith(() => enabled),
      trap: boxWith(() => trapFocus),
      loop,
      onCloseAutoFocus: boxWith(() => onCloseAutoFocus),
      onOpenAutoFocus: boxWith(() => onOpenAutoFocus),
      ref
    });
    focusScope?.($$renderer2, { props: focusScopeState.props });
    $$renderer2.push(`<!---->`);
  });
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
  static create(opts) {
    return new TextSelectionLayerState(opts);
  }
  opts;
  domContext;
  #unsubSelectionLock = noop;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(opts.ref);
    let unsubEvents = noop;
    watch(() => this.opts.enabled.current, (isEnabled) => {
      if (isEnabled) {
        globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
        unsubEvents();
        unsubEvents = this.#addEventListeners();
      }
      return () => {
        unsubEvents();
        this.#resetSelectionLock();
        globalThis.bitsTextSelectionLayers.delete(this);
      };
    });
  }
  #addEventListeners() {
    return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.opts.onPointerUp.current)));
  }
  #pointerdown = (e) => {
    const node = this.opts.ref.current;
    const target = e.target;
    if (!isHTMLElement(node) || !isHTMLElement(target) || !this.opts.enabled.current) return;
    if (!isHighestLayer(this) || !contains(node, target)) return;
    this.opts.onPointerDown.current(e);
    if (e.defaultPrevented) return;
    this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
  };
  #resetSelectionLock = () => {
    this.#unsubSelectionLock();
    this.#unsubSelectionLock = noop;
  };
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      preventOverflowTextSelection = true,
      onPointerDown = noop,
      onPointerUp = noop,
      id,
      children,
      enabled,
      ref
    } = $$props;
    TextSelectionLayerState.create({
      id: boxWith(() => id),
      onPointerDown: boxWith(() => onPointerDown),
      onPointerUp: boxWith(() => onPointerUp),
      enabled: boxWith(() => enabled && preventOverflowTextSelection),
      ref
    });
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
globalThis.bitsIdCounter ??= { current: 0 };
function useId(prefix = "bits") {
  globalThis.bitsIdCounter.current++;
  return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
class SharedState {
  #factory;
  #subscribers = 0;
  #state;
  #scope;
  constructor(factory) {
    this.#factory = factory;
  }
  #dispose() {
    this.#subscribers -= 1;
    if (this.#scope && this.#subscribers <= 0) {
      this.#scope();
      this.#state = void 0;
      this.#scope = void 0;
    }
  }
  get(...args) {
    this.#subscribers += 1;
    if (this.#state === void 0) {
      this.#scope = () => {
      };
    }
    return this.#state;
  }
}
const lockMap = new SvelteMap();
let initialBodyStyle = null;
let cleanupTimeoutId = null;
let isInCleanupTransition = false;
const anyLocked = boxWith(() => {
  for (const value of lockMap.values()) {
    if (value) return true;
  }
  return false;
});
let cleanupScheduledAt = null;
const bodyLockStackCount = new SharedState(() => {
  function resetBodyStyle() {
    return;
  }
  function cancelPendingCleanup() {
    if (cleanupTimeoutId === null) return;
    window.clearTimeout(cleanupTimeoutId);
    cleanupTimeoutId = null;
  }
  function scheduleCleanupIfNoNewLocks(delay, callback) {
    cancelPendingCleanup();
    isInCleanupTransition = true;
    cleanupScheduledAt = Date.now();
    const currentCleanupId = cleanupScheduledAt;
    const cleanupFn = () => {
      cleanupTimeoutId = null;
      if (cleanupScheduledAt !== currentCleanupId) return;
      if (!isAnyLocked(lockMap)) {
        isInCleanupTransition = false;
        callback();
      } else {
        isInCleanupTransition = false;
      }
    };
    const actualDelay = delay === null ? 24 : delay;
    cleanupTimeoutId = window.setTimeout(cleanupFn, actualDelay);
  }
  function ensureInitialStyleCaptured() {
    if (initialBodyStyle === null && lockMap.size === 0 && !isInCleanupTransition) {
      initialBodyStyle = document.body.getAttribute("style");
    }
  }
  watch(() => anyLocked.current, () => {
    if (!anyLocked.current) return;
    ensureInitialStyleCaptured();
    isInCleanupTransition = false;
    const htmlStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const hasStableGutter = htmlStyle.scrollbarGutter?.includes("stable") || bodyStyle.scrollbarGutter?.includes("stable");
    const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseInt(bodyStyle.paddingRight ?? "0", 10);
    const config = {
      padding: paddingRight + verticalScrollbarWidth,
      margin: Number.parseInt(bodyStyle.marginRight ?? "0", 10)
    };
    if (verticalScrollbarWidth > 0 && !hasStableGutter) {
      document.body.style.paddingRight = `${config.padding}px`;
      document.body.style.marginRight = `${config.margin}px`;
      document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
    }
    document.body.style.overflow = "hidden";
    if (isIOS) {
      on(
        document,
        "touchmove",
        (e) => {
          if (e.target !== document.documentElement) return;
          if (e.touches.length > 1) return;
          e.preventDefault();
        },
        { passive: false }
      );
    }
    afterTick(() => {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    });
  });
  return {
    get lockMap() {
      return lockMap;
    },
    resetBodyStyle,
    scheduleCleanupIfNoNewLocks,
    cancelPendingCleanup,
    ensureInitialStyleCaptured
  };
});
class BodyScrollLock {
  #id = useId();
  #initialState;
  #restoreScrollDelay = () => null;
  #countState;
  locked;
  constructor(initialState, restoreScrollDelay = () => null) {
    this.#initialState = initialState;
    this.#restoreScrollDelay = restoreScrollDelay;
    this.#countState = bodyLockStackCount.get();
    if (!this.#countState) return;
    this.#countState.cancelPendingCleanup();
    this.#countState.ensureInitialStyleCaptured();
    this.#countState.lockMap.set(this.#id, this.#initialState ?? false);
    this.locked = boxWith(() => this.#countState.lockMap.get(this.#id) ?? false, (v) => this.#countState.lockMap.set(this.#id, v));
  }
}
function isAnyLocked(map) {
  for (const [_, value] of map) {
    if (value) return true;
  }
  return false;
}
function Scroll_lock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { preventScroll = true, restoreScrollDelay = null } = $$props;
    if (preventScroll) {
      new BodyScrollLock(preventScroll, () => restoreScrollDelay);
    }
  });
}
function get(valueOrGetValue) {
  return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element2) {
  if (typeof window === "undefined") return 1;
  const win = element2.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element2, value) {
  const dpr = getDPR(element2);
  return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
  return {
    [`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
    [`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
    [`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
    [`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
    [`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
  };
}
function useFloating(options) {
  const openOption = derived(() => get(options.open) ?? true);
  const middlewareOption = derived(() => get(options.middleware));
  const transformOption = derived(() => get(options.transform) ?? true);
  const placementOption = derived(() => get(options.placement) ?? "bottom");
  const strategyOption = derived(() => get(options.strategy) ?? "absolute");
  const sideOffsetOption = derived(() => get(options.sideOffset) ?? 0);
  const alignOffsetOption = derived(() => get(options.alignOffset) ?? 0);
  const reference = options.reference;
  let x = 0;
  let y = 0;
  const floating = simpleBox(null);
  let strategy = strategyOption();
  let placement = placementOption();
  let middlewareData = {};
  let isPositioned = false;
  const floatingStyles = derived(() => {
    const xVal = floating.current ? roundByDPR(floating.current, x) : x;
    const yVal = floating.current ? roundByDPR(floating.current, y) : y;
    if (transformOption()) {
      return {
        position: strategy,
        left: "0",
        top: "0",
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...floating.current && getDPR(floating.current) >= 1.5 && { willChange: "transform" }
      };
    }
    return { position: strategy, left: `${xVal}px`, top: `${yVal}px` };
  });
  function update() {
    if (reference.current === null || floating.current === null) return;
    computePosition(reference.current, floating.current, {
      middleware: middlewareOption(),
      placement: placementOption(),
      strategy: strategyOption()
    }).then((position) => {
      const referenceNode = reference.current;
      const referenceHidden = isReferenceHidden(referenceNode);
      if (referenceHidden) {
        middlewareData = {
          ...middlewareData,
          hide: {
            // oxlint-disable-next-line no-explicit-any
            ...middlewareData.hide,
            referenceHidden: true
          }
        };
        return;
      }
      if (!openOption() && x !== 0 && y !== 0) {
        const maxExpectedOffset = Math.max(Math.abs(sideOffsetOption()), Math.abs(alignOffsetOption()), 15);
        if (position.x <= maxExpectedOffset && position.y <= maxExpectedOffset) return;
      }
      x = position.x;
      y = position.y;
      strategy = position.strategy;
      placement = position.placement;
      middlewareData = position.middlewareData;
      isPositioned = true;
    });
  }
  return {
    floating,
    reference,
    get strategy() {
      return strategy;
    },
    get placement() {
      return placement;
    },
    get middlewareData() {
      return middlewareData;
    },
    get isPositioned() {
      return isPositioned;
    },
    get floatingStyles() {
      return floatingStyles();
    },
    get update() {
      return update;
    }
  };
}
function isReferenceHidden(node) {
  if (!(node instanceof Element)) return false;
  if (!node.isConnected) return true;
  if (node instanceof HTMLElement && node.hidden) return true;
  return node.getClientRects().length === 0;
}
const OPPOSITE_SIDE = { top: "bottom", right: "left", bottom: "top", left: "right" };
const FloatingRootContext = new Context("Floating.Root");
const FloatingContentContext = new Context("Floating.Content");
const FloatingTooltipRootContext = new Context("Floating.Root");
class FloatingRootState {
  static create(tooltip = false) {
    return tooltip ? FloatingTooltipRootContext.set(new FloatingRootState()) : FloatingRootContext.set(new FloatingRootState());
  }
  anchorNode = simpleBox(null);
  customAnchorNode = simpleBox(null);
  triggerNode = simpleBox(null);
  constructor() {
  }
}
class FloatingContentState {
  static create(opts, tooltip = false) {
    return tooltip ? FloatingContentContext.set(new FloatingContentState(opts, FloatingTooltipRootContext.get())) : FloatingContentContext.set(new FloatingContentState(opts, FloatingRootContext.get()));
  }
  opts;
  root;
  // nodes
  contentRef = simpleBox(null);
  wrapperRef = simpleBox(null);
  arrowRef = simpleBox(null);
  contentAttachment = attachRef(this.contentRef);
  wrapperAttachment = attachRef(this.wrapperRef);
  arrowAttachment = attachRef(this.arrowRef);
  // ids
  arrowId = simpleBox(useId());
  #transformedStyle = derived(() => {
    if (typeof this.opts.style === "string") return cssToStyleObj(this.opts.style);
    if (!this.opts.style) return {};
  });
  #updatePositionStrategy = void 0;
  #arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
  #arrowWidth = derived(() => this.#arrowSize?.width ?? 0);
  #arrowHeight = derived(() => this.#arrowSize?.height ?? 0);
  #desiredPlacement = derived(() => this.opts.side?.current + (this.opts.align.current !== "center" ? `-${this.opts.align.current}` : ""));
  #boundary = derived(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
  #hasExplicitBoundaries = derived(() => this.#boundary().length > 0);
  get hasExplicitBoundaries() {
    return this.#hasExplicitBoundaries();
  }
  set hasExplicitBoundaries($$value) {
    return this.#hasExplicitBoundaries($$value);
  }
  #detectOverflowOptions = derived(() => ({
    padding: this.opts.collisionPadding.current,
    boundary: this.#boundary().filter(isNotNull),
    altBoundary: this.hasExplicitBoundaries
  }));
  get detectOverflowOptions() {
    return this.#detectOverflowOptions();
  }
  set detectOverflowOptions($$value) {
    return this.#detectOverflowOptions($$value);
  }
  #availableWidth = void 0;
  #availableHeight = void 0;
  #anchorWidth = void 0;
  #anchorHeight = void 0;
  #middleware = derived(() => [
    offset({
      mainAxis: this.opts.sideOffset.current + this.#arrowHeight(),
      alignmentAxis: this.opts.alignOffset.current
    }),
    this.opts.avoidCollisions.current && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: this.opts.sticky.current === "partial" ? limitShift() : void 0,
      ...this.detectOverflowOptions
    }),
    this.opts.avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
    size({
      ...this.detectOverflowOptions,
      apply: ({ rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        this.#availableWidth = availableWidth;
        this.#availableHeight = availableHeight;
        this.#anchorWidth = anchorWidth;
        this.#anchorHeight = anchorHeight;
      }
    }),
    this.arrowRef.current && arrow({
      element: this.arrowRef.current,
      padding: this.opts.arrowPadding.current
    }),
    transformOrigin({
      arrowWidth: this.#arrowWidth(),
      arrowHeight: this.#arrowHeight()
    }),
    this.opts.hideWhenDetached.current && hide({ strategy: "referenceHidden", ...this.detectOverflowOptions })
  ].filter(Boolean));
  get middleware() {
    return this.#middleware();
  }
  set middleware($$value) {
    return this.#middleware($$value);
  }
  floating;
  #placedSide = derived(() => getSideFromPlacement(this.floating.placement));
  get placedSide() {
    return this.#placedSide();
  }
  set placedSide($$value) {
    return this.#placedSide($$value);
  }
  #placedAlign = derived(() => getAlignFromPlacement(this.floating.placement));
  get placedAlign() {
    return this.#placedAlign();
  }
  set placedAlign($$value) {
    return this.#placedAlign($$value);
  }
  #arrowX = derived(() => this.floating.middlewareData.arrow?.x ?? 0);
  get arrowX() {
    return this.#arrowX();
  }
  set arrowX($$value) {
    return this.#arrowX($$value);
  }
  #arrowY = derived(() => this.floating.middlewareData.arrow?.y ?? 0);
  get arrowY() {
    return this.#arrowY();
  }
  set arrowY($$value) {
    return this.#arrowY($$value);
  }
  #cannotCenterArrow = derived(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
  get cannotCenterArrow() {
    return this.#cannotCenterArrow();
  }
  set cannotCenterArrow($$value) {
    return this.#cannotCenterArrow($$value);
  }
  contentZIndex;
  #arrowBaseSide = derived(() => OPPOSITE_SIDE[this.placedSide]);
  get arrowBaseSide() {
    return this.#arrowBaseSide();
  }
  set arrowBaseSide($$value) {
    return this.#arrowBaseSide($$value);
  }
  #wrapperProps = derived(() => ({
    id: this.opts.wrapperId.current,
    "data-bits-floating-content-wrapper": "",
    style: {
      ...this.floating.floatingStyles,
      transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
      minWidth: "max-content",
      zIndex: this.contentZIndex,
      "--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
      "--bits-floating-available-width": `${this.#availableWidth}px`,
      "--bits-floating-available-height": `${this.#availableHeight}px`,
      "--bits-floating-anchor-width": `${this.#anchorWidth}px`,
      "--bits-floating-anchor-height": `${this.#anchorHeight}px`,
      ...this.floating.middlewareData.hide?.referenceHidden && { visibility: "hidden", "pointer-events": "none" },
      ...this.#transformedStyle()
    },
    dir: this.opts.dir.current,
    ...this.wrapperAttachment
  }));
  get wrapperProps() {
    return this.#wrapperProps();
  }
  set wrapperProps($$value) {
    return this.#wrapperProps($$value);
  }
  #props = derived(() => ({
    "data-side": this.placedSide,
    "data-align": this.placedAlign,
    style: styleToString({ ...this.#transformedStyle() }),
    ...this.contentAttachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #arrowStyle = derived(() => ({
    position: "absolute",
    left: this.arrowX ? `${this.arrowX}px` : void 0,
    top: this.arrowY ? `${this.arrowY}px` : void 0,
    [this.arrowBaseSide]: 0,
    "transform-origin": { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[this.placedSide],
    transform: {
      top: "translateY(100%)",
      right: "translateY(50%) rotate(90deg) translateX(-50%)",
      bottom: "rotate(180deg)",
      left: "translateY(50%) rotate(-90deg) translateX(50%)"
    }[this.placedSide],
    visibility: this.cannotCenterArrow ? "hidden" : void 0
  }));
  get arrowStyle() {
    return this.#arrowStyle();
  }
  set arrowStyle($$value) {
    return this.#arrowStyle($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.#updatePositionStrategy = opts.updatePositionStrategy;
    if (opts.customAnchor) {
      this.root.customAnchorNode.current = opts.customAnchor.current;
    }
    watch(() => opts.customAnchor.current, (customAnchor) => {
      this.root.customAnchorNode.current = customAnchor;
    });
    this.floating = useFloating({
      strategy: () => this.opts.strategy.current,
      placement: () => this.#desiredPlacement(),
      middleware: () => this.middleware,
      reference: this.root.anchorNode,
      open: () => this.opts.enabled.current,
      sideOffset: () => this.opts.sideOffset.current,
      alignOffset: () => this.opts.alignOffset.current
    });
    watch(() => this.contentRef.current, (contentNode) => {
      if (!contentNode || !this.opts.enabled.current) return;
      const win = getWindow(contentNode);
      const rafId = win.requestAnimationFrame(() => {
        if (this.contentRef.current !== contentNode || !this.opts.enabled.current) return;
        const zIndex = win.getComputedStyle(contentNode).zIndex;
        if (zIndex !== this.contentZIndex) {
          this.contentZIndex = zIndex;
        }
      });
      return () => {
        win.cancelAnimationFrame(rafId);
      };
    });
  }
}
class FloatingAnchorState {
  static create(opts, tooltip = false) {
    return tooltip ? new FloatingAnchorState(opts, FloatingTooltipRootContext.get()) : new FloatingAnchorState(opts, FloatingRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    if (opts.virtualEl && opts.virtualEl.current) {
      root.triggerNode = boxFrom(opts.virtualEl.current);
    } else {
      root.triggerNode = opts.ref;
    }
  }
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function getSideFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, tooltip = false } = $$props;
    FloatingRootState.create(tooltip);
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
function Floating_layer_anchor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { id, children, virtualEl, ref, tooltip = false } = $$props;
    FloatingAnchorState.create(
      {
        id: boxWith(() => id),
        virtualEl: boxWith(() => virtualEl),
        ref
      },
      tooltip
    );
    children?.($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
function Floating_layer_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      content,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      id,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding = 0,
      hideWhenDetached = false,
      onPlaced = () => {
      },
      sticky = "partial",
      updatePositionStrategy = "optimized",
      strategy = "fixed",
      dir = "ltr",
      style = {},
      wrapperId = useId(),
      customAnchor = null,
      enabled,
      tooltip = false
    } = $$props;
    const contentState = FloatingContentState.create(
      {
        side: boxWith(() => side),
        sideOffset: boxWith(() => sideOffset),
        align: boxWith(() => align),
        alignOffset: boxWith(() => alignOffset),
        id: boxWith(() => id),
        arrowPadding: boxWith(() => arrowPadding),
        avoidCollisions: boxWith(() => avoidCollisions),
        collisionBoundary: boxWith(() => collisionBoundary),
        collisionPadding: boxWith(() => collisionPadding),
        hideWhenDetached: boxWith(() => hideWhenDetached),
        onPlaced: boxWith(() => onPlaced),
        sticky: boxWith(() => sticky),
        updatePositionStrategy: boxWith(() => updatePositionStrategy),
        strategy: boxWith(() => strategy),
        dir: boxWith(() => dir),
        style: boxWith(() => style),
        enabled: boxWith(() => enabled),
        wrapperId: boxWith(() => wrapperId),
        customAnchor: boxWith(() => customAnchor)
      },
      tooltip
    );
    const mergedProps = derived(() => mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } }));
    content?.($$renderer2, { props: contentState.props, wrapperProps: mergedProps() });
    $$renderer2.push(`<!---->`);
  });
}
function Floating_layer_content_static($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { content } = $$props;
    content?.($$renderer2, { props: {}, wrapperProps: {} });
    $$renderer2.push(`<!---->`);
  });
}
const separatorAttrs = createBitsAttrs({ component: "separator", parts: ["root"] });
class SeparatorRootState {
  static create(opts) {
    return new SeparatorRootState(opts);
  }
  opts;
  attachment;
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: this.opts.decorative.current ? "none" : "separator",
    "aria-orientation": this.opts.orientation.current,
    "aria-hidden": boolToStrTrueOrUndef(this.opts.decorative.current),
    "data-orientation": this.opts.orientation.current,
    [separatorAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Separator$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      child,
      children,
      decorative = false,
      orientation = "horizontal",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = SeparatorRootState.create({
      ref: boxWith(() => ref, (v) => ref = v),
      id: boxWith(() => id),
      decorative: boxWith(() => decorative),
      orientation: boxWith(() => orientation)
    });
    const mergedProps = derived(() => mergeProps(restProps, rootState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Popper_content($$renderer, $$props) {
  let {
    content,
    isStatic = false,
    onPlaced,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isStatic) {
    $$renderer.push("<!--[-->");
    Floating_layer_content_static($$renderer, { content });
  } else {
    $$renderer.push("<!--[!-->");
    Floating_layer_content($$renderer, spread_props([{ content, onPlaced }, restProps]));
  }
  $$renderer.push(`<!--]-->`);
}
function Popper_layer_inner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      onFocusOutside,
      interactOutsideBehavior = "close",
      loop,
      trapFocus = true,
      isValidEvent: isValidEvent2 = () => false,
      customAnchor = null,
      isStatic = false,
      enabled,
      ref,
      tooltip = false,
      contentPointerEvents = "auto",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    {
      let content = function($$renderer3, { props: floatingProps, wrapperProps }) {
        if (restProps.forceMount && enabled) {
          $$renderer3.push("<!--[-->");
          Scroll_lock($$renderer3, { preventScroll });
        } else if (!restProps.forceMount) {
          $$renderer3.push("<!--[1-->");
          Scroll_lock($$renderer3, { preventScroll });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          let focusScope = function($$renderer4, { props: focusScopeProps }) {
            Escape_layer($$renderer4, {
              onEscapeKeydown,
              escapeKeydownBehavior,
              enabled,
              ref,
              children: ($$renderer5) => {
                {
                  let children = function($$renderer6, { props: dismissibleProps }) {
                    Text_selection_layer($$renderer6, {
                      id,
                      preventOverflowTextSelection,
                      onPointerDown,
                      onPointerUp,
                      enabled,
                      ref,
                      children: ($$renderer7) => {
                        popper?.($$renderer7, {
                          props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: contentPointerEvents } }),
                          wrapperProps
                        });
                        $$renderer7.push(`<!---->`);
                      }
                    });
                  };
                  Dismissible_layer($$renderer5, {
                    id,
                    onInteractOutside,
                    onFocusOutside,
                    interactOutsideBehavior,
                    isValidEvent: isValidEvent2,
                    enabled,
                    ref,
                    children
                  });
                }
              }
            });
          };
          Focus_scope($$renderer3, {
            onOpenAutoFocus,
            onCloseAutoFocus,
            loop,
            enabled,
            trapFocus,
            forceMount: restProps.forceMount,
            ref,
            focusScope
          });
        }
        $$renderer3.push(`<!---->`);
      };
      Popper_content($$renderer2, {
        isStatic,
        id,
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        avoidCollisions,
        collisionBoundary,
        collisionPadding,
        sticky,
        hideWhenDetached,
        updatePositionStrategy,
        strategy,
        dir,
        wrapperId,
        style,
        onPlaced,
        customAnchor,
        enabled,
        tooltip,
        content,
        $$slots: { content: true }
      });
    }
  });
}
function Popper_layer($$renderer, $$props) {
  let {
    popper,
    open,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    ref,
    shouldRender,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (shouldRender) {
    $$renderer.push("<!--[-->");
    Popper_layer_inner($$renderer, spread_props([
      {
        popper,
        onEscapeKeydown,
        escapeKeydownBehavior,
        preventOverflowTextSelection,
        id,
        onPointerDown,
        onPointerUp,
        side,
        sideOffset,
        align,
        alignOffset,
        arrowPadding,
        avoidCollisions,
        collisionBoundary,
        collisionPadding,
        sticky,
        hideWhenDetached,
        updatePositionStrategy,
        strategy,
        dir,
        preventScroll,
        wrapperId,
        style,
        onPlaced,
        customAnchor,
        isStatic,
        enabled: open,
        onInteractOutside,
        onCloseAutoFocus,
        onOpenAutoFocus,
        interactOutsideBehavior,
        loop,
        trapFocus,
        isValidEvent: isValidEvent2,
        onFocusOutside,
        forceMount: false,
        ref
      },
      restProps
    ]));
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function Popper_layer_force_mount($$renderer, $$props) {
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  Popper_layer_inner($$renderer, spread_props([
    {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      isStatic,
      enabled,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      interactOutsideBehavior,
      loop,
      trapFocus,
      isValidEvent: isValidEvent2,
      onFocusOutside
    },
    restProps,
    { forceMount: true }
  ]));
}
function Mounted($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { mounted = false, onMountedChange = noop } = $$props;
    bind_props($$props, { mounted });
  });
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let isInside = false;
  const length = polygon.length;
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] ?? [0, 0];
    const [xj, yj] = polygon[j] ?? [0, 0];
    const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
  }
  return isInside;
}
function isInsideRect(point, rect) {
  return point[0] >= rect.left && point[0] <= rect.right && point[1] >= rect.top && point[1] <= rect.bottom;
}
function getSide(triggerRect, contentRect) {
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const triggerCenterY = triggerRect.top + triggerRect.height / 2;
  const contentCenterX = contentRect.left + contentRect.width / 2;
  const contentCenterY = contentRect.top + contentRect.height / 2;
  const deltaX = contentCenterX - triggerCenterX;
  const deltaY = contentCenterY - triggerCenterY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "right" : "left";
  }
  return deltaY > 0 ? "bottom" : "top";
}
class SafePolygon {
  #opts;
  #buffer;
  // tracks the cursor position when leaving trigger or content
  #exitPoint = null;
  // tracks what we're moving toward: "content" when leaving trigger, "trigger" when leaving content
  #exitTarget = null;
  #leaveFallbackRafId = null;
  #cancelLeaveFallback() {
    if (this.#leaveFallbackRafId !== null) {
      cancelAnimationFrame(this.#leaveFallbackRafId);
      this.#leaveFallbackRafId = null;
    }
  }
  #scheduleLeaveFallback() {
    this.#cancelLeaveFallback();
    this.#leaveFallbackRafId = requestAnimationFrame(() => {
      this.#leaveFallbackRafId = null;
      if (!this.#exitPoint || !this.#exitTarget) return;
      this.#clearTracking();
      this.#opts.onPointerExit();
    });
  }
  constructor(opts) {
    this.#opts = opts;
    this.#buffer = opts.buffer ?? 1;
    watch([opts.triggerNode, opts.contentNode, opts.enabled], ([triggerNode, contentNode, enabled]) => {
      if (!triggerNode || !contentNode || !enabled) {
        this.#clearTracking();
        return;
      }
      const doc = getDocument(triggerNode);
      const handlePointerMove = (e) => {
        this.#onPointerMove([e.clientX, e.clientY], triggerNode, contentNode);
      };
      const handleTriggerLeave = (e) => {
        const target = e.relatedTarget;
        if (isElement(target) && contentNode.contains(target)) {
          return;
        }
        const ignoredTargets = this.#opts.ignoredTargets?.() ?? [];
        if (isElement(target) && ignoredTargets.some((n) => n === target || n.contains(target))) {
          return;
        }
        if (isElement(target) && !triggerNode.contains(target) && !contentNode.contains(target) && !target.contains(contentNode)) {
          this.#clearTracking();
          this.#opts.onPointerExit();
          return;
        }
        this.#exitPoint = [e.clientX, e.clientY];
        this.#exitTarget = "content";
        this.#scheduleLeaveFallback();
      };
      const handleTriggerEnter = () => {
        this.#clearTracking();
      };
      const handleContentEnter = () => {
        this.#clearTracking();
      };
      const handleContentLeave = (e) => {
        const target = e.relatedTarget;
        if (isElement(target) && triggerNode.contains(target)) {
          return;
        }
        this.#exitPoint = [e.clientX, e.clientY];
        this.#exitTarget = "trigger";
        this.#scheduleLeaveFallback();
      };
      return [
        on(doc, "pointermove", handlePointerMove),
        on(triggerNode, "pointerleave", handleTriggerLeave),
        on(triggerNode, "pointerenter", handleTriggerEnter),
        on(contentNode, "pointerenter", handleContentEnter),
        on(contentNode, "pointerleave", handleContentLeave)
      ].reduce(
        (acc, cleanup) => () => {
          acc();
          cleanup();
        },
        () => {
        }
      );
    });
  }
  #onPointerMove(clientPoint, triggerNode, contentNode) {
    if (!this.#exitPoint || !this.#exitTarget) return;
    this.#cancelLeaveFallback();
    const triggerRect = triggerNode.getBoundingClientRect();
    const contentRect = contentNode.getBoundingClientRect();
    if (this.#exitTarget === "content" && isInsideRect(clientPoint, contentRect)) {
      this.#clearTracking();
      return;
    }
    if (this.#exitTarget === "trigger" && isInsideRect(clientPoint, triggerRect)) {
      this.#clearTracking();
      return;
    }
    const side = getSide(triggerRect, contentRect);
    const corridorPoly = this.#getCorridorPolygon(triggerRect, contentRect, side);
    if (corridorPoly && isPointInPolygon(clientPoint, corridorPoly)) {
      return;
    }
    const targetRect = this.#exitTarget === "content" ? contentRect : triggerRect;
    const safePoly = this.#getSafePolygon(this.#exitPoint, targetRect, side, this.#exitTarget);
    if (isPointInPolygon(clientPoint, safePoly)) {
      return;
    }
    this.#clearTracking();
    this.#opts.onPointerExit();
  }
  #clearTracking() {
    this.#exitPoint = null;
    this.#exitTarget = null;
    this.#cancelLeaveFallback();
  }
  /**
   * Creates a rectangular corridor between trigger and content
   * This prevents closing when cursor is in the gap between them
   */
  #getCorridorPolygon(triggerRect, contentRect, side) {
    const buffer = this.#buffer;
    switch (side) {
      case "top":
        return [
          [
            Math.min(triggerRect.left, contentRect.left) - buffer,
            triggerRect.top
          ],
          [
            Math.min(triggerRect.left, contentRect.left) - buffer,
            contentRect.bottom
          ],
          [
            Math.max(triggerRect.right, contentRect.right) + buffer,
            contentRect.bottom
          ],
          [
            Math.max(triggerRect.right, contentRect.right) + buffer,
            triggerRect.top
          ]
        ];
      case "bottom":
        return [
          [
            Math.min(triggerRect.left, contentRect.left) - buffer,
            triggerRect.bottom
          ],
          [
            Math.min(triggerRect.left, contentRect.left) - buffer,
            contentRect.top
          ],
          [
            Math.max(triggerRect.right, contentRect.right) + buffer,
            contentRect.top
          ],
          [
            Math.max(triggerRect.right, contentRect.right) + buffer,
            triggerRect.bottom
          ]
        ];
      case "left":
        return [
          [
            triggerRect.left,
            Math.min(triggerRect.top, contentRect.top) - buffer
          ],
          [
            contentRect.right,
            Math.min(triggerRect.top, contentRect.top) - buffer
          ],
          [
            contentRect.right,
            Math.max(triggerRect.bottom, contentRect.bottom) + buffer
          ],
          [
            triggerRect.left,
            Math.max(triggerRect.bottom, contentRect.bottom) + buffer
          ]
        ];
      case "right":
        return [
          [
            triggerRect.right,
            Math.min(triggerRect.top, contentRect.top) - buffer
          ],
          [
            contentRect.left,
            Math.min(triggerRect.top, contentRect.top) - buffer
          ],
          [
            contentRect.left,
            Math.max(triggerRect.bottom, contentRect.bottom) + buffer
          ],
          [
            triggerRect.right,
            Math.max(triggerRect.bottom, contentRect.bottom) + buffer
          ]
        ];
    }
  }
  /**
   * Creates a triangular/trapezoidal safe zone from the exit point to the target
   */
  #getSafePolygon(exitPoint, targetRect, side, exitTarget) {
    const buffer = this.#buffer * 4;
    const [x, y] = exitPoint;
    const effectiveSide = exitTarget === "trigger" ? this.#flipSide(side) : side;
    switch (effectiveSide) {
      case "top":
        return [
          [x - buffer, y + buffer],
          [x + buffer, y + buffer],
          [targetRect.right + buffer, targetRect.bottom],
          [targetRect.right + buffer, targetRect.top],
          [targetRect.left - buffer, targetRect.top],
          [targetRect.left - buffer, targetRect.bottom]
        ];
      case "bottom":
        return [
          [x - buffer, y - buffer],
          [x + buffer, y - buffer],
          [targetRect.right + buffer, targetRect.top],
          [targetRect.right + buffer, targetRect.bottom],
          [targetRect.left - buffer, targetRect.bottom],
          [targetRect.left - buffer, targetRect.top]
        ];
      case "left":
        return [
          [x + buffer, y - buffer],
          [x + buffer, y + buffer],
          [targetRect.right, targetRect.bottom + buffer],
          [targetRect.left, targetRect.bottom + buffer],
          [targetRect.left, targetRect.top - buffer],
          [targetRect.right, targetRect.top - buffer]
        ];
      case "right":
        return [
          [x - buffer, y - buffer],
          [x - buffer, y + buffer],
          [targetRect.left, targetRect.bottom + buffer],
          [targetRect.right, targetRect.bottom + buffer],
          [targetRect.right, targetRect.top - buffer],
          [targetRect.left, targetRect.top - buffer]
        ];
    }
  }
  #flipSide(side) {
    switch (side) {
      case "top":
        return "bottom";
      case "bottom":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
    }
  }
}
const popoverAttrs = createBitsAttrs({
  component: "popover",
  parts: ["root", "trigger", "content", "close", "overlay"]
});
const PopoverRootContext = new Context("Popover.Root");
class PopoverRootState {
  static create(opts) {
    return PopoverRootContext.set(new PopoverRootState(opts));
  }
  opts;
  contentNode = null;
  contentPresence;
  triggerNode = null;
  overlayNode = null;
  overlayPresence;
  // hover tracking state
  openedViaHover = false;
  hasInteractedWithContent = false;
  hoverCooldown = false;
  closeDelay = 0;
  #closeTimeout = null;
  #domContext = null;
  constructor(opts) {
    this.opts = opts;
    this.contentPresence = new PresenceManager({
      ref: boxWith(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
    this.overlayPresence = new PresenceManager({ ref: boxWith(() => this.overlayNode), open: this.opts.open });
    watch(() => this.opts.open.current, (isOpen) => {
      if (!isOpen) {
        this.openedViaHover = false;
        this.hasInteractedWithContent = false;
        this.#clearCloseTimeout();
      }
    });
  }
  setDomContext(ctx) {
    this.#domContext = ctx;
  }
  #clearCloseTimeout() {
    if (this.#closeTimeout !== null && this.#domContext) {
      this.#domContext.clearTimeout(this.#closeTimeout);
      this.#closeTimeout = null;
    }
  }
  toggleOpen() {
    this.#clearCloseTimeout();
    this.opts.open.current = !this.opts.open.current;
  }
  handleClose() {
    this.#clearCloseTimeout();
    if (!this.opts.open.current) return;
    this.opts.open.current = false;
  }
  handleHoverOpen() {
    this.#clearCloseTimeout();
    if (this.opts.open.current) return;
    this.openedViaHover = true;
    this.opts.open.current = true;
  }
  handleHoverClose() {
    if (!this.opts.open.current) return;
    if (this.openedViaHover && !this.hasInteractedWithContent) {
      this.opts.open.current = false;
    }
  }
  handleDelayedHoverClose() {
    if (!this.opts.open.current) return;
    if (!this.openedViaHover || this.hasInteractedWithContent) return;
    this.#clearCloseTimeout();
    if (this.closeDelay <= 0) {
      this.opts.open.current = false;
    } else if (this.#domContext) {
      this.#closeTimeout = this.#domContext.setTimeout(
        () => {
          if (this.openedViaHover && !this.hasInteractedWithContent) {
            this.opts.open.current = false;
          }
          this.#closeTimeout = null;
        },
        this.closeDelay
      );
    }
  }
  cancelDelayedClose() {
    this.#clearCloseTimeout();
  }
  markInteraction() {
    this.hasInteractedWithContent = true;
    this.#clearCloseTimeout();
  }
}
class PopoverTriggerState {
  static create(opts) {
    return new PopoverTriggerState(opts, PopoverRootContext.get());
  }
  opts;
  root;
  attachment;
  domContext;
  #openTimeout = null;
  #closeTimeout = null;
  #isHovering = false;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.triggerNode = v);
    this.domContext = new DOMContext(opts.ref);
    this.root.setDomContext(this.domContext);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
    watch(() => this.opts.closeDelay.current, (delay) => {
      this.root.closeDelay = delay;
    });
  }
  #clearOpenTimeout() {
    if (this.#openTimeout !== null) {
      this.domContext.clearTimeout(this.#openTimeout);
      this.#openTimeout = null;
    }
  }
  #clearCloseTimeout() {
    if (this.#closeTimeout !== null) {
      this.domContext.clearTimeout(this.#closeTimeout);
      this.#closeTimeout = null;
    }
  }
  #clearAllTimeouts() {
    this.#clearOpenTimeout();
    this.#clearCloseTimeout();
  }
  onpointerenter(e) {
    if (this.opts.disabled.current) return;
    if (!this.opts.openOnHover.current) return;
    if (isTouch(e)) return;
    this.#isHovering = true;
    this.#clearCloseTimeout();
    this.root.cancelDelayedClose();
    if (this.root.opts.open.current || this.root.hoverCooldown) return;
    const delay = this.opts.openDelay.current;
    if (delay <= 0) {
      this.root.handleHoverOpen();
    } else {
      this.#openTimeout = this.domContext.setTimeout(
        () => {
          this.root.handleHoverOpen();
          this.#openTimeout = null;
        },
        delay
      );
    }
  }
  onpointerleave(e) {
    if (this.opts.disabled.current) return;
    if (!this.opts.openOnHover.current) return;
    if (isTouch(e)) return;
    this.#isHovering = false;
    this.#clearOpenTimeout();
    this.root.hoverCooldown = false;
  }
  onclick(e) {
    if (this.opts.disabled.current) return;
    if (e.button !== 0) return;
    this.#clearAllTimeouts();
    if (this.#isHovering && this.root.opts.open.current && this.root.openedViaHover) {
      this.root.openedViaHover = false;
      this.root.hasInteractedWithContent = true;
      return;
    }
    if (this.#isHovering && this.opts.openOnHover.current && this.root.opts.open.current) {
      this.root.hoverCooldown = true;
    }
    if (this.root.hoverCooldown && !this.root.opts.open.current) {
      this.root.hoverCooldown = false;
    }
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (!(e.key === ENTER || e.key === SPACE)) return;
    e.preventDefault();
    this.#clearAllTimeouts();
    this.root.toggleOpen();
  }
  #getAriaControls() {
    if (this.root.opts.open.current && this.root.contentNode?.id) {
      return this.root.contentNode?.id;
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": boolToStr(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "aria-controls": this.#getAriaControls(),
    [popoverAttrs.trigger]: "",
    disabled: this.opts.disabled.current,
    //
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class PopoverContentState {
  static create(opts) {
    return new PopoverContentState(opts, PopoverRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onfocusin = this.onfocusin.bind(this);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
    new SafePolygon({
      triggerNode: () => this.root.triggerNode,
      contentNode: () => this.root.contentNode,
      enabled: () => this.root.opts.open.current && this.root.openedViaHover && !this.root.hasInteractedWithContent,
      onPointerExit: () => {
        this.root.handleDelayedHoverClose();
      }
    });
  }
  onpointerdown(_) {
    this.root.markInteraction();
  }
  onfocusin(e) {
    const target = e.target;
    if (isElement(target) && isTabbable(target)) {
      this.root.markInteraction();
    }
  }
  onpointerenter(e) {
    if (isTouch(e)) return;
    this.root.cancelDelayedClose();
  }
  onpointerleave(e) {
    if (isTouch(e)) return;
  }
  onInteractOutside = (e) => {
    this.opts.onInteractOutside.current(e);
    if (e.defaultPrevented) return;
    if (!isElement(e.target)) return;
    const closestTrigger = e.target.closest(popoverAttrs.selector("trigger"));
    if (closestTrigger && closestTrigger === this.root.triggerNode) return;
    if (this.opts.customAnchor.current) {
      if (isElement(this.opts.customAnchor.current)) {
        if (this.opts.customAnchor.current.contains(e.target)) return;
      } else if (typeof this.opts.customAnchor.current === "string") {
        const el = document.querySelector(this.opts.customAnchor.current);
        if (el && el.contains(e.target)) return;
      }
    }
    this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  get shouldRender() {
    return this.root.contentPresence.shouldRender;
  }
  get shouldTrapFocus() {
    if (this.root.openedViaHover && !this.root.hasInteractedWithContent) return false;
    return true;
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    [popoverAttrs.content]: "",
    style: { pointerEvents: "auto", contain: "layout style" },
    onpointerdown: this.onpointerdown,
    onfocusin: this.onfocusin,
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown
  };
}
function Popover_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      ref = null,
      id = createId(uid),
      forceMount = false,
      onOpenAutoFocus = noop,
      onCloseAutoFocus = noop,
      onEscapeKeydown = noop,
      onInteractOutside = noop,
      trapFocus = true,
      preventScroll = false,
      customAnchor = null,
      style,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = PopoverContentState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      onInteractOutside: boxWith(() => onInteractOutside),
      onEscapeKeydown: boxWith(() => onEscapeKeydown),
      customAnchor: boxWith(() => customAnchor)
    });
    const mergedProps = derived(() => mergeProps(restProps, contentState.props));
    const effectiveTrapFocus = derived(() => trapFocus && contentState.shouldTrapFocus);
    function handleOpenAutoFocus(e) {
      if (!contentState.shouldTrapFocus) {
        e.preventDefault();
      }
      onOpenAutoFocus(e);
    }
    if (forceMount) {
      $$renderer2.push("<!--[-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") }, { style });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer_force_mount($$renderer2, spread_props([
          mergedProps(),
          contentState.popperProps,
          {
            ref: contentState.opts.ref,
            enabled: contentState.root.opts.open.current,
            id,
            trapFocus: effectiveTrapFocus(),
            preventScroll,
            loop: true,
            forceMount: true,
            customAnchor,
            onOpenAutoFocus: handleOpenAutoFocus,
            onCloseAutoFocus,
            shouldRender: contentState.shouldRender,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else if (!forceMount) {
      $$renderer2.push("<!--[1-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") }, { style });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer($$renderer2, spread_props([
          mergedProps(),
          contentState.popperProps,
          {
            ref: contentState.opts.ref,
            open: contentState.root.opts.open.current,
            id,
            trapFocus: effectiveTrapFocus(),
            preventScroll,
            loop: true,
            forceMount: false,
            customAnchor,
            onOpenAutoFocus: handleOpenAutoFocus,
            onCloseAutoFocus,
            shouldRender: contentState.shouldRender,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Popover_trigger$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      children,
      child,
      id = createId(uid),
      ref = null,
      type = "button",
      disabled = false,
      openOnHover = false,
      openDelay = 700,
      closeDelay = 300,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = PopoverTriggerState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      disabled: boxWith(() => Boolean(disabled)),
      openOnHover: boxWith(() => openOnHover),
      openDelay: boxWith(() => openDelay),
      closeDelay: boxWith(() => closeDelay)
    });
    const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { type }));
    Floating_layer_anchor($$renderer2, {
      id,
      ref: triggerState.opts.ref,
      children: ($$renderer3) => {
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, { props: mergedProps() });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<button${attributes({ ...mergedProps() })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></button>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    bind_props($$props, { ref });
  });
}
const ignoredElement = ["INPUT", "TEXTAREA"];
function useArrowNavigation(e, currentElement, parentElement, options) {
  if (!currentElement || ignoredElement.includes(currentElement.nodeName)) {
    return null;
  }
  const { arrowKeyOptions = "both", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
  const [right, left, up, down, home, end] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ];
  const goingVertical = up || down;
  const goingHorizontal = right || left;
  if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical))
    return null;
  const allCollectionItems = itemsArray;
  if (!allCollectionItems.length)
    return null;
  if (preventScroll)
    e.preventDefault();
  let item = null;
  if (goingHorizontal || goingVertical) {
    const goForward = goingVertical ? down : dir === "ltr" ? right : left;
    item = findNextFocusableElement(allCollectionItems, currentElement, {
      goForward,
      loop
    });
  } else if (home) {
    item = allCollectionItems.at(0) || null;
  } else if (end) {
    item = allCollectionItems.at(-1) || null;
  }
  if (focus)
    item?.focus();
  return item;
}
function findNextFocusableElement(elements, currentElement, { goForward, loop }, iterations = elements.length) {
  if (--iterations === 0)
    return null;
  const index = elements.indexOf(currentElement);
  const newIndex = goForward ? index + 1 : index - 1;
  if (!loop && (newIndex < 0 || newIndex >= elements.length))
    return null;
  const adjustedNewIndex = (newIndex + elements.length) % elements.length;
  const candidate = elements[adjustedNewIndex];
  if (!candidate)
    return null;
  const isDisabled = candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false";
  if (isDisabled) {
    return findNextFocusableElement(elements, candidate, { goForward, loop }, iterations);
  }
  return candidate;
}
class SvelteResizeObserver {
  #node;
  #onResize;
  constructor(node, onResize) {
    this.#node = node;
    this.#onResize = onResize;
    this.handler = this.handler.bind(this);
  }
  handler() {
    let rAF = 0;
    const _node = this.#node();
    if (!_node) return;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rAF);
      rAF = window.requestAnimationFrame(this.#onResize);
    });
    resizeObserver.observe(_node);
    return () => {
      window.cancelAnimationFrame(rAF);
      resizeObserver.unobserve(_node);
    };
  }
}
const navigationMenuAttrs = createBitsAttrs({
  component: "navigation-menu",
  parts: [
    "root",
    "sub",
    "item",
    "list",
    "trigger",
    "content",
    "link",
    "viewport",
    "menu",
    "indicator"
  ]
});
const NavigationMenuProviderContext = new Context("NavigationMenu.Root");
const NavigationMenuItemContext = new Context("NavigationMenu.Item");
const NavigationMenuListContext = new Context("NavigationMenu.List");
const NavigationMenuContentContext = new Context("NavigationMenu.Content");
const NavigationMenuSubContext = new Context("NavigationMenu.Sub");
class NavigationMenuProviderState {
  static create(opts) {
    return NavigationMenuProviderContext.set(new NavigationMenuProviderState(opts));
  }
  opts;
  indicatorTrackRef = simpleBox(null);
  viewportRef = simpleBox(null);
  viewportContent = new SvelteMap();
  onTriggerEnter;
  onTriggerLeave = noop;
  onContentEnter = noop;
  onContentLeave = noop;
  onItemSelect;
  onItemDismiss;
  activeItem = null;
  prevActiveItem = null;
  constructor(opts) {
    this.opts = opts;
    this.onTriggerEnter = opts.onTriggerEnter;
    this.onTriggerLeave = opts.onTriggerLeave ?? noop;
    this.onContentEnter = opts.onContentEnter ?? noop;
    this.onContentLeave = opts.onContentLeave ?? noop;
    this.onItemDismiss = opts.onItemDismiss;
    this.onItemSelect = opts.onItemSelect;
  }
  setActiveItem = (item) => {
    this.prevActiveItem = this.activeItem;
    this.activeItem = item;
  };
}
class NavigationMenuRootState {
  static create(opts) {
    return new NavigationMenuRootState(opts);
  }
  opts;
  attachment;
  provider;
  previousValue = simpleBox("");
  isDelaySkipped;
  #derivedDelay = derived(() => {
    const isOpen = this.opts?.value?.current !== "";
    if (isOpen || this.isDelaySkipped.current) {
      return 100;
    } else {
      return this.opts.delayDuration.current;
    }
  });
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
    this.isDelaySkipped = boxAutoReset(false, {
      afterMs: this.opts.skipDelayDuration.current,
      getWindow: () => getWindow(opts.ref.current)
    });
    this.provider = NavigationMenuProviderState.create({
      value: this.opts.value,
      previousValue: this.previousValue,
      dir: this.opts.dir,
      orientation: this.opts.orientation,
      rootNavigationMenuRef: this.opts.ref,
      isRootMenu: true,
      onTriggerEnter: (itemValue, itemState) => {
        this.#onTriggerEnter(itemValue, itemState);
      },
      onTriggerLeave: this.#onTriggerLeave,
      onContentEnter: this.#onContentEnter,
      onContentLeave: this.#onContentLeave,
      onItemSelect: this.#onItemSelect,
      onItemDismiss: this.#onItemDismiss
    });
  }
  #debouncedFn = useDebounce(
    (val, itemState) => {
      if (typeof val === "string") {
        this.setValue(val, itemState);
      }
    },
    () => this.#derivedDelay()
  );
  #onTriggerEnter = (itemValue, itemState) => {
    this.#debouncedFn(itemValue, itemState);
  };
  #onTriggerLeave = () => {
    this.isDelaySkipped.current = false;
    this.#debouncedFn("", null);
  };
  #onContentEnter = () => {
    this.#debouncedFn(void 0, null);
  };
  #onContentLeave = () => {
    if (this.provider.activeItem && this.provider.activeItem.opts.openOnHover.current === false) {
      return;
    }
    this.#debouncedFn("", null);
  };
  #onItemSelect = (itemValue, itemState) => {
    this.setValue(itemValue, itemState);
  };
  #onItemDismiss = () => {
    this.setValue("", null);
  };
  setValue = (newValue, itemState) => {
    this.previousValue.current = this.opts.value.current;
    this.opts.value.current = newValue;
    this.provider.setActiveItem(itemState);
    if (newValue === "") {
      this.previousValue.current = "";
    }
  };
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": this.opts.orientation.current,
    dir: this.opts.dir.current,
    [navigationMenuAttrs.root]: "",
    [navigationMenuAttrs.menu]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuListState {
  static create(opts) {
    return NavigationMenuListContext.set(new NavigationMenuListState(opts, NavigationMenuProviderContext.get()));
  }
  wrapperId = simpleBox(useId());
  wrapperRef = simpleBox(null);
  opts;
  context;
  attachment;
  wrapperAttachment = attachRef(this.wrapperRef, (v) => this.context.indicatorTrackRef.current = v);
  listTriggers = [];
  rovingFocusGroup;
  wrapperMounted = false;
  constructor(opts, context) {
    this.opts = opts;
    this.context = context;
    this.attachment = attachRef(this.opts.ref);
    this.rovingFocusGroup = new RovingFocusGroup({
      rootNode: opts.ref,
      candidateSelector: `${navigationMenuAttrs.selector("trigger")}:not([data-disabled]), ${navigationMenuAttrs.selector("link")}:not([data-disabled])`,
      loop: boxWith(() => false),
      orientation: this.context.opts.orientation
    });
  }
  registerTrigger(trigger) {
    if (trigger) this.listTriggers.push(trigger);
    return () => {
      this.listTriggers = this.listTriggers.filter((t2) => t2.id !== trigger.id);
    };
  }
  #wrapperProps = derived(() => ({ id: this.wrapperId.current, ...this.wrapperAttachment }));
  get wrapperProps() {
    return this.#wrapperProps();
  }
  set wrapperProps($$value) {
    return this.#wrapperProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": this.context.opts.orientation.current,
    [navigationMenuAttrs.list]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuItemState {
  static create(opts) {
    return NavigationMenuItemContext.set(new NavigationMenuItemState(opts, NavigationMenuListContext.get()));
  }
  opts;
  attachment;
  listContext;
  contentNode = null;
  triggerNode = null;
  focusProxyNode = null;
  restoreContentTabOrder = noop;
  wasEscapeClose = false;
  #contentId = derived(() => this.contentNode?.id);
  get contentId() {
    return this.#contentId();
  }
  set contentId($$value) {
    return this.#contentId($$value);
  }
  #triggerId = derived(() => this.triggerNode?.id);
  get triggerId() {
    return this.#triggerId();
  }
  set triggerId($$value) {
    return this.#triggerId($$value);
  }
  contentChildren = simpleBox(void 0);
  contentChild = simpleBox(void 0);
  contentProps = simpleBox({});
  domContext;
  constructor(opts, listContext) {
    this.opts = opts;
    this.listContext = listContext;
    this.domContext = new DOMContext(opts.ref);
    this.attachment = attachRef(this.opts.ref);
  }
  #handleContentEntry = (side = "start") => {
    if (!this.contentNode) return;
    this.restoreContentTabOrder();
    const candidates = getTabbableCandidates(this.contentNode);
    if (candidates.length) focusFirst(side === "start" ? candidates : candidates.reverse(), () => this.domContext.getActiveElement());
  };
  #handleContentExit = () => {
    if (!this.contentNode) return;
    const candidates = getTabbableCandidates(this.contentNode);
    if (candidates.length) this.restoreContentTabOrder = removeFromTabOrder(candidates);
  };
  onEntryKeydown = this.#handleContentEntry;
  onFocusProxyEnter = this.#handleContentEntry;
  onRootContentClose = this.#handleContentExit;
  onContentFocusOutside = this.#handleContentExit;
  #props = derived(() => ({
    id: this.opts.id.current,
    [navigationMenuAttrs.item]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuTriggerState {
  static create(opts) {
    return new NavigationMenuTriggerState(opts, {
      provider: NavigationMenuProviderContext.get(),
      item: NavigationMenuItemContext.get(),
      list: NavigationMenuListContext.get(),
      sub: NavigationMenuSubContext.getOr(null)
    });
  }
  opts;
  attachment;
  focusProxyId = simpleBox(useId());
  focusProxyRef = simpleBox(null);
  focusProxyAttachment = attachRef(this.focusProxyRef, (v) => this.itemContext.focusProxyNode = v);
  context;
  itemContext;
  listContext;
  hasPointerMoveOpened = simpleBox(false);
  wasClickClose = false;
  focusProxyMounted = false;
  #open = derived(() => this.itemContext.opts.value.current === this.context.opts.value.current);
  get open() {
    return this.#open();
  }
  set open($$value) {
    return this.#open($$value);
  }
  constructor(opts, context) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref, (v) => this.itemContext.triggerNode = v);
    this.hasPointerMoveOpened = boxAutoReset(false, { afterMs: 300, getWindow: () => getWindow(opts.ref.current) });
    this.context = context.provider;
    this.itemContext = context.item;
    this.listContext = context.list;
    watch(() => this.opts.ref.current, () => {
      const node = this.opts.ref.current;
      if (!node) return;
      return this.listContext.registerTrigger(node);
    });
  }
  onpointerenter = (_) => {
    this.wasClickClose = false;
    this.itemContext.wasEscapeClose = false;
  };
  onpointermove = whenMouse(() => {
    if (this.opts.disabled.current || this.wasClickClose || this.itemContext.wasEscapeClose || this.hasPointerMoveOpened.current || !this.itemContext.opts.openOnHover.current) {
      return;
    }
    this.context.onTriggerEnter(this.itemContext.opts.value.current, this.itemContext);
    this.hasPointerMoveOpened.current = true;
  });
  onpointerleave = whenMouse(() => {
    if (this.opts.disabled.current || !this.itemContext.opts.openOnHover.current) return;
    this.context.onTriggerLeave();
    this.hasPointerMoveOpened.current = false;
  });
  onclick = () => {
    if (this.hasPointerMoveOpened.current) return;
    const shouldClose = this.open && (!this.itemContext.opts.openOnHover.current || this.context.opts.isRootMenu);
    if (shouldClose) {
      this.context.onItemSelect("", null);
    } else if (!this.open) {
      this.context.onItemSelect(this.itemContext.opts.value.current, this.itemContext);
    }
    this.wasClickClose = shouldClose;
  };
  onkeydown = (e) => {
    const verticalEntryKey = this.context.opts.dir.current === "rtl" ? ARROW_LEFT : ARROW_RIGHT;
    const entryKey = { horizontal: ARROW_DOWN, vertical: verticalEntryKey }[this.context.opts.orientation.current];
    if (this.open && e.key === entryKey) {
      this.itemContext.onEntryKeydown();
      e.preventDefault();
      return;
    }
    this.itemContext.listContext.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
  };
  focusProxyOnFocus = (e) => {
    const content = this.itemContext.contentNode;
    const prevFocusedElement = e.relatedTarget;
    const wasTriggerFocused = this.opts.ref.current && prevFocusedElement === this.opts.ref.current;
    const wasFocusFromContent = content?.contains(prevFocusedElement);
    if (wasTriggerFocused || !wasFocusFromContent) {
      this.itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
    }
  };
  #props = derived(() => ({
    id: this.opts.id.current,
    disabled: this.opts.disabled.current,
    "data-disabled": boolToEmptyStrOrUndef(Boolean(this.opts.disabled.current)),
    "data-state": getDataOpenClosed(this.open),
    "data-value": this.itemContext.opts.value.current,
    "aria-expanded": boolToStr(this.open),
    "aria-controls": this.itemContext.contentId,
    [navigationMenuAttrs.trigger]: "",
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave,
    onpointerenter: this.onpointerenter,
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #focusProxyProps = derived(() => ({
    id: this.focusProxyId.current,
    tabindex: 0,
    onfocus: this.focusProxyOnFocus,
    ...this.focusProxyAttachment
  }));
  get focusProxyProps() {
    return this.#focusProxyProps();
  }
  set focusProxyProps($$value) {
    return this.#focusProxyProps($$value);
  }
}
const LINK_SELECT_EVENT = new CustomEventDispatcher("bitsLinkSelect", { bubbles: true, cancelable: true });
const ROOT_CONTENT_DISMISS_EVENT = new CustomEventDispatcher("bitsRootContentDismiss", { cancelable: true, bubbles: true });
class NavigationMenuLinkState {
  static create(opts) {
    return new NavigationMenuLinkState(opts, {
      provider: NavigationMenuProviderContext.get(),
      item: NavigationMenuItemContext.get()
    });
  }
  opts;
  context;
  attachment;
  isFocused = false;
  constructor(opts, context) {
    this.opts = opts;
    this.context = context;
    this.attachment = attachRef(this.opts.ref);
  }
  onclick = (e) => {
    const currTarget = e.currentTarget;
    LINK_SELECT_EVENT.listen(currTarget, (e2) => this.opts.onSelect.current(e2), { once: true });
    const linkSelectEvent = LINK_SELECT_EVENT.dispatch(currTarget);
    if (!linkSelectEvent.defaultPrevented && !e.metaKey) {
      ROOT_CONTENT_DISMISS_EVENT.dispatch(currTarget);
    }
  };
  onkeydown = (e) => {
    if (this.context.item.contentNode) return;
    this.context.item.listContext.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
  };
  onfocus = (_) => {
    this.isFocused = true;
  };
  onblur = (_) => {
    this.isFocused = false;
  };
  #handlePointerDismiss = () => {
    const currentlyOpenValue = this.context.provider.opts.value.current;
    const isInsideOpenSubmenu = this.context.item.opts.value.current === currentlyOpenValue;
    const activeItem = this.context.item.listContext.context.activeItem;
    if (activeItem && !activeItem.opts.openOnHover.current) return;
    if (currentlyOpenValue && !isInsideOpenSubmenu) {
      this.context.provider.onItemDismiss();
    }
  };
  onpointerenter = () => {
    this.#handlePointerDismiss();
  };
  onpointermove = whenMouse(() => {
    this.#handlePointerDismiss();
  });
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-active": this.opts.active.current ? "" : void 0,
    "aria-current": this.opts.active.current ? "page" : void 0,
    "data-focused": this.isFocused ? "" : void 0,
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    onfocus: this.onfocus,
    onblur: this.onblur,
    onpointerenter: this.onpointerenter,
    onpointermove: this.onpointermove,
    [navigationMenuAttrs.link]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuContentState {
  static create(opts) {
    return NavigationMenuContentContext.set(new NavigationMenuContentState(opts, {
      provider: NavigationMenuProviderContext.get(),
      item: NavigationMenuItemContext.get(),
      list: NavigationMenuListContext.get()
    }));
  }
  opts;
  context;
  itemContext;
  listContext;
  attachment;
  mounted = false;
  #open = derived(() => this.itemContext.opts.value.current === this.context.opts.value.current);
  get open() {
    return this.#open();
  }
  set open($$value) {
    return this.#open($$value);
  }
  #value = derived(() => this.itemContext.opts.value.current);
  get value() {
    return this.#value();
  }
  set value($$value) {
    return this.#value($$value);
  }
  #isLastActiveValue = derived(() => {
    if (this.context.viewportRef.current) {
      if (!this.context.opts.value.current && this.context.opts.previousValue.current) {
        return this.context.opts.previousValue.current === this.itemContext.opts.value.current;
      }
    }
    return false;
  });
  get isLastActiveValue() {
    return this.#isLastActiveValue();
  }
  set isLastActiveValue($$value) {
    return this.#isLastActiveValue($$value);
  }
  constructor(opts, context) {
    this.opts = opts;
    this.context = context.provider;
    this.itemContext = context.item;
    this.listContext = context.list;
    this.attachment = attachRef(this.opts.ref, (v) => this.itemContext.contentNode = v);
  }
  onpointerenter = (_) => {
    this.context.onContentEnter();
  };
  onpointerleave = whenMouse(() => {
    if (!this.itemContext.opts.openOnHover.current) return;
    this.context.onContentLeave();
  });
  #props = derived(() => ({
    id: this.opts.id.current,
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuContentImplState {
  static create(opts, itemState) {
    return new NavigationMenuContentImplState(opts, itemState ?? NavigationMenuItemContext.get());
  }
  opts;
  itemContext;
  context;
  listContext;
  attachment;
  prevMotionAttribute = null;
  #motionAttribute = derived(() => {
    const items = this.listContext.listTriggers;
    const values = items.map((item) => item.getAttribute("data-value")).filter(Boolean);
    if (this.context.opts.dir.current === "rtl") values.reverse();
    const index = values.indexOf(this.context.opts.value.current);
    const prevIndex = values.indexOf(this.context.opts.previousValue.current);
    const isSelected = this.itemContext.opts.value.current === this.context.opts.value.current;
    const wasSelected = prevIndex === values.indexOf(this.itemContext.opts.value.current);
    if (!this.context.opts.value.current && !this.context.opts.previousValue.current) {
      run(() => this.prevMotionAttribute = null);
      return null;
    }
    if (!isSelected && !wasSelected) return run(() => this.prevMotionAttribute);
    const attribute = (() => {
      if (index !== prevIndex) {
        if (isSelected && prevIndex !== -1) return index > prevIndex ? "from-end" : "from-start";
        if (wasSelected && index !== -1) return index > prevIndex ? "to-start" : "to-end";
      }
      return null;
    })();
    run(() => this.prevMotionAttribute = attribute);
    return attribute;
  });
  get motionAttribute() {
    return this.#motionAttribute();
  }
  set motionAttribute($$value) {
    return this.#motionAttribute($$value);
  }
  domContext;
  constructor(opts, itemContext) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
    this.itemContext = itemContext;
    this.listContext = itemContext.listContext;
    this.context = itemContext.listContext.context;
    this.domContext = new DOMContext(opts.ref);
    watch(
      [
        () => this.itemContext.opts.value.current,
        () => this.itemContext.triggerNode,
        () => this.opts.ref.current
      ],
      () => {
        const content = this.opts.ref.current;
        if (!(content && this.context.opts.isRootMenu)) return;
        const handleClose = () => {
          this.context.onItemDismiss();
          this.itemContext.onRootContentClose();
          if (content.contains(this.domContext.getActiveElement())) {
            this.itemContext.triggerNode?.focus();
          }
        };
        const removeListener = ROOT_CONTENT_DISMISS_EVENT.listen(content, handleClose);
        return () => {
          removeListener();
        };
      }
    );
  }
  onFocusOutside = (e) => {
    this.itemContext.onContentFocusOutside();
    const target = e.target;
    if (this.context.opts.rootNavigationMenuRef.current?.contains(target)) {
      e.preventDefault();
      return;
    }
    this.context.onItemDismiss();
  };
  onInteractOutside = (e) => {
    const target = e.target;
    const isTrigger = this.listContext.listTriggers.some((trigger) => trigger.contains(target));
    const isRootViewport = this.context.opts.isRootMenu && this.context.viewportRef.current?.contains(target);
    if (!this.context.opts.isRootMenu && !isTrigger) {
      this.context.onItemDismiss();
      return;
    }
    if (isTrigger || isRootViewport) {
      e.preventDefault();
      return;
    }
    if (!this.itemContext.opts.openOnHover.current) {
      this.context.onItemSelect("", null);
    }
  };
  onkeydown = (e) => {
    const target = e.target;
    if (!isElement(target)) return;
    if (target.closest(navigationMenuAttrs.selector("menu")) !== this.context.opts.rootNavigationMenuRef.current) return;
    const isMetaKey = e.altKey || e.ctrlKey || e.metaKey;
    const isTabKey = e.key === TAB && !isMetaKey;
    const candidates = getTabbableCandidates(e.currentTarget);
    if (isTabKey) {
      const focusedElement = this.domContext.getActiveElement();
      const index = candidates.findIndex((candidate) => candidate === focusedElement);
      const isMovingBackwards = e.shiftKey;
      const nextCandidates = isMovingBackwards ? candidates.slice(0, index).reverse() : candidates.slice(index + 1, candidates.length);
      if (focusFirst(nextCandidates, () => this.domContext.getActiveElement())) {
        e.preventDefault();
        return;
      } else {
        handleProxyFocus(this.itemContext.focusProxyNode);
        return;
      }
    }
    let activeEl = this.domContext.getActiveElement();
    if (this.itemContext.contentNode) {
      const focusedNode = this.itemContext.contentNode.querySelector("[data-focused]");
      if (focusedNode) {
        activeEl = focusedNode;
      }
    }
    if (activeEl === this.itemContext.triggerNode) return;
    const newSelectedElement = useArrowNavigation(e, activeEl, void 0, {
      itemsArray: candidates,
      candidateSelector: navigationMenuAttrs.selector("link"),
      loop: false
    });
    newSelectedElement?.focus();
  };
  onEscapeKeydown = (_) => {
    this.context.onItemDismiss();
    this.itemContext.triggerNode?.focus();
    this.itemContext.wasEscapeClose = true;
  };
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-labelledby": this.itemContext.triggerId,
    "data-motion": this.motionAttribute ?? void 0,
    "data-orientation": this.context.opts.orientation.current,
    "data-state": getDataOpenClosed(this.context.opts.value.current === this.itemContext.opts.value.current),
    onkeydown: this.onkeydown,
    [navigationMenuAttrs.content]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuViewportState {
  static create(opts) {
    return new NavigationMenuViewportState(opts, NavigationMenuProviderContext.get());
  }
  opts;
  context;
  attachment;
  #open = derived(() => !!this.context.opts.value.current);
  get open() {
    return this.#open();
  }
  set open($$value) {
    return this.#open($$value);
  }
  #viewportWidth = derived(() => this.size ? `${this.size.width}px` : void 0);
  get viewportWidth() {
    return this.#viewportWidth();
  }
  set viewportWidth($$value) {
    return this.#viewportWidth($$value);
  }
  #viewportHeight = derived(() => this.size ? `${this.size.height}px` : void 0);
  get viewportHeight() {
    return this.#viewportHeight();
  }
  set viewportHeight($$value) {
    return this.#viewportHeight($$value);
  }
  #activeContentValue = derived(() => this.context.opts.value.current);
  get activeContentValue() {
    return this.#activeContentValue();
  }
  set activeContentValue($$value) {
    return this.#activeContentValue($$value);
  }
  size = null;
  contentNode = null;
  mounted = false;
  constructor(opts, context) {
    this.opts = opts;
    this.context = context;
    this.attachment = attachRef(this.opts.ref, (v) => this.context.viewportRef.current = v);
    watch([() => this.activeContentValue, () => this.open], () => {
      afterTick(() => {
        const currNode = this.context.viewportRef.current;
        if (!currNode) return;
        const el = currNode.querySelector("[data-state=open]")?.children?.[0] ?? null;
        this.contentNode = el;
      });
    });
    new SvelteResizeObserver(() => this.contentNode, () => {
      if (this.contentNode) {
        this.size = {
          width: this.contentNode.offsetWidth,
          height: this.contentNode.offsetHeight
        };
      }
    });
    watch(() => this.mounted, () => {
      if (!this.mounted && this.size) {
        this.size = null;
      }
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": getDataOpenClosed(this.open),
    "data-orientation": this.context.opts.orientation.current,
    style: {
      pointerEvents: !this.open && this.context.opts.isRootMenu ? "none" : void 0,
      "--bits-navigation-menu-viewport-width": this.viewportWidth,
      "--bits-navigation-menu-viewport-height": this.viewportHeight
    },
    [navigationMenuAttrs.viewport]: "",
    onpointerenter: this.context.onContentEnter,
    onpointerleave: this.context.onContentLeave,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function focusFirst(candidates, getActiveElement) {
  const previouslyFocusedElement = getActiveElement();
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement) return true;
    candidate.focus();
    return getActiveElement() !== previouslyFocusedElement;
  });
}
function removeFromTabOrder(candidates) {
  candidates.forEach((candidate) => {
    candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
    candidate.setAttribute("tabindex", "-1");
  });
  return () => {
    candidates.forEach((candidate) => {
      const prevTabIndex = candidate.dataset.tabindex;
      candidate.setAttribute("tabindex", prevTabIndex);
    });
  };
}
function whenMouse(handler) {
  return (e) => e.pointerType === "mouse" ? handler(e) : void 0;
}
function handleProxyFocus(guard, focusOptions) {
  if (!guard) return;
  const ariaHidden = guard.getAttribute("aria-hidden");
  guard.removeAttribute("aria-hidden");
  guard.focus(focusOptions);
  afterSleep(0, () => {
    if (ariaHidden === null) {
      guard.setAttribute("aria-hidden", "");
    } else {
      guard.setAttribute("aria-hidden", ariaHidden);
    }
  });
}
function Navigation_menu$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      id = createId(uid),
      ref = null,
      value = "",
      onValueChange = noop,
      delayDuration = 200,
      skipDelayDuration = 300,
      dir = "ltr",
      orientation = "horizontal",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = NavigationMenuRootState.create({
      id: boxWith(() => id),
      value: boxWith(() => value, (v) => {
        value = v;
        onValueChange(v);
      }),
      delayDuration: boxWith(() => delayDuration),
      skipDelayDuration: boxWith(() => skipDelayDuration),
      dir: boxWith(() => dir),
      orientation: boxWith(() => orientation),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps({ "aria-label": "main" }, restProps, rootState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<nav${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></nav>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref, value });
  });
}
function Navigation_menu_content_impl($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      ref = null,
      id = createId(uid),
      child: childProp,
      children: childrenProp,
      onInteractOutside = noop,
      onFocusOutside = noop,
      onEscapeKeydown = noop,
      escapeKeydownBehavior = "close",
      interactOutsideBehavior = "close",
      itemState,
      onRefChange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentImplState = NavigationMenuContentImplState.create(
      {
        id: boxWith(() => id),
        ref: boxWith(() => ref, (v) => {
          ref = v;
          run(() => onRefChange?.(v));
        })
      },
      itemState
    );
    if (itemState) {
      NavigationMenuItemContext.set(itemState);
    }
    const mergedProps = derived(() => mergeProps(restProps, contentImplState.props));
    {
      let children = function($$renderer3, { props: dismissibleProps }) {
        Escape_layer($$renderer3, {
          enabled: true,
          ref: contentImplState.opts.ref,
          onEscapeKeydown: (e) => {
            onEscapeKeydown(e);
            if (e.defaultPrevented) return;
            contentImplState.onEscapeKeydown(e);
          },
          escapeKeydownBehavior,
          children: ($$renderer4) => {
            const finalProps = mergeProps(mergedProps(), dismissibleProps);
            if (childProp) {
              $$renderer4.push("<!--[-->");
              childProp($$renderer4, { props: finalProps });
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push(`<div${attributes({ ...finalProps })}>`);
              childrenProp?.($$renderer4);
              $$renderer4.push(`<!----></div>`);
            }
            $$renderer4.push(`<!--]-->`);
          }
        });
      };
      Dismissible_layer($$renderer2, {
        id,
        ref: contentImplState.opts.ref,
        enabled: true,
        onInteractOutside: (e) => {
          onInteractOutside(e);
          if (e.defaultPrevented) return;
          contentImplState.onInteractOutside(e);
        },
        onFocusOutside: (e) => {
          onFocusOutside(e);
          if (e.defaultPrevented) return;
          contentImplState.onFocusOutside(e);
        },
        interactOutsideBehavior,
        children
      });
    }
    bind_props($$props, { ref });
  });
}
class StateMachine {
  state;
  #machine;
  constructor(initialState, machine) {
    this.state = simpleBox(initialState);
    this.#machine = machine;
    this.dispatch = this.dispatch.bind(this);
  }
  #reducer(event) {
    const nextState = this.#machine[this.state.current][event];
    return nextState ?? this.state.current;
  }
  dispatch(event) {
    this.state.current = this.#reducer(event);
  }
}
const animationNameCache = /* @__PURE__ */ new WeakMap();
const ANIMATION_NAME_CACHE_TTL_MS = 16;
const presenceMachine = {
  mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
  unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
  unmounted: { MOUNT: "mounted" }
};
class Presence {
  opts;
  prevAnimationNameState = "none";
  styles = { display: "", animationName: "none" };
  initialStatus;
  previousPresent;
  machine;
  present;
  constructor(opts) {
    this.opts = opts;
    this.present = this.opts.open;
    this.initialStatus = opts.open.current ? "mounted" : "unmounted";
    this.previousPresent = new Previous(() => this.present.current);
    this.machine = new StateMachine(this.initialStatus, presenceMachine);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleAnimationStart = this.handleAnimationStart.bind(this);
    watchPresenceChange(this);
    watchStatusChange(this);
    watchRefChange(this);
  }
  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
   * make sure we only trigger ANIMATION_END for the currently active animation.
   */
  handleAnimationEnd(event) {
    if (!this.opts.ref.current) return;
    const currAnimationName = this.styles.animationName || getAnimationName(this.opts.ref.current);
    const isCurrentAnimation = currAnimationName.includes(event.animationName) || currAnimationName === "none";
    if (event.target === this.opts.ref.current && isCurrentAnimation) {
      this.machine.dispatch("ANIMATION_END");
    }
  }
  handleAnimationStart(event) {
    if (!this.opts.ref.current) return;
    if (event.target === this.opts.ref.current) {
      const animationName = getAnimationName(this.opts.ref.current, true);
      this.prevAnimationNameState = animationName;
      this.styles.animationName = animationName;
    }
  }
  #isPresent = derived(() => {
    return ["mounted", "unmountSuspended"].includes(this.machine.state.current);
  });
  get isPresent() {
    return this.#isPresent();
  }
  set isPresent($$value) {
    return this.#isPresent($$value);
  }
}
function watchPresenceChange(state) {
  watch(() => state.present.current, () => {
    if (!state.opts.ref.current) return;
    const hasPresentChanged = state.present.current !== state.previousPresent.current;
    if (!hasPresentChanged) return;
    const prevAnimationName = state.prevAnimationNameState;
    const currAnimationName = getAnimationName(state.opts.ref.current, true);
    state.styles.animationName = currAnimationName;
    if (state.present.current) {
      state.machine.dispatch("MOUNT");
    } else if (currAnimationName === "none" || state.styles.display === "none") {
      state.machine.dispatch("UNMOUNT");
    } else {
      const isAnimating = prevAnimationName !== currAnimationName;
      if (state.previousPresent.current && isAnimating) {
        state.machine.dispatch("ANIMATION_OUT");
      } else {
        state.machine.dispatch("UNMOUNT");
      }
    }
  });
}
function watchStatusChange(state) {
  watch(() => state.machine.state.current, () => {
    if (!state.opts.ref.current) return;
    const currAnimationName = state.machine.state.current === "mounted" ? getAnimationName(state.opts.ref.current, true) : "none";
    state.prevAnimationNameState = currAnimationName;
    state.styles.animationName = currAnimationName;
  });
}
function watchRefChange(state) {
  watch(() => state.opts.ref.current, () => {
    if (!state.opts.ref.current) return;
    const computed = getComputedStyle(state.opts.ref.current);
    state.styles = {
      display: computed.display,
      animationName: computed.animationName || "none"
    };
    return executeCallbacks(on(state.opts.ref.current, "animationstart", state.handleAnimationStart), on(state.opts.ref.current, "animationcancel", state.handleAnimationEnd), on(state.opts.ref.current, "animationend", state.handleAnimationEnd));
  });
}
function getAnimationName(node, forceRefresh = false) {
  if (!node) return "none";
  const now = performance.now();
  const cached = animationNameCache.get(node);
  if (!forceRefresh && cached && now - cached.timestamp < ANIMATION_NAME_CACHE_TTL_MS) {
    return cached.value;
  }
  const value = getComputedStyle(node).animationName || "none";
  animationNameCache.set(node, { value, timestamp: now });
  return value;
}
function Presence_layer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open, forceMount, presence, ref } = $$props;
    const presenceState = new Presence({ open: boxWith(() => open), ref });
    if (forceMount || open || presenceState.isPresent) {
      $$renderer2.push("<!--[-->");
      presence?.($$renderer2, { present: presenceState.isPresent });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Navigation_menu_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      ref = null,
      id = createId(uid),
      children,
      child,
      forceMount = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = NavigationMenuContentState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, contentState.props));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Portal($$renderer3, {
        to: contentState.context.viewportRef.current || void 0,
        disabled: !contentState.context.viewportRef.current,
        children: ($$renderer4) => {
          {
            let presence = function($$renderer5) {
              Navigation_menu_content_impl($$renderer5, spread_props([mergedProps(), { children, child }]));
              $$renderer5.push(`<!----> `);
              Mounted($$renderer5, {
                get mounted() {
                  return contentState.mounted;
                },
                set mounted($$value) {
                  contentState.mounted = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!---->`);
            };
            Presence_layer($$renderer4, {
              open: forceMount || contentState.open || contentState.isLastActiveValue,
              ref: contentState.opts.ref,
              presence
            });
          }
        }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_item$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    const defaultId = createId(uid);
    let {
      id = defaultId,
      value = defaultId,
      ref = null,
      child,
      children,
      openOnHover = true,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemState = NavigationMenuItemState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      value: boxWith(() => value),
      openOnHover: boxWith(() => openOnHover)
    });
    const mergedProps = derived(() => mergeProps(restProps, itemState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<li${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></li>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_link$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      child,
      children,
      active = false,
      onSelect = noop,
      tabindex = 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const linkState = NavigationMenuLinkState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      active: boxWith(() => active),
      onSelect: boxWith(() => onSelect)
    });
    const mergedProps = derived(() => mergeProps(restProps, linkState.props, { tabindex }));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_list$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      children,
      child,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const listState = NavigationMenuListState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, listState.props));
    const wrapperProps = derived(() => mergeProps(listState.wrapperProps));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (child) {
        $$renderer3.push("<!--[-->");
        child($$renderer3, { props: mergedProps(), wrapperProps: wrapperProps() });
        $$renderer3.push(`<!----> `);
        Mounted($$renderer3, {
          get mounted() {
            return listState.wrapperMounted;
          },
          set mounted($$value) {
            listState.wrapperMounted = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div${attributes({ ...wrapperProps() })}><ul${attributes({ ...mergedProps() })}>`);
        children?.($$renderer3);
        $$renderer3.push(`<!----></ul></div> `);
        Mounted($$renderer3, {
          get mounted() {
            return listState.wrapperMounted;
          },
          set mounted($$value) {
            listState.wrapperMounted = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!---->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Visually_hidden($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, child, $$slots, $$events, ...restProps } = $$props;
    const style = {
      position: "absolute",
      border: 0,
      width: "1px",
      display: "inline-block",
      height: "1px",
      padding: 0,
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      whiteSpace: "nowrap",
      wordWrap: "normal"
    };
    const mergedProps = derived(() => mergeProps(restProps, { style }));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></span>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Navigation_menu_trigger$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      disabled = false,
      children,
      child,
      ref = null,
      tabindex = 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = NavigationMenuTriggerState.create({
      id: boxWith(() => id),
      disabled: boxWith(() => disabled ?? false),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { tabindex }));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (child) {
        $$renderer3.push("<!--[-->");
        child($$renderer3, { props: mergedProps() });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<button${attributes({ ...mergedProps() })}>`);
        children?.($$renderer3);
        $$renderer3.push(`<!----></button>`);
      }
      $$renderer3.push(`<!--]--> `);
      if (triggerState.open) {
        $$renderer3.push("<!--[-->");
        Visually_hidden($$renderer3, spread_props([triggerState.focusProxyProps]));
        $$renderer3.push(`<!----> `);
        Mounted($$renderer3, {
          get mounted() {
            return triggerState.focusProxyMounted;
          },
          set mounted($$value) {
            triggerState.focusProxyMounted = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        if (triggerState.context.viewportRef.current) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span${attr("aria-owns", triggerState.itemContext.contentId ?? void 0)}></span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_viewport$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      forceMount = false,
      child,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const viewportState = NavigationMenuViewportState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, viewportState.props));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let presence = function($$renderer4) {
          if (child) {
            $$renderer4.push("<!--[-->");
            child($$renderer4, { props: mergedProps() });
            $$renderer4.push(`<!---->`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<div${attributes({ ...mergedProps() })}>`);
            children?.($$renderer4);
            $$renderer4.push(`<!----></div>`);
          }
          $$renderer4.push(`<!--]--> `);
          Mounted($$renderer4, {
            get mounted() {
              return viewportState.mounted;
            },
            set mounted($$value) {
              viewportState.mounted = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!---->`);
        };
        Presence_layer($$renderer3, {
          open: forceMount || viewportState.open,
          ref: viewportState.opts.ref,
          presence
        });
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Popover$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      onOpenChange = noop,
      onOpenChangeComplete = noop,
      children
    } = $$props;
    PopoverRootState.create({
      open: boxWith(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
    });
    Floating_layer($$renderer2, {
      children: ($$renderer3) => {
        children?.($$renderer3);
        $$renderer3.push(`<!---->`);
      }
    });
    bind_props($$props, { open });
  });
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
const scrollAreaAttrs = createBitsAttrs({
  component: "scroll-area",
  parts: ["root", "viewport", "corner", "thumb", "scrollbar"]
});
const ScrollAreaRootContext = new Context("ScrollArea.Root");
const ScrollAreaScrollbarContext = new Context("ScrollArea.Scrollbar");
const ScrollAreaScrollbarVisibleContext = new Context("ScrollArea.ScrollbarVisible");
const ScrollAreaScrollbarAxisContext = new Context("ScrollArea.ScrollbarAxis");
const ScrollAreaScrollbarSharedContext = new Context("ScrollArea.ScrollbarShared");
class ScrollAreaRootState {
  static create(opts) {
    return ScrollAreaRootContext.set(new ScrollAreaRootState(opts));
  }
  opts;
  attachment;
  scrollAreaNode = null;
  viewportNode = null;
  contentNode = null;
  scrollbarXNode = null;
  scrollbarYNode = null;
  cornerWidth = 0;
  cornerHeight = 0;
  scrollbarXEnabled = false;
  scrollbarYEnabled = false;
  domContext;
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref, (v) => this.scrollAreaNode = v);
    this.domContext = new DOMContext(opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    dir: this.opts.dir.current,
    style: {
      position: "relative",
      "--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
      "--bits-scroll-area-corner-width": `${this.cornerWidth}px`
    },
    [scrollAreaAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaViewportState {
  static create(opts) {
    return new ScrollAreaViewportState(opts, ScrollAreaRootContext.get());
  }
  opts;
  root;
  attachment;
  #contentId = simpleBox(useId());
  #contentRef = simpleBox(null);
  contentAttachment = attachRef(this.#contentRef, (v) => this.root.contentNode = v);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref, (v) => this.root.viewportNode = v);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
      overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
    },
    [scrollAreaAttrs.viewport]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #contentProps = derived(() => ({
    id: this.#contentId.current,
    "data-scroll-area-content": "",
    style: {
      minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0
    },
    ...this.contentAttachment
  }));
  get contentProps() {
    return this.#contentProps();
  }
  set contentProps($$value) {
    return this.#contentProps($$value);
  }
}
class ScrollAreaScrollbarState {
  static create(opts) {
    return ScrollAreaScrollbarContext.set(new ScrollAreaScrollbarState(opts, ScrollAreaRootContext.get()));
  }
  opts;
  root;
  #isHorizontal = derived(() => this.opts.orientation.current === "horizontal");
  get isHorizontal() {
    return this.#isHorizontal();
  }
  set isHorizontal($$value) {
    return this.#isHorizontal($$value);
  }
  hasThumb = false;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    watch(() => this.isHorizontal, (isHorizontal) => {
      if (isHorizontal) {
        this.root.scrollbarXEnabled = true;
        return () => {
          this.root.scrollbarXEnabled = false;
        };
      } else {
        this.root.scrollbarYEnabled = true;
        return () => {
          this.root.scrollbarYEnabled = false;
        };
      }
    });
  }
}
class ScrollAreaScrollbarHoverState {
  static create() {
    return new ScrollAreaScrollbarHoverState(ScrollAreaScrollbarContext.get());
  }
  scrollbar;
  root;
  isVisible = false;
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
  }
  #props = derived(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarScrollState {
  static create() {
    return new ScrollAreaScrollbarScrollState(ScrollAreaScrollbarContext.get());
  }
  scrollbar;
  root;
  machine = new StateMachine("hidden", {
    hidden: { SCROLL: "scrolling" },
    scrolling: { SCROLL_END: "idle", POINTER_ENTER: "interacting" },
    interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  #isHidden = derived(() => this.machine.state.current === "hidden");
  get isHidden() {
    return this.#isHidden();
  }
  set isHidden($$value) {
    return this.#isHidden($$value);
  }
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    useDebounce(() => this.machine.dispatch("SCROLL_END"), 100);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
  }
  onpointerenter(_) {
    this.machine.dispatch("POINTER_ENTER");
  }
  onpointerleave(_) {
    this.machine.dispatch("POINTER_LEAVE");
  }
  #props = derived(() => ({
    "data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarAutoState {
  static create() {
    return new ScrollAreaScrollbarAutoState(ScrollAreaScrollbarContext.get());
  }
  scrollbar;
  root;
  isVisible = false;
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    const handleResize = useDebounce(
      () => {
        const viewportNode = this.root.viewportNode;
        if (!viewportNode) return;
        const isOverflowX = viewportNode.offsetWidth < viewportNode.scrollWidth;
        const isOverflowY = viewportNode.offsetHeight < viewportNode.scrollHeight;
        this.isVisible = this.scrollbar.isHorizontal ? isOverflowX : isOverflowY;
      },
      10
    );
    new SvelteResizeObserver(() => this.root.viewportNode, handleResize);
    new SvelteResizeObserver(() => this.root.contentNode, handleResize);
  }
  #props = derived(() => ({ "data-state": this.isVisible ? "visible" : "hidden" }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarVisibleState {
  static create() {
    return ScrollAreaScrollbarVisibleContext.set(new ScrollAreaScrollbarVisibleState(ScrollAreaScrollbarContext.get()));
  }
  scrollbar;
  root;
  thumbNode = null;
  pointerOffset = 0;
  sizes = {
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  };
  #thumbRatio = derived(() => getThumbRatio(this.sizes.viewport, this.sizes.content));
  get thumbRatio() {
    return this.#thumbRatio();
  }
  set thumbRatio($$value) {
    return this.#thumbRatio($$value);
  }
  #hasThumb = derived(() => Boolean(this.thumbRatio > 0 && this.thumbRatio < 1));
  get hasThumb() {
    return this.#hasThumb();
  }
  set hasThumb($$value) {
    return this.#hasThumb($$value);
  }
  prevTransformStyle = "";
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
  }
  setSizes(sizes) {
    this.sizes = sizes;
  }
  getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer({
      pointerPos,
      pointerOffset: this.pointerOffset,
      sizes: this.sizes,
      dir
    });
  }
  onThumbPointerUp() {
    this.pointerOffset = 0;
  }
  onThumbPointerDown(pointerPos) {
    this.pointerOffset = pointerPos;
  }
  xOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollLeft;
    const offset2 = getThumbOffsetFromScroll({
      scrollPos,
      sizes: this.sizes,
      dir: this.root.opts.dir.current
    });
    const transformStyle = `translate3d(${offset2}px, 0, 0)`;
    this.thumbNode.style.transform = transformStyle;
    this.prevTransformStyle = transformStyle;
  }
  xOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = scrollPos;
  }
  xOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = this.getScrollPosition(pointerPos, this.root.opts.dir.current);
  }
  yOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollTop;
    const offset2 = getThumbOffsetFromScroll({ scrollPos, sizes: this.sizes });
    const transformStyle = `translate3d(0, ${offset2}px, 0)`;
    this.thumbNode.style.transform = transformStyle;
    this.prevTransformStyle = transformStyle;
  }
  yOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = scrollPos;
  }
  yOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = this.getScrollPosition(pointerPos, this.root.opts.dir.current);
  }
}
class ScrollAreaScrollbarXState {
  static create(opts) {
    return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarXState(opts, ScrollAreaScrollbarVisibleContext.get()));
  }
  opts;
  scrollbarVis;
  root;
  scrollbar;
  attachment;
  computedStyle;
  constructor(opts, scrollbarVis) {
    this.opts = opts;
    this.scrollbarVis = scrollbarVis;
    this.root = scrollbarVis.root;
    this.scrollbar = scrollbarVis.scrollbar;
    this.attachment = attachRef(this.scrollbar.opts.ref, (v) => this.root.scrollbarXNode = v);
  }
  onThumbPointerDown = (pointerPos) => {
    this.scrollbarVis.onThumbPointerDown(pointerPos.x);
  };
  onDragScroll = (pointerPos) => {
    this.scrollbarVis.xOnDragScroll(pointerPos.x);
  };
  onThumbPointerUp = () => {
    this.scrollbarVis.onThumbPointerUp();
  };
  onThumbPositionChange = () => {
    this.scrollbarVis.xOnThumbPositionChange();
  };
  onWheelScroll = (e, maxScrollPos) => {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollLeft + e.deltaX;
    this.scrollbarVis.xOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  };
  onResize = () => {
    if (!(this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollWidth,
      viewport: this.root.viewportNode.offsetWidth,
      scrollbar: {
        size: this.scrollbar.opts.ref.current.clientWidth,
        paddingStart: toInt(this.computedStyle.paddingLeft),
        paddingEnd: toInt(this.computedStyle.paddingRight)
      }
    });
  };
  #thumbSize = derived(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  set thumbSize($$value) {
    return this.#thumbSize($$value);
  }
  #props = derived(() => ({
    id: this.scrollbar.opts.id.current,
    "data-orientation": "horizontal",
    style: {
      bottom: 0,
      left: this.root.opts.dir.current === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
      right: this.root.opts.dir.current === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
      "--bits-scroll-area-thumb-width": `${this.thumbSize}px`
    },
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarYState {
  static create(opts) {
    return ScrollAreaScrollbarAxisContext.set(new ScrollAreaScrollbarYState(opts, ScrollAreaScrollbarVisibleContext.get()));
  }
  opts;
  scrollbarVis;
  root;
  scrollbar;
  attachment;
  computedStyle;
  constructor(opts, scrollbarVis) {
    this.opts = opts;
    this.scrollbarVis = scrollbarVis;
    this.root = scrollbarVis.root;
    this.scrollbar = scrollbarVis.scrollbar;
    this.attachment = attachRef(this.scrollbar.opts.ref, (v) => this.root.scrollbarYNode = v);
    this.onThumbPointerDown = this.onThumbPointerDown.bind(this);
    this.onDragScroll = this.onDragScroll.bind(this);
    this.onThumbPointerUp = this.onThumbPointerUp.bind(this);
    this.onThumbPositionChange = this.onThumbPositionChange.bind(this);
    this.onWheelScroll = this.onWheelScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  onThumbPointerDown(pointerPos) {
    this.scrollbarVis.onThumbPointerDown(pointerPos.y);
  }
  onDragScroll(pointerPos) {
    this.scrollbarVis.yOnDragScroll(pointerPos.y);
  }
  onThumbPointerUp() {
    this.scrollbarVis.onThumbPointerUp();
  }
  onThumbPositionChange() {
    this.scrollbarVis.yOnThumbPositionChange();
  }
  onWheelScroll(e, maxScrollPos) {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollTop + e.deltaY;
    this.scrollbarVis.yOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  }
  onResize() {
    if (!(this.scrollbar.opts.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollHeight,
      viewport: this.root.viewportNode.offsetHeight,
      scrollbar: {
        size: this.scrollbar.opts.ref.current.clientHeight,
        paddingStart: toInt(this.computedStyle.paddingTop),
        paddingEnd: toInt(this.computedStyle.paddingBottom)
      }
    });
  }
  #thumbSize = derived(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  set thumbSize($$value) {
    return this.#thumbSize($$value);
  }
  #props = derived(() => ({
    id: this.scrollbar.opts.id.current,
    "data-orientation": "vertical",
    style: {
      top: 0,
      right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
      left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
      bottom: "var(--bits-scroll-area-corner-height)",
      "--bits-scroll-area-thumb-height": `${this.thumbSize}px`
    },
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaScrollbarSharedState {
  static create() {
    return ScrollAreaScrollbarSharedContext.set(new ScrollAreaScrollbarSharedState(ScrollAreaScrollbarAxisContext.get()));
  }
  scrollbarState;
  root;
  scrollbarVis;
  scrollbar;
  rect = null;
  prevWebkitUserSelect = "";
  handleResize;
  handleThumbPositionChange;
  handleWheelScroll;
  handleThumbPointerDown;
  handleThumbPointerUp;
  #maxScrollPos = derived(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
  get maxScrollPos() {
    return this.#maxScrollPos();
  }
  set maxScrollPos($$value) {
    return this.#maxScrollPos($$value);
  }
  constructor(scrollbarState) {
    this.scrollbarState = scrollbarState;
    this.root = scrollbarState.root;
    this.scrollbarVis = scrollbarState.scrollbarVis;
    this.scrollbar = scrollbarState.scrollbarVis.scrollbar;
    this.handleResize = useDebounce(() => this.scrollbarState.onResize(), 10);
    this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange;
    this.handleWheelScroll = this.scrollbarState.onWheelScroll;
    this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown;
    this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp;
    new SvelteResizeObserver(() => this.scrollbar.opts.ref.current, this.handleResize);
    new SvelteResizeObserver(() => this.root.contentNode, this.handleResize);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onlostpointercapture = this.onlostpointercapture.bind(this);
  }
  handleDragScroll(e) {
    if (!this.rect) return;
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    this.scrollbarState.onDragScroll({ x, y });
  }
  #cleanupPointerState() {
    if (this.rect === null) return;
    this.root.domContext.getDocument().body.style.webkitUserSelect = this.prevWebkitUserSelect;
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "";
    this.rect = null;
  }
  onpointerdown(e) {
    if (e.button !== 0) return;
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    this.rect = this.scrollbar.opts.ref.current?.getBoundingClientRect() ?? null;
    this.prevWebkitUserSelect = this.root.domContext.getDocument().body.style.webkitUserSelect;
    this.root.domContext.getDocument().body.style.webkitUserSelect = "none";
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "auto";
    this.handleDragScroll(e);
  }
  onpointermove(e) {
    this.handleDragScroll(e);
  }
  onpointerup(e) {
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    this.#cleanupPointerState();
  }
  onlostpointercapture(_) {
    this.#cleanupPointerState();
  }
  #props = derived(() => mergeProps({
    ...this.scrollbarState.props,
    style: { position: "absolute", ...this.scrollbarState.props.style },
    [scrollAreaAttrs.scrollbar]: "",
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerup: this.onpointerup,
    onlostpointercapture: this.onlostpointercapture
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaThumbImplState {
  static create(opts) {
    return new ScrollAreaThumbImplState(opts, ScrollAreaScrollbarSharedContext.get());
  }
  opts;
  scrollbarState;
  attachment;
  #root;
  #removeUnlinkedScrollListener;
  #debounceScrollEnd = useDebounce(
    () => {
      if (this.#removeUnlinkedScrollListener) {
        this.#removeUnlinkedScrollListener();
        this.#removeUnlinkedScrollListener = void 0;
      }
    },
    100
  );
  constructor(opts, scrollbarState) {
    this.opts = opts;
    this.scrollbarState = scrollbarState;
    this.#root = scrollbarState.root;
    this.attachment = attachRef(this.opts.ref, (v) => this.scrollbarState.scrollbarVis.thumbNode = v);
    this.onpointerdowncapture = this.onpointerdowncapture.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  onpointerdowncapture(e) {
    const thumb = e.target;
    if (!thumb) return;
    const thumbRect = thumb.getBoundingClientRect();
    const x = e.clientX - thumbRect.left;
    const y = e.clientY - thumbRect.top;
    this.scrollbarState.handleThumbPointerDown({ x, y });
  }
  onpointerup(_) {
    this.scrollbarState.handleThumbPointerUp();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": this.scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
    style: {
      width: "var(--bits-scroll-area-thumb-width)",
      height: "var(--bits-scroll-area-thumb-height)",
      transform: this.scrollbarState.scrollbarVis.prevTransformStyle
    },
    onpointerdowncapture: this.onpointerdowncapture,
    onpointerup: this.onpointerup,
    [scrollAreaAttrs.thumb]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class ScrollAreaCornerImplState {
  static create(opts) {
    return new ScrollAreaCornerImplState(opts, ScrollAreaRootContext.get());
  }
  opts;
  root;
  attachment;
  #width = 0;
  #height = 0;
  #hasSize = derived(() => Boolean(this.#width && this.#height));
  get hasSize() {
    return this.#hasSize();
  }
  set hasSize($$value) {
    return this.#hasSize($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
    new SvelteResizeObserver(() => this.root.scrollbarXNode, () => {
      const height = this.root.scrollbarXNode?.offsetHeight || 0;
      this.root.cornerHeight = height;
      this.#height = height;
    });
    new SvelteResizeObserver(() => this.root.scrollbarYNode, () => {
      const width = this.root.scrollbarYNode?.offsetWidth || 0;
      this.root.cornerWidth = width;
      this.#width = width;
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      width: this.#width,
      height: this.#height,
      position: "absolute",
      right: this.root.opts.dir.current === "ltr" ? 0 : void 0,
      left: this.root.opts.dir.current === "rtl" ? 0 : void 0,
      bottom: 0
    },
    [scrollAreaAttrs.corner]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function toInt(value) {
  return value ? Number.parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer({ pointerPos, pointerOffset, sizes, dir = "ltr" }) {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset2 = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset2;
  const minPointerPos = sizes.scrollbar.paddingStart + offset2;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll({ scrollPos, sizes, dir = "ltr" }) {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange[0], scrollClampRange[1]);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function Scroll_area$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      ref = null,
      id = createId(uid),
      type = "hover",
      dir = "ltr",
      scrollHideDelay = 600,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = ScrollAreaRootState.create({
      type: boxWith(() => type),
      dir: boxWith(() => dir),
      scrollHideDelay: boxWith(() => scrollHideDelay),
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, rootState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Scroll_area_viewport($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      ref = null,
      id = createId(uid),
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const viewportState = ScrollAreaViewportState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, viewportState.props));
    const mergedContentProps = derived(() => mergeProps({}, viewportState.contentProps));
    $$renderer2.push(`<div${attributes({ ...mergedProps() })}><div${attributes({ ...mergedContentProps() })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div></div>`);
    bind_props($$props, { ref });
  });
}
function Scroll_area_scrollbar_shared($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { child, children, $$slots, $$events, ...restProps } = $$props;
    const scrollbarSharedState = ScrollAreaScrollbarSharedState.create();
    const mergedProps = derived(() => mergeProps(restProps, scrollbarSharedState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Scroll_area_scrollbar_x($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...restProps } = $$props;
    const isMounted = new IsMounted();
    const scrollbarXState = ScrollAreaScrollbarXState.create({ mounted: boxWith(() => isMounted.current) });
    const mergedProps = derived(() => mergeProps(restProps, scrollbarXState.props));
    Scroll_area_scrollbar_shared($$renderer2, spread_props([mergedProps()]));
  });
}
function Scroll_area_scrollbar_y($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...restProps } = $$props;
    const isMounted = new IsMounted();
    const scrollbarYState = ScrollAreaScrollbarYState.create({ mounted: boxWith(() => isMounted.current) });
    const mergedProps = derived(() => mergeProps(restProps, scrollbarYState.props));
    Scroll_area_scrollbar_shared($$renderer2, spread_props([mergedProps()]));
  });
}
function Scroll_area_scrollbar_visible($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...restProps } = $$props;
    const scrollbarVisibleState = ScrollAreaScrollbarVisibleState.create();
    if (scrollbarVisibleState.scrollbar.opts.orientation.current === "horizontal") {
      $$renderer2.push("<!--[-->");
      Scroll_area_scrollbar_x($$renderer2, spread_props([restProps]));
    } else {
      $$renderer2.push("<!--[!-->");
      Scroll_area_scrollbar_y($$renderer2, spread_props([restProps]));
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Scroll_area_scrollbar_auto($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { forceMount = false, $$slots, $$events, ...restProps } = $$props;
    const scrollbarAutoState = ScrollAreaScrollbarAutoState.create();
    const mergedProps = derived(() => mergeProps(restProps, scrollbarAutoState.props));
    {
      let presence = function($$renderer3) {
        Scroll_area_scrollbar_visible($$renderer3, spread_props([mergedProps()]));
      };
      Presence_layer($$renderer2, {
        open: forceMount || scrollbarAutoState.isVisible,
        ref: scrollbarAutoState.scrollbar.opts.ref,
        presence
      });
    }
  });
}
function Scroll_area_scrollbar_scroll($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { forceMount = false, $$slots, $$events, ...restProps } = $$props;
    const scrollbarScrollState = ScrollAreaScrollbarScrollState.create();
    const mergedProps = derived(() => mergeProps(restProps, scrollbarScrollState.props));
    {
      let presence = function($$renderer3) {
        Scroll_area_scrollbar_visible($$renderer3, spread_props([mergedProps()]));
      };
      Presence_layer($$renderer2, spread_props([
        mergedProps(),
        {
          open: forceMount || !scrollbarScrollState.isHidden,
          ref: scrollbarScrollState.scrollbar.opts.ref,
          presence,
          $$slots: { presence: true }
        }
      ]));
    }
  });
}
function Scroll_area_scrollbar_hover($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { forceMount = false, $$slots, $$events, ...restProps } = $$props;
    const scrollbarHoverState = ScrollAreaScrollbarHoverState.create();
    const scrollbarAutoState = ScrollAreaScrollbarAutoState.create();
    const mergedProps = derived(() => mergeProps(restProps, scrollbarHoverState.props, scrollbarAutoState.props, {
      "data-state": scrollbarHoverState.isVisible ? "visible" : "hidden"
    }));
    const open = derived(() => forceMount || scrollbarHoverState.isVisible && scrollbarAutoState.isVisible);
    {
      let presence = function($$renderer3) {
        Scroll_area_scrollbar_visible($$renderer3, spread_props([mergedProps()]));
      };
      Presence_layer($$renderer2, {
        open: open(),
        ref: scrollbarAutoState.scrollbar.opts.ref,
        presence
      });
    }
  });
}
function Scroll_area_scrollbar$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      ref = null,
      id = createId(uid),
      orientation,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const scrollbarState = ScrollAreaScrollbarState.create({
      orientation: boxWith(() => orientation),
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const type = derived(() => scrollbarState.root.opts.type.current);
    if (type() === "hover") {
      $$renderer2.push("<!--[-->");
      Scroll_area_scrollbar_hover($$renderer2, spread_props([restProps, { id }]));
    } else if (type() === "scroll") {
      $$renderer2.push("<!--[1-->");
      Scroll_area_scrollbar_scroll($$renderer2, spread_props([restProps, { id }]));
    } else if (type() === "auto") {
      $$renderer2.push("<!--[2-->");
      Scroll_area_scrollbar_auto($$renderer2, spread_props([restProps, { id }]));
    } else if (type() === "always") {
      $$renderer2.push("<!--[3-->");
      Scroll_area_scrollbar_visible($$renderer2, spread_props([restProps, { id }]));
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Scroll_area_thumb_impl($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      id,
      child,
      children,
      present,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const isMounted = new IsMounted();
    const thumbState = ScrollAreaThumbImplState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      mounted: boxWith(() => isMounted.current)
    });
    const mergedProps = derived(() => mergeProps(restProps, thumbState.props, { style: { hidden: !present } }));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Scroll_area_thumb($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      forceMount = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const scrollbarState = ScrollAreaScrollbarVisibleContext.get();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let presence = function($$renderer4, { present }) {
          Scroll_area_thumb_impl($$renderer4, spread_props([
            restProps,
            {
              id,
              present,
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              }
            }
          ]));
        };
        Presence_layer($$renderer3, {
          open: forceMount || scrollbarState.hasThumb,
          ref: scrollbarState.scrollbar.opts.ref,
          presence
        });
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Scroll_area_corner_impl($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      id,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const cornerState = ScrollAreaCornerImplState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, cornerState.props));
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Scroll_area_corner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      ref = null,
      id = createId(uid),
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const scrollAreaState = ScrollAreaRootContext.get();
    const hasBothScrollbarsVisible = derived(() => Boolean(scrollAreaState.scrollbarXNode && scrollAreaState.scrollbarYNode));
    const hasCorner = derived(() => scrollAreaState.opts.type.current !== "scroll" && hasBothScrollbarsVisible());
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (hasCorner()) {
        $$renderer3.push("<!--[-->");
        Scroll_area_corner_impl($$renderer3, spread_props([
          restProps,
          {
            id,
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Separator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      "data-slot": dataSlot = "separator",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Separator$1) {
        $$renderer3.push("<!--[-->");
        Separator$1($$renderer3, spread_props([
          {
            "data-slot": dataSlot,
            class: cn("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:min-h-full data-[orientation=vertical]:w-px", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<footer class="border-t bg-muted/50 py-12"><div class="container"><div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"><div class="flex flex-col items-start gap-4">`);
    Logo($$renderer2, { class: "h-24 w-auto" });
    $$renderer2.push(`<!----> <p class="max-w-[24rem] text-sm text-muted-foreground">${escape_html(t("footer.description"))}</p> <p class="text-sm text-muted-foreground">${escape_html(t("footer.contactPrompt"))} <a href="mailto:ai2@planapp.gov.pt" class="transition-color text-primary hover:text-foreground">${escape_html(t("footer.contactLink"))}</a></p></div> <div><div class="flex flex-col gap-4"><a href="https://www.planapp.gov.pt/" target="_blank" rel="noreferrer"><img${attr("src", asset("/logo-planapp.svg"))}${attr("alt", t("footer.logoAltPlanapp"))} class="h-24 w-auto transition-opacity hover:opacity-80"/></a> <a href="https://www.portugal.gov.pt/pt/gc25" target="_blank" rel="noreferrer"><img${attr("src", asset("/logo-pt.svg"))}${attr("alt", t("footer.logoAltGov"))} class="h-20 w-auto transition-opacity hover:opacity-80"/></a></div></div> <div><p class="font-semibold">${escape_html(t("footer.participationStrategy"))}</p> <ul class="mt-3 space-y-2 text-sm text-muted-foreground"><li><a${attr("href", resolve("/participacao-publica/"))} class="hover:text-foreground">${escape_html(t("nav.publicParticipation"))}</a></li> <li><a${attr("href", resolve("/metodologia-participacao-publica/"))} class="hover:text-foreground">${escape_html(t("nav.publicParticipationMethodology"))}</a></li> <li><a${attr("href", resolve("/comissao-acompanhamento/"))} class="hover:text-foreground">${escape_html(t("nav.advisoryCommittee"))}</a></li> <li><a${attr("href", resolve("/apresentacao-publica/"))} class="hover:text-foreground">${escape_html(t("nav.reports.presentations"))}</a></li> <li><a${attr("href", resolve("/reunioes-entidades/"))} class="hover:text-foreground">${escape_html(t("nav.stakeholderMeetings"))}</a></li> <li><a${attr("href", resolve("/mesas-tematicas/"))} class="hover:text-foreground">${escape_html(t("nav.thematicTables"))}</a></li> <li><a${attr("href", resolve("/workshops-descentralizados/"))} class="hover:text-foreground">${escape_html(t("nav.decentralizedWorkshops"))}</a></li> <li><a${attr("href", resolve("/iniciativas-bottom-up/"))} class="hover:text-foreground">${escape_html(t("nav.bottomUpInitiatives"))}</a></li></ul></div> <div><a${attr("href", resolve("/relatorios/"))} class="hover:text-foreground">${escape_html(t("nav.reports"))}</a> <p class="mt-4 font-semibold text-foreground">${escape_html(t("footer.whatIsIt"))}</p> <ul class="mt-3 space-y-2 text-sm text-muted-foreground"><li><a${attr("href", resolve("/metodologia-st4s/"))} class="hover:text-foreground">${escape_html(t("nav.st4sMethodology"))}</a></li> <li><a${attr("href", resolve("/metodologia-avaliacao-estrategica-ai2/"))} class="hover:text-foreground">${escape_html(t("nav.strategicAssessmentMethodology"))}</a></li> <li><a${attr("href", resolve("/legislacao-nacional/"))} class="hover:text-foreground">${escape_html(t("nav.nationalLegislation"))}</a></li></ul> <p class="mt-4 font-semibold text-foreground">${escape_html(t("footer.aboutTeam"))}</p> <ul class="mt-3 space-y-2 text-sm text-muted-foreground"><li><a${attr("href", resolve("/coordenacao/"))} class="hover:text-foreground">${escape_html(t("nav.coordination"))}</a></li> <li><a${attr("href", resolve("/equipa-peritos/"))} class="hover:text-foreground">${escape_html(t("nav.expertTeam"))}</a></li></ul></div></div> `);
    Separator($$renderer2, { class: "my-8" });
    $$renderer2.push(`<!----> <div class="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between"><p>${escape_html(t("footer.copyright"))}</p> <div class="flex justify-center md:justify-end">`);
    Button($$renderer2, {
      variant: "ghost",
      size: "sm",
      href: "#top",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(t("footer.backToTop"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div></footer>`);
  });
}
function Navigation_menu_viewport($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(clsx(cn("absolute start-0 top-full isolate z-50 flex justify-center")))}>`);
      if (Navigation_menu_viewport$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu_viewport$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu-viewport",
            class: cn("origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--bits-navigation-menu-viewport-width)]", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
      $$renderer3.push(`</div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      viewport = true,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Navigation_menu$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu",
            "data-viewport": viewport,
            class: cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              children?.($$renderer4);
              $$renderer4.push(`<!----> `);
              if (viewport) {
                $$renderer4.push("<!--[-->");
                Navigation_menu_viewport($$renderer4, {});
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Navigation_menu_content$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu_content$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu-content",
            class: cn("data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-end-52 data-[motion=from-start]:slide-in-from-start-52 data-[motion=to-end]:slide-out-to-end-52 data-[motion=to-start]:slide-out-to-start-52 start-0 top-0 w-full p-2 pe-2.5 md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Navigation_menu_item$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu_item$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu-item",
            class: cn("relative", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_link($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Navigation_menu_link$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu_link$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu-link",
            class: cn("data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_list($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Navigation_menu_list$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu_list$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu-list",
            class: cn("group flex flex-1 list-none items-center justify-center gap-1", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
function Icon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      name,
      color = "currentColor",
      size: size2 = 24,
      strokeWidth = 2,
      absoluteStrokeWidth = false,
      iconNode = [],
      children,
      $$slots,
      $$events,
      ...props
    } = $$props;
    $$renderer2.push(`<svg${attributes(
      {
        ...defaultAttributes,
        ...!children && !hasA11yProp(props) && { "aria-hidden": "true" },
        ...props,
        width: size2,
        height: size2,
        stroke: color,
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth,
        class: clsx(["lucide-icon lucide", name && `lucide-${name}`, props.class])
      },
      void 0,
      void 0,
      void 0,
      3
    )}><!--[-->`);
    const each_array = ensure_array_like(iconNode);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [tag, attrs] = each_array[$$index];
      element($$renderer2, tag, () => {
        $$renderer2.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
      });
    }
    $$renderer2.push(`<!--]-->`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></svg>`);
  });
}
function Chevron_down($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
    Icon($$renderer2, spread_props([
      { name: "chevron-down" },
      /**
       * @component @name ChevronDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
const navigationMenuTriggerStyle = tv({
  base: "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
});
function Navigation_menu_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Navigation_menu_trigger$1) {
        $$renderer3.push("<!--[-->");
        Navigation_menu_trigger$1($$renderer3, spread_props([
          {
            "data-slot": "navigation-menu-trigger",
            class: cn(navigationMenuTriggerStyle(), "group", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              children?.($$renderer4);
              $$renderer4.push(`<!----> `);
              Chevron_down($$renderer4, {
                class: "relative top-[1px] ms-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
                "aria-hidden": "true"
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Main_nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className } = $$props;
    if (Navigation_menu) {
      $$renderer2.push("<!--[-->");
      Navigation_menu($$renderer2, {
        class: className,
        viewport: false,
        children: ($$renderer3) => {
          if (Navigation_menu_list) {
            $$renderer3.push("<!--[-->");
            Navigation_menu_list($$renderer3, {
              children: ($$renderer4) => {
                if (Navigation_menu_item) {
                  $$renderer4.push("<!--[-->");
                  Navigation_menu_item($$renderer4, {
                    children: ($$renderer5) => {
                      if (Navigation_menu_link) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_link($$renderer5, {
                          href: resolve("/relatorios/"),
                          children: ($$renderer6) => {
                            $$renderer6.push(`<!---->${escape_html(t("nav.reports"))}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Navigation_menu_item) {
                  $$renderer4.push("<!--[-->");
                  Navigation_menu_item($$renderer4, {
                    children: ($$renderer5) => {
                      if (Navigation_menu_trigger) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_trigger($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<!---->${escape_html(t("nav.participationStrategy"))}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Navigation_menu_content) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_content($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<ul class="grid w-[260px] gap-4 p-2"><li>`);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/participacao-publica/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.publicParticipation"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/metodologia-participacao-publica/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.publicParticipationMethodology"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/comissao-acompanhamento/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.advisoryCommittee"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/apresentacao-publica/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.reports.presentations"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/reunioes-entidades/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.stakeholderMeetings"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/mesas-tematicas/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.thematicTables"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/workshops-descentralizados/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.decentralizedWorkshops"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/iniciativas-bottom-up/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.bottomUpInitiatives"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(`</li></ul>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Navigation_menu_item) {
                  $$renderer4.push("<!--[-->");
                  Navigation_menu_item($$renderer4, {
                    children: ($$renderer5) => {
                      if (Navigation_menu_trigger) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_trigger($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<!---->${escape_html(t("nav.whatIsIt"))}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Navigation_menu_content) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_content($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<ul class="grid w-[280px] gap-4 p-2"><li>`);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/metodologia-st4s/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.st4sMethodology"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/metodologia-avaliacao-estrategica-ai2/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.strategicAssessmentMethodology"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/legislacao-nacional/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.nationalLegislation"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(`</li></ul>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
                $$renderer4.push(` `);
                if (Navigation_menu_item) {
                  $$renderer4.push("<!--[-->");
                  Navigation_menu_item($$renderer4, {
                    children: ($$renderer5) => {
                      if (Navigation_menu_trigger) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_trigger($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<!---->${escape_html(t("nav.aboutTeam"))}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                      $$renderer5.push(` `);
                      if (Navigation_menu_content) {
                        $$renderer5.push("<!--[-->");
                        Navigation_menu_content($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<ul class="grid w-[220px] gap-4 p-2"><li>`);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/coordenacao/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.coordination"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(` `);
                            if (Navigation_menu_link) {
                              $$renderer6.push("<!--[-->");
                              Navigation_menu_link($$renderer6, {
                                href: resolve("/equipa-peritos/"),
                                children: ($$renderer7) => {
                                  $$renderer7.push(`<!---->${escape_html(t("nav.expertTeam"))}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer6.push("<!--]-->");
                            } else {
                              $$renderer6.push("<!--[!-->");
                              $$renderer6.push("<!--]-->");
                            }
                            $$renderer6.push(`</li></ul>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
              },
              $$slots: { default: true }
            });
            $$renderer3.push("<!--]-->");
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push("<!--]-->");
          }
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function Popover($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, $$slots, $$events, ...restProps } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Popover$1) {
        $$renderer3.push("<!--[-->");
        Popover$1($$renderer3, spread_props([
          restProps,
          {
            get open() {
              return open;
            },
            set open($$value) {
              open = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open });
  });
}
function Popover_portal($$renderer, $$props) {
  let { $$slots, $$events, ...restProps } = $$props;
  if (Portal) {
    $$renderer.push("<!--[-->");
    Portal($$renderer, spread_props([restProps]));
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
}
function Popover_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      sideOffset = 4,
      align = "center",
      portalProps,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Popover_portal($$renderer3, spread_props([
        portalProps,
        {
          children: ($$renderer4) => {
            if (Popover_content$1) {
              $$renderer4.push("<!--[-->");
              Popover_content$1($$renderer4, spread_props([
                {
                  "data-slot": "popover-content",
                  sideOffset,
                  align,
                  class: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--bits-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
                },
                restProps,
                {
                  get ref() {
                    return ref;
                  },
                  set ref($$value) {
                    ref = $$value;
                    $$settled = false;
                  }
                }
              ]));
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
          },
          $$slots: { default: true }
        }
      ]));
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Popover_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Popover_trigger$1) {
        $$renderer3.push("<!--[-->");
        Popover_trigger$1($$renderer3, spread_props([
          { "data-slot": "popover-trigger", class: cn("", className) },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Mobile_nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className } = $$props;
    let open = false;
    function NavItem($$renderer3, { href, content, class: itemClassName, ...props }) {
      $$renderer3.push(`<a${attributes({
        href,
        class: clsx(cn("text-xl font-medium", itemClassName)),
        ...props
      })}>${escape_html(content)}</a>`);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Popover) {
        $$renderer3.push("<!--[-->");
        Popover($$renderer3, {
          get open() {
            return open;
          },
          set open($$value) {
            open = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            if (Popover_trigger) {
              $$renderer4.push("<!--[-->");
              Popover_trigger($$renderer4, {
                class: cn(buttonVariants({ variant: "ghost", size: "icon" }), className),
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="relative flex h-8 w-4 items-center justify-center"><div class="relative size-4"><span${attr_class(clsx(cn("absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100", open ? "top-[0.4rem] -rotate-45" : "top-1")))}></span> <span${attr_class(clsx(cn("absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100", open ? "top-[0.4rem] rotate-45" : "top-2.5")))}></span></div> <span class="sr-only">${escape_html(t("nav.toggleMenu"))}</span></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
            $$renderer4.push(` `);
            if (Popover_content) {
              $$renderer4.push("<!--[-->");
              Popover_content($$renderer4, {
                class: "no-scrollbar h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100",
                align: "start",
                side: "bottom",
                alignOffset: -16,
                sideOffset: 14,
                preventScroll: true,
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="flex flex-col gap-5 overflow-auto px-6 py-6">`);
                  NavItem($$renderer5, { href: resolve("/relatorios/"), content: t("nav.reports") });
                  $$renderer5.push(`<!----> <div class="flex flex-col gap-2"><div class="text-sm font-medium text-muted-foreground">${escape_html(t("nav.participationStrategy"))}</div> <div class="flex flex-col gap-2">`);
                  NavItem($$renderer5, {
                    href: resolve("/participacao-publica/"),
                    content: t("nav.publicParticipation")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/metodologia-participacao-publica/"),
                    content: t("nav.publicParticipationMethodology")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/comissao-acompanhamento/"),
                    content: t("nav.advisoryCommittee")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/apresentacao-publica/"),
                    content: t("nav.reports.presentations")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/reunioes-entidades/"),
                    content: t("nav.stakeholderMeetings")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/mesas-tematicas/"),
                    content: t("nav.thematicTables")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/workshops-descentralizados/"),
                    content: t("nav.decentralizedWorkshops")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/iniciativas-bottom-up/"),
                    content: t("nav.bottomUpInitiatives")
                  });
                  $$renderer5.push(`<!----></div></div> <div class="flex flex-col gap-2"><div class="text-sm font-medium text-muted-foreground">${escape_html(t("nav.whatIsIt"))}</div> <div class="flex flex-col gap-2">`);
                  NavItem($$renderer5, {
                    href: resolve("/metodologia-st4s/"),
                    content: t("nav.st4sMethodology")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/metodologia-avaliacao-estrategica-ai2/"),
                    content: t("nav.strategicAssessmentMethodology")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/legislacao-nacional/"),
                    content: t("nav.nationalLegislation")
                  });
                  $$renderer5.push(`<!----></div></div> <div class="flex flex-col gap-2"><div class="text-sm font-medium text-muted-foreground">${escape_html(t("nav.aboutTeam"))}</div> <div class="flex flex-col gap-2">`);
                  NavItem($$renderer5, {
                    href: resolve("/coordenacao/"),
                    content: t("nav.coordination")
                  });
                  $$renderer5.push(`<!----> `);
                  NavItem($$renderer5, {
                    href: resolve("/equipa-peritos/"),
                    content: t("nav.expertTeam")
                  });
                  $$renderer5.push(`<!----></div></div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push("<!--]-->");
            } else {
              $$renderer4.push("<!--[!-->");
              $$renderer4.push("<!--]-->");
            }
          },
          $$slots: { default: true }
        });
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<header class="sticky top-0 z-50 w-full border-b bg-background"><div class="container flex h-16 items-center gap-4">`);
    Logo($$renderer2, { class: "mr-auto h-10 w-auto" });
    $$renderer2.push(`<!----> `);
    Main_nav($$renderer2, { class: "hidden lg:flex" });
    $$renderer2.push(`<!----> <button${attr("title", t("lang.switchTo"))}${attr("aria-label", t("lang.switchTo"))} class="flex items-center rounded border px-2 py-1 text-xs font-semibold tracking-wide transition-colors hover:bg-muted"><span${attr_class(clsx("text-foreground"))}>PT</span> <span class="mx-0.5 text-muted-foreground">|</span> <span${attr_class(clsx("text-muted-foreground"))}>EN</span></button> `);
    Button($$renderer2, {
      href: "https://ai2participa.eu.consider.it/",
      target: "_blank",
      rel: "noopener noreferrer",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(t("header.participate"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Mobile_nav($$renderer2, { class: "flex lg:hidden" });
    $$renderer2.push(`<!----></div></header>`);
  });
}
function Scroll_area_scrollbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      orientation = "vertical",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Scroll_area_scrollbar$1) {
        $$renderer3.push("<!--[-->");
        Scroll_area_scrollbar$1($$renderer3, spread_props([
          {
            "data-slot": "scroll-area-scrollbar",
            orientation,
            class: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-s border-s-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className)
          },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              children?.($$renderer4);
              $$renderer4.push(`<!----> `);
              if (Scroll_area_thumb) {
                $$renderer4.push("<!--[-->");
                Scroll_area_thumb($$renderer4, {
                  "data-slot": "scroll-area-thumb",
                  class: "bg-border relative flex-1 rounded-full"
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Scroll_area($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      viewportRef = null,
      class: className,
      orientation = "vertical",
      scrollbarXClasses = "",
      scrollbarYClasses = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Scroll_area$1) {
        $$renderer3.push("<!--[-->");
        Scroll_area$1($$renderer3, spread_props([
          { "data-slot": "scroll-area", class: cn("relative", className) },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              if (Scroll_area_viewport) {
                $$renderer4.push("<!--[-->");
                Scroll_area_viewport($$renderer4, {
                  "data-slot": "scroll-area-viewport",
                  class: "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1",
                  get ref() {
                    return viewportRef;
                  },
                  set ref($$value) {
                    viewportRef = $$value;
                    $$settled = false;
                  },
                  children: ($$renderer5) => {
                    children?.($$renderer5);
                    $$renderer5.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(` `);
              if (orientation === "vertical" || orientation === "both") {
                $$renderer4.push("<!--[-->");
                Scroll_area_scrollbar($$renderer4, { orientation: "vertical", class: scrollbarYClasses });
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (orientation === "horizontal" || orientation === "both") {
                $$renderer4.push("<!--[-->");
                Scroll_area_scrollbar($$renderer4, { orientation: "horizontal", class: scrollbarXClasses });
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (Scroll_area_corner) {
                $$renderer4.push("<!--[-->");
                Scroll_area_corner($$renderer4, {});
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref, viewportRef });
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    Scroll_area($$renderer2, {
      class: "h-screen w-full",
      children: ($$renderer3) => {
        $$renderer3.push(`<div id="top"></div> `);
        Header($$renderer3);
        $$renderer3.push(`<!----> <main class="min-h-[calc(100vh-4rem)]">`);
        children($$renderer3);
        $$renderer3.push(`<!----></main> `);
        Footer($$renderer3);
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
  });
}
export {
  _layout as default
};
