/**
 * 邵ｦ譖ｸ縺榊ｯｾ蠢�
 */
jQuery(function($){
	// writing-mode繧偵し繝昴�繝医＠縺ｦ縺�ｋ繝悶Λ繧ｦ繧ｶ(IE縲，hrome遲�)縺ｮ蝣ｴ蜷医�蜃ｦ逅�ｒ荳ｭ譁ｭ縺励∪縺吶�
	// IE
	if (("writingMode" in document.body.style) && !("webkitWritingMode" in document.body.style)) {
		window.verticalFallback = false;
	}
	// Webkit
	else if (("webkitWritingMode" in document.body.style)) {
		window.verticalFallback = false;
	}
	else {
		window.verticalFallback = true;
	}

	if (window.verticalFallback) {
		$(document.documentElement).addClass("vertical-fallback");
		/**
		 * 譁�ｭ怜�繧堤ｸｦ譖ｸ縺咲畑縺ｮHTML繧ｿ繧ｰ譁�ｭ怜�縺ｫ螟画鋤縺励∪縺吶�
		 */
		window.prepareVerticalText = function(text){
			// 邵ｦ譖ｸ縺肴枚蟄怜､画鋤逕ｨ繝槭ャ繝�(隧ｦ鬨鍋噪)
			// ( http://www.fileformat.info/info/unicode/char/search.htm?q=vertical&preview=entity )
			var map = {
				//	�ｵ�ｵ
				"(": "",
				")": "",
				"": "",
				"": ""
			}
			var replaced = text.replace(/(.)/g, function($0, $1){
				var className = "char";

				// 繝槭ャ繝励↓譁�ｭ励′縺ゅｋ蝣ｴ蜷域枚蟄励ｒ菴ｿ逕ｨ
				if ($1 in map) $1 = map[$1];
				// 髟ｷ髻ｳ縲∫ｴ�黄縺ｮ蝣ｴ蜷�
				if (/(\)/.test($1)) className += " special";

				else if (/[]/.test($1)) className += " punctuation";
				else if (/[0-9]/.test($1)) className += " number";
				else className += " normal";

				return '<span class="' + className + '">' + $1 + '</span>';
			});
			return replaced;
		};
	}
	else {
		window.prepareVerticalText = function(text){ return text };
	}
});

jQuery(function($){
	// 諡�ｽ�
	$(".sch-cell.staff_name_1").text(common.userOption.get("staff_name_1"));
	$(".sch-cell.staff_name_2").text(common.userOption.get("staff_name_2"));
	$(".sch-cell.staff_name_3").text(common.userOption.get("staff_name_3"));
	$(".sch-cell.staff_name_4").text(common.userOption.get("staff_name_4"));
});

/**
 * 繧ｬ繝ｳ繝医メ繝｣繝ｼ繝�
 */
