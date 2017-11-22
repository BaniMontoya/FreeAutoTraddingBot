function beep() {
  var snd = new Audio("audiofile");
  snd.play();
}
var moeda = prompt("qual moeda?  (bcn, btg, eth)");
inicial = $('body > div.wrap > nav > div.header__row.header__row_top.container.container_fluid.container_fluid_head.ui-clearfix > div:nth-child(5) > div > div > div.header-balance__block.header-balance__block_trading.ui-fl.ui-clearfix > div.header-balance__balance.ui-fl > div.header-balance__curr > div > a > span.balance.header-balance__curr-value.header-balance__value-visible').html();
$('body').append('<div id="tabela" style="padding: 6px;border: 6px solid cyan;overflow:hidden;position: fixed;z-index:99999999999;top: 50px;left: 0px;width: 100px;height: auto;background: rgba(255,255,255,0.8);"><label>cantidad:</label><input id="cantidad_input" style="    margin: 10px;" onchange="change()"/><label>margen ganho:</label><input id="ganho_input" style="    margin: 10px;" onchange="change()" />  <span style="    width: auto; position: relative; float: left;font-size: 20px" id="perdidas"></span><span style="    width: auto; position: relative; float: left;font-size: 20px" id="minimo"></span><span style="    width: 100%; position: relative; float: left;font-size: 20px ; margin:10px; display:none;" id="ganhos">GANHOS:</span><span style="    width: 100%; position: relative; float: left;font-size: 20px; display:none;" id="ganhos2"></span><button id="start"  style="display: block;float: right;font-size: 15px;" onclick="start(1000)">Start</button><button id="stop"  style="display:none;" onclick="stop(1000)">Stop</button></div>');

function change() {
  cantidad = $('#cantidad_input').val();
  ganho = $('#ganho_input').val();
}
if (moeda == 'btg') {
  cantidad = 0.009; // BCN 100 500 600, ETH, 0.002
  ganho = 0.6;
  fixed = 6; // BCN 10, ETH 6
}
if (moeda == 'bcn') {
  cantidad = 100; // BCN 100 500 600, ETH, 0.002
  ganho = 0.5;
  fixed = 10; // BCN 10, ETH 6
}
if (moeda == 'eth') {
  cantidad = 0.001; // BCN 100 500 600, ETH, 0.002
  ganho = 0.5;
  fixed = 6; // BCN 10, ETH 6
}
$('#cantidad_input').val(cantidad);
$('#ganho_input').val(ganho);

