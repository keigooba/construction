<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // テーブルのクリア
      DB::table('users')->truncate();

      // 初期データ用意（列名をキーとする連想配列）
      $users = [
                ['name' => '大庭 慶吾',
                'email' => 'keigo2356@gmail.com',
             'password' => bcrypt('test')],
                ['name' => '斎藤 和文',
                'email' => 'testtest2356@gmail.com',
             'password' => bcrypt('test1')],

              ];

      // 登録
      foreach($users as $user) {
        \App\User::create($user);
      }

    }
}
