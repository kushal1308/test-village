$(document).ready(function () {
  $(".header__icons").css("opacity", "1");
}),
  document.addEventListener("DOMContentLoaded", function () {
    if (
      ((document.querySelector(".header .custom-search").style.opacity = "1"),
      window.innerWidth > 989)
    ) {
      var listMenuItems = document.querySelectorAll(".list-menu li");
      listMenuItems.forEach(function (item) {
        item.addEventListener("mouseenter", function () {
          this.querySelector("details") &&
            ((this.querySelector("details").open = !0),
            this.querySelector("summary").setAttribute("aria-expanded", !0));
        }),
          item.addEventListener("mouseleave", function () {
            this.querySelector("details") &&
              ((this.querySelector("details").open = !1),
              this.querySelector("summary").setAttribute("aria-expanded", !1));
          });
      });
    }
  });
let newLetter = document.querySelector(".newsletter_wrapper"),
  tabButton = document.querySelectorAll(".tab-button"),
  contents = document.querySelectorAll(".content");
(newLetter.onclick = (e) => {
  let id = e.target.dataset.id;
  id &&
    (tabButton.forEach((btn) => {
      btn.classList.remove("active");
    }),
    e.target.classList.add("active"),
    contents.forEach((content) => {
      content.classList.remove("active");
    }),
    document.getElementById(id).classList.add("active"));
}),
  $(document).on(
    "click",
    ".product_coloropti .variant_divval .variant_cuatom_se",
    function () {
      $(this)
        .parents(".grid__item")
        .find(".product_coloropti .variant_divval .variant_cuatom_se")
        .removeClass("active"),
        $(this).addClass("active"),
        $(this)
          .parents(".grid__item")
          .find(".card__inner .media .provar_img")
          .removeClass("active");

      var variant_id_sel = $(this).find("label").attr("data_variant_id");
      var product_price = $(this).find("label").attr("original_variant_price");
      var compare_price = $(this).find("label").attr("compare_variant_price");

      if (!compare_price) {
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--regular .money")
          .empty()
          .append(compare_price);
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--sale .money")
          .empty()
          .append(product_price);
        $(this)
          .parents(".card__content")
          .find(".new_price_color")
          .addClass("without_sale")
          .removeClass("with_sale");
        $(this)
          .parents(".card__content")
          .find(".price__regular .price-item.price-item--regular .money")
          .empty()
          .append(product_price);
      } else {
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--regular .money")
          .empty()
          .append(compare_price);
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--sale .money")
          .empty()
          .append(product_price);
        $(this)
          .parents(".card__content")
          .find(".new_price_color")
          .addClass("with_sale")
          .removeClass("without_sale");
      }

      $(this)
        .parents(".grid__item")
        .find(".card__inner .media img")
        .each(function () {
          var var_pro_id = $(this).attr("data_variant_id");
          var_pro_id == variant_id_sel
            ? $(this).addClass("active")
            : $(this).removeClass("active");
        });
    }
  ),
  $(".product_variant_option").slick({
    dots: !1,
    infinite: !1,
    slidesToShow: 3,
    slidesToScroll: 1,
  });

$(".option_blocks input").click(function () {
  var color_name = $(this)
    .parent(".option_blocks")
    .find(".col_color_name")
    .text();
  $(".choose_color").text(color_name);
});
//# sourceMappingURL=/s/files/1/0282/8425/6353/t/173/assets/custom.js.map?v=1715313651

$(".product__accordion").each(function () {
  var accordionContent = $(this).find(".accordion__content");
  if ($.trim(accordionContent.html()) === "") {
    $(this).remove();
  }
});

