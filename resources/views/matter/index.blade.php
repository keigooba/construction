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
          @extends('matter.dialog')
          <button class="btn btn-primary print-pj-button" title="工程表を印刷します。">印刷</button>
          <button class="btn btn-primary menu-button pull-right">メニュー</button>
          <div class="form-inline date-range pull-right">
            <button class="btn btn-primary zoom-in-button height_adjust">＋</button>
            <button class="btn btn-primary zoom-out-button height_adjust">－</button>
            <span class="input-group height_adjust">
              <span class="input-group-addon">案件</span>
              <input type="text" class="form-control project_name_word" name="project_name_word">
              <select class="form-control project" name="project"></select>
            </span>

            <span class="input-group height_adjust">
              <span class="input-group-addon">入金表示</span>
              <select class="form-control show-income" name="show_income">
                <option value="1">する</option>
                <option value="0">しない</option>
              </select>
            </span>

            <form action="/matter/date" method="post">
            @csrf
              <span class="input-group">
                <span class="input-group-addon">表示期間</span>
                <input type="date" class="form-control start-date" name="start_date" value="{{ $date[0]['start_date']->format('Y-m-d')}}">
                <span class="input-group-addon date-range-wavedash">～</span>
                <input type="date" class="form-control end-date" name="end_date" value="{{$date[0]['end_date']->format('Y-m-d')}}">
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
                @foreach($matters as $key => $matter)
                <div class="sch-row-group id-994">
                <div class="sch-row sub1">
                <div class="sch-cell pj-no"></div>
                <div class="sch-cell pj-name sub" style="background: #ffff00;">{{$matter->sub}}</div>
                </div>
                <div class="sch-row main"><div class="sch-cell pj-no main has-inner"><div class="inner" style="color: #ff0000;">{{$key+1}}</div></div>
                <div class="sch-cell pj-name main has-inner" style="background: #ffff00;"><div class="inner">{{$matter->name}} 邸</div></div></div>
                <div class="sch-row sub2"><div tabindex="0" class="sch-cell pj-no pj-edit pj-edit-button">編集</div><input type="hidden" name="project_id[]" value="994">
                <div class="sch-cell pj-name date" style="background: #ffff00;">{{$matter->sub2}}</div>
                </div>
                </div>
                @endforeach
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
                @foreach($matters as $matter)
                <div class="sch-row-group id-994">
                  <div class="sch-row sub1">
                    <div class="sch-cell sales-staff" style="background: #fce5cd;"></div>
                    <div class="sch-cell designer" style="background: #d9d2e9;"></div>
                    <div class="sch-cell constructor" style="background: #d9ead3;"></div>
                    <div class="sch-cell trader" style="background: #b6d7a8;"></div>
                    <div class="sch-cell contract">￥{{$matter->contract}}</div>
                  </div>

                  <div class="sch-row main">
                    <div class="sch-cell sales-staff has-inner" style="background: #fce5cd;">
                      <div class="inner">{{$matter->sales}}</div>
                    </div>
                    <div class="sch-cell designer has-inner" style="background: #d9d2e9;">
                      <div class="inner">{{$matter->designer}}</div>
                    </div>
                    <div class="sch-cell constructor has-inner" style="background: #d9ead3;">
                      <div class="inner">{{$matter->constructor}}</div>
                    </div>
                    <div class="sch-cell trader has-inner" style="background: #b6d7a8;">
                      <div class="inner">{{$matter->trader}}</div>
                    </div>
                    <div class="sch-cell contract memo has-inner">
                      <div class="inner">{{$matter->note}}</div>
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
                @endforeach
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
                @foreach($matters as $matter)
                <div class="sch-row-group id-994">
                  <div class="sch-row sub1">
                    <div class="sch-cell day tue y2020 m12 d01"></div>
                    <div class="sch-bar ui-draggable ui-draggable-handle ui-resizable" style="left:826px; width: 420px; background: #ffe599;">
                    <div class="sch-bar-text main"><div class="inner">打ち合わせ①～③</div></div><div class="sch-bar-text start sub-text">
                      <div class="inner"></div></div><div class="sch-bar-text end sub-text"><div class="inner"></div></div>
                      <input type="hidden" name="work_pj_id" value="1308"><input type="hidden" name="work_id" value="417342">
                      <input type="hidden" name="work_type" value="2"><div class="ui-resizable-handle ui-resizable-w" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;">
                    </div>
                    </div>
                    <div class="sch-bar ui-draggable ui-draggable-handle ui-resizable" style="left:1246px; width: 14px; background: #00ff00;">
                    <div class="sch-bar-text main"><div class="inner">地鎮祭</div></div><div class="sch-bar-text start sub-text">
                      <div class="inner"></div></div><div class="sch-bar-text end sub-text"><div class="inner"></div></div>
                      <input type="hidden" name="work_pj_id" value="1308"><input type="hidden" name="work_id" value="417343">
                    <input type="hidden" name="work_type" value="2">
                    <div class="ui-resizable-handle ui-resizable-w" style="z-index: 90;">
                  </div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;">
                  </div></div>
                  </div>
                  <div class="sch-row main">
                    <div class="sch-cell day tue y2020 m12 d01"></div>
                    <div class="sch-bar ui-draggable ui-draggable-handle ui-resizable" style="left:196px; width: 14px; background: #4a86e8;"><div class="sch-bar-text main"><div class="inner">設計申込み</div></div><div class="sch-bar-text start vertical"><div class="inner"></div></div><div class="sch-bar-text end vertical"><div class="inner"></div></div><input type="hidden" name="work_pj_id" value="1308"><input type="hidden" name="work_id" value="417335"><input type="hidden" name="work_type" value="1"><div class="ui-resizable-handle ui-resizable-w" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div></div>
                    <div class="sch-bar ui-draggable ui-draggable-handle ui-resizable" style="left:826px; width: 14px; background: #4a86e8;"><div class="sch-bar-text main"><div class="inner">請負契約</div></div><div class="sch-bar-text start vertical"><div class="inner"></div></div><div class="sch-bar-text end vertical"><div class="inner"></div></div><input type="hidden" name="work_pj_id" value="1308"><input type="hidden" name="work_id" value="417336"><input type="hidden" name="work_type" value="1"><div class="ui-resizable-handle ui-resizable-w" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div></div>
                  </div>
                  <div class="sch-row sub2">
                    <div class="sch-cell day tue y2020 m12 d01"></div>
                    <div class="sch-bar ui-draggable ui-draggable-handle ui-resizable" style="left:126px; width: 532px; background: #ffe599;"><div class="sch-bar-text main"><div class="inner">ヒアリング・プラン提案</div></div><div class="sch-bar-text start sub-text"><div class="inner"></div></div><div class="sch-bar-text end sub-text"><div class="inner"></div></div><input type="hidden" name="work_pj_id" value="1277"><input type="hidden" name="work_id" value="411544"><input type="hidden" name="work_type" value="3"><div class="ui-resizable-handle ui-resizable-w" style="z-index: 90;"></div><div class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div></div>
                  </div>
                </div>
                <div class="sch-column-footer">
                </div>
                @endforeach
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
