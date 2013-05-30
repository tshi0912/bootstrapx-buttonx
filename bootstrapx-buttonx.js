/* ==========================================================
* bootstrapx-buttonx.js
* https://github.com/tshi0912/bootstrapx-buttonx
* version: 1.0
* ==========================================================
*
* Based on work from Twitter Bootstrap and
* from Popover library https://github.com/tshi0912/bootstrapx-popoverx
* from the great guys at Twitter.
*
* Untested with 2.1.0 but should worked with 2.0.x
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

  Buttonx.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
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
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
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


 /* BUTTONX DATA-API
  * =============== */

  $(document).on('click.buttonx.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.buttonx('toggle')
  })

}(window.jQuery);