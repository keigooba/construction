// 共通関数等
(function() {
	window.common = {};

	common.dialog = {};

	/**
	 * 表示前の共通処理を追加します。
	 */
	common.dialog._show = function($dialog){
		// 独自のフェードイン
		$dialog.one("show.bs.modal", function(){
			$(this).css({opacity: 0}).animate({opacity: 1}, 100);
		});
		// 検査シミュレータは結果ダイアログの上で画像ダイアログを開くなどがあるので、
		// ダイアログを閉じてもまだダイアログが開いていればmodal-openクラスを付けたままにする
		$dialog.one("hide.bs.modal", function(){
			var isModalShow = false;
			$(".modal").each(function(){
				if ($(this).is(":visible")) {
					isModalShow = true;
				}
			});

			if (isModalShow) setTimeout(function(){ $("body").addClass("modal-open") }, 10);
		});
		// tabindexをセットしないとkeyboard: trueでもESCが効かない
		$dialog.prop("tabindex", -1);
		// 多言語対応
		//common.dialog._applyMsg($dialog);
		// 表示
		$dialog.modal('show');
	};
	/**
	 * 多言語対応を行います。(問題実施の際は言語切り替えによって多言語対応を行うためこの関数自体の上書きを行います)
	 */
	common.dialog._applyMsg = function($dialog){
		// 多言語対応
		common.msg.applyTo($dialog);
	};

	/**
	 * 通常ダイアログを表示します。
	 */
	common.dialog.alert = function(message, fn){
		var def = new jQuery.Deferred();

		var $dialog = $("#common-alert-modal");
		if ($dialog.length == 0) {
			$dialog = $('\
				<div class="modal" id="common-alert-modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
								<div class="modal-title" data-msgname="dialog_alert_title">メッセージ</div>\
							</div>\
							<div class="modal-body">\
							</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary" data-dismiss="modal" data-msgname="dialog_ok">OK</button>\
							</div>\
						</div>\
					</div>\
				</div>\
			');
			$dialog.appendTo("body");
		}
		$dialog.find(".modal-body").text(message);
		$dialog.one("hide.bs.modal", function(){
			if (fn) fn();
			def.resolve();
		});
		common.dialog._show($dialog);

		return def;
	};

	/**
	 * 確認メッセージを表示します。
	 * @param Function fn 「はい」が押された時に実行される関数
	 */
	common.dialog.confirm = function(message, fn){
		var def = new jQuery.Deferred();

		var $dialog = $("#common-qaconfirm-modal");
		if ($dialog.length == 0) {
			$dialog = $('\
				<div class="modal" id="common-confirm-modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
								<div class="modal-title" data-msgname="dialog_confirm_title">確認</div>\
							</div>\
							<div class="modal-body">\
							</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary yes-button" data-msgname="dialog_yes">はい</button>\
								<button type="button" class="btn btn-default no-button" data-dismiss="modal" data-msgname="dialog_no">いいえ</button>\
							</div>\
						</div>\
					</div>\
				</div>\
			');
			$dialog.appendTo("body");
		}
		$dialog.find(".modal-body").text(message);
		$dialog.find(".yes-button").click(function(){
			$dialog.modal('hide');
			if (fn) fn();
			def.resolve();
		});
		common.dialog._show($dialog);

		return def;
	};

	/**
	 * エラーメッセージを表示します。
	 * @param  String message メッセージ
	 */
	common.dialog.error = function(message, fn){
		var def = new jQuery.Deferred();

		var $dialog = $("#common-error-modal");
		if ($dialog.length == 0) {
			$dialog = $('\
				<div class="modal" id="common-error-modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
								<div class="modal-title" data-msgname="dialog_title_error">エラー</div>\
							</div>\
							<div class="modal-body">\
							</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary" data-dismiss="modal" data-msgname="dialog_close">閉じる</button>\
							</div>\
						</div>\
					</div>\
				</div>\
			');
			$dialog.appendTo("body");
		}
		$dialog.find(".modal-body").text(message);
		$dialog.one("hide.bs.modal", function(){
			if (fn) fn();
			def.resolve();
		});
		common.dialog._show($dialog);

		return def;
	};

	/**
	 * HTMLエスケープを行います。
	 * @param String s エスケープ対象の文字列
	 */
	common.h = function(s) {
		var map = {
			"<" : "&lt;",
			">" : "&gt;",
			"&" : "&amp;",
			"\"": "&#quot;",
			"'" : "&#39;"
		}
		return String(s).replace(/[<>&"']/g, function(c){
			return map[c];
		});
	};
	// 特別に h() でも使えるようにします。
	window.h = common.h;

	/**
	 * srcRowからrowに各セルのクラス名をコピーします。
	 */
	common.copyClassNames = function($row, $srcRow) {
		var classNames = [];
		$srcRow.find("th, td").each(function(){
			classNames.push(this.className);
		});

		$row.find("th, td").each(function(i){
			this.className = classNames[i];
		});
	}

	// システムメッセージ
	common.msg = {};
	// システムメッセージの既定言語(common-metaからセット)
	common.msg.defaultLanguage = 1;
	// システムメッセージデータ (common-metaからセット)
	common.msg.data = {};
	/**
	 * メッセージを取得します。
	 * @param String name メッセージ内部名
	 * @param Array params パラメータリスト (不要な場合nullか空配列)
	 * @param String|Number language 言語 (指定されていない場合はcommon.msg.defaultLanguage)
	 * @return String メッセージ
	 */
	common.msg.get = function(name, params, language){
		// パラメータ配列がない場合null
		if (typeof params == "undefined") {
			params = null;
		}
		// 言語がない場合defaultLanguage
		if (typeof language == "undefined") {
			language = common.msg.defaultLanguage;
		}

		// データがある場合メッセージデータ。ない場合空文字
		if (name in common.msg.data && language in common.msg.data[name]) {
			// paramsとvsprintf()がある場合
			if (params && params.length >= 1 && typeof vsprintf != "undefined") {
				return vsprintf(common.msg.data[name][language], params);
			}
			else {
				return common.msg.data[name][language];
			}
		}
		else {
			return "";
		}
	};
	/**
	 * 要素(タグ)にメッセージをセットします。
	 * @param Element element 要素 (メッセージを上書きしたい箇所に
	 *                             data-msgname="メッセージ内部名" (例: data-msgname="dialog_yes") か、
	 *                             data-msgname="{メッセージ内部名:適用先}" (例: data-msgname="{dialog_yes:'@value'}" ※「@名前」で属性にセット、「text」でテキストとしてセット)
	 *                             の形で属性をセットして下さい)
	 * @param Object paramsMap パラメータマップ (メッセージ内部名 => パラメータ配列)
	 * @param String|Number language 言語
	 */
	common.msg.applyTo = function(element, paramsMap, language){
		$(element).find("[data-msgname]").each(function(){
			var nameMap = $(this).data("msgname");
			if (typeof nameMap != "object") {
				var name = nameMap;
				nameMap = {};
				nameMap[name] = "text";
			}

			var self = this;
			$.each(nameMap, function(name, msgref) {
				var params = (paramsMap && name in paramsMap) ? paramsMap[name] : null;
				var message = common.msg.get(name, params, language);

				// テキスト
				if (msgref == "text") {
					$(self).text(message);
				}
				// 属性 (厳密にはprop)
				else if (/^@/.test(msgref)) {
					var prop = msgref.replace(/^@/, "");
					$(self).prop(prop, message);
				}
			});
		});
	};

	// ユーザー設定
	common.userOption = {};
	// ユーザー設定
	common.userOption.data = {};
	/**
	 * ユーザー設定を取得します。
	 * @param String name ユーザー設定内部名
	 * @return String 設定値
	 */
	common.userOption.get = function(name){
		// データがある場合メッセージデータ。ない場合空文字
		if (name in common.userOption.data) {
			return common.userOption.data[name];
		}
		else {
			return "";
		}
	};

	/**
	 * 数値をカンマ区切り表記にします。
	 * @param n 対象の値
	 * @param digits 小数桁数
	 * @returns {String} 書式化された文字列
	 */
	common.formatNumber = function(n /* , digits */) {
		var argc = arguments.length;
		var digits = (2 <= argc) ? arguments[1] : 2;

		var s = (2 <= argc) ? n.toFixed(digits) : n.toString();
		var parts = s.split(".");
		var result = parts[0].replace(/(\d)(?=(?:\d{3})+\b)/g,'$1,');
		if (2 <= parts.length) result += "." + parts[1];
		return result;
	};
	/**
	 * 数値を金額表記(日本語)にします。
	 * @param n 対象の値
	 * @param digits 小数桁数
	 * @returns {String} 書式化された文字列
	 */
	common.formatMoney = function(n /* , digits */) {
		return "\uffe5" + common.formatNumber.apply(common, arguments);
	}
})();

/**
 * ツールチップ
 */
// jQuery(function($){
// 	// title属性が付いているタグすべて(TinyMCE除く)
// 	$("body").tooltip({ selector: "[title]:not(.mce-container *):not(.ui-datepicker *):not(.sp-palette-row *):not(#elfinder *)", placement: 'auto', live: true, container: "body" });
// });

/**
 * ツールチップ (DataTables用の補足を追加します)
 */
jQuery(function($){
	$("body").on("init.dt", "table", function(){
		var $this = $(this);
		var $wrap = $this.parents(".dataTables_wrapper");

		$wrap.find(".dataTables_length select").prop("title", "件数表示の上限を設定します。");
		$wrap.find(".dataTables_filter input").prop("title", "キーワード検索を行います。");
	});
});

/**
 * jQuery UI用の調整を行います。
 */
jQuery(function($){
	// カレンダー言語設定
    $.extend($.datepicker.regional['ja'], {
        // 前月アイコンのツールチップテキスト
        prevText: "前月",
        // 次月アイコンのツールチップテキスト
        nextText: "次月",
        // 「年」を変更
        yearSuffix: " / ",
        // 「◯月」を変更
        monthNames: [1,2,3,4,5,6,7,8,9,10,11,12],
        // 「◯月」を変更
        monthNamesShort: [1,2,3,4,5,6,7,8,9,10,11,12],
        // すべてのカレンダーの年を変更可能に
        changeYear: true,
        // 年の範囲を2001年～当年(選択している年)+10年に
        yearRange: "2001:c+10",
        // すべてのカレンダーの月を変更可能に
        changeMonth: true,
        // 他の月の日も表示する
        showOtherMonths: true,
        // 「今日」ボタンを表示する
        showButtonPanel: true
    });

	// 設定を変更
	$.datepicker.setDefaults($.datepicker.regional['ja']);

	// input[type=date]を強制的にjQuery UIのdatepickerに変更します。
	var $date = $("input[type=date]");
	$date.datepicker();
	$date.prop("type", "text");
});

/**
 * 管理画面のメニュー調整を行います。
 */
jQuery(function($) {
	var url = location.href;
	$('.admin-navbar-side a').each(function() {
		var $this = $(this);
		if ($this.prop('href') == url) {
			$this.addClass('active');
			$this.parents('li').addClass('active');
		}
	});

	$('.admin-navbar-side').metisMenu();
});

/**
 * 管理画面のDataTables用の調整を行います。
 */
jQuery(function($){
	// 言語設定の判定
	var language = common.msg.defaultLanguage;
	var name = "";
	switch (language) {
	case 1: name = "Japanese"; break;
	case 2: name = "English"; break;
	case 3: name = "Chinese"; break;
	case 4: name = "Portuguese"; break;
	case 5: name = "Korean"; break;
	default: name = "Japanese"; break;
	}

	$.extend( $.fn.dataTable.defaults, {
		// 状態保存
		stateSave: true,
		// 自動調整OFF
		autoWidth: false,
		// 言語設定
		language: { url: "../js/dataTables/" + name + ".json" }
	});

	// DataTables初期化イベント
	$(document).on("init.dt", function(e, settings){
		var api = new $.fn.dataTable.Api( settings );
		var table = api.table();
		var pageInfo = table.page.info();

		// ページ総数よりも現在のページが大きいところに来ている場合、最初のページに移動して描画し直します。
		// (例えばレコード数 = 10, page = 1, length = 10の場合、11行目以降は戻します。
		//  stateSave=trueでstateが残っている場合の対応です)
		if (pageInfo.recordsTotal < pageInfo.page * pageInfo.length + 1) {
			table.page("first");

			var bAjaxDataGet = settings.bAjaxDataGet;
			settings.bAjaxDataGet = true;
			api.draw();
			settings.bAjaxDataGet = bAjaxDataGet;
		}
	});

	// DataTablesページ数変更イベント
	$(document).on("length.dt", function(e, settings, len){
		var api = new $.fn.dataTable.Api( settings );
		var table = api.table();
		var pageInfo = table.page.info();

		// 例えば11件目(DataTable上ではstart=10)を表示中に
		// 表示件数を25件にした場合、割り切れる位置(例では1ページ目(DataTable上では0))に移動します。
		var page = pageInfo.start / pageInfo.length;
		if (pageInfo.page != page) {
			table.page(Math.floor(page)).draw();
		}
	});
});

/**
 * 管理テーブル用にチェックボックスの調整を行います。
 * ※ソートの調整は共通で難しかったため個別のスクリプトに入れ込んでいます(columnDefs, orderable)
 */
jQuery(function(){
	// セルクリックでチェックボックスクリック
	$(document).on("click", ".checkbox-column", function(e){
		// チェックボックスがクリックされてこのイベントが発生した場合は二重クリックになるため中断します。
		if ($(e.target).is(":checkbox")) return;

		$(this).find(":checkbox").click();
	});

	// すべて選択 / 未選択
	$(document).on("change", ".all-select", function(){
		var checked = this.checked;
		// 同じテーブル内のみ
		$(this).closest("table").find(".checkbox-column :checkbox:not(:disabled)").prop("checked", checked);
		//$(".checkbox-column :checkbox:not(:disabled)").prop("checked", checked);
	});
});

/**
 * 最小値制限
 */
jQuery(function($){
	$(document).on("change", "input[type=number][min]", function(e){
		var $this = $(this);
		var min = $this.prop("min");

		if ($this.val() !== "" && $this.val() < min) {
			$this.val(min);
		}
	});
});

/**
 * カラーピッカー
 */
jQuery(function($){
	$.extend( $.fn.spectrum.defaults, {
		showPaletteOnly: true,
		showPalette: true,
		// http://bgrins.github.io/spectrum/example/  default
		palette: [
			["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"],
			["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"],
			["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d9ead3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"],
			["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
			["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"],
			["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"],
			["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"],
			["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]
		]
	});
});
