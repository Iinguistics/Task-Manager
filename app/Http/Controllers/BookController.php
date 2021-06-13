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


    public function show($id)
    {
        $book = Books::findOrFail($id);

        return $book->toJson();
    }

    public function markAsCompleted($id)
    {
        $book = Books::findOrFail($id);
        $book->is_read = true;
        $book->update();

        return response()->json('Book updated!');
    }


    public function destroy($id)
    {
        $book = Books::findOrFail($id);
        $book->delete();

        return response()->json('Book removed!');
    }
}
