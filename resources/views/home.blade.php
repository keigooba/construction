@extends('layouts.app')

@section('content')
<!-- <div class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <span class="navbar-brand">マトリックスマネージャー</span>
    </div>

    <ul class="nav navbar-right">
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">
          <span class="glyphicon glyphicon-user"></span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu dropdown-user">
          <li><a href="../manual.pdf" target="_blank">マニュアル</a></li>
          <li><a href="../logout/">ログアウト</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div> -->
<div class="container-fluid">
  <div class="row">
    <div class="column col-sm-12">
      <div class="panel panel-default">
        <div id="main-control" class="panel-heading">
          <button class="btn btn-primary pj-new-button" title="新しい案件を追加します。" data-toggle="modal">案件作成</button>
          <button class="btn btn-primary print-pj-button" title="工程表を印刷します。">印刷</button>
          <button class="btn btn-primary menu-button pull-right">メニュー</button>
          <div class="form-inline date-range pull-right">
            <button class="btn btn-primary zoom-in-button">＋</button>
            <button class="btn btn-primary zoom-out-button">－</button>
            <span class="input-group">
              <span class="input-group-addon">案件</span>
              <input type="text" class="form-control project_name_word" name="project_name_word">
              <select class="form-control project" name="project"></select>
            </span>

            <span class="input-group">
              <span class="input-group-addon">入金表示</span>
              <select class="form-control show-income" name="show_income">
                <option value="1">する</option>
                <option value="0">しない</option>
              </select>
            </span>

            <form>
              <span class="input-group">
                <span class="input-group-addon">表示期間</span>
                <input type="date" class="form-control start-date" value="">
                <span class="input-group-addon date-range-wavedash">～</span>
                <input type="date" class="form-control end-date" value="">
                <label class="checkbox fit-pj-top"><input type="checkbox" class="form-control check-fit-pj-top" value="1" />表示を案件の先頭に合わせる</label>
              </span>
              <div class="menu_break"></div>
              <button type="submit" class="btn btn-primary date-range-change-button">更新</button>
            </form>
          </div>
        </div>
        <div class="panel-body">
          <div class="sch-table">
            <div class="sch-table-inner">
              <!-- ヘッダー部分 固定 -->
              <div class="sch-row-header">
                <div class="sch-column-header">
                  <div class="sch-row head">
                    <div class="sch-cell pj-no"></div>
                    <div class="sch-cell pj-name"></div>
                  </div>
                  <div class="sch-row head">
                    <div class="sch-cell pj-no">No</div>
                    <div class="sch-cell pj-name">邸名</div>
                  </div>
                  <div class="sch-row head">
                    <div class="sch-cell pj-no"></div>
                    <div class="sch-cell pj-name"></div>
                  </div>
                </div>
                <!-- No・邸名 -->
                <div class="sch-column-data"></div>
                <!-- ここに値が入っている -->
                {{--@foreach($houses as $house)--}}
                <div class="sch-row-group id-994">
                <div class="sch-row sub1">
                <div class="sch-cell pj-no"></div>
                <div class="sch-cell pj-name sub" style="background: #ffff00;">西淀川区花川</div>
                </div>
                <div class="sch-row main"><div class="sch-cell pj-no main has-inner"><div class="inner" style="color: #ff0000;">5</div></div>
                <div class="sch-cell pj-name main has-inner" style="background: #ffff00;"><div class="inner">福田 邸</div></div></div>
                <div class="sch-row sub2"><div tabindex="0" class="sch-cell pj-no pj-edit pj-edit-button">編集</div><input type="hidden" name="project_id[]" value="994">
                <div class="sch-cell pj-name date" style="background: #ffff00;">土地から/ZEH</div>
                </div>
                </div>
                {{--@endforeach--}}
                <div class="sch-column-footer">
                  <div class="sch-row head">
                    <div class="sch-cell pj-no"></div>
                    <div class="sch-cell pj-name"></div>
                  </div>
                </div>
              </div>
              <!-- 営業・設計・工事・業者・契約金額 -->
              <div class="sch-row-sub-header">
                <div class="sch-column-header">
                  <div class="sch-row head">
                    <div class="sch-cell sales-staff"></div>
                    <div class="sch-cell designer"></div>
                    <div class="sch-cell constructor"></div>
                    <div class="sch-cell trader"></div>
                    <div class="sch-cell contract"></div>
                  </div>
                  <div class="sch-row head">
                    <div class="sch-cell sales-staff staff_name_1">営業</div>
                    <div class="sch-cell designer staff_name_2">設計</div>
                    <div class="sch-cell constructor staff_name_3">工事</div>
                    <div class="sch-cell trader staff_name_4">業者</div>
                    <div class="sch-cell contract">契約金額</div>
                  </div>
                  <div class="sch-row head">
                    <div class="sch-cell sales-staff"></div>
                    <div class="sch-cell designer"></div>
                    <div class="sch-cell constructor"></div>
                    <div class="sch-cell trader"></div>
                    <div class="sch-cell contract"></div>
                  </div>
                </div>
                <div class="sch-column-data"></div>
                <!-- ここに値が入っている -->
                {{--@foreach($houses as $house)--}}
                <div class="sch-row-group id-994">
                  <div class="sch-row sub1">
                    <div class="sch-cell sales-staff" style="background: #fce5cd;"></div>
                    <div class="sch-cell designer" style="background: #d9d2e9;"></div>
                    <div class="sch-cell constructor" style="background: #d9ead3;"></div>
                    <div class="sch-cell trader" style="background: #b6d7a8;"></div>
                    <div class="sch-cell contract">￥34,386,000</div>
                  </div>

                  <div class="sch-row main">
                    <div class="sch-cell sales-staff has-inner" style="background: #fce5cd;">
                      <div class="inner">亮太</div>
                    </div>
                    <div class="sch-cell designer has-inner" style="background: #d9d2e9;">
                      <div class="inner">長田/長田</div>
                    </div>
                    <div class="sch-cell constructor has-inner" style="background: #d9ead3;">
                      <div class="inner">戸田</div>
                    </div>
                    <div class="sch-cell trader has-inner" style="background: #b6d7a8;">
                      <div class="inner">亀井</div>
                    </div>
                    <div class="sch-cell contract memo has-inner">
                      <div class="inner"></div>
                    </div>
                  </div>

                  <div class="sch-row sub2">
                    <div class="sch-cell sales-staff" style="background: #fce5cd;"></div>
                    <div class="sch-cell designer" style="background: #d9d2e9;"></div>
                    <div class="sch-cell constructor" style="background: #d9ead3;"></div>
                    <div class="sch-cell trader" style="background: #b6d7a8;"></div>
                    <div class="sch-cell contract"></div>
                  </div>
                </div>
                {{--@endforeach--}}
                <div class="sch-column-footer">
                  <div class="sch-row head">
                    <div class="sch-cell sales-staff"></div>
                    <div class="sch-cell designer"></div>
                    <div class="sch-cell constructor"></div>
                    <div class="sch-cell trader"></div>
                    <div class="sch-cell contract"></div>
                  </div>
                </div>
              </div>
              <!-- 日付部分 メイン部分 -->
              <div class="sch-row-body">
                <div class="sch-column-header">
                  <div class="sch-row month"></div>
                  <div class="sch-row day"></div>
                  <div class="sch-row weekday"></div>
                </div>
                <div class="sch-column-data"></div>
                <!-- ここに値が入っている -->
                {{--@foreach($houses as $house)--}}
                <div class="sch-row-group id-994">
                  <div class="sch-row sub1">
                    <div class="sch-cell day tue y2020 m12 d01"></div>
                  </div>
                  <div class="sch-row main">
                    <div class="sch-cell day tue y2020 m12 d01"></div>
                  </div>
                  <div class="sch-row sub2">
                    <div class="sch-cell day tue y2020 m12 d01"></div>
                  </div>
                </div>
                {{--@endforeach--}}
                <div class="sch-column-footer">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
