import image from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      const goToPage = +button.dataset.goto;
      handler(goToPage);
    });
  }

  // _generateButtons(page, curPage) {
  //   let button = document.createElement('button');
  //   button.innerText = page;
  //   document.querySelector('.pagination').appendChild(button);
  //   if ((curPage = page)) button.classList.add('btn-current');
  // }

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    const pages = new Array(numOfPages)
      .fill('')
      .map((page, i) => (page = i + 1));

    if (curPage) {
      return pages
        .map(page => {
          return `<button data-goto = "${page}" class="btn--inline ${
            curPage === page ? 'btn-current' : ''
          }">
          <span>${page}</span>
      </button>`;
        })
        .join('');
    }

    // if (curPage === 1 && numOfPages > 1) {
    //   return `
    //     <button data-goto = "${
    //       curPage + 1
    //     }"class="btn--inline pagination__btn--next">
    //         <span>${curPage + 1} Page</span>
    //         <svg class="search__icon">
    //             <use href="${image}#icon-arrow-right"></use>
    //         </svg>
    //     </button>
    //   `;
    // }

    // if (curPage === numOfPages && numOfPages > 1) {
    //   return `
    //     <button data-goto = "${
    //       curPage - 1
    //     }" class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //             <use href="${image}#icon-arrow-left"></use>
    //         </svg>
    //         <span>${curPage - 1} Page</span>
    //     </button>
    //   `;
    // }

    // if (curPage < numOfPages) {
    //   return `
    //     <button data-goto = "${
    //       curPage - 1
    //     }" class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //             <use href="${image}#icon-arrow-left"></use>
    //         </svg>
    //         <span>${curPage - 1} Page</span>
    //     </button>
    //     <button data-goto = "${
    //       curPage + 1
    //     }" class="btn--inline pagination__btn--next">
    //         <span>${curPage + 1} Page</span>
    //         <svg class="search__icon">
    //             <use href="${image}#icon-arrow-right"></use>
    //         </svg>
    //     </button>
    //   `;
    // }

    // return '';
  }
}

export default new PaginationView();
