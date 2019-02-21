'use strict';

class CardComponent {
  constructor(card) {
    this.card = card;
  }

  get render() {
    return `<div class="card cardTemplate" style="width: 20rem;">
                  <div class="card-body">
                  <h4 class="title">${this.card.title}</h4>
                  <h6 class="subtitle mb-2 text-muted">${
                    this.card.subtitle
                  }</h6>
                  <p class="text">${this.card.text}</p>
                  <a href="${this.card.link}" class="link">link</a>
                  </div>
              </div>`;
  }
}

class ListCardsComponent {
  constructor(cards) {
    this.cards = cards;
  }

  get render() {
    return this.cards
      .map(card => {
        return new CardComponent(card).render;
      })
      .join(' ');
  }
}

const render = function(template, selector) {
  var node = document.querySelector(selector);
  if (!node) return;
  node.innerHTML = template;
};

const renderCards = callback => {
  fetch('cards.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      render(new ListCardsComponent(result).render, '.main');
    })
    .catch(function(error) {
      console.log(error);
    });
};

(() => {
  renderCards();
})();
