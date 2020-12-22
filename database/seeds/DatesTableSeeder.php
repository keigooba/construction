<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // テーブルのクリア
      DB::table('dates')->truncate();

      // 初期データ用意（列名をキーとする連想配列）
      $dates = [
                ['start_date' => Carbon::parse('2020-12-01'),
                   'end_date' => Carbon::parse('2020-12-30'),
                ]
              ];

      // 登録
      foreach($dates as $date) {
        \App\Date::create($date);
      }
    }
}
