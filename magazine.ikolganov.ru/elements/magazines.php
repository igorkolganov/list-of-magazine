<div class="magazines-box-block-form" style="display: none;">
    <form action="/" method="post" id="myform" enctype="multipart/form-data">
        <input type="text" name="name-magazine" placeholder="Введите название журнала">
        <input type="text" name="short-naem" placeholder="Введите краткое описание (опционально)">
        <button type="button" id="add-photo-magazine" style="width: 0px; height: 0px;">Добавить обложку</button>
        <input type="file" name="input-file-photo" id="photo-magazine-download" accept=".jpg, .png"><br>
        <p id="photo-magazine" style="margin: 5px;"></p>
        <button type="button" id="add-author-magazine" style="background-color: aqua; margin: 5px;">Добавить автора</button>
        <p id="author-magazine" style="margin: 5px;"></p>
        <input type="date" name="date-matazine" id="date-magazine-form">
        <button type="button" id="add-new-magazine">Добавить новый журнал</button>
    </form>
</div>
