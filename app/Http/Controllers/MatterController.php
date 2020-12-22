<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
      $start_date = Date::get(['start_date']);
      $end_date = Date::get(['end_date']);

      // 取得した値をビュー「matter/index」に渡す
      return view('matter/index', compact('matters','start_date','end_date'));
  }

  public function date(Request $request)
  {
    // 日付の取得
    $start_date = $request->start_date;
    $end_date   = $request->end_date;

      return view('home',[
        'start_date' => $start_date,
          'end_date' => $end_date,
      ]);
  }
}
