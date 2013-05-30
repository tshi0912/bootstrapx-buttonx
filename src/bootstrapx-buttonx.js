/* ==========================================================
* bootstrapx-buttonx.js
* https://github.com/tshi0912/bootstrapx-buttonx
* version: 1.0
* ==========================================================
*
* Based on work from Twitter Bootstrap 
*
* ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTONX PUBLIC CLASS DEFINITION
  * ============================== */

  var Buttonx = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Buttonx.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , $txtel = this.$element.has('span').length ? this.$element.find('span') : this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'text'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $txtel[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }


 /* BUTTONX PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.buttonx

  $.fn.buttonx = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('buttonx')
        , options = typeof option == 'object' && option
      if (!data) $this.data('buttonx', (data = new Buttonx(this, options)))
      data.setState(option)
    })
  }

  $.fn.buttonx.defaults = {
    loadingText: 'loading...'
  }

  $.fn.buttonx.Constructor = Buttonx


 /* BUTTONX NO CONFLICT
  * ================== */

  $.fn.buttonx.noConflict = function () {
    $.fn.buttonx = old
    return this
  }

}(window.jQuery);