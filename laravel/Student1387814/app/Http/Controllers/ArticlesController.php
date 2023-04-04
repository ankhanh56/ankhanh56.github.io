<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ArticlesController extends Controller
{
    public function index()
    {
        $arti = Articles::all();
        return view('index', compact('arti'));
    }
    public function create()
    {
        return view('create');
    }

    public function back()
    {
        $arti = Articles::all();
        return view('index', compact('arti'));
    }

    public function store( Request $request)
    {
        $item = $request->all();
        Articles::create($item);
        return redirect('index');
    }

    public function findByName(Request $request)
    {
        $Title = $request-> Title;
        $arti = Articles::where('Title', 'like', '%'.$Title.'%')->get();
        return view('index', compact('arti'));
    }

    public function detail( Request $request )
    {
        $item = $request->all();
        $arti = Articles::all();
        return view('detail',compact('arti'));
    }
}
