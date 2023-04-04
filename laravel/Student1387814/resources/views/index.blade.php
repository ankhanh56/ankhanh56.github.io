<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Articles List</title>
</head>
<body>
    <h1>Articles List</h1>
    <h4><a href="{{ Route('create')}}">Create New</a></h4>
    <form action="{{ Route('findByName') }}">
        Title:<input name="Title"/>
        <input type="submit" value="Search"/>
      </form>

    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Content</th>
                <th>PostDated</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($arti as $item)
                <tr>
                    <td>{{ $item->Title }}</td>
                    <td>{{ $item->Content }}</td>
                    <td>{{ $item->PostDated }}</td>
                    <td>
                        <a href="{{ Route('detail',$item->id) }}">Detail</a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>