jQuery(function($){
	var WORK_TYPE_NAMES = ["mainline", "sub1line", "sub2line"];
	var cellWidth = 14;
	var zoomLevel = 2; // 蛻晄悄蛟､:3繝ｶ譛亥�陦ｨ遉ｺ

	// 譌･譛ｬ隱槭Ο繧ｱ繝ｼ繝ｫ險ｭ螳�
	moment.locale("ja");

	// 蠖捺怦1譌･
	/*var */start = moment().date(1).hour(0).minute(0).seconds(0).milliseconds(0);
	// 髢句ｧ区律縺九ｉ蜊雁ｹｴ髢�
	/*var */end = start.clone().add(6, "months").subtract(1, "days");
	projectNameWord = "";
	showIncome = 1;
	fitPjTop = 0;

	/**
	* 陦ｨ遉ｺ譖ｴ譁ｰ繧定｡後＞縺ｾ縺吶�
	*/
	// 蜈･驥�(蜈･驥第律騾｣蜍輔�縺溘ａ蛻�牡)
	refreshIncome = function(){
		$(".sch-table").each(function(){
			var $table = $(this);
			// 陦後�繝�ム
			var $rowHeader = $table.find(".sch-row-header");

			// 蛻励�繝�ム
			var $columnHeader = $table.find(".sch-column-header");

			// 譌･莉倥ョ繝ｼ繧ｿ繧ｨ繝ｪ繧｢
			var $rowBodyData = $table.find(".sch-row-body .sch-column-data");
			// 譌･莉倥ヵ繝�ち繝ｼ繧ｨ繝ｪ繧｢(驥鷹｡崎｡ｨ遉ｺ驛ｨ)
			var $rowBodyFooter = $table.find(".sch-row-body .sch-column-footer");

			// 繝��繧ｿ繧ｯ繝ｪ繧｢
			$rowBodyFooter.empty();

			// "YYYYMM" => 驥鷹｡阪Μ繧ｹ繝医�繝槭ャ繝�
			var moneyMap = {};
			// PJ繝��繧ｿ
			for (var i = 0; i < pjItems.length; i++) {
				var pj = pjItems[i];
				var idClass = "id-" + pj.id;

				// 陦ｨ遉ｺ縺励↑縺�｡井ｻｶ
				if(pj.isShowed == false){
					continue;
				}

				// 驥鷹｡阪ョ繝ｼ繧ｿ蜃ｺ蜉�
				if (pj.income != null) {
					// 驥鷹｡阪ョ繝ｼ繧ｿ縺ｮ繝槭ャ繝嶺ｽ懈�
					_.each(pj.income, function(v, k){
						var d = moment(v.date);
						var yyyymm = d.format("YYYYMM");

						if (!(yyyymm in moneyMap)) {
							moneyMap[yyyymm] = [];
						}

						moneyMap[yyyymm].push({
							date: d,
							dateYmd: v.date,	// 荳ｦ縺ｹ譖ｿ縺育畑
							order: i,			// 荳ｦ縺ｹ譖ｿ縺育畑
							name: v.name,
							money: v.money,
							pjName: pj.pjName,
						});
					});
				}
			}

			// 驥鷹｡阪ョ繝ｼ繧ｿ蜃ｺ蜉�
			var keys = _.keys(moneyMap);
			var maxHeight = 0;

			var $rowBodyFooterDf = $(document.createDocumentFragment());
			_.each(keys, function(yyyymm){
				//譌･莉倥�陦ｨ遉ｺ鬆�た繝ｼ繝�
				ObjArraySort2(moneyMap[yyyymm], "dateYmd", "asc", "order", "asc")

				var matches = yyyymm.match(/^([0-9]{4})([0-9]{2})$/);
				var yyyy = matches[1];
				var mm = matches[2];
				var d = moment(yyyy + "-" + mm + "-01");
				/*
				var s = ".sch-row-group:last-child .sub2 .y" + yyyy + ".m" + mm + ":first";
				var e = ".sch-row-group:last-child .sub2 .y" + yyyy + ".m" + mm + ":last";
				var s2 = ".weekday .y" + yyyy + ".m" + mm + ":first";
				var e2 = ".weekday .y" + yyyy + ".m" + mm + ":last";

				// 髢句ｧ九そ繝ｫ縲∫ｵゆｺ�そ繝ｫ繧貞叙蠕励＠縺ｦ縺ｩ縺薙∪縺ｧ莨ｸ縺ｰ縺吶∋縺阪°遒ｺ隱�(left, right蜿門ｾ�)
				var $startCell = $rowBodyData.find(s);
				var $endCell = $rowBodyData.find(e);

				if ($startCell.length == 0 || $endCell.length == 0) {
					// 譯井ｻｶ縺後↑縺��ｴ蜷医∝�繝倥ャ繝縺ｫ蜷医ｏ縺帙ｋ
					$startCell = $columnHeader.find(s2);
					$endCell = $columnHeader.find(e2);
					if($startCell.length == 0 || $endCell.length == 0){
						return;
					}
				}

				var left;
				var right;

				left = $startCell.position().left;
				right = $endCell.position().left + cellWidth;
				*/
				var s = moment(yyyy + "-" + mm + "-01");
				if (start.format("YYYYMM") == yyyymm && start.format("DD") != "01") s.date(start.format("DD"));
				var e = moment(yyyy + "-" + mm + "-" + s.clone().endOf('month').format("DD"));
				if (end.format("YYYYMM") == yyyymm && end.format("DD") != "01") e.date(end.format("DD"));

				var left = s.diff(start, "day") * cellWidth;
				var right = e.diff(start, "day") * cellWidth + cellWidth;

				var boxHtml = ('<div class="sch-money-data" style="left:' + left + 'px; width:' + (right - left) + 'px;">');

				var moneyTable = ('\
					<div class="panel panel-default money-table-panel y' + yyyy + ' m' + mm + '">\
						<div class="panel-heading month_label" month="' + d.format("YYYY/MM") +'">\
							<span class="date">' + d.format("YYYY/MM") + '</span> (<span class="total"></span>)\
						</div>\
						<div class="panel-body">\
							<table class="table table-striped table-bordered">\
								<thead>\
									<tr><th></th><th></th><th></th><th></th></tr>\
								</thead>\
								<tbody>\
				');

				var total = 0, count = 0;
				_.each(moneyMap[yyyymm], function(v){
					moneyTable += ('\
						<tr>\
							<td class="date">' + h(v.date.format("YYYY/MM/DD")) + '</td>\
							<td>' + h(v.pjName) + '</td>\
							<td>' + h(v.name) + '</td>\
							<td class="number-column">' + common.formatMoney(v.money) + '</td>\
						</tr>');
					total += Number(v.money);
					count++;
				});
				moneyTable += '</tbody>';
				boxHtml += moneyTable;
				boxHtml += '</div>';

				var $box = $(document.createRange().createContextualFragment(boxHtml).firstChild);
				$box.find("span.total").text(common.formatMoney(total));
				$rowBodyFooterDf.append($box);

				// 蜈･驥題｡ｨ遉ｺ縺励↑縺��ｴ蜷医�撼陦ｨ遉ｺ(繝昴ャ繝励が繝ｼ繝舌�縺ｮ縺溘ａ縺ｫ逕滓�縺ｯ縺励※縺翫￥)
				if(showIncome == 0){
					$box.find("div.money-table-panel").hide();
				}

				maxHeight = Math.max(70 + count * 30, maxHeight); // $box.height() 縺� IE 縺ｧ驕�＞縺溘ａ縲�$box.height() 繧剃ｽｿ繧上★縺ゅｋ遞句ｺｦ縺ｮ鬮倥＆繧呈ｱゅａ繧句ｽ｢縺ｫ縺励∪縺�
			});

			// 繝輔ャ繧ｿ繝ｼ鬮倥＆隱ｿ謨ｴ
			var $columnFooter = $table.find(".sch-column-footer");
			$columnFooter.each(function(){
				$(this).height(maxHeight);
			});

			$rowBodyFooter.append($rowBodyFooterDf);
		});
	}

	// 蟾･遞�
	refresh = function(init){
		var dayNames = moment.localeData("ja")._weekdaysShort;
		var dayNamesEn = _.map(moment.localeData("en")._weekdaysShort, function(x){ return x.toLowerCase() });

		var date = moment(start);
		var diffBtwStartAndEnd = date.diff(end, "day");
		/*var */rowBodyWidth = end.diff(start, "day") * cellWidth + cellWidth;

		var getClassNames = function(m) {
			var w = m.format("d");
			return [dayNamesEn[w], "y" + m.format("YYYY"), "m" + m.format("MM"),  "d" + m.format("DD")].join(" ");
		};

		var changedWorkOnStart;
		var $otherWorks = new Array();

		// 繝��繝悶Ν縺斐→ (螳滄圀縺ｫ縺ｯ.sch-table縺ｯ繝壹�繧ｸ蜀�↓1縺､縺励°縺ゅｊ縺ｾ縺帙ｓ縺悟ｿｵ縺ｮ縺溘ａeach縺励※縺ゅｊ縺ｾ縺�)
		$(".sch-table").each(function(){
			var $table = $(this);

			// 譛郁｡�
			var $monthRow = $table.find(".sch-row.month");
			// 譌･莉倩｡�
			var $dayRow = $table.find(".sch-row.day");
			// 譖懈律陦�
			var $weekDayRow = $table.find(".sch-row.weekday");

			// 陦後�繝�ム
			var $rowHeader = $table.find(".sch-row-header");
			var $rowHeaderData = $rowHeader.find(".sch-column-data");

			// 陦後し繝悶�繝�ム
			var $rowSubHeader = $table.find(".sch-row-sub-header");
			var $rowSubHeaderData = $rowSubHeader.find(".sch-column-data");

			// 蛻励�繝�ム
			var $columnHeader = $table.find(".sch-column-header");

			// 譌･莉倥お繝ｪ繧｢
			var $rowBody = $(".sch-row-body")
			// 譌･莉倥ョ繝ｼ繧ｿ繧ｨ繝ｪ繧｢
			var $rowBodyData = $table.find(".sch-row-body .sch-column-data");
			// 譌･莉倥ヵ繝�ち繝ｼ繧ｨ繝ｪ繧｢(驥鷹｡崎｡ｨ遉ｺ驛ｨ)
			var $rowBodyFooter = $table.find(".sch-row-body .sch-column-footer");

			// 繝��繧ｿ繧ｯ繝ｪ繧｢ (TODO 豈主屓菴懊ｊ縺ｪ縺翫＠縺ｦ縺�ｋ縺ｨ蜃ｦ逅�さ繧ｹ繝医′鬮倥＞縺ｮ縺ｧ讀懆ｨ�)
			$monthRow.empty();
			$dayRow.empty();
			$weekDayRow.empty();

			$rowHeaderData.empty();
			$rowSubHeaderData.empty();
			$rowBodyData.empty();
			$rowBodyFooter.empty();

			$rowBody.css("width", rowBodyWidth);

			// 蛻励�繝�ム(譌･莉�)蜃ｺ蜉�
			var month = "", day = "", weekday = "";
			var dateCount = diffBtwStartAndEnd;
			while (dateCount <= 0) {
				var d = date.format("D");
				var w = date.format("d");
				var cls = h(getClassNames(date));
				// 譛亥�蜉�(蜈磯�ｭ縺ｯ1譌･莉･螟悶〒繧ょ�蜉�)
				if ((dateCount == diffBtwStartAndEnd) || d == 1) {
					month += ('<div class="sch-cell month ' + cls + ' d01"><div class="inner month_label" month="' + date.format("YYYY/MM") +'">' + date.format("YYYY/MM") + '</div></div>');
				}
				else {
					month += ('<div class="sch-cell month ' + cls + '"></div>');
				}

				// 譌･縺ｫ縺｡蜃ｺ蜉�
				day += ('<div class="sch-cell day ' + cls + '">' + d + '</div>');

				// 譖懈律蜃ｺ蜉�
				weekday += ('<div class="sch-cell day ' + cls + '">' + h(dayNames[w]) + '</div>');

				// 谺｡縺ｮ譌･縺ｸ
				date = date.add(1, "day");
				dateCount++;
			}
			month += '</div>';
			day += '</div>';
			weekday += '</div>';
			$monthRow.each(function(){
				$(this).append(document.createRange().createContextualFragment(month));
			});
			$dayRow.each(function(){
				$(this).append(document.createRange().createContextualFragment(day));
			});
			$weekDayRow.each(function(){
				$(this).append(document.createRange().createContextualFragment(weekday));
			});

			// 譯井ｻｶ繝励Ν繝繧ｦ繝ｳ
			// var $project = $("select[name='project']");
			// $project.find("option").remove();
			// var projectHtml = '';
			// for (var i = 0; i < pjItems.length; i++) {
			// 	projectHtml += '<option value="' + h(pjItems[i].id) + '">' + h(pjItems[i].pjName) + '</option>'
			// }
			// $project.append(document.createRange().createContextualFragment(projectHtml));

			// 譯井ｻｶ蜷阪が繝ｼ繝医さ繝ｳ繝励Μ繝ｼ繝�
			// var s = $("option", $project).map(function(){ return this.text }).toArray();
			// $("input[name='project_name_word']").autocomplete({ source: s });

			var rowHeaderDataHtml = '';
			var rowSubHeaderDataHtml = '';
			var $rowBodyDataDf = $(document.createDocumentFragment());
			// PJ繝��繧ｿ
			for (var i = 0; i < pjItems.length; i++) {
				var pj = pjItems[i];
				var idClass = "id-" + pj.id;

				// 陦ｨ遉ｺ縺励↑縺�｡井ｻｶ
				if(pj.isShowed == false){
					continue;
				}

				// 陦ｨ遉ｺ譛滄俣蜀�↓蟾･遞九′辟｡縺��ｴ蜷医�≡鬘阪�縺ｿ陦ｨ遉ｺ
				if(pj.hasWork == false){
					continue;
				}

				// 陦後�繝�ム蜃ｺ蜉�
				$rowHeaderData.each(function(){
					var $columnData = $(this);

					var rowGroup = ('<div class="sch-row-group ' + idClass + '">');
					var sub1Row = ('<div class="sch-row sub1">');
					var mainRow = ('<div class="sch-row main">');
					var sub2Row = ('<div class="sch-row sub2">');

					// PJ
					sub1Row += ('<div class="sch-cell pj-no"></div>');
					mainRow += ('<div class="sch-cell pj-no main has-inner"><div class="inner" style="color: ' + pj.noColor + ';">' + pj.no + '</div></div>');
					sub2Row += ('<div tabIndex="0" class="sch-cell pj-no pj-edit pj-edit-button"></div>');
					sub2Row += ('<input type="hidden" name="project_id[]" value="' + pj.id + '">');

					// 驍ｸ
					sub1Row += ('<div class="sch-cell pj-name sub" style="background: '+ pj.pjColor + ';">' + pj.pjNameSub + '</div>');
					mainRow += ('<div class="sch-cell pj-name main has-inner" style="background: '+ pj.pjColor + ';"><div class="inner">' + pj.pjName + '</div></div>');
					sub2Row += ('<div class="sch-cell pj-name date" style="background: '+ pj.pjColor + ';">' + pj.pjNameSub2 + '</div>');

					sub1Row += '</div>';
					mainRow += '</div>';
					sub2Row += '</div>';
					rowGroup += sub1Row;
					rowGroup += mainRow;
					rowGroup += sub2Row;
					rowGroup += '</div>';

					rowHeaderDataHtml += rowGroup;
				});

				// 陦後�繝�ム(蝗ｺ螳壹＠縺ｪ縺�Κ蛻�)蜃ｺ蜉�
				$rowSubHeaderData.each(function(){
					var $columnData = $(this);

					var rowGroup = ('<div class="sch-row-group ' + idClass + '">');
					var sub1Row = ('<div class="sch-row sub1">');
					var mainRow = ('<div class="sch-row main">');
					var sub2Row = ('<div class="sch-row sub2">');

					// 蝟ｶ讌ｭ
					sub1Row += ('<div class="sch-cell sales-staff" style="background: '+ pj.salesStaffColor + ';"></div>');
					mainRow += ('<div class="sch-cell sales-staff has-inner" style="background: '+ pj.salesStaffColor + ';"><div class="inner">' + pj.salesStaff + '</div></div>');
					sub2Row += ('<div class="sch-cell sales-staff" style="background: '+ pj.salesStaffColor + ';"></div>');

					// 險ｭ險�
					sub1Row += ('<div class="sch-cell designer" style="background: '+ pj.designerColor + ';"></div>');
					mainRow += ('<div class="sch-cell designer has-inner" style="background: '+ pj.designerColor + ';"><div class="inner">' + pj.designer + '</div></div>');
					sub2Row += ('<div class="sch-cell designer" style="background: '+ pj.designerColor + ';"></div>');

					// 蟾･莠�
					sub1Row += ('<div class="sch-cell constructor" style="background: '+ pj.constructorColor + ';"></div>');
					mainRow += ('<div class="sch-cell constructor has-inner" style="background: '+ pj.constructorColor + ';"><div class="inner">' + pj.constructor + '</div></div>');
					sub2Row += ('<div class="sch-cell constructor" style="background: '+ pj.constructorColor + ';"></div>');

					// 讌ｭ閠�
					sub1Row += ('<div class="sch-cell trader" style="background: '+ pj.traderColor + ';"></div>');
					mainRow += ('<div class="sch-cell trader has-inner" style="background: '+ pj.traderColor + ';"><div class="inner">' + pj.trader + '</div></div>');
					sub2Row += ('<div class="sch-cell trader" style="background: '+ pj.traderColor + ';"></div>');

					// 螂醍ｴ�≡鬘�
					sub1Row += ('<div class="sch-cell contract">' + common.formatMoney(pj.contract) + '</div>');
					mainRow += ('<div class="sch-cell contract memo has-inner"><div class="inner">' + pj.memo + '</div></div>');
					sub2Row += ('<div class="sch-cell contract">');

					sub1Row += '</div>';
					mainRow += '</div>';
					sub2Row += '</div>';
					rowGroup += sub1Row;
					rowGroup += mainRow;
					rowGroup += sub2Row;
					rowGroup += '</div>';

					rowSubHeaderDataHtml += rowGroup;
				});

				// 譌･縺ｫ縺｡繧ｻ繝ｫ蜃ｺ蜉�
				$rowBodyData.each(function(){
					var $this = $(this);
					var $thisDf = $(document.createDocumentFragment());

					var rowGroup = '<div class="sch-row-group ' + idClass + '">';
					var sub1Row = '<div class="sch-row sub1">';
					var mainRow = '<div class="sch-row main">';
					var sub2Row = '<div class="sch-row sub2">';

					var date = moment(start);
					var dateCount = diffBtwStartAndEnd;
					while (dateCount <= 0) {
						var cls = h(getClassNames(date));

						var tag = '<div class="sch-cell day ' + cls + '"></div>';
						sub1Row += tag;
						mainRow += tag;
						sub2Row += tag;

						// 谺｡縺ｮ譌･縺ｸ
						date = date.add(1, "day");
						dateCount++;
					}

					rowGroup += (sub1Row + '</div>');
					rowGroup += (mainRow + '</div>');
					rowGroup += (sub2Row + '</div>');
					rowGroup += '</div>';

					var $rowGroup = $(document.createRange().createContextualFragment(rowGroup).firstChild);
					var $sub1Row = $rowGroup.find(".sch-row.sub1");
					var $mainRow = $rowGroup.find(".sch-row.main");
					var $sub2Row = $rowGroup.find(".sch-row.sub2");

					$thisDf.append($rowGroup);

					var selector = function(m) {
						return ".y" + m.format("YYYY") + ".m" + m.format("MM") + ".d" + m.format("DD");
					};

					var process = function(pjLineData, $target){
						// 蟾･遞九ヰ繝ｼHTML
						var bar = "";
						var workType = 0;
						if($target.hasClass("main")){
							workType = 1;
						}else if($target.hasClass("sub1")){
							workType = 2;
						}else if($target.hasClass("sub2")){
							workType = 3;
						}

						_.each(pjLineData, function(v, k){
							var s = moment(v.startDate);
							var e = moment(v.endDate);

							/*var includes = function(v){
								return start.diff(v) <= 0 && end.diff(v) >= 0;
							}
							var inChart = (includes(s) || includes(e));
							if (!inChart) {
								return;
							}*/

							var color = v.color;
							var mainText = v.mainText;
							var startText = v.startText;
							var endText = v.endText;
							/*
							// 髢句ｧ九そ繝ｫ縲∫ｵゆｺ�そ繝ｫ繧貞叙蠕励＠縺ｦ縺ｩ縺薙∪縺ｧ莨ｸ縺ｰ縺吶∋縺阪°遒ｺ隱�(left, right蜿門ｾ�)
							var $startCell = $target.find(selector(s));
							var $endCell = $target.find(selector(e));

							var left;
							var right;

							if ($startCell.length > 0) {
								left = $startCell.position().left;
							}
							else {
								//left = 0;
								// 鬟帙�蜃ｺ縺吝�繧ら函謌�
								left = s.diff(start, "day") * cellWidth;
							}

							if ($endCell.length > 0) {
								right = $endCell.position().left + cellWidth;
							}
							else {
								//right = $target.width();
								// 鬟帙�蜃ｺ縺吝�繧ら函謌�
								right = $target.width() + e.diff(end, "day") * cellWidth;
							}
							*/
							var left = s.diff(start, "day") * cellWidth;
							var right = rowBodyWidth + e.diff(end, "day") * cellWidth;
							left = Math.round(left);
							right = Math.round(right);

							if(workType === 1){
								bar += ('<div class="sch-bar" style="left:' + left + 'px; width: ' + (right - left) + 'px; background: ' + color + ';">');
								bar += ('<div class="sch-bar-text main"><div class="inner">' + window.prepareVerticalText(mainText) + '</div></div>');
								bar += ('<div class="sch-bar-text start vertical"><div class="inner">' + window.prepareVerticalText(startText) + '</div></div>');
								bar += ('<div class="sch-bar-text end vertical"><div class="inner">' + window.prepareVerticalText(endText) + '</div></div>');
							}else{
								bar += ('<div class="sch-bar" style="left:' + left + 'px; width: ' + (right - left) + 'px; background: ' + color + ';">');
								bar += ('<div class="sch-bar-text main"><div class="inner">' + mainText + '</div></div>');
								bar += ('<div class="sch-bar-text start sub-text"><div class="inner">' + startText + '</div></div>');
								bar += ('<div class="sch-bar-text end sub-text"><div class="inner">' + endText + '</div></div>');
							}
							// 蟾･遞矩��岼繝��繧ｿ
							bar += ('<input type="hidden" name="work_pj_id" value="' + pj.id + '">');
							bar += ('<input type="hidden" name="work_id" value="' + v.id + '">');
							bar += ('<input type="hidden" name="work_type" value="' + workType + '">');
							bar += '</div>';
						});

						var $bar = $(document.createRange().createContextualFragment(bar).childNodes);
						//繧ｰ繝ｩ繝輔ラ繝ｩ繝�げ(遘ｻ蜍�)
						var draggable = function($e, o){
							$e.each(function(){
								var $t = $(this);
								$t.one("mouseover", function(){ $t.draggable(o); });
							});
						};
						draggable($bar, {
							axis: "x",
							grid: [ cellWidth, 0],
							scroll: false,
							start: function(event, ui) {
								$(this).zIndex(91);

								// 謫堺ｽ懷燕縺ｮ迥ｶ諷九ｒ險倬鹸
								// 謫堺ｽ懊＠縺溷ｷ･遞�
								changedWorkOnStart = {
										posLeft: Math.round($(this).position().left),
										posRight: Math.round($(this).position().left + $(this).width()),
										width: Math.round($(this).width())};
								// 莉門ｷ･遞�
								$otherWorks = $(this).parent().children('.sch-bar:not(".ui-draggable-dragging")');
							},
							stop: function(event, ui) {
								$(this).css("z-index", "");

								var $draggedWork = $(this);

								// 陦ｨ遉ｺ譛滄俣縺ｮ蟷�
								var periodWidth = $(this).parent().width();

								//stop譎ゅ�蟾･遞�
								var changedWorkOnStop = {
										posLeft: Math.round($(this).position().left),
										posRight: Math.round($(this).position().left + $(this).width()),
										width: Math.round($(this).width())};

								// 螳悟�縺ｫ陦ｨ遉ｺ譛滄俣螟悶↓遘ｻ蜍輔＠縺溷�ｴ蜷医∫ｧｻ蜍募燕縺ｮ菴咲ｽｮ縺ｫ謌ｻ縺�
								if((changedWorkOnStop.posLeft < 0 && changedWorkOnStop.posRight <= 0) ||
										changedWorkOnStop.posLeft >= periodWidth && changedWorkOnStop.posRight > periodWidth){
									$(this).css("left", changedWorkOnStart.posLeft);
									return true;
								}

								var pjId, workId, type, workTypeName;
								// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ菫晄戟
								var updateWorks = []
								// 蜈･驥第律騾｣蜍慕畑
								var updateIncomeList;
								// 雜�℃髟ｷ
								var overLengthLeft = 0;
								var overLengthRight = 0;

								// 遘ｻ蜍輔＠縺溷�ｴ蜷�
								if(changedWorkOnStart.posLeft != changedWorkOnStop.posLeft){
									pjId = $(this).find("input[name='work_pj_id']").val();
									workId = $(this).find("input[name='work_id']").val();
									type = $(this).find("input[name='work_type']").val();
									workTypeName = WORK_TYPE_NAMES[type - 1];
									// PJ縺ｮ繧､繝ｳ繝�ャ繧ｯ繧ｹ繧貞叙蠕�
									var pjIndex;
									$.each(pjItems, function(index, val) {
										if(val.id == pjId){
											pjIndex = index;
											return false;
										}
									});
									// 蟾･遞九�繧､繝ｳ繝�ャ繧ｯ繧ｹ
									var workIndex;
									var line = pjItems[pjIndex][workTypeName];
									for(var j = 0; j < line.length; j++){
										if(line[j].id == workId){
											workIndex = j;
										}
									}
									// 蜈･驥第律騾｣蜍慕畑
									updateIncomeList = pjItems[pjIndex].income;

									// 遘ｻ蜍輔＠縺溷ｷ･遞九�譌･莉倥ｒ險育ｮ�
									var moveToLeftDays = (changedWorkOnStart.posLeft - changedWorkOnStop.posLeft) / cellWidth;
									var targetWork = pjItems[pjIndex][workTypeName][workIndex];
									var workAfterMove = $.extend(true, {}, targetWork);
									if(moveToLeftDays > 0){
										workAfterMove.startDate = moment(targetWork.startDate).subtract(moveToLeftDays, "days").format("YYYY-MM-DD");
										workAfterMove.endDate = moment(targetWork.endDate).subtract(moveToLeftDays, "days").format("YYYY-MM-DD");
									}else{
										workAfterMove.startDate = moment(targetWork.startDate).add(-moveToLeftDays, "days").format("YYYY-MM-DD");
										workAfterMove.endDate = moment(targetWork.endDate).add(-moveToLeftDays, "days").format("YYYY-MM-DD");
									}
									// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
									updateWorks.push(
											{target: targetWork, afterMove: workAfterMove}
									);

									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width())};

										// 陲ｫ縺｣縺溷�ｴ蜷�
										if(((oWork.posLeft <= changedWorkOnStop.posLeft) && (changedWorkOnStop.posLeft < oWork.posRight)) ||
												((oWork.posLeft < changedWorkOnStop.posRight) && (changedWorkOnStop.posRight <= oWork.posRight)) ||
												((changedWorkOnStop.posLeft <= oWork.posLeft) && (oWork.posLeft < changedWorkOnStop.posRight)) ||
												((changedWorkOnStop.posLeft < oWork.posRight) && (oWork.posRight <= changedWorkOnStop.posRight))){
											// 蜈��′蟾ｦ蛛ｴ
											if(changedWorkOnStart.posLeft > oWork.posLeft){
												overLengthLeft = 1;
												return false;
											}
											// 蜿ｳ蛛ｴ
											else{
												overLengthRight = 1;
												return false;
											}
										}
									});
								}

								var workIndex;
								// 蟾ｦ蛛ｴ縺ｮ隱ｿ謨ｴ縺悟ｿ�ｦ√↑蝣ｴ蜷�
								if(overLengthLeft > 0){
									// 譛螟ｧ縺ｮ陲ｫ繧翫ｒ蜿門ｾ�
									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width())};

										if(changedWorkOnStart.posLeft > oWork.posLeft){
											if(overLengthLeft < oWork.posRight - changedWorkOnStop.posLeft){
												overLengthLeft = oWork.posRight - changedWorkOnStop.posLeft;
											}
										}
									});

									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width()),
												id: $(element).find("input[name='work_id']").val()};

										// 蟾ｦ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
										if(changedWorkOnStart.posLeft > oWork.posLeft){
											var line = pjItems[pjIndex][workTypeName];
											for(var j = 0; j < line.length; j++){
												if(line[j].id == oWork.id){
													workIndex = j;
												}
											}

											var targetWork = pjItems[pjIndex][workTypeName][workIndex];
											// 遘ｻ蜍募ｾ後�菴咲ｽｮ繧定ｨ育ｮ�
											var workAfterMove = $.extend(true, {}, targetWork);
											workAfterMove.startDate = 	moment(targetWork.startDate).subtract(overLengthLeft / cellWidth, "days").format("YYYY-MM-DD");
											workAfterMove.endDate = moment(targetWork.endDate).subtract(overLengthLeft / cellWidth, "days").format("YYYY-MM-DD");
											// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
											updateWorks.push(
													{target: targetWork, afterMove: workAfterMove}
											);
										}
									});
								}
								// 蜿ｳ蛛ｴ縺ｮ隱ｿ謨ｴ縺悟ｿ�ｦ√↑蝣ｴ蜷�
								else if(overLengthRight > 0){
									// 譛螟ｧ縺ｮ陲ｫ繧翫ｒ蜿門ｾ�
									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width())};
										if(index == 0){
											pjId = $(element).find("input[name='work_pj_id']").val();
											type = $(element).find("input[name='work_type']").val();
											workTypeName = WORK_TYPE_NAMES[type - 1];
										}

										if(changedWorkOnStart.posLeft < oWork.posLeft){
											if(overLengthRight < changedWorkOnStop.posRight - oWork.posLeft){
												overLengthRight = changedWorkOnStop.posRight - oWork.posLeft;
											}
										}
									});

									// PJ縺ｮ繧､繝ｳ繝�ャ繧ｯ繧ｹ繧貞叙蠕�
									var pjIndex;
									$.each(pjItems, function(index, val) {
										if(val.id == pjId){
											pjIndex = index;
											return false;
										}
									});

									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width()),
												id: $(element).find("input[name='work_id']").val()};

										// 蜿ｳ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
										if(changedWorkOnStart.posRight < oWork.posRight){
											var line = pjItems[pjIndex][workTypeName];
											for(var j = 0; j < line.length; j++){
												if(line[j].id == oWork.id){
													workIndex = j;
												}
											}

											var targetWork = pjItems[pjIndex][workTypeName][workIndex];
											// 遘ｻ蜍募ｾ後�菴咲ｽｮ繧定ｨ育ｮ�
											var workAfterMove = $.extend(true, {}, targetWork);
											workAfterMove.startDate = moment(targetWork.startDate).add(overLengthRight / cellWidth, "days").format("YYYY-MM-DD");
											workAfterMove.endDate = moment(targetWork.endDate).add(overLengthRight / cellWidth, "days").format("YYYY-MM-DD");
											// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
											updateWorks.push(
													{target: targetWork, afterMove: workAfterMove}
											);
										}
									});
								}

								/**
								 * 繝峨Λ繝�げ譎ゅ�菫晏ｭ�
								 */
								var saveWorkOnDrag = function(){
									// 遘ｻ蜍募ｾ後�菴咲ｽｮ縺ｫ謌ｻ縺�(蟾ｦ蛛ｴ縺ｮ蟾･遞九→驥阪↑繧峨↑縺九▲縺溷�ｴ蜷医√％縺ｮ蜃ｦ逅�〒菴咲ｽｮ縺ｯ螟峨ｏ繧峨↑縺�)
									$draggedWork.css("left", changedWorkOnStop.posLeft);

									$.ajax({
										type: "POST",
										url: ".",
										dataType: "json",
										data: {
											save_work_on_drag: true,
											moved_works: JSON.stringify(updateWorks),
											income_list: JSON.stringify(updateIncomeList)
										},
										success: function(result){
											// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
											if("session_error" in result){
												location.href = "../login/";
											}
											// 菫晏ｭ伜､ｱ謨�
											else if("save_failure_message" in result){
												common.dialog.error(result["save_failure_message"]);
												// 遘ｻ蜍募燕縺ｮ菴咲ｽｮ縺ｫ謌ｻ縺�
												$draggedWork.css("left", changedWorkOnStart.posLeft);
											}
											// 菫晏ｭ俶�蜉�
											else{
												// 譌･莉倥�隱ｿ謨ｴ繧貞渚譏�
												_.each(updateWorks, function(updateWork){
													updateWork["target"].startDate = updateWork["afterMove"].startDate;
													updateWork["target"].endDate = updateWork["afterMove"].endDate;
												});

												// 莉門ｷ･遞狗ｧｻ蜍�
												if(overLengthLeft > 0){
													$otherWorks.each(function(index, element){
														var oWork = {posLeft: Math.round($(element).position().left)};

														// 蟾ｦ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
														if(changedWorkOnStart.posLeft > Math.round($(element).position().left)){
															$(element).css("left", oWork.posLeft - overLengthLeft);
														}
													});
												}else if(overLengthRight > 0){
													$otherWorks.each(function(index, element){
														// 莉門ｷ･遞�
														var oWork = {
																posLeft: Math.round($(element).position().left),
																posRight: Math.round($(element).position().left + $(element).width())};

														// 蜿ｳ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
														if(changedWorkOnStart.posRight < oWork.posRight){
															$(element).css("left", oWork.posLeft + overLengthRight);
														}
													});
												}

												pjItems[pjIndex].income = result;
												refreshIncome();
											}
										}
									});
								}

								// 譖ｴ譁ｰ縺吶ｋ蟾･遞九′縺ゅｋ蝣ｴ蜷医．B譖ｴ譁ｰ
								if(updateWorks.length > 0){
									// 蟾ｦ(蜑�)縺ｫ遘ｻ蜍輔＠縺溷�ｴ蜷医�遒ｺ隱阪ム繧､繧｢繝ｭ繧ｰ
									if(overLengthLeft > 0){
										// 遘ｻ蜍募燕縺ｮ菴咲ｽｮ縺ｫ遘ｻ蜍�(遒ｺ隱阪＠縺溷�ｴ蜷医↓遘ｻ蜍募ｾ後�菴咲ｽｮ縺ｫ謌ｻ縺�)
										$(this).css("left", changedWorkOnStart.posLeft);

										common.dialog.confirm(
												"",
												saveWorkOnDrag);
									}else{
										saveWorkOnDrag();
									}
								}
							}
						});

						//繧ｰ繝ｩ繝輔ラ繝ｩ繝�げ(莨ｸ邵ｮ)
						var resizable = function($e, o){
							$e.each(function(){
								var $t = $(this);
								$t.one("mouseover", function(){ $t.resizable(o); });
							});
						};
						resizable($bar, {
							handles: "w, e",
							grid: cellWidth,
							start: function(event, ui) {
								$(this).zIndex(91);

								// 謫堺ｽ懷燕縺ｮ迥ｶ諷九ｒ險倬鹸
								// 謫堺ｽ懊＠縺溷ｷ･遞�
								changedWorkOnStart = {
										posLeft: Math.round($(this).position().left),
										posRight: Math.round($(this).position().left + $(this).width()),
										width: Math.round($(this).width())};
								// 莉門ｷ･遞�
								$otherWorks = $(this).parent().children('.sch-bar:not(".ui-resizable-resizing")');
							},
							stop: function(event, ui) {
								$(this).css("z-index", "");

								var $draggedWork = $(this);

								// 陦ｨ遉ｺ譛滄俣縺ｮ蟷�
								var periodWidth = $(this).parent().width();

								//stop譎ゅ�蟾･遞�
								var changedWorkOnStop = {
										posLeft: Math.round($(this).position().left),
										posRight: Math.round($(this).position().left + $(this).width()),
										width: Math.round($(this).width())};

								// 邵ｮ蟆上＠縺ｦ螳悟�縺ｫ陦ｨ遉ｺ譛滄俣螟悶↓遘ｻ蜍輔＠縺溷�ｴ蜷医∫ｧｻ蜍募燕縺ｮ菴咲ｽｮ縺ｫ謌ｻ縺�
								if((changedWorkOnStop.posLeft < 0 && changedWorkOnStop.posRight <= 0) ||
										changedWorkOnStop.posLeft >= periodWidth && changedWorkOnStop.posRight > periodWidth){
									$(this).css({
										"left" : changedWorkOnStart.posLeft,
										"width" : changedWorkOnStart.width
									});
									return true;
								}

								// 蟾ｦ縺ｫ莨ｸ縺ｰ縺励◆縺�
								var stretchedToLeft = false;
								if(changedWorkOnStart.posLeft > changedWorkOnStop.posLeft){
									stretchedToLeft = true;
								}

								// 蟾･遞九ョ繝ｼ繧ｿ
								var pjId = $(this).find("input[name='work_pj_id']").val();
								var workId = $(this).find("input[name='work_id']").val();
								var type = $(this).find("input[name='work_type']").val();
								var workTypeName = WORK_TYPE_NAMES[type - 1];
								// 譖ｴ譁ｰ縺吶ｋ蟾･遞�
								var updateWorks = [];
								// 蜈･驥第律騾｣蜍慕畑
								var updateIncomeList;
								// 譯井ｻｶ縺ｮ繧､繝ｳ繝�ャ繧ｯ繧ｹ繧貞叙蠕�
								var pjIndex;
								$.each(pjItems, function(index, val) {
									if(val.id == pjId){
										pjIndex = index;
										return false;
									}
								});
								// 蟾･遞九�繧､繝ｳ繝�ャ繧ｯ繧ｹ
								var workIndex;
								var line = pjItems[pjIndex][workTypeName];
								for(var j = 0; j < line.length; j++){
									if(line[j].id == workId){
										workIndex = j;
									}
								}
								// 蜈･驥第律騾｣蜍慕畑
								updateIncomeList = pjItems[pjIndex].income;

								// 譛滄俣繧堤ｸｮ繧√◆蝣ｴ蜷�
								if(changedWorkOnStart.width > changedWorkOnStop.width){
									var shortenDays = 0;
									var targetWork = pjItems[pjIndex][workTypeName][workIndex];
									var workAfterMove = $.extend(true, {}, targetWork);
									// 蟾ｦ繧堤ｸｮ繧√◆蝣ｴ蜷�
									if(changedWorkOnStart.posLeft < changedWorkOnStop.posLeft){
										shortenDays = (changedWorkOnStop.posLeft - changedWorkOnStart.posLeft) / cellWidth;
										workAfterMove.startDate = moment(targetWork.startDate).add(shortenDays, "days").format("YYYY-MM-DD");
									}
									// 蜿ｳ繧堤ｸｮ繧√◆蝣ｴ蜷�
									else{
										shortenDays = (changedWorkOnStart.posRight - changedWorkOnStop.posRight) / cellWidth;
										workAfterMove.endDate = moment(targetWork.endDate).subtract(shortenDays, "days").format("YYYY-MM-DD");
									}
									// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
									updateWorks.push(
											{target: targetWork, afterMove: workAfterMove}
									);
								}
								// 譛滄俣繧剃ｼｸ縺ｰ縺励◆蝣ｴ蜷医∽ｻ門ｷ･遞玖ｪｿ謨ｴ
								else if(changedWorkOnStart.width < changedWorkOnStop.width){
									// 莨ｸ縺ｰ縺励◆蟾･遞九�譌･莉倥ｒ譖ｴ譁ｰ
									var stretchedDays = 0;
									var targetWork = pjItems[pjIndex][workTypeName][workIndex];
									var workAfterMove = $.extend(true, {}, targetWork);
									if(stretchedToLeft){
										stretchedDays = (changedWorkOnStart.posLeft - changedWorkOnStop.posLeft) / cellWidth;
										workAfterMove.startDate = moment(targetWork.startDate).subtract(stretchedDays, "days").format("YYYY-MM-DD");
									}else{
										stretchedDays = (changedWorkOnStop.posRight - changedWorkOnStart.posRight) / cellWidth;
										workAfterMove.endDate = moment(targetWork.endDate).add(stretchedDays, "days").format("YYYY-MM-DD");
									}
									// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
									updateWorks.push(
											{target: targetWork, afterMove: workAfterMove}
									);

									var overLength = 0;
									// 陲ｫ繧翫′縺ゅｋ縺狗｢ｺ隱�
									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width())};

										// 蟾ｦ縺ｫ莨ｸ縺ｰ縺励◆蝣ｴ蜷医〒縲∝ｷｦ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
										if(stretchedToLeft && (changedWorkOnStart.posLeft > oWork.posLeft)){
											// 陲ｫ縺｣縺溷�ｴ蜷医〒縲√⊇縺九�陲ｫ繧翫ｈ繧雁､ｧ縺阪￥陲ｫ縺｣縺溷�ｴ蜷医∬｢ｫ縺｣縺滄聞縺輔ｒ譛螟ｧ縺ｫ譖ｴ譁ｰ
											if((changedWorkOnStop.posLeft < oWork.posRight) &&
													(overLength < oWork.posRight - changedWorkOnStop.posLeft)){
												overLength = oWork.posRight - changedWorkOnStop.posLeft;
											}
										}
										// 蜿ｳ縺ｫ莨ｸ縺ｰ縺励◆蝣ｴ蜷医〒縲∝承蛛ｴ縺ｫ縺ゅｋ蟾･遞�
										else if((stretchedToLeft == false) && (changedWorkOnStart.posRight < oWork.posRight)){
											// 陲ｫ縺｣縺溷�ｴ蜷医〒縲√⊇縺九�陲ｫ繧翫ｈ繧雁､ｧ縺阪￥陲ｫ縺｣縺溷�ｴ蜷医� 陲ｫ縺｣縺滄聞縺輔ｒ譛螟ｧ縺ｫ譖ｴ譁ｰ
											if((changedWorkOnStop.posRight > oWork.posLeft) &&
													(overLength < changedWorkOnStop.posRight - oWork.posLeft)){
												overLength = changedWorkOnStop.posRight - oWork.posLeft;
											}
										}
									});

									$otherWorks.each(function(index, element){
										// 莉門ｷ･遞�
										var oWork = {
												posLeft: Math.round($(element).position().left),
												posRight: Math.round($(element).position().left + $(element).width()),
												width: Math.round($(element).width()),
												id: $(element).find("input[name='work_id']").val()};

										var line = pjItems[pjIndex][workTypeName];
										for(var j = 0; j < line.length; j++){
											if(line[j].id == oWork.id){
												workIndex = j;
											}
										}

										// 蟾ｦ縺ｫ莨ｸ縺ｰ縺励◆蝣ｴ蜷医〒縲∝ｷｦ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
										if(stretchedToLeft && (changedWorkOnStart.posLeft > oWork.posLeft)){
											var targetWork = pjItems[pjIndex][workTypeName][workIndex];
											// 遘ｻ蜍募ｾ後�菴咲ｽｮ繧定ｨ育ｮ�
											var workAfterMove = $.extend(true, {}, targetWork);
											workAfterMove.startDate = 	moment(targetWork.startDate).subtract(overLength / cellWidth, "days").format("YYYY-MM-DD");
											workAfterMove.endDate = moment(targetWork.endDate).subtract(overLength / cellWidth, "days").format("YYYY-MM-DD");
											// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
											updateWorks.push(
													{target: targetWork, afterMove: workAfterMove}
											);
										}
										// 蜿ｳ縺ｫ莨ｸ縺ｰ縺励◆蝣ｴ蜷医〒縲∝承蛛ｴ縺ｫ縺ゅｋ蟾･遞�
										else if((stretchedToLeft == false) && changedWorkOnStart.posRight < oWork.posRight){
											var targetWork = pjItems[pjIndex][workTypeName][workIndex];
											// 遘ｻ蜍募ｾ後�菴咲ｽｮ繧定ｨ育ｮ�
											var workAfterMove = $.extend(true, {}, targetWork);
											workAfterMove.startDate = 	moment(targetWork.startDate).add(overLength / cellWidth, "days").format("YYYY-MM-DD");
											workAfterMove.endDate = moment(targetWork.endDate).add(overLength / cellWidth, "days").format("YYYY-MM-DD");
											// 蜿ら�縺ｨ遘ｻ蜍募ｾ後ョ繝ｼ繧ｿ繧剃ｿ晄戟
											updateWorks.push(
													{target: targetWork, afterMove: workAfterMove}
											);
										}
									});
								}

								/**
								 * 繝峨Λ繝�げ(莨ｸ邵ｮ)譎ゅ�菫晏ｭ�
								 */
								var saveWorkOnResize = function(){
									// 遘ｻ蜍募ｾ後�菴咲ｽｮ縺ｫ謌ｻ縺�(蟾ｦ蛛ｴ縺ｮ蟾･遞九→驥阪↑繧峨↑縺九▲縺溷�ｴ蜷医√％縺ｮ蜃ｦ逅�〒菴咲ｽｮ縺ｯ螟峨ｏ繧峨↑縺�)
									$draggedWork.css({
										"left" : changedWorkOnStop.posLeft,
										"width" : changedWorkOnStop.width
									});

									$.ajax({
										type: "POST",
										url: ".",
										dataType: "json",
										data: {
											save_work_on_drag: true,
											moved_works: JSON.stringify(updateWorks),
											income_list: JSON.stringify(updateIncomeList)
										},
										success: function(result){
											// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
											if("session_error" in result){
												location.href = "../login/";
											}
											// 菫晏ｭ伜､ｱ謨�
											else if("save_failure_message" in result){
												common.dialog.error(result["save_failure_message"]);
												// 蜈��迥ｶ諷九↓謌ｻ縺�
												$draggedWork.css({
													"left" : changedWorkOnStart.posLeft,
													"width" : changedWorkOnStart.width
												});
											}
											// 菫晏ｭ俶�蜉�
											else{
												// 譌･莉倥�隱ｿ謨ｴ繧貞渚譏�
												_.each(updateWorks, function(updateWork){
													updateWork["target"].startDate = updateWork["afterMove"].startDate;
													updateWork["target"].endDate = updateWork["afterMove"].endDate;
												});

												// 莉門ｷ･遞狗ｧｻ蜍�
												$otherWorks.each(function(index, element){
													var oWork = {
															posLeft: Math.round($(element).position().left),
															posRight: Math.round($(element).position().left + $(element).width())};

													// 蟾ｦ縺ｫ莨ｸ縺ｰ縺励◆蝣ｴ蜷医〒縲∝ｷｦ蛛ｴ縺ｫ縺ゅ▲縺溷ｷ･遞�
													if(stretchedToLeft && (changedWorkOnStart.posLeft > oWork.posLeft)){
														$(element).css("left", oWork.posLeft - overLength);
													}
													// 蜿ｳ縺ｫ莨ｸ縺ｰ縺励◆蝣ｴ蜷医〒縲∝承蛛ｴ縺ｫ縺ゅｋ蟾･遞�
													else if((stretchedToLeft == false) && changedWorkOnStart.posRight < oWork.posRight){
														$(element).css("left", oWork.posLeft + overLength);
													}
												});

												pjItems[pjIndex].income = result;
												refreshIncome();
											}
										}
									});
								};

								// 譖ｴ譁ｰ縺吶ｋ蟾･遞九′縺ゅｋ蝣ｴ蜷医．B譖ｴ譁ｰ
								if(updateWorks.length > 0){
									// 蟾ｦ(蜑�)縺ｫ遘ｻ蜍輔＠縺ｦ陲ｫ縺｣縺溷�ｴ蜷医�遒ｺ隱阪ム繧､繧｢繝ｭ繧ｰ
									if(stretchedToLeft > 0 && overLength > 0){
										// 遘ｻ蜍募燕縺ｮ菴咲ｽｮ縺ｫ遘ｻ蜍�(遒ｺ隱阪＠縺溷�ｴ蜷医↓遘ｻ蜍募ｾ後�菴咲ｽｮ縺ｫ謌ｻ縺�)
										$(this).css({
											"left" : changedWorkOnStart.posLeft,
											"width" : changedWorkOnStart.width
										});

										common.dialog.confirm(
												"",
												saveWorkOnResize);
									}else{
										saveWorkOnResize();
									}
								}
							}
						});

						// 陦後�鬮倥＆縺�0縺ｫ縺ｪ繧九◆繧∝炎髯､
						$bar.css("position", "");

						$bar.appendTo($target);
					};

					// 繝｡繧､繝ｳ陦後ョ繝ｼ繧ｿ蜃ｺ蜉�
					if (pj.mainline != null) {
						process(pj.mainline, $mainRow);
					}

					// 繧ｵ繝冶｡後ョ繝ｼ繧ｿ蜃ｺ蜉�
					if (pj.sub1line != null) {
						process(pj.sub1line, $sub1Row);
					}

					// 繧ｵ繝冶｡�(2)繝��繧ｿ蜃ｺ蜉�
					if (pj.sub2line != null) {
						process(pj.sub2line, $sub2Row);
					}

					$rowBodyDataDf.append($thisDf);
				});
			}

			$rowHeaderData.each(function(){
				$(this).append(document.createRange().createContextualFragment(rowHeaderDataHtml));
			});
			$rowSubHeaderData.each(function(){
				$(this).append(document.createRange().createContextualFragment(rowSubHeaderDataHtml));
			});
			$rowBodyData.each(function(){
				$(this).append($rowBodyDataDf);
			});

			$table.hide();
			// 驥鷹｡阪ョ繝ｼ繧ｿ蜃ｺ蜉�
			refreshIncome();
			$table.show();

			// 蛻晏屓譎ゅう繝吶Φ繝郁ｨｭ螳�
			if (init) {
				// 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ蝗ｺ螳�
				var lastScrollTop = 0;
				var lastScrollLeft = 0;

				$table.scroll(function(){
					var scrollLeft = Math.round($table.scrollLeft());
					var scrollTop = Math.round($table.scrollTop());

					if (lastScrollLeft != scrollLeft) {
						$rowHeader.css("left", scrollLeft);
						lastScrollLeft = scrollLeft;
					}
					if (lastScrollTop != scrollTop) {
						$columnHeader.css("top", scrollTop);
						lastScrollTop = scrollTop;
					}
				});

				// 蛻励�繝�ム縺ｮ菴咏區遒ｺ菫�
				$columnHeader.each(function(){
					$(this).next().css("margin-top", $(this).height());
				});

				$rowHeaderData.on("click", ".sch-row-group .pj-edit", function(e){
					common.dialog.pjEditModal($(this).next().val());
				});
				$rowHeaderData.on("keydown", ".sch-row-group .pj-edit", function(e){
					// 繝輔か繝ｼ繧ｫ繧ｹ繧貞粋繧上○縺ｦ縺ｮEnter譎�
					if(e.which === 13){
						common.dialog.pjEditModal($(this).next().val());
					}
				});

				// 蟾･遞九ヰ繝ｼ繝繝悶Ν繧ｯ繝ｪ繝�け譎ゅ∝ｷ･遞九ヰ繝ｼ邱ｨ髮�ム繧､繧｢繝ｭ繧ｰ繧定｡ｨ遉ｺ
				$rowBodyData.on("dblclick", ".sch-bar", function(){
					common.dialog.workEditModal($(this));
				});
			}
		});
	};

	// $(".start-date").val(start.format("YYYY/MM/DD"));
	// $(".end-date").val(end.format("YYYY/MM/DD"));

	// モーダルを開く
	$(document).on("click", ".pj-new-button", function(){
    // alert('アラーートだよ');
		$("#pj-edit-modal").addClass("modal_open");
  });

  // モーダルを閉じる 削除ボタン
	$(document).on("click", ".dislog_close", function(){
		$("#pj-edit-modal").removeClass("modal_open");
  });

  // モーダルを閉じる キャンセルボタン
	$(document).on("click", ".dislog_cancel", function(){
		$("#pj-edit-modal").removeClass("modal_open");
	});

	// 蜊ｰ蛻ｷ
	$(document).on("click", ".print-pj-button", function(){
		// 譚｡莉ｶ縺ｫ蠕薙＞DB縺九ｉ蜿門ｾ�
		window.open(
				"../print/?project_name_word=" + projectNameWord
				+ "&show_income=" + showIncome
				+ "&start=" + start.format("YYYY-MM-DD")
				+ "&end=" + end.format("YYYY-MM-DD")
				+ "&fit_pj_top=" + fitPjTop);
	});

	/**
	 * 繧ｺ繝ｼ繝�
	 */
	var changeZoom = function(isZoomIn){
		var maxZoomLevel = 3;
		var minZoomLevel = 1;

		// 諡｡螟ｧ
		if(isZoomIn){
			if(zoomLevel > maxZoomLevel){
				zoomLevel = maxZoomLevel;
			}else if(zoomLevel == maxZoomLevel){
				//common.dialog.alert("縺薙ｌ莉･荳頑僑螟ｧ縺ｧ縺阪∪縺帙ｓ縲�");
				return;
			}else if(zoomLevel >= minZoomLevel){
				zoomLevel++;
			}else{
				zoomLevel = 1;
			}
		}
		// 邵ｮ蟆�
		else{
			if(zoomLevel > maxZoomLevel){
				zoomLevel = maxZoomLevel;
			}else if(zoomLevel > minZoomLevel){
				zoomLevel--;
			}else if(zoomLevel == minZoomLevel){
				//common.dialog.alert("縺薙ｌ莉･荳顔ｸｮ蟆上〒縺阪∪縺帙ｓ縲�");
				return;
			}else{
				zoomLevel = 1;
			}
		}

		// CSS蛻�崛
		// 謠冗判螳御ｺ�∪縺ｧ髱櫁｡ｨ遉ｺ
		$(".sch-table").css("visibility", "hidden");
		$("#zoom_style").remove();
		var $link = $("<link>");
		$link.attr("rel", "stylesheet");
		$link.attr("id", "zoom_style");
		$link.one("load", function(){
			// 蜀肴緒逕ｻ
			refresh(true);
			$(".sch-table").css("visibility", "");
		});
		$("head").append($link);

		if(zoomLevel == 1){
			cellWidth = 7;
			$link.attr("href", "css/zoom1.css");
		}else if(zoomLevel == 2){
			cellWidth = 14;
			$link.attr("href", "css/zoom2.css");
		}else if(zoomLevel == 3){
			cellWidth = 30;
			$link.attr("href", "css/zoom3.css?20200420");
		}
	};

	// 繧ｺ繝ｼ繝�繧､繝ｳ
	$(document).on("click", ".zoom-in-button", function(){
		changeZoom(true);
	});

	// 繧ｺ繝ｼ繝�繧｢繧ｦ繝�
	$(document).on("click", ".zoom-out-button", function(){
		changeZoom(false);
	});

	// 譛滄俣螟画峩繝懊ち繝ｳ繧ｯ繝ｪ繝�け譎�
	$(document).on("click", ".date-range-change-button", function(){
		var $range = $(this).closest(".date-range");
		var projectValue = $range.find(".project_name_word").val();
		var showIncomeValue = $range.find(".show-income").val();
		var startValue = $range.find(".start-date").val();
		var endValue = $range.find(".end-date").val();
		var fitPjTopValue = 0;
		if($range.find(".check-fit-pj-top").prop('checked')){
			fitPjTopValue = 1;
		}
		var minDate = moment([2001, 0, 1]);
		var maxDate = moment([2099, 11, 31]);

		var startInput = moment(new Date(startValue));
		var endInput = moment(new Date(endValue));
		var maxDispMonths = common.userOption.get("max_date_month");
		if(maxDispMonths == ""){
			maxDispMonths = 12;
		}

		if(fitPjTopValue == 0){
			if((startInput.diff(maxDate, "day") >= 1) || (minDate.diff(startInput, "day") >= 1)){
				common.dialog.error("");
				return;
			}else if(endInput.diff(maxDate, "day") >= 1 || minDate.diff(endInput, "day") >= 1){
				common.dialog.error("");
				return;
			}
			else if (startInput.diff(endInput) >= 1) {
				common.dialog.error("");
				return;
			}
			// 譛滄俣縺�1蟷ｴ髢薙ｒ雜�∴繧句�ｴ蜷�
			else if(endInput.clone().subtract(maxDispMonths, "months").diff(startInput, "day") >= 0){
				common.dialog.error("" + maxDispMonths + "");
				return;
			}
		}
		// 繝√ぉ繝�け繧帝壹▲縺溘ｉ險ｭ螳�
		// 蜈磯�ｭ縺ｫ蜷医ｏ縺帙ｋ蝣ｴ蜷医�縲√％縺薙〒髢句ｧ区律繝ｻ邨ゆｺ�律縺ｮ蛟､繧呈峩譁ｰ縺励↑縺�
		if(fitPjTopValue == 0){
			start = startInput;
			end = endInput;
		}
		projectNameWord = projectValue;
		showIncome = showIncomeValue;
		fitPjTop = fitPjTopValue;

		// 譚｡莉ｶ縺ｫ蠕薙＞DB縺九ｉ蜿門ｾ�
		$.ajax({
			type: "POST",
			url: ".",
			dataType: "json",
			data: {
				change_disp_options: true,
				project_name_word: projectNameWord,
				start_date: start.format("YYYY-MM-DD"),
				end_date: end.format("YYYY-MM-DD"),
				fit_pj_top: fitPjTop
			},
			success: function(result){
				// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
				if("session_error" in result){
					location.href = "../login/";
				}
				// 蜿門ｾ玲�蜉�
				else{
					// 荳隕ｧ繝ｻ髢句ｧ区律縺ｨ邨ゆｺ�律繧呈峩譁ｰ
					pjItems = result["pj_items"];
					start = moment(new Date(result["start_date"])).hour(0); // 讓呎ｺ匁凾
					end = moment(new Date(result["end_date"])).hour(0); // 讓呎ｺ匁凾
					$range.find(".start-date").val(start.format("YYYY/MM/DD"))
					$range.find(".end-date").val(end.format("YYYY/MM/DD"))

					refresh(false);
				}
			}
		});
	});

	// 縲瑚｡ｨ遉ｺ繧呈｡井ｻｶ縺ｮ蜈磯�ｭ縺ｫ蜷医ｏ縺帙ｋ縲阪メ繧ｧ繝�け繝懊ャ繧ｯ繧ｹ 繧ｯ繝ｪ繝�け譎�
	$(document).on("click", "input.check-fit-pj-top", function(){
		var $range = $(".date-range");
		// 譌･莉俶ｬ�┌蜉ｹ蛻�崛
		if($(this).prop('checked')){
			$range.find(".start-date, .end-date").prop("disabled", true);
		}else{
			$range.find(".start-date, .end-date").prop("disabled", false);
		}
	});

	// 譛郁｡ｨ遉ｺ繧ｯ繝ｪ繝�け譎�
	$(document).on("click", function(e){
		var $target = $(e.target);

		if (!$target.is(".month_label")) {
			$target = $target.parent();
		}

		if (!$target.is(".month_label")) {
			$(".month_label").popover("hide");
		}
		else {
			var popoverState = $target.data("popoverstate");
			if (typeof popoverState === "undefined") {
				$target.popover({
					container: "body",
					placement: "auto",
					html: true,
					title: function(){
						var $this = $(this);
						var ym = $this.attr("month").split("/");
						var $element = $this.closest(".sch-table").find(".money-table-panel.y" + ym[0] + ".m" + ym[1] + " .panel-heading");
						return $element.length > 0 ? $element.html() : "";
					},
					content: function(){
						var $this = $(this);
						var ym = $this.attr("month").split("/");
						var $element = $this.closest(".sch-table").find(".money-table-panel.y" + ym[0] + ".m" + ym[1] + " .panel-body");
						return $element.length > 0 ? $element.html() : "";
					}
				});
				popoverState = false;
				$target.on("hidden.bs.popover", function(){
					$target.data("popoverstate", false);
				});
			}

			if (popoverState) {
				$target.popover("hide");
				$target.data("popoverstate", false);
			}
			else {
				$target.popover("show");
				$target.data("popoverstate", true);
			}
		}
	});

	// 繝｡繝九Η繝ｼ繝懊ち繝ｳ繧ｯ繝ｪ繝�け譎�
	$(document).on("click", function(e){
		var $target = $(e.target);

		// 繝｡繝九Η繝ｼ繝懊ち繝ｳ縲√Γ繝九Η繝ｼ縲∵律莉倥ヴ繝�き繝ｼ莉･螟悶�繧ｯ繝ｪ繝�け譎ゅ√Γ繝九Η繝ｼ繧帝撼陦ｨ遉ｺ
		if(!$target.is(".menu-button") && $target.parents(".popover").size() == 0
				&& $target.parents("#ui-datepicker-div").size() == 0
				&& $target.parent().find(".ui-datepicker-current, .ui-datepicker, " +
						".ui-icon-circle-triangle-e, .ui-icon-circle-triangle-w").size() == 0) {
			$(".menu-button").popover("hide");
		}
		// 繝｡繝九Η繝ｼ繝懊ち繝ｳ繧ｯ繝ｪ繝�け譎�
		else if($target.is(".menu-button")){
			var popoverState = $target.data("popoverstate");
			if (typeof popoverState === "undefined") {
				$target.popover({
					container: "body",
					placement: "auto",
					html: true,
					title: function(){
						var $this = $(this);
						return "";
					},
					// 繝｡繝九Η繝ｼ繧偵�繝��繧ｪ繝ｼ繝舌�蜀�↓遘ｻ蜍�
					content: $("#main-control .form-inline.date-range.pull-right")
				});

				popoverState = false;
				// hidden譎ゅ↓縺ｯ隕∫ｴ�縺檎┌縺上↑繧九◆繧∝�縺ｫ繝｡繝九Η繝ｼ繧呈綾縺�
				$target.on("hide.bs.popover", function(){
					if($target.data("popoverstate")){
						$("#main-control").prepend($(".popover-content .form-inline.date-range.pull-right"));
					}
				});

				$target.on("hidden.bs.popover", function(){
					$target.data("popoverstate", false);
				});
			}

			if (popoverState) {
				$target.popover("hide");
				$target.data("popoverstate", false);
			}
			else {
				$target.popover("show");
				$target.data("popoverstate", true);
			}
		}
	});

	// 譖ｴ譁ｰ
    refresh(true);
});

/**
 * http://qiita.com/yasumodev/items/db09a01c9caac27f48e5
 * 驟榊�繧�2縺､縺ｮ繧ｭ繝ｼ縺ｧ繧ｽ繝ｼ繝医☆繧�
 * @param ary
 * @param key1
 * @param order1
 * @param key2
 * @param order2
 */
function ObjArraySort2(ary, key1, order1, key2, order2) {
	var reverse1 = 1;
	var reverse2 = 1;
	if (order1 && order1.toLowerCase() == "desc")
		reverse1 = -1;
	if (order2 && order2.toLowerCase() == "desc")
		reverse2 = -1;

	ary.sort(function(a, b) {
		// Compare 1st key
		if (a[key1] < b[key1])
			return -1 * reverse1;
		else if (a[key1] > b[key1])
			return 1 * reverse1;
		else {
			// Compare 2nd key
			if (a[key2] < b[key2])
				return -1 * reverse2;
			else if (a[key2] > b[key2])
				return 1 * reverse2;
			else
				return 0;
		}
	});
}
