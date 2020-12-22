<?php

use Illuminate\Database\Seeder;

class MattersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // テーブルのクリア
       DB::table('matters')->truncate();
       // 初期データ用意（列名をキーとする連想配列）
       $matters = [ ['name' => '小田',
                     'date' => now(), ]
                  ];
        // 登録
        foreach($matters as $matter) {
          \App\Matter::create($matter);
        }
    }
}
