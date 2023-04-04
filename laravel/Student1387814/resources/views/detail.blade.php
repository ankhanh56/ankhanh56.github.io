<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ Route('detail') }}</title>
</head>
<body>
    @foreach ($arti as $item)
        <h1>{{ $item->Title }}</h1>
        <p>{{ $item->Content }}</p>
    @endforeach
    <p><a href="{{ Route('back') }}">Click to Back</a></p>
</body>
</html>