function tradea() {
  if (ganho < 0.11) {
    ganho = 0.2;
  }
  selecciona_orders = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__menu.tabs__menu_wide.ui-clearfix > div:nth-child(1)').click();
  // VENTA
  if ($('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div > div > div > table > tbody').find('tr:first').find('td').html() == 'No active orders') {
    selecciona_tab = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__menu.tabs__menu_wide.ui-clearfix > div:nth-child(3)').click();
    ultima_compra = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div.myTrades__scrollWrap.myTrades__scrollWrap_filtered > div > table > tbody > tr:nth-child(1) > td.trades__cell.trades__cell_price.trades__cell_align-center.trades__cell_mY-value.trades__actionBuy > span.formatNum > span').html();
    if ($('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div.myTrades__scrollWrap.myTrades__scrollWrap_filtered > div > table > tbody > tr:nth-child(1) > td.trades__cell.trades__cell_price.trades__cell_align-center.trades__cell_mY-value.trades__actionBuy > span.formatNum > span.formatNum_lower').html() !== undefined) {
      ultima_compra = ultima_compra + $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div.myTrades__scrollWrap.myTrades__scrollWrap_filtered > div > table > tbody > tr:nth-child(1) > td.trades__cell.trades__cell_price.trades__cell_align-center.trades__cell_mY-value.trades__actionBuy > span.formatNum > span.formatNum_lower').html();
    }
    valor1 = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer  > span > span').eq(0).html();
    if ($('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span.formatNum_lower').html() !== undefined)
    {
      valor1 = valor1 + $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span.formatNum_lower').html();
    }
    //chiquito = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span.formatNum_lower').html();
    //if(chiquito!='undefined'){
    //ultima_compra = ultima_compra + chiquito;
    //}
    fee1 = ((parseFloat(ultima_compra) / 100) * ganho);
    if (isNaN(ultima_compra) != true) {
      $('#ganhos2').html((parseFloat($('body > div.wrap > nav > div.header__row.header__row_top.container.container_fluid.container_fluid_head.ui-clearfix > div:nth-child(5) > div > div > div.header-balance__block.header-balance__block_trading.ui-fl.ui-clearfix > div.header-balance__balance.ui-fl > div.header-balance__curr > div > a > span.balance.header-balance__curr-value.header-balance__value-visible').html()).toFixed(fixed) - parseFloat(inicial).toFixed(fixed)).toFixed(fixed));
      if (parseFloat(ultima_compra) + fee1 < parseFloat(valor1)) {
        //$('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_balance > span.form_createOrder__userBalance').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__entries.ui-clearfix > div.form_createOrder__entries_label.form_createOrder__entries_labelAmount.form__row.ui-clearfix > div.form_createOrder__entries_container > span.ui-spinner.ui-widget.ui-widget-content.ui-corner-all > input').val(cantidad);
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__actions.ui-clearfix > button').click();
        beep()
        //beep();
      } else {
        //$('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_balance > span.form_createOrder__userBalance').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__entries.ui-clearfix > div.form_createOrder__entries_label.form_createOrder__entries_labelAmount.form__row.ui-clearfix > div.form_createOrder__entries_container > span.ui-spinner.ui-widget.ui-widget-content.ui-corner-all > input').val(cantidad);
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__entries.ui-clearfix > div.form_createOrder__entries_label.form__row.form_createOrder__entries_labelPrice.ui-clearfix > div.form_createOrder__entries_container > span.ui-spinner.ui-widget.ui-widget-content.ui-corner-all > input').val((parseFloat(ultima_compra) + fee1).toFixed(fixed))
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_sellOrder > div.window__window > div.window__body > form > div.form_createOrder__actions.ui-clearfix > button').click();
        beep()
      }
    }
    // COMPRA
    ultima_venta = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div.myTrades__scrollWrap.myTrades__scrollWrap_filtered > div > table > tbody > tr:nth-child(1) > td.trades__cell.trades__cell_price.trades__cell_align-center.trades__cell_mY-value.trades__actionSell > span.formatNum > span').html();
    if ($('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div.myTrades__scrollWrap.myTrades__scrollWrap_filtered > div > table > tbody > tr:nth-child(1) > td.trades__cell.trades__cell_price.trades__cell_align-center.trades__cell_mY-value.trades__actionSell > span.formatNum > span.formatNum_lower').html() !== undefined) {
      ultima_venta = ultima_venta + $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_myOrders.window_4-col.ui-resizable > div.window__window > div.window__body > div > div > div.tabs__content.tabs__content_myOrders > div.tabs__contentItem.tabs__contentItem_visible > div > div.myTrades__scrollWrap.myTrades__scrollWrap_filtered > div > table > tbody > tr:nth-child(1) > td.trades__cell.trades__cell_price.trades__cell_align-center.trades__cell_mY-value.trades__actionSell > span.formatNum > span.formatNum_lower').html();
    }
    valor2 = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer   > span > span ').eq(0).html();
    if ($('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span.formatNum_lower').html() !== undefined)
    {
      valor2 = valor2 + $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span.formatNum_lower').html();
    }
    //chiquito = $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer > span > span.formatNum_lower').html();
    //if(chiquito!='undefined'){
    //ultima_venta = ultima_venta + chiquito;
    //}
    fee2 = ((parseFloat(ultima_venta) / 100) * ganho);
    if (isNaN(ultima_venta) != true) {
      $('#ganhos2').html((parseFloat($('body > div.wrap > nav > div.header__row.header__row_top.container.container_fluid.container_fluid_head.ui-clearfix > div:nth-child(5) > div > div > div.header-balance__block.header-balance__block_trading.ui-fl.ui-clearfix > div.header-balance__balance.ui-fl > div.header-balance__curr > div > a > span.balance.header-balance__curr-value.header-balance__value-visible').html()).toFixed(fixed) - parseFloat(inicial).toFixed(fixed)).toFixed(fixed));
      if (parseFloat(ultima_venta) - fee2 > parseFloat(valor2)) {
        //$('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_balance > span.form_createOrder__userBalance').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__entries.ui-clearfix > div.form_createOrder__entries_label.form_createOrder__entries_labelAmount.form__row.ui-clearfix > div.form_createOrder__entries_container > span.ui-spinner.ui-widget.ui-widget-content.ui-corner-all > input').val(cantidad);
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__actions.ui-clearfix > button').click();
        beep();
        // beep()
      } else {
        // $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_balance > span.form_createOrder__userBalance').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__entries.ui-clearfix > div.form_createOrder__entries_label.form_createOrder__entries_labelAmount.form__row.ui-clearfix > div.form_createOrder__entries_container > span.ui-spinner.ui-widget.ui-widget-content.ui-corner-all > input').val(cantidad);
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__information > div.form_createOrder__information_offer > span.form_createOrder__offer').click();
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__entries.ui-clearfix > div.form_createOrder__entries_label.form__row.form_createOrder__entries_labelPrice.ui-clearfix > div.form_createOrder__entries_container > span.ui-spinner.ui-widget.ui-widget-content.ui-corner-all > input').val((parseFloat(ultima_venta) - fee2).toFixed(fixed));
        $('body > div.wrap > div.terminal__edit-container.on_advanced > div:nth-child(2) > div.terminal.on_advanced > div.terminal__window.window.terminal__window_buyOrder > div.window__window > div.window__body > form > div.form_createOrder__actions.ui-clearfix > button').click();
        beep();
        // beep()
      }
    }
  }
}

function start(tiempo) {
  $('#stop').show();
  $('#start').hide();
  trad = window.setInterval(tradea, tiempo);
}

function stop() {
  $('#start').show();
  $('#stop').hide();
  window.clearInterval(trad);
}
