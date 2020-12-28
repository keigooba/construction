<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

  <!-- 共通スタイル -->
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
  <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
  <link rel="stylesheet" href="{{ asset('css/spectrum/spectrum.css') }}">
  <link rel="stylesheet" href="{{ asset('css/style_common.css') }}">
  <!-- elFinder CSS (REQUIRED) -->
  <link rel="stylesheet" href="{{ asset('css/elFinder/elfinder.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/elFinder/theme.css') }}">
  <!-- /共通スタイル -->

  <!-- Scripts -->
  <script src="{{ mix('js/app.js') }}" defer></script>
  <!-- jQuery UI: 日付ピッカー等(日本語化) -->
  <!-- <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/i18n/jquery-ui-i18n.min.js"></script> -->

  <!-- 共通スクリプト -->
  <!-- jQuery -->
  <script src="{{ asset('js/jquery.min.js') }}"></script>
	<!-- jQuery UI: 日付ピッカー等 -->
  <!-- <script src="{{ asset('js/jquery-ui/jquery-ui.min.js') }}"></script> -->
	<!-- jQuery UI: 日付ピッカー等(日本語化) -->
	<!-- <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/i18n/jquery-ui-i18n.min.js"></script> -->
	<!-- Spectrum: カラーピッカー -->
  <!-- <script src="{{ asset('js/spectrum/spectrum.min.js') }}"></script> -->
	<!-- jQuery UI Touch Punch: スマートフォン用のタッチイベント→マウスイベント調整 -->
  <!-- <script src="{{ asset('js/jquery.ui.touch-punch.min.js') }}"></script> -->
	<!-- jQuery.hotkeys: キーボードショートカット -->
  <!-- <script src="{{ asset('js/jquery.hotkeys.js') }}"></script> -->
	<!-- Bootstrap: ツールチップ等 -->
  <script src="{{ asset('js/bootstrap.min.js') }}"></script>
	<!-- DataTables: 管理用テーブル -->
  <script src="{{ asset('js/dataTables/jquery.dataTables.js') }}"></script>
	<!-- DataTables: 管理用テーブルのスタイル調整 -->
  <script src="{{ asset('js/dataTables/dataTables.bootstrap.js') }}"></script>
	<!-- MetisMenu: 管理用メニュー調整 -->
  <script src="{{ asset('js/metisMenu/metisMenu.min.js') }}"></script>
	<!-- moment: 日時計算用 -->
  <script src="{{ asset('js/moment-with-locales.min.js') }}"></script>
	<!-- moment: 日時計算用 -->
  <script src="{{ asset('js/lodash.min.js') }}"></script>
	<!-- 共通処理 -->
  <script src="{{ asset('js/script_common.js') }}"></script>

	<!-- elFinder JS (REQUIRED) -->
  <script src="{{ asset('js/elFinder/elfinder.min.js') }}"></script>

  <!-- ユーザー設定 -->
	<!-- <script>
	common.userOption.data = {"staff_name_1":"\u55b6\u696d","staff_name_2":"\u8a2d\u8a08","staff_name_3":"\u5de5\u4e8b","staff_name_4":"\u696d\u8005","max_date_month":"12","max_main_work":"20"};
  </script> -->

  <!-- /共通スタイル -->
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link rel="stylesheet" href="{{ asset('css/zoom2.css') }}">
  <!-- /追加・上書きスタイル -->
  <link rel="stylesheet" href="{{ asset('css/sp.css') }}">
  <!-- 共通スクリプト -->
  <!-- <script src="{{ asset('js/dialog.js') }}"></script> -->
  <script src="{{ asset('js/script.js') }}"></script>

</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
