class FacetFiltersForm extends HTMLElement {
  constructor() {
    super(),
      (this.onActiveFilterClick = this.onActiveFilterClick.bind(this)),
      (this.debouncedOnSubmit = debounce((event) => {
        this.onSubmitHandler(event);
      }, 500)),
      this.querySelector("form").addEventListener(
        "input",
        this.debouncedOnSubmit.bind(this)
      );
    const facetWrapper = this.querySelector("#FacetsWrapperDesktop");
    facetWrapper && facetWrapper.addEventListener("keyup", onKeyUpEscape);
  }
  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state
        ? event.state.searchParams
        : FacetFiltersForm.searchParamsInitial;
      searchParams !== FacetFiltersForm.searchParamsPrev &&
        FacetFiltersForm.renderPage(searchParams, null, !1);
    };
    window.addEventListener("popstate", onHistoryChange);
  }
  static toggleActiveFacets(disable = !0) {
    document.querySelectorAll(".js-facet-remove").forEach((element) => {
      element.classList.toggle("disabled", disable);
    });
  }
  static renderPage(searchParams, event, updateURLHash = !0) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections(),
      countContainer = document.getElementById("ProductCountDesktop"),
      countContainerDesktop = document.getElementById("ProductCountDesktop");
    document
      .querySelectorAll(
        ".facets-container .loading__spinner, facet-filters-form .loading__spinner"
      )
      .forEach((spinner) => spinner.classList.remove("hidden")),
      document
        .getElementById("ProductGridContainer")
        .querySelector(".collection")
        .classList.add("loading"),
      countContainer && countContainer.classList.add("loading"),
      countContainerDesktop && countContainerDesktop.classList.add("loading"),
      sections.forEach((section) => {
        const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`,
          filterDataUrl = (element) => element.url === url;
        FacetFiltersForm.filterData.some(filterDataUrl)
          ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
          : FacetFiltersForm.renderSectionFromFetch(url, event);
      }),
      updateURLHash && FacetFiltersForm.updateURLHash(searchParams),
      setTimeout(function () {
        $(".product_variant_option").slick({
          dots: !1,
          infinite: !1,
          slidesToShow: 3,
          slidesToScroll: 1,
        });
      }, 1e3);
  }
  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText;
        (FacetFiltersForm.filterData = [
          ...FacetFiltersForm.filterData,
          { html, url },
        ]),
          FacetFiltersForm.renderFilters(html, event),
          FacetFiltersForm.renderProductGridContainer(html),
          FacetFiltersForm.renderProductCount(html),
          typeof initializeScrollAnimationTrigger == "function" &&
            initializeScrollAnimationTrigger(html.innerHTML);
      });
  }
  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event),
      FacetFiltersForm.renderProductGridContainer(html),
      FacetFiltersForm.renderProductCount(html),
      typeof initializeScrollAnimationTrigger == "function" &&
        initializeScrollAnimationTrigger(html.innerHTML);
  }
  static renderProductGridContainer(html) {
    (document.getElementById("ProductGridContainer").innerHTML = new DOMParser()
      .parseFromString(html, "text/html")
      .getElementById("ProductGridContainer").innerHTML),
      document
        .getElementById("ProductGridContainer")
        .querySelectorAll(".scroll-trigger")
        .forEach((element) => {
          element.classList.add("scroll-trigger--cancel");
        });
  }
  static renderProductCount(html) {
    const count = new DOMParser()
        .parseFromString(html, "text/html")
        .getElementById("ProductCountDesktop").innerHTML,
      container = document.getElementById("ProductCountDesktop"),
      containerDesktop = document.getElementById("ProductCountDesktop");
    (container.innerHTML = count),
      container.classList.remove("loading"),
      containerDesktop &&
        ((containerDesktop.innerHTML = count),
        containerDesktop.classList.remove("loading")),
      document
        .querySelectorAll(
          ".facets-container .loading__spinner, facet-filters-form .loading__spinner"
        )
        .forEach((spinner) => spinner.classList.add("hidden"));
  }
  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, "text/html"),
      facetDetailsElementsFromFetch = parsedHTML.querySelectorAll(
        "#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter"
      ),
      facetDetailsElementsFromDom = document.querySelectorAll(
        "#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter"
      );
    Array.from(facetDetailsElementsFromDom).forEach((currentElement) => {
      Array.from(facetDetailsElementsFromFetch).some(
        ({ id }) => currentElement.id === id
      ) || currentElement.remove();
    });
    const matchesId = (element) => {
        const jsFilter = event ? event.target.closest(".js-filter") : void 0;
        return jsFilter ? element.id === jsFilter.id : !1;
      },
      facetsToRender = Array.from(facetDetailsElementsFromFetch).filter(
        (element) => !matchesId(element)
      ),
      countsToRender = Array.from(facetDetailsElementsFromFetch).find(
        matchesId
      );
    if (
      (facetsToRender.forEach((elementToRender, index) => {
        if (document.getElementById(elementToRender.id))
          document.getElementById(elementToRender.id).innerHTML =
            elementToRender.innerHTML;
        else {
          if (index > 0) {
            const {
              className: previousElementClassName,
              id: previousElementId,
            } = facetsToRender[index - 1];
            if (elementToRender.className === previousElementClassName) {
              document.getElementById(previousElementId).after(elementToRender);
              return;
            }
          }
          elementToRender.parentElement &&
            document
              .querySelector(`#${elementToRender.parentElement.id} .js-filter`)
              .before(elementToRender);
        }
      }),
      FacetFiltersForm.renderActiveFacets(parsedHTML),
      FacetFiltersForm.renderAdditionalElements(parsedHTML),
      countsToRender)
    ) {
      const closestJSFilterID = event.target.closest(".js-filter").id;
      if (closestJSFilterID) {
        FacetFiltersForm.renderCounts(
          countsToRender,
          event.target.closest(".js-filter")
        ),
          FacetFiltersForm.renderMobileCounts(
            countsToRender,
            document.getElementById(closestJSFilterID)
          );
        const newFacetDetailsElement =
            document.getElementById(closestJSFilterID),
          newElementSelector = newFacetDetailsElement.classList.contains(
            "mobile-facets__details"
          )
            ? ".mobile-facets__close-button"
            : ".facets__summary",
          newElementToActivate =
            newFacetDetailsElement.querySelector(newElementSelector);
        newElementToActivate && newElementToActivate.focus();
      }
    }
  }
  static renderActiveFacets(html) {
    [".active-facets-mobile", ".active-facets-desktop"].forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      activeFacetsElement &&
        (document.querySelector(selector).innerHTML =
          activeFacetsElement.innerHTML);
    }),
      FacetFiltersForm.toggleActiveFacets(!1);
  }
  static renderAdditionalElements(html) {
    [".mobile-facets__open", ".mobile-facets__count", ".sorting"].forEach(
      (selector) => {
        html.querySelector(selector) &&
          (document.querySelector(selector).innerHTML =
            html.querySelector(selector).innerHTML);
      }
    ),
      document
        .getElementById("FacetFiltersFormMobile")
        .closest("menu-drawer")
        .bindEvents();
  }
  static renderCounts(source, target) {
    const targetSummary = target.querySelector(".facets__summary"),
      sourceSummary = source.querySelector(".facets__summary");
    sourceSummary &&
      targetSummary &&
      (targetSummary.outerHTML = sourceSummary.outerHTML);
    const targetHeaderElement = target.querySelector(".facets__header"),
      sourceHeaderElement = source.querySelector(".facets__header");
    sourceHeaderElement &&
      targetHeaderElement &&
      (targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML);
    const targetWrapElement = target.querySelector(".facets-wrap"),
      sourceWrapElement = source.querySelector(".facets-wrap");
    sourceWrapElement &&
      targetWrapElement &&
      (target.querySelector("show-more-button .label-show-more.hidden") &&
        sourceWrapElement
          .querySelectorAll(".facets__item.hidden")
          .forEach((hiddenItem) =>
            hiddenItem.classList.replace("hidden", "show-more-item")
          ),
      (targetWrapElement.outerHTML = sourceWrapElement.outerHTML));
  }
  static renderMobileCounts(source, target) {
    const targetFacetsList = target.querySelector(".mobile-facets__list"),
      sourceFacetsList = source.querySelector(".mobile-facets__list");
    sourceFacetsList &&
      targetFacetsList &&
      (targetFacetsList.outerHTML = sourceFacetsList.outerHTML);
  }
  static updateURLHash(searchParams) {
    history.pushState(
      { searchParams },
      "",
      `${window.location.pathname}${searchParams && "?".concat(searchParams)}`
    );
  }
  static getSections() {
    return [{ section: document.getElementById("Huratips-Loop").dataset.id }];
  }
  createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }
  onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll(
      "facet-filters-form form"
    );
    if (event.srcElement.className == "mobile-facets__checkbox") {
      const searchParams = this.createSearchParams(
        event.target.closest("form")
      );
      this.onSubmitForm(searchParams, event);
    } else {
      const forms = [],
        isMobile = event.target.closest("form").id === "FacetFiltersFormMobile";
      sortFilterForms.forEach((form) => {
        isMobile
          ? form.id === "FacetFiltersFormMobile" &&
            forms.push(this.createSearchParams(form))
          : (form.id === "FacetSortForm" ||
              form.id === "FacetFiltersForm" ||
              form.id === "FacetSortDrawerForm") &&
            (document
              .querySelectorAll(".no-js-list")
              .forEach((el) => el.remove()),
            forms.push(this.createSearchParams(form)));
      }),
        this.onSubmitForm(forms.join("&"), event);
    }
  }
  onActiveFilterClick(event) {
    event.preventDefault(), FacetFiltersForm.toggleActiveFacets();
    const url =
      event.currentTarget.href.indexOf("?") == -1
        ? ""
        : event.currentTarget.href.slice(
            event.currentTarget.href.indexOf("?") + 1
          );
    FacetFiltersForm.renderPage(url);
  }
}
(FacetFiltersForm.filterData = []),
  (FacetFiltersForm.searchParamsInitial = window.location.search.slice(1)),
  (FacetFiltersForm.searchParamsPrev = window.location.search.slice(1)),
  customElements.define("facet-filters-form", FacetFiltersForm),
  FacetFiltersForm.setListeners();