$(document).ready(function () {
  $(".product_coloropti .variant_divval .variant_cuatom_se.active").each(
    function () {
      var variant_id_sel = $(this).find("label").attr("data_variant_id");
      var product_price = $(this).find("label").attr("original_variant_price");
      var compare_price = $(this).find("label").attr("compare_variant_price");

      if (!compare_price) {
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--regular .money")
          .empty()
          .append(compare_price);
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--sale .money")
          .empty()
          .append(product_price);
        $(this)
          .parents(".card__content")
          .find(".new_price_color")
          .addClass("without_sale")
          .removeClass("with_sale");
        $(this)
          .parents(".card__content")
          .find(".price__regular .price-item.price-item--regular .money")
          .empty()
          .append(product_price);
      } else {
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--regular .money")
          .empty()
          .append(compare_price);
        $(this)
          .parents(".card__content")
          .find(".price__sale .price-item.price-item--sale .money")
          .empty()
          .append(product_price);
        $(this)
          .parents(".card__content")
          .find(".new_price_color")
          .addClass("with_sale")
          .removeClass("without_sale");
      }
    }
  );

  $("#menu-drawer .drawer_close svg").on("click", function () {
    $("#Details-menu-drawer-container .header__icon ").trigger("click");
  });
  $(".submain_menu_heading.menu-drawer__menu-item--active").on(
    "click",
    function () {
      $(this)
        .siblings(".menu-drawer__submenu")
        .find(".menu-drawer__menus li details")
        .attr("open", "open");
    }
  );
});

$(document).on("click", "#remove_filter", function () {
  $(".active-facets__button-remove")[0].click();
});

$("#menu-drawer .drawer_close svg").on("click", function () {
  $("#Details-menu-drawer-container .header__icon ").trigger("click");
});

//  collection page navigation js start

$(document).ready(function () {
  $(".child_link_name.active").parents("ul").slideDown();
  $(".sub_link_name.active").parents("ul").slideDown();
  $(".child_link_name.active")
    .parents(".sub_link_name")
    .addClass("arrow_active");
  $(".sub_link_name.arrow_active")
    .parents(".main_link_name")
    .addClass("arrow_active");

  // Handle main link click
  // $(".main_link_name").click(function (event) {
  $(document).on("click", ".main_link_name", function () {
    event.stopPropagation();

    // Check if the clicked main link is already active
    var isActive = $(this).hasClass("arrow_active");

    // Close other open main links and their sub-links
    $(".main_link_name")
      .not(this)
      .removeClass("arrow_active")
      .find(".sub_link")
      .slideUp();
    $(".sub_link_name")
      .removeClass("arrow_active")
      .find(".child_link")
      .slideUp(); // Close all sub links and their children

    // If the clicked main link was not active, open it
    if (!isActive) {
    }
    $(this).toggleClass("arrow_active").find(".sub_link").slideToggle();
  });

  // Handle sub link click
  // $(".sub_link_name")
  //   .off("click")
  //   .on("click", function (event) {
  //     event.stopPropagation();

  //     // Check if the clicked sub link is already active
  //     var isSubActive = $(this).hasClass("arrow_active");

  //     // Close other open sub-links and their child links
  //     $(".sub_link_name")
  //       .not(this)
  //       .removeClass("arrow_active")
  //       .find(".child_link")
  //       .slideUp();

  //     // Toggle the clicked sub link
  //     if (!isSubActive) {
  //       $(this).addClass("arrow_active").find(".child_link").slideDown();
  //     } else {
  //       $(this).removeClass("arrow_active").find(".child_link").slideUp();
  //     }
  //   });

  $(document).on("click", ".sub_link_name", function (event) {
    event.stopPropagation();

    // Check if the clicked sub link is already active
    var isSubActive = $(this).hasClass("arrow_active");

    // Close other open sub-links and their child links
    $(".sub_link_name")
      .not(this)
      .removeClass("arrow_active")
      .find(".child_link")
      .slideUp();

    // Toggle the clicked sub link
    if (!isSubActive) {
      $(this).addClass("arrow_active").find(".child_link").slideDown();
    } else {
      $(this).removeClass("arrow_active").find(".child_link").slideUp();
    }
  });

  $(".categories-filter").attr("open", true).addClass("menu-opening");

  // $("details.mobile-facets__details").click(function () {
  $(document).on("click", "details.mobile-facets__details", function () {
    $("details.mobile-facets__details")
      .not(this)
      .removeAttr("open")
      .removeClass("menu-opening");
    $(".categories-filter")
      .not(this)
      .removeAttr("open")
      .removeClass("menu-opening");
  });
});

