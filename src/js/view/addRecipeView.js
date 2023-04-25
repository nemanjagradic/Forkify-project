import View from './View.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _ingredientsParent = document.querySelector('.ingredients-scrollbox');
  _message = 'You have successfully uploaded recipe :)';
  _errorMessage = '';

  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _btnAddRow = document.querySelector('.upload__add-row');

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      this.toogleWindowAndOverlay.bind(this)
    );
  }

  addHandlerHideWindow() {
    this._btnClose.addEventListener(
      'click',
      this.toogleWindowAndOverlay.bind(this)
    );
    this._overlay.addEventListener(
      'click',
      this.toogleWindowAndOverlay.bind(this)
    );
  }

  toogleWindowAndOverlay() {
    this._recipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  addHandlerCheckIngredients(handler) {
    const ingredientInputs = document.querySelectorAll(
      'input[name*=ingredient]'
    );
    ingredientInputs.forEach(ing => {
      ing.addEventListener('input', handler);
    });
  }

  btnAddRowActive(allFilled = true) {
    const btnAddRow = document.querySelector('.upload__add-row');
    const ingredientInputs = document.querySelectorAll(
      'input[name*=ingredient]'
    );

    ingredientInputs.forEach(input => {
      if (!input.value || input.value === '') allFilled = false;
    });

    if (allFilled) btnAddRow.classList.add('active');
  }

  addHandlerAddRow(handler) {
    const btnAddRow = document.querySelector('.upload__add-row');
    btnAddRow.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  renderIngredientRow() {
    const ingredientInputs = document.querySelectorAll(
      'input[name*=ingredient]'
    );
    const lastRowNumber = ingredientInputs.length / 3;
    const markup = `<div class="ingredient-row ${lastRowNumber + 1}">
                      <label>Ingredient ${lastRowNumber + 1}</label>
                      <input
                        type="text"
                        name="ingredient-${lastRowNumber + 1}-quantity"
                        placeholder="Quantity"
                      />
                      <input type="text" name="ingredient-${
                        lastRowNumber + 1
                      }-unit" placeholder="Unit" />
                      <input
                        type="text"
                        name="ingredient-${lastRowNumber + 1}-description"
                        placeholder="Description"
                      />
                    </div>`;
    this._ingredientsParent.insertAdjacentHTML(`beforeend`, markup);
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataEntries = [...new FormData(this)];
      const data = Object.fromEntries(dataEntries);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
