( function Polifills() {
    
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
    if (window.Element && !window.Element.prototype.closest) {
    window.Element.prototype.closest = 
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement)); 
            return el;
        };
    }

}() );