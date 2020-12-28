<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\MatterRequest;
use App\Matter;
use App\Date;

class MatterController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
      $this->middleware('auth');
  }

  public function index()
  {
      // DBよりMatterテーブルの値を全て取得
      $matters = Matter::all();
      // DBよりDateテーブルの値を全て取得
      $date = Date::all();

      // 取得した値をビュー「matter/index」に渡す
      return view('matter/index', compact('matters','date'));
  }

  public function date(Request $request)
  {
    // 日付の取得
    $date = Date::findOrFail(1);
    $date->start_date = $request->start_date;
    $date->end_date   = $request->end_date;
    // $date->save();

    return redirect('/matter');
  }

  public function post(MatterRequest $request)
  {
      // Mattterモデルのインスタンスを作成する
      $matter = new Matter();
      // 送信されたユーザー情報を代入する
      $matter->name = $request->name;
      $matter->sub  = $request->sub;
      $matter->sub2 = $request->sub2;
      $matter->sales = $request->sales;
      $matter->designer = $request->designer;
      $matter->constructor = $request->constructor;
      $matter->trader = $request->trader;
      $matter->contract  = $request->contract;
      $matter->date = $request->date;
      $matter->note = $request->note;
      // インスタンスの状態をデータベースに書き込む
      $matter->save();

      return redirect('/matter');
  }
}
