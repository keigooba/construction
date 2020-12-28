<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MatterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
          'name' => 'required|string|max:255',
          'sub' => 'nullable|string|max:255',
          'sub2' => 'nullable|string|max:255',
          'sales' => 'nullable|string|max:50',
          'designer' => 'nullable|string|max:50',
          'constructor' => 'nullable|string|max:50',
          'trader' => 'nullable|string|max:50',
          'contract' => 'nullable|integer',
          'date' => 'required|date',
          'note' => 'nullable|string|max:255',
        ];
    }
    public function attributes()
    {
        return [
            "name" => "邸名",
            'sub' => '補足情報',
            'sub2' => '補足情報2',
            'sales' => '営業',
            'designer' => '設計',
            'constructor' => '工事',
            'trader' => '業者',
            'contract' => '契約金額',
            'date' => '開始日',
            'note' => 'メモ',
        ];
    }
}
