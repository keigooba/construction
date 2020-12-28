<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
  // Dateの日付と時間のフォーマットを指定
  protected $dates = ['start_date','end_date'];
}
