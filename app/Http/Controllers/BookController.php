<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Books;

class BookController extends Controller
{
    public function index()
    {
        $books = Books::all();

        return $books->toJson();
        //return response()->json('all books');
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'author' => 'required',
        ]);

        $book = Books::create([
            'title' => $validatedData['title'],
            'author' => $validatedData['author'],
            'category' => $request->category
        ]);

        return response()->json('Book saved!');
    }
}