class PriceRange extends HTMLElement {
  constructor() {
    super(),
      this.querySelectorAll("input").forEach((element) =>
        element.addEventListener("change", this.onRangeChange.bind(this))
      ),
      this.setMinAndMaxValues();
  }
  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget), this.setMinAndMaxValues();
  }
  setMinAndMaxValues() {
    const inputs = this.querySelectorAll("input"),
      minInput = inputs[0],
      maxInput = inputs[1];
    maxInput.value && minInput.setAttribute("max", maxInput.value),
      minInput.value && maxInput.setAttribute("min", minInput.value),
      minInput.value === "" && maxInput.setAttribute("min", 0),
      maxInput.value === "" &&
        minInput.setAttribute("max", maxInput.getAttribute("max"));
  }
  adjustToValidValues(input) {
    const value = Number(input.value),
      min = Number(input.getAttribute("min")),
      max = Number(input.getAttribute("max"));
    value < min && (input.value = min), value > max && (input.value = max);
  }
}
customElements.define("price-range", PriceRange);
class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector("a");
    facetLink.setAttribute("role", "button"),
      facetLink.addEventListener("click", this.closeFilter.bind(this)),
      facetLink.addEventListener("keyup", (event) => {
        event.preventDefault(),
          event.code.toUpperCase() === "SPACE" && this.closeFilter(event);
      });
  }
  closeFilter(event) {
    event.preventDefault(),
      (
        this.closest("facet-filters-form") ||
        document.querySelector("facet-filters-form")
      ).onActiveFilterClick(event);
  }
}
customElements.define("facet-remove", FacetRemove);
//# sourceMappingURL=/s/files/1/0282/8425/6353/t/173/assets/facets.js.map?v=1715313652
