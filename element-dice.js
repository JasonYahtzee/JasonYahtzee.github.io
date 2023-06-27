customElements.define("game-dice", class extends HTMLElement {
    static get observedAttributes() {
        return ["value"];
    }
    connectedCallback() {
        if(!this.hasAttribute("value")) this.render(6);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.render(newValue);
    }
    render(value = this.getAttribute("value") || 6) {
        this.innerHTML = `<div id="dicetest" class="diceface">` +
            "<span class='pip'></span>".repeat(value) +
            `</div>`
    }
    roll(value = false) {
        if (value) this.render(value);
        else {
            // random generator value
        }

    }
})

