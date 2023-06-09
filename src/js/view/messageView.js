import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class MessagesView extends View {
  _parentEl = document.querySelector('.messages');
  //   _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.message-window');
  _overlay = document.querySelector('.overlay-message');
  _btnClose = document.querySelector('.btn--close-message');
  _message = 'You successfully uploaded a recipe! :)';

  constructor() {
    super();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  showWindow() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  hideWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {}

  renderErrorProper(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this.showWindow();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessageProper(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this.showWindow();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new MessagesView();
