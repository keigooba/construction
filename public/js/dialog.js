(function() {
	common.dialog.pjEditModal = function(projectId){
		var def = new jQuery.Deferred();
		var workTypeNames = ["main", "sub1", "sub2"];
		var maxIncomeNumber = 10;
		var maxWorkNumber = common.userOption.get("max_main_work");
		if(maxWorkNumber == ""){
			maxWorkNumber = 20
		}

		var $dialog = $("#pj-edit-modal");
		if ($dialog.length == 0) {
			$dialog = $('\
				<div class="modal" id="pj-edit-modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close dislog_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
								<div class="modal-title" data-msgname="dialog_confirm_title">案件編集</div>\
              </div>\
              <form class="form-horizontal">\
							<div class="modal-body">\
								<div class="modal-error-msg-area">\
								</div>\
								<ul class="nav nav-tabs">\
									<li class="active"><a href="#tab1" data-toggle="tab">基本情報</a></li>\
                </ul>\
								<div class="tab-content">\
									<div class="tab-pane active" id="tab1">\
                    <div class="form-group">\
                      <label for="pj-name" class="control-label column col-sm-3 required">邸名</label>\
                      <div class="column col-sm-9">\
                        <div class="input-group tei-group">\
                          <input type="text" class="form-control" id="pj-name" name="pj_name" value="" placeholder="邸名 (例: コスモホーム邸)">\
                          <label class="control-label input-group-addon preview_picker">\
                            <input class="color-preview" type="text" id="pj_color" name="pj_color" />\
                          </label>\
                        </div>\
                      </div>\
                    </div>\
                    <div class="form-group">\
                      <label for="pj-name-sub" class="control-label column col-sm-3">補足情報</label>\
                      <div class="column col-sm-9">\
                        <input type="text" class="form-control" id="pj-name-sub" name="pj_name_sub" value="" placeholder="建築場所 (例: ◯◯市　2階建)">\
                      </div>\
                    </div>\
                    <div class="form-group">\
                      <label for="pj-name-sub2" class="control-label column col-sm-3">補足情報2</label>\
                      <div class="column col-sm-9">\
                        <input type="text" class="form-control" id="pj-name-sub2" name="pj_name_sub2" value="" placeholder="補足情報2">\
                      </div>\
                    </div>\
                    <div class="form-group">\
                      <label for="sales-staff" class="control-label column col-sm-3">担当</label>\
                      <div class="column col-sm-9 col_staff">\
                        <div class="input-group">\
                          <label for="sales-staff" class="control-label input-group-addon">営業</label>\
                          <input type="text" class="form-control" id="sales-staff" name="sales_staff" value="" placeholder="営業 (例: 山田)">\
                          <label class="control-label input-group-addon preview_picker">\
                            <input class="color-preview" type="text" id="sales_staff_color" name="sales_staff_color" />\
                          </label>\
                        </div>\
                        <div class="input-group">\
                          <label for="designer" class="control-label input-group-addon">設計</label>\
                          <input type="text" class="form-control" id="designer" name="designer" value="" placeholder="設計 (例: 山田)">\
                          <label class="control-label input-group-addon preview_picker">\
                            <input class="color-preview" type="text" id="designer_color" name="designer_color" />\
                          </label>\
                        </div>\
                        <div class="input-group">\
                          <label for="constructor" class="control-label input-group-addon">工事</label>\
                          <input type="text" class="form-control" id="constructor" name="constructor" value="" placeholder="工事 (例: 山田)">\
                          <label class="control-label input-group-addon preview_picker">\
                            <input class="color-preview" type="text" id="constructor_color" name="constructor_color" />\
                          </label>\
                        </div>\
                        <div class="input-group">\
                          <label for="trader" class="control-label input-group-addon">業者</label>\
                          <input type="text" class="form-control" id="trader" name="trader" value="" placeholder="業者 (例: 山田)">\
                          <label class="control-label input-group-addon preview_picker">\
                            <input class="color-preview" type="text" id="trader_color" name="trader_color" />\
                          </label>\
                        </div>\
                      </div>\
                    </div>\
                    <div class="form-group">\
                      <label for="contract" class="control-label column col-sm-3">契約金額</label>\
                      <div class="column col-sm-9">\
                        <input type="text" class="form-control input_number" name="contract" value="" placeholder="契約金額 (例: 32500000)">\
                      </div>\
                    </div>\
                    <div class="form-group">\
                      <label for="base-date" class="control-label column col-sm-3 required">開始日</label>\
                      <div class="column col-sm-9">\
                        <input type="date" class="form-control dialog_column" id="base-date" name="base_date" value="" placeholder="開始日 (例: 2015/01/01)">\
                      </div>\
                    </div>\
                    <div class="form-group">\
                      <label for="memo" class="control-label column col-sm-3">メモ</label>\
                      <div class="column col-sm-9">\
                        <input type="text" class="form-control" id="memo" name="memo" value="" placeholder="メモ">\
                      </div>\
                    </div>\
                    <div class="form-group" id="nensyo-form-group">\
                      <label for="nensyo" class="control-label column col-sm-3">番号先頭</label>\
                      <div class="column col-sm-9">\
                        <div class="checkbox">\
                          <label class="nensyo-label">\
                            <input type="checkbox" id="nensyo" name="nensyo" value="1">\
                            この案件を1番として、以降の案件番号を連番で設定する。\
                            <label id="no_first_color_area" class="control-label input-group-addon preview_picker">\
                              <input class="color-preview" type="text" id="no_first_color" name="no_first_color" />\
                            </label>\
                          </label>\
                        </div>\
                      </div>\
                    </div>\
                    <input type="hidden" id="pj_id" name="pj_id" value="">\
                    <input type="hidden" id="pj_no" name="pj_no" value="">\
                    \
									</div>\
									<!-- 驥鷹｡� -->\
									<div class="tab-pane" id="tab2">\
										<div class="panel panel-default">\
										    <div class="panel-heading">\
												<button type="button" class="btn btn-primary add-money-row-button">陦後ｒ霑ｽ蜉�</button>\
												<button type="button" class="btn btn-primary del-money-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>\
										    </div>\
										    <div class="panel-body">\
											    <table class="table table-bordered input-table pj-money-table">\
											    	<thead>\
											    		<tr>\
											    			<th class="checkbox-column"><input type="checkbox" class="all-select"></th>\
											    			<th class="no-column">No.</th>\
											    			<th>蜈･驥大錐</th>\
											    			<th>蜈･驥台ｺ亥ｮ壽律</th>\
											    			<th>驥鷹｡�</th>\
											    		</tr>\
											    	</thead>\
													<tfoot class="total-income">\
														<tr>\
															<td colspan="3"></td>\
															<td class="total-income-title">蜷郁ｨ�</td>\
															<td class="total-income-text"></td>\
														</tr>\
													</tfoot>\
											    	<tbody>\
											    	</tbody>\
											    </table>\
											    <p>陦後�蜿鈴�倅ｺ亥ｮ壽律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>\
										    </div>\
										</div>\
									\
									</div>\
									\
									<!-- 繝｡繧､繝ｳ蟾･遞� -->\
									<div class="tab-pane clearfix" id="tab3">\
										<div class="panel panel-default">\
										    <div class="panel-heading">\
												<button type="button" class="btn btn-primary add-work-temp-button" title="髮帛ｽ｢(繧医￥縺ゅｋ蟾･遞九�繧ｻ繝�ヨ)繧定ｿｽ蜉�縺励∪縺吶�">髮帛ｽ｢繧定ｿｽ蜉�</button>\
												<button type="button" class="btn btn-primary add-main-row-button">陦後ｒ霑ｽ蜉�</button>\
												<button type="button" class="btn btn-primary del-main-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>\
										    </div>\
										    <div class="panel-body">\
											    <table class="table table-bordered input-table pj-main-table work-table">\
											    	<thead>\
											    		<tr>\
											    			<th class="checkbox-column"><input type="checkbox" class="all-select"></th>\
											    			<th class="no-column">No.</th>\
											    			<th>鬆�岼蜷�</th>\
											    			<th>髢句ｧ区律</th>\
											    			<th>邨ゆｺ�律</th>\
											    			<th>髢句ｧ九ユ繧ｭ繧ｹ繝�</th>\
											    			<th>荳ｭ螟ｮ繝�く繧ｹ繝�</th>\
											    			<th>邨ゆｺ�ユ繧ｭ繧ｹ繝�</th>\
											    			<th>濶ｲ</th>\
															<th>譯井ｻｶ陦ｨ遉ｺ鬆�ｯｾ雎｡</th>\
											    		</tr>\
											    	</thead>\
											    	<tbody>\
											    	</tbody>\
											    </table>\
											    <p>陦後�髢句ｧ区律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>\
										    </div>\
										</div>\
									</div>\
									\
									<!-- 荳企Κ蟾･遞� -->\
									<div class="tab-pane clearfix" id="tab4">\
										<div class="panel panel-default">\
										    <div class="panel-heading">\
												<button type="button" class="btn btn-primary add-sub1-row-button">陦後ｒ霑ｽ蜉�</button>\
												<button type="button" class="btn btn-primary del-sub1-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>\
										    </div>\
										    <div class="panel-body">\
											    <table class="table table-bordered input-table pj-sub1-table work-table">\
											    	<thead>\
											    		<tr>\
											    			<th class="checkbox-column"><input type="checkbox" class="all-select"></th>\
											    			<th class="no-column">No.</th>\
											    			<th>鬆�岼蜷�</th>\
											    			<th>髢句ｧ区律</th>\
											    			<th>邨ゆｺ�律</th>\
											    			<th>髢句ｧ九ユ繧ｭ繧ｹ繝�</th>\
											    			<th>荳ｭ螟ｮ繝�く繧ｹ繝�</th>\
											    			<th>邨ゆｺ�ユ繧ｭ繧ｹ繝�</th>\
											    			<th>濶ｲ</th>\
											    		</tr>\
											    	</thead>\
											    	<tbody>\
											    	</tbody>\
											    </table>\
											    <p>陦後�髢句ｧ区律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>\
										    </div>\
										</div>\
									</div>\
									<!-- 荳矩Κ蟾･遞� -->\
									<div class="tab-pane clearfix" id="tab5">\
										<div class="panel panel-default">\
										    <div class="panel-heading">\
												<button type="button" class="btn btn-primary add-sub2-row-button">陦後ｒ霑ｽ蜉�</button>\
												<button type="button" class="btn btn-primary del-sub2-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>\
										    </div>\
										    <div class="panel-body">\
											    <table class="table table-bordered input-table pj-sub2-table work-table">\
											    	<thead>\
											    		<tr>\
											    			<th class="checkbox-column"><input type="checkbox" class="all-select"></th>\
											    			<th class="no-column">No.</th>\
											    			<th>鬆�岼蜷�</th>\
											    			<th>髢句ｧ区律</th>\
											    			<th>邨ゆｺ�律</th>\
											    			<th>髢句ｧ九ユ繧ｭ繧ｹ繝�</th>\
											    			<th>荳ｭ螟ｮ繝�く繧ｹ繝�</th>\
											    			<th>邨ゆｺ�ユ繧ｭ繧ｹ繝�</th>\
											    			<th>濶ｲ</th>\
											    		</tr>\
											    	</thead>\
											    	<tbody>\
											    	</tbody>\
											    </table>\
											    <p>陦後�髢句ｧ区律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>\
										    </div>\
										</div>\
									</div>\
									<!-- 繝輔ぃ繧､繝ｫ邂｡逅� -->\
									<div class="tab-pane clearfix" id="tab6">\
										<p>窶ｻ繝輔ぃ繧､繝ｫ縺ｮ繧｢繝��繝ｭ繝ｼ繝峨ｄ蜑企勁縺ｯ繧ｭ繝｣繝ｳ繧ｻ繝ｫ繝懊ち繝ｳ繧呈款縺励※繧ょ叙繧頑ｶ医☆縺薙→縺後〒縺阪∪縺帙ｓ縺ｮ縺ｧ縺疲ｳｨ諢上￥縺�縺輔＞縲�</p>\
										<div class="panel panel-default">\
											<div id="elfinder"></div>\
											<div class="elfinder_description_wrap">\
												<h3 class="elfinder_description_title">繝懊ち繝ｳ萓�</h3>\
												<ul class="elfinder_description">\
													<li><span class="elfinder-button-icon elfinder-button-icon-mkdir"></span> 譁ｰ隕上ヵ繧ｩ繝ｫ繝繧剃ｽ懈�縺励∪縺吶�</li>\
													<li><span class="elfinder-button-icon elfinder-button-icon-rm"></span> 繝輔ぃ繧､繝ｫ縺ｮ蜑企勁繧定｡後＞縺ｾ縺吶�</li>\
													<li><span class="elfinder-button-icon elfinder-button-icon-upload"></span> 繝輔ぃ繧､繝ｫ縺ｮ繧｢繝��繝ｭ繝ｼ繝峨ｒ陦後＞縺ｾ縺吶�</li>\
												</ul>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary pj-save-button">保存</button>\
								<button type="button" class="btn btn-default" data-dismiss="modal">キャンセル</button>\
              </div>\
              </form>\
						</div>\
					</div>\
				</div>\
			');
			$dialog.appendTo("body");
			// 繝繧､繧｢繝ｭ繧ｰ螟悶ｒ繧ｯ繝ｪ繝�け縺励※繧る哩縺倥＆縺帙↑縺�
			$dialog.modal({
				backdrop: 'static'
			});

			// 諡�ｽ�
			$dialog.find("label[for='sales-staff'].input-group-addon").text(common.userOption.get("staff_name_1"));
			$dialog.find("label[for='designer']").text(common.userOption.get("staff_name_2"));
			$dialog.find("label[for='constructor']").text(common.userOption.get("staff_name_3"));
			$dialog.find("label[for='trader']").text(common.userOption.get("staff_name_4"));
			$dialog.find("input[name='sales_staff']").attr("placeholder", common.userOption.get("staff_name_1") + " (例: 山田)");
			$dialog.find("input[name='designer']").attr("placeholder", common.userOption.get("staff_name_2") + " (例: 山田)");
			$dialog.find("input[name='constructor']").attr("placeholder", common.userOption.get("staff_name_3") + " (例: 山田)");
			$dialog.find("input[name='trader']").attr("placeholder", common.userOption.get("staff_name_1") + " (例: 山田)");

			// 繧ｨ繝ｩ繝ｼ繝｡繝�そ繝ｼ繧ｸ陦ｨ遉ｺ蝓�
			var $errorMsgArea = $dialog.find(".modal-error-msg-area");

			// 譌･莉倥ヴ繝�き繝ｼ險ｭ螳�
			// var $baseDate = $dialog.find("#base-date");
			// $baseDate.datepicker();
			// $baseDate.prop("type", "text");

			// 驥鷹｡� 繧ｫ繝ｳ繝槫宛蠕｡
			$dialog.on("focus", "input.input_number", function(){
				$(this).val($(this).val().replace(/,/g, ""));
			});
			$dialog.on("blur", "input.input_number", function(){
				$(this).val(common.formatNumber($(this).val()));
			});
			// 謨ｰ蟄� 蜈･蜉帛宛髯�
			$dialog.on("input", "input.input_number", function(){
				// IE縺ｧ縲後�繝ｼ繧ｸ繧�1蝗樔ｻ･荳翫Μ繝ｭ繝ｼ繝峨＠縺� 荳斐▽ 蛻晏屓縺ｮ譯井ｻｶ邱ｨ髮�判髱｢陦ｨ遉ｺ譎ゅ阪↓input繧､繝吶Φ繝医′逋ｺ逕溘☆繧句撫鬘後�蟇ｾ遲�
				if($(this).is(":focus")){
					// 荳肴ｭ｣縺ｪ譁�ｭ励′蜷ｫ縺ｾ繧後ｋ蝣ｴ蜷医√◎繧後ｒ蜑企勁
					if(this.value.length > 0 && this.value.match(/[^0-9]/g)){
						$(this).val($(this).val().replace(/[^0-9]/g, ""));
					}
				}
			});

			// 蜈･驥台ｺ亥ｮ壽律騾｣蜍戊ｩｲ蠖楢｡�
			var $pjMoneyTable = $dialog.find("table.pj-money-table");
			var $pjMainTable = $dialog.find("table.pj-main-table");
			var $pjSub1Table = $dialog.find("table.pj-sub1-table");
			var $pjSub2Table = $dialog.find("table.pj-sub2-table");
			// 髢句ｧ区律螟画峩譎ゅ�蜈･驥台ｺ亥ｮ壽律騾｣蜍�
			$pjMainTable.on("change", "input[name='main_start_date[]']", function(){
				$(this).addClass("change_now");
				linkIncomeDate($dialog);
				setDayLinkClass($dialog);
			});
			$pjSub1Table.on("change", "input[name='sub1_start_date[]']", function(){
				$(this).addClass("change_now");
				linkIncomeDate($dialog);
				setDayLinkClass($dialog);
			});
			$pjSub2Table.on("change", "input[name='sub2_start_date[]']", function(){
				$(this).addClass("change_now");
				linkIncomeDate($dialog);
				setDayLinkClass($dialog);
			});

			// 蜈･驥大錐驥崎､�メ繧ｧ繝�け
			var incomeNameBeforeChange = "";
			$pjMoneyTable.on("focus", "input[name='income_name[]']", function(){
				// 螟画峩蜑阪�蛟､繧剃ｿ晄戟
				incomeNameBeforeChange = this.value;
				$(this).removeClass("name_duplicate");
			});
			$pjMoneyTable.on("change", "input[name='income_name[]'], input[name='income_date[]']", function(){
				var incomeNameAfterChange = this;
				var countSameName = 0;

				// 遨ｺ縺ｮ蝣ｴ蜷医�繧ｨ繝ｩ繝ｼ縺ｨ縺励↑縺�
				if(this.value != ""){
					var $incomeName = $pjMoneyTable.find("input[name='income_name[]']");
					$incomeName.each(function(index, element){
						if(element.value == incomeNameAfterChange.value){
							countSameName++;
							if(countSameName >= 2){
								incomeNameAfterChange.value = incomeNameBeforeChange;
								$(incomeNameAfterChange).addClass("name_duplicate");
								common.dialog.error("蜷後§蜷榊燕縺ｮ蜈･驥大錐縺ｯ隍�焚險ｭ螳壹〒縺阪∪縺帙ｓ縲�");
								return false;
							}
						}
					});
				}
				// 驥崎､�＠縺ｦ縺�↑縺��ｴ蜷�
				if(countSameName <= 1){
					setDayLinkClass($dialog);
				}
			});

			// 蟾･遞句錐螟画峩譎�
			$pjMainTable.on("change", "input[name='main_name[]']", function(){
				linkIncomeDate($dialog);
				setDayLinkClass($dialog);
			});
			$pjSub1Table.on("change", "input[name='sub1_name[]']", function(){
				linkIncomeDate($dialog);
				setDayLinkClass($dialog);
			});
			$pjSub2Table.on("change", "input[name='sub2_name[]']", function(){
				linkIncomeDate($dialog);
				setDayLinkClass($dialog);
			});

			// 驥鷹｡阪�陦瑚ｿｽ蜉�繝懊ち繝ｳ
			$dialog.find(".add-money-row-button").click(function(){
				var $rowList = $dialog.find(".pj-money-table tbody tr");
				if($rowList.length >= maxIncomeNumber){
					common.dialog.error("霑ｽ蜉�縺ｧ縺阪ｋ陦後�" + maxIncomeNumber + "陦後∪縺ｧ縺ｫ蛻ｶ髯舌＆繧後※縺�∪縺吶�");
					return false;
				}

				var rowNumber = $rowList.length + 1;

				var text = "";
				text += '<tr>';
				text += '<td class="checkbox-column"><input type="checkbox"></td>';
				text += '<td class="no-column">' + rowNumber + '</td>';
				text += '<td><input type="text" class="form-control" name="income_name[]" value=""></td>';
				text += '<td><input type="date" class="form-control" name="income_date[]" value=""></td>';
				text += '<td><input type="text" class="form-control input_number" name="income_money[]" value="0"></td>';
				text += '</tr>';
				$dialog.find(".pj-money-table tbody").append(text);

				var $date = $dialog.find(".pj-money-table tbody:last-child input[type='date']");
				$date.datepicker();
				$date.prop("type", "text");
			});

			// 驥鷹｡阪�陦悟炎髯､繝懊ち繝ｳ
			$dialog.find(".del-money-row-button").click(function(){
				var $checkedList = $dialog.find(".pj-money-table tbody input[type='checkbox']:checked");
				var $checkBoxList = $dialog.find(".pj-money-table tbody input[type='checkbox']");
				// 鬆�岼譛ｪ驕ｸ謚槭�蝣ｴ蜷医お繝ｩ繝ｼ
				if ($checkedList.length == 0) {
					common.dialog.error("陦後ｒ驕ｸ謚槭＠縺ｦ縺上□縺輔＞縲�");
					return false;
				}
				// 陦梧焚縺�0縺ｫ縺ｪ繧句�ｴ蜷医お繝ｩ繝ｼ
				else if($checkBoxList.length - $checkedList.length <= 0){
					common.dialog.error("陦後ｒ蜈ｨ縺ｦ蜑企勁縺吶ｋ縺薙→縺ｯ縺ｧ縺阪∪縺帙ｓ縲�");
					return false;
				}

				$checkedList.parent().parent().remove();
				$dialog.find(".pj-money-table tbody .no-column").each(function(i, elem) {
					elem.innerHTML = i + 1;
				});

				// 蜷郁ｨ亥�險育ｮ�
				var $moneyInputNumbers = $dialog.find(".pj-money-table tbody .input_number");
				if($moneyInputNumbers.size() > 0){
					$moneyInputNumbers.eq(0).trigger("blur");
				}
			});

			// 蜷郁ｨ磯≡鬘崎｡ｨ遉ｺ
			var $totalIncomeText = $dialog.find("tfoot.total-income .total-income-text ");
			$dialog.find(".pj-money-table").on("blur", ".input_number", function(){
				var totalIncome = 0;
				$dialog.find(".pj-money-table .input_number").each(function(i, elem) {
					totalIncome += Number($(elem).val().replace(/,/g, ""));
				});
				$totalIncomeText.text(common.formatNumber(totalIncome));
			});

			_.each(workTypeNames, function(workTypeName){
				// 蟾･遞九�陦瑚ｿｽ蜉�繝懊ち繝ｳ
				$dialog.find(".add-" + workTypeName +"-row-button").click(function(){
					var $rowList = $dialog.find(".pj-" + workTypeName + "-table tbody tr");
					if($rowList.length >= maxWorkNumber){
						common.dialog.error("霑ｽ蜉�縺ｧ縺阪ｋ陦後�" + maxWorkNumber + "陦後∪縺ｧ縺ｫ蛻ｶ髯舌＆繧後※縺�∪縺吶�");
						return false;
					}

					var rowNumber = $rowList.length + 1;

					var text = "";
					text += '<tr>';
					text += '<td class="checkbox-column"><input type="checkbox"></td>';
					text += '<td class="no-column">' + rowNumber + '</td>';
					text += '<td><input type="text" class="form-control" name="' + workTypeName + '_name[]" value=""></td>';
					text += '<td><input type="date" class="form-control start-date" name="' + workTypeName + '_start_date[]" value=""></td>';
					text += '<td><input type="date" class="form-control end-date" name="' + workTypeName + '_end_date[]" value=""></td>';
					text += '<td><input type="text" class="form-control" name="' + workTypeName + '_start_text[]" value=""></td>';
					text += '<td><input type="text" class="form-control" name="' + workTypeName + '_main_text[]" value=""></td>';
					text += '<td><input type="text" class="form-control" name="' + workTypeName + '_end_text[]" value=""></td>';
					text += '<td><input class="color-preview" type="text" name="' + workTypeName + '_color[]" value="red" /></td>';
					if(workTypeName == "main"){
						text += '<td><input type="radio" class="order_target_radio" name="' + workTypeName + '_order_target[]" value="1" /></td>';
					}
					text += '</tr>';
					$dialog.find(".pj-" + workTypeName + "-table tbody").append(text);
					var $addedRow = $dialog.find(".pj-" + workTypeName + "-table tbody:last-child");

					// 譌･莉倥ヴ繝�き繝ｼ險ｭ螳�
					var $date = $("input[type='date']", $addedRow);
					$date.datepicker();
					$date.prop("type", "text");

					// 繧ｫ繝ｩ繝ｼ繝斐ャ繧ｫ繝ｼ險ｭ螳�
					$(".color-preview", $addedRow).spectrum();
				});
				// 蟾･遞九�陦悟炎髯､繝懊ち繝ｳ
				$dialog.find(".del-" + workTypeName + "-row-button").click(function(){
					var $checkedList = $dialog.find(".pj-" + workTypeName + "-table tbody input[type='checkbox']:checked");
					// 鬆�岼譛ｪ驕ｸ謚槭�蝣ｴ蜷医お繝ｩ繝ｼ
					if ($checkedList.length == 0) {
						common.dialog.error("陦後ｒ驕ｸ謚槭＠縺ｦ縺上□縺輔＞縲�");
						return false;
					}

					$checkedList.parent().parent().remove();
					$(".pj-" + workTypeName + "-table tbody .no-column").each(function(i, elem) {
						elem.innerHTML = i + 1;
					});

					// 蜈･驥台ｺ亥ｮ壽律騾｣蜍輔け繝ｩ繧ｹ險ｭ螳�
					setDayLinkClass($dialog);
				});
			});

			// 菫晏ｭ倥�繧ｿ繝ｳ
			$dialog.find(".pj-save-button").click(function(){
				var $pjEditModal = $("#pj-edit-modal .tab-content");

				var pjId = $("input[name='pj_id']", $pjEditModal).val(); // 邱ｨ髮�凾縺ｮ縺ｿID蜈･繧�

				var pjName = $("input[name='pj_name']", $pjEditModal).val();
				var pjColor = $("input[name='pj_color']", $pjEditModal).spectrum("get").toHexString();
				var pjNameSub = $("input[name='pj_name_sub']", $pjEditModal).val();
				var pjNameSub2 = $("input[name='pj_name_sub2']", $pjEditModal).val();
				var salesStaff = $("input[name='sales_staff']", $pjEditModal).val();
				var salesStaffColor = $("input[name='sales_staff_color']", $pjEditModal).spectrum("get").toHexString();
				var designer = $("input[name='designer']", $pjEditModal).val();
				var designerColor = $("input[name='designer_color']", $pjEditModal).spectrum("get").toHexString();
				var constructor = $("input[name='constructor']", $pjEditModal).val();
				var constructorColor = $("input[name='constructor_color']", $pjEditModal).spectrum("get").toHexString();
				var trader = $("input[name='trader']", $pjEditModal).val();
				var traderColor = $("input[name='trader_color']", $pjEditModal).spectrum("get").toHexString();
				var contract = $("input[name='contract']", $pjEditModal).val().replace(/,/g, "");
				var baseDate = $("input[name='base_date']", $pjEditModal).val();
				var memo = $("input[name='memo']", $pjEditModal).val();
				var noFirst;
				if($("input[name='nensyo']").prop("checked")){
					noFirst = 1
				}else{
					noFirst = 0;
				}
				var noFirstColor = $("input[name='no_first_color']", $pjEditModal).spectrum("get").toHexString();

				var income = [];
				var $incomeName = $("input[name='income_name[]']", $pjEditModal);
				var $incomeDate = $("input[name='income_date[]']", $pjEditModal);
				var $incomeMoney = $("input[name='income_money[]']", $pjEditModal);
				$incomeName.each(function(index, element){
					income.push({
						name: $(element).val(),
						date: $incomeDate.eq(index).val(),
						money: $incomeMoney.eq(index).val().replace(/,/g, "")
					});
				});

				var mainline = [];
				var $mainName = $("input[name='main_name[]']", $pjEditModal);
				var $mainStartDate = $("input[name='main_start_date[]']", $pjEditModal);
				var $mainEndDate = $("input[name='main_end_date[]']", $pjEditModal);
				var $mainStartText = $("input[name='main_start_text[]']", $pjEditModal);
				var $mainMainText = $("input[name='main_main_text[]']", $pjEditModal);
				var $mainEndText = $("input[name='main_end_text[]']", $pjEditModal);
				var $mainColor = $("input[name='main_color[]']", $pjEditModal);
				var $mainOrderTarget = $("input[name='main_order_target[]']", $pjEditModal);
				$mainStartDate.each(function(index, element){
					mainline.push({
						name: $mainName.eq(index).val(),
						startDate: $mainStartDate.eq(index).val(),
						endDate: $mainEndDate.eq(index).val(),
						startText: $mainStartText.eq(index).val(),
						mainText: $mainMainText.eq(index).val(),
						endText: $mainEndText.eq(index).val(),
						color: $mainColor.eq(index).spectrum("get").toHexString(),
						orderTarget: $mainOrderTarget.eq(index).is(":checked") ? 1 : 0
					});
				});

				var sub1line = [];
				var $sub1Name = $("input[name='sub1_name[]']", $pjEditModal);
				var $sub1StartDate = $("input[name='sub1_start_date[]']", $pjEditModal);
				var $sub1EndDate = $("input[name='sub1_end_date[]']", $pjEditModal);
				var $sub1StartText = $("input[name='sub1_start_text[]']", $pjEditModal);
				var $sub1MainText = $("input[name='sub1_main_text[]']", $pjEditModal);
				var $sub1EndText = $("input[name='sub1_end_text[]']", $pjEditModal);
				var $sub1Color = $("input[name='sub1_color[]']", $pjEditModal);
				$sub1StartDate.each(function(index, element){
					sub1line.push({
						name: $sub1Name.eq(index).val(),
						startDate: $sub1StartDate.eq(index).val(),
						endDate: $sub1EndDate.eq(index).val(),
						startText: $sub1StartText.eq(index).val(),
						mainText: $sub1MainText.eq(index).val(),
						endText: $sub1EndText.eq(index).val(),
						color: $sub1Color.eq(index).spectrum("get").toHexString(),
						orderTarget: 0
					});
				});

				var sub2line = [];
				var $sub2Name = $("input[name='sub2_name[]']", $pjEditModal);
				var $sub2StartDate = $("input[name='sub2_start_date[]']", $pjEditModal);
				var $sub2EndDate = $("input[name='sub2_end_date[]']", $pjEditModal);
				var $sub2StartText = $("input[name='sub2_start_text[]']", $pjEditModal);
				var $sub2MainText = $("input[name='sub2_main_text[]']", $pjEditModal);
				var $sub2EndText = $("input[name='sub2_end_text[]']", $pjEditModal);
				var $sub2Color = $("input[name='sub2_color[]']", $pjEditModal);
				$sub2StartDate.each(function(index, element){
					sub2line.push({
						name: $sub2Name.eq(index).val(),
						startDate: $sub2StartDate.eq(index).val(),
						endDate: $sub2EndDate.eq(index).val(),
						startText: $sub2StartText.eq(index).val(),
						mainText: $sub2MainText.eq(index).val(),
						endText: $sub2EndText.eq(index).val(),
						color: $sub2Color.eq(index).spectrum("get").toHexString(),
						orderTarget: 0
					});
				});

				var additionalPjItem = {
					pjId: pjId,
					pjNameSub : pjNameSub,
					pjNameSub2 : pjNameSub2,
					pjName : pjName,
					pjColor : pjColor,
					date : baseDate,
					salesStaff : salesStaff,
					salesStaffColor : salesStaffColor,
					designer : designer,
					designerColor : designerColor,
					constructor : constructor,
					constructorColor : constructorColor,
					trader : trader,
					traderColor : traderColor,
					contract : contract,
					memo : memo,
					noFirst : noFirst,
					noFirstColor: noFirstColor,
					income: income,
					mainline: mainline,
					sub1line: sub1line,
					sub2line: sub2line
				};

				// 菫晏ｭ�
				$.ajax({
					type: "POST",
					url: ".",
					dataType: "json",
					data: {
						save_project: true,
						project_data: JSON.stringify(additionalPjItem),
						show_project_name_word: projectNameWord,
						start_date: start.format("YYYY-MM-DD"),
						end_date: end.format("YYYY-MM-DD"),
						fit_pj_top: fitPjTop
					},
					success: function(result){
						// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
						if("session_error" in result){
							location.href = "../login/";
						}
						// 菫晏ｭ伜､ｱ謨�
						else if("save_failure_message" in result){
							$errorMsgArea.addClass("alert alert-danger");
							$errorMsgArea.text(result["save_failure_message"]);
							$dialog.animate({scrollTop: 0});
						}
						// 菫晏ｭ俶�蜉�
						else{
							// 荳隕ｧ譖ｴ譁ｰ
							pjItems = result["pj_items"];
							refresh(false);
							// 髢峨§繧�
							$dialog.modal('hide');
							def.resolve();
						}
					}
				});
			});

			// 蜑企勁繝懊ち繝ｳ
			$dialog.find(".pj-delete-button").click(function(){
				common.dialog.confirm("", function(){
					var $pjEditModal = $dialog.find(".tab-content");
					var id = $("input[name='pj_id']", $pjEditModal).val();

					$.ajax({
						type: "POST",
						url: ".",
						dataType: "json",
						data: {
							delete_project: true,
							project_id: id,
							show_project_name_word: projectNameWord,
							start_date: start.format("YYYY-MM-DD"),
							end_date: end.format("YYYY-MM-DD"),
							fit_pj_top: fitPjTop
						},
						success: function(result){
							// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
							if("session_error" in result){
								location.href = "../login/";
							}
							// 蜑企勁螟ｱ謨�
							else if("delete_failure_message" in result){
								$errorMsgArea.addClass("alert alert-danger");
								$errorMsgArea.text(result["delete_failure_message"]);
							}
							// 蜑企勁謌仙粥
							else{
								// 荳隕ｧ譖ｴ譁ｰ
								pjItems = result["pj_items"];
								refresh(false);
								// 髢峨§繧�
								common.dialog.alert("", function(){
									$dialog.modal('hide');
									def.resolve();
								});
							}
						}
					});
				});
			});

			/**
			 * 髮帛ｽ｢霑ｽ蜉�螳溯｡後ｒ遒ｺ隱阪☆繧�
			 */
			var addWorkTemplateConfirm = function(e){
				var baseDate = $dialog.find("input[name='base_date']").val();
				if(moment(baseDate, "YYYY/MM/DD", true).isValid()){
					// 遒ｺ隱榊ｿ��医°縲∝ｷ･遞九′1莉ｶ莉･荳翫≠繧句�ｴ蜷医∫｢ｺ隱阪Γ繝�そ繝ｼ繧ｸ
					if(e.data.needConfirm || $dialog.find("table.work-table tbody tr").size() > 0){
						common.dialog.confirm("", addWorkTemplate);
					}else{
						addWorkTemplate();
					}
				}else{
					common.dialog.error("");
					return;
				}
			};

			/**
			 * 髮帛ｽ｢繧定ｿｽ蜉�縺吶ｋ
			 */
			var addWorkTemplate = function(){
				var baseDate = $dialog.find("input[name='base_date']").val();
				$dialog.find(".work-table tbody tr").remove();

				var incomeTemplate = new Array();
				var isSuccess = false;
				$.ajax({
					type: "POST",
					url: ".",
					async: false,
					dataType: "json",
					data: {
						get_income_template: true,
						except_null: true
					},
					success: function(result){
						// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
						if("session_error" in result){
							location.href = "../login/";
						}
						// 髮帛ｽ｢驥鷹｡崎ｿｽ蜉�螟ｱ謨�
						else if("failure_message" in result){
							$errorMsgArea.addClass("alert alert-danger");
							$errorMsgArea.text(result["failure_message"]);
						}else{
							incomeTemplate = result;
							isSuccess = true;
						}
					}
				});

				if(isSuccess == false){
					return;
				}

				// 髮帛ｽ｢蟾･遞玖ｿｽ蜉�
				$.ajax({
					type: "POST",
					url: ".",
					dataType: "json",
					data: {
						get_work_template: true,
						base_date: baseDate
					},
					success: function(result){
						// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
						if("session_error" in result){
							location.href = "../login/";
						}
						// 髮帛ｽ｢蟾･遞玖ｿｽ蜉�螟ｱ謨�
						else if("failure_message" in result){
							$errorMsgArea.addClass("alert alert-danger");
							$errorMsgArea.text(result["failure_message"]);
						}else{
							var type = 1;
							_.each(workTypeNames, function(workTypeName){
								var $pjTable = $dialog.find(".pj-" + workTypeName + "-table tbody");
								var $pjMoneyTr = $dialog.find(".pj-money-table tbody tr");

								var workNo = 1;
								_.each(result, function(workTemp){
									// 迴ｾ蝨ｨ縺ｮ蟾･遞狗ｨｮ鬘槭↓隧ｲ蠖�
									if(workTemp["type"] == type){
										var text = "";
										text += '<tr>';
										text += '<td class="checkbox-column"><input type="checkbox"></td>';
										text += '<td class="no-column">' + workNo +  '</td>';
										text += '<td><input type="text" class="form-control" name="' + workTypeName + '_name[]" value="' + workTemp["name"] + '"></td>';
										text += '<td><input type="text" class="date form-control start-date" name="' + workTypeName + '_start_date[]" value="' + workTemp["start_date"].replace(/-/g, "/") + '"></td>';
										text += '<td><input type="text" class="date form-control end-date" name="' + workTypeName + '_end_date[]" value="' + workTemp["end_date"].replace(/-/g, "/") + '"></td>';
										text += '<td><input type="text" class="form-control" name="' + workTypeName + '_start_text[]" value="' + workTemp["start_text"] + '"></td>';
										text += '<td><input type="text" class="form-control" name="' + workTypeName + '_main_text[]" value="' + workTemp["main_text"] + '"></td>';
										text += '<td><input type="text" class="form-control" name="' + workTypeName + '_end_text[]" value="' + workTemp["end_text"] + '"></td>';
										text += '<td><input class="color-preview" type="text" name="' + workTypeName + '_color[]" value="' + workTemp["color"] + '" /></td>';
										// 繝｡繧､繝ｳ蟾･遞九〒譯井ｻｶ陦ｨ遉ｺ鬆�ｯｾ雎｡縺ｮ蝣ｴ蜷医√メ繧ｧ繝�け
										if(type == 1){
											if(workTemp["order_target"] == 1){
												text += '<td><input type="radio" class="order_target_radio" name="' + workTypeName + '_order_target[]" value="1" checked="checked" /></td>';
											}else{
												text += '<td><input type="radio" class="order_target_radio" name="' + workTypeName + '_order_target[]" value="1" /></td>';
											}
										}
										text += '</tr>';
										$pjTable.append(text);

										// 蜈･驥台ｺ亥ｮ壽律險ｭ螳�
										_.each(incomeTemplate, function(incomeTemp){
											// 蟾･遞句錐繝ｻ遞ｮ鬘樔ｸ閾ｴ
											if(workTemp["name"] === incomeTemp["work_name"] && workTemp["type"] === incomeTemp["work_type"]){
												$pjMoneyTr.each(function(index, pjMoneyElement){
													var incomeName = $(pjMoneyElement).find("input[name='income_name[]']").val();
													if(incomeTemp["name"] === incomeName){
														var incomeDate = $(pjMoneyElement).find("input[name='income_date[]']");
														if(incomeDate.val() === "" || incomeDate.hasClass("pay_day_link")){
															incomeDate.val(workTemp["start_date"].replace(/-/g, "/"));
														}
													}
												});
											}
										});

										workNo++;
									}
								});
								type++;
							});

							// 繝斐ャ繧ｫ繝ｼ險ｭ螳�
							var $date = $dialog.find(".work-table tbody input[type='date'], .work-table tbody input.date");
							$date.datepicker();
							$date.prop("type", "text");
							$dialog.find(".work-table tbody .color-preview").spectrum();

							// 蜈･驥台ｺ亥ｮ壽律騾｣蜍輔け繝ｩ繧ｹ險ｭ螳�
							setDayLinkClass($dialog);
						}
					}
				});
			};

			// 髮帛ｽ｢霑ｽ蜉�繝懊ち繝ｳ
			$dialog.find(".add-work-temp-button").click({needConfirm: true}, addWorkTemplateConfirm);
			// 髢句ｧ区律螟画峩
			$dialog.find("input[name='base_date']").change({needConfirm: false}, addWorkTemplateConfirm);
		}

		// 蛻晄悄蛹�
		$dialog.find("input[type='hidden'], input[type='number'], input[type='date'],  :text, select").val("").end().find(":checked").prop("checked", false);
		$dialog.find("tbody tr").remove();
		$("a[href='#tab1']").click();
		// elFinder陦ｨ遉ｺ譎ゅ�譫�繝ｪ繧ｵ繧､繧ｺ
		$('a[data-toggle="tab"][href="#tab6"]').on('shown.bs.tab', function (e) {
			$dialog.find("#elfinder").trigger('resize');
		});

		// 繝｡繝�そ繝ｼ繧ｸ
		$errorMsgArea = $dialog.find(".modal-error-msg-area");
		$errorMsgArea.removeClass("alert alert-danger");
		$errorMsgArea.text("");

		var editPjId = (arguments.length > 0) ? projectId : 0;

		// 豈主屓繝輔か繝ｫ繝繧定ｨｭ螳壹☆繧九◆繧∝�譛溷喧
		$("#elfinder").replaceWith('<div id="elfinder"></div>');
		// 譁ｰ隕乗凾
		if(editPjId == 0){
			// 蜑企勁繝懊ち繝ｳ髱櫁｡ｨ遉ｺ
			$dialog.find(".pj-delete-button").hide();

			// 驥鷹｡榊�譛溷､
			var defIncome =[
			          /*{no: 1, name: "逕ｳ霎ｼ驥�" , money: 0},
			          {no: 2, name: "螂醍ｴ�≡" , money: 0},
			          {no: 3, name: "逹蟾･驥�" , money: 0},
			          {no: 4, name: "荳頑｣滄≡" , money: 0},
			          {no: 5, name: "縺雁ｼ墓ｸ｡縺�" , money: 0},
			          {no: 6, name: "霑ｽ蜉�蠅玲ｸ�" , money: 0}*/
			];

			// 髮帛ｽ｢驥鷹｡崎ｨｭ螳�
			$.ajax({
				type: "POST",
				url: ".",
				async: false,
				dataType: "json",
				data: {
					get_income_template: true
				},
				success: function(result){
					// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
					if("session_error" in result){
						location.href = "../login/";
					}
					// 髮帛ｽ｢驥鷹｡崎ｿｽ蜉�螟ｱ謨�
					else if("failure_message" in result){
						$errorMsgArea.addClass("alert alert-danger");
						$errorMsgArea.text(result["failure_message"]);
					}else{
						var incomeNo = 1;
						_.each(result, function(incomeTemp){
							defIncome.push({
								no: incomeNo,
								name: incomeTemp["name"],
								money: 0
							});
							incomeNo++;
						});

						var incomeRow = '';
						_.each(defIncome, function(val){
							incomeRow +=
							'<tr>\
								<td class="checkbox-column"><input type="checkbox"></td>\
								<td class="no-column">' + val.no + '</td>\
								<td><input type="text" class="form-control" name="income_name[]" value="' + val.name + '"></td>\
								<td><input type="date" class="form-control" name="income_date[]" value=""></td>\
								<td><input type="text" class="form-control input_number" name="income_money[]" value="' + common.formatNumber(val.money) + '"></td>\
							</tr>';
						});
						var $row = $(incomeRow);
						$dialog.find(".pj-money-table tbody").append($row);
						$row.find(".input_number").eq(0).trigger("blur");

						var $date = $dialog.find(".pj-money-table tbody input[type='date']");
						$date.datepicker();
						$date.prop("type", "text");
					}
				}
			});

			$dialog.find("#pj_color").val("yellow");
			$dialog.find("#sales_staff_color, #designer_color, #constructor_color, #trader_color").val("white");
			$dialog.find("#no_first_color").val("black");
			// $dialog.find("input.color-preview").spectrum();

			// 繧ｻ繝�す繝ｧ繝ｳ縺ｫ繝｢繝ｼ繝峨ｒ菫晄戟
			$.ajax({
				type: "POST",
				url: ".",
				dataType: "json",
				data: {
					set_mode_in_session: true,
					pj_id: 0
				},
				success: function(result){
					// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
					if("session_error" in result){
						location.href = "../login/";
					}

					$dialog.find('#elfinder').elfinder({
						url : '../lib/Vendor/elFinder/connector.php',  // connector URL (REQUIRED)
						lang: 'jp'                    // language (OPTIONAL)
					});
				}
			});
		}
		// 邱ｨ髮�凾
		else{
			// 蜑企勁繝懊ち繝ｳ陦ｨ遉ｺ
			$dialog.find(".pj-delete-button").show();

			var pjExists = false;
			var editPj;
			for (var i = 0; i < pjItems.length; i++) {
				if(pjItems[i].id == editPjId){
					pjExists = true;
					editPj = pjItems[i];
					break;
				}
			}
			if(pjExists){
				$dialog.find("input[name='pj_id']").val(editPj.id);
				$dialog.find("input[name='pj_no']").val(editPj.no);
				$dialog.find("input[name='pj_name']").val(editPj.pjName);
				$dialog.find("input[name='pj_color']").val(editPj.pjColor);
				$dialog.find("input[name='pj_name_sub']").val(editPj.pjNameSub);
				$dialog.find("input[name='pj_name_sub2']").val(editPj.pjNameSub2);
				$dialog.find("input[name='sales_staff']").val(editPj.salesStaff);
				$dialog.find("input[name='sales_staff_color']").val(editPj.salesStaffColor);
				$dialog.find("input[name='designer']").val(editPj.designer);
				$dialog.find("input[name='designer_color']").val(editPj.designerColor);
				$dialog.find("input[name='constructor']").val(editPj.constructor);
				$dialog.find("input[name='constructor_color']").val(editPj.constructorColor);
				$dialog.find("input[name='trader']").val(editPj.trader);
				$dialog.find("input[name='trader_color']").val(editPj.traderColor);
				$dialog.find("input[name='contract']").val(common.formatNumber(editPj.contract));
				$dialog.find("input[name='base_date']").val(editPj.date.replace(/-/g, "/"));
				$dialog.find("input[name='memo']").val(editPj.memo);
				if(editPj.no_first == 1){
					$dialog.find("input[name='nensyo']").prop("checked",true);
				}
				$dialog.find("input[name='no_first_color']").val(editPj.noFirstColor);

				// 驥鷹｡�
				var $pjMoneyTable = $dialog.find(".pj-money-table tbody");
				for(var i = 0; i < editPj.income.length; i++){
					var text = "";
					text += '<tr>';
					text += '<td class="checkbox-column"><input type="checkbox"></td>';
					text += '<td class="no-column">' + (i + 1) +  '</td>';
					text += '<td><input type="text" class="form-control" name="income_name[]" value="' + editPj.income[i].name + '"></td>';
					text += '<td><input type="text" class="date form-control" name="income_date[]" value="' + editPj.income[i].date.replace(/-/g, "/") + '"></td>';
					text += '<td><input type="text" class="form-control input_number" name="income_money[]" value="' + common.formatNumber(editPj.income[i].money) + '"></td>';
					text += '</tr>';
					$pjMoneyTable.append(text);
				}
				// 蜷郁ｨ亥�險育ｮ�
				var $moneyInputNumbers = $pjMoneyTable.find(".input_number");
				if($moneyInputNumbers.size() > 0){
					$moneyInputNumbers.eq(0).trigger("blur");
				}

				// 蟾･遞�
				_.each(workTypeNames, function(workTypeName){
					var $pjTable = $dialog.find(".pj-" + workTypeName + "-table tbody");
					for(var i = 0; i < editPj[workTypeName + "line"].length; i++){
						var text = "";
						text += '<tr>';
						text += '<td class="checkbox-column"><input type="checkbox"></td>';
						text += '<td class="no-column">' + (i + 1) +  '</td>';
						text += '<td><input type="text" class="form-control" name="' + workTypeName + '_name[]" value="' + editPj[workTypeName + "line"][i].name + '"></td>';
						text += '<td><input type="text" class="date form-control start-date" name="' + workTypeName + '_start_date[]" value="' + editPj[workTypeName + "line"][i].startDate.replace(/-/g, "/") + '"></td>';
						text += '<td><input type="text" class="date form-control end-date" name="' + workTypeName + '_end_date[]" value="' + editPj[workTypeName + "line"][i].endDate.replace(/-/g, "/") + '"></td>';
						text += '<td><input type="text" class="form-control" name="' + workTypeName + '_start_text[]" value="' + editPj[workTypeName + "line"][i].startText + '"></td>';
						text += '<td><input type="text" class="form-control" name="' + workTypeName + '_main_text[]" value="' + editPj[workTypeName + "line"][i].mainText + '"></td>';
						text += '<td><input type="text" class="form-control" name="' + workTypeName + '_end_text[]" value="' + editPj[workTypeName + "line"][i].endText + '"></td>';
						text += '<td><input class="color-preview" type="text" name="' + workTypeName + '_color[]" value="' + editPj[workTypeName + "line"][i].color + '" /></td>';
						if(workTypeName == "main"){
							if(editPj[workTypeName + "line"][i].orderTarget == 1){
								text += '<td><input type="radio" class="order_target_radio" name="' + workTypeName + '_order_target[]" value="1" checked="checked" /></td>';
							}else{
								text += '<td><input type="radio" class="order_target_radio" name="' + workTypeName + '_order_target[]" value="1" /></td>';
							}
						}
						text += '</tr>';
						$pjTable.append(text);
					}
				});

				// 繝斐ャ繧ｫ繝ｼ險ｭ螳�
				var $date = $dialog.find("tbody input[type='date'], tbody input.date");
				$date.datepicker();
				$date.prop("type", "text");
				$dialog.find(".color-preview").spectrum();

				// 蜈･驥台ｺ亥ｮ壽律騾｣蜍輔け繝ｩ繧ｹ險ｭ螳�(input[type='date']縺ｧ譌･莉倥�蛹ｺ蛻�ｊ縺後せ繝ｩ繝�す繝･縺�縺ｨ譌･莉倥�蛟､縺悟叙蠕励〒縺阪↑縺�?縺溘ａ縲√ヴ繝�き繝ｼ險ｭ螳壼ｾ後↓螳溯｡�)
				setDayLinkClass($dialog);

				// 繝輔ぃ繧､繝ｫ繝輔か繝ｫ繝謖�ｮ�
				$.ajax({
					type: "POST",
					url: ".",
					dataType: "json",
					data: {
						set_mode_in_session: true,
						pj_id: editPj.id
					},
					success: function(result){
						// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
						if("session_error" in result){
							location.href = "../login/";
						}

						$dialog.find('#elfinder').elfinder({
							url : '../lib/Vendor/elFinder/connector.php',  // connector URL (REQUIRED)
							lang: 'jp'                    // language (OPTIONAL)
						});
					}
				});
			}
		}

		$dialog.unbind("hide.bs.modal").one("hide.bs.modal", function(){
			def.resolve();
		});
		common.dialog._show($dialog);

		return def;
	};

	/**
	 * 蜈･驥台ｺ亥ｮ壽律騾｣蜍輔け繝ｩ繧ｹ(譁�ｭ苓牡)險ｭ螳�
	 */
	var setDayLinkClass = function($dialog){
		$.ajax({
			type: "POST",
			url: ".",
			async: false,
			dataType: "json",
			data: {
				get_income_template: true,
				except_null: true
			},
			success: function(result){
				// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
				if("session_error" in result){
					location.href = "../login/";
				}
				// 髮帛ｽ｢驥鷹｡崎ｿｽ蜉�螟ｱ謨�
				else if("failure_message" in result){
					$errorMsgArea.addClass("alert alert-danger");
					$errorMsgArea.text(result["failure_message"]);
				}else{
					// 繝ｪ繧ｻ繝�ヨ
					$dialog.find("input.pay_day_link").removeClass("pay_day_link");

					var $pjMoneyTr = $dialog.find(".pj-money-table tbody tr");
					var $pjMainTr = $dialog.find(".pj-main-table tbody tr");
					var $pjSub1Tr = $dialog.find(".pj-sub1-table tbody tr");
					var $pjSub2Tr = $dialog.find(".pj-sub2-table tbody tr");

					// 驥鷹｡�
					$pjMoneyTr.each(function(index, pjMoneyElement){
						var incomeDate = $(pjMoneyElement).find("input[name='income_date[]']");

						// 髮帛ｽ｢驥鷹｡�
						_.each(result, function(incomeTemp){
							var incomeName = $(pjMoneyElement).find("input[name='income_name[]']").val();
							// 驥鷹｡阪′蜷悟錐
							if(incomeName == incomeTemp.name){
								// 繝｡繧､繝ｳ蟾･遞�
								if(incomeTemp.work_type == 1){
									$pjMainTr.each(function(index, pjMainElement){
										var mainName = $(pjMainElement).find("input[name='main_name[]']").val();
										// 蟾･遞九′蜷悟錐
										if(mainName == incomeTemp.work_name){
											var $mainStartDate = $(pjMainElement).find("input[name='main_start_date[]']");
											// 譌･莉倥′荳閾ｴ
											if(incomeDate.val() == $mainStartDate.val()){
												incomeDate.addClass("pay_day_link");
												$mainStartDate.addClass("pay_day_link");
											}
										}
									});
								}
								// 荳企Κ蟾･遞�
								else if(incomeTemp.work_type == 2){
									$pjSub1Tr.each(function(index, pjSub1Element){
										var sub1Name = $(pjSub1Element).find("input[name='sub1_name[]']").val();
										// 蟾･遞九′蜷悟錐
										if(sub1Name == incomeTemp.work_name){
											var $sub1StartDate = $(pjSub1Element).find("input[name='sub1_start_date[]']");
											// 譌･莉倥′荳閾ｴ
											if(incomeDate.val() == $sub1StartDate.val()){
												incomeDate.addClass("pay_day_link");
												$sub1StartDate.addClass("pay_day_link");
											}
										}
									});
								}
								// 荳矩Κ蟾･遞�
								else if(incomeTemp.work_type == 3){
									$pjSub2Tr.each(function(index, pjSub2Element){
										var sub2Name = $(pjSub2Element).find("input[name='sub2_name[]']").val();
										// 蟾･遞九′蜷悟錐
										if(sub2Name == incomeTemp.work_name){
											var $sub2StartDate = $(pjSub2Element).find("input[name='sub2_start_date[]']");
											// 譌･莉倥′荳閾ｴ
											if(incomeDate.val() == $sub2StartDate.val()){
												incomeDate.addClass("pay_day_link");
												$sub2StartDate.addClass("pay_day_link");
											}
										}
									});
								}
							}
						});
					});
				}
			}
		});
	}

	// 髢句ｧ区律螟画峩譎ゅ�蜈･驥台ｺ亥ｮ壽律騾｣蜍�
	var linkIncomeDate = function($dialog){
		$.ajax({
			type: "POST",
			url: ".",
			async: false,
			dataType: "json",
			data: {
				get_income_template: true,
				except_null: true
			},
			success: function(result){
				// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
				if("session_error" in result){
					location.href = "../login/";
				}
				// 髮帛ｽ｢驥鷹｡崎ｿｽ蜉�螟ｱ謨�
				else if("failure_message" in result){
					$errorMsgArea.addClass("alert alert-danger");
					$errorMsgArea.text(result["failure_message"]);
				}else{
					var $pjMoneyTr = $dialog.find(".pj-money-table tbody tr");
					var $pjMainTr = $dialog.find(".pj-main-table tbody tr");
					var $pjSub1Tr = $dialog.find(".pj-sub1-table tbody tr");
					var $pjSub2Tr = $dialog.find(".pj-sub2-table tbody tr");
					// 驥鷹｡�
					$pjMoneyTr.each(function(index, pjMoneyElement){
						var incomeDate = $(pjMoneyElement).find("input[name='income_date[]'].pay_day_link");
						// 騾｣蜍慕憾諷九〒縺ｪ縺��ｴ蜷医せ繧ｭ繝��
						if(incomeDate.size() == 0) return true;

						// 髮帛ｽ｢驥鷹｡�
						_.each(result, function(incomeTemp){
							var incomeName = $(pjMoneyElement).find("input[name='income_name[]']").val();
							// 驥鷹｡阪′蜷悟錐
							if(incomeName == incomeTemp.name){
								// 繝｡繧､繝ｳ蟾･遞�
								if(incomeTemp.work_type == 1){
									$pjMainTr.each(function(index, pjMainElement){
										var mainName = $(pjMainElement).find("input[name='main_name[]']").val();
										var $mainDate = $(pjMainElement).find("input[name='main_start_date[]']");
										// 騾｣蜍慕憾諷九�螟画峩縺励◆蟾･遞�
										if(mainName == incomeTemp.work_name && $mainDate.hasClass("pay_day_link") && $mainDate.hasClass("change_now")){
											incomeDate.val($mainDate.val());
										}
									});
								}
								// 荳企Κ蟾･遞�
								else if(incomeTemp.work_type == 2){
									$pjSub1Tr.each(function(index, pjSub1Element){
										var sub1Name = $(pjSub1Element).find("input[name='sub1_name[]']").val();
										var $sub1Date = $(pjSub1Element).find("input[name='sub1_start_date[]']");
										// 騾｣蜍慕憾諷九�螟画峩縺励◆蟾･遞�
										if(sub1Name == incomeTemp.work_name && $sub1Date.hasClass("pay_day_link") && $sub1Date.hasClass("change_now")){
											incomeDate.val($sub1Date.val());
										}
									});
								}
								// 荳矩Κ蟾･遞�
								else if(incomeTemp.work_type == 3){
									$pjSub2Tr.each(function(index, pjSub2Element){
										var sub2Name = $(pjSub2Element).find("input[name='sub2_name[]']").val();
										var $sub2Date = $(pjSub2Element).find("input[name='sub2_start_date[]']");
										// 騾｣蜍慕憾諷九�螟画峩縺励◆蟾･遞�
										if(sub2Name == incomeTemp.work_name && $sub2Date.hasClass("pay_day_link") && $sub2Date.hasClass("change_now")){
											incomeDate.val($sub2Date.val());
										}
									});
								}
							}
						});
					});
				}

				// 螟画峩class蜑企勁
				$dialog.find(".start-date").removeClass("change_now");
			}
		});
	}

	/**
	 * 鬆�岼邱ｨ髮�ム繧､繧｢繝ｭ繧ｰ
	 */
	common.dialog.workEditModal = function($targetWork){
		var def = new jQuery.Deferred();

		// 蟾･遞矩��岼繝��繧ｿ蜿門ｾ�
		var workPjId = $targetWork.find("input[name='work_pj_id']").val();
		var workId = $targetWork.find("input[name='work_id']").val();
		var workType = $targetWork.find("input[name='work_type']").val();
		var pjExists = false;
		var editPj;
		for (var i = 0; i < pjItems.length; i++) {
			if(pjItems[i].id == workPjId){
				pjExists = true;
				editPj = pjItems[i];
				break;
			}
		}
		var editWork;
		var editWorkIndex = 0;
		var workExists = false;
		if(pjExists){
			if(workType == 1){
				_.each(editPj.mainline, function(val, i){
					if(val.id == workId){
						workExists = true;
						editWork = val;
						editWorkIndex = i;
						return false;
					}
				});
			}else if(workType == 2){
				_.each(editPj.sub1line, function(val, i){
					if(val.id == workId){
						workExists = true;
						editWork = val;
						editWorkIndex = i;
						return false;
					}
				});
			}else if(workType == 3){
				_.each(editPj.sub2line, function(val, i){
					if(val.id == workId){
						workExists = true;
						editWork = val;
						editWorkIndex = i;
						return false;
					}
				});
			}
		}

		var $dialog = $("#work-edit-modal");
		if ($dialog.length == 0) {
			$dialog = $('\
				<div class="modal" id="work-edit-modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
								<div class="modal-title" data-msgname="dialog_confirm_title">蟾･遞矩��岼邱ｨ髮�</div>\
							</div>\
							<div class="modal-body">\
								<div class="modal-error-msg-area">\
								</div>\
								<form class="form-horizontal">\
									<div class="form-group">\
										<label for="work-name" class="control-label column col-sm-3">鬆�岼蜷�</label>\
										<div class="column col-sm-9">\
											<input type="text" class="form-control" id="work-name" name="work_name" value="" placeholder="鬆�岼蜷� (萓�: 騾�菴�)">\
										</div>\
									</div>\
									<div class="form-group">\
										<label for="start-date" class="control-label column col-sm-3 required">髢句ｧ区律</label>\
										<div class="column col-sm-9">\
											<input type="date" class="form-control" id="start-date" name="start_date" value="" placeholder="髢句ｧ区律 (萓�: 2015/01/01)">\
										</div>\
									</div>\
									<div class="form-group">\
										<label for="end-date" class="control-label column col-sm-3 required">邨ゆｺ�律</label>\
										<div class="column col-sm-9">\
											<input type="date" class="form-control" id="end-date" name="end_date" value="" placeholder="邨ゆｺ�律 (萓�: 2015/01/01)">\
										</div>\
									</div>\
									<div class="form-group">\
										<label for="start-text" class="control-label column col-sm-3">髢句ｧ倶ｽ咲ｽｮ繝�く繧ｹ繝�</label>\
										<div class="column col-sm-9">\
											<input type="text" class="form-control" id="start-text" name="start_text" value="" placeholder="髢句ｧ倶ｽ咲ｽｮ繝�く繧ｹ繝� (萓�: 騾�菴懶ｼｳ)">\
										</div>\
									</div>\
									<div class="form-group">\
										<label for="main-text" class="control-label column col-sm-3">荳ｭ螟ｮ菴咲ｽｮ繝�く繧ｹ繝�</label>\
										<div class="column col-sm-9">\
											<input type="text" class="form-control" id="main-text" name="main_text" value="" placeholder="荳ｭ螟ｮ菴咲ｽｮ繝�く繧ｹ繝� (萓�: 笳ｯ笳ｯ邨�)">\
										</div>\
									</div>\
									<div class="form-group">\
										<label for="end-text" class="control-label column col-sm-3">邨ゆｺ�ｽ咲ｽｮ繝�く繧ｹ繝�</label>\
										<div class="column col-sm-9">\
											<input type="text" class="form-control" id="end-text" name="end_text" value="" placeholder="邨ゆｺ�ｽ咲ｽｮ繝�く繧ｹ繝� (萓�: 騾�菴懶ｼｦ)">\
										</div>\
									</div>\
									\
									<div class="form-group">\
										<label for="bar-color" class="control-label column col-sm-3">濶ｲ</label>\
										<div class="column col-sm-9">\
											<input class="color-preview" type="text" name="color" />\
										</div>\
									</div>\
								</form>\
							</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary work-save-button">菫晏ｭ�</button>\
								<button type="button" class="btn btn-default" data-dismiss="modal">繧ｭ繝｣繝ｳ繧ｻ繝ｫ</button>\
							</div>\
						</div>\
					</div>\
				</div>\
			');
			$dialog.appendTo("body");

			// 繧ｨ繝ｩ繝ｼ繝｡繝�そ繝ｼ繧ｸ陦ｨ遉ｺ蝓�
			var $errorMsgArea = $dialog.find(".modal-error-msg-area");

			// 譌･莉倥ヴ繝�き繝ｼ險ｭ螳�
			var $baseDate = $dialog.find("input[type='date']");
			$baseDate.datepicker();
			$baseDate.prop("type", "text");
		}

		// 菫晏ｭ倥�繧ｿ繝ｳ
		$dialog.find(".work-save-button").unbind("click").click(function(){
			var id = workId;
			var name = $dialog.find("input[name='work_name']").val();
			var startDate = $dialog.find("input[name='start_date']").val();
			var endDate = $dialog.find("input[name='end_date']").val();
			var startText = $dialog.find("input[name='start_text']").val();
			var mainText = $dialog.find("input[name='main_text']").val();
			var endText = $dialog.find("input[name='end_text']").val();
			var color = $dialog.find("input[name='color']").spectrum("get").toHexString();

			var workItem = {
				id: id,
				name: name,
				nameBerore: editWork.name,
				startDate: startDate,
				startDateBerore: editWork.startDate,
				endDate: endDate,
				startText: startText,
				mainText: mainText,
				endText: endText,
				color: color
			}

			// 菫晏ｭ�
			$.ajax({
				type: "POST",
				url: ".",
				dataType: "json",
				data: {
					save_work: true,
					work_data: JSON.stringify(workItem),
					income_list: JSON.stringify(editPj.income),
					show_project_name_word: projectNameWord,
					start_date: start.format("YYYY-MM-DD"),
					end_date: end.format("YYYY-MM-DD"),
					fit_pj_top: fitPjTop
				},
				success: function(result){
					// 繧ｻ繝�す繝ｧ繝ｳ蛻�ｌ
					if("session_error" in result){
						location.href = "../login/";
					}
					// 菫晏ｭ伜､ｱ謨�
					else if("save_failure_message" in result){
						$errorMsgArea.addClass("alert alert-danger");
						$errorMsgArea.text(result["save_failure_message"]);
					}
					// 菫晏ｭ俶�蜉�
					else{
						// 荳隕ｧ譖ｴ譁ｰ
						pjItems = result["pj_items"];
						refresh(false);
						// 髢峨§繧�
						$dialog.modal('hide');
						def.resolve();
					}
				}
			});
		});

		// 蛟､險ｭ螳�
		if(workExists){
			$dialog.find("input[name='work_name']").val(editWork.name);
			$dialog.find("input[name='start_date']").val(editWork.startDate.replace(/-/g, "/"));
			$dialog.find("input[name='end_date']").val(editWork.endDate.replace(/-/g, "/"));
			$dialog.find("input[name='start_text']").val(editWork.startText);
			$dialog.find("input[name='main_text']").val(editWork.mainText);
			$dialog.find("input[name='end_text']").val(editWork.endText);
			$dialog.find("input[name='color']").val(editWork.color);
		}

		// 繧ｨ繝ｩ繝ｼ繝｡繝�そ繝ｼ繧ｸ蜑企勁
		$errorMsgArea = $dialog.find(".modal-error-msg-area");
		$errorMsgArea.removeClass("alert alert-danger");
		$errorMsgArea.text("");
		// 繧ｫ繝ｩ繝ｼ繝斐ャ繧ｫ繝ｼ險ｭ螳�
		$dialog.find(".color-preview").spectrum();

		$dialog.unbind("hide.bs.modal").one("hide.bs.modal", function(){
			def.resolve();
		});

		common.dialog._show($dialog);

		return def;
	};
})();
