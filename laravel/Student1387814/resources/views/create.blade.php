<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Create  New</title>
</head>
<body>
    <h1>Create new Article</h1>
    <form action="{{ Route('store') }}" method="POST">
        @csrf
        <div>Title: <input  type="text" name="Title"></div>
        <div>Content: <input  type="text" name="Content"></div>
        <div>PostDated: <input type="datetime-local" name="PostDated"></div>
        <div> <input  class="btn btn-primary mb-4" type="submit" value="Create"></div>
    </form>
</body>
</html>