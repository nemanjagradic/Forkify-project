import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import messagesView from './view/messageView.js';
import messageView from './view/messageView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearch(query);

    resultView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultPage(goToPage));

  paginationView.update(model.state.search);
};

const controlRecipeServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.bookmarkRecipe(model.state.recipe);
  else model.deleteBookmarkRecipe(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarksRender = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    messageView.showWindow();
    messageView.renderSpinner();

    await model.addRecipe(newRecipe);

    addRecipeView.toogleWindowAndOverlay();
    messageView.renderMessageProper();

    setTimeout(function () {
      messageView.hideWindow();
    }, 2500);

    recipeView.render(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error(err);
    messageView.renderErrorProper(err.message);
  }
};

const controlCheckIngredients = function () {
  addRecipeView.btnAddRowActive();
};

const controlAddRow = function () {
  try {
    if (!addRecipeView._btnAddRow.classList.contains('active')) {
      throw new Error('Please fill all fields before adding a new ingredient.');
    }

    addRecipeView.renderIngredientRow();

    addRecipeView.addHandlerCheckIngredients(controlCheckIngredients);
    const btnAddRow = document.querySelector('.upload__add-row');

    btnAddRow.classList = 'upload__add-row';
  } catch (err) {
    messagesView.renderMessageProper(err.message);
    console.log(err);
  }
};

const init = function () {
  bookmarksView.addHandlerLoad(controlBookmarksRender);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdate(controlRecipeServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  addRecipeView.addHandlerCheckIngredients(controlCheckIngredients);
  addRecipeView.addHandlerAddRow(controlAddRow);
};

init();
