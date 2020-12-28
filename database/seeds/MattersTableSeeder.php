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
      $matters = [ ["name" => "福田",
                    'sub' => '西淀川区花川',
                    'sub2' => '土地から/ZEH',
                    'sales' => '亮太',
                    'designer' => '長田/長田',
                    'constructor' => '戸田',
                    'trader' => '亀井',
                    'contract' => '34386000',
                    'date' => date("2020-05-01")]
                  ];
        // 登録
        foreach($matters as $matter) {
          \App\Matter::create($matter);
        }
    }
}
