<div class="modal @if ($errors->any())modal_open @endif" id="pj-edit-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close dislog_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div class="modal-title" data-msgname="dialog_confirm_title">案件編集</div>
      </div>
      <div class="modal-body">
        @if ($errors->any())
          <div class="modal-error-msg-area alert alert-danger">
          @foreach ($errors->all() as $error)
          {{ $error }}
          @endforeach
          </div>
        @endif
        <ul class="nav nav-tabs">
          <li class="active"><a href="#tab1" data-toggle="tab">基本情報</a></li>
          {{--<<li><a href="#tab2" data-toggle="tab">金額</a></li>--}}
          <li><a href="#tab3" data-toggle="tab">メイン工程</a></li>
          {{--<<li><a href="#tab4" data-toggle="tab">上部工程</a></li>--}}
          {{--<<li><a href="#tab5" data-toggle="tab">下部工程</a></li>--}}
          {{--<<li><a href="#tab6" data-toggle="tab">ファイル管理</a></li>--}}
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="tab1">
          <form action="{{route('matter')}}" method="post" class="form-horizontal">
          @csrf
            <div class="form-group">
              <label for="pj-name" class="control-label column col-sm-3 required">邸名</label>
              <div class="column col-sm-9">
                <div class="input-group tei-group">
                  <input type="text" class="form-control" id="pj-name" name="name" value="{{ old('name') }}" placeholder="邸名 (例: コスモホーム邸)">
                  <label class="control-label input-group-addon preview_picker">
                    <input class="color-preview" type="text" id="pj_color" name="pj_color" />
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="pj-name-sub" class="control-label column col-sm-3">補足情報</label>
              <div class="column col-sm-9">
                <input type="text" class="form-control" id="pj-name-sub" name="sub" value="{{ old('sub') }}" placeholder="建築場所 (例: ◯◯市　2階建)">
              </div>
            </div>
            <div class="form-group">
              <label for="pj-name-sub2" class="control-label column col-sm-3">補足情報2</label>
              <div class="column col-sm-9">
                <input type="text" class="form-control" id="pj-name-sub2" name="sub2" value="{{ old('sub2') }}" placeholder="補足情報2">
              </div>
            </div>
            <div class="form-group">
              <label for="sales-staff" class="control-label column col-sm-3">担当</label>
              <div class="column col-sm-9 col_staff">
                <div class="input-group">
                  <label for="sales-staff" class="control-label input-group-addon">営業</label>
                  <input type="text" class="form-control" id="sales-staff" name="sales" value="{{ old('sales') }}" placeholder="営業 (例: 山田)">
                  <label class="control-label input-group-addon preview_picker">
                    <input class="color-preview" type="text" id="sales_staff_color" name="sales_staff_color" />
                  </label>
                </div>
                <div class="input-group">
                  <label for="designer" class="control-label input-group-addon">設計</label>
                  <input type="text" class="form-control" id="designer" name="designer" value="{{ old('designer') }}" placeholder="設計 (例: 山田)">
                  <label class="control-label input-group-addon preview_picker">
                    <input class="color-preview" type="text" id="designer_color" name="designer_color" />
                  </label>
                </div>
                <div class="input-group">
                  <label for="constructor" class="control-label input-group-addon">工事</label>
                  <input type="text" class="form-control" id="constructor" name="constructor" value="{{ old('constructor') }}" placeholder="工事 (例: 山田)">
                  <label class="control-label input-group-addon preview_picker">
                    <input class="color-preview" type="text" id="constructor_color" name="constructor_color" />
                  </label>
                </div>
                <div class="input-group">
                  <label for="trader" class="control-label input-group-addon">業者</label>
                  <input type="text" class="form-control" id="trader" name="trader" value="{{ old('trader') }}" placeholder="業者 (例: 山田)">
                  <label class="control-label input-group-addon preview_picker">
                    <input class="color-preview" type="text" id="trader_color" name="trader_color" />
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="contract" class="control-label column col-sm-3">契約金額</label>
              <div class="column col-sm-9">
                <input type="text" class="form-control input_number" name="contract" value="{{ old('contract') }}" placeholder="契約金額 (例: 32500000)">
              </div>
            </div>
            <div class="form-group">
              <label for="base-date" class="control-label column col-sm-3">開始日</label>
              <div class="column col-sm-9">
                <input type="date" class="form-control dialog_column" id="base-date" name="date" value="{{ old('date') }}" placeholder="開始日 (例: 2015/01/01)">
              </div>
            </div>
            <div class="form-group">
              <label for="memo" class="control-label column col-sm-3">メモ</label>
              <div class="column col-sm-9">
                <input type="text" class="form-control" id="memo" name="memo" value="{{ old('memo') }}" placeholder="メモ">
              </div>
            </div>
            {{--<div class="form-group" id="nensyo-form-group">
              <label for="nensyo" class="control-label column col-sm-3">番号先頭</label>
              <div class="column col-sm-9">
                <div class="checkbox">
                  <label class="nensyo-label">
                    <input type="checkbox" id="nensyo" name="nensyo" value="1">
                    この案件を1番として、以降の案件番号を連番で設定する。
                    <label id="no_first_color_area" class="control-label input-group-addon preview_picker">
                      <input class="color-preview" type="text" id="no_first_color" name="no_first_color" />
                    </label>
                  </label>
                </div>
              </div>
            </div>
            <input type="hidden" id="pj_id" name="pj_id" value="">
            <input type="hidden" id="pj_no" name="pj_no" value="">--}}

          </div>
          <!-- 驥鷹｡� -->
          <div class="tab-pane" id="tab2">
            <div class="panel panel-default">
                <div class="panel-heading">
                <button type="button" class="btn btn-primary add-money-row-button">陦後ｒ霑ｽ蜉�</button>
                <button type="button" class="btn btn-primary del-money-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>
                </div>
                <div class="panel-body dialog_panel-body">
                  <table class="table table-bordered input-table pj-money-table">
                    <thead>
                      <tr>
                        <th class="checkbox-column"><input type="checkbox" class="all-select"></th>
                        <th class="no-column">No.</th>
                        <th>蜈･驥大錐</th>
                        <th>蜈･驥台ｺ亥ｮ壽律</th>
                        <th>驥鷹｡�</th>
                      </tr>
                    </thead>
                  <tfoot class="total-income">
                    <tr>
                      <td colspan="3"></td>
                      <td class="total-income-title">蜷郁ｨ�</td>
                      <td class="total-income-text"></td>
                    </tr>
                  </tfoot>
                    <tbody>
                    </tbody>
                  </table>
                  <p>陦後�蜿鈴�倅ｺ亥ｮ壽律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>
                </div>
            </div>

          </div>

          <!-- 繝｡繧､繝ｳ蟾･遞� -->
          <div class="tab-pane clearfix" id="tab3">
            <div class="panel panel-default">
                <div class="panel-heading">
                <button type="button" class="btn btn-primary add-work-temp-button" title="髮帛ｽ｢(繧医￥縺ゅｋ蟾･遞九�繧ｻ繝�ヨ)繧定ｿｽ蜉�縺励∪縺吶�">雛形を追加</button>
                <button type="button" class="btn btn-primary add-main-row-button">行を追加</button>
                <button type="button" class="btn btn-primary del-main-row-button">選択した行を削除</button>
                </div>
                <div class="panel-body dialog_panel-body">
                  <table class="table table-bordered input-table pj-main-table work-table">
                    <thead>
                      <tr>
                        <th class="checkbox-column"><input type="checkbox" class="all-select"></th>
                        <th class="no-column">No.</th>
                        <th>項目名</th>
                        <th>開始日</th>
                        <th>終了日</th>
                        <th>開始テキスト</th>
                        <th>中央テキスト</th>
                        <th>終了テキスト</th>
                        <th>色</th>
                      <th>案件表示順対応</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td class="checkbox-column"><input type="checkbox"></td>
                      <td class="no-column">1</td><td><input type="text" class="form-control" name="main_name[]" value="設計申込み"></td>
                      <td><input type="date" class="date form-control start-date" name="main_start_date[]" value="2020/12/15"></td>
                      <td><input type="date" class="date form-control end-date" name="main_end_date[]" value="2020/12/15"></td>
                      <td><input type="text" class="form-control" name="main_start_text[]" value=""></td>
                      <td><input type="text" class="form-control" name="main_main_text[]" value="設計申込み"></td>
                      <td><input type="text" class="form-control" name="main_end_text[]" value=""></td>
                      <td>
                        <input type="color">
                        <div class="sp-dd">▼</div>
                        </div>
                      </td>
                      <td><input type="radio" class="order_target_radio" name="main_order_target[]" value="1"></td>
                    </tr>
                    </tbody>
                  </table>
                  <p>行は開始日の昇順で並び替えられます。</p>
                </div>
            </div>
          </div>

          <!-- 荳企Κ蟾･遞� -->
          <div class="tab-pane clearfix" id="tab4">
            <div class="panel panel-default">
                <div class="panel-heading">
                <button type="button" class="btn btn-primary add-sub1-row-button">陦後ｒ霑ｽ蜉�</button>
                <button type="button" class="btn btn-primary del-sub1-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>
                </div>
                <div class="panel-body dialog_panel-body">
                  <table class="table table-bordered input-table pj-sub1-table work-table">
                    <thead>
                      <tr>
                        <th class="checkbox-column"><input type="checkbox" class="all-select"></th>
                        <th class="no-column">No.</th>
                        <th>鬆�岼蜷�</th>
                        <th>髢句ｧ区律</th>
                        <th>邨ゆｺ�律</th>
                        <th>髢句ｧ九ユ繧ｭ繧ｹ繝�</th>
                        <th>荳ｭ螟ｮ繝�く繧ｹ繝�</th>
                        <th>邨ゆｺ�ユ繧ｭ繧ｹ繝�</th>
                        <th>濶ｲ</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                  <p>陦後�髢句ｧ区律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>
                </div>
            </div>
          </div>
          <!-- 荳矩Κ蟾･遞� -->
          <div class="tab-pane clearfix" id="tab5">
            <div class="panel panel-default">
                <div class="panel-heading">
                <button type="button" class="btn btn-primary add-sub2-row-button">陦後ｒ霑ｽ蜉�</button>
                <button type="button" class="btn btn-primary del-sub2-row-button">驕ｸ謚槭＠縺溯｡後ｒ蜑企勁</button>
                </div>
                <div class="panel-body dialog_panel-body">
                  <table class="table table-bordered input-table pj-sub2-table work-table">
                    <thead>
                      <tr>
                        <th class="checkbox-column"><input type="checkbox" class="all-select"></th>
                        <th class="no-column">No.</th>
                        <th>鬆�岼蜷�</th>
                        <th>髢句ｧ区律</th>
                        <th>邨ゆｺ�律</th>
                        <th>髢句ｧ九ユ繧ｭ繧ｹ繝�</th>
                        <th>荳ｭ螟ｮ繝�く繧ｹ繝�</th>
                        <th>邨ゆｺ�ユ繧ｭ繧ｹ繝�</th>
                        <th>濶ｲ</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                  <p>陦後�髢句ｧ区律縺ｮ譏���〒荳ｦ縺ｳ譖ｿ縺医ｉ繧後∪縺吶�</p>
                </div>
            </div>
          </div>
          <!-- 繝輔ぃ繧､繝ｫ邂｡逅� -->
          <div class="tab-pane clearfix" id="tab6">
            <p>窶ｻ繝輔ぃ繧､繝ｫ縺ｮ繧｢繝��繝ｭ繝ｼ繝峨ｄ蜑企勁縺ｯ繧ｭ繝｣繝ｳ繧ｻ繝ｫ繝懊ち繝ｳ繧呈款縺励※繧ょ叙繧頑ｶ医☆縺薙→縺後〒縺阪∪縺帙ｓ縺ｮ縺ｧ縺疲ｳｨ諢上￥縺�縺輔＞縲�</p>
            <div class="panel panel-default">
              <div id="elfinder"></div>
              <div class="elfinder_description_wrap">
                <h3 class="elfinder_description_title">繝懊ち繝ｳ萓�</h3>
                <ul class="elfinder_description">
                  <li><span class="elfinder-button-icon elfinder-button-icon-mkdir"></span> 譁ｰ隕上ヵ繧ｩ繝ｫ繝繧剃ｽ懈�縺励∪縺吶�</li>
                  <li><span class="elfinder-button-icon elfinder-button-icon-rm"></span> 繝輔ぃ繧､繝ｫ縺ｮ蜑企勁繧定｡後＞縺ｾ縺吶�</li>
                  <li><span class="elfinder-button-icon elfinder-button-icon-upload"></span> 繝輔ぃ繧､繝ｫ縺ｮ繧｢繝��繝ｭ繝ｼ繝峨ｒ陦後＞縺ｾ縺吶�</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary pj-save-button">保存</button>
        <button type="button" class="btn btn-default dislog_cancel" data-dismiss="modal">キャンセル</button>
      </div>
      </form>
    </div>
  </div>
</div>