// collection page navigation js end
$(document).ready(function () {
  $(".mobile-facets__close").on("click", function () {
    setTimeout(function () {
      $(".mobile-facets__inner .categories-filter")
        .attr("open", true)
        .addClass("menu-opening");
    }, 1000); // Delay execution by 1 second (1000 milliseconds)
  });

  $("#apply_filter").on("click", function () {
    setTimeout(function () {
      $(".categories-filter").attr("open", true).addClass("menu-opening");
    }, 1000); // Delay execution by 1 second (1000 milliseconds)
  });

  $("#remove_filter").on("click", function () {
    setTimeout(function () {
      $(".categories-filter").attr("open", true).addClass("menu-opening");
    }, 1000); // Delay execution by 1 second (1000 milliseconds)
  });

  $(document).on("click", ".facet-checkbox input", function (e) {
    $("#FacetFiltersForm").css("pointer-events", "none");
    setTimeout(function () {
      $("#FacetFiltersForm").css("pointer-events", "auto");
    }, 2000);
  });
});

$(document).ready(function () {
  function checkAndToggleFilterVisibility() {
    let childCount = $(".custom_filter_selected").children().length;
    if (childCount <= 1) {
      $(".custom_filter_selected").hide();
    } else {
      $(".custom_filter_selected").show();
    }
  }
  checkAndToggleFilterVisibility();

  $(document).on("click", ".custom_filter_data #remove_filter", function () {
    // alert("hello");
    setTimeout(function () {
      checkAndToggleFilterVisibility();
    }, 1000);
  });

  $(document).on("click", ".active-facets__button", function () {
    // alert("hello");
    setTimeout(function () {
      checkAndToggleFilterVisibility();
    }, 1000);
  });

  if ($("ul.facets-layout-list.notes li").length == 0) {
    $("ul.facets-layout-list.notes")
      .parents("details.facets__disclosure-vertical")
      .hide();
  }
  if ($("ul.facets-layout-list.notes li").length == 0) {
    $("ul.facets-layout-list.notes")
      .parents("details.mobile-facets__details")
      .hide();
  }
  $("ul.facets-layout-list.notes")
    .parents("details.facets__disclosure-vertical")
    .find(".button-show-more")
    .hide();

  updateStickyPrice();
  $(".option_blocks input").click(function () {
    updateStickyPrice();

    $(".product-detail-page variant-selects .product-form__input").css(
      "pointer-events",
      "none"
    );

    setTimeout(function () {
      $(".product-detail-page variant-selects .product-form__input").css(
        "pointer-events",
        "auto"
      );
    }, 500);
  });
  $(".select_option_product_detail").on("change", function () {
    updateStickyPrice();
  });
  if ($(".product-form__submit").is('[disabled="disabled"]')) {
    $(".sticky_add").attr("disabled", "disabled");
  } else {
    $(".sticky_add").removeAttr("disabled");
  }
});

function updateStickyPrice() {
  $(".product-detail-page variant-selects .product-form__input").css(
    "pointer-events",
    "none"
  );
  setTimeout(function () {
    $(".product_bootom_sticky .product__price").empty();
    var firstDivHtml = $(".price_product_detail .price.price--large").html();
    $(".product_bootom_sticky").find(".product__price").append(firstDivHtml);
    $(".product_bootom_sticky .product-form__buttons button").load(
      location.href + " .product_bootom_sticky .product-form__buttons button>*",
      ""
    );
    if ($(".product-form__submit").is('[disabled="disabled"]')) {
      $(".sticky_add").attr("disabled", "disabled");
    } else {
      $(".sticky_add").removeAttr("disabled");
    }
    $(".product-detail-page variant-selects .product-form__input").css(
      "pointer-events",
      "auto"
    );
  }, 1200);
}
