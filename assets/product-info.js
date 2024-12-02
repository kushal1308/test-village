customElements.get("product-info")||customElements.define("product-info",class extends HTMLElement{constructor(){super(),this.input=this.querySelector(".quantity__input"),this.currentVariant=this.querySelector(".product-variant-id"),this.submitButton=this.querySelector('[type="submit"]')}cartUpdateUnsubscriber=void 0;variantChangeUnsubscriber=void 0;connectedCallback(){this.input&&(this.quantityForm=this.querySelector(".product-form__quantity"),this.quantityForm&&(this.setQuantityBoundries(),this.dataset.originalSection||(this.cartUpdateUnsubscriber=subscribe(PUB_SUB_EVENTS.cartUpdate,this.fetchQuantityRules.bind(this))),this.variantChangeUnsubscriber=subscribe(PUB_SUB_EVENTS.variantChange,event=>{const sectionId=this.dataset.originalSection?this.dataset.originalSection:this.dataset.section;event.data.sectionId===sectionId&&(this.updateQuantityRules(event.data.sectionId,event.data.html),this.setQuantityBoundries())})))}disconnectedCallback(){this.cartUpdateUnsubscriber&&this.cartUpdateUnsubscriber(),this.variantChangeUnsubscriber&&this.variantChangeUnsubscriber()}setQuantityBoundries(){const data={cartQuantity:this.input.dataset.cartQuantity?parseInt(this.input.dataset.cartQuantity):0,min:this.input.dataset.min?parseInt(this.input.dataset.min):1,max:this.input.dataset.max?parseInt(this.input.dataset.max):null,step:this.input.step?parseInt(this.input.step):1};let min=data.min;const max=data.max===null?data.max:data.max-data.cartQuantity;max!==null&&(min=Math.min(min,max)),data.cartQuantity>=data.min&&(min=Math.min(min,data.step)),this.input.min=min,this.input.max=max,this.input.value=min,publish(PUB_SUB_EVENTS.quantityUpdate,void 0)}fetchQuantityRules(){!this.currentVariant||!this.currentVariant.value||(this.querySelector(".quantity__rules-cart .loading__spinner").classList.remove("hidden"),fetch(`${this.dataset.url}?variant=${this.currentVariant.value}&section_id=${this.dataset.section}`).then(response=>response.text()).then(responseText=>{const html=new DOMParser().parseFromString(responseText,"text/html");this.updateQuantityRules(this.dataset.section,html),this.setQuantityBoundries()}).catch(e=>{console.error(e)}).finally(()=>{this.querySelector(".quantity__rules-cart .loading__spinner").classList.add("hidden")}))}updateQuantityRules(sectionId,html){const quantityFormUpdated=html.getElementById(`Quantity-Form-${sectionId}`),selectors=[".quantity__input",".quantity__rules",".quantity__label"];for(let selector of selectors){const current=this.quantityForm.querySelector(selector),updated=quantityFormUpdated.querySelector(selector);if(!(!current||!updated))if(selector===".quantity__input"){const attributes=["data-cart-quantity","data-min","data-max","step"];for(let attribute of attributes){const valueUpdated=updated.getAttribute(attribute);valueUpdated!==null&&current.setAttribute(attribute,valueUpdated)}}else current.innerHTML=updated.innerHTML}}}),document.addEventListener("DOMContentLoaded",function(){setTimeout(()=>{var variant_price=$(this).find(":selected").val();$(".selected_variant_price option").each(function(params){var option_nas=$(this).val();option_nas==variant_price&&$(this).attr("selected","selected")});let val_price=$(".selected_variant_price :selected").attr("data_price"),val_pare_find=$(".product_bootom_sticky .product__price .price__regular .money").text(val_price),btn_val=$(".product__info-container").find(".product-form__submit span").text().trim();$(".product_bootom_sticky .product-form__cart-submit span").text(btn_val),$(".product_bootom_sticky .product-form__cart-submit span").text()=="Sold out"&&$(".product_bootom_sticky .product-form__submit_btyn").addClass("sold_out_value")})}),$(".product_bootom_sticky .qtybox .btnqty").on("click",function(){var qty=parseInt($(this).parent(".qtybox").find(".quantity-input").val());$(this).hasClass("qtyplus")?qty++:qty>1&&qty--,qty=isNaN(qty)?1:qty,$(this).parent(".qtybox").find(".quantity-input").val(qty),$(".product_qunatity").text(qty)}),$(".product__info-container .select_option_product_detail").on("change",function(){var variant_price=$(this).find(":selected").val();$(".selected_variant_price option").each(function(params){var option_nas=$(this).val();option_nas==variant_price?$(this).attr("selected","selected"):$(this).removeAttr("selected")});let val_price=$(this).parents().find(".selected_variant_price :selected").attr("data_price"),val_pare_find=$(this).parents().find(".product_bootom_sticky .product__price .price__regular .money").text(val_price),btn_val=$(this).parents(".product__info-container").find(".product-form__submit span").text().trim();$(this).parents().find(".product_bootom_sticky .product-form__cart-submit span").text(btn_val),$(this).parents().find(".product_bootom_sticky .product-form__cart-submit span").text()=="Sold out"&&$(this).parents().find(".product_bootom_sticky .product-form__submit_btyn").addClass("sold_out_value")}),$(".product_bootom_sticky .qtyminus").click(function(){return $("quantity-input").find('button[name="minus"]').trigger("click"),!1}),$(".product_bootom_sticky .qtyplus").click(function(){return $("quantity-input").find('button[name="plus"]').trigger("click"),!1}),$(".product_bootom_sticky .product-form__submit_btyn").click(function(){return $(".product__info-container .product-form__submit").trigger("click"),!1}),$(".product-detail-page quantity-input button").click(function(){debugger;var qu1=$(this).parents("quantity-input").find('input[name="quantity"]').val();$(this).parents().find('.product_bootom_sticky input[id="quantity"]').attr("value",qu1)});
//# sourceMappingURL=/s/files/1/0282/8425/6353/t/173/assets/product-info.js.map?v=1715313